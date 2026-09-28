import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
