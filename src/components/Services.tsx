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
  skyVariant: 'night' | 'dawn' | 'sunset' | 'dusk'
}

const services: Service[] = [
  { id: 'logo',    title: 'Diseño de Logo',           price: '$21.285',   amount: 21285,  tag: 'IDENTIDAD', skyVariant: 'night',  desc: 'Identidad visual única, vectores y manual de marca básico.' },
  { id: 'express', title: 'Sitio Web Express',         price: '$58.500',   amount: 58500,  tag: 'EXPRESS',   skyVariant: 'dawn',   desc: 'Sitio rápido y optimizado. Listo en días, listo para vender.' },
  { id: 'wow',     title: 'Sitio "WOW Effect"',        price: '$133.500',  amount: 133500, tag: 'DESTACADO', skyVariant: 'sunset', desc: 'El sitio que hace que tus clientes se detengan y digan WOW. Animaciones cinematográficas, diseño con alma, presencia que se recuerda.', featured: true },
  { id: 'premium', title: 'Sitio Web Premium',         price: '$210.000',  amount: 210000, tag: 'PREMIUM',   skyVariant: 'dusk',   desc: 'Ecosistema digital completo. Tu marca a otro nivel.' },
  { id: 'redes',   title: 'Gestión de Redes',          price: 'Consultar', amount: null,   tag: 'SOCIAL',    skyVariant: 'night',  desc: 'Community manager estratégico para escalar tu comunidad.' },
  { id: 'posts',   title: 'Diseño de Posts',           price: 'Consultar', amount: null,   tag: 'CONTENIDO', skyVariant: 'dawn',   desc: 'Pack de contenido visual semanal con identidad de marca.' },
  { id: 'videos',  title: 'Videos Reels',              price: '$15.000/u', amount: 15000,  tag: 'VIDEO',     skyVariant: 'dusk',   desc: 'Reels editados para captar atención y convertir en segundos.' },
  { id: 'ia',      title: 'Agente con IA',             price: 'Consultar', amount: null,   tag: 'IA',        skyVariant: 'night',  desc: 'Automatización inteligente que trabaja por tu negocio 24/7.' },
]

const SKY: Record<string, string> = {
  night:  'linear-gradient(180deg, #0B1E3A 0%, #071428 55%, #040E1C 100%)',
  dawn:   'linear-gradient(180deg, #1A1530 0%, #0E0E28 40%, #08091E 100%)',
  sunset: 'linear-gradient(180deg, #3D1205 0%, #6B2008 25%, #2E0E05 55%, #120602 100%)',
  dusk:   'linear-gradient(180deg, #1C0E2A 0%, #140A20 50%, #0A0614 100%)',
}

const STARS_A = [
  {x:12,y:15},{x:28,y:8},{x:44,y:22},{x:62,y:12},{x:78,y:28},{x:90,y:10},
  {x:18,y:38},{x:50,y:30},{x:82,y:35},{x:35,y:48},{x:68,y:42},
]
const STARS_B = [
  {x:8,y:20},{x:22,y:12},{x:48,y:18},{x:70,y:8},{x:88,y:25},
  {x:32,y:40},{x:55,y:45},{x:75,y:38},{x:15,y:50},{x:92,y:45},
]

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

