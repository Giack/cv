# Interactive CV Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive, single-page CV hosted on GitHub Pages at `giack.github.io/cv`, targeting FAANG EM/Director roles with AI transformation as the primary differentiator.

**Architecture:** Next.js 14 static export assembled from focused section components fed by a single `data/cv.ts` content file. All navigation uses anchor links (`#id`), making `basePath` transparent to components. GitHub Actions builds and deploys to `gh-pages` branch on every push to `main`.

**Tech Stack:** Next.js 14 · shadcn/ui · Tailwind CSS v3 · Framer Motion · TypeScript · GitHub Actions · peaceiris/actions-gh-pages

---

## File Map

| File | Responsibility |
|---|---|
| `data/cv.ts` | All CV content + TypeScript types — single source of truth |
| `app/layout.tsx` | HTML shell, metadata, fonts, global providers |
| `app/globals.css` | Tailwind directives + custom CSS variables |
| `app/page.tsx` | Assembles all section components in order |
| `components/Nav.tsx` | Sticky nav, smooth scroll, mobile hamburger |
| `components/sections/HeroSection.tsx` | Hero with gradient, name, CTA email button |
| `components/sections/AILabSection.tsx` | Claude pilot card — the key differentiator |
| `components/sections/MetricsSection.tsx` | Animated counters with Framer Motion |
| `components/sections/ExperienceSection.tsx` | Collapsible timeline of roles |
| `components/sections/SkillsSection.tsx` | Badge grid by category |
| `next.config.js` | Static export + basePath for GitHub Pages |
| `.github/workflows/deploy.yml` | CI/CD: build → gh-pages branch |

---

## Chunk 1: Project Scaffold

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `app/`, `components/`, `data/`, `public/`

- [ ] **Step 1: Run create-next-app**

```bash
cd /Users/gsortino/Workspace/cv
npx create-next-app@14 . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --no-git
```

When prompted (if interactive): TypeScript ✓, ESLint ✓, Tailwind ✓, App Router ✓, no src/ dir, import alias `@/*`.

Expected: project files created in `/Users/gsortino/Workspace/cv/`

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion
npm install -D @types/node
```

Expected: `node_modules/framer-motion` present, no errors.

- [ ] **Step 3: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted: Style → Default, Base color → Slate, CSS variables → Yes.

Expected: `components/ui/` directory created, `components.json` present.

- [ ] **Step 4: Add required shadcn components**

```bash
npx shadcn@latest add card badge button separator collapsible
```

Expected: `components/ui/card.tsx`, `components/ui/badge.tsx`, `components/ui/button.tsx`, `components/ui/separator.tsx`, `components/ui/collapsible.tsx` all present.

- [ ] **Step 5: Create required directories**

```bash
mkdir -p components/sections data docs/superpowers/plans docs/superpowers/specs
```

- [ ] **Step 6: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit
```

Expected: no errors (may see warnings about unused imports from scaffolding — acceptable).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 14 + shadcn/ui + framer-motion"
```

---

### Task 2: Configure Next.js for GitHub Pages static export

**Files:**
- Modify: `next.config.js`
- Create: `public/.nojekyll`

- [ ] **Step 1: Replace next.config.js**

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/cv',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

- [ ] **Step 2: Create .nojekyll file**

GitHub Pages ignores `_next/` folders (treated as Jekyll private) unless this file exists.

```bash
touch public/.nojekyll
```

- [ ] **Step 3: Verify build produces static output**

```bash
npm run build
```

Expected: `out/` directory created containing `index.html` and `_next/` static assets. No errors.

- [ ] **Step 4: Commit**

```bash
git add next.config.js public/.nojekyll
git commit -m "chore: configure Next.js static export with basePath for GitHub Pages"
```

---

### Task 3: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create workflow directory**

```bash
mkdir -p .github/workflows
```

- [ ] **Step 2: Write deploy.yml**

```yaml
# .github/workflows/deploy.yml
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

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

- [ ] **Step 3: Update .gitignore to exclude out/ and superpowers session files**

