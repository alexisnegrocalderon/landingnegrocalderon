'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function CircleSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.88])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-[#2C2A24] overflow-hidden"
    >
      {/* Background subtle radial */}
      <div className="absolute inset-0 bg-gradient-radial from-dark/50 to-[#2C2A24] pointer-events-none" />

      {/* The large parallax circle */}
      <motion.div
        style={{ y, scale, opacity }}
        className="relative w-[min(75vw,560px)] aspect-square rounded-full bg-sand/75"
      />

      {/* Centered text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-cream text-2xl md:text-3xl leading-relaxed max-w-sm"
        >
          Tu presencia digital,{' '}
          <em className="text-red not-italic italic">redefinida.</em>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.0 }}
          className="font-sans text-cream/40 text-sm mt-6 max-w-xs leading-relaxed"
        >
          Sitios que generan conversaciones, no solo clics.
        </motion.p>
      </div>
    </section>
  )
}
