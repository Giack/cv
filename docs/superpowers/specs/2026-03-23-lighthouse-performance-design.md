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

**Files:** `components/sections/ExperienceSection.tsx`, `__tests__/components/ExperienceSection.test.tsx`

**Goal:** Remove `'use client'`, `useState`, and `@radix-ui/react-collapsible` entirely. Convert to a Server Component.

### Approach

Use native HTML `<details>`/`<summary>` for the expand/collapse behavior. The browser handles the toggle with zero JavaScript.

**Key implementation details:**

- **Marker removal**: `[&::-webkit-details-marker]:hidden` on `<summary>` removes the browser's built-in disclosure triangle across Webkit/Blink. `list-none` alone is insufficient in Chrome/Safari.
- **`group` placement**: `group` class must be on the `<details>` element directly (not a wrapper div) for `group-open:` variants to work. Tailwind CSS v3.4+ (project uses `^3.4.1`) supports `group-open:` natively.
- **`group-open:hidden`** on the highlights list — hides highlights when the card is expanded (reads the HTML `[open]` attribute set by the browser on `<details>`)
- **`group-open:rotate-180`** on the `↓` arrow — replaces the current `isOpen ? 'rotate-180' : ''` state-driven transition
- **`group-open:` class strings** must appear as literal strings in source (not dynamically constructed) for Tailwind's content scanner to include them — they will be static, so this is satisfied
- **Non-expandable cards** (`fullBullets.length <= highlights.length`): render a plain `<div>` — HTML has no `disabled` attribute for `<details>`, so conditional rendering is correct

### Structure

```
ExperienceSection (Server Component — no 'use client')
  └─ ExperienceCard (Server Component)
       ├─ [isExpandable] → <details className="group ...">
       │    ├─ <summary className="... [&::-webkit-details-marker]:hidden">
       │    │    ├─ role, company badge, period
       │    │    ├─ highlights (group-open:hidden)
       │    │    └─ ↓ arrow (group-open:rotate-180)
       │    └─ fullBullets content (visible when open)
       └─ [!isExpandable] → <div ...>
            └─ role, company badge, period, highlights (no arrow)
```

### Animation trade-off (acknowledged)

The current Radix `CollapsibleContent` provides a CSS height animation (`accordion-down`/`accordion-up` from `tailwindcss-animate`). Native `<details>` has no built-in transition — content appears/disappears instantly.

**Decision: accept this trade-off.** The animation is a subtle enhancement. Removing client-side JS entirely is the goal; the zero-JS benefit outweighs the animation loss. The `tailwindcss-animate` accordion keyframes in `tailwind.config.ts` become unused after this change (can be removed in a follow-up cleanup).

A pure CSS `interpolate-size` + `@starting-style` approach exists for native `<details>` animation but has limited browser support (Chrome 129+ only as of March 2026) and is out of scope.

### What is removed

- `'use client'` directive
- `useState` and `useRef` imports
- `@radix-ui/react-collapsible` imports (`Collapsible`, `CollapsibleContent`, `CollapsibleTrigger`)
- `isOpen` / `setIsOpen` state

### Test updates required

The existing tests in `__tests__/components/ExperienceSection.test.tsx` use Radix-specific ARIA semantics that do not apply to native `<details>/<summary>`:

| Old assertion                                | Why it breaks                                          | New assertion                                                            |
| -------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------ |
| `screen.getAllByRole("button")`              | `<summary>` has no implicit `button` role in JSDOM     | `document.querySelectorAll("details")` or `screen.getAllByRole("group")` |
| `.toHaveAttribute("aria-expanded", "false")` | `<details>` uses `open` attribute, not `aria-expanded` | `expect(el).not.toHaveAttribute("open")`                                 |
| `.toHaveAttribute("aria-expanded", "true")`  | Same                                                   | `expect(el).toHaveAttribute("open")`                                     |
| Click to toggle                              | Must click `<summary>`, not role="button"              | `userEvent.click(container.querySelector("summary"))`                    |

Tests to rewrite: `expandable cards render a toggle button`, `first card starts collapsed`, `clicking trigger expands the card`, `clicking trigger again collapses the card`.

Tests that remain valid unchanged: `renders the Experience heading`, `renders role and company names from cv data`.

---

## Change 2: Remove blur-3xl glow orb from HeroSection

**File:** `components/sections/HeroSection.tsx`

**Goal:** Eliminate the CSS `filter: blur(64px)` operation that blocks LCP paint.

### Approach

Remove the glow orb `<div>` entirely:

```jsx
// DELETE this element (HeroSection.tsx line ~28):
<div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-3xl" />
```

The `bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900` background gradient already provides a rich dark-violet atmosphere. The blur orb is a subtle visual enhancement, barely perceptible on mobile, that costs ~3s of LCP on a throttled CPU.

**What stays unchanged:** gradient background, grid overlay, all text content, CTAs, scroll hint, Badge, Button components.

---

## Expected Outcome

| Metric      | Before  | Expected After |
| ----------- | ------- | -------------- |
| TBT         | 4,260ms | ~1,000–1,800ms |
| LCP         | 4.4s    | ~2.0–3.0s      |
| Performance | 53      | ~70–80         |

TBT improvement: ExperienceSection removed from client hydration. Framer Motion already deferred. Remaining client components are Nav (lightweight scroll listener) and MetricsSection (lazy-loaded).

LCP improvement: compositor-blocking blur filter removed from the stacking context of the `h1` LCP element.

---

## Files Modified

| File                                              | Change                                                                                |
| ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `components/sections/ExperienceSection.tsx`       | Remove `'use client'`, `useState`, Radix imports; rewrite using `<details>/<summary>` |
| `__tests__/components/ExperienceSection.test.tsx` | Rewrite 4 tests to use native `<details>` semantics (see table above)                 |
| `components/sections/HeroSection.tsx`             | Remove one `<div>` (glow orb)                                                         |

## Verification

1. `npm run build` — must pass with no TypeScript errors
2. `npm run lint` — no new ESLint warnings
3. `npm test` — all tests pass (including rewritten ExperienceSection tests)
4. Local visual check: expand/collapse each experience card works; hero section looks correct without glow orb
5. Lighthouse CI: run `npx @lhci/cli@0.14.x autorun` locally after build — TBT and LCP should improve
