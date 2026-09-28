import Link from 'next/link'
import StatCards from '@/components/ui/StatCards'
import { ACTIVE_CLIENTS, MONTH_REVENUE, TODAY_SESSIONS } from '@/data/trainerPortalData'

export default function TrainerToday({ showDashboardLink = true }: { showDashboardLink?: boolean }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  const stats = [
    { label: 'Sessions today', value: String(TODAY_SESSIONS.length) },
    { label: 'Active clients', value: String(ACTIVE_CLIENTS) },
    { label: 'Month revenue', value: `$${MONTH_REVENUE.toLocaleString('en-US')}` },
  ]

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
          <StatCards stats={stats} />
        </div>

        {/* Today's sessions */}
        <h3 id="todays-sessions" className="text-2xl sm:text-3xl font-black tracking-tight mb-6 scroll-mt-24">
          Today&apos;s sessions
        </h3>
        <ul className="flex flex-col gap-4 mb-10">
          {TODAY_SESSIONS.map((session) => (
            <li
              key={session.id}
              className="flex items-center gap-6 sm:gap-12 border border-white/10 bg-[#0e0e0e] px-6 py-6 hover:border-white/20 transition-colors duration-200"
            >
              <span className="font-display text-red-500 text-2xl font-black tabular-nums w-16 shrink-0">
                {session.time}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-base font-black tracking-tight">{session.title}</p>
                <p className="text-gray-500 text-xs font-mono tracking-wider mt-1">
                  {session.kind} &nbsp;·&nbsp; {session.durationMin} min
                </p>
              </div>
              <span className="shrink-0 border border-white/10 px-3 py-1.5 text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-gray-400">
                {session.format}
              </span>
            </li>
          ))}
        </ul>

        {showDashboardLink && (
          <Link
            id="trainer-full-dashboard-btn"
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-display font-black tracking-[0.2em] uppercase px-8 py-4 transition-colors duration-200"
          >
            <span>Full Dashboard</span>
            <span className="text-sm">→</span>
          </Link>
        )}
      </div>
    </section>
  )
}
