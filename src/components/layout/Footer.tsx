export default function Footer() {
  const trainLinks = [
    { label: 'Group Classes', href: '/classes' },
    { label: 'Personal Training', href: '#training' },
    { label: 'Strength Programs', href: '#programs' },
    { label: 'Endurance Track', href: '#endurance' },
  ]

  const exploreLinks = [
    { label: 'Our Coaches', href: '#coaches' },
    { label: 'Membership Plans', href: '#pricing' },
    { label: 'Events & Challenges', href: '#events' },
    { label: 'Bruns Fitness App', href: '#app' },
  ]

  const companyLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Press', href: '#press' },
    { label: 'Careers', href: '#careers' },
  ]

  return (
    <footer className="bg-black text-white border-t border-white/5 relative z-10 pt-16 sm:pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 lg:gap-8 pb-16">
          {/* Column 1: Brand & Location */}
          <div className="col-span-2 lg:col-span-4 space-y-6">
            <a href="#" className="inline-flex items-center gap-1.5 focus:outline-hidden">
              <span className="font-display text-white font-black text-xl tracking-tight uppercase">BRUNS</span>
              <span className="font-display text-red-600 font-black text-xl tracking-tight uppercase">FITNESS</span>
            </a>

            <div className="text-gray-500 text-xs sm:text-sm leading-relaxed space-y-1">
              <p>523 Iron District</p>
              <p>New York, NY 10001</p>
            </div>

            <div>
              <a
                href="mailto:hello@brunsfitness.com"
                className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors duration-200"
              >
                hello@brunsfitness.com
              </a>
            </div>
          </div>

          {/* Column 2: TRAIN */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-red-600 text-xs font-mono font-bold tracking-[0.25em] uppercase">
              TRAIN
            </h4>
            <ul className="space-y-3">
              {trainLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: EXPLORE */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-red-600 text-xs font-mono font-bold tracking-[0.25em] uppercase">
              EXPLORE
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: COMPANY */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-red-600 text-xs font-mono font-bold tracking-[0.25em] uppercase">
              COMPANY
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-gray-600">
          <div>
            © 2026 BRUNS FITNESS. ALL RIGHTS RESERVED.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <a href="#privacy" className="hover:text-gray-400 transition-colors duration-200 whitespace-nowrap">
              PRIVACY POLICY
            </a>
            <span className="text-gray-700">·</span>
            <a href="#terms" className="hover:text-gray-400 transition-colors duration-200 whitespace-nowrap">
              TERMS OF SERVICE
            </a>
            <span className="text-gray-700">·</span>
            <a href="#accessibility" className="hover:text-gray-400 transition-colors duration-200 whitespace-nowrap">
              ACCESSIBILITY
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
