import { getAuth } from "@clerk/express";
import {
  and,
  count,
  desc,
  eq,
  gte,
  ilike,
  isNull,
  lte,
  lt,
  or,
} from "drizzle-orm";
import {
  Router,
  type IRouter,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import {
  CreateBuyerRequestBody,
  CreateBuyerRequestResponse,
  GetBuyerRequestParams,
  GetBuyerRequestResponse,
  GetMySummaryResponse,
  ListBuyerRequestsQueryParams,
  ListBuyerRequestsResponse,
  ListMyBuyerRequestsResponse,
  ListMySavedRequestsResponse,
  ListMySubmissionsResponse,
  ListRequestMatchesParams,
  ListRequestMatchesResponse,
  SaveBuyerRequestBody,
  SaveBuyerRequestParams,
  SaveBuyerRequestResponse,
  SubmitMatchBody,
  SubmitMatchParams,
  SubmitMatchResponse,
} from "@workspace/api-zod";
import {
  buyerRequestsTable,
  db,
  matchSubmissionsTable,
  memberProfilesTable,
  requestViewEventsTable,
  savedBuyerRequestsTable,
} from "@workspace/db";

const router: IRouter = Router();
const FREE_MONTHLY_REQUEST_VIEW_LIMIT = 5;
const FREE_MONTHLY_SUBMISSION_LIMIT = 1;
const rewardTerms =
  "Potential finder rewards of up to 8% may be available on eligible transactions. Reward eligibility, amount, payment timing, and legal requirements vary by transaction, structure, jurisdiction, and participant status. Terms must be confirmed before an introduction or submission.";

function memberId(req: Request) {
  return getAuth(req).userId;
}

function requireMember(req: Request, res: Response, next: NextFunction): void {
  if (!memberId(req)) {
    res.status(401).json({ error: "Sign in to continue." });
    return;
  }
  next();
}

function utcMonthWindow(now = new Date()) {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
  return { start, end, monthStart: start.toISOString().slice(0, 10) };
}

function amountInReward(reward: string): number {
  const amount = reward.match(/\$\s*([\d,]+)/)?.[1];
  return amount ? Number(amount.replaceAll(",", "")) : 0;
}

function timelineMonths(timeline: string): number {
  const value = timeline.match(/(\d+(?:\.\d+)?)\s*(day|week|month|year)/i);
  if (!value) return Number.POSITIVE_INFINITY;
  const quantity = Number(value[1]);
  const unit = value[2].toLowerCase();
  if (unit.startsWith("day")) return quantity / 30;
  if (unit.startsWith("week")) return quantity / 4.3;
  if (unit.startsWith("year")) return quantity * 12;
  return quantity;
}

router.get("/buyer-requests", async (req, res): Promise<void> => {
  const parsed = ListBuyerRequestsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const filters = parsed.data;
  const conditions = [
    or(
      eq(buyerRequestsTable.privacy, "public"),
      eq(buyerRequestsTable.privacy, "nda_required"),
    )!,
  ];

  if (filters.industry) {
    conditions.push(ilike(buyerRequestsTable.industry, `%${filters.industry}%`));
  }
  if (filters.country) {
    conditions.push(ilike(buyerRequestsTable.country, `%${filters.country}%`));
  }
  if (filters.region) {
    conditions.push(ilike(buyerRequestsTable.region, `%${filters.region}%`));
  }
  if (filters.city) {
    conditions.push(ilike(buyerRequestsTable.city, `%${filters.city}%`));
  }
  if (filters.minBudget !== undefined) {
    conditions.push(
      or(
        gte(buyerRequestsTable.maximumPurchasePrice, filters.minBudget),
        isNull(buyerRequestsTable.maximumPurchasePrice),
      )!,
    );
  }
  if (filters.maxBudget !== undefined) {
    conditions.push(
      or(
        lte(buyerRequestsTable.minimumPurchasePrice, filters.maxBudget),
        isNull(buyerRequestsTable.minimumPurchasePrice),
      )!,
    );
  }
  if (filters.verifiedOnly) {
    conditions.push(eq(buyerRequestsTable.isVerified, true));
  }
  if (filters.search?.trim()) {
    const term = `%${filters.search.trim().slice(0, 100)}%`;
    conditions.push(
      or(
        ilike(buyerRequestsTable.title, term),
        ilike(buyerRequestsTable.industry, term),
        ilike(buyerRequestsTable.businessCategory, term),
        ilike(buyerRequestsTable.country, term),
        ilike(buyerRequestsTable.region, term),
        ilike(buyerRequestsTable.city, term),
      )!,
    );
  }

  const rows = await db
    .select()
    .from(buyerRequestsTable)
    .where(and(...conditions))
    .orderBy(desc(buyerRequestsTable.createdAt))
    .limit(150);

  if (filters.sort === "highest_budget") {
    rows.sort(
      (a, b) => (b.maximumPurchasePrice ?? 0) - (a.maximumPurchasePrice ?? 0),
    );
  } else if (filters.sort === "highest_reward") {
    rows.sort(
      (a, b) =>
        amountInReward(b.rewardDisclosure) - amountInReward(a.rewardDisclosure),
    );
  } else if (filters.sort === "closing_soon") {
    rows.sort((a, b) => timelineMonths(a.timeline) - timelineMonths(b.timeline));
  }

  res.json(ListBuyerRequestsResponse.parse(rows));
});

router.post("/buyer-requests", requireMember, async (req, res): Promise<void> => {
  const parsed = CreateBuyerRequestBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const body = parsed.data;
  if (
    body.minimumPurchasePrice != null &&
    body.maximumPurchasePrice != null &&
    body.minimumPurchasePrice > body.maximumPurchasePrice
  ) {
    res.status(400).json({ error: "Minimum budget cannot exceed maximum budget." });
    return;
  }

  const [request] = await db
    .insert(buyerRequestsTable)
    .values({
      ...body,
      region: body.region ?? null,
      city: body.city ?? null,
      radiusMiles: body.radiusMiles ?? null,
      minimumPurchasePrice: body.minimumPurchasePrice ?? null,
      maximumPurchasePrice: body.maximumPurchasePrice ?? null,
      minimumRevenue: body.minimumRevenue ?? null,
      minimumEbitda: body.minimumEbitda ?? null,
      minimumCashFlow: body.minimumCashFlow ?? null,
      rewardDisclosure: body.rewardDisclosure ?? rewardTerms,
      isVerified: false,
      isExample: false,
      createdBy: memberId(req)!,
    })
    .returning();

  res.status(201).json(CreateBuyerRequestResponse.parse(request));
});

router.get("/buyer-requests/:requestId", async (req, res): Promise<void> => {
  const params = GetBuyerRequestParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [request] = await db
    .select()
    .from(buyerRequestsTable)
    .where(eq(buyerRequestsTable.id, params.data.requestId));

  if (
    !request ||
    (request.privacy !== "public" &&
      request.privacy !== "nda_required" &&
      request.createdBy !== memberId(req))
  ) {
    res.status(404).json({ error: "Buyer request not found." });
    return;
  }

  const userId = memberId(req);
  if (userId && request.createdBy !== userId) {
    const { monthStart } = utcMonthWindow();
    const canOpen = await db.transaction(async (tx) => {
      await tx
        .insert(memberProfilesTable)
        .values({ userId })
        .onConflictDoNothing();
      const [profile] = await tx
        .select({ plan: memberProfilesTable.plan })
        .from(memberProfilesTable)
        .where(eq(memberProfilesTable.userId, userId))
        .for("update");

      if (profile?.plan !== "free") return true;

      const [alreadyViewed] = await tx
        .select({ requestId: requestViewEventsTable.requestId })
        .from(requestViewEventsTable)
        .where(
          and(
            eq(requestViewEventsTable.userId, userId),
            eq(requestViewEventsTable.requestId, request.id),
            eq(requestViewEventsTable.monthStart, monthStart),
          ),
        );
      if (alreadyViewed) return true;

      const [usage] = await tx
        .select({ value: count() })
        .from(requestViewEventsTable)
        .where(
          and(
            eq(requestViewEventsTable.userId, userId),
            eq(requestViewEventsTable.monthStart, monthStart),
          ),
        );
      if (usage.value >= FREE_MONTHLY_REQUEST_VIEW_LIMIT) return false;

      await tx
        .insert(requestViewEventsTable)
        .values({ userId, requestId: request.id, monthStart })
        .onConflictDoNothing();
      return true;
    });

    if (!canOpen) {
      res.status(429).json({
        error:
          "You have reached the Free plan limit of 5 distinct buyer request views this month.",
      });
      return;
    }
  }

  res.json(GetBuyerRequestResponse.parse(request));
});

router.post(
  "/buyer-requests/:requestId/submissions",
  requireMember,
  async (req, res): Promise<void> => {
    const params = SubmitMatchParams.safeParse(req.params);
    const parsed = SubmitMatchBody.safeParse(req.body);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.message });
      return;
    }

    const [request] = await db
      .select()
      .from(buyerRequestsTable)
      .where(eq(buyerRequestsTable.id, params.data.requestId));
    if (!request || !["public", "nda_required"].includes(request.privacy)) {
      res.status(404).json({ error: "Buyer request not found." });
      return;
    }

    const body = parsed.data;
    const userId = memberId(req)!;
    const { start, end } = utcMonthWindow();
    const submission = await db.transaction(async (tx) => {
      await tx
        .insert(memberProfilesTable)
        .values({ userId })
        .onConflictDoNothing();
      const [profile] = await tx
        .select({ plan: memberProfilesTable.plan })
        .from(memberProfilesTable)
        .where(eq(memberProfilesTable.userId, userId))
        .for("update");

      if (profile?.plan === "free") {
        const [usage] = await tx
          .select({ value: count() })
          .from(matchSubmissionsTable)
          .where(
            and(
              eq(matchSubmissionsTable.submittedBy, userId),
              gte(matchSubmissionsTable.createdAt, start),
              lt(matchSubmissionsTable.createdAt, end),
            ),
          );
        if (usage.value >= FREE_MONTHLY_SUBMISSION_LIMIT) return null;
      }

      const [created] = await tx
        .insert(matchSubmissionsTable)
        .values({
          requestId: request.id,
          submittedBy: userId,
          businessName: body.businessName ?? null,
          industry: body.industry,
          location: body.location,
          askingPrice: body.askingPrice ?? null,
          annualRevenue: body.annualRevenue ?? null,
          ebitda: body.ebitda ?? null,
          cashFlow: body.cashFlow ?? null,
          employeeCount: body.employeeCount ?? null,
          yearsOperating: body.yearsOperating ?? null,
          shortDescription: body.shortDescription,
          matchRationale: body.matchRationale,
          relationship: body.relationship,
          ownerContactStatus: body.ownerContactStatus,
          brokerStatus: body.brokerStatus,
          confidentialIdentity: body.confidentialIdentity,
        })
        .returning();
      return created;
    });

    if (!submission) {
      res.status(429).json({
        error:
          "You have reached the Free plan limit of 1 matching business submission this month.",
      });
      return;
    }
    res.status(201).json(SubmitMatchResponse.parse(submission));
  },
);

