'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const services = [
  'Diseño de Logo',
  'Sitio Web Express',
  'Sitio WOW Effect',
  'Sitio Web Premium',
  'Agente con IA',
]

const social = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'WhatsApp', href: 'https://wa.me/56939548475' },
]

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-cream/[0.06] pt-20 pb-10 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-16 mb-20">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 flex-shrink-0" style={{ mixBlendMode: 'screen' }}>
                <Image src="/logo-nc.png" alt="NC" fill className="object-contain" />
              </div>
              <div>
                <span className="font-serif text-cream text-lg tracking-tight">
                  negroc<span className="text-accent">AI</span>deron
                </span>
                <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-cream/25 mt-0.5">
                  Diseñador · Chile
                </p>
              </div>
            </div>
            <p className="font-sans text-cream/35 text-sm leading-relaxed">
              He recorrido 20 países para entender qué mueve a las personas.<br />
              Eso lo traduzco en diseño.
            </p>
            <motion.a
              href="https://wa.me/56939548475"
              target="_blank"
              data-cursor="hover"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-block font-sans text-cream/40 hover:text-accent text-sm mt-6 transition-colors duration-300"
            >
              Escribir por WhatsApp →
            </motion.a>
          </div>

          {/* Links */}
          <div className="flex gap-16 md:gap-20">
            <div>
              <p className="font-sans text-[9px] text-cream/20 uppercase tracking-[0.22em] mb-5">Servicios</p>
              <ul className="space-y-3">
                {services.map((item) => (
                  <li key={item}>
                    <a
                      href="#servicios"
                      data-cursor="hover"
                      className="font-sans text-sm text-cream/40 hover:text-cream transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-sans text-[9px] text-cream/20 uppercase tracking-[0.22em] mb-5">Redes</p>
              <ul className="space-y-3">
                {social.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="font-sans text-sm text-cream/40 hover:text-cream transition-colors duration-300"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-cream/[0.07]">
          <p className="font-sans text-xs text-cream/20">
            © 2025 negrocAIderon. Todos los derechos reservados.
          </p>
          <p className="font-serif text-xs text-cream/15 italic">
            SCL 33°27&#39;S · Diseño que viaja
          </p>
        </div>
      </div>
    </footer>
  )
}
