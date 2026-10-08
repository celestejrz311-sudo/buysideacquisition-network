import { getAuth } from "@clerk/express";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import {
  Router,
  type IRouter,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { db, memberProfilesTable } from "@workspace/db";

const router: IRouter = Router();

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

/** Map a plan + billing period to a Stripe Price ID from env. */
function priceIdForPlan(plan: string, billing: "monthly" | "annual"): string | undefined {
  const key =
    billing === "annual"
      ? `STRIPE_PRICE_${plan.toUpperCase().replace(/-/g, "_")}_ANNUAL`
      : `STRIPE_PRICE_${plan.toUpperCase().replace(/-/g, "_")}`;
  return process.env[key];
}

function memberId(req: Request) {
  return getAuth(req).userId;
}

function requireMember(req: Request, res: Response, next: NextFunction): void {
  if (!memberId(req)) {
    res.status(401).json({ error: "Sign in to continue." });
    return;
  }
  next();
}

/**
 * POST /api/stripe/create-checkout-session
 * Body: { plan: "buyer-pro" | "professional" | "private-network", billing: "monthly" | "annual" }
 * Creates a Stripe Checkout Session for a subscription and returns the URL.
 */
router.post(
  "/stripe/create-checkout-session",
  requireMember,
  async (req, res): Promise<void> => {
    const { plan, billing = "monthly" } = req.body as {
      plan?: string;
      billing?: "monthly" | "annual";
    };

    const validPlans = ["buyer-pro", "professional", "private-network"];
    if (!plan || !validPlans.includes(plan)) {
      res.status(400).json({ error: "Invalid plan." });
      return;
    }
    if (billing !== "monthly" && billing !== "annual") {
      res.status(400).json({ error: "Invalid billing period." });
      return;
    }

    const priceId = priceIdForPlan(plan, billing);
    if (!priceId) {
      res.status(400).json({
        error:
          "Stripe pricing is not configured for this plan. Contact support.",
      });
      return;
    }

    const userId = memberId(req)!;

    // Ensure a member profile row exists
    const [profile] = await db
      .select()
      .from(memberProfilesTable)
      .where(eq(memberProfilesTable.userId, userId));

    const stripe = getStripe();

    const appUrl =
      process.env.APP_URL ||
      `https://3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX ?? "localhost"}`;

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${appUrl}/membership?checkout=success`,
        cancel_url: `${appUrl}/membership?checkout=cancelled`,
        client_reference_id: userId,
        metadata: {
          userId,
          plan,
          billing,
        },
        ...(profile?.stripeCustomerId
          ? { customer: profile.stripeCustomerId }
          : {}),
      });

      res.json({ url: session.url });
    } catch (err) {
      console.error("Stripe checkout error:", err);
      res.status(500).json({ error: "Unable to create checkout session." });
    }
  },
);

/**
 * POST /api/stripe/webhook
 * Mounted with express.raw() in app.ts — verifies the Stripe signature
 * and updates the member profile's plan + subscription status.
 */
export async function handleStripeWebhook(
  req: Request,
  res: Response,
): Promise<void> {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    res.status(500).json({ error: "STRIPE_WEBHOOK_SECRET is not set" });
    return;
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body as Buffer,
      req.headers["stripe-signature"] as string,
      webhookSecret,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    res.status(400).json({ error: "Invalid signature" });
    return;
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id ?? session.metadata?.userId;
        const plan = session.metadata?.plan;
        if (userId && plan) {
          await db
            .update(memberProfilesTable)
            .set({
              plan,
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
              stripeSubscriptionStatus: "active",
              updatedAt: new Date(),
            })
            .where(eq(memberProfilesTable.userId, userId));
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = sub.customer as string;
        // Find user by stripeCustomerId
        const [profile] = await db
          .select()
          .from(memberProfilesTable)
          .where(eq(memberProfilesTable.stripeCustomerId, customerId));
        if (profile) {
          const status = sub.status === "active" || sub.status === "trialing"
            ? "active"
            : sub.status;
          await db
            .update(memberProfilesTable)
            .set({
              stripeSubscriptionId: sub.id,
              stripeSubscriptionStatus: status,
              updatedAt: new Date(),
            })
            .where(eq(memberProfilesTable.userId, profile.userId));
        }
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = sub.customer as string;
        const [profile] = await db
          .select()
          .from(memberProfilesTable)
          .where(eq(memberProfilesTable.stripeCustomerId, customerId));
        if (profile) {
          await db
            .update(memberProfilesTable)
            .set({
              plan: "free",
              stripeSubscriptionStatus: "canceled",
              updatedAt: new Date(),
            })
            .where(eq(memberProfilesTable.userId, profile.userId));
        }
        break;
      }
      default:
        // Unhandled event type — no action needed
        break;
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    res.status(500).json({ error: "Webhook handler failed" });
  }
}

export default router;
