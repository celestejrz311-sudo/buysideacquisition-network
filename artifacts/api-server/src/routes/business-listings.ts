import { and, desc, eq } from "drizzle-orm";
import {
  Router,
  type IRouter,
  type Request,
  type Response,
} from "express";
import {
  businessListingsTable,
  db,
  finderReferralsTable,
} from "@workspace/db";

const router: IRouter = Router();

/** GET /api/business-listings — public list of approved listings */
router.get("/business-listings", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(businessListingsTable)
    .where(
      and(
        eq(businessListingsTable.isApproved, true),
        eq(businessListingsTable.isRejected, false),
      ),
    )
    .orderBy(desc(businessListingsTable.createdAt));
  res.json(rows);
});

/** GET /api/business-listings/:id — public detail (approved only) */
router.get("/business-listings/:id", async (req, res): Promise<void> => {
  const [listing] = await db
    .select()
    .from(businessListingsTable)
    .where(eq(businessListingsTable.id, req.params.id));
  if (!listing || !listing.isApproved || listing.isRejected) {
    res.status(404).json({ error: "Listing not found." });
    return;
  }
  res.json(listing);
});

/** POST /api/finder-referrals — public submit (no auth required) */
router.post("/finder-referrals", async (req, res): Promise<void> => {
  const {
    listingId,
    listingTitle,
    finderName,
    finderEmail,
    buyerName,
    buyerContact,
    notes,
    consent,
  } = req.body as {
    listingId?: string;
    listingTitle?: string;
    finderName?: string;
    finderEmail?: string;
    buyerName?: string;
    buyerContact?: string;
    notes?: string;
    consent?: boolean;
  };

  if (
    !listingId || !listingTitle || !finderName || !finderEmail ||
    !buyerName || !buyerContact || !consent
  ) {
    res.status(400).json({
      error: "All required fields must be provided, including consent.",
    });
    return;
  }

  // Prevent duplicate referrals for the same buyer and listing
  const [existing] = await db
    .select({ id: finderReferralsTable.id })
    .from(finderReferralsTable)
    .where(
      and(
        eq(finderReferralsTable.listingId, listingId),
        eq(finderReferralsTable.buyerContact, buyerContact),
      ),
    );
  if (existing) {
    res.status(409).json({
      error:
        "A referral for this buyer and listing has already been submitted.",
    });
    return;
  }

  const [created] = await db
    .insert(finderReferralsTable)
    .values({
      listingId,
      listingTitle,
      finderName,
      finderEmail,
      buyerName,
      buyerContact,
      notes: notes ?? null,
      consent,
      status: "new",
    })
    .returning();

  res.status(201).json(created);
});

export default router;
