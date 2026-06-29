'use client'
import { ReactLenis } from 'lenis/react'
import Cursor from './Cursor'
import PageLoader from './PageLoader'

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
    </ReactLenis>
  )
}