router.post(
  "/buyer-requests/:requestId/save",
  requireMember,
  async (req, res): Promise<void> => {
    const params = SaveBuyerRequestParams.safeParse(req.params);
    const parsed = SaveBuyerRequestBody.safeParse(req.body);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.message });
      return;
    }
    const [request] = await db
      .select({ id: buyerRequestsTable.id, privacy: buyerRequestsTable.privacy })
      .from(buyerRequestsTable)
      .where(eq(buyerRequestsTable.id, params.data.requestId));
    if (
      !request ||
      (request.privacy !== "public" && request.privacy !== "nda_required")
    ) {
      res.status(404).json({ error: "Buyer request not found." });
      return;
    }

    const userId = memberId(req)!;
    if (parsed.data.saved) {
      await db
        .insert(savedBuyerRequestsTable)
        .values({ userId, requestId: request.id })
        .onConflictDoNothing();
    } else {
      await db
        .delete(savedBuyerRequestsTable)
        .where(
          and(
            eq(savedBuyerRequestsTable.userId, userId),
            eq(savedBuyerRequestsTable.requestId, request.id),
          ),
        );
    }
    res.json(
      SaveBuyerRequestResponse.parse({
        requestId: request.id,
        saved: parsed.data.saved,
      }),
    );
  },
);

