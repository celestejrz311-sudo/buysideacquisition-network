# BuySide — Base44 Dev Environment

## What this is

A pnpm workspace monorepo for **BuySide**, a private acquisition marketplace.
The app has three runtime components: a Vite/React frontend, an Express API
server, and PostgreSQL.

## Running the app

```sh
docker compose -f docker-compose.base44.yml up -d --build
```

- **web** (Vite dev server) → host port **3000** → container 5173
- **api** (Express, esbuild-bundled) → container 5000 (not exposed to host; proxied via Vite)
- **db** (PostgreSQL 16) → container 5432
- **db-push** (one-shot) → runs `drizzle-kit push` to create/migrate tables, then exits

### Service startup order

`db` (healthy) → `db-push` (completed) → `api` (healthy) → `web` (healthy)

The `api` service has a 180s startup grace because it runs `pnpm install` +
esbuild bundle before listening. The `web` service similarly needs time for
`pnpm install` + Vite cold start.

## Environment variables

| Variable | Where | Notes |
|---|---|---|
| `DATABASE_URL` | compose `environment:` | Local Postgres — generated, not a secret |
| `PORT` | compose `environment:` | 5000 for api, 5173 for web |
| `BASE_PATH` | compose `environment:` | Set to `/` for the Vite dev server |
| `API_PROXY_TARGET` | compose `environment:` | Vite proxies `/api` → `http://api:5000` |
| `CLERK_PUBLISHABLE_KEY` | `/run/base44/app.env` | External — user provides via dashboard |
| `CLERK_SECRET_KEY` | `/run/base44/app.env` | External — user provides via dashboard |
| `VITE_CLERK_PUBLISHABLE_KEY` | `/run/base44/app.env` | Same value as `CLERK_PUBLISHABLE_KEY`; Vite needs the `VITE_` prefix |

Placeholder values for the Clerk keys live in `.env.base44-defaults` (listed
first in `env_file`) so the app can boot without credentials. Real values in
`/run/base44/app.env` (listed last) always override them.

## Key architecture notes

- **Clerk auth**: The frontend throws if `VITE_CLERK_PUBLISHABLE_KEY` is unset.
  Without valid Clerk keys, public pages render but sign-in/dashboard won't work.
  The Clerk proxy middleware (`/api/__clerk`) is a no-op in development
  (`NODE_ENV !== production`).
- **API server dev script**: `pnpm --filter @workspace/api-server run dev`
  builds with esbuild then starts — **no live reload**. Restart the `api`
  service after API code changes: `docker compose -f docker-compose.base44.yml restart api`.
- **Vite dev server**: Has live reload for frontend changes. The
  `@replit/*` Vite plugins are only loaded when `REPL_ID` is set, so they're
  inactive in the Base44 environment.
- **DB schema**: Uses Drizzle ORM with `drizzle-kit push` (no migration files).
  The `db-push` one-shot service handles this on startup. The API server also
  seeds 10 sample buyer requests on boot via `seedSampleBuyerRequests()`.
- **pnpm**: The workspace requires pnpm 10+ (uses `minimumReleaseAge` in
  `pnpm-workspace.yaml`). Installed via `npm install -g pnpm@10` in each
  container's startup command.

## Verifying the app

1. `docker compose -f docker-compose.base44.yml ps` — all services should be `healthy` or `exited (0)` for db-push
2. `curl -s http://localhost:3000/` — should return HTML (Vite dev server)
3. `curl -s http://localhost:3000/api/healthz` — should return `{"status":"ok"}`
4. `curl -s http://localhost:3000/api/buyer-requests` — should return JSON array of sample buyer requests
