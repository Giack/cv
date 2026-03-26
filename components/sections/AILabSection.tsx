// components/sections/AILabSection.tsx
import { cvData } from "@/data/cv"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function AILabSection() {
  const { aiPilot } = cvData
  const devMetrics = aiPilot.metricsTracked.filter((m) => m.category === "dev")
  const nonDevMetrics = aiPilot.metricsTracked.filter((m) => m.category === "non-dev")

  return (
    <section id="ai-lab" className="bg-slate-900 px-4 py-16">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-10 flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
              Live Initiative
            </p>
            <h2 className="font-display text-4xl font-bold text-slate-50 sm:text-5xl">
              AI Transformation Lab
            </h2>
            <p className="mt-1 text-slate-400">
              Currently running — not a slide deck, an actual experiment
            </p>
          </div>
          <div className="mt-1 hidden shrink-0 sm:block">
            <Badge className="border border-violet-500/30 bg-violet-500/20 px-3 py-1 text-violet-300">
              {aiPilot.status}
            </Badge>
          </div>
        </div>

        {/* Mobile status badge */}
        <div className="mb-6 sm:hidden">
          <Badge className="border border-violet-500/30 bg-violet-500/20 px-3 py-1 text-violet-300">
            {aiPilot.status}
          </Badge>
        </div>

        {/* Main card */}
        <Card className="mb-8 border-violet-500/30 bg-slate-800/60">
          <CardHeader className="pb-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-violet-400">
                  {aiPilot.participants}
                </span>
                <span className="text-slate-400">participants selected</span>
              </div>
              <div className="text-slate-600" aria-hidden="true">
                ·
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-violet-400">
                  {aiPilot.durationDays}d
                </span>
                <span className="text-slate-400">benchmark window</span>
              </div>
              <div className="text-slate-600" aria-hidden="true">
                ·
              </div>
              <div className="flex items-center gap-2">
                <span className="text-violet-400">Claude</span>
                <span className="text-slate-400">as the AI layer</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-8 leading-relaxed text-slate-300">{aiPilot.description}</p>

            {/* Metrics grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Dev metrics */}
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Developer metrics
                </h4>
                <ul className="space-y-2">
                  {devMetrics.map((m) => (
                    <li key={m.label} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500" />
                      {m.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Non-dev metrics */}
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Non-developer metrics
                </h4>
                <ul className="space-y-2">
                  {nonDevMetrics.map((m) => (
                    <li key={m.label} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                      {m.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vision statement */}
        <div className="border-l-2 border-violet-500 py-2 pl-6">
          <p className="text-lg italic leading-relaxed text-slate-200">
            &ldquo;{aiPilot.vision}&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