function WindowCard({ service, selected, onToggle, index }: {
  service: Service; selected: boolean; onToggle: () => void; index: number
}) {
  const isFeatured = service.featured
  const stars = index % 2 === 0 ? STARS_A : STARS_B
  const showStars = service.skyVariant === 'night' || service.skyVariant === 'dawn'
  const skyBg = selected
    ? 'linear-gradient(180deg, #1A0806 0%, #120503 50%, #0A0301 100%)'
    : SKY[service.skyVariant]

  return (
    <motion.div
      onClick={onToggle}
      data-cursor="hover"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.07 }}
      className={`relative cursor-none group ${isFeatured ? 'md:col-span-2' : ''}`}
    >
      {/* Outer window frame — thick visible border */}
      <div
        className={`overflow-hidden transition-all duration-500 ${isFeatured ? 'rounded-[36px]' : 'rounded-[30px]'}`}
        style={{
          border: selected
            ? '2px solid rgba(192,57,43,0.65)'
            : isFeatured
              ? '2px solid rgba(255,150,40,0.45)'
              : '2px solid rgba(242,237,230,0.22)',
          boxShadow: selected
            ? '0 0 50px rgba(192,57,43,0.22), inset 0 0 60px rgba(0,0,0,0.5)'
            : isFeatured
              ? '0 0 70px rgba(255,110,20,0.22), inset 0 0 60px rgba(0,0,0,0.6)'
              : '0 8px 40px rgba(0,0,0,0.55)',
        }}
      >
        {/* Inner window frame — double pane */}
        <div
          className={`m-[5px] overflow-hidden ${isFeatured ? 'rounded-[32px]' : 'rounded-[26px]'}`}
          style={{
            border: selected
              ? '1px solid rgba(192,57,43,0.25)'
              : isFeatured
                ? '1px solid rgba(255,150,40,0.18)'
                : '1px solid rgba(242,237,230,0.07)',
          }}
        >

          {/* Sky view — the actual window glass */}
          <div
            className="relative overflow-hidden"
            style={{
              height: isFeatured ? '180px' : '130px',
              background: skyBg,
            }}
          >
            {/* Stars for night/dawn skies */}
            {showStars && !selected && (
              <svg className="absolute inset-0 w-full h-full" aria-hidden>
                {stars.map((s, i) => (
                  <circle
                    key={i}
                    cx={`${s.x}%`}
                    cy={`${s.y}%`}
                    r={i % 3 === 0 ? 1.5 : 1}
                    fill={`rgba(210,225,255,${i % 2 === 0 ? 0.75 : 0.45})`}
                  />
                ))}
              </svg>
            )}

            {/* Sunset horizon glow */}
            {service.skyVariant === 'sunset' && !selected && (
              <>
                <div className="absolute bottom-0 left-0 right-0 h-20"
                  style={{ background: 'linear-gradient(0deg, rgba(255,80,10,0.35) 0%, rgba(255,120,20,0.15) 50%, transparent 100%)' }} />
                <div className="absolute bottom-6 left-1/4 right-1/4 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,160,40,0.6), transparent)', filter: 'blur(1px)' }} />
              </>
            )}

            {/* Dusk purple-pink glow */}
            {service.skyVariant === 'dusk' && !selected && (
              <div className="absolute bottom-0 left-0 right-0 h-16"
                style={{ background: 'linear-gradient(0deg, rgba(180,40,120,0.2) 0%, rgba(100,20,160,0.1) 50%, transparent 100%)' }} />
            )}

            {/* Cabin light reflection on glass — subtle highlight at top */}
            <div className="absolute top-0 left-0 right-0 h-8 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(242,237,230,0.04) 0%, transparent 100%)' }} />

            {/* Tag badge — top left */}
            <div className="absolute top-4 left-5">
              <span className={`font-sans text-[8px] tracking-[0.28em] uppercase ${
                selected ? 'text-accent/80' : isFeatured ? 'text-amber-300/75' : 'text-cream/40'
              }`}>
                {service.tag}
              </span>
            </div>

            {/* Featured / selected status badges */}
            {isFeatured && (
              <div className="absolute top-3.5 right-5">
                <span className="font-sans text-[7px] tracking-[0.2em] uppercase bg-amber-400/20 border border-amber-400/45 text-amber-200/90 px-2 py-0.5 rounded-sm">
                  ★ Recomendado
                </span>
              </div>
            )}
            {selected && !isFeatured && (
              <div className="absolute top-3.5 right-5">
                <span className="font-sans text-[7px] tracking-[0.2em] uppercase text-accent/80">● En vuelo</span>
              </div>
            )}

            {/* Horizon line */}
            <div className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background: selected
                  ? 'linear-gradient(90deg, transparent, rgba(192,57,43,0.4), transparent)'
                  : isFeatured
                    ? 'linear-gradient(90deg, transparent, rgba(255,140,30,0.3), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(242,237,230,0.12), transparent)',
              }}
            />
          </div>

          {/* Window sill / content panel */}
          <div
            style={{
              background: selected
                ? '#160806'
                : isFeatured
                  ? '#100905'
                  : '#0D0B08',
              padding: isFeatured ? '22px 26px 24px' : '18px 22px 20px',
            }}
          >
            {/* Service name */}
            <h3
              className={`font-serif font-light leading-tight mb-2 transition-colors duration-300 ${
                selected ? 'text-cream' : isFeatured ? 'text-cream/90' : 'text-cream/80'
              }`}
              style={{ fontSize: isFeatured ? 'clamp(1.35rem, 2.5vw, 1.85rem)' : 'clamp(1.05rem, 1.8vw, 1.35rem)' }}
            >
              {service.title}
            </h3>

            {/* Description */}
            <p className={`font-sans leading-relaxed mb-5 ${
              isFeatured ? 'text-sm text-cream/40' : 'text-xs text-cream/30'
            }`}>
              {service.desc}
            </p>

            {/* Price + action */}
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-sans text-[7px] tracking-[0.22em] uppercase text-cream/18 mb-1">PRECIO</p>
                <p
                  className={`font-serif font-light leading-none transition-colors duration-300 ${
                    selected ? 'text-accent' : isFeatured ? 'text-amber-300/85' : 'text-cream/65'
                  }`}
                  style={{ fontSize: isFeatured ? 'clamp(1.8rem, 3vw, 2.6rem)' : 'clamp(1.4rem, 2.2vw, 1.9rem)' }}
                >
                  {service.price}
                </p>
              </div>

              <div className={`flex items-center gap-2 border px-3 py-1.5 transition-all duration-300 ${
                selected
                  ? 'border-accent/55 bg-accent/12 text-accent'
                  : isFeatured
                    ? 'border-amber-400/30 text-amber-300/65 group-hover:border-amber-400/55'
                    : 'border-cream/15 text-cream/40 group-hover:border-cream/30'
              }`}>
                {selected && <span className="text-[9px]">✓</span>}
                <span className="font-sans text-[8px] tracking-[0.2em] uppercase">
                  {selected ? 'Añadido' : 'Añadir'}
                </span>
              </div>
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
        style={{ background: 'linear-gradient(180deg, #070503 0%, #0C0904 20%, #090703 100%)' }}
      >
        {/* Cabin overhead reading light — visible amber strip */}
        <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 5%, rgba(255,185,70,0.6) 30%, rgba(255,200,90,0.85) 50%, rgba(255,185,70,0.6) 70%, transparent 95%)',
          }}
        />
        {/* Overhead diffuse warm wash */}
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,155,50,0.07) 0%, rgba(255,130,30,0.03) 60%, transparent 100%)',
          }}
        />

        {/* Fuselage wall panel seam lines */}
        {[18, 52, 78].map((pct) => (
          <div key={pct}
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{
              top: `${pct}%`,
              background: 'linear-gradient(90deg, transparent 3%, rgba(242,237,230,0.035) 15%, rgba(242,237,230,0.035) 85%, transparent 97%)',
            }}
          />
        ))}

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
              Cada ventana es un destino. Selecciona los que necesitas y forma tu itinerario.
            </p>
          </motion.div>

          {/* Windows grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
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

      {/* Flight itinerary — sticky bottom bar */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 32, stiffness: 360 }}
            className="fixed bottom-0 left-0 right-0 z-40"
            style={{
              background: 'rgba(8,6,4,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(242,237,230,0.08)',
            }}
          >
            <div className="px-4 md:px-8 pt-2.5 pb-0 flex items-center gap-3">
              <span className="font-sans text-[7px] tracking-[0.35em] uppercase text-cream/25">
                ✈ TU ITINERARIO
              </span>
              <div className="flex-1 h-px bg-cream/[0.05]" />
              <span className="font-sans text-[7px] tracking-[0.2em] uppercase text-cream/20">
                {selectedServices.length} {selectedServices.length === 1 ? 'escala' : 'escalas'}
              </span>
            </div>

            <div className="px-4 md:px-8 py-2.5 flex items-center gap-0 overflow-x-auto no-scrollbar">
              <div className="flex-shrink-0 text-center mr-2">
                <p className="font-sans text-[8px] tracking-[0.2em] uppercase text-cream/30 leading-none">ORIGEN</p>
                <p className="font-serif text-xs text-cream/50 leading-none mt-0.5">SCL</p>
              </div>

              {selectedServices.map((s) => (
                <div key={s.id} className="flex items-center flex-shrink-0">
                  <div className="flex items-center">
                    <div className="w-4 h-px border-t border-dashed border-cream/15" />
                    <span className="text-accent/50 font-sans text-[8px] mx-0.5">✈</span>
                    <div className="w-4 h-px border-t border-dashed border-cream/15" />
                  </div>
                  <div className="flex items-center gap-1 border border-cream/[0.10] px-2 py-1">
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

              <div className="flex items-center flex-shrink-0">
                <div className="w-4 h-px border-t border-dashed border-cream/15" />
                <span className="text-accent/50 font-sans text-[8px] mx-0.5">◉</span>
                <div className="w-4 h-px border-t border-dashed border-cream/15" />
              </div>

              <div className="flex-shrink-0 text-center ml-1">
                <p className="font-sans text-[8px] tracking-[0.2em] uppercase text-cream/30 leading-none">DESTINO</p>
                <p className="font-serif text-xs text-cream/50 leading-none mt-0.5">TU MARCA</p>
              </div>

              <div className="flex-shrink-0 flex items-center gap-3 ml-4 pl-4 border-l border-cream/[0.08]">
                <div>
                  <p className="font-sans text-[7px] tracking-[0.15em] uppercase text-cream/25 leading-none mb-0.5">TOTAL</p>
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
