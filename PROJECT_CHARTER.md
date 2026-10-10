# Project Charter – PortfolioReloaded

> Reference document for all development sessions. Update it when decisions change.

## 1. Purpose
A single-page web application serving as a personal portfolio and interactive resume. It will be hosted on the owner's personal website and deployed on Vercel.

## 2. Goals
- Present the owner's work, skills, and experience in a polished, memorable way.
- Make the resume interactive (e.g. filter/explore skills, projects, and experience) rather than a static document.
- Be fast, accessible, responsive, and easy to maintain/extend.

## 3. Non-goals (for now) – see section 9 for agreed requirements
- User accounts / authentication.
- Database or persistent storage.
- Multi-page routing or a blog/CMS.

## 4. Tech Stack
| Concern | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| API | tRPC v11 (+ TanStack Query, superjson, zod) |
| Env validation | `@t3-oss/env-nextjs` (`src/env.js`) |
| Hosting | Vercel |
| Package manager | npm |

Scaffolded with `create-t3-app`. Intentionally **excluded** for now: NextAuth, Prisma, Drizzle. Add only if a requirement appears.

## 5. Project Structure
```
src/
  app/                 Next.js App Router (layout.tsx, page.tsx, api/trpc/[trpc]/route.ts)
  server/api/
    root.ts            Root tRPC router – register all routers here
    trpc.ts            tRPC context/procedures
    routers/           One file per domain router (currently hello.ts)
  trpc/                tRPC clients (react.tsx, server.ts, query-client.ts)
  styles/globals.css   Tailwind entry
  env.js               Typed environment variables
public/                Static assets
```
Path alias: `~/*` → `src/*`.

## 6. Current State
- All sections built and verified (desktop + mobile, dark + light): Hero, Projects, Skills, Experience, Links.
- Data: [src/data/info.json](./src/data/info.json) (copy of the old portfolio file) is validated/mapped in [src/data/index.ts](./src/data/index.ts). Projects merge live GitHub repos with the curated entries in [src/server/github.ts](./src/server/github.ts) (hourly revalidation; exposed via the `projects.list` tRPC procedure, page calls `getProjects` directly to stay static).
- Theme: `next-themes` (class strategy, system default). Smooth scroll: Lenis. Animation: Motion. Skills shown as animated gradient proficiency rings; experience as a scroll-drawn timeline with animated stacked bars.
- Icons: devicon CDN via [src/lib/icons.ts](./src/lib/icons.ts) (letter fallback); project icons are generated gradient initials.

### Where to put pending content
- **Resume URL (Cloudflare R2):** set `NEXT_PUBLIC_RESUME_URL` in `.env` locally and in Vercel project env vars. Until set, the Resume card shows "Coming soon".
- **Hero tagline:** `tagline` in [src/config/site.ts](./src/config/site.ts) (currently a placeholder). Name, links and GitHub user live there too.
- **Optional:** `GITHUB_TOKEN` env var to raise the GitHub API rate limit.
- **Framework descriptions** in `info.json` are still `"TEST"` and currently unused by the UI.
- **Domain:** production at https://folio.doxxus.ca (add as a custom domain in Vercel, CNAME from the doxxus.ca DNS).

## 7. Conventions
- Server Components by default; use `"use client"` only where interactivity requires it.
- Shared UI components go in `src/app/_components/`.
- Resume/portfolio content should live in typed data modules (e.g. `src/data/`) separate from presentation, so it can be edited without touching components.
- Validate all tRPC inputs with zod.
- Run `npm run typecheck` and `npm run build` before deploying.

## 8. Deployment
- Vercel project linked to the repository; framework preset: Next.js.
- Set any environment variables in Vercel (define them in `src/env.js` first).
- Production site is embedded/hosted under the owner's personal website domain (decide: subdomain vs. path – TBD).

## 9. Requirements (agreed)
**General**
- One scrollable page with smooth, tasteful scroll-driven animations; sections: Hero, Projects, Skills, Experience, Links.
- Dark and light mode (default to system preference, no flash on load, manual toggle).
- Gray palette with purple and cyan accents.
- Fully responsive (desktop + mobile) and performant on both; animate only `transform`/`opacity`; respect `prefers-reduced-motion`.

**Content source:** `info.json` (copied from the old portfolio, at `Portfolio\doxxus-portfolio\src\json\info.json`) is the initial data source, expected to change later. Keep it behind a typed/zod-validated data layer (`src/data/`). Drop UI-state fields (`expand`, `hovered`) and hardcoded colors; replace `"TEST"` descriptions before launch.

**Hero:** name, tagline, and `about_text` / `about_interest`.

**Projects:** hybrid data – public repos fetched live from the GitHub API (user `Doxxus`, cached/revalidated server-side), enriched/overridden by `info.json` entries (description, icon). Whole card is a link to the repo. Entries without a repo (e.g. Centralized Analysis System) render as non-clickable work projects. Icons: GitHub-style placeholders for now.

**Skills:** languages and frameworks with proficiency, standard logos (devicon or similar). Proficiency display style TBD.

**Experience:** work history timeline from `experiences`, including duties/technologies breakdown charts.

**Links:**
- GitHub: https://github.com/Doxxus
- LinkedIn: https://www.linkedin.com/in/lachlan-campbell-doxxus/
- Resume: PDF hosted on Cloudflare R2 (public URL TBD; keep in an env var / config).

**Proposed enhancements:** Lenis smooth scroll, Motion scroll reveals, sticky nav with scroll-spy, gradient scroll progress bar, drifting purple/cyan background glows, card hover tilt/glow, animated skill bars/rings, scroll-drawn experience timeline, animated duty/tech donuts, magnetic link buttons, language filter chips for projects.

## 10. Open Questions
1. Cloudflare R2 resume URL (supplied later).
2. Hero tagline (supplied later; no photo).
3. Analytics, SEO/metadata, and accessibility targets: none for now, may change.
4. Whether to optionally show GitHub stars/last-updated on cards (stars currently shown when > 0).
