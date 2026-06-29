'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100000] bg-dark flex items-center justify-center"
          exit={{
            y: '100%',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="font-serif text-cream text-5xl tracking-tight"
          >
            NC <span className="text-red italic">·</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
