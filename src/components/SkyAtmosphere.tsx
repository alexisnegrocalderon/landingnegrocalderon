'use client'
import { useScroll, useTransform, motion } from 'framer-motion'

const STARS = Array.from({ length: 90 }, (_, i) => ({
  x: (i * 137.508 + 31) % 100,
  y: (i * 97.3 + 17) % 55,
  size: i % 5 === 0 ? 1.5 : 1,
  delay: (i * 0.37) % 3,
  opacity: 0.3 + (i % 3) * 0.15,
}))

export default function SkyAtmosphere({ heroRef }: { heroRef: React.RefObject<HTMLElement> }) {
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const cloudY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])
  const starsOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const sunOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.6, 0])
  const horizonOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sky gradient — deep navy bleeding into dark */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #030810 0%, #050C18 25%, #080A10 55%, #080604 100%)',
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
            fill={`rgba(242,237,230,${s.opacity})`}
            style={{
              animation: `twinkle ${2 + s.delay}s ${s.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </motion.svg>

      {/* Sun orb — horizon lower-right */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '10%',
          bottom: '26%',
          width: 'clamp(100px, 16vw, 240px)',
          aspectRatio: '1',
          opacity: sunOpacity,
          background:
            'radial-gradient(circle, rgba(255,200,80,0.55) 0%, rgba(255,140,30,0.22) 38%, rgba(255,100,20,0.07) 62%, transparent 78%)',
          filter: 'blur(3px)',
          animation: 'sunBreathe 4s ease-in-out infinite',
        }}
      />

      {/* Secondary sun glow — larger, softer */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '6%',
          bottom: '20%',
          width: 'clamp(200px, 30vw, 480px)',
          aspectRatio: '1',
          opacity: sunOpacity,
          background:
            'radial-gradient(circle, rgba(255,140,30,0.06) 0%, rgba(255,100,20,0.03) 50%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Horizon warm line */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '28%',
          height: '1px',
          opacity: horizonOpacity,
          background:
            'linear-gradient(90deg, transparent 5%, rgba(255,160,40,0.16) 28%, rgba(255,190,70,0.20) 58%, rgba(255,140,30,0.10) 80%, transparent 95%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Cloud layer — parallax */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '12%',
          height: '90px',
          y: cloudY,
        }}
      >
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <path
            d="M0,45 C120,12 250,65 380,38 C510,10 630,58 760,32 C890,6 1010,52 1140,28 C1260,8 1350,48 1440,28 L1440,90 L0,90 Z"
            fill="rgba(200,215,235,0.05)"
          />
          <path
            d="M0,62 C160,34 300,70 500,46 C680,22 800,64 1000,40 C1140,22 1280,56 1440,38 L1440,90 L0,90 Z"
            fill="rgba(242,237,230,0.035)"
          />
          <path
            d="M0,75 C200,55 380,80 580,62 C760,44 900,72 1100,55 C1240,42 1340,66 1440,52 L1440,90 L0,90 Z"
            fill="rgba(220,228,242,0.025)"
          />
        </svg>
      </motion.div>
    </div>
  )
}
