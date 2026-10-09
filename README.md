# Jnan

A quiet garden of things to learn. Personal app.

```bash
pnpm install
cp .env.example .env.local   # optional: without it, progress isn't saved
pnpm dev
```

Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (server only).
Database: run `supabase/jnan-setup.sql` once in the Supabase SQL editor.
Content: edit `content/rooms/*.json`, then `pnpm validate:content`.

See `CLAUDE.md` for the design rules and architecture.
