import {
  and,
  desc,
  eq,
  gte,
  ilike,
  isNull,
  lte,
  or,
  sql,
} from "drizzle-orm";
import {
  Router,
  type IRouter,
  type Request,
  type Response,
} from "express";
import {
  buyerRequestsTable,
  businessListingsTable,
  matchSubmissionsTable,
  db,
} from "@workspace/db";

const router: IRouter = Router();

/**
 * GET /api/search — unified smart search across buyer requests, business
 * listings, and match submissions. Only public buyer requests are returned.
 *
 * Query params:
 *   q          — free-text search term
 *   industry   — industry filter (ilike)
 *   location   — location filter (matches country/region/city or listing location)
 *   minPrice   — minimum asking/budget price
 *   maxPrice   — maximum asking/budget price
 *   type       — opportunity type: "business" | "service" | "product" | "all"
 *   category   — business listing category filter
 *   sort       — "newest" | "price_high" | "price_low"
 *   limit      — max results per section (default 50)
 */
router.get("/search", async (req: Request, res: Response): Promise<void> => {
  const q = ((req.query.q as string | undefined) || "").trim().slice(0, 100);
  const industry = ((req.query.industry as string | undefined) || "").trim();
  const location = ((req.query.location as string | undefined) || "").trim();
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
  const type = (req.query.type as string | undefined) || "all";
  const category = ((req.query.category as string | undefined) || "").trim();
  const sort = (req.query.sort as string | undefined) || "newest";
  const limit = Math.min(Number(req.query.limit) || 50, 100);

  const term = q ? `%${q}%` : null;
  const locTerm = location ? `%${location}%` : null;
  const indTerm = industry ? `%${industry}%` : null;

  // --- Buyer Requests (public only) ---
  const requestConditions = [eq(buyerRequestsTable.privacy, "public")];

  if (type === "business") {
    requestConditions.push(
      or(
        ilike(buyerRequestsTable.businessCategory, "%business%"),
        ilike(buyerRequestsTable.businessCategory, "%acquisition%"),
      )!,
    );
  } else if (type === "service") {
    requestConditions.push(
      ilike(buyerRequestsTable.businessCategory, "%service%")!,
    );
  } else if (type === "product") {
    requestConditions.push(
      ilike(buyerRequestsTable.businessCategory, "%product%")!,
    );
  }

  if (indTerm) {
    requestConditions.push(ilike(buyerRequestsTable.industry, indTerm));
  }
  if (locTerm) {
    requestConditions.push(
      or(
        ilike(buyerRequestsTable.country, locTerm),
        ilike(buyerRequestsTable.region, locTerm),
        ilike(buyerRequestsTable.city, locTerm),
      )!,
    );
  }
  if (minPrice !== undefined && !Number.isNaN(minPrice)) {
    requestConditions.push(
      or(
        gte(buyerRequestsTable.maximumPurchasePrice, minPrice),
        isNull(buyerRequestsTable.maximumPurchasePrice),
      )!,
    );
  }
  if (maxPrice !== undefined && !Number.isNaN(maxPrice)) {
    requestConditions.push(
      or(
        lte(buyerRequestsTable.minimumPurchasePrice, maxPrice),
        isNull(buyerRequestsTable.minimumPurchasePrice),
      )!,
    );
  }
  if (term) {
    requestConditions.push(
      or(
        ilike(buyerRequestsTable.title, term),
        ilike(buyerRequestsTable.industry, term),
        ilike(buyerRequestsTable.businessCategory, term),
        ilike(buyerRequestsTable.preferredProfile, term),
        ilike(buyerRequestsTable.country, term),
        ilike(buyerRequestsTable.region, term),
        ilike(buyerRequestsTable.city, term),
      )!,
    );
  }

  const requests = await db
    .select({
      id: buyerRequestsTable.id,
      title: buyerRequestsTable.title,
      industry: buyerRequestsTable.industry,
      category: buyerRequestsTable.businessCategory,
      location:
        sql<string>`COALESCE(${buyerRequestsTable.city} || ', ', '') || COALESCE(${buyerRequestsTable.region} || ', ', '') || ${buyerRequestsTable.country}`.as(
          "location",
        ),
      price: buyerRequestsTable.maximumPurchasePrice,
      minPrice: buyerRequestsTable.minimumPurchasePrice,
      description: buyerRequestsTable.preferredProfile,
      privacy: buyerRequestsTable.privacy,
      isVerified: buyerRequestsTable.isVerified,
      featured: buyerRequestsTable.featured,
      createdAt: buyerRequestsTable.createdAt,
    })
    .from(buyerRequestsTable)
    .where(and(...requestConditions))
    .orderBy(desc(buyerRequestsTable.createdAt))
    .limit(limit);

  // --- Business Listings ---
  const listingConditions: ReturnType<typeof eq>[] = [];

  if (type === "business") {
    listingConditions.push(
      or(
        ilike(businessListingsTable.category, "%business%"),
        ilike(businessListingsTable.category, "%acquisition%"),
      )!,
    );
  } else if (type === "service") {
    listingConditions.push(ilike(businessListingsTable.category, "%service%")!);
  } else if (type === "product") {
    listingConditions.push(ilike(businessListingsTable.category, "%product%")!);
  }

  if (indTerm) {
    listingConditions.push(ilike(businessListingsTable.category, indTerm));
  }
  if (category) {
    listingConditions.push(
      ilike(businessListingsTable.category, `%${category}%`),
    );
  }
  if (locTerm) {
    listingConditions.push(ilike(businessListingsTable.location, locTerm));
  }
  if (minPrice !== undefined && !Number.isNaN(minPrice)) {
    listingConditions.push(gte(businessListingsTable.askingPrice, minPrice));
  }
  if (maxPrice !== undefined && !Number.isNaN(maxPrice)) {
    listingConditions.push(lte(businessListingsTable.askingPrice, maxPrice));
  }
  if (term) {
    listingConditions.push(
      or(
        ilike(businessListingsTable.title, term),
        ilike(businessListingsTable.description, term),
        ilike(businessListingsTable.category, term),
        ilike(businessListingsTable.location, term),
      )!,
    );
  }

  const listings = await db
    .select({
      id: businessListingsTable.id,
      title: businessListingsTable.title,
      industry: businessListingsTable.category,
      category: businessListingsTable.category,
      location: businessListingsTable.location,
      price: businessListingsTable.askingPrice,
      minPrice:
        sql<number | null>`${businessListingsTable.askingPrice}`.as("minPrice"),
      description: businessListingsTable.description,
      privacy: sql<string>`'public'`.as("privacy"),
      isVerified: businessListingsTable.isApproved,
      featured: sql<boolean>`false`.as("featured"),
      createdAt: businessListingsTable.createdAt,
    })
    .from(businessListingsTable)
    .where(listingConditions.length > 0 ? and(...listingConditions) : undefined)
    .orderBy(desc(businessListingsTable.createdAt))
    .limit(limit);

  // --- Match Submissions (as "services/offers") ---
  const matchConditions: ReturnType<typeof eq>[] = [];
  if (indTerm) {
    matchConditions.push(ilike(matchSubmissionsTable.industry, indTerm));
  }
  if (locTerm) {
    matchConditions.push(ilike(matchSubmissionsTable.location, locTerm));
  }
  if (minPrice !== undefined && !Number.isNaN(minPrice)) {
    matchConditions.push(gte(matchSubmissionsTable.askingPrice, minPrice));
  }
  if (maxPrice !== undefined && !Number.isNaN(maxPrice)) {
    matchConditions.push(lte(matchSubmissionsTable.askingPrice, maxPrice));
  }
  if (term) {
    matchConditions.push(
      or(
        ilike(matchSubmissionsTable.businessName, term),
        ilike(matchSubmissionsTable.industry, term),
        ilike(matchSubmissionsTable.shortDescription, term),
        ilike(matchSubmissionsTable.location, term),
      )!,
    );
  }

  const matches = await db
    .select({
      id: matchSubmissionsTable.id,
      title:
        sql<string>`COALESCE(${matchSubmissionsTable.businessName}, ${matchSubmissionsTable.shortDescription})`.as(
          "title",
        ),
      industry: matchSubmissionsTable.industry,
      category: sql<string>`'match'`.as("category"),
      location: matchSubmissionsTable.location,
      price: matchSubmissionsTable.askingPrice,
      minPrice:
        sql<number | null>`${matchSubmissionsTable.askingPrice}`.as("minPrice"),
      description: matchSubmissionsTable.shortDescription,
      privacy: sql<string>`'public'`.as("privacy"),
      isVerified: sql<boolean>`false`.as("isVerified"),
      featured: sql<boolean>`false`.as("featured"),
      createdAt: matchSubmissionsTable.createdAt,
    })
    .from(matchSubmissionsTable)
    .where(matchConditions.length > 0 ? and(...matchConditions) : undefined)
    .orderBy(desc(matchSubmissionsTable.createdAt))
    .limit(limit);

  // Tag each result with its source type
  const taggedRequests = requests.map((r) => ({
    ...r,
    source: "request" as const,
    href: `/requests/${r.id}`,
  }));
  const taggedListings = listings.map((l) => ({
    ...l,
    source: "listing" as const,
    href: `/listings/${l.id}`,
  }));
  const taggedMatches = matches.map((m) => ({
    ...m,
    source: "match" as const,
    href: `/requests/${m.id}`,
  }));

  // Apply sort across combined results
  let combined = [...taggedRequests, ...taggedListings, ...taggedMatches];
  if (sort === "price_high") {
    combined.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  } else if (sort === "price_low") {
    combined.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  } else {
    combined.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  // --- Suggested matches: cross-reference requests with listings by industry ---
  const suggestions: Array<{
    requestTitle: string;
    requestIndustry: string;
    listingTitle: string;
    listingPrice: number | null;
    reason: string;
  }> = [];

  if (requests.length > 0 && listings.length > 0) {
    for (const req of requests.slice(0, 10)) {
      const matching = listings.find(
        (l) =>
          l.industry
            ?.toLowerCase()
            .includes(req.industry?.toLowerCase() ?? "") ||
          req.industry
            ?.toLowerCase()
            .includes(l.industry?.toLowerCase() ?? ""),
      );
      if (matching) {
        suggestions.push({
          requestTitle: req.title,
          requestIndustry: req.industry ?? "",
          listingTitle: matching.title,
          listingPrice: matching.price,
          reason: `Industry match: "${req.industry}"`,
        });
      }
    }
  }

  res.json({
    results: combined,
    counts: {
      requests: taggedRequests.length,
      listings: taggedListings.length,
      matches: taggedMatches.length,
      total: combined.length,
    },
    suggestions,
  });
});

export default router;
