'use client'
import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Escuchar', desc: 'Entiendo tu marca y a quién quieres llegar.' },
  { num: '02', title: 'Diseñar', desc: 'Doy forma a una experiencia que se siente tuya.' },
  { num: '03', title: 'Construir', desc: 'Lo armo rápido, limpio y listo para crecer.' },
  { num: '04', title: 'Lanzar', desc: 'Sale al mundo. Y la gente lo nota.' },
]

export default function Process() {
  return (
    <section id="proceso" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="font-sans text-[10px] text-accent/50 uppercase tracking-[0.28em] mb-3">
            06 — Proceso
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.5rem)] font-light leading-tight text-cream">
            Simple. Rápido. <em className="text-accent italic">Tuyo.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="group"
            >
              <div className="w-10 h-10 rounded-full border border-cream/15 flex items-center justify-center mb-5 group-hover:border-accent/40 transition-colors duration-300">
                <span className="font-sans text-[11px] text-cream/30 tracking-[0.1em]">{step.num}</span>
              </div>
              <h3 className="font-serif text-2xl text-cream font-light mb-3 group-hover:text-accent transition-colors duration-300">
                {step.title}
              </h3>
              <p className="font-sans text-sm text-cream/35 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Horizontal rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent mt-20 origin-left"
        />
      </div>
    </section>
  )
}
