'use client'
import { motion } from 'framer-motion'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'

export default function CTASection() {
  const { ref, x, y } = useMagneticEffect(0.4)

  return (
    <section id="contacto" className="relative py-32 md:py-48 px-6 md:px-16 overflow-hidden bg-dark">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[10px] tracking-[0.28em] uppercase text-accent/50 mb-6"
        >
          04 — Contacto
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light leading-[0.92] tracking-[-0.02em] text-cream mb-6"
        >
          ¿Listo para que<br />te <em className="text-accent italic">recuerden?</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-sm text-cream/35 max-w-sm mx-auto leading-relaxed mb-3"
        >
          Has llegado al destino correcto. Cuéntame tu proyecto.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[8px] tracking-[0.3em] uppercase text-cream/[0.12] mb-12"
        >
          SCL 33°27&#39;S · DESTINO: TU MARCA
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a
            ref={ref as React.RefObject<HTMLAnchorElement>}
            href="https://wa.me/56939548475"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            style={{ x, y }}
            className="group relative inline-flex items-center gap-3 bg-accent text-cream font-sans text-sm font-medium tracking-[0.06em] px-10 py-4 overflow-hidden"
          >
            <span className="relative z-10">Cotizar ahora</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
            <motion.span
              className="absolute inset-0 bg-accent-light"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.a>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent mt-20 origin-center"
        />
      </div>
    </section>
  )
}
