// components/sections/ExperienceSection.tsx
'use client'

import { useState } from 'react'
import { cvData, type ExperienceItem } from '@/data/cv'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Badge } from '@/components/ui/badge'

function ExperienceCard({ item }: { item: ExperienceItem }) {
  const [isOpen, setIsOpen] = useState(false)
  const isExpandable = item.fullBullets.length > item.highlights.length

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} disabled={!isExpandable}>
      <div className="border border-slate-800 rounded-xl bg-slate-900/50 overflow-hidden">
        <CollapsibleTrigger className={`w-full text-left p-5 sm:p-6 transition-colors ${isExpandable ? 'hover:bg-slate-800/30 cursor-pointer' : 'cursor-default'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-semibold text-white text-sm sm:text-base">
                  {item.role}
                </span>
                <Badge
                  variant="outline"
                  className="border-slate-700 text-slate-400 text-xs shrink-0"
                >
                  {item.company}
                </Badge>
              </div>
              <p className="text-slate-500 text-sm">{item.period}</p>

              {!isOpen && (
                <ul className="mt-3 space-y-1.5">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                      <span className="text-violet-500 mt-1 shrink-0">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {isExpandable && (
              <span className={`text-slate-500 transition-transform duration-200 shrink-0 mt-0.5 ${isOpen ? 'rotate-180' : ''}`}>
                ↓
              </span>
            )}
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-slate-800/50 pt-4">
            <ul className="space-y-2">
              {item.fullBullets.map((bullet, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-violet-400 mt-1 shrink-0">›</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-4 bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-3">Experience</h2>
        <p className="text-slate-400 mb-12">Click any role to expand full details</p>

        <div className="space-y-3">
          {cvData.experience.map((item) => (
            <ExperienceCard
              key={`${item.company}-${item.role}`}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
