import { getAuth } from "@clerk/express";
import { eq } from "drizzle-orm";
import {
  Router,
  type IRouter,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import {
  GetMyProfileResponse,
  UpdateMyProfileBody,
  UpdateMyProfileResponse,
} from "@workspace/api-zod";
import { db, memberProfilesTable } from "@workspace/db";

const router: IRouter = Router();

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

router.get("/me/profile", requireMember, async (req, res): Promise<void> => {
  const [profile] = await db
    .select({
      role: memberProfilesTable.role,
      plan: memberProfilesTable.plan,
    })
    .from(memberProfilesTable)
    .where(eq(memberProfilesTable.userId, memberId(req)!));

  res.json(
    GetMyProfileResponse.parse(profile ?? { role: "unset", plan: "free" }),
  );
});

router.patch("/me/profile", requireMember, async (req, res): Promise<void> => {
  const parsed = UpdateMyProfileBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [profile] = await db
    .insert(memberProfilesTable)
    .values({
      userId: memberId(req)!,
      role: parsed.data.role,
    })
    .onConflictDoUpdate({
      target: memberProfilesTable.userId,
      set: {
        role: parsed.data.role,
        updatedAt: new Date(),
      },
    })
    .returning({
      role: memberProfilesTable.role,
      plan: memberProfilesTable.plan,
    });

  res.json(UpdateMyProfileResponse.parse(profile));
});

export default router;