// app/page.tsx
import dynamic from "next/dynamic"
import { Nav } from "@/components/Nav"
import { HeroSection } from "@/components/sections/HeroSection"
import { AILabSection } from "@/components/sections/AILabSection"
import { ExperienceSection } from "@/components/sections/ExperienceSection"
import { SkillsSection } from "@/components/sections/SkillsSection"
import { cvData } from "@/data/cv"

const MetricsSection = dynamic(
  () =>
    import("@/components/sections/MetricsSection").then((m) => ({
      default: m.MetricsSection,
    })),
  {
    ssr: false,
    loading: () => <div className="bg-slate-950 py-24" aria-hidden="true" />,
  }
)

function Footer() {
  const { personal } = cvData
  return (
    <footer className="border-t border-slate-800 bg-slate-900 px-4 py-16 text-center">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-lg text-slate-300">Let&apos;s talk.</p>
        <a
          href={`mailto:${personal.email}`}
          className="mb-8 inline-block rounded-full bg-violet-600 px-8 py-3 text-base text-white transition-colors duration-200 hover:bg-violet-500"
        >
          {personal.email}
        </a>
        <div className="mb-8 flex justify-center gap-6">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View LinkedIn profile (opens in new tab)"
            className="text-sm text-slate-400 transition-colors hover:text-violet-400"
          >
            LinkedIn ↗
          </a>
        </div>
        <p className="text-xs text-slate-600">
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
