'use client'
import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Escuchar', desc: 'Trazo el mapa de tu marca. Destino claro antes de despegar.' },
  { num: '02', title: 'Diseñar', desc: 'Elijo la ruta. Cada decisión visual tiene un por qué.' },
  { num: '03', title: 'Construir', desc: 'Despegue. Lo armo rápido, limpio, sin escalas.' },
  { num: '04', title: 'Aterrizar', desc: 'Llegamos. Tu presencia aterriza y la gente lo siente.' },
]

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function Process() {
  return (
    <section id="proceso" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16"
        >
          <p className="font-sans text-[10px] text-accent/50 uppercase tracking-[0.28em] mb-3">
            06 — Proceso
          </p>

          <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.5rem)] font-light leading-tight text-cream">
            Simple. Rápido. <em className="text-accent italic">Sin escalas.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              whileHover={{ x: 4 }}
              className="group"
            >
              {/* Gate indicator */}
              <div className="w-14 h-7 border border-cream/[0.10] flex items-center justify-center mb-5 group-hover:border-accent/40 transition-all duration-300">
                <span className="font-sans text-[9px] tracking-[0.12em] text-cream/25 group-hover:text-accent/60 transition-colors duration-300">
                  GATE {step.num}
                </span>
              </div>

              <h3 className="font-serif text-2xl text-cream font-light mb-3 group-hover:text-accent transition-colors duration-300">
                {step.title}
              </h3>
              <p className="font-sans text-sm text-cream/35 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Runway line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
          className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent mt-20 origin-left"
        />
      </div>
    </section>
  )
}
