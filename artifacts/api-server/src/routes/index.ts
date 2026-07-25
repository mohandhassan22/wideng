import { Router, type IRouter } from "express";
import healthRouter from "./health";
import rsvpRouter from "./rsvp";
import guestbookRouter from "./guestbook";

const router: IRouter = Router();

router.use(healthRouter);
router.use(rsvpRouter);
router.use(guestbookRouter);

export default router;
