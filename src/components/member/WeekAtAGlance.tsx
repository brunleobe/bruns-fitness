import StatCards from '@/components/ui/StatCards'
import { MEMBER_STATS } from '@/data/memberData'

export default function WeekAtAGlance() {
  return (
    <section className="bg-black text-white pt-16 sm:pt-24 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-red-600 inline-block" />
            <span className="text-red-600 text-xs font-mono font-bold tracking-[0.25em] uppercase">
              Member Portal
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
            Your week at a glance
          </h2>
        </div>

        <StatCards stats={MEMBER_STATS} />
      </div>
    </section>
  )
}
