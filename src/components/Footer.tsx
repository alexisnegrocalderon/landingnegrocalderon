'use client'
import { motion } from 'framer-motion'

const links = {
  Servicios: ['Logo', 'Sitio Express', 'WOW Effect', 'Premium', 'Agente IA'],
  Recursos: ['Portfolio', 'Proceso', 'Blog', 'FAQ'],
  Contacto: ['negrocalderon.com', 'Instagram', 'LinkedIn', 'WhatsApp'],
}

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="bg-dark text-cream pt-20 pb-10 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-16 mb-20">
          {/* Brand */}
          <div className="max-w-xs">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl md:text-5xl font-light leading-tight mb-6"
            >
              Negro<span className="text-red">c</span>Alderon
            </motion.h2>
            <p className="font-sans text-cream/40 text-sm leading-relaxed">
              No potencio marcas. Potencio personas. Presencia digital con alma para marcas con identidad.
            </p>
            <motion.a
              href="mailto:hola@negrocalderon.com"
              data-cursor="hover"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-block font-serif text-cream/60 hover:text-red text-sm mt-6 transition-colors duration-300"
            >
              hola@negrocalderon.com →
            </motion.a>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {Object.entries(links).map(([section, items]) => (
              <div key={section}>
                <p className="font-sans text-[10px] text-cream/25 uppercase tracking-[0.2em] mb-5">
                  {section}
                </p>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        data-cursor="hover"
                        className="font-sans text-sm text-cream/50 hover:text-cream transition-colors duration-300"
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

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-cream/10">
          <p className="font-sans text-xs text-cream/25">
            © 2024 NegrocAlderon. Todos los derechos reservados.
          </p>
          <p className="font-sans text-xs text-cream/20 italic font-serif">
            Sitios WOW FX · Chile & el mundo
          </p>
        </div>
      </div>
    </footer>
  )
}
