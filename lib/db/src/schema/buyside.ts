import {
  boolean,
  doublePrecision,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const buyerRequestsTable = pgTable(
  "buyer_requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    industry: text("industry").notNull(),
    businessCategory: text("business_category").notNull(),
    buyerType: text("buyer_type").notNull(),
    country: text("country").notNull(),
    region: text("region"),
    city: text("city"),
    radiusMiles: integer("radius_miles"),
    remoteAccepted: boolean("remote_accepted").notNull().default(false),
    minimumPurchasePrice: doublePrecision("minimum_purchase_price"),
    maximumPurchasePrice: doublePrecision("maximum_purchase_price"),
    minimumRevenue: doublePrecision("minimum_revenue"),
    minimumEbitda: doublePrecision("minimum_ebitda"),
    minimumCashFlow: doublePrecision("minimum_cash_flow"),
    preferredProfile: text("preferred_profile").notNull().default(""),
    dealExclusions: text("deal_exclusions").notNull().default(""),
    timeline: text("timeline").notNull(),
    rewardDisclosure: text("reward_disclosure")
      .notNull()
      .default(
        "Potential finder rewards may be available on eligible transactions. Terms and eligibility vary.",
      ),
    privacy: text("privacy").notNull().default("public"),
    isVerified: boolean("is_verified").notNull().default(false),
    isApproved: boolean("is_approved").notNull().default(false),
    isRejected: boolean("is_rejected").notNull().default(false),
    isExample: boolean("is_example").notNull().default(false),
    featured: boolean("featured").notNull().default(false),
    finderRewardType: text("finder_reward_type"),
    finderRewardValue: text("finder_reward_value"),
    createdBy: text("created_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("buyer_requests_visibility_created_at_idx").on(
      table.privacy,
      table.createdAt,
    ),
    index("buyer_requests_creator_idx").on(table.createdBy),
    index("buyer_requests_featured_idx").on(table.featured),
  ],
);

export const matchSubmissionsTable = pgTable(
  "match_submissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    requestId: uuid("request_id")
      .notNull()
      .references(() => buyerRequestsTable.id, { onDelete: "cascade" }),
    submittedBy: text("submitted_by").notNull(),
    businessName: text("business_name"),
    industry: text("industry").notNull(),
    location: text("location").notNull(),
    askingPrice: doublePrecision("asking_price"),
    annualRevenue: doublePrecision("annual_revenue"),
    ebitda: doublePrecision("ebitda"),
    cashFlow: doublePrecision("cash_flow"),
    employeeCount: integer("employee_count"),
    yearsOperating: integer("years_operating"),
    shortDescription: text("short_description").notNull(),
    matchRationale: text("match_rationale").notNull(),
    relationship: text("relationship").notNull().default(""),
    ownerContactStatus: text("owner_contact_status").notNull().default(""),
    brokerStatus: text("broker_status").notNull().default(""),
    confidentialIdentity: boolean("confidential_identity")
      .notNull()
      .default(true),
    status: text("status").notNull().default("submitted"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("match_submissions_request_idx").on(table.requestId, table.createdAt),
    index("match_submissions_submitter_idx").on(
      table.submittedBy,
      table.createdAt,
    ),
  ],
);

export const savedBuyerRequestsTable = pgTable(
  "saved_buyer_requests",
  {
    userId: text("user_id").notNull(),
    requestId: uuid("request_id")
      .notNull()
      .references(() => buyerRequestsTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.requestId] }),
    index("saved_buyer_requests_user_idx").on(table.userId, table.createdAt),
  ],
);

export type BuyerRequest = typeof buyerRequestsTable.$inferSelect;
export type MatchSubmission = typeof matchSubmissionsTable.$inferSelect;