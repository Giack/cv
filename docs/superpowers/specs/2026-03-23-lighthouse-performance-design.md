# Lighthouse Performance Improvements — Design Spec

**Date:** 2026-03-23
**Status:** Approved

## Context

Lighthouse audit (simulated Moto G Power, 4× CPU throttle) shows:

| Metric         | Value   | Status                        |
| -------------- | ------- | ----------------------------- |
| Performance    | 53      | 🔴 Failing                    |
| TBT            | 4,260ms | 🔴 Failing (threshold: 300ms) |
| LCP            | 4.4s    | 🔴 Failing (threshold: 3.5s)  |
| FCP            | 1.4s    | 🟢 Good                       |
| CLS            | 0       | 🟢 Perfect                    |
| Accessibility  | 93      | 🟢 Good                       |
| Best Practices | 100     | 🟢 Perfect                    |
| SEO            | 100     | 🟢 Perfect                    |

Two root causes:

1. **TBT 4,260ms**: `ExperienceSection` is `'use client'` and pulls in Radix UI `<Collapsible>` + `useState`. Combined with the Next.js/React runtime (~650KB raw JS total), the main thread is heavily blocked on a throttled mobile CPU.

2. **LCP 4.4s**: The `blur-3xl` glow orb in HeroSection (`filter: blur(64px)`) is an expensive GPU compositor operation that blocks final paint of the `h1` LCP element, causing a 3s gap between FCP (1.4s) and LCP (4.4s).

Previous optimization already applied: `MetricsSection` (Framer Motion) lazy-loaded via `next/dynamic` with `ssr: false`.

## Scope

Option B — Moderate changes. No framework replacement, no radical architecture changes.

---

## Change 1: Replace Radix UI Collapsible with native `<details>/<summary>`

**File:** `components/sections/ExperienceSection.tsx`

**Goal:** Remove `'use client'`, `useState`, and `@radix-ui/react-collapsible` entirely. Convert to a Server Component.

### Approach

Use native HTML `<details>`/`<summary>` for the expand/collapse behavior. The browser handles the toggle with zero JavaScript.

**Key implementation details:**

- `<summary className="list-none ...">` — removes the browser's built-in disclosure triangle marker
- Tailwind's `group` on `<details>` + `group-open:hidden` on the highlights list — hides highlights when card is expanded (reads the HTML `[open]` attribute)
- Tailwind's `group-open:rotate-180` on the `↓` arrow — replaces the current `isOpen ? 'rotate-180' : ''` state-driven transition
- Non-expandable cards (`fullBullets.length <= highlights.length`): render a plain `<div>` instead of `<details>` — HTML has no `disabled` attribute for `<details>`, so conditional rendering is cleaner

### Structure

```
ExperienceSection (Server Component, no 'use client')
  └─ ExperienceCard (Server Component)
       ├─ [isExpandable] → <details className="group ...">
       │    ├─ <summary className="list-none ...">
       │    │    ├─ role, company, period
       │    │    └─ highlights (group-open:hidden)
       │    └─ fullBullets content
       └─ [!isExpandable] → <div ...>
            └─ role, company, period, highlights
```

### What is removed

- `'use client'` directive
- `useState` import
- `@radix-ui/react-collapsible` imports (`Collapsible`, `CollapsibleContent`, `CollapsibleTrigger`)
- `isOpen` state and `setIsOpen` handler

### What is preserved

- Visual layout: border, rounded corners, padding, background — identical
- Typography: role, company badge, period, bullet styling — identical
- Arrow indicator with rotation transition — via `group-open:rotate-180`
- Conditional expandability — non-expandable cards have no disclosure affordance

---

## Change 2: Remove blur-3xl glow orb from HeroSection

**File:** `components/sections/HeroSection.tsx`

**Goal:** Eliminate the CSS `filter: blur(64px)` operation that blocks LCP paint.

### Approach

Remove the glow orb `<div>` entirely:

```jsx
// DELETE this element:
<div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-3xl" />
```

The `bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900` background gradient already provides a rich dark-violet atmosphere. The blur orb is a subtle visual enhancement that is barely perceptible on mobile screens and invisible at the sizes Lighthouse tests at, but costs ~3s of LCP.

**What stays unchanged:** gradient background, grid overlay, all text content, CTAs, scroll hint, Badge, Button components.

---

## Expected Outcome

| Metric      | Before  | Expected After |
| ----------- | ------- | -------------- |
| TBT         | 4,260ms | ~1,000–1,800ms |
| LCP         | 4.4s    | ~2.0–3.0s      |
| Performance | 53      | ~70–80         |

TBT improvement comes from removing ExperienceSection from client hydration. Framer Motion is already deferred (MetricsSection). Remaining client components are Nav (lightweight scroll listener) and MetricsSection (now lazy).

LCP improvement comes from removing the compositor-blocking blur filter that sits in the same stacking context as the h1.

---

## Files Modified

| File                                        | Change                                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------------------- |
| `components/sections/ExperienceSection.tsx` | Remove `'use client'`, `useState`, Radix imports; rewrite using `<details>/<summary>` |
| `components/sections/HeroSection.tsx`       | Remove one `<div>` (glow orb)                                                         |

## Verification

1. `npm run build` — must pass with no TypeScript errors
2. `npm run lint` — no new ESLint warnings
3. Local visual check: expand/collapse each experience card works; hero section looks correct without glow orb
4. `npm test` — existing tests must pass
5. Lighthouse CI: run `npx @lhci/cli@0.14.x autorun` locally after build — TBT and LCP should improve
