// components/sections/HeroSection.tsx
import { cvData } from "@/data/cv"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  const { personal } = cvData

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-3xl">
        {/* Status badge */}
        <div className="mb-6 flex justify-center">
          <Badge
            variant="outline"
            className="border-violet-500/50 bg-violet-500/10 px-4 py-1 text-sm text-violet-300"
          >
            Open to new opportunities
          </Badge>
        </div>

        {/* Name */}
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-slate-50 sm:text-6xl md:text-7xl">
          {personal.name}
        </h1>

        {/* Title */}
        <p className="mb-2 text-xl font-light text-violet-300 sm:text-2xl">{personal.title}</p>

        <p className="mb-3 text-slate-400">{personal.location}</p>

        {/* Tagline */}
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-300">
          15+ years from Android developer to Director — building platforms that scale, teams that
          ship, and now leading the{" "}
          <span className="font-medium text-violet-400">AI transformation</span> of engineering
          organizations.
        </p>

        {/* CTAs */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="rounded-full bg-violet-600 px-8 py-3 text-base text-white hover:bg-violet-500"
          >
            <a href={`mailto:${personal.email}`}>{personal.email}</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-slate-600 px-8 py-3 text-base text-slate-300 hover:bg-slate-800"
          >
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View LinkedIn profile (opens in new tab)"
            >
              LinkedIn ↗
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-float-down flex-col items-center gap-1 text-sm text-slate-500 motion-reduce:animate-none"
        aria-hidden="true"
      >
        <span>scroll</span>
        <span>↓</span>
      </div>
    </section>
  )
}
