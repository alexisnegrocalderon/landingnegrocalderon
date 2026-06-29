import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Services from '@/components/Services'
import CircleSection from '@/components/CircleSection'
import Architect from '@/components/Architect'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <CircleSection />
      <Architect />
      <Footer />
    </main>
  )
}
