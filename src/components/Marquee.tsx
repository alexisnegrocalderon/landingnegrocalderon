'use client'

const ITEMS = [
  'SITIOS WEB',
  'WOW FX',
  'PRESENCIA DIGITAL',
  'DISEÑO CON ALMA',
  'MARCAS QUE VENDEN',
  'IA & AUTOMATIZACIÓN',
]

const tripled = [...ITEMS, ...ITEMS, ...ITEMS]

export default function Marquee() {
  return (
    <div className="overflow-hidden py-5 border-y border-dark/8 bg-dark">
      <div
        className="flex gap-10 whitespace-nowrap"
        style={{ animation: 'marquee 35s linear infinite' }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = 'paused'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = 'running'
        }}
      >
        {tripled.map((item, i) => (
          <span
            key={i}
            className="font-serif italic text-cream text-3xl md:text-4xl shrink-0 select-none"
          >
            {item}
            <span className="text-red mx-5 not-italic">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
