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
        <p className="text-slate-300 mb-4 text-lg">Let&apos;s talk.</p>
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
