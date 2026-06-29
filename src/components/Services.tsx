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
  detail: string
}

const services: Service[] = [
  {
    id: 'logo',
    title: 'Diseño de Logo',
    price: '$21.285',
    amount: 21285,
    desc: 'Identidad visual única, vectores y manual de marca básico.',
    detail: 'Incluye 3 propuestas iniciales, 2 rondas de ajustes, archivos en AI, PDF, PNG y SVG.',
    tag: 'IDENTIDAD',
  },
  {
    id: 'express',
    title: 'Sitio Web Express',
    price: '$58.500',
    amount: 58500,
    desc: 'Sitio rápido y optimizado. Listo en días, listo para vender.',
    detail: 'Hasta 5 secciones, diseño responsive, formulario de contacto, SEO básico.',
    tag: 'EXPRESS',
  },
  {
    id: 'wow',
    title: 'Sitio "WOW Effect"',
    price: '$133.500',
    amount: 133500,
    desc: 'El sitio que hace que tus clientes se detengan y digan WOW.',
    detail: 'Animaciones avanzadas, diseño editorial, efectos scroll, hasta 8 secciones. El que estás viendo ahora.',
    tag: 'DESTACADO',
  },
  {
    id: 'premium',
    title: 'Sitio Web Premium',
    price: '$210.000',
    amount: 210000,
    desc: 'Ecosistema digital completo. Tu marca a otro nivel.',
    detail: 'E-commerce, multipage, integraciones, CMS, velocidad top, soporte 30 días.',
    tag: 'PREMIUM',
  },
  {
    id: 'redes',
    title: 'Cuentas Redes Sociales',
    price: 'Consultar',
    amount: null,
    desc: 'Gestión estratégica de redes para escalar tu comunidad.',
    detail: 'Estrategia mensual, publicación diaria, análisis de métricas y crecimiento orgánico.',
    tag: 'SOCIAL',
  },
  {
    id: 'posts',
    title: 'Diseño de Posts / 7 Contenidos',
    price: 'Consultar',
    amount: null,
    desc: 'Pack semanal de contenido visual con identidad de marca.',
    detail: '7 piezas de diseño únicas por semana, formato feed + stories, adaptadas a tu marca.',
    tag: 'CONTENIDO',
  },
  {
    id: 'videos',
    title: 'Vídeos Redes de Impacto',
    price: '$15.000/u',
    amount: 15000,
    desc: 'Reels y videos optimizados para el algoritmo y conversión.',
    detail: 'Edición profesional, subtítulos, música, efectos. Entrega en 48h.',
    tag: 'VIDEO',
  },
  {
    id: 'ia',
    title: 'Agente IA',
    price: 'Consultar',
    amount: null,
    desc: 'Automatización inteligente que trabaja por tu empresa 24/7.',
    detail: 'Chatbot personalizado, respuestas automáticas, calificación de leads, integración con tu CRM.',
    tag: 'IA',
  },
]

