import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Services from '@/components/Services'
import CircleSection from '@/components/CircleSection'
import Process from '@/components/Process'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <CircleSection />
      <Process />
      <CTASection />
      <Footer />
    </main>
  )
}
