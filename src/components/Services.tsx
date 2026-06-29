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
  tag: string
}

const services: Service[] = [
  { id: 'logo', title: 'Diseño de Logo', price: '$21.285', amount: 21285, desc: 'Identidad visual única, vectores y manual de marca básico.', tag: 'IDENTIDAD' },
  { id: 'express', title: 'Sitio Web Express', price: '$58.500', amount: 58500, desc: 'Sitio rápido y optimizado. Listo en días, listo para vender.', tag: 'EXPRESS' },
  { id: 'wow', title: 'Sitio "WOW Effect"', price: '$133.500', amount: 133500, desc: 'El sitio que hace que tus clientes se detengan y digan WOW.', tag: 'DESTACADO' },
  { id: 'premium', title: 'Sitio Web Premium', price: '$210.000', amount: 210000, desc: 'Ecosistema digital completo. Tu marca a otro nivel.', tag: 'PREMIUM' },
  { id: 'redes', title: 'Gestión Redes Sociales', price: 'Consultar', amount: null, desc: 'Community manager estratégico para escalar tu comunidad.', tag: 'SOCIAL' },
  { id: 'posts', title: 'Diseño de Posts / Carruseles', price: 'Consultar', amount: null, desc: 'Pack de contenido visual semanal con identidad de marca.', tag: 'CONTENIDO' },
  { id: 'videos', title: 'Videos Reels de Impacto', price: '$15.000/u', amount: 15000, desc: 'Reels editados para captar atención y convertir en segundos.', tag: 'VIDEO' },
  { id: 'ia', title: 'Agente con IA', price: 'Consultar', amount: null, desc: 'Automatización inteligente que trabaja por tu negocio 24/7.', tag: 'IA' },
]

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

function ServiceRow({ service, selected, onToggle, index }: {
  service: Service; selected: boolean; onToggle: () => void; index: number
}) {
  return (
    <motion.div
      onClick={onToggle}
      data-cursor="hover"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
      className={`group relative flex items-start md:items-center gap-6 md:gap-10 py-7 border-b cursor-none transition-colors duration-300 ${
        selected ? 'border-accent/30' : 'border-cream/[0.07] hover:border-cream/[0.12]'
      }`}
    >
      {/* Index number */}
      <span className={`font-serif text-5xl md:text-6xl font-light leading-none w-16 flex-shrink-0 transition-colors duration-300 ${
        selected ? 'text-accent' : 'text-cream/[0.08] group-hover:text-cream/[0.14]'
      }`}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className={`font-serif text-xl md:text-2xl font-light leading-tight transition-colors duration-300 ${
                selected ? 'text-cream' : 'text-cream/75 group-hover:text-cream'
              }`}>
                {service.title}
              </h3>
              <span className={`hidden md:inline font-sans text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full transition-colors duration-300 ${
                selected ? 'bg-accent/15 text-accent' : 'bg-cream/[0.05] text-cream/25'
              }`}>
                {service.tag}
              </span>
            </div>
            <p className="font-sans text-sm text-cream/30 leading-relaxed">
              {service.desc}
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <span className={`font-serif text-lg transition-colors duration-300 ${
              selected ? 'text-accent' : 'text-cream/50'
            }`}>
              {service.price}
            </span>
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              selected ? 'bg-accent border-accent' : 'border-cream/20 group-hover:border-cream/40'
            }`}>
              {selected && <span className="text-cream text-[10px] font-bold leading-none">✓</span>}
            </div>
          </div>
        </div>
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
              04 — Servicios
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.5rem)] font-light leading-tight text-cream">
              Arma tu presupuesto.<br />
              <em className="text-accent italic">Tú decides el alcance.</em>
            </h2>
            <p className="font-sans text-sm text-cream/35 max-w-md mt-4 leading-relaxed">
              Selecciona los servicios que necesitas y verás el total en tiempo real.
            </p>
          </motion.div>

          {/* Border at top of list */}
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

      {/* Sticky calculator bar */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 md:px-8 md:pb-6"
          >
            <div className="max-w-3xl mx-auto bg-surface border border-accent/20 rounded-2xl px-5 py-4 flex flex-wrap gap-4 items-center justify-between shadow-[0_8px_60px_rgba(0,0,0,0.6)]">
              <div className="flex flex-wrap gap-2 flex-1 min-w-0">
                {selectedServices.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 text-cream/70 font-sans text-xs px-3 py-1.5 rounded-full"
                  >
                    {s.title}
                    <button onClick={() => toggle(s.id)} className="text-cream/40 hover:text-cream ml-0.5">×</button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right">
                  <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-cream/30">Total</p>
                  <p className="font-serif text-lg text-cream">
                    {total > 0 ? `$${total.toLocaleString('es-CL')}` : 'Consultar'}
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-accent text-cream font-sans text-xs font-medium tracking-[0.08em] uppercase px-5 py-2.5 hover:bg-accent-light transition-colors duration-300 whitespace-nowrap"
                >
                  Iniciar proyecto →
                </button>
              </div>
            </div>
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
