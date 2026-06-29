'use client'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function Philosophy() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center bg-surface px-6 md:px-16 lg:px-24 py-32">
      <div className="max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent/60 mb-14"
        >
          03 — Filosofía
        </motion.p>

        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)', scale: 0.97 }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)', scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <h2
            className="font-serif italic font-light leading-[0.88] text-cream"
            style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}
          >
            No sigo tendencias.
          </h2>
        </motion.div>

        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)', scale: 0.97 }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)', scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.4, delay: 0.18, ease: EASE }}
        >
          <h2
            className="font-serif italic font-light leading-[0.88] text-accent"
            style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}
          >
            Trazo rutas propias.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
          className="mt-16 flex items-start gap-0"
        >
          {['Destino', 'Cultura', 'Carácter'].map((word, i) => (
            <div key={word} className="flex items-center">
              <div className="pr-8 md:pr-14">
                <div className="w-6 h-px bg-accent mb-4" />
                <span className="font-serif italic text-xl md:text-2xl text-cream/50">
                  {word}
                </span>
              </div>
              {i < 2 && (
                <span className="text-cream/[0.1] font-sans text-xs pr-8 md:pr-14">·</span>
              )}
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 1.0, ease: EASE }}
          className="font-sans text-xs text-cream/25 max-w-sm mt-10 leading-relaxed"
        >
          He vivido en 3 continentes, trabajado con marcas de 8 países,
          y aprendido que el buen diseño no tiene idioma.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 1.0, ease: EASE }}
          className="font-sans text-[8px] tracking-[0.25em] text-cream/[0.10] mt-4"
        >
          33°27&#39;S 70°40&#39;W · 55°40&#39;N 12°34&#39;E · 35°41&#39;N 139°41&#39;E
        </motion.p>
      </div>
    </section>
  )
}
