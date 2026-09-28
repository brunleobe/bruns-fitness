'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Classes', href: '/classes' },
  { label: 'Trainers', href: '/trainers' },
  { label: 'Pricing', href: '/pricing' },
]
const roles = ['Guest', 'Member', 'Trainer']

export default function Navbar() {
  const pathname = usePathname()
  const [activeRole, setActiveRole] = useState('Guest')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0">
          <span className="text-white font-black text-xl tracking-tight uppercase">BRUNS</span>
          <span className="text-red-600 font-black text-xl tracking-tight uppercase">FITNESS</span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-xs tracking-[0.15em] uppercase transition-colors duration-200 ${pathname === link.href
                  ? 'text-white font-black'
                  : 'text-gray-400 font-semibold hover:text-white'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: role switcher + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Role tabs */}
          <div className="flex items-center border border-white/10 rounded-sm overflow-hidden">
            {roles.map((role) => (
              <button
                key={role}
                id={`role-${role.toLowerCase()}`}
                onClick={() => setActiveRole(role)}
                className={`px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${activeRole === role
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white bg-transparent'
                  }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#join"
            id="nav-join-btn"
            className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-black tracking-widest uppercase px-5 py-2.5 transition-colors duration-200"
          >
            Join Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-5 h-0.5 bg-white mt-1.5 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-white mt-1.5 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-xs tracking-[0.15em] uppercase transition-colors ${pathname === link.href
                  ? 'text-white font-black'
                  : 'text-gray-400 font-semibold hover:text-white'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#join"
            className="bg-red-600 text-white text-center text-xs font-black tracking-widest uppercase py-3 mt-2"
          >
            Join Now
          </a>
        </div>
      )}
    </header>
  )
}
