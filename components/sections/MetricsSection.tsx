// components/sections/MetricsSection.tsx
'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { cvData, type MetricItem } from '@/data/cv'

function AnimatedCounter({ item }: { item: MetricItem }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionValue, item.numericEnd, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = Math.round(v).toString()
        }
      },
    })
    return controls.stop
  }, [inView, item.numericEnd, motionValue])

  return (
    <div className={`text-4xl sm:text-5xl font-bold ${item.color} font-mono`}>
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
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="py-24 px-4 bg-slate-950"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Impact</h2>
          <p className="text-slate-400">
            Outcomes delivered by the teams — not just shipped, measured
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {cvData.impactMetrics.map((item) => (
            <motion.div
              key={item.label}
              variants={cardVariants}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 sm:p-6 flex flex-col gap-2"
            >
              <AnimatedCounter item={item} />
              <div className="text-sm font-medium text-slate-200">{item.label}</div>
              <div className="text-xs text-slate-500 leading-snug">{item.context}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
