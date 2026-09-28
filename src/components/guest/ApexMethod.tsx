'use client'

import { useState } from 'react'
import PlanModal from './PlanModal'

export default function ApexMethod() {
  const [modalOpen, setModalOpen] = useState(false)
  const stats = [
    { value: '2,400+', label: 'MEMBERS' },
    { value: '18', label: 'EXPERT COACHES' },
    { value: '34', label: 'CLASSES / WEEK' },
    { value: '24 / 7', label: 'ACCESS' },
  ]

  const features = [
    {
      id: 'feature-science',
      title: 'Science-backed programming',
      description:
        'Built on principles from elite sport, updated every 8 weeks to prevent adaptation.',
      icon: (
        <div className="w-8 h-8 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13 2L3 14h8l-1 8 11-12h-8l1-8z" />
          </svg>
        </div>
      ),
    },
    {
      id: 'feature-composition',
      title: 'Body composition tracking',
      description:
        'InBody scans every 4 weeks so you measure what actually matters.',
      icon: (
        <div className="w-8 h-8 rounded-md bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="12" width="4" height="8" rx="1" fill="#6366f1" stroke="none" />
            <rect x="10" y="8" width="4" height="12" rx="1" fill="#a855f7" stroke="none" />
            <rect x="17" y="4" width="4" height="16" rx="1" fill="#06b6d4" stroke="none" />
          </svg>
        </div>
      ),
    },
    {
      id: 'feature-recovery',
      title: 'Recovery built in',
      description:
        'Cold plunge, infrared sauna, and dedicated stretch classes — included, not extra.',
      icon: (
        <div className="w-8 h-8 rounded-md bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              fill="#06b6d4"
              fillOpacity="0.25"
            />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
      ),
    },
    {
      id: 'feature-app',
      title: 'The Apex app',
      description:
        'Book classes, log lifts, message your coach. Everything in one place.',
      icon: (
        <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
            <path d="M9 7h6" opacity="0.6" />
            <path d="M9 11h6" opacity="0.6" />
          </svg>
        </div>
      ),
    },
  ]

  return (
    <>
    <section className="bg-black text-white py-16 sm:py-24 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Stats Row */}
        <div className="flex justify-end mb-16 sm:mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-14 w-full lg:w-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-left">
                <div className="text-3xl sm:text-4xl font-black text-red-600 tracking-tight leading-none mb-2">
                  {stat.value}
                </div>
                <div className="text-[11px] font-bold text-gray-400 tracking-[0.2em] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Copy & CTA */}
          <div className="lg:col-span-6 space-y-8">
            {/* Tagline */}
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-red-600 inline-block" />
              <span className="text-red-600 text-xs font-bold tracking-[0.25em] uppercase">
                THE APEX METHOD
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] uppercase">
              We engineer
              <br />
              <span className="text-white">outcomes.</span>
            </h2>

            {/* Narrative text */}
            <div className="space-y-6 text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg">
              <p>
                Most gyms sell you access. We sell you results. Every program,
                every coach, every piece of equipment is chosen with one
                question: does this make members better?
              </p>
              <p>
                Monthly body composition tracking. Progressive programming that
                adapts as you improve. A coaching team that knows your name and
                your goals — not just your membership tier.
              </p>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                id="apex-method-join-btn"
                onClick={() => setModalOpen(true)}
                className="inline-block bg-red-600 hover:bg-red-700 text-white text-xs font-black tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 hover:scale-[1.02] active:scale-100 cursor-pointer"
              >
                JOIN FOR $29/MO
              </button>
            </div>
          </div>

          {/* Right Column: 2x2 Feature Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                id={feature.id}
                className="bg-[#0e0e0e] hover:bg-[#141414] border border-white/5 hover:border-white/15 p-6 sm:p-7 rounded-sm transition-all duration-300 flex flex-col justify-start group"
              >
                {feature.icon}
                <h3 className="text-white font-bold text-base sm:text-lg mb-2 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

      <PlanModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
