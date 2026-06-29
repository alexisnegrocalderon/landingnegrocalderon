'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100000] bg-dark flex flex-col items-center justify-center"
          exit={{
            y: '100%',
            transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(200,124,58,0.12) 0%, transparent 70%)' }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="relative flex flex-col items-center gap-6 z-10"
          >
            <div className="relative w-24 h-24" style={{ mixBlendMode: 'screen' }}>
              <Image src="/logo-nc.png" alt="NegrocAlderon" fill className="object-contain" priority />
            </div>
            <div className="text-center">
              <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-cream/30 mb-1">Creative Studio</p>
              <p className="font-serif text-cream text-2xl tracking-[0.05em]">
                Negro<span className="text-accent">c</span>Alderon
              </p>
            </div>
          </motion.div>

          <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-px bg-cream/10 overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: '0%' }}
              animate={{ width: '100%', transition: { duration: 1.6, ease: 'easeInOut' } }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
