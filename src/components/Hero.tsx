'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
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

      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute orb-1"
          style={{
            top: '-10%', right: '-5%',
            width: '65vw', height: '65vw',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.22) 0%, rgba(100,50,200,0.1) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute orb-2"
          style={{
            bottom: '-15%', left: '-10%',
            width: '50vw', height: '50vw',
            background: 'radial-gradient(ellipse, rgba(80,30,160,0.18) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '30%', left: '40%',
            width: '30vw', height: '30vw',
            background: 'radial-gradient(ellipse, rgba(167,139,250,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Glass spheres */}
        <div
          className="absolute orb-1"
          style={{
            top: '18%', right: '12%',
            width: 220, height: 220,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 28%, rgba(200,170,255,0.22) 0%, rgba(139,92,246,0.1) 40%, transparent 75%)',
            border: '1px solid rgba(167,139,250,0.12)',
            boxShadow: '0 0 60px rgba(139,92,246,0.12), inset 0 0 40px rgba(167,139,250,0.06)',
          }}
        />
        <div
          className="absolute orb-3"
          style={{
            top: '55%', right: '28%',
            width: 130, height: 130,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 25%, rgba(200,170,255,0.18) 0%, rgba(139,92,246,0.08) 45%, transparent 75%)',
            border: '1px solid rgba(167,139,250,0.1)',
            boxShadow: '0 0 40px rgba(139,92,246,0.1)',
          }}
        />
        <div
          className="absolute orb-2"
          style={{
            bottom: '25%', left: '15%',
            width: 90, height: 90,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(200,170,255,0.15) 0%, transparent 70%)',
            border: '1px solid rgba(167,139,250,0.08)',
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center flex-1 px-6 md:px-16 lg:px-24 pt-28 pb-32">

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
              className="font-serif text-[clamp(52px,8vw,96px)] font-light leading-[0.9] tracking-[-0.02em] text-cream"
            >
              No potencio
            </motion.h1>
          </div>
          <div className="reveal-clip">
            <motion.h1
              variants={lineVariants}
              className="font-serif text-[clamp(52px,8vw,96px)] font-light leading-[0.9] tracking-[-0.02em] text-cream"
            >
              marcas.
            </motion.h1>
          </div>
          <div className="reveal-clip">
            <motion.h1
              variants={lineVariants}
              className="font-serif text-[clamp(52px,8vw,96px)] font-light leading-[0.9] tracking-[-0.02em] italic text-accent"
            >
              Potencio personas.
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
          className="flex flex-wrap gap-4 items-center mb-16"
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

        <motion.div
          custom={2.8}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-2"
        >
          <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-cream/25">Desliza</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-accent/50 to-transparent"
          />
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
