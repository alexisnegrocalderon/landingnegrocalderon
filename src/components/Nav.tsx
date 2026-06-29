'use client'
import { useScroll, useMotionValueEvent, motion, useMotionValue } from 'framer-motion'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'

export default function Nav() {
  const { scrollY } = useScroll()
  const bg = useMotionValue('rgba(244,238,228,0)')
  const blur = useMotionValue('blur(0px)')
  const borderOpacity = useMotionValue(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 60) {
      bg.set('rgba(244,238,228,0.85)')
      blur.set('blur(20px)')
      borderOpacity.set(1)
    } else {
      bg.set('rgba(244,238,228,0)')
      blur.set('blur(0px)')
      borderOpacity.set(0)
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
        borderBottom: `1px solid rgba(28,27,24,${borderOpacity.get()})`,
      }}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-2 group" data-cursor="hover">
        <span className="font-serif text-dark text-xl font-semibold tracking-tight">
          Negro<span className="text-red">c</span>Alderon
        </span>
      </a>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        {['Servicios', 'Portfolio', 'Proceso', 'Contacto'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            data-cursor="hover"
            className="font-sans text-sm text-dark/60 hover:text-dark transition-colors duration-300 tracking-wide"
          >
            {link}
          </a>
        ))}
      </div>

      {/* CTA */}
      <motion.a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href="#contacto"
        data-cursor="hover"
        style={{ x: btnX, y: btnY }}
        className="relative font-sans text-sm font-medium bg-red text-cream px-5 py-2.5 rounded-full overflow-hidden group"
      >
        <span className="relative z-10">Consultar</span>
        <motion.span
          className="absolute inset-0 bg-dark rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.a>
    </motion.nav>
  )
}
