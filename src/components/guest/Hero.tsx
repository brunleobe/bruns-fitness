'use client'

import { useState } from 'react'
import Link from 'next/link'
import PlanModal from '@/components/pricing/PlanModal'

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section className="relative min-h-screen bg-black overflow-hidden flex items-center">

        {/* Hero athlete image — right side */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[55%] lg:w-[52%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero.jpg"
            alt="Bruns Fitness athlete"
            className="w-full h-full object-cover object-top"
          />
          {/* Left gradient overlay so text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-16">
          <div className="max-w-xl">

            {/* Location tag */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-red-600" />
              <p className="text-red-500 text-[10px] font-mono font-bold tracking-[0.25em] uppercase">
                Lagos, Nigeria &nbsp;·&nbsp; Est. 2020
              </p>
            </div>

            {/* Main headline */}
            <h1 className="leading-none font-black uppercase mb-8 tracking-tight">
              <span className="block text-white text-[clamp(4rem,10vw,8rem)]">WHERE</span>
              <span className="block text-red-600 text-[clamp(4rem,10vw,8rem)] italic">LIMITS</span>
              <span className="block text-white text-[clamp(4rem,10vw,8rem)]">BREAK.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-sm">
              Elite training. World-class coaches. A community that holds you
              accountable when motivation alone won&apos;t.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                id="hero-start-training-btn"
                onClick={() => setModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-display font-black tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 hover:scale-[1.02] active:scale-100 cursor-pointer"
              >
                Start Training
              </button>
              <Link
                id="hero-view-classes-btn"
                href="/classes"
                className="border border-white/40 hover:border-white text-white text-xs font-display font-black tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 hover:bg-white/5 inline-flex items-center justify-center"
              >
                View Classes
              </Link>
            </div>

          </div>
        </div>

      </section>

      <PlanModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
