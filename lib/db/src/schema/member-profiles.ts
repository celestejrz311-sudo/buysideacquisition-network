import { createInsertSchema } from "drizzle-zod";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const memberProfilesTable = pgTable("member_profiles", {
  userId: text("user_id").primaryKey(),
  role: text("role").notNull().default("unset"),
  plan: text("plan").notNull().default("free"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const insertMemberProfileSchema = createInsertSchema(
  memberProfilesTable,
).omit({
  plan: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertMemberProfile = z.infer<typeof insertMemberProfileSchema>;
export type MemberProfile = typeof memberProfilesTable.$inferSelect;