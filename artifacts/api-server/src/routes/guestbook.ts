import { Router } from "express";
import { db, guestbookTable, insertGuestbookSchema } from "@workspace/db";
import { desc } from "drizzle-orm";

const router = Router();

// GET all guestbook entries
router.get("/guestbook", async (_req, res) => {
  try {
    const rows = await db.select().from(guestbookTable).orderBy(desc(guestbookTable.createdAt));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch guestbook entries" });
  }
});

// POST new guestbook entry
router.post("/guestbook", async (req, res) => {
  try {
    const parsed = insertGuestbookSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid data", details: parsed.error.issues });
      return;
    }
    const [row] = await db.insert(guestbookTable).values(parsed.data).returning();
    res.status(201).json(row);
  } catch (err) {
    res.status(500).json({ error: "Failed to save guestbook entry" });
  }
});

export default router;
