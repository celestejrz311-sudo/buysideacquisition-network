import { Router, type IRouter } from "express";
import adminRouter from "./admin";
import buyerRequestsRouter from "./buyer-requests";
import healthRouter from "./health";
import memberProfileRouter from "./member-profile";
import stripeRouter from "./stripe";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminRouter);
router.use(buyerRequestsRouter);
router.use(memberProfileRouter);
router.use(stripeRouter);

export default router;
