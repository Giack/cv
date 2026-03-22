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