router.get(
  "/buyer-requests/:requestId/matches",
  requireMember,
  async (req, res): Promise<void> => {
    const params = ListRequestMatchesParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }
    const userId = memberId(req)!;
    const [request] = await db
      .select({
        id: buyerRequestsTable.id,
        createdBy: buyerRequestsTable.createdBy,
      })
      .from(buyerRequestsTable)
      .where(eq(buyerRequestsTable.id, params.data.requestId));
    if (!request || request.createdBy !== userId) {
      res.status(404).json({ error: "Buyer request not found." });
      return;
    }

    const matches = await db
      .select()
      .from(matchSubmissionsTable)
      .where(eq(matchSubmissionsTable.requestId, request.id))
      .orderBy(desc(matchSubmissionsTable.createdAt));
    res.json(
      ListRequestMatchesResponse.parse(
        matches.map((match) => ({
          ...match,
          businessName: match.confidentialIdentity ? null : match.businessName,
        })),
      ),
    );
  },
);

router.get("/me/buyer-requests", requireMember, async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(buyerRequestsTable)
    .where(eq(buyerRequestsTable.createdBy, memberId(req)!))
    .orderBy(desc(buyerRequestsTable.createdAt));
  res.json(ListMyBuyerRequestsResponse.parse(rows));
});

