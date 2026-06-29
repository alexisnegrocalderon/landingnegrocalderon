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
  featured?: boolean
}

const services: Service[] = [
  { id: 'logo',    title: 'Diseño de Logo',             price: '$21.285',   amount: 21285,  tag: 'IDENTIDAD', desc: 'Identidad visual única, vectores y manual de marca básico.' },
  { id: 'express', title: 'Sitio Web Express',           price: '$58.500',   amount: 58500,  tag: 'EXPRESS',   desc: 'Sitio rápido y optimizado. Listo en días, listo para vender.' },
  { id: 'wow',     title: 'Sitio "WOW Effect"',          price: '$133.500',  amount: 133500, tag: 'DESTACADO', desc: 'El sitio que hace que tus clientes se detengan y digan WOW. Animaciones cinematográficas, diseño con alma, presencia que se recuerda.', featured: true },
  { id: 'premium', title: 'Sitio Web Premium',           price: '$210.000',  amount: 210000, tag: 'PREMIUM',   desc: 'Ecosistema digital completo. Tu marca a otro nivel.' },
  { id: 'redes',   title: 'Gestión de Redes Sociales',   price: 'Consultar', amount: null,   tag: 'SOCIAL',    desc: 'Community manager estratégico para escalar tu comunidad.' },
  { id: 'posts',   title: 'Diseño de Posts',             price: 'Consultar', amount: null,   tag: 'CONTENIDO', desc: 'Pack de contenido visual semanal con identidad de marca.' },
  { id: 'videos',  title: 'Videos Reels',                price: '$15.000/u', amount: 15000,  tag: 'VIDEO',     desc: 'Reels editados para captar atención y convertir en segundos.' },
  { id: 'ia',      title: 'Agente con IA',               price: 'Consultar', amount: null,   tag: 'IA',        desc: 'Automatización inteligente que trabaja por tu negocio 24/7.' },
]

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

