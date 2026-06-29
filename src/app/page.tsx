import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Philosophy from '@/components/Philosophy'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <Philosophy />
      <CTASection />
      <Footer />
    </main>
  )
}
