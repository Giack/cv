// components/sections/SkillsSection.tsx
import { cvData, type SkillCategory } from '@/data/cv'
import { Badge } from '@/components/ui/badge'

const categoryColors: Record<SkillCategory, string> = {
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
          {(Object.entries(cvData.skills) as [SkillCategory, string[]][]).map(([category, skillList]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className={`text-xs ${categoryColors[category]}`}
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
