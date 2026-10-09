import { Router, type IRouter } from "express";
import adminRouter from "./admin";
import buyerRequestsRouter from "./buyer-requests";
import healthRouter from "./health";
import memberProfileRouter from "./member-profile";
import stripeRouter from "./stripe";
import businessListingsRouter from "./business-listings";
import searchRouter from "./search";

const router: IRouter = Router();

router.use(healthRouter);
router.use(searchRouter);
router.use(adminRouter);
router.use(buyerRequestsRouter);
router.use(memberProfileRouter);
router.use(stripeRouter);
router.use(businessListingsRouter);

export default router;
