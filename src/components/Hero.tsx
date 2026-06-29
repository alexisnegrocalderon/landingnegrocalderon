'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'

function Counter({ from = 0, to, suffix = '' }: { from?: number; to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (!inView) return
    let start: number | null = null
    const duration = 2000
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(from + (to - from) * eased))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, from, to])

  return <span ref={ref}>{count}{suffix}</span>
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: (d: number) => ({
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.4, delay: d, ease: EASE },
  }),
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: d, ease: EASE },
  }),
}

export default function Hero() {
  const { ref: primaryRef, x: px, y: py } = useMagneticEffect(0.4)
  const { ref: secondaryRef, x: sx, y: sy } = useMagneticEffect(0.3)

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-dark">

      {/* Vertical text — right edge, SSTIL-inspired */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0, duration: 1.0 }}
        className="absolute right-5 md:right-8 top-1/2 z-10 hidden md:flex items-center"
        style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
      >
        <span className="font-sans text-[9px] tracking-[0.38em] uppercase text-cream/[0.18]">
          WOW FX · DISEÑO · IA · MOVIMIENTO
        </span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col flex-1 px-6 md:px-16 lg:px-24 pt-28 pb-12">

        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          custom={1.3}
          initial="hidden"
          animate="visible"
          className="mb-10 md:mb-14 flex items-center gap-3"
        >
          <span className="w-6 h-px bg-accent flex-shrink-0" />
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-cream/35">
            Creative Studio · Chile
          </span>
        </motion.div>

        {/* NEGRO */}
        <motion.div
          variants={clipReveal}
          custom={1.5}
          initial="hidden"
          animate="visible"
        >
          <h1
            className="font-serif italic font-light leading-[0.82] tracking-[-0.03em] text-cream select-none"
            style={{ fontSize: 'clamp(76px, 14vw, 200px)' }}
          >
            NEGRO
          </h1>
        </motion.div>

        {/* CAIDERON + NC cube */}
        <div className="flex items-end gap-4 md:gap-6">
          <motion.div
            variants={clipReveal}
            custom={1.85}
            initial="hidden"
            animate="visible"
            className="flex-1 min-w-0"
          >
            <h1
              className="font-serif italic font-light leading-[0.82] tracking-[-0.03em] select-none"
              style={{ fontSize: 'clamp(76px, 14vw, 200px)' }}
            >
              <span className="text-cream">C</span>
              <span className="text-accent">AI</span>
              <span className="text-cream">DERÓN</span>
            </h1>
          </motion.div>

          {/* NC cube — aligned to baseline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.4, duration: 1.0, ease: EASE }}
            className="relative flex-shrink-0 mb-1 md:mb-2"
            style={{
              width: 'clamp(52px, 8vw, 130px)',
              aspectRatio: '1',
              mixBlendMode: 'screen',
            }}
          >
            <Image
              src="/logo-nc.png"
              alt="negrocAIderon"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Subtitle + CTAs */}
        <motion.div
          variants={fadeUp}
          custom={2.5}
          initial="hidden"
          animate="visible"
          className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <p className="font-sans text-sm md:text-base text-cream/40 max-w-xs leading-relaxed">
            Experiencias digitales que generan<br className="hidden md:block" />
            conversaciones, no solo clics.
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            <motion.a
              ref={primaryRef as React.RefObject<HTMLAnchorElement>}
              href="#servicios"
              data-cursor="hover"
              style={{ x: px, y: py }}
              className="group relative inline-flex items-center gap-2 bg-accent text-cream font-sans text-xs font-medium tracking-[0.1em] uppercase px-7 py-3.5 overflow-hidden"
            >
              <span className="relative z-10">Cotizar ahora</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
              <motion.span
                className="absolute inset-0 bg-accent-light"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.a>
            <motion.a
              ref={secondaryRef as React.RefObject<HTMLAnchorElement>}
              href="#portafolio"
              data-cursor="hover"
              style={{ x: sx, y: sy }}
              className="inline-flex items-center gap-2 border border-cream/15 text-cream/50 hover:text-cream hover:border-cream/30 font-sans text-xs tracking-[0.1em] uppercase px-7 py-3.5 transition-colors duration-300"
            >
              Ver trabajo
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll indicator — points UP (content is above in inverted layout) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="text-dark/35"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 14V4M9 4L3 10M9 4L15 10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-dark/30">
            Deslizar
          </span>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        variants={fadeUp}
        custom={2.9}
        initial="hidden"
        animate="visible"
        className="relative z-10 border-t border-cream/[0.06] px-6 md:px-16 lg:px-24 py-5 flex flex-wrap gap-8 md:gap-16 items-center"
      >
        {[
          { val: 'Chile', label: 'Base' },
          { val: 'Dinamarca', label: 'Internacional' },
          { val: null, label: 'Proyectos', counter: { to: 200, suffix: '+' } },
          { val: 'Brand Ensuring™', label: 'Metodología' },
        ].map(({ val, label, counter }) => (
          <div key={label}>
            <div className="font-serif text-lg text-cream font-light">
              {counter ? <Counter to={counter.to} suffix={counter.suffix} /> : val}
            </div>
            <div className="font-sans text-[9px] tracking-[0.2em] uppercase text-cream/25 mt-0.5">
              {label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
