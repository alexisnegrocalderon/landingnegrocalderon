'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

const services = [
  { title: 'Diseño de Logo', price: '$14.190', desc: 'Identidad visual única, vectores y manual de marca básico.', tag: 'IDENTIDAD' },
  { title: 'Sitio Web Express', price: '$39.000', desc: 'Sitio rápido y optimizado. Listo en días, listo para vender.', tag: 'EXPRESS' },
  { title: 'Sitio "WOW Effect"', price: '$89.000', desc: 'El sitio que hace que tus clientes se detengan y digan WOW.', tag: 'DESTACADO' },
  { title: 'Sitio Web Premium', price: '$140.000', desc: 'Ecosistema digital completo. Tu marca a otro nivel.', tag: 'PREMIUM' },
  { title: 'Cuentas Redes Sociales', price: 'Consultar', desc: 'Gestión estratégica de redes para escalar tu comunidad.', tag: 'SOCIAL' },
  { title: 'Diseño de Posts / 7 Contenidos', price: 'Consultar', desc: 'Pack semanal de contenido visual con identidad de marca.', tag: 'CONTENIDO' },
  { title: 'Vídeos Redes de Impacto', price: '$10.000/u', desc: 'Reels y videos optimizados para el algoritmo y conversión.', tag: 'VIDEO' },
  { title: 'Agente IA', price: 'Consultar', desc: 'Automatización inteligente que trabaja por tu empresa 24/7.', tag: 'IA' },
]

function ServiceCard({ title, price, desc, tag, index }: {
  title: string; price: string; desc: string; tag: string; index: number
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
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(x * 12)
    rotateX.set(-y * 8)
  }

  const onMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-cursor="hover"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 2) * 0.08,
      }}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 900,
      }}
      className="relative p-6 md:p-8 border border-dark/10 rounded-2xl bg-cream hover:border-red/25 transition-colors duration-500 cursor-none group"
    >
      {/* Specular highlight */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX.get()} ${glowY.get()}, rgba(244,238,228,0.6) 0%, transparent 65%)`,
        }}
      />

      <div className="relative z-10">
        <span className="font-sans text-[10px] text-dark/30 uppercase tracking-[0.18em] font-medium">
          {tag}
        </span>
        <h3 className="font-serif text-xl md:text-2xl mt-3 mb-2 text-dark leading-tight">
          {title}
        </h3>
        <p className="font-sans text-sm text-dark/50 leading-relaxed mb-5">{desc}</p>
        <div className="flex items-center justify-between">
          <span className="font-serif text-lg font-medium text-red">{price}</span>
          <span className="font-sans text-xs text-dark/30 group-hover:text-red transition-colors duration-300">
            Ver más →
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="servicios" className="py-24 md:py-32 px-6 md:px-12 bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="font-sans text-xs text-dark/35 uppercase tracking-[0.2em] mb-4">
            Servicios
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight text-dark">
            Arma tu presupuesto
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
