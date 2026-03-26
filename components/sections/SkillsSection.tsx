// components/sections/SkillsSection.tsx
import { cvData, type SkillCategory } from "@/data/cv"
import { Badge } from "@/components/ui/badge"

const categoryColors: Record<SkillCategory, string> = {
  "Engineering Leadership": "border-violet-500/30 text-violet-300 bg-violet-500/10",
  "Platform & Architecture": "border-sky-500/30 text-sky-300 bg-sky-500/10",
  Frontend: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10",
  Mobile: "border-orange-500/30 text-orange-300 bg-orange-500/10",
  "AI & LLM Tools": "border-pink-500/30 text-pink-300 bg-pink-500/10",
  "Process & Delivery": "border-amber-500/30 text-amber-300 bg-amber-500/10",
}

export function SkillsSection() {
  return (
    <section id="skills" className="bg-slate-950 px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 font-display text-4xl font-bold text-slate-50 sm:text-5xl">Skills</h2>
        <p className="mb-12 text-slate-400">
          Tools, disciplines, and frameworks across 15 years of engineering leadership
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.entries(cvData.skills) as [SkillCategory, string[]][]).map(
            ([category, skillList]) => (
              <div key={category}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
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
            )
          )}
        </div>
      </div>
    </section>
  )
}
