'use client'
import { useEffect } from 'react'
import { ReactLenis } from 'lenis/react'
import Cursor from './Cursor'
import PageLoader from './PageLoader'

function ScrollInit() {
  useEffect(() => {
    // Scroll to the hero (bottom of page) instantly while the page loader covers everything
    const t = setTimeout(() => {
      document.documentElement.scrollTop = 999999
    }, 80)
    return () => clearTimeout(t)
  }, [])
  return null
}

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
      <ScrollInit />
      <PageLoader />
      <Cursor />
      {children}
    </ReactLenis>
  )
}
