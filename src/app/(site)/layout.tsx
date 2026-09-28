import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getRole } from '@/lib/server/getRole'

// Shared shell for every page: role-aware Navbar on top, Footer at the bottom.
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const role = await getRole()
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar role={role} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
