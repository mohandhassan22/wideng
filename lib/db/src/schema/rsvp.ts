import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const rsvpTable = pgTable("rsvp", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  attending: boolean("attending").notNull(),
  guests: integer("guests").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertRsvpSchema = createInsertSchema(rsvpTable).omit({ id: true, createdAt: true });
export type InsertRsvp = z.infer<typeof insertRsvpSchema>;
export type Rsvp = typeof rsvpTable.$inferSelect;
