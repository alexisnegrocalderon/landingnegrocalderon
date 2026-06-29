'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'
import SkyAtmosphere from './SkyAtmosphere'

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
  const heroRef = useRef<HTMLElement>(null)
  const { ref: primaryRef, x: px, y: py } = useMagneticEffect(0.4)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const altDisplay = useTransform(scrollYProgress, [0, 1], [35000, 0])
  const [altValue, setAltValue] = useState(35000)
  useEffect(() => altDisplay.on('change', v => setAltValue(Math.round(v / 100) * 100)), [altDisplay])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: '#030810' }}
    >
      <SkyAtmosphere heroRef={heroRef as React.RefObject<HTMLElement>} />

      {/* Altitude indicator — left edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1.0 }}
        className="absolute left-4 md:left-6 top-1/2 z-10 hidden md:flex items-center"
        style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
      >
        <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-cream/[0.14]">
          FL{String(Math.round(altValue / 100)).padStart(3, '0')} · {altValue.toLocaleString()} FT
        </span>
      </motion.div>

      {/* Vertical text — right edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0, duration: 1.0 }}
        className="absolute right-5 md:right-8 top-1/2 z-10 hidden md:flex items-center"
        style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
      >
        <span className="font-sans text-[9px] tracking-[0.38em] uppercase text-cream/[0.18]">
          NEGRO CALDERÓN · DISEÑADOR · CHILE
        </span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col flex-1 px-6 md:px-16 lg:px-24 pt-28 pb-16">

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
            Diseñador · Chile
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
            style={{ fontSize: 'clamp(100px, 20vw, 320px)' }}
          >
            NEGRO
          </h1>
        </motion.div>

        {/* CAIDERON */}
        <motion.div
          variants={clipReveal}
          custom={1.85}
          initial="hidden"
          animate="visible"
        >
          <h1
            className="font-serif italic font-light leading-[0.82] tracking-[-0.03em] select-none"
            style={{ fontSize: 'clamp(100px, 20vw, 320px)' }}
          >
            <span className="text-cream">C</span>
            <span className="text-accent">AI</span>
            <span className="text-cream">DERÓN</span>
          </h1>
        </motion.div>

        {/* Subtitle + CTA */}
        <motion.div
          variants={fadeUp}
          custom={2.5}
          initial="hidden"
          animate="visible"
          className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <p className="font-sans text-sm md:text-base text-cream/40 max-w-xs leading-relaxed">
            He recorrido 20 países para entender qué mueve a las personas.<br className="hidden md:block" />
            Eso lo traduzco en diseño.
          </p>

          <motion.a
            ref={primaryRef as React.RefObject<HTMLAnchorElement>}
            href="#servicios"
            data-cursor="hover"
            style={{ x: px, y: py }}
            className="group relative inline-flex items-center gap-2 bg-accent text-cream font-sans text-xs font-medium tracking-[0.1em] uppercase px-7 py-3.5 overflow-hidden self-start"
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
        </motion.div>

      </div>
    </section>
  )
}
