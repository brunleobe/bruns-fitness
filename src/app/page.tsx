import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ApexMethod from '@/components/ApexMethod'
import Schedule from '@/components/Schedule'
import MemberStories from '@/components/MemberStories'
import CtaBanner from '@/components/CtaBanner'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <ApexMethod />
      <Schedule />
      <MemberStories />
      <CtaBanner />
      <Footer />
    </main>
  )
}
