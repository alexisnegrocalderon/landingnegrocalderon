'use client'
import { useScroll, useMotionValueEvent, motion } from 'framer-motion'
import { useMotionValue } from 'framer-motion'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'
import Image from 'next/image'

export default function Nav() {
  const { scrollY } = useScroll()
  const bg = useMotionValue('rgba(8,6,4,0)')
  const blur = useMotionValue('blur(0px)')

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 60) {
      bg.set('rgba(8,6,4,0.92)')
      blur.set('blur(16px)')
    } else {
      bg.set('rgba(8,6,4,0)')
      blur.set('blur(0px)')
    }
  })

  const { ref: btnRef, x: btnX, y: btnY } = useMagneticEffect(0.35)

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between"
      style={{
        backgroundColor: bg,
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        borderBottom: '1px solid rgba(242,237,230,0.05)',
      }}
    >
      <a href="#" className="flex items-center gap-3 group" data-cursor="hover">
        <div className="relative w-8 h-8 flex-shrink-0" style={{ mixBlendMode: 'screen' }}>
          <Image src="/logo-nc.png" alt="NC" fill className="object-contain" />
        </div>
        <div>
          <span className="font-serif text-cream text-[16px] tracking-tight leading-none">
            negroc<span className="text-accent">AI</span>deron
          </span>
          <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-cream/25 mt-0.5">
            Creative Studio
          </p>
        </div>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {['Servicios', 'Trabajo', 'Proceso'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            data-cursor="hover"
            className="font-sans text-xs tracking-[0.12em] uppercase text-cream/30 hover:text-cream/70 transition-colors duration-300"
          >
            {link}
          </a>
        ))}
      </div>

      <motion.a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href="#contacto"
        data-cursor="hover"
        style={{ x: btnX, y: btnY }}
        className="relative font-sans text-xs font-medium tracking-[0.1em] uppercase bg-accent text-cream px-5 py-2.5 overflow-hidden"
      >
        <span className="relative z-10">Cotizar</span>
        <motion.span
          className="absolute inset-0 bg-accent-light"
          initial={{ x: '-100%' }}
          whileHover={{ x: '0%' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.a>
    </motion.nav>
  )
}
