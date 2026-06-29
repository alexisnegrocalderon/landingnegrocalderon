'use client'
import { ReactLenis } from 'lenis/react'
import Cursor from './Cursor'
import PageLoader from './PageLoader'
import { motion } from 'framer-motion'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }}
    >
      <PageLoader />
      <Cursor />
      {children}

      {/* WOW MODE badge */}
      <motion.div
        className="fixed bottom-5 left-5 z-30 hidden md:flex items-center gap-2 bg-surface border border-accent/20 rounded-full px-4 py-2 cursor-none"
        data-cursor="hover"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent dot-pulse" />
        <span className="font-sans text-[10px] tracking-[0.14em] uppercase text-cream/50">WOW Mode</span>
      </motion.div>
    </ReactLenis>
  )
}
