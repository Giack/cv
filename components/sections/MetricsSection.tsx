// components/sections/MetricsSection.tsx
"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useMotionValue, animate, useReducedMotion } from "framer-motion"
import { cvData, type MetricItem } from "@/data/cv"

function AnimatedCounter({ item, featured = false }: { item: MetricItem; featured?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reducedMotion) {
      if (ref.current) ref.current.textContent = item.numericEnd.toString()
      return
    }
    const controls = animate(motionValue, item.numericEnd, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = Math.round(v).toString()
        }
      },
    })
    return controls.stop
  }, [inView, item.numericEnd, motionValue, reducedMotion])

  return (
    <div
      className={`font-bold [font-variant-numeric:tabular-nums] ${item.color} ${
        featured ? "text-6xl sm:text-7xl" : "text-4xl sm:text-5xl"
      }`}
    >
      {item.prefix && <span>{item.prefix}</span>}
      <span ref={ref}>0</span>
      {item.suffix && <span>{item.suffix}</span>}
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.3 })

  const primaryMetrics = cvData.impactMetrics.slice(0, 2)
  const secondaryMetrics = cvData.impactMetrics.slice(2)

  return (
    <section id="metrics" ref={sectionRef} className="bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <h2 className="mb-3 font-display text-4xl font-bold text-slate-50 sm:text-5xl">Impact</h2>
          <p className="text-slate-400">
            Outcomes delivered by the teams — not just shipped, measured
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Primary metrics — featured row */}
          <div className="mb-4 grid grid-cols-2 gap-4 sm:mb-6 sm:gap-6">
            {primaryMetrics.map((item: MetricItem) => (
              <motion.div
                key={item.label}
                variants={cardVariants}
                className="flex flex-col gap-2 rounded-xl border border-slate-700/70 bg-slate-800/70 p-6 sm:p-8"
              >
                <AnimatedCounter item={item} featured />
                <div className="text-sm font-medium text-slate-200">{item.label}</div>
                <div className="text-xs leading-snug text-slate-400">{item.context}</div>
              </motion.div>
            ))}
          </div>

          {/* Secondary metrics — supporting grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {secondaryMetrics.map((item: MetricItem) => (
              <motion.div
                key={item.label}
                variants={cardVariants}
                className="flex flex-col gap-2 rounded-xl border border-slate-700/50 bg-slate-800/50 p-5 sm:p-6"
              >
                <AnimatedCounter item={item} />
                <div className="text-sm font-medium text-slate-200">{item.label}</div>
                <div className="text-xs leading-snug text-slate-400">{item.context}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
