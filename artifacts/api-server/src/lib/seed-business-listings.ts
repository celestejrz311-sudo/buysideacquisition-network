import { sql } from "drizzle-orm";
import { businessListingsTable, db } from "@workspace/db";

const sampleListings = [
  {
    id: "a1b2c3d4-0001-4000-8000-000000000001",
    title: "Established Commercial Cleaning Company",
    description:
      "Established commercial cleaning company with recurring contracts, trained staff, and a loyal customer base.",
    category: "Cleaning Services",
    location: "Miami, Florida",
    askingPrice: 285000,
    annualRevenue: 420000,
    finderFee: 22800,
    imageUrl: null,
    isSample: true,
    isApproved: true,
    isRejected: false,
    createdBy: "sample-listing-seed",
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000002",
    title: "Profitable Event Planning & Production Business",
    description:
      "Established event planning and production business serving corporate and private clients, with vendor relationships and production equipment.",
    category: "Events & Hospitality",
    location: "Orlando, Florida",
    askingPrice: 475000,
    annualRevenue: 890000,
    finderFee: 38000,
    imageUrl: null,
    isSample: true,
    isApproved: true,
    isRejected: false,
    createdBy: "sample-listing-seed",
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000003",
    title: "Premium Beauty Salon & Spa",
    description:
      "Fully equipped beauty salon with repeat clients, experienced staff, and an established local brand.",
    category: "Beauty & Wellness",
    location: "Austin, Texas",
    askingPrice: 195000,
    annualRevenue: 360000,
    finderFee: 15600,
    imageUrl: null,
    isSample: true,
    isApproved: true,
    isRejected: false,
    createdBy: "sample-listing-seed",
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000004",
    title: "Established E-Commerce Brand",
    description:
      "Established online retail brand with supplier relationships, repeat customers, and an existing fulfillment process.",
    category: "E-Commerce",
    location: "Remote / USA",
    askingPrice: 325000,
    annualRevenue: 610000,
    finderFee: 26000,
    imageUrl: null,
    isSample: true,
    isApproved: true,
    isRejected: false,
    createdBy: "sample-listing-seed",
  },
].map((listing, index) => ({
  ...listing,
  createdAt: new Date(Date.now() - index * 60_000),
})) satisfies (typeof businessListingsTable.$inferInsert)[];

export async function seedBusinessListings(): Promise<void> {
  await db
    .insert(businessListingsTable)
    .values(sampleListings)
    .onConflictDoUpdate({
      target: businessListingsTable.id,
      set: {
        title: sql`excluded.title`,
        description: sql`excluded.description`,
        category: sql`excluded.category`,
        location: sql`excluded.location`,
        askingPrice: sql`excluded.asking_price`,
        annualRevenue: sql`excluded.annual_revenue`,
        finderFee: sql`excluded.finder_fee`,
        isSample: sql`excluded.is_sample`,
        isApproved: sql`excluded.is_approved`,
        isRejected: sql`excluded.is_rejected`,
      },
    });
}
