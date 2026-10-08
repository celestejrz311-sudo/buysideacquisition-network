import { getAuth } from "@clerk/express";
import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import {
  Router,
  type IRouter,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import {
  buyerRequestsTable,
  db,
  matchSubmissionsTable,
  memberProfilesTable,
} from "@workspace/db";

const router: IRouter = Router();

function memberId(req: Request) {
  return getAuth(req).userId;
}

async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const userId = memberId(req);
  if (!userId) {
    res.status(401).json({ error: "Sign in to continue." });
    return;
  }
  const [profile] = await db
    .select({ role: memberProfilesTable.role, suspended: memberProfilesTable.suspended })
    .from(memberProfilesTable)
    .where(eq(memberProfilesTable.userId, userId));
  if (!profile || profile.role !== "admin") {
    res.status(403).json({ error: "Admin access required." });
    return;
  }
  if (profile.suspended) {
    res.status(403).json({ error: "Account suspended." });
    return;
  }
  next();
}

// --- Users ---

router.get("/admin/users", requireAdmin, async (_req, res): Promise<void> => {
  const users = await db
    .select()
    .from(memberProfilesTable)
    .orderBy(desc(memberProfilesTable.createdAt));
  res.json(users);
});

router.patch("/admin/users/:userId", requireAdmin, async (req, res): Promise<void> => {
  const { userId } = req.params;
  const allowed = ["role", "plan", "suspended", "verified", "stripeSubscriptionStatus", "privateNetworkApproved"];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in req.body) updates[key] = req.body[key];
  }
  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No valid fields to update." });
    return;
  }
  updates.updatedAt = new Date();
  const [updated] = await db
    .update(memberProfilesTable)
    .set(updates)
    .where(eq(memberProfilesTable.userId, userId))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "User not found." });
    return;
  }
  res.json(updated);
});

// --- Requests ---

router.get("/admin/requests", requireAdmin, async (req, res): Promise<void> => {
  const search = (req.query.search as string | undefined)?.trim();
  const conditions = search
    ? or(
        ilike(buyerRequestsTable.title, `%${search}%`),
        ilike(buyerRequestsTable.industry, `%${search}%`),
      )!
    : undefined;
  const rows = await db
    .select()
    .from(buyerRequestsTable)
    .where(conditions ? and(conditions) : undefined)
    .orderBy(desc(buyerRequestsTable.createdAt))
    .limit(200);
  res.json(rows);
});

router.patch("/admin/requests/:id", requireAdmin, async (req, res): Promise<void> => {
  const { id } = req.params;
  const allowed = ["isVerified", "featured", "finderRewardType", "finderRewardValue", "privacy"];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in req.body) updates[key] = req.body[key];
  }
  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No valid fields to update." });
    return;
  }
  const [updated] = await db
    .update(buyerRequestsTable)
    .set(updates)
    .where(eq(buyerRequestsTable.id, id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Request not found." });
    return;
  }
  res.json(updated);
});

// --- Matches ---

router.get("/admin/matches", requireAdmin, async (req, res): Promise<void> => {
  const search = (req.query.search as string | undefined)?.trim();
  const conditions = search
    ? or(
        ilike(matchSubmissionsTable.businessName, `%${search}%`),
        ilike(matchSubmissionsTable.industry, `%${search}%`),
      )!
    : undefined;
  const rows = await db
    .select()
    .from(matchSubmissionsTable)
    .where(conditions ? and(conditions) : undefined)
    .orderBy(desc(matchSubmissionsTable.createdAt))
    .limit(200);
  res.json(rows);
});

router.patch("/admin/matches/:id", requireAdmin, async (req, res): Promise<void> => {
  const { id } = req.params;
  const allowed = ["status"];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in req.body) updates[key] = req.body[key];
  }
  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No valid fields to update." });
    return;
  }
  const [updated] = await db
    .update(matchSubmissionsTable)
    .set(updates)
    .where(eq(matchSubmissionsTable.id, id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Match not found." });
    return;
  }
  res.json(updated);
});

// --- Analytics ---

router.get("/admin/analytics", requireAdmin, async (_req, res): Promise<void> => {
  const [totalUsers] = await db
    .select({ value: count() })
    .from(memberProfilesTable);
  const [verifiedUsers] = await db
    .select({ value: count() })
    .from(memberProfilesTable)
    .where(eq(memberProfilesTable.verified, true));
  const [suspendedUsers] = await db
    .select({ value: count() })
    .from(memberProfilesTable)
    .where(eq(memberProfilesTable.suspended, true));
  const [totalRequests] = await db
    .select({ value: count() })
    .from(buyerRequestsTable);
  const [publicRequests] = await db
    .select({ value: count() })
    .from(buyerRequestsTable)
    .where(eq(buyerRequestsTable.privacy, "public"));
  const [featuredRequests] = await db
    .select({ value: count() })
    .from(buyerRequestsTable)
    .where(eq(buyerRequestsTable.featured, true));
  const [totalMatches] = await db
    .select({ value: count() })
    .from(matchSubmissionsTable);
  const [pendingMatches] = await db
    .select({ value: count() })
    .from(matchSubmissionsTable)
    .where(eq(matchSubmissionsTable.status, "submitted"));
  const [proMembers] = await db
    .select({ value: count() })
    .from(memberProfilesTable)
    .where(eq(memberProfilesTable.plan, "pro"));
  const [partnerMembers] = await db
    .select({ value: count() })
    .from(memberProfilesTable)
    .where(eq(memberProfilesTable.plan, "partner"));
  const [privateNetworkApproved] = await db
    .select({ value: count() })
    .from(memberProfilesTable)
    .where(eq(memberProfilesTable.privateNetworkApproved, true));

  res.json({
    users: { total: totalUsers.value, verified: verifiedUsers.value, suspended: suspendedUsers.value },
    requests: { total: totalRequests.value, public: publicRequests.value, featured: featuredRequests.value },
    matches: { total: totalMatches.value, pending: pendingMatches.value },
    memberships: { pro: proMembers.value, partner: partnerMembers.value },
    privateNetwork: { approved: privateNetworkApproved.value },
  });
});

export default router;
