'use client'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 1.6,
    },
  },
}

const lineVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v) + suffix)

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration: 2.2, ease: 'easeOut' })
    }
  }, [isInView, count, to])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

export default function Hero() {
  const { ref: cta1Ref, x: cta1X, y: cta1Y } = useMagneticEffect(0.3)
  const { ref: cta2Ref, x: cta2X, y: cta2Y } = useMagneticEffect(0.3)

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 px-6 md:px-12 overflow-hidden bg-cream">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb-1 absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-sand/40 to-transparent blur-3xl opacity-70" />
        <div className="orb-2 absolute bottom-0 -left-24 w-[420px] h-[420px] rounded-full bg-gradient-radial from-red/10 to-transparent blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="font-sans text-xs text-dark/40 uppercase tracking-[0.2em] mb-8"
        >
          Presencia digital · Desde Chile al mundo
        </motion.p>

        {/* Main headline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <div className="reveal-clip">
            <motion.h1
              variants={lineVariants}
              className="font-serif font-light text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.95] tracking-tight text-dark"
            >
              No potencio marcas.
            </motion.h1>
          </div>
          <div className="reveal-clip">
            <motion.h1
              variants={lineVariants}
              className="font-serif font-light text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.95] tracking-tight italic text-red"
            >
              Potencio personas.
            </motion.h1>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.p
            variants={fadeUp}
            className="font-sans text-base md:text-lg text-dark/55 max-w-md leading-relaxed mb-10"
            style={{ transitionDelay: '0.2s' } as React.CSSProperties}
          >
            Viaja por el mundo y construyo presencia digital con alma.
            Shops, IA y automatización para marcas con identidad.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-16">
            <motion.a
              ref={cta1Ref as React.RefObject<HTMLAnchorElement>}
              href="#servicios"
              data-cursor="hover"
              style={{ x: cta1X, y: cta1Y }}
              className="relative font-sans text-sm font-medium bg-red text-cream px-7 py-3.5 rounded-full overflow-hidden group"
            >
              <span className="relative z-10">Ver tarifas</span>
              <motion.span
                className="absolute inset-0 bg-dark rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.a>

            <motion.a
              ref={cta2Ref as React.RefObject<HTMLAnchorElement>}
              href="#contacto"
              data-cursor="hover"
              style={{ x: cta2X, y: cta2Y }}
              className="font-sans text-sm font-medium border border-dark/25 text-dark px-7 py-3.5 rounded-full hover:border-dark transition-colors duration-300"
            >
              Consultar proyecto
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="flex flex-wrap items-center gap-8 md:gap-16 pt-8 border-t border-dark/10"
        >
          {[
            { label: 'Chile', value: null, text: 'Chile' },
            { label: 'Dinamarca', value: null, text: 'Dinamarca' },
            { label: 'Proyectos', value: 200, suffix: '+' },
            { label: 'Marca', value: null, text: 'Brand Ensuring™' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <span className="font-serif text-xl md:text-2xl font-medium text-dark">
                {stat.value !== null ? (
                  <Counter to={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.text
                )}
              </span>
              <span className="font-sans text-xs text-dark/35 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
