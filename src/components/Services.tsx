'use client'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import ContactModal from './ContactModal'

type Service = {
  id: string
  title: string
  price: string
  amount: number | null
  desc: string
  tag: string
  from: string
  to: string
}

const services: Service[] = [
  { id: 'logo', title: 'Diseño de Logo', price: '$21.285', amount: 21285, desc: 'Identidad visual única, vectores y manual de marca básico.', tag: 'IDENTIDAD', from: 'Sin identidad propia', to: 'Marca memorable' },
  { id: 'express', title: 'Sitio Web Express', price: '$58.500', amount: 58500, desc: 'Sitio rápido y optimizado. Listo en días, listo para vender.', tag: 'EXPRESS', from: 'Sin presencia online', to: 'Visible en días' },
  { id: 'wow', title: 'Sitio "WOW Effect"', price: '$133.500', amount: 133500, desc: 'El sitio que hace que tus clientes se detengan y digan WOW.', tag: 'DESTACADO', from: 'Página genérica', to: 'Sitio que se recuerda' },
  { id: 'premium', title: 'Sitio Web Premium', price: '$210.000', amount: 210000, desc: 'Ecosistema digital completo. Tu marca a otro nivel.', tag: 'PREMIUM', from: 'Marca local', to: 'Ecosistema global' },
  { id: 'redes', title: 'Gestión Redes Sociales', price: 'Consultar', amount: null, desc: 'Community manager estratégico para escalar tu comunidad.', tag: 'SOCIAL', from: 'Poca comunidad', to: 'Audiencia activa' },
  { id: 'posts', title: 'Diseño de Posts', price: 'Consultar', amount: null, desc: 'Pack de contenido visual semanal con identidad de marca.', tag: 'CONTENIDO', from: 'Contenido irregular', to: 'Feed con identidad' },
  { id: 'videos', title: 'Videos Reels', price: '$15.000/u', amount: 15000, desc: 'Reels editados para captar atención y convertir en segundos.', tag: 'VIDEO', from: 'Sin video content', to: 'Reels que convierten' },
  { id: 'ia', title: 'Agente con IA', price: 'Consultar', amount: null, desc: 'Automatización inteligente que trabaja por tu negocio 24/7.', tag: 'IA', from: 'Trabajo manual', to: 'Automatización 24/7' },
]

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·—'
    let frame = 0
    const total = text.length * 5
    const id = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) =>
          char === ' ' ? ' ' : i < frame / 5
            ? char
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('')
      )
      frame++
      if (frame > total) clearInterval(id)
    }, 40)
    return () => clearInterval(id)
  }, [inView, text])

  return <span ref={ref}>{display}</span>
}

function ServiceCard({ service, selected, onToggle, index }: {
  service: Service; selected: boolean; onToggle: () => void; index: number
}) {
  return (
    <motion.div
      onClick={onToggle}
      data-cursor="hover"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.07 }}
      className={`relative overflow-hidden cursor-none p-5 md:p-6 transition-all duration-300 ${
        selected
          ? 'border border-accent/50 bg-surface-2'
          : 'border border-cream/[0.08] bg-surface-2/30 hover:border-cream/[0.18]'
      }`}
    >
      {/* Diagonal watermark on hover */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 border border-cream/[0.03] rotate-2" />
      </div>

      {/* Top row: class tag + selected indicator */}
      <div className="flex items-center justify-between mb-3">
        <span className={`font-sans text-[8px] tracking-[0.3em] uppercase transition-colors duration-300 ${
          selected ? 'text-accent' : 'text-cream/20'
        }`}>
          CLASE: {service.tag}
        </span>
        <div className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          selected ? 'bg-accent border-accent' : 'border-cream/20'
        }`}>
          {selected && <span className="text-cream text-[8px] font-bold leading-none">✓</span>}
        </div>
      </div>

      {/* FROM → TO */}
      <div className="flex items-center gap-2 mb-4">
        <div className="text-left">
          <p className="font-sans text-[7px] tracking-[0.2em] uppercase text-cream/20 mb-0.5">FROM</p>
          <p className="font-sans text-[10px] text-cream/35">{service.from}</p>
        </div>
        <span className="text-accent/40 font-sans text-xs mx-1 flex-shrink-0">→</span>
        <div className="text-left">
          <p className="font-sans text-[7px] tracking-[0.2em] uppercase text-cream/20 mb-0.5">TO</p>
          <p className="font-sans text-[10px] text-cream/55">{service.to}</p>
        </div>
      </div>

      {/* Perforation line */}
      <div className="relative my-4">
        <div className="border-t border-dashed border-cream/[0.07]" />
        <div className="absolute -left-5 md:-left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#080604] border border-cream/[0.05]" />
        <div className="absolute -right-5 md:-right-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#080604] border border-cream/[0.05]" />
      </div>

      {/* Service name + price */}
      <div className="flex items-end justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className={`font-serif font-light leading-tight mb-2 transition-colors duration-300 ${
            selected ? 'text-cream' : 'text-cream/75'
          }`} style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}>
            <ScrambleText text={service.title} />
          </h3>
          <p className="font-sans text-xs text-cream/28 leading-relaxed">
            {service.desc}
          </p>
        </div>

        <div className="flex-shrink-0 text-right">
          <p className="font-sans text-[7px] tracking-[0.2em] uppercase text-cream/20 mb-1">PRECIO</p>
          <p className={`font-serif font-light leading-none transition-colors duration-300 ${
            selected ? 'text-accent' : 'text-cream/65'
          }`} style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            {service.price}
          </p>
        </div>
      </div>

      {/* Bottom: select button */}
      <div className="mt-4 flex justify-end">
        <span className={`font-sans text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 ${
          selected ? 'text-accent' : 'text-cream/25'
        }`}>
          {selected ? '● Seleccionado' : '○ Seleccionar'}
        </span>
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
        <div className="max-w-6xl mx-auto">
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
              Elige tu destino.<br />
              <em className="text-accent italic">Tú decides el alcance.</em>
            </h2>
            <p className="font-sans text-sm text-cream/35 max-w-md mt-4 leading-relaxed">
              Selecciona los servicios que necesitas y verás el total en tiempo real.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {services.map((s, i) => (
              <ServiceCard
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
            {/* Scrollable tags */}
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

            {/* Divider */}
            <div className="w-px h-6 bg-cream/[0.08] flex-shrink-0" />

            {/* Total */}
            <div className="flex-shrink-0 text-right">
              <p className="font-sans text-[8px] tracking-[0.15em] uppercase text-cream/25 leading-none mb-0.5">
                Total
              </p>
              <p className="font-serif text-sm text-cream leading-none">
                {total > 0 ? `$${total.toLocaleString('es-CL')}` : 'Consultar'}
              </p>
            </div>

            {/* CTA */}
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
