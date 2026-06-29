'use client'
import { motion } from 'framer-motion'

const projects = [
  { name: 'Proyecto WOW FX', tag: 'WOW Effect', year: '2025', desc: 'Sitio cinematográfico' },
  { name: 'Identidad de Marca', tag: 'Identidad', year: '2025', desc: 'Logo + manual de marca' },
  { name: 'Presencia Premium', tag: 'Premium', year: '2025', desc: 'Ecosistema digital completo' },
]

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function Portfolio() {
  return (
    <section id="portafolio" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <p className="font-sans text-[10px] text-accent/50 uppercase tracking-[0.28em] mb-3">
              03 — Trabajo
            </p>
            <h2
              className="font-serif font-light text-cream leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Trabajo reciente.
            </h2>
          </div>
          <a
            href="#servicios"
            data-cursor="hover"
            className="hidden md:inline-flex items-center gap-2 font-sans text-xs tracking-[0.1em] uppercase text-cream/30 hover:text-cream/70 transition-colors duration-300"
          >
            Ver todos →
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
            >
              <motion.div
                data-cursor="view"
                whileHover="hovered"
                animate="rest"
                className="relative overflow-hidden cursor-none"
                style={{ aspectRatio: '16 / 9' }}
              >
                {/* Dark placeholder */}
                <div className="absolute inset-0 bg-surface-2" />

                {/* Subtle grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.025]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(242,237,230,1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,230,1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-cream/10">
                    Imagen próximamente
                  </span>
                </div>

                {/* Red hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-accent/15"
                  variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
                  transition={{ duration: 0.25 }}
                />

                {/* Project info */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-5 md:p-6"
                  variants={{ rest: { y: 10, opacity: 0.6 }, hovered: { y: 0, opacity: 1 } }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-accent mb-1.5">
                    {project.tag} · {project.year}
                  </p>
                  <h3 className="font-serif text-cream text-lg md:text-xl font-light leading-tight">
                    {project.name}
                  </h3>
                  <p className="font-sans text-xs text-cream/35 mt-1">{project.desc}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
