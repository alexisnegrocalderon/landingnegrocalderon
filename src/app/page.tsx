import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Services from '@/components/Services'
import CircleSection from '@/components/CircleSection'
import Architect from '@/components/Architect'
import Footer from '@/components/Footer'

// Inverted layout: page loads showing Footer, user scrolls UP to discover
// sections and arrives at the Hero with a ↑ "Deslizar" indicator.
export default function Home() {
  return (
    <main>
      <Nav />
      <Footer />
      <Architect />
      <CircleSection />
      <Services />
      <Marquee />
      <Hero />
    </main>
  )
}