Append to `.gitignore`:
```
# Next.js build output
/out

# Brainstorming session files
.superpowers/
```

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/deploy.yml .gitignore
git commit -m "chore: add GitHub Actions deploy workflow for GitHub Pages"
```

---

## Chunk 2: Data Layer

### Task 4: TypeScript types and full CV content

**Files:**
- Create: `data/cv.ts`

This file is the single source of truth. No component ever hardcodes CV content.

- [ ] **Step 1: Write data/cv.ts with types and content**

```typescript
// data/cv.ts

export interface MetricItem {
  value: string        // display string e.g. "45%"
  numericEnd: number   // for counter animation e.g. 45
  label: string        // e.g. "↓ platform incidents"
  context: string      // team attribution
  color: string        // Tailwind text color class e.g. "text-sky-400"
  prefix?: string      // e.g. "$" for revenue
  suffix?: string      // e.g. "%" for percentages
}

export interface AIPilotMetric {
  label: string
  category: 'dev' | 'non-dev'
}

export interface AIPilot {
  description: string
  participants: number
  durationDays: string
  metricsTracked: AIPilotMetric[]
  vision: string
  status: string
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  highlights: string[]   // 2-3 items shown collapsed
  fullBullets: string[]  // full list shown expanded (superset of highlights)
}

export interface CVData {
  personal: {
    name: string
    title: string
    email: string
    linkedin: string
    location: string
  }
  aiPilot: AIPilot
  impactMetrics: MetricItem[]
  experience: ExperienceItem[]
  skills: Record<string, string[]>
}

