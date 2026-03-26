// components/sections/ExperienceSection.tsx
import { cvData, type ExperienceItem } from "@/data/cv"
import { Badge } from "@/components/ui/badge"

function ExperienceCard({ item }: { item: ExperienceItem }) {
  const isExpandable = item.fullBullets.length > item.highlights.length

  if (!isExpandable) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-slate-50 sm:text-base">{item.role}</span>
              <Badge variant="outline" className="shrink-0 border-slate-700 text-xs text-slate-400">
                {item.company}
              </Badge>
            </div>
            <p className="text-sm text-slate-400">{item.period}</p>
            <ul className="mt-3 space-y-1.5">
              {item.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="mt-1 shrink-0 text-violet-500">›</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <details className="group overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
      <summary className="w-full cursor-pointer list-none p-5 text-left transition-colors hover:bg-slate-800/30 sm:p-6 [&::-webkit-details-marker]:hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-slate-50 sm:text-base">{item.role}</span>
              <Badge variant="outline" className="shrink-0 border-slate-700 text-xs text-slate-400">
                {item.company}
              </Badge>
            </div>
            <p className="text-sm text-slate-400">{item.period}</p>
            <ul className="mt-3 space-y-1.5 group-open:hidden">
              {item.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="mt-1 shrink-0 text-violet-500">›</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <svg
            aria-hidden="true"
            className="mt-1 h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </summary>

      <div className="border-t border-slate-800/50 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <ul className="space-y-2">
          {item.fullBullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="mt-1 shrink-0 text-violet-400">›</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-slate-900 px-4 py-36">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 font-display text-4xl font-bold text-slate-50 sm:text-5xl">
          Experience
        </h2>

        <div className="space-y-3">
          {cvData.experience.map((item) => (
            <ExperienceCard key={`${item.company}-${item.role}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
