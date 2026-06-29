'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import ContactModal from './ContactModal'

type Service = {
  id: string
  title: string
  price: string
  amount: number | null
  desc: string
}

const services: Service[] = [
  { id: 'logo', title: 'Diseño de Logo', price: '$21.285', amount: 21285, desc: 'Identidad visual única, vectores y manual de marca básico.' },
  { id: 'express', title: 'Sitio Web Express', price: '$58.500', amount: 58500, desc: 'Sitio rápido y optimizado. Listo en días, listo para vender.' },
  { id: 'wow', title: 'Sitio "WOW Effect"', price: '$133.500', amount: 133500, desc: 'El sitio que hace que tus clientes se detengan y digan WOW.' },
  { id: 'premium', title: 'Sitio Web Premium', price: '$210.000', amount: 210000, desc: 'Ecosistema digital completo. Tu marca a otro nivel.' },
  { id: 'redes', title: 'Gestión de Redes Sociales', price: 'Consultar', amount: null, desc: 'Community manager estratégico para escalar tu comunidad.' },
  { id: 'posts', title: 'Diseño de Posts / Carruseles', price: 'Consultar', amount: null, desc: 'Pack de contenido visual semanal con identidad de marca.' },
  { id: 'videos', title: 'Videos Reels de Impacto', price: '$15.000/u', amount: 15000, desc: 'Reels editados para captar atención y convertir en segundos.' },
  { id: 'ia', title: 'Agente con IA', price: 'Consultar', amount: null, desc: 'Automatización inteligente que trabaja por tu negocio 24/7.' },
]

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

function ServiceRow({ service, selected, onToggle, index }: {
  service: Service; selected: boolean; onToggle: () => void; index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onClick={onToggle}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-cursor="hover"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
      className={`group flex items-center gap-5 md:gap-8 py-6 border-b cursor-none transition-colors duration-300 ${
        selected ? 'border-accent/30' : 'border-cream/[0.07]'
      }`}
    >
      {/* Index */}
      <span className={`font-sans text-[9px] tracking-[0.2em] w-5 flex-shrink-0 transition-colors duration-300 ${
        selected ? 'text-accent' : 'text-cream/18'
      }`}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Name + hover description */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-serif font-light leading-tight transition-colors duration-300 ${
          selected ? 'text-cream' : 'text-cream/65 group-hover:text-cream/90'
        }`} style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)' }}>
          {service.title}
        </h3>
        <AnimatePresence>
          {(hovered || selected) && (
            <motion.p
              key="desc"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="font-sans text-xs text-cream/28 leading-relaxed overflow-hidden"
            >
              {service.desc}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Price — large */}
      <span className={`font-serif font-light flex-shrink-0 transition-colors duration-300 ${
        selected ? 'text-accent' : 'text-cream/45 group-hover:text-cream/65'
      }`} style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2rem)' }}>
        {service.price}
      </span>

      {/* Select indicator */}
      <div className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
        selected ? 'bg-accent border-accent' : 'border-cream/15 group-hover:border-cream/30'
      }`}>
        {selected && <span className="text-cream text-[8px] font-bold leading-none">✓</span>}
      </div>
    </motion.div>
  )
}

export default function Services() {
  const [selected, setSelected] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  const selectedServices = services.filter((s) => selected.includes(s.id))
  const total = selectedServices.reduce((sum, s) => sum + (s.amount ?? 0), 0)

  return (
    <>
      <section id="servicios" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-dark">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-14"
          >
            <p className="font-sans text-[10px] text-accent/50 uppercase tracking-[0.28em] mb-3">
              02 — Servicios
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.5rem)] font-light leading-tight text-cream">
              Qué necesitas.<br />
              <em className="text-accent italic">Qué vale.</em>
            </h2>
          </motion.div>

          <div className="border-t border-cream/[0.07]">
            {services.map((s, i) => (
              <ServiceRow
                key={s.id}
                service={s}
                selected={selected.includes(s.id)}
                onToggle={() => toggle(s.id)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky bar — thin horizontal */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ y: 56, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 56, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="fixed bottom-0 left-0 right-0 z-40 h-14 bg-surface border-t border-cream/[0.08] flex items-center gap-3 px-4 md:px-8"
            style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          >
            <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar min-w-0">
              {selectedServices.map((s) => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1.5 border border-accent/25 text-cream/60 font-sans text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 whitespace-nowrap flex-shrink-0"
                >
                  {s.title}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggle(s.id) }}
                    className="text-cream/30 hover:text-cream leading-none ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="w-px h-6 bg-cream/[0.08] flex-shrink-0" />

            <div className="flex-shrink-0 text-right">
              <p className="font-sans text-[8px] tracking-[0.15em] uppercase text-cream/25 leading-none mb-0.5">Total</p>
              <p className="font-serif text-sm text-cream leading-none">
                {total > 0 ? `$${total.toLocaleString('es-CL')}` : 'Consultar'}
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="flex-shrink-0 bg-accent text-cream font-sans text-[10px] font-medium tracking-[0.1em] uppercase px-4 h-8 hover:bg-accent-light transition-colors duration-300 whitespace-nowrap"
            >
              Iniciar →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedServices={selectedServices}
        total={total}
      />
    </>
  )
}
