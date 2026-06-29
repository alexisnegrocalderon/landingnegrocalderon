'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMotionValue, useSpring } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'view'

export default function Cursor() {
  const [state, setState] = useState<CursorState>('default')
  const [visible, setVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 700 })
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 700 })

  useEffect(() => {
    const isCoarse = () => window.matchMedia('(pointer: coarse)').matches

    const move = (e: MouseEvent) => {
      if (isCoarse()) return
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const enter = (e: MouseEvent) => {
      if (isCoarse()) return
      const el = e.target as HTMLElement
      if (el.closest('[data-cursor="view"]')) setState('view')
      else if (el.closest('a, button, [data-cursor="hover"]')) setState('hover')
      else setState('default')
    }
    const leave = () => setState('default')

    const onTouchEnd = () => {
      setVisible(false)
      cursorX.set(-100)
      cursorY.set(-100)
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', enter)
    document.addEventListener('mouseout', leave)
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('touchcancel', onTouchEnd)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', enter)
      document.removeEventListener('mouseout', leave)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [cursorX, cursorY, visible])

  if (!visible) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[10001]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full border flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: state === 'view' ? 80 : state === 'hover' ? 44 : 28,
          height: state === 'view' ? 80 : state === 'hover' ? 44 : 28,
          backgroundColor: state === 'hover' ? 'rgba(192,57,43,0.12)' : state === 'view' ? 'rgba(192,57,43,0.08)' : 'transparent',
          borderColor: state === 'default' ? 'rgba(242,237,230,0.3)' : '#C0392B',
          rotate: state === 'view' ? 360 : 0,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {state === 'view' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-sans font-semibold tracking-widest text-cream uppercase select-none"
          >
            VER
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