function WindowCard({ service, selected, onToggle, index }: {
  service: Service; selected: boolean; onToggle: () => void; index: number
}) {
  const isFeatured = service.featured

  return (
    <motion.div
      onClick={onToggle}
      data-cursor="hover"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      className={`relative cursor-none ${isFeatured ? 'md:col-span-2' : ''}`}
    >
      {/* Window outer frame — aluminum surround */}
      <div
        className={`relative p-[3px] transition-all duration-500 ${
          isFeatured ? 'rounded-[28px]' : 'rounded-[24px]'
        } ${
          selected
            ? 'bg-gradient-to-br from-accent/60 via-accent/30 to-accent/10'
            : isFeatured
              ? 'bg-gradient-to-br from-amber-400/25 via-orange-300/10 to-transparent'
              : 'bg-gradient-to-br from-cream/12 via-cream/5 to-transparent'
        }`}
        style={
          selected
            ? { boxShadow: '0 0 40px rgba(192,57,43,0.20), 0 0 80px rgba(192,57,43,0.08)' }
            : isFeatured
              ? { boxShadow: '0 0 50px rgba(255,180,40,0.12), 0 0 100px rgba(255,140,20,0.06)' }
              : {}
        }
      >
        {/* Window inner glass */}
        <div
          className={`relative overflow-hidden transition-all duration-500 ${
            isFeatured ? 'rounded-[26px]' : 'rounded-[22px]'
          } ${
            selected ? 'bg-[#1A0C0A]' : isFeatured ? 'bg-[#100C06]' : 'bg-[#0C0A08]'
          }`}
          style={{
            padding: isFeatured ? '28px 32px' : '22px 24px',
            minHeight: isFeatured ? '220px' : '180px',
          }}
        >
          {/* Sky view through window — top area */}
          <div
            className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
            style={{
              background: selected
                ? 'linear-gradient(180deg, rgba(192,57,43,0.08) 0%, transparent 100%)'
                : isFeatured
                  ? 'linear-gradient(180deg, rgba(255,160,40,0.07) 0%, transparent 100%)'
                  : 'linear-gradient(180deg, rgba(4,14,32,0.60) 0%, transparent 100%)',
            }}
          />

          {/* Inner window frame — double pane effect */}
          <div
            className={`absolute inset-3 rounded-[18px] border pointer-events-none ${
              selected ? 'border-accent/15' : isFeatured ? 'border-amber-400/10' : 'border-cream/[0.04]'
            }`}
          />

          {/* Tag + featured badge */}
          <div className="relative z-10 flex items-center justify-between mb-4">
            <span className={`font-sans text-[8px] tracking-[0.3em] uppercase ${
              selected ? 'text-accent' : isFeatured ? 'text-amber-400/70' : 'text-cream/20'
            }`}>
              {service.tag}
            </span>
            {isFeatured && (
              <span className="font-sans text-[7px] tracking-[0.25em] uppercase bg-amber-400/15 border border-amber-400/30 text-amber-300/80 px-2 py-0.5 rounded-full">
                ★ Recomendado
              </span>
            )}
            {selected && !isFeatured && (
              <span className="font-sans text-[7px] tracking-[0.2em] uppercase text-accent/60">● En vuelo</span>
            )}
          </div>

          {/* Service name */}
          <h3
            className={`relative z-10 font-serif font-light leading-tight mb-2 transition-colors duration-300 ${
              selected ? 'text-cream' : isFeatured ? 'text-cream/90' : 'text-cream/65'
            }`}
            style={{ fontSize: isFeatured ? 'clamp(1.3rem, 2.5vw, 1.8rem)' : 'clamp(1rem, 1.8vw, 1.3rem)' }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p className={`relative z-10 font-sans leading-relaxed mb-5 ${
            isFeatured ? 'text-sm text-cream/40' : 'text-xs text-cream/28'
          }`}>
            {service.desc}
          </p>

          {/* Bottom row: price + select */}
          <div className="relative z-10 flex items-end justify-between gap-4 mt-auto">
            <div>
              <p className="font-sans text-[7px] tracking-[0.2em] uppercase text-cream/18 mb-1">PRECIO</p>
              <p
                className={`font-serif font-light leading-none transition-colors duration-300 ${
                  selected ? 'text-accent' : isFeatured ? 'text-amber-300/80' : 'text-cream/55'
                }`}
                style={{ fontSize: isFeatured ? 'clamp(1.8rem, 3vw, 2.8rem)' : 'clamp(1.4rem, 2.2vw, 2rem)' }}
              >
                {service.price}
              </p>
            </div>

            <div className={`flex items-center gap-2 border px-3 py-1.5 transition-all duration-300 ${
              selected
                ? 'border-accent/50 bg-accent/10 text-accent'
                : isFeatured
                  ? 'border-amber-400/25 text-amber-300/60 hover:border-amber-400/50'
                  : 'border-cream/12 text-cream/30 hover:border-cream/25'
            }`}>
              {selected && <span className="text-accent text-[9px]">✓</span>}
              <span className="font-sans text-[8px] tracking-[0.18em] uppercase">
                {selected ? 'Añadido' : 'Añadir'}
              </span>
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
      <section
        id="servicios"
        className="relative py-24 md:py-32 px-6 md:px-16 lg:px-24 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #060402 0%, #0C0904 15%, #0A0803 100%)' }}
      >
        {/* Cabin overhead light effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% -5%, rgba(255,200,120,0.07) 0%, transparent 50%)',
          }}
        />

        {/* Cabin ceiling strip — horizontal light band */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 5%, rgba(255,200,100,0.12) 30%, rgba(255,200,100,0.18) 50%, rgba(255,200,100,0.12) 70%, transparent 95%)',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
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
              Elige tus destinos.<br />
              <em className="text-accent italic">Arma tu ruta.</em>
            </h2>
            <p className="font-sans text-sm text-cream/30 max-w-xs mt-3 leading-relaxed">
              Cada ventana es un servicio. Selecciona los que necesitas y forma tu itinerario.
            </p>
          </motion.div>

          {/* Windows grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {services.map((s, i) => (
              <WindowCard
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

      {/* Flight itinerary — sticky bar */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 32, stiffness: 360 }}
            className="fixed bottom-0 left-0 right-0 z-40"
            style={{
              background: 'rgba(10,8,6,0.97)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderTop: '1px solid rgba(242,237,230,0.08)',
            }}
          >
            {/* Header strip */}
            <div className="px-4 md:px-8 pt-2.5 pb-0 flex items-center gap-3">
              <span className="font-sans text-[7px] tracking-[0.35em] uppercase text-cream/25">
                ✈ TU ITINERARIO
              </span>
              <div className="flex-1 h-px bg-cream/[0.05]" />
              <span className="font-sans text-[7px] tracking-[0.2em] uppercase text-cream/20">
                {selectedServices.length} {selectedServices.length === 1 ? 'escala' : 'escalas'}
              </span>
            </div>

            {/* Escalas route */}
            <div className="px-4 md:px-8 py-2.5 flex items-center gap-0 overflow-x-auto no-scrollbar">
              {/* Origin */}
              <div className="flex-shrink-0 text-center mr-2">
                <p className="font-sans text-[8px] tracking-[0.2em] uppercase text-cream/30 leading-none">ORIGEN</p>
                <p className="font-serif text-xs text-cream/50 leading-none mt-0.5">SCL</p>
              </div>

              {selectedServices.map((s) => (
                <div key={s.id} className="flex items-center flex-shrink-0">
                  {/* Connector */}
                  <div className="flex items-center gap-0">
                    <div className="w-4 h-px border-t border-dashed border-cream/15" />
                    <span className="text-accent/50 font-sans text-[8px] mx-0.5">✈</span>
                    <div className="w-4 h-px border-t border-dashed border-cream/15" />
                  </div>
                  {/* Stop card */}
                  <div className="flex items-center gap-1 border border-cream/[0.10] px-2 py-1 relative group">
                    <span className="font-sans text-[8px] tracking-[0.08em] uppercase text-cream/55 whitespace-nowrap">
                      {s.title}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggle(s.id) }}
                      className="text-cream/20 hover:text-cream/60 leading-none ml-1 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}

              {/* Connector to destination */}
              <div className="flex items-center flex-shrink-0">
                <div className="w-4 h-px border-t border-dashed border-cream/15" />
                <span className="text-accent/50 font-sans text-[8px] mx-0.5">◉</span>
                <div className="w-4 h-px border-t border-dashed border-cream/15" />
              </div>

              {/* Destination */}
              <div className="flex-shrink-0 text-center ml-1">
                <p className="font-sans text-[8px] tracking-[0.2em] uppercase text-cream/30 leading-none">DESTINO</p>
                <p className="font-serif text-xs text-cream/50 leading-none mt-0.5">TU MARCA</p>
              </div>

              {/* Spacer + total + CTA */}
              <div className="flex-shrink-0 flex items-center gap-3 ml-4 pl-4 border-l border-cream/[0.08]">
                <div>
                  <p className="font-sans text-[7px] tracking-[0.15em] uppercase text-cream/25 leading-none mb-0.5">
                    TOTAL
                  </p>
                  <p className="font-serif text-sm text-cream leading-none">
                    {total > 0 ? `$${total.toLocaleString('es-CL')}` : 'Consultar'}
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex-shrink-0 bg-accent text-cream font-sans text-[9px] font-medium tracking-[0.12em] uppercase px-4 py-2 hover:bg-accent-light transition-colors duration-300 whitespace-nowrap"
                >
                  Realizar este vuelo →
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