router.get("/me/submissions", requireMember, async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(matchSubmissionsTable)
    .where(eq(matchSubmissionsTable.submittedBy, memberId(req)!))
    .orderBy(desc(matchSubmissionsTable.createdAt));
  res.json(ListMySubmissionsResponse.parse(rows));
});

router.get(
  "/me/saved-requests",
  requireMember,
  async (req, res): Promise<void> => {
    const rows = await db
      .select({ request: buyerRequestsTable })
      .from(savedBuyerRequestsTable)
      .innerJoin(
        buyerRequestsTable,
        eq(savedBuyerRequestsTable.requestId, buyerRequestsTable.id),
      )
      .where(eq(savedBuyerRequestsTable.userId, memberId(req)!))
      .orderBy(desc(savedBuyerRequestsTable.createdAt));
    res.json(
      ListMySavedRequestsResponse.parse(rows.map(({ request }) => request)),
    );
  },
);

router.get("/me/summary", requireMember, async (req, res): Promise<void> => {
  const userId = memberId(req)!;
  const [requestCount] = await db
    .select({ value: count() })
    .from(buyerRequestsTable)
    .where(eq(buyerRequestsTable.createdBy, userId));
  const [submissionCount] = await db
    .select({ value: count() })
    .from(matchSubmissionsTable)
    .where(eq(matchSubmissionsTable.submittedBy, userId));
  const [savedCount] = await db
    .select({ value: count() })
    .from(savedBuyerRequestsTable)
    .where(eq(savedBuyerRequestsTable.userId, userId));
  const { start, end, monthStart } = utcMonthWindow();
  const [requestViewsUsed] = await db
    .select({ value: count() })
    .from(requestViewEventsTable)
    .where(
      and(
        eq(requestViewEventsTable.userId, userId),
        eq(requestViewEventsTable.monthStart, monthStart),
      ),
    );
  const [submissionsUsed] = await db
    .select({ value: count() })
    .from(matchSubmissionsTable)
    .where(
      and(
        eq(matchSubmissionsTable.submittedBy, userId),
        gte(matchSubmissionsTable.createdAt, start),
        lt(matchSubmissionsTable.createdAt, end),
      ),
    );
  const [reviewCount] = await db
    .select({ value: count() })
    .from(matchSubmissionsTable)
    .innerJoin(
      buyerRequestsTable,
      eq(matchSubmissionsTable.requestId, buyerRequestsTable.id),
    )
    .where(
      and(
        eq(buyerRequestsTable.createdBy, userId),
        eq(matchSubmissionsTable.status, "submitted"),
      ),
    );
  res.json(
    GetMySummaryResponse.parse({
      requestCount: requestCount.value,
      submissionCount: submissionCount.value,
      savedCount: savedCount.value,
      reviewCount: reviewCount.value,
      requestViewsUsedThisMonth: requestViewsUsed.value,
      submissionsUsedThisMonth: submissionsUsed.value,
    }),
  );
});

export default router;