import {
  boolean,
  doublePrecision,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const businessListingsTable = pgTable(
  "business_listings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    category: text("category").notNull(),
    location: text("location").notNull(),
    askingPrice: doublePrecision("asking_price").notNull(),
    annualRevenue: doublePrecision("annual_revenue").notNull(),
    finderFee: doublePrecision("finder_fee").notNull(),
    imageUrl: text("image_url"),
    isSample: boolean("is_sample").notNull().default(true),
    isApproved: boolean("is_approved").notNull().default(false),
    isRejected: boolean("is_rejected").notNull().default(false),
    createdBy: text("created_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("business_listings_created_at_idx").on(table.createdAt),
  ],
);

export const finderReferralsTable = pgTable(
  "finder_referrals",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    listingId: uuid("listing_id").references(() => businessListingsTable.id, {
      onDelete: "cascade",
    }),
    listingTitle: text("listing_title").notNull(),
    finderName: text("finder_name").notNull(),
    finderEmail: text("finder_email").notNull(),
    buyerName: text("buyer_name").notNull(),
    buyerContact: text("buyer_contact").notNull(),
    notes: text("notes"),
    consent: boolean("consent").notNull(),
    status: text("status").notNull().default("new"),
    submittedBy: text("submitted_by"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("finder_referrals_listing_idx").on(table.listingId, table.createdAt),
    index("finder_referrals_status_idx").on(table.status, table.createdAt),
  ],
);

export type BusinessListing = typeof businessListingsTable.$inferSelect;
export type FinderReferral = typeof finderReferralsTable.$inferSelect;
