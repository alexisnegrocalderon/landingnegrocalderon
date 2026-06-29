'use client'
import { useRef } from 'react'
import { useScroll, useTransform, type MotionValue } from 'framer-motion'

export function useParallax(
  distance = 80,
): { ref: React.RefObject<HTMLElement | null>; y: MotionValue<string> } {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`${distance}px`, `-${distance}px`])
  return { ref, y }
}
