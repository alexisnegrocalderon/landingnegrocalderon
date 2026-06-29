import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Portfolio from '@/components/Portfolio'
import Services from '@/components/Services'
import Philosophy from '@/components/Philosophy'
import Process from '@/components/Process'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Portfolio />
      <Services />
      <Philosophy />
      <Process />
      <CTASection />
      <Footer />
    </main>
  )
}
