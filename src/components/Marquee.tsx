'use client'

const ITEMS = ['Negro Calderón', 'Sitios WOW FX', 'Desde Chile al Mundo', 'Brand Ensuring™', 'Diseño con Alma', 'Presencia Digital', 'IA & Automatización', 'Marcas con Identidad']
const tripled = [...ITEMS, ...ITEMS, ...ITEMS]

export default function Marquee() {
  return (
    <div className="overflow-hidden py-4 border-y border-cream/[0.06] bg-surface">
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: 'marquee 40s linear infinite' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = 'paused' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = 'running' }}
      >
        {tripled.map((item, i) => (
          <span key={i} className="font-serif italic text-cream/50 text-2xl md:text-3xl shrink-0 select-none">
            {item}
            <span className="text-accent mx-5 not-italic font-sans text-base align-middle">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
