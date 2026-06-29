'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const links = {
  Servicios: ['Logo', 'Sitio Express', 'WOW Effect', 'Premium', 'Agente IA'],
  Recursos: ['Portafolio', 'Proceso', 'Blog', 'FAQ'],
  Contacto: ['negrocalderon.com', 'Instagram', 'LinkedIn', 'WhatsApp'],
}

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-cream/[0.06] pt-20 pb-10 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-16 mb-20">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 flex-shrink-0" style={{ mixBlendMode: 'screen' }}>
                <Image src="/logo-nc.png" alt="NC" fill className="object-contain" />
              </div>
              <div>
                <span className="font-serif text-cream text-lg tracking-tight">
                  Negro<span className="text-accent">c</span>Alderon
                </span>
                <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-cream/25">Creative Studio</p>
              </div>
            </div>
            <p className="font-sans text-cream/35 text-sm leading-relaxed">
              No potencio marcas. Potencio personas.<br />
              Presencia digital con alma para marcas con identidad.
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {Object.entries(links).map(([section, items]) => (
              <div key={section}>
                <p className="font-sans text-[9px] text-cream/20 uppercase tracking-[0.22em] mb-5">{section}</p>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        data-cursor="hover"
                        className="font-sans text-sm text-cream/40 hover:text-cream transition-colors duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-cream/[0.07]">
          <p className="font-sans text-xs text-cream/20">© 2025 NegrocAlderon. Todos los derechos reservados.</p>
          <p className="font-serif text-xs text-cream/15 italic">Sitios WOW FX · Chile & el mundo</p>
        </div>
      </div>
    </footer>
  )
}
