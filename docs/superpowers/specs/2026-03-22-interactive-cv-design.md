# Interactive CV — Design Spec
**Date:** 2026-03-22
**Author:** Giacomo Sortino
**URL:** giack.github.io/cv

---

## Problem & Goal

The existing PDF CV undersells the most differentiated aspect of Giacomo's profile: AI transformation leadership. The goal is a modern, interactive web CV hosted on GitHub Pages that positions him for EM/Director roles at FAANG-tier companies, with the Claude pilot program prominently featured as a unique differentiator.

---

## Visual Direction

**Style:** Modern & Bold — gradient violet/indigo hero, card-based layout, subtle motion.
**Layout:** Single-page scroll with sticky nav.
**Nav links:** About · AI Lab · Metrics · Experience · Skills — each links to `#section-id` anchor. On mobile (< 768px): hamburger toggle reveals a full-width dropdown. Nav stays sticky at top on all screen sizes.
**Tone:** Engineering leader who still thinks like a builder.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, `output: 'export'`) |
| UI Components | shadcn/ui |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Language | TypeScript |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages (`giack.github.io/cv`) |

---

## Project Structure

```
cv/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Nav.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AILabSection.tsx
│       ├── MetricsSection.tsx
│       ├── ExperienceSection.tsx
│       └── SkillsSection.tsx
├── data/
│   └── cv.ts
├── public/
│   └── favicon.ico          # standard Next.js favicon
├── next.config.js
└── package.json
```

---

## Page Sections

### 1. Hero
- Gradient background: `from-violet-900 via-indigo-900 to-slate-900`
- Name, title ("Director of Engineering · AI Transformation"), short tagline
- Badge: "Open to EM/Director roles"
- Primary CTA: email button implemented as `<a href="mailto:giack87@gmail.com">` wrapped in shadcn Button

### 2. AI Transformation Lab ← Key Differentiator
Position: **second section**, before experience — this is the hook for FAANG recruiters.

Content:
- Headline card with glowing violet border
- Claude pilot: 10 selected engineers, 60-90 day benchmark, custom Jira labels
- Metrics tracked: dev velocity, code review cycle, QA cycle, spec completeness, task description quality
- Scope: dev and non-dev roles (PMs, designers)
- Strategic vision statement: *"Shifting engineering value from code execution to product thinking — AI handles execution, humans own strategy."*
- Status badge: "In Progress · Q1-Q2 2026"

### 3. Impact Metrics
- Animated counters triggered by Intersection Observer (Framer Motion `useInView`)
- Numbers: `45% ↓ incidents`, `28% ↑ delivery speed`, `$2M→$4M B2C revenue`, `35% ↓ bundle size`, `13 org size`
- Labels frame outcomes as team achievements, not personal ego
- Grid layout: `grid-cols-2 md:grid-cols-3` — 2 columns mobile, 3 columns desktop
- **Entrance animations:** each card fades in + slides up with staggered delay (Framer Motion `variants` + `staggerChildren: 0.1`)
- **Counter animation:** numeric value counts up from 0 over 1.5s using Framer Motion `animate` on mount after `useInView` triggers. Threshold: `amount: 0.3` (triggers at 30% visibility). Counters do **not** reset on scroll-out — animate once only (`once: true`).

### 4. Experience Timeline
- shadcn Collapsible per role
- **Collapsed state:** shows company, title, dates + `highlights[]` (2-3 curated achievements)
- **Expanded state:** shows `fullBullets[]` which is the complete list; `highlights` are a **subset** of `fullBullets` (same text, so no duplication — the collapsed state just shows fewer items from the same source array)
- Reverse chronological order

### 5. Skills
- shadcn Badge components grouped by category
- Categories: Engineering Leadership · Platform & Architecture · Frontend · Mobile · AI/LLM Tools · Process & Delivery

### 6. Footer
- Repeat email CTA + LinkedIn link
- "Built with Next.js + shadcn/ui · Hosted on GitHub Pages"

---

## Data Architecture

All content lives in `data/cv.ts` — components never hardcode strings.

```ts
export const cvData = {
  personal: {
    name: string,
    title: string,
    email: string,           // used as mailto: href
    linkedin: string,        // full URL
    location: string,
  },
  aiPilot: {
    description: string,
    participants: number,
    durationDays: string,    // e.g. "60-90"
    // Specific metrics being tracked — rendered as Badge list
    metricsTracked: Array<{ label: string; category: 'dev' | 'non-dev' }>,
    vision: string,
    status: string,          // e.g. "In Progress · Q1-Q2 2026"
  },
  impactMetrics: Array<{
    value: string,           // display string e.g. "45%", "$2M→$4M"
    numericEnd: number,      // for counter animation e.g. 45
    label: string,           // e.g. "↓ platform incidents"
    context: string,         // team attribution e.g. "Platform team · QA Ltd"
    color: string,           // Tailwind text color class e.g. "text-sky-400"
  }>,
  experience: Array<{
    company: string,
    role: string,
    period: string,
    // Top 2-3 achievements shown by default (collapsed state)
    highlights: string[],
    // Full bullet list revealed on expand (can overlap with highlights)
    fullBullets: string[],
  }>,
  skills: Record<string, string[]>,   // key = category label
}
```

---

## GitHub Actions Deploy

**One-time repository setup (manual):**
1. Create repo `giack/cv` on GitHub
2. Go to Settings → Pages → Source: select "Deploy from a branch" → branch: `gh-pages` → folder: `/ (root)`
3. Push to `main` to trigger first deploy

**deploy.yml:**
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

---

## next.config.js

```js
const nextConfig = {
  output: 'export',
  basePath: '/cv',           // repo: github.com/giack/cv → URL: giack.github.io/cv
  images: { unoptimized: true },
}
module.exports = nextConfig
```

**basePath implications for developers:**
- All internal `<Link href="...">` and `<a href="...">` paths use **relative or anchor** links (e.g., `#experience`), not absolute paths — so basePath has no practical effect on in-page navigation.
- Nav smooth-scroll links are all `href="#section-id"` anchors — no basePath handling needed.
- `next/image` is replaced by `<img>` (unoptimized) for static export compatibility.

---

## Future Enhancements (out of scope now)

- **AI Chat** — recruiter can "talk to the CV" (Claude API integration)
- **Dark/light toggle**
- **PDF export** from the page itself

---

## Verification Checklist

- [ ] `npm run dev` → page renders without errors at `localhost:3000/cv`
- [ ] `npm run build` exits 0, no TypeScript errors
- [ ] `npx serve out -l 3000` → static build loads at `localhost:3000/cv`
- [ ] Metric counters animate on scroll into viewport
- [ ] Experience expand/collapse works (shows highlights, expands to fullBullets)
- [ ] Mobile nav (< 768px) collapses to hamburger and links work
- [ ] Push to `main` → GitHub Action green → `giack.github.io/cv` live
- [ ] Lighthouse Performance > 90, Accessibility > 90
