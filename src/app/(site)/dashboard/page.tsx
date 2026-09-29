import { redirect } from 'next/navigation'
import { PLANS } from '@/data/pricingData'
import { MEMBER, MEMBER_STATS, PAYMENT_HISTORY } from '@/data/memberData'
import { getBookings } from '@/lib/server/getBookings'
import { resolveBookings } from '@/lib/bookings'
import StatCards from '@/components/ui/StatCards'
import { BookingList } from '@/components/member/UpcomingBookings'
import TrainerDashboard from '@/components/trainer/TrainerDashboard'
import { getRole } from '@/lib/server/getRole'
import { getSessionRequests } from '@/lib/server/getSessionRequests'

export default async function DashboardPage() {
  // Guard in the page, not a layout: layouts render in parallel and don't protect pages.
  const role = await getRole()
  if (role === 'Guest') redirect('/')
  if (role === 'Trainer') {
    return <TrainerDashboard sessionRequests={await getSessionRequests()} now={Date.now()} />
  }

  const plan = PLANS.find((p) => p.id === MEMBER.planId)
  const bookings = resolveBookings(await getBookings())

  return (
    <section className="bg-black text-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-red-600 inline-block" />
            <span className="text-red-600 text-xs font-mono font-bold tracking-[0.25em] uppercase">
              Member Dashboard
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">My Bruns</h1>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <StatCards stats={MEMBER_STATS} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Upcoming classes */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6">Upcoming classes</h2>
            <BookingList bookings={bookings} />
          </div>

          {/* Billing */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6">Billing</h2>

            {plan && (
              <div className="border border-white/10 bg-[#0e0e0e] p-7 mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-red-500 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-5">
                    Current Plan
                  </p>
                  <p className="font-display text-3xl font-black uppercase tracking-tight leading-none mb-3">{plan.name}</p>
                  <p className="text-gray-500 text-xs">Active · Renews {MEMBER.renewsOn}</p>
                </div>
                <div className="flex items-end gap-0.5 shrink-0">
                  <span className="font-display text-3xl font-black text-red-600 leading-none">${plan.price}</span>
                  <span className="text-gray-500 text-xs">/mo</span>
                </div>
              </div>
            )}

            <div className="border border-white/10 bg-[#0e0e0e] p-7">
              <p className="text-gray-500 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-4">
                Payment History
              </p>
              <ul className="flex flex-col">
                {PAYMENT_HISTORY.map((payment) => (
                  <li
                    key={payment.id}
                    className="grid grid-cols-3 items-center py-4 border-b border-white/5 text-sm"
                  >
                    <span className="text-gray-500 text-xs font-mono tracking-wider">{payment.date}</span>
                    <span className="text-white text-center">${payment.amount.toFixed(2)}</span>
                    <span
                      className={`text-right text-xs font-mono ${payment.status === 'PAID' ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {payment.status === 'PAID' ? 'Paid' : 'Failed'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
