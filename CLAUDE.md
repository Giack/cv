# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server (localhost:3000)
- `npm run lint` — ESLint + TypeScript type-check (run before committing)
- `npm run build` — static export to `./out/` (run to validate before pushing)

## Architecture

This is a **static Next.js export** deployed to GitHub Pages at `giack.github.io/cv`.

- **basePath:** `/cv` — all asset paths must account for this; do not assume root-relative URLs
- **Routing:** anchor-based (`#section-id`) — no file-based pages or server routes
- **Images:** must use `unoptimized: true` (Next.js image optimization is disabled for static export)
- **Build output:** `./out/` — not `.next/`

## Content

All CV content is in `data/cv.ts` — this is the single source of truth. Edit content there, not inline in components.

## Code Style

- TypeScript strict mode is enabled
- JSX string literals must escape HTML entities (ESLint enforces this — e.g., use `&apos;` or `{&apos;}` not raw quotes)
- Components follow the shadcn/ui pattern: primitives in `components/ui/`, page sections in `components/sections/`
- Tailwind CSS with CSS variable tokens — colors are defined as CSS vars in `app/globals.css`, not hardcoded

## Commits

Use conventional commit style: `feat:`, `fix:`, `refactor:`, `chore:`, etc.

## Deployment

Push to main triggers GitHub Actions which builds and deploys to the `gh-pages` branch automatically.
