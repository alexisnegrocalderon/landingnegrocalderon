'use client'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
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

function ServiceCard({ service, selected, onToggle, index }: {
  service: Service; selected: boolean; onToggle: () => void; index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springRY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect()
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 10)
    rotateX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 7)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0) }}
      onClick={onToggle}
      data-cursor="hover"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.08 }}
      style={{ rotateX: springRX, rotateY: springRY, transformPerspective: 900 }}
      className={`relative p-6 md:p-7 rounded-2xl border cursor-none transition-all duration-400 group ${
        selected
          ? 'bg-accent/10 border-accent/40 shadow-[0_0_40px_rgba(139,92,246,0.15)]'
          : 'bg-surface border-cream/[0.08] hover:border-accent/25 hover:bg-surface-2'
      }`}
    >
      {/* Selection indicator */}
      <div className={`absolute top-5 right-5 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
        selected ? 'bg-accent border-accent text-cream' : 'border-cream/20'
      }`}>
        {selected && <span className="text-[10px] font-bold">✓</span>}
      </div>

      <div className="relative z-10">
        <span className="font-sans text-[9px] text-accent/60 uppercase tracking-[0.2em] font-medium">{service.tag}</span>
        <h3 className={`font-serif text-xl md:text-2xl mt-2 mb-2 leading-tight transition-colors duration-300 ${selected ? 'text-cream' : 'text-cream/80'}`}>
          {service.title}
        </h3>
        <p className="font-sans text-sm text-cream/35 leading-relaxed mb-4">{service.desc}</p>
        <div className="flex items-center justify-between">
          <span className="font-serif text-lg text-accent">{service.price}</span>
          <span className={`font-sans text-xs transition-colors duration-300 ${selected ? 'text-accent' : 'text-cream/25 group-hover:text-accent/50'}`}>
            {selected ? 'Seleccionado ✓' : 'Seleccionar →'}
          </span>
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
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <p className="font-sans text-[10px] text-accent/50 uppercase tracking-[0.28em] mb-3">
              02 — Servicios
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.5rem)] font-light leading-tight text-cream">
              Arma tu presupuesto.<br />
              <em className="text-accent not-italic italic">Tú decides el alcance.</em>
            </h2>
            <p className="font-sans text-sm text-cream/35 max-w-md mt-4 leading-relaxed">
              Selecciona los servicios que necesitas y verás el total en tiempo real.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="bg-accent text-cream font-sans text-xs font-medium tracking-[0.06em] px-5 py-2.5 rounded-full hover:bg-accent-light transition-colors duration-300 whitespace-nowrap"
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
