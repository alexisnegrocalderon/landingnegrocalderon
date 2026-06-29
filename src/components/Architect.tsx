'use client'
import { motion } from 'framer-motion'

const paths = [
  {
    tag: 'VELOCIDAD',
    title: 'Avanzas hoy mismo',
    subtitle: 'Express & WOW Effect',
    desc: 'Lanzamos en días. Un sitio impactante que empieza a convertir desde el primer mes.',
    items: ['Entrega rápida', 'Diseño probado', 'Resultados inmediatos'],
    dark: false,
  },
  {
    tag: 'PREMIUM',
    title: 'Que sea inolvidable',
    subtitle: 'Sitio Premium & Agente IA',
    desc: 'Construimos tu ecosistema digital completo. Identidad, automatización y presencia total.',
    items: ['Estrategia completa', 'IA integrada', 'Escalabilidad'],
    dark: true,
  },
]

export default function Architect() {
  return (
    <section id="proceso" className="py-24 md:py-32 px-6 md:px-12 bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <p className="font-sans text-xs text-dark/35 uppercase tracking-[0.2em] mb-4">
            Proceso
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight text-dark mb-4">
            ¿Cuál es tu arquitecto?
          </h2>
          <p className="font-sans text-dark/50 text-base max-w-md">
            Un solo arquitecto. Dos caminos. Elige la velocidad que necesitas para tu proyecto.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-sans text-sm text-dark/35 uppercase tracking-widest mt-12 mb-8"
        >
          ¿Qué velocidad necesitas?
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {paths.map((path, i) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.12,
              }}
              whileHover={{ scale: 1.02 }}
              data-cursor="view"
              className={`relative p-8 md:p-10 rounded-3xl overflow-hidden cursor-none transition-shadow duration-500 hover:shadow-2xl ${
                path.dark
                  ? 'bg-dark text-cream'
                  : 'bg-[#EDE7DA] text-dark border border-dark/10'
              }`}
            >
              <span className={`font-sans text-[10px] uppercase tracking-[0.2em] font-medium ${
                path.dark ? 'text-cream/30' : 'text-dark/30'
              }`}>
                {path.tag}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-light mt-3 mb-2 leading-tight">
                {path.title}
              </h3>
              <p className={`font-sans text-sm font-medium mb-4 ${
                path.dark ? 'text-red' : 'text-red'
              }`}>
                {path.subtitle}
              </p>
              <p className={`font-sans text-sm leading-relaxed mb-8 ${
                path.dark ? 'text-cream/55' : 'text-dark/55'
              }`}>
                {path.desc}
              </p>
              <ul className="space-y-2">
                {path.items.map((item) => (
                  <li key={item} className={`font-sans text-xs flex items-center gap-2 ${
                    path.dark ? 'text-cream/40' : 'text-dark/40'
                  }`}>
                    <span className="text-red">—</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Bottom CTA */}
              <div className={`mt-8 pt-6 border-t ${
                path.dark ? 'border-cream/10' : 'border-dark/10'
              }`}>
                <a
                  href="#contacto"
                  className={`font-sans text-sm font-medium hover:text-red transition-colors duration-300 ${
                    path.dark ? 'text-cream/60' : 'text-dark/60'
                  }`}
                >
                  Empezar ahora →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
