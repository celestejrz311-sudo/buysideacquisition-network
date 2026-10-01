# BuySide

BuySide is a global private acquisition network where buyers publish what they want to acquire and the network privately submits matching businesses.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/buyside run dev` — run the BuySide web app
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/buyside/src/` — web routes, marketplace forms, dashboard, and visual theme
- `artifacts/api-server/src/routes/buyer-requests.ts` — buyer request, match submission, saved request, and dashboard endpoints
- `lib/api-spec/openapi.yaml` — source of truth for the API contract
- `lib/db/src/schema/buyside.ts` — PostgreSQL tables for mandates, submissions, and saved requests
- `artifacts/api-server/src/app.ts` — shared Express API and Clerk middleware

## Architecture decisions

- Clerk owns user authentication; application records store provider user IDs, not passwords.
- Public marketplace reads include public and NDA-required mandates; private and members-only mandates are not exposed in public browse results.
- Every seeded mandate is marked as an example and is not marked verified.
- Request and match API types are generated from OpenAPI; change the spec first, then run codegen.

## Product

Members can publish acquisition criteria, browse and filter public buyer demand, submit confidential business matches, save requests, and view their request or submission dashboard. Public pages explain the buyer-first model and finder reward conditions.

## User preferences

- Keep the brand premium, private, and institutional; use a dark charcoal base, warm off-white text, and restrained muted-gold accents.
- Never invent marketplace statistics, verification, profiles, testimonials, or transaction outcomes.

## Gotchas

- When adding dependencies to a workspace package, use a package-filtered `pnpm add` command rather than adding them at the monorepo root.
- Run `pnpm --filter @workspace/db run push` after development schema changes.
- `pnpm run typecheck` is the canonical workspace check; `api-spec` codegen also runs library typechecking.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
