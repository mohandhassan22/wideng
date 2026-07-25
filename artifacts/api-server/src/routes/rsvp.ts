import { Router } from "express";
import { db, rsvpTable, insertRsvpSchema } from "@workspace/db";
import { desc } from "drizzle-orm";

const router = Router();

// GET all RSVPs
router.get("/rsvp", async (_req, res) => {
  try {
    const rows = await db.select().from(rsvpTable).orderBy(desc(rsvpTable.createdAt));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch RSVPs" });
  }
});

// POST new RSVP
router.post("/rsvp", async (req, res) => {
  try {
    const parsed = insertRsvpSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid data", details: parsed.error.issues });
      return;
    }
    const [row] = await db.insert(rsvpTable).values(parsed.data).returning();
    res.status(201).json(row);
  } catch (err) {
    res.status(500).json({ error: "Failed to save RSVP" });
  }
});

export default router;