function ServiceCard({
  service,
  selected,
  onToggle,
  index,
}: {
  service: Service
  selected: boolean
  onToggle: (s: Service) => void
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springRY = useSpring(rotateY, { stiffness: 150, damping: 20 })
  const glowX = useTransform(springRY, [-12, 12], ['20%', '80%'])
  const glowY = useTransform(springRX, [-8, 8], ['80%', '20%'])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect()
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 12)
    rotateX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 8)
  }

  const onMouseLeave = () => { rotateX.set(0); rotateY.set(0) }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => onToggle(service)}
      data-cursor="hover"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.08 }}
      style={{ rotateX: springRX, rotateY: springRY, transformPerspective: 900 }}
      className={`relative p-6 md:p-8 rounded-2xl transition-all duration-300 cursor-none group select-none ${
        selected
          ? 'bg-dark border-2 border-dark text-cream'
          : 'bg-cream border border-dark/10 hover:border-red/25'
      }`}
    >
      {/* Glow (only when not selected) */}
      {!selected && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowX.get()} ${glowY.get()}, rgba(244,238,228,0.6) 0%, transparent 65%)`,
          }}
        />
      )}

      {/* Selected checkmark */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 400 }}
            className="absolute top-5 right-5 w-7 h-7 rounded-full bg-red flex items-center justify-center"
          >
            <span className="text-cream text-xs font-bold">✓</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <span className={`font-sans text-[10px] uppercase tracking-[0.18em] font-medium ${selected ? 'text-cream/40' : 'text-dark/30'}`}>
          {service.tag}
        </span>
        <h3 className={`font-serif text-xl md:text-2xl mt-3 mb-2 leading-tight ${selected ? 'text-cream' : 'text-dark'}`}>
          {service.title}
        </h3>
        <p className={`font-sans text-sm leading-relaxed mb-2 ${selected ? 'text-cream/60' : 'text-dark/50'}`}>
          {service.desc}
        </p>
        <p className={`font-sans text-xs leading-relaxed mb-5 ${selected ? 'text-cream/35' : 'text-dark/30'}`}>
          {service.detail}
        </p>
        <div className="flex items-center justify-between">
          <span className={`font-serif text-lg font-medium ${selected ? 'text-red' : 'text-red'}`}>
            {service.price}
          </span>
          <span className={`font-sans text-xs transition-colors duration-300 ${
            selected
              ? 'text-cream/50'
              : 'text-dark/30 group-hover:text-red'
          }`}>
            {selected ? 'Agregado ✓' : 'Agregar al proyecto +'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const [selected, setSelected] = useState<Service[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  const toggle = (service: Service) => {
    setSelected((prev) =>
      prev.find((s) => s.id === service.id)
        ? prev.filter((s) => s.id !== service.id)
        : [...prev, service]
    )
  }

  const total = selected.reduce((acc, s) => acc + (s.amount ?? 0), 0)
  const hasConsultar = selected.some((s) => s.amount === null)

  return (
    <>
      <section id="servicios" className="py-24 md:py-32 px-6 md:px-12 bg-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <p className="font-sans text-xs text-dark/35 uppercase tracking-[0.2em] mb-4">
              Servicios
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight text-dark mb-3">
              Arma tu presupuesto
            </h2>
            <p className="font-sans text-sm text-dark/40">
              Selecciona los servicios que necesitas → el total se calcula automáticamente.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-36">
            {services.map((s, i) => (
              <ServiceCard
                key={s.id}
                service={s}
                selected={!!selected.find((x) => x.id === s.id)}
                onToggle={toggle}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Calculator Bar */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[50000] bg-dark border-t border-cream/10"
          >
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row md:items-center gap-4">
              {/* Services list */}
              <div className="flex-1 overflow-x-auto">
                <p className="font-sans text-[10px] text-cream/30 uppercase tracking-widest mb-2">
                  Tu selección ({selected.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.map((s) => (
                    <motion.span
                      key={s.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-2 font-sans text-xs text-cream/80 bg-cream/10 border border-cream/10 px-3 py-1.5 rounded-full"
                    >
                      {s.title}
                      <span className="text-red font-medium">{s.price}</span>
                      <button
                        onClick={() => toggle(s)}
                        className="text-cream/30 hover:text-red transition-colors ml-1 cursor-none"
                        data-cursor="hover"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Total + CTA */}
              <div className="flex items-center gap-5 shrink-0">
                <div className="text-right">
                  {total > 0 && (
                    <>
                      <p className="font-sans text-[10px] text-cream/30 uppercase tracking-widest">Total estimado</p>
                      <p className="font-serif text-xl text-cream font-medium">
                        ${total.toLocaleString('es-CL')}
                        {hasConsultar && <span className="text-sm text-cream/40 ml-1">+ consultas</span>}
                      </p>
                    </>
                  )}
                  {total === 0 && hasConsultar && (
                    <p className="font-sans text-sm text-cream/40">A cotizar</p>
                  )}
                </div>

                <motion.button
                  onClick={() => setModalOpen(true)}
                  data-cursor="hover"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="font-sans text-sm font-medium bg-red text-cream px-6 py-3 rounded-full cursor-none whitespace-nowrap"
                >
                  Iniciar proyecto →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedServices={selected.map((s) => ({ id: s.id, title: s.title, price: s.price }))}
        total={total}
      />
    </>
  )
}
