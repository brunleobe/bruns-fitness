import RoleHero from '@/components/ui/RoleHero'
import { MEMBER_STATS } from '@/data/memberData'
import type { Booking } from '@/lib/bookings'

export default function MemberHero({ bookings }: { bookings: Booking[] }) {
  const nextClass = bookings.find((b) => b.status === 'CONFIRMED')
  const streak = MEMBER_STATS.find((s) => s.label === 'Current streak')

  return (
    <RoleHero
      headline={['KEEP', 'SHOWING', 'UP.']}
      subtitle={
        <>
          {nextClass && <>Your next class is {nextClass.dayLabel} {nextClass.dateLabel} at {nextClass.time}. </>}
          {streak && <>You&apos;ve trained {streak.value} straight. </>}
          Don&apos;t let up now.
        </>
      }
      primary={{ id: 'member-hero-book-btn', label: 'Book a Class', href: '/classes' }}
      secondary={{ id: 'member-hero-dashboard-btn', label: 'My Dashboard', href: '/dashboard' }}
    />
  )
}