export const cvData: CVData = {
  personal: {
    name: 'Giacomo Sortino',
    title: 'Director of Product and Engineering',
    email: 'giack87@gmail.com',
    linkedin: 'https://linkedin.com/in/giacomosortino', // verify exact URL
    location: 'Cesano Maderno, Italy',
  },

  aiPilot: {
    description:
      'Running a structured Claude AI pilot across 10 engineers and non-engineers, with a rigorous before/after measurement framework using custom Jira labels to quantify the real impact of AI on engineering workflows.',
    participants: 10,
    durationDays: '60-90',
    metricsTracked: [
      { label: 'Development velocity', category: 'dev' },
      { label: 'Code review cycle time', category: 'dev' },
      { label: 'QA cycle time', category: 'dev' },
      { label: 'Production deployment frequency', category: 'dev' },
      { label: 'Spec & task description completeness', category: 'non-dev' },
      { label: 'Product spec quality score', category: 'non-dev' },
    ],
    vision:
      'Shifting engineering value from code execution to product thinking — AI handles execution, humans own strategy, product quality, and architectural decisions.',
    status: 'In Progress · Q1–Q2 2026',
  },

  impactMetrics: [
    {
      value: '45%',
      numericEnd: 45,
      label: '↓ platform incidents',
      context: 'Platform team · QA Ltd',
      color: 'text-sky-400',
      suffix: '%',
    },
    {
      value: '28%',
      numericEnd: 28,
      label: '↑ feature delivery speed',
      context: 'Platform team · QA Ltd',
      color: 'text-emerald-400',
      suffix: '%',
    },
    {
      value: '2×',
      numericEnd: 2,
      label: 'B2C revenue growth',
      context: 'Growth team · Cloud Academy ($2M→$4M)',
      color: 'text-violet-400',
      suffix: '×',
    },
    {
      value: '35%',
      numericEnd: 35,
      label: '↓ JS bundle size',
      context: 'Frontend Chapter · Cloud Academy',
      color: 'text-orange-400',
      suffix: '%',
    },
    {
      value: '13',
      numericEnd: 13,
      label: 'person org led',
      context: 'Core Division · QA Ltd (EMs, SREs, FE, BE, PM, Design)',
      color: 'text-pink-400',
    },
    {
      value: '40pp',
      numericEnd: 40,
      label: '↑ test coverage',
      context: 'Frontend Chapter · Cloud Academy (45%→85%)',
      color: 'text-amber-400',
      suffix: 'pp',
    },
  ],

  experience: [
    {
      company: 'QA Ltd',
      role: 'Director of Product and Engineering',
      period: 'Mar 2025 – Present',
      highlights: [
        'Defined strategic vision for the Core division, aligning technical and product roadmaps with business objectives',
        'Lead and mentor a cross-functional org of 13 (Engineering Managers, SREs, Backend, Frontend, PMs, Designers)',
        'Leading AI transformation pilot — structured measurement of Claude impact across dev and non-dev roles',
      ],
      fullBullets: [
        'Defined strategic vision for the Core division, aligning technical and product roadmaps with business objectives',
        'Lead and mentor a cross-functional org of 13 (Engineering Managers, SREs, Backend, Frontend, PMs, Designers)',
        'Leading AI transformation pilot — structured measurement of Claude impact across dev and non-dev roles',
        'Ensured high quality standards across the division, overseeing delivery and operational stability',
        'Led strategic initiatives prioritization using ROI frameworks, balancing technical feasibility and business needs',
        'Mentored Engineering and Product Managers to foster a culture of accountability and continuous improvement',
        'Managed budget allocations, optimizing resources for maximum impact',
      ],
    },
    {
      company: 'QA Ltd',
      role: 'Senior Engineering Manager, Core Platform',
      period: 'Mar 2023 – Mar 2025',
      highlights: [
        'Reduced platform incidents by 45% with a comprehensive metrics and SLO framework',
        'Accelerated product feature delivery by 28% using automated CI/CD pipelines for customer-facing teams',
        'Established scalable auth platforms (login, registration, checkout) adopted by all product teams',
      ],
      fullBullets: [
        'Reduced platform incidents by 45% with a comprehensive metrics and SLO framework, directly improving customer-facing service availability',
        'Accelerated product feature delivery by 28% using automated CI/CD pipelines for customer-facing teams',
        'Established scalable auth platforms (login, registration, checkout) adopted by all product teams, enhancing security and simplifying UX',
        'Decreased architecture decision time with new governance processes (ADR/ASR)',
        'Applied Backend Chapter improvements and helped decide a common stack reducing fragmentation',
        'Managed the SRE team to maintain AWS infrastructure and all shared engineering tools',
      ],
    },
    {
      company: 'Cloud Academy, Inc.',
      role: 'Engineering Manager & Chapter Lead',
      period: 'Jun 2021 – Jul 2023',
      highlights: [
        'Led Growth Team (8 engineers) with full ownership of B2C e-commerce funnel, doubling revenue from $2M to $4M',
        'Drove technical strategy for B2C revenue: checkout refactor (5→3 steps), referral programs, gift cards',
        'Managed A/B testing campaigns (Google Optimize) on checkout flow to optimize conversion rates',
      ],
      fullBullets: [
        'Led Growth Team (8 engineers: Backend, Frontend, Mobile) with full ownership of B2C e-commerce funnel, doubling revenue from $2M to $4M',
        'Drove technical strategy for B2C revenue: checkout refactor (5→3 steps), referral programs, gift cards, free-week initiatives',
        'Managed A/B testing campaigns (Google Optimize) on checkout flow, testing UI/UX variations to optimize conversion',
        'Managed and mentored 8 engineers, fostering their career growth and performance',
        'Shortened onboarding time with team practice sessions; introduced 30/60/90 objectives',
      ],
    },
    {
      company: 'Cloud Academy, Inc.',
      role: 'Frontend Lead',
      period: 'Feb 2018 – Jun 2021',
      highlights: [
        'Built scalable frontend components serving 35,000+ MAU, optimizing user journeys and performance',
        'Reduced bundle size by 35% (LCP/FID improvements), directly improving B2C conversion and engagement',
        'Led design system creation, expanding test coverage from 45% to 85%',
      ],
      fullBullets: [
        'Built scalable frontend components serving 35,000+ MAU, optimizing user journeys and performance',
        'Enhanced frontend performance (LCP/FID), reduced bundle size by 35%, improving B2C conversion and engagement',
        'Expanded code coverage from 45% to 85% through automation and testing',
        'Drove design system creation, enhancing accessibility and delivering consistent UX across web/mobile',
        'Reduced production errors by 55% with TypeScript standards and improved test coverage',
        'Migrated FE monolith to a new application in a monorepo without microfrontend',
      ],
    },
    {
      company: 'Cloud Academy, Inc.',
      role: 'Android Developer',
      period: 'Nov 2016 – Feb 2018',
      highlights: [
        'Developed Android apps, increasing user engagement',
        'Integrated offline capabilities for seamless UX in varied conditions',
      ],
      fullBullets: [
        'Developed Android apps, increasing user engagement',
        'Integrated offline capabilities for seamless UX in varied conditions',
        'Managed full app lifecycle including submission, review, and updates via Google Play Store',
      ],
    },
    {
      company: 'BeMyEye',
      role: 'Android Developer',
      period: 'Jun 2014 – Nov 2016',
      highlights: [
        'Built retail apps with geolocation features, improving data quality',
        'Launched image recognition features, enhancing data collection',
      ],
      fullBullets: [
        'Built retail apps with geolocation features, improving data quality',
        'Launched image recognition features, enhancing data collection',
        'Drove roadmap features increasing user retention',
      ],
    },
    {
      company: 'Aubay (for Seat Pagine Gialle SpA)',
      role: 'Mobile Developer',
      period: 'Nov 2012 – May 2014',
      highlights: [
        'Led development of popular hybrid map app using internal JS SDK with native POI and LBS search',
        'Bootstrapped v2 map SDK based on OpenGL and C++11 for cross-platform Android/iOS use',
      ],
      fullBullets: [
        'Led development of popular hybrid map app using internal JS SDK with native POI and LBS search',
        'Bootstrapped v2 map SDK based on OpenGL and C++11 for cross-platform Android/iOS use',
        'Applied optimization techniques enhancing app UX and performance using event-based approach',
        'Collaborated on feature priorities with stakeholders',
      ],
    },
    {
      company: 'Open Reply',
      role: 'Android Developer',
      period: 'Sep 2011 – Nov 2012',
      highlights: [
        'Developed high-traffic news apps improving reliability and user experience',
        'Refactored legacy code for better scalability and maintainability',
      ],
      fullBullets: [
        'Developed high-traffic news apps improving reliability and user experience',
        'Refactored legacy code for better scalability and maintainability',
      ],
    },
    {
      company: 'TechMobile srl',
      role: 'Senior Developer',
      period: 'Mar 2010 – Sep 2011',
      highlights: [
        'Delivered mobile solutions across ecosystems focusing on quality and performance',
        'Developed PHP apps with RESTful APIs, ensuring architectural integrity',
      ],
      fullBullets: [
        'Delivered mobile solutions across ecosystems focusing on quality and performance',
        'Developed PHP apps with RESTful APIs, ensuring architectural integrity',
      ],
    },
    {
      company: 'DB Media',
      role: 'Web Developer',
      period: 'Nov 2007 – Feb 2010',
      highlights: [
        'Maintained scalable web applications using PHP and Zend, improving site reliability',
      ],
      fullBullets: [
        'Maintained scalable web applications using PHP and Zend, improving site reliability',
        'Integrated communication solutions enhancing user experience',
      ],
    },
  ],

  skills: {
    'Engineering Leadership': [
      'Team Building & Mentoring',
      'OKRs & Goal Setting',
      'Cross-functional Leadership',
      'Budget Management',
      'Hiring & Org Design',
      '30/60/90 Onboarding',
    ],
    'Platform & Architecture': [
      'System Design',
      'ADR/ASR Governance',
      'SLOs & Observability',
      'CI/CD & DevEx',
      'AWS Infrastructure',
      'Monorepo Architecture',
    ],
    Frontend: [
      'TypeScript',
      'React',
      'Next.js',
      'Performance Optimization',
      'Design Systems',
      'A/B Testing',
    ],
    Mobile: [
      'Android (Kotlin/Java)',
      'Google Play Lifecycle',
      'Offline-first UX',
    ],
    'AI & LLM Tools': [
      'Claude',
      'Pilot Program Design',
      'AI Metrics Frameworks',
      'Prompt Engineering',
    ],
    'Process & Delivery': [
      'Agile/Scrum',
      'ROI Frameworks',
      'Jira',
      'Stakeholder Management',
    ],
  },
}
```

- [ ] **Step 2: Verify TypeScript accepts the types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add data/cv.ts
git commit -m "feat: add CV data layer with TypeScript types and full content"
```

