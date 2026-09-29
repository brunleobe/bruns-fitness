import StatCards from '@/components/ui/StatCards'
import TrainerSessionList from '@/components/trainer/TrainerSessionList'
import { ALL_CLASSES } from '@/data/classesData'
import { ALL_TRAINERS } from '@/data/trainersData'
import { MEMBER } from '@/data/memberData'
import { DEMO_TRAINER_ID, MONTH_REVENUE, PAYOUT_HISTORY, TRAINER_STATS } from '@/data/trainerPortalData'
import { upcomingSessions } from '@/lib/bookings'

interface TrainerDashboardProps {
  /** Trainer ids members have requested 1-on-1 sessions with (demo cookie). */
  sessionRequests: string[]
  now: number
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6">{children}</h2>
}

export default function TrainerDashboard({ sessionRequests, now }: TrainerDashboardProps) {
  const trainer = ALL_TRAINERS.find((t) => t.id === DEMO_TRAINER_ID)
  if (!trainer) return null

  const myClasses = ALL_CLASSES.filter((c) => c.trainer === trainer.name)
  const hasRequest = sessionRequests.includes(trainer.id)

  return (
    <section className="bg-black text-white pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-red-600 inline-block" />
            <span className="text-red-600 text-xs font-mono font-bold tracking-[0.25em] uppercase">
              Trainer Dashboard
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
            Coach {trainer.name.split(' ')[0]}
          </h1>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <StatCards stats={TRAINER_STATS} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — schedule */}
          <div className="flex flex-col gap-12">
            <div>
              <SectionHeading>Today&apos;s sessions</SectionHeading>
              <TrainerSessionList />
            </div>

            <div>
              <SectionHeading>My classes</SectionHeading>
              <ul className="flex flex-col gap-4">
                {myClasses.map((cls) => {
                  const next = upcomingSessions(cls.id, now)[0]
                  return (
                    <li
                      key={cls.id}
                      className="flex items-center justify-between gap-4 border border-white/10 bg-[#0e0e0e] px-6 py-6"
                    >
                      <div className="min-w-0">
                        <p className="text-white text-base font-black uppercase tracking-tight">{cls.title}</p>
                        <p className="text-gray-500 text-xs font-mono tracking-wider mt-1">
                          {next ? `Next: ${next.dayLabel} ${next.dateLabel} · ${next.time}` : 'No sessions this week'}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 border px-3 py-1.5 text-[10px] font-mono font-bold tracking-[0.15em] uppercase ${
                          cls.spotsLeft === 0
                            ? 'text-amber-500 border-amber-500/30 bg-amber-500/5'
                            : 'text-gray-400 border-white/10'
                        }`}
                      >
                        {cls.spotsLeft === 0 ? 'Full' : `${cls.spotsLeft} open`}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Right — requests & earnings */}
          <div className="flex flex-col gap-12">
            <div>
              <SectionHeading>1-on-1 requests</SectionHeading>
              {hasRequest ? (
                <div className="flex items-center justify-between gap-4 border border-white/10 bg-[#0e0e0e] px-6 py-6">
                  <div className="min-w-0">
                    <p className="text-white text-base font-black tracking-tight">{MEMBER.firstName}</p>
                    <p className="text-gray-500 text-xs font-mono tracking-wider mt-1">
                      1-on-1 PT &nbsp;·&nbsp; ${trainer.sessionRate}/hr
                    </p>
                  </div>
                  <span className="shrink-0 border border-amber-500/30 bg-amber-500/5 px-3 py-1.5 text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-amber-500">
                    Pending
                  </span>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  No new requests. Members can request you from the Trainers page.
                </p>
              )}
            </div>

            <div>
              <SectionHeading>Earnings</SectionHeading>
              <div className="border border-white/10 bg-[#0e0e0e] p-7 mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-red-500 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-5">
                    This month
                  </p>
                  <p className="text-gray-500 text-xs">Paid out on the 1st of each month</p>
                </div>
                <span className="font-display text-3xl font-black text-red-600 leading-none shrink-0">
                  ${MONTH_REVENUE.toLocaleString('en-US')}
                </span>
              </div>

              <div className="border border-white/10 bg-[#0e0e0e] p-7">
                <p className="text-gray-500 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-4">
                  Payout History
                </p>
                <ul className="flex flex-col">
                  {PAYOUT_HISTORY.map((payout) => (
                    <li
                      key={payout.id}
                      className="grid grid-cols-[1fr_auto_3.5rem] gap-4 items-center py-4 border-b border-white/5 text-sm"
                    >
                      <span className="text-gray-500 text-xs font-mono tracking-wider whitespace-nowrap">{payout.date}</span>
                      <span className="text-white text-right">
                        ${payout.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                      <span
                        className={`text-right text-xs font-mono ${payout.status === 'PAID' ? 'text-green-500' : 'text-amber-500'}`}
                      >
                        {payout.status === 'PAID' ? 'Paid' : 'Pending'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
