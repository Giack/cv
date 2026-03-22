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

export type SkillCategory =
  | 'Engineering Leadership'
  | 'Platform & Architecture'
  | 'Frontend'
  | 'Mobile'
  | 'AI & LLM Tools'
  | 'Process & Delivery'

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
  skills: Record<SkillCategory, string[]>
}

export const cvData: CVData = {
  personal: {
    name: 'Giacomo Sortino',
    title: 'Director of Product and Engineering',
    email: 'giack87@gmail.com',
    linkedin: 'https://linkedin.com/in/giacomosortino',
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
