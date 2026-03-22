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
                <span className="text-violet-400 font-mono text-lg">{aiPilot.participants}</span>
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
            &ldquo;{aiPilot.vision}&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
