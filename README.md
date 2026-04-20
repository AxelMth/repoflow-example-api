# repoflow-example-api

The Fastify backend for the **repoflow Hello World** example. Part of the [`repoflow-metarepo-example`](https://github.com/axelmth/repoflow-metarepo-example) meta-repository architecture.

> For the React frontend, see [`repoflow-example-web`](https://github.com/axelmth/repoflow-example-web).

## What it does

Exposes two endpoints:

| Endpoint | Response |
|---|---|
| `GET /api/hello` | `{ message: string, timestamp: string }` |
| `GET /health` | `{ ok: true }` |

## Stack

- **Fastify 5** — web framework
- **repoflow-example-shared** — Zod schema validation
- **TypeScript 5.6** — ESM, strict mode
- **Vitest** — tests

## Local development

```bash
# Install dependencies
pnpm install

# Copy env file
cp .env.example .env

# Start dev server (port 3001)
pnpm dev
```

Visit `http://localhost:3001/api/hello`.

## Deploy to Fly.io

<TODO: fill in live URL once deployed, e.g. https://repoflow-example-api.fly.dev>

### First deploy

```bash
# Install flyctl: https://fly.io/docs/hands-on/install-flyctl/
flyctl auth login
flyctl launch  # follow the prompts, use existing fly.toml
flyctl deploy
```

### Set environment variables on Fly

```bash
flyctl secrets set CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### Continuous deployment

The GitHub Actions workflow `.github/workflows/deploy.yml` deploys automatically on push to `main`.

Required secret: `FLY_API_TOKEN` (get it from `flyctl auth token` or the Fly.io dashboard).

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3001` | HTTP port |
| `CORS_ORIGIN` | `http://localhost:5173` | Allowed CORS origin |

---

Part of the **repoflow-examples** collection:
- [`repoflow-monorepo-example`](https://github.com/axelmth/repoflow-monorepo-example) — same app as a Turborepo monorepo
- [`repoflow-metarepo-example`](https://github.com/axelmth/repoflow-metarepo-example) — meta-repo orchestrator
- [`repoflow-example-web`](https://github.com/axelmth/repoflow-example-web) — React frontend
- [`repoflow-example-shared`](https://github.com/axelmth/repoflow-example-shared) — shared Zod schemas
