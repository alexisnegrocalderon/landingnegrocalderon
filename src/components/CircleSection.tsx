'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function CircleSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-16 overflow-hidden bg-surface"
    >
      {/* Text left */}
      <div className="flex-1 max-w-lg">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.9, ease: EASE }}
          className="font-sans text-[10px] tracking-[0.28em] uppercase text-accent/60 mb-5"
        >
          La diferencia
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
          className="font-serif text-cream text-[clamp(2.2rem,5vw,4rem)] font-light leading-[0.92] tracking-[-0.02em] mb-6"
        >
          Tu presencia digital,{' '}
          <em className="text-accent italic">redefinida.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="font-sans text-cream/30 text-sm leading-relaxed max-w-sm"
        >
          No construyo páginas web. Construyo la primera impresión que tu cliente
          tendrá de ti — y esa impresión genera conversaciones, no solo clics.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.5 }}
          className="h-px bg-gradient-to-r from-accent/30 to-transparent mt-10 origin-left"
          style={{ maxWidth: 200 }}
        />
      </div>

      {/* NC cube right — parallax */}
      <motion.div
        style={{ y, opacity }}
        className="relative flex-shrink-0 w-[70vw] max-w-[340px] md:w-[32vw] md:max-w-[420px] aspect-square"
      >
        <div
          className="w-full h-full animate-float-cube"
          style={{ mixBlendMode: 'screen' }}
        >
          <Image
            src="/logo-nc.png"
            alt="NegrocAlderon"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>
    </section>
  )
}
