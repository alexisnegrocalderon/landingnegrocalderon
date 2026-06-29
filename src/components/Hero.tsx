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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 1.7 } },
}

const lineVariants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 1.0, ease: EASE } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Main hero area — asymmetric split */}
        <div className="flex flex-col md:flex-row items-center flex-1 px-6 md:px-16 lg:px-24 pt-28 pb-16 gap-12 md:gap-0">

          {/* Left — text */}
          <div className="flex flex-col flex-1 min-w-0">
            <motion.div
              custom={1.3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 mb-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent dot-pulse" />
              <span className="font-sans text-[11px] tracking-[0.22em] uppercase text-cream/40">
                Diseño · IA · Movimiento
              </span>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              <div className="reveal-clip">
                <motion.h1
                  variants={lineVariants}
                  className="font-serif text-[clamp(72px,11vw,140px)] font-light leading-[0.88] tracking-[-0.03em] text-cream"
                >
                  No potencio
                </motion.h1>
              </div>
              <div className="reveal-clip">
                <motion.h1
                  variants={lineVariants}
                  className="font-serif text-[clamp(72px,11vw,140px)] font-light leading-[0.88] tracking-[-0.03em] text-cream"
                >
                  marcas.
                </motion.h1>
              </div>
              <div className="reveal-clip">
                <motion.h1
                  variants={lineVariants}
                  className="font-serif text-[clamp(72px,11vw,140px)] font-light leading-[0.88] tracking-[-0.03em] italic text-accent"
                >
                  Potencio
                </motion.h1>
              </div>
              <div className="reveal-clip">
                <motion.h1
                  variants={lineVariants}
                  className="font-serif text-[clamp(72px,11vw,140px)] font-light leading-[0.88] tracking-[-0.03em] italic text-accent"
                >
                  personas.
                </motion.h1>
              </div>
            </motion.div>

            <motion.p
              custom={2.2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-sans text-sm md:text-base text-cream/40 max-w-sm leading-relaxed mb-10"
            >
              Experiencias digitales para marcas<br className="hidden md:block" /> que quieren sentirse del futuro.
            </motion.p>

            <motion.div
              custom={2.5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 items-center"
            >
              <motion.a
                ref={primaryRef as React.RefObject<HTMLAnchorElement>}
                href="#servicios"
                data-cursor="hover"
                style={{ x: px, y: py }}
                className="group relative inline-flex items-center gap-2 bg-accent text-cream font-sans text-sm font-medium tracking-[0.06em] px-7 py-3.5 rounded-full overflow-hidden"
              >
                <span className="relative z-10">Cotizar ahora</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <motion.span
                  className="absolute inset-0 rounded-full bg-accent-light"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.a>

              <motion.a
                ref={secondaryRef as React.RefObject<HTMLAnchorElement>}
                href="#portafolio"
                data-cursor="hover"
                style={{ x: sx, y: sy }}
                className="inline-flex items-center gap-2 border border-cream/15 text-cream/50 hover:text-cream/80 hover:border-cream/30 font-sans text-sm tracking-[0.06em] px-7 py-3.5 rounded-full transition-colors duration-300"
              >
                Ver portafolio
              </motion.a>
            </motion.div>
          </div>

          {/* Right — NC cube */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.0, ease: EASE }}
            className="relative flex-shrink-0 w-[80vw] max-w-[380px] md:w-[38vw] md:max-w-[520px] aspect-square"
            style={{ mixBlendMode: 'screen' }}
          >
            <div className="w-full h-full animate-float-cube">
              <Image
                src="/logo-nc.png"
                alt="NegrocAlderon"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          custom={2.8}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-2 px-6 md:px-16 lg:px-24 pb-8"
        >
          <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-cream/25">Desliza</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-accent/50 to-transparent"
          />
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
        custom={3.0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative z-10 border-t border-cream/[0.06] px-6 md:px-16 lg:px-24 py-6 flex flex-wrap gap-8 md:gap-16 items-center"
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
            <div className="font-sans text-[9px] tracking-[0.2em] uppercase text-cream/25 mt-0.5">{label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