---

## Chunk 3: Layout + Navigation

### Task 5: Global layout and fonts

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Update app/globals.css**

Replace the default content with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 15 23 42;      /* slate-900 */
  --foreground: 226 232 240;   /* slate-200 */
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: rgb(15 23 42);
  color: rgb(226 232 240);
  font-family: var(--font-inter), system-ui, sans-serif;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: rgb(15 23 42);
}
::-webkit-scrollbar-thumb {
  background: rgb(51 65 85);
  border-radius: 3px;
}
```

- [ ] **Step 2: Update app/layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Giacomo Sortino — Director of Engineering',
  description:
    'Engineering Director with 15+ years of experience in SaaS and platform teams. Specializing in AI transformation, platform leadership, and scaling engineering organizations.',
  openGraph: {
    title: 'Giacomo Sortino — Director of Engineering',
    description: 'Engineering Director specializing in AI transformation and platform leadership',
    type: 'profile',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: configure global layout with Inter font and dark theme"
```

---

### Task 6: Sticky navigation with mobile hamburger

**Files:**
- Create: `components/Nav.tsx`

Nav links: About · AI Lab · Metrics · Experience · Skills. All are `href="#section-id"` anchors.
Mobile (< 768px): hamburger toggle reveals full-width dropdown. Stays sticky on all screens.

