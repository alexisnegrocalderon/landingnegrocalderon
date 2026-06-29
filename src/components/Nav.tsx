'use client'
import { useScroll, useMotionValueEvent, motion } from 'framer-motion'
import { useMotionValue } from 'framer-motion'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'
import Image from 'next/image'

export default function Nav() {
  const { scrollY } = useScroll()
  const bg = useMotionValue('rgba(9,7,10,0)')
  const blur = useMotionValue('blur(0px)')

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 60) {
      bg.set('rgba(9,7,10,0.88)')
      blur.set('blur(20px)')
    } else {
      bg.set('rgba(9,7,10,0)')
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
        borderBottom: '1px solid rgba(200,124,58,0.08)',
      }}
    >
      <a href="#" className="flex items-center gap-3 group" data-cursor="hover">
        <div className="relative w-9 h-9 flex-shrink-0" style={{ mixBlendMode: 'screen' }}>
          <Image src="/logo-nc.png" alt="NC" fill className="object-contain" />
        </div>
        <div>
          <span className="font-serif text-cream text-[17px] tracking-tight leading-none">
            Negro<span className="text-accent">c</span>Alderon
          </span>
          <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-cream/25 mt-0.5">Creative Studio</p>
        </div>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {['Servicios', 'Portafolio', 'Proceso', 'Testimonios'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            data-cursor="hover"
            className="font-sans text-xs tracking-[0.12em] uppercase text-cream/35 hover:text-cream/80 transition-colors duration-300"
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
        className="relative font-sans text-xs font-medium tracking-[0.08em] uppercase bg-accent text-cream px-5 py-2.5 rounded-full overflow-hidden"
      >
        <span className="relative z-10">Cotizar</span>
        <motion.span
          className="absolute inset-0 bg-accent-light rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.a>
    </motion.nav>
  )
}
