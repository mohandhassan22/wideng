import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const guestbookTable = pgTable("guestbook", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertGuestbookSchema = createInsertSchema(guestbookTable).omit({ id: true, createdAt: true });
export type InsertGuestbook = z.infer<typeof insertGuestbookSchema>;
export type Guestbook = typeof guestbookTable.$inferSelect;