- [ ] **Step 1: Create components/Nav.tsx**

```tsx
// components/Nav.tsx
'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'AI Lab', href: '#ai-lab' },
  { label: 'Metrics', href: '#metrics' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
]

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <span className="text-sm font-semibold text-slate-300 tracking-wide">
            GS
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 hover:text-violet-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:giack87@gmail.com"
              className="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded-full transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-400 hover:text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-current my-1 transition-all ${isOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/98 border-b border-slate-800 px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2.5 text-slate-300 hover:text-violet-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:giack87@gmail.com"
            className="block mt-2 text-center bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-full transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: add sticky nav with mobile hamburger and smooth scroll links"
```

---

## Chunk 4: Hero + AI Lab Sections

### Task 7: Hero section

**Files:**
- Create: `components/sections/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection.tsx**

```tsx
// components/sections/HeroSection.tsx
import { cvData } from '@/data/cv'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function HeroSection() {
  const { personal } = cvData

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl">
        {/* Status badge */}
        <div className="flex justify-center mb-6">
          <Badge
            variant="outline"
            className="border-violet-500/50 text-violet-300 bg-violet-500/10 px-4 py-1 text-sm"
          >
            Open to EM / Director roles at FAANG-tier companies
          </Badge>
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          {personal.name}
        </h1>

        {/* Title */}
        <p className="text-xl sm:text-2xl text-violet-300 font-light mb-2">
          {personal.title}
        </p>

        <p className="text-slate-400 mb-3">{personal.location}</p>

        {/* Tagline */}
        <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          15+ years from Android developer to Director — building platforms that scale,
          teams that ship, and now leading the{' '}
          <span className="text-violet-400 font-medium">AI transformation</span>{' '}
          of engineering organizations.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-3 rounded-full text-base"
          >
            <a href={`mailto:${personal.email}`}>{personal.email}</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3 rounded-full text-base"
          >
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-500 text-sm flex flex-col items-center gap-1">
        <span>scroll</span>
        <span>↓</span>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/HeroSection.tsx
git commit -m "feat: add Hero section with gradient background and CTA"
```

---

### Task 8: AI Lab section (key differentiator)

**Files:**
- Create: `components/sections/AILabSection.tsx`

This is the most important section — shown second, immediately after hero.

- [ ] **Step 1: Create AILabSection.tsx**

```tsx
// components/sections/AILabSection.tsx
import { cvData } from '@/data/cv'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function AILabSection() {
  const { aiPilot } = cvData
  const devMetrics = aiPilot.metricsTracked.filter((m) => m.category === 'dev')
  const nonDevMetrics = aiPilot.metricsTracked.filter((m) => m.category === 'non-dev')

  return (
    <section id="ai-lab" className="py-24 px-4 bg-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-2xl">⚡</span>
          <div>
            <h2 className="text-3xl font-bold text-white">AI Transformation Lab</h2>
            <p className="text-slate-400 mt-1">
              Currently running — not a slide deck, an actual experiment
            </p>
          </div>
          <div className="ml-auto hidden sm:block">
            <Badge className="bg-violet-500/20 text-violet-300 border border-violet-500/30 px-3 py-1">
              {aiPilot.status}
            </Badge>
          </div>
        </div>

        {/* Mobile status badge */}
        <div className="sm:hidden mb-8">
          <Badge className="bg-violet-500/20 text-violet-300 border border-violet-500/30 px-3 py-1">
            {aiPilot.status}
          </Badge>
        </div>

        {/* Main card */}
        <Card className="bg-slate-800/60 border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)] mb-8">
          <CardHeader className="pb-4">
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-violet-400 font-mono text-lg">10</span>
                <span className="text-slate-400">participants selected</span>
              </div>
              <div className="text-slate-600">·</div>
              <div className="flex items-center gap-2">
                <span className="text-violet-400 font-mono text-lg">{aiPilot.durationDays}d</span>
                <span className="text-slate-400">benchmark window</span>
              </div>
              <div className="text-slate-600">·</div>
              <div className="flex items-center gap-2">
                <span className="text-violet-400">Claude</span>
                <span className="text-slate-400">as the AI layer</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 leading-relaxed mb-8">{aiPilot.description}</p>

            {/* Metrics grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Dev metrics */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  Developer metrics
                </h4>
                <ul className="space-y-2">
                  {devMetrics.map((m) => (
                    <li key={m.label} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                      {m.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Non-dev metrics */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  Non-developer metrics
                </h4>
                <ul className="space-y-2">
                  {nonDevMetrics.map((m) => (
                    <li key={m.label} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      {m.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vision statement */}
        <div className="border-l-2 border-violet-500 pl-6 py-2">
          <p className="text-lg text-slate-200 italic leading-relaxed">
            "{aiPilot.vision}"
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/AILabSection.tsx
git commit -m "feat: add AI Transformation Lab section with pilot details"
```

---

## Chunk 5: Metrics Section

### Task 9: Animated impact metrics with Framer Motion

**Files:**
- Create: `components/sections/MetricsSection.tsx`

Counters animate from 0 → `numericEnd` over 1.5s. Triggered once when 30% of section enters viewport (`useInView` with `once: true`, `amount: 0.3`). Cards stagger in with `staggerChildren: 0.1`.

- [ ] **Step 1: Create MetricsSection.tsx**

```tsx
// components/sections/MetricsSection.tsx
'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { cvData, type MetricItem } from '@/data/cv'

function AnimatedCounter({ item }: { item: MetricItem }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionValue, item.numericEnd, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = Math.round(v).toString()
        }
      },
    })
    return controls.stop
  }, [inView, item.numericEnd, motionValue])

  return (
    <div className={`text-4xl sm:text-5xl font-bold ${item.color} font-mono`}>
      {item.prefix && <span>{item.prefix}</span>}
      <span ref={ref}>0</span>
      {item.suffix && <span>{item.suffix}</span>}
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="py-24 px-4 bg-slate-950"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Impact</h2>
          <p className="text-slate-400">
            Outcomes delivered by the teams — not just shipped, measured
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {cvData.impactMetrics.map((item) => (
            <motion.div
              key={item.label}
              variants={cardVariants}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 sm:p-6 flex flex-col gap-2"
            >
              <AnimatedCounter item={item} />
              <div className="text-sm font-medium text-slate-200">{item.label}</div>
              <div className="text-xs text-slate-500 leading-snug">{item.context}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/MetricsSection.tsx
git commit -m "feat: add animated impact metrics section with Framer Motion counters"
```

---

## Chunk 6: Experience + Skills

### Task 10: Experience timeline with expand/collapse

**Files:**
- Create: `components/sections/ExperienceSection.tsx`

Uses shadcn `Collapsible`. Collapsed: shows company, role, dates, `highlights[]`. Expanded: shows `fullBullets[]` (superset).

- [ ] **Step 1: Create ExperienceSection.tsx**

```tsx
// components/sections/ExperienceSection.tsx
'use client'

import { useState } from 'react'
import { cvData, type ExperienceItem } from '@/data/cv'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Badge } from '@/components/ui/badge'

function ExperienceCard({ item }: { item: ExperienceItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border border-slate-800 rounded-xl bg-slate-900/50 overflow-hidden">
        <CollapsibleTrigger className="w-full text-left p-5 sm:p-6 hover:bg-slate-800/30 transition-colors">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-semibold text-white text-sm sm:text-base">
                  {item.role}
                </span>
                <Badge
                  variant="outline"
                  className="border-slate-700 text-slate-400 text-xs shrink-0"
                >
                  {item.company}
                </Badge>
              </div>
              <p className="text-slate-500 text-sm">{item.period}</p>

              {/* Highlights (collapsed) */}
              {!isOpen && (
                <ul className="mt-3 space-y-1.5">
                  {item.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-400 flex items-start gap-2"
                    >
                      <span className="text-violet-500 mt-1 shrink-0">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <span
              className={`text-slate-500 transition-transform duration-200 shrink-0 mt-0.5 ${
                isOpen ? 'rotate-180' : ''
              }`}
            >
              ↓
            </span>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-slate-800/50 pt-4">
            <ul className="space-y-2">
              {item.fullBullets.map((bullet, i) => (
                <li
                  key={i}
                  className="text-sm text-slate-300 flex items-start gap-2"
                >
                  <span className="text-violet-400 mt-1 shrink-0">›</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-4 bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-3">Experience</h2>
        <p className="text-slate-400 mb-12">Click any role to expand full details</p>

        <div className="space-y-3">
          {cvData.experience.map((item) => (
            <ExperienceCard
              key={`${item.company}-${item.role}`}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/ExperienceSection.tsx
git commit -m "feat: add collapsible experience timeline"
```

---

### Task 11: Skills section

**Files:**
- Create: `components/sections/SkillsSection.tsx`

- [ ] **Step 1: Create SkillsSection.tsx**

```tsx
// components/sections/SkillsSection.tsx
import { cvData } from '@/data/cv'
import { Badge } from '@/components/ui/badge'

const categoryColors: Record<string, string> = {
  'Engineering Leadership': 'border-violet-500/30 text-violet-300 bg-violet-500/10',
  'Platform & Architecture': 'border-sky-500/30 text-sky-300 bg-sky-500/10',
  'Frontend': 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
  'Mobile': 'border-orange-500/30 text-orange-300 bg-orange-500/10',
  'AI & LLM Tools': 'border-pink-500/30 text-pink-300 bg-pink-500/10',
  'Process & Delivery': 'border-amber-500/30 text-amber-300 bg-amber-500/10',
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12">Skills</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(cvData.skills).map(([category, skillList]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className={`text-xs ${categoryColors[category] ?? 'border-slate-600 text-slate-400'}`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/SkillsSection.tsx
git commit -m "feat: add skills section with color-coded category badges"
```

---

## Chunk 7: Page Assembly + Verification

### Task 12: Assemble page.tsx with all sections

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx**

```tsx
// app/page.tsx
import { Nav } from '@/components/Nav'
import { HeroSection } from '@/components/sections/HeroSection'
import { AILabSection } from '@/components/sections/AILabSection'
import { MetricsSection } from '@/components/sections/MetricsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { cvData } from '@/data/cv'

function Footer() {
  const { personal } = cvData
  return (
    <footer className="py-16 px-4 bg-slate-900 border-t border-slate-800 text-center">
      <div className="max-w-5xl mx-auto">
        <p className="text-slate-300 mb-4 text-lg">Let's talk.</p>
        <a
          href={`mailto:${personal.email}`}
          className="inline-block bg-violet-600 hover:bg-violet-500 text-white px-8 py-3 rounded-full text-base transition-colors duration-200 mb-8"
        >
          {personal.email}
        </a>
        <div className="flex justify-center gap-6 mb-8">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-violet-400 transition-colors text-sm"
          >
            LinkedIn ↗
          </a>
        </div>
        <p className="text-slate-600 text-xs">
          Built with Next.js + shadcn/ui · Hosted on GitHub Pages
        </p>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <AILabSection />
        <MetricsSection />
        <ExperienceSection />
        <SkillsSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run dev server — visual check**

```bash
npm run dev
```

Open `http://localhost:3000/cv` in browser. Verify:
- Hero renders with gradient
- Nav is sticky and links scroll to sections
- AI Lab section is second
- Metrics counter animates on scroll
- Experience expand/collapse works
- Skills badges render with colors

- [ ] **Step 3: Full TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Build static output**

```bash
npm run build
```

Expected: `out/` directory created. No errors.

- [ ] **Step 5: Verify static build locally**

```bash
npx serve out -l 3000
```

Open `http://localhost:3000/cv`. Verify the static build looks identical to dev.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble page with all sections and footer"
```

---

### Task 13: Push to GitHub and verify deploy

- [ ] **Step 1: Create GitHub repository**

Go to github.com → New repository → name: `cv` → public → no README (project already initialized).

- [ ] **Step 2: Add remote and push**

```bash
git remote add origin git@github.com:giack/cv.git
git branch -M main
git push -u origin main
```

Expected: push succeeds.

- [ ] **Step 3: Enable GitHub Pages**

Go to `github.com/giack/cv` → Settings → Pages → Source: "Deploy from a branch" → Branch: `gh-pages` → Folder: `/ (root)` → Save.

- [ ] **Step 4: Verify GitHub Action runs**

Go to `github.com/giack/cv/actions`. Verify the "Deploy to GitHub Pages" workflow triggered and completed with a green checkmark.

Expected: `gh-pages` branch created with static files.

- [ ] **Step 5: Verify live URL**

Open `https://giack.github.io/cv` in browser.

Expected: CV loads correctly with all sections, animations work, nav links scroll.

- [ ] **Step 6: Update LinkedIn URL if needed**

Open `data/cv.ts`, verify `personal.linkedin` matches your actual LinkedIn profile URL. Update if needed, commit, and push.

---

## Final Verification Checklist

- [ ] `npm run dev` → renders without errors at `localhost:3000/cv`
- [ ] `npm run build` → exits 0, no TypeScript errors
- [ ] `npx serve out -l 3000` → static build at `localhost:3000/cv` matches dev
- [ ] Metric counters animate on scroll into viewport (once only)
- [ ] Experience expand/collapse: highlights shown collapsed, fullBullets on expand
- [ ] Mobile nav (< 768px): hamburger opens/closes, links close menu on tap
- [ ] GitHub Action green → `giack.github.io/cv` live
- [ ] All nav links scroll to correct sections
- [ ] Email CTA opens mail client correctly
- [ ] Lighthouse Performance > 90, Accessibility > 90 (`npx lighthouse https://giack.github.io/cv --view`)
