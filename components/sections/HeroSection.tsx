// components/sections/HeroSection.tsx
import { cvData } from "@/data/cv"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  const { personal } = cvData

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 px-4"
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl py-24">
        {/* Status badge */}
        <div className="mb-8">
          <Badge
            variant="outline"
            className="border-violet-500/50 bg-violet-500/10 px-4 py-1 text-sm text-violet-300"
          >
            Open to new opportunities
          </Badge>
        </div>

        {/* Name — editorial scale, Syne display font */}
        <h1 className="mb-4 font-display leading-tight tracking-tight">
          <span className="block text-5xl font-bold text-slate-400 sm:text-6xl md:text-7xl lg:text-8xl">
            {personal.name.split(" ")[0]}
          </span>
          <span className="block text-5xl font-extrabold text-slate-50 sm:text-6xl md:text-7xl lg:text-9xl">
            {personal.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        {/* Violet accent line */}
        <div className="mb-6 h-[3px] w-24 bg-violet-500" />

        {/* Title */}
        <p className="mb-1 text-xl font-medium text-violet-400 sm:text-2xl">{personal.title}</p>

        {/* Location */}
        <p className="mb-8 text-sm text-slate-400">{personal.location}</p>

        {/* Tagline */}
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-300">
          15+ years from Android developer to Director — building platforms that scale, teams that
          ship, and now leading the{" "}
          <span className="font-medium text-violet-400">AI transformation</span> of engineering
          organizations.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center justify-center rounded-full bg-violet-600 px-8 py-3 text-base text-white transition-colors hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            {personal.email}
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View LinkedIn profile (opens in new tab)"
            className="inline-flex items-center justify-center rounded-full border border-slate-600 px-8 py-3 text-base text-slate-300 transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            LinkedIn ↗
          </a>
          <a
            href="/cv/files/giacomo-sortino-cv.pdf"
            download
            aria-label="Download CV as PDF"
            className="inline-flex items-center justify-center rounded-full border border-slate-600 px-8 py-3 text-base text-slate-300 transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Download CV ↓
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-4 flex animate-float-down flex-col items-center gap-1 text-sm text-slate-500 motion-reduce:animate-none sm:left-8"
        aria-hidden="true"
      >
        <span>scroll</span>
        <span>↓</span>
      </div>
    </section>
  )
}
