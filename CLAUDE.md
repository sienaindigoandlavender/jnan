# Jnan — notes for Claude

**Jnan** (جنان, "garden") is Jacqueline's personal app for learning, joy and mindfulness. Not a product: no SaaS, no payments, no marketing.

## The idea
- The home is a **garden**. Each subject is a **corner** with its own creature guide.
- The garden blooms as she learns and **never wilts**. No streaks, no lives, no guilt, no timers.
- Calm like Sunsama, whimsical like a picture book: flat, round, cute characters drawn as SVG in code. No shadows.
- Legibility always: body ≥ 17px, no pale grey text, EB Garamond (titles) + DM Sans (body).
- Never show file names, ids or "engine" words to the user.

## Corners
| Corner | Status | Guide |
|---|---|---|
| Tifinagh | open | Izem, the lion cub |
| Darija, Arabic letters (reading only), Spanish/Italian/Portuguese, art history, quantum physics, Stoicism and mindset, tarot/I Ching/runes, gardens/herbs/architecture/interiors, journals, expenses | sleeping seeds | — |

One corner at a time.

## Stack
Next.js 15 (App Router), TypeScript, Tailwind v4 (tokens in `src/app/globals.css`), pnpm, Vercel, Supabase (service-role key, server only). Tables are prefixed `jnan_`.

- The app runs without a database; progress just isn't saved.
- Data pages call `connection()` so they render per request.
- Quizzes are built on the server and passed to client components.

## Layout
- `content/rooms/<room>.json` — content, validated by Zod (`pnpm validate:content`, also runs before build).
- `src/content/` — schema, loader, checks.
- `src/lib/progress.ts` — reads progress. A letter **blooms** the first time it's answered right and stays bloomed.
- `src/lib/review.ts` — Leitner boxes, intervals 0/1/2/4/8/16 days; a wrong answer steps back one box, never to zero.
- `src/app/actions.ts` — `recordAnswer`, `completeLesson`; everything also lands in `jnan_events`.
- `src/i18n/en.ts` — every visible string.
- `src/components/` — `Izem`, `Garden`, `Quiz`, `LessonFlow`, `LetterCard`, `AlphabetGrid`, `ReviewSession`, `Bits`.
- `supabase/jnan-setup.sql` — idempotent setup; run in the Supabase SQL editor.

## Privacy
The repo is public and there is no login yet. Before building the journals, add auth (or make the repo private) — journal entries must never be readable by anyone else.
