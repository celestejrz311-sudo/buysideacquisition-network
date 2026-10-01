import {
  date,
  index,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { buyerRequestsTable } from "./buyside";

export const requestViewEventsTable = pgTable(
  "request_view_events",
  {
    userId: text("user_id").notNull(),
    requestId: uuid("request_id")
      .notNull()
      .references(() => buyerRequestsTable.id, { onDelete: "cascade" }),
    monthStart: date("month_start", { mode: "string" }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    primaryKey({
      columns: [table.userId, table.requestId, table.monthStart],
    }),
    index("request_view_events_member_month_idx").on(
      table.userId,
      table.monthStart,
    ),
  ],
);