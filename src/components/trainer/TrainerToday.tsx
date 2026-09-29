import Link from 'next/link'
import StatCards from '@/components/ui/StatCards'
import TrainerSessionList from '@/components/trainer/TrainerSessionList'
import { TRAINER_STATS } from '@/data/trainerPortalData'
import { GYM_TIME_ZONE } from '@/lib/bookings'

export default function TrainerToday() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    timeZone: GYM_TIME_ZONE,
  })

  return (
    <section className="bg-black text-white py-16 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-red-600 inline-block" />
            <span className="text-red-600 text-xs font-mono font-bold tracking-[0.25em] uppercase">
              Trainer Portal
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">{today}</h2>
        </div>

        <div className="mb-16">
          <StatCards stats={TRAINER_STATS} />
        </div>

        {/* Today's sessions */}
        <h3 id="todays-sessions" className="text-2xl sm:text-3xl font-black tracking-tight mb-6 scroll-mt-24">
          Today&apos;s sessions
        </h3>
        <div className="mb-10">
          <TrainerSessionList />
        </div>

        <Link
          id="trainer-full-dashboard-btn"
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-display font-black tracking-[0.2em] uppercase px-8 py-4 transition-colors duration-200"
        >
          <span>Full Dashboard</span>
          <span className="text-sm">→</span>
        </Link>
      </div>
    </section>
  )
}
