'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function CircleSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.88])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-surface"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%)', filter: 'blur(60px)' }}
        />
      </div>

      <motion.div
        style={{
          y, scale, opacity,
          width: 'min(70vw, 500px)',
          aspectRatio: '1',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, rgba(200,170,255,0.2) 0%, rgba(139,92,246,0.1) 45%, transparent 75%)',
          border: '1px solid rgba(167,139,250,0.12)',
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[10px] tracking-[0.28em] uppercase text-accent/60 mb-4"
        >
          La diferencia
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-cream text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight max-w-lg"
        >
          Tu presencia digital,{' '}
          <em className="text-accent italic">redefinida.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.0 }}
          className="font-sans text-cream/30 text-sm mt-5 max-w-xs leading-relaxed"
        >
          Sitios que generan conversaciones, no solo clics.
        </motion.p>
      </div>
    </section>
  )
}
