'use client'
import { useScroll, useTransform, motion } from 'framer-motion'

const STARS = Array.from({ length: 100 }, (_, i) => ({
  x: (i * 137.508 + 31) % 100,
  y: (i * 97.3 + 17) % 60,
  size: i % 4 === 0 ? 2 : i % 7 === 0 ? 1.5 : 1,
  delay: (i * 0.37) % 3,
  opacity: 0.5 + (i % 4) * 0.12,
}))

export default function SkyAtmosphere({ heroRef }: { heroRef: React.RefObject<HTMLElement> }) {
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const cloudY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const cloudY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const starsOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const sunOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Sky gradient — deep blue-navy to warm dark */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #020912 0%, #040E20 20%, #06101A 45%, #080A0E 70%, #080604 100%)',
        }}
      />

      {/* Stars */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: starsOpacity }}
        aria-hidden="true"
      >
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.size}
            fill={`rgba(220,230,255,${s.opacity})`}
            style={{
              animation: `twinkle ${2.5 + s.delay}s ${s.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </motion.svg>

      {/* Sun core — bright warm orb on horizon */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '14%',
          bottom: '30%',
          width: 'clamp(60px, 6vw, 100px)',
          aspectRatio: '1',
          opacity: sunOpacity,
          background:
            'radial-gradient(circle, rgba(255,210,100,0.95) 0%, rgba(255,170,40,0.70) 30%, rgba(255,120,20,0.30) 60%, transparent 80%)',
          filter: 'blur(4px)',
          animation: 'sunBreathe 4s ease-in-out infinite',
        }}
      />

      {/* Sun halo — large soft glow */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '8%',
          bottom: '22%',
          width: 'clamp(200px, 28vw, 460px)',
          aspectRatio: '1',
          opacity: sunOpacity,
          background:
            'radial-gradient(circle, rgba(255,150,40,0.18) 0%, rgba(255,100,20,0.09) 45%, rgba(200,80,10,0.03) 70%, transparent 85%)',
          filter: 'blur(12px)',
        }}
      />

      {/* Horizon warm band */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '28%',
          height: '3px',
          opacity: sunOpacity,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,140,40,0.08) 20%, rgba(255,180,60,0.22) 40%, rgba(255,200,80,0.30) 58%, rgba(255,140,40,0.14) 75%, rgba(255,100,20,0.05) 90%, transparent 100%)',
          filter: 'blur(2px)',
        }}
      />

      {/* Horizon diffuse glow — wider and softer */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '20%',
          right: '10%',
          bottom: '22%',
          height: '60px',
          opacity: sunOpacity,
          background:
            'linear-gradient(180deg, transparent 0%, rgba(255,120,30,0.07) 40%, rgba(255,100,20,0.12) 70%, rgba(200,70,10,0.06) 100%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Cloud layer 1 — main, most visible */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '14%',
          height: '100px',
          y: cloudY,
        }}
      >
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <path
            d="M0,50 C100,20 220,72 360,40 C500,8 620,62 760,36 C900,10 1020,58 1160,30 C1280,8 1370,50 1440,32 L1440,100 L0,100 Z"
            fill="rgba(180,210,240,0.13)"
          />
          <path
            d="M0,65 C150,38 290,75 480,52 C660,28 800,68 1000,44 C1160,24 1290,60 1440,42 L1440,100 L0,100 Z"
            fill="rgba(210,225,245,0.09)"
          />
          <path
            d="M0,80 C200,60 380,85 580,68 C760,50 920,78 1100,62 C1240,50 1360,72 1440,58 L1440,100 L0,100 Z"
            fill="rgba(200,218,238,0.07)"
          />
        </svg>
      </motion.div>

      {/* Cloud layer 2 — higher, lighter, more parallax */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '20%',
          height: '50px',
          y: cloudY2,
        }}
      >
        <svg
          viewBox="0 0 1440 50"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <path
            d="M0,30 C200,10 400,40 600,22 C800,4 1000,35 1200,18 C1320,8 1400,28 1440,20 L1440,50 L0,50 Z"
            fill="rgba(190,215,245,0.06)"
          />
        </svg>
      </motion.div>

    </div>
  )
}
