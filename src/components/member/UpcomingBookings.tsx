import Link from 'next/link'
import type { Booking, BookingStatus } from '@/lib/bookings'

const statusStyles: Record<BookingStatus, string> = {
  CONFIRMED: 'text-green-500 border-green-500/30 bg-green-500/5',
  WAITLIST: 'text-amber-500 border-amber-500/30 bg-amber-500/5',
}

export function BookingList({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return <p className="text-gray-500 text-sm">No classes booked yet.</p>
  }
  return (
    <ul className="flex flex-col gap-4">
      {bookings.map((booking) => (
        <li
          key={booking.id}
          className="flex items-center justify-between gap-4 border border-white/10 bg-[#0e0e0e] px-6 py-6 hover:border-white/20 transition-colors duration-200"
        >
          <div className="min-w-0">
            <p className="text-white text-base font-black uppercase tracking-tight">{booking.title}</p>
            <p className="text-gray-500 text-xs font-mono tracking-wider mt-1">
              {booking.day} {booking.date} &nbsp;·&nbsp; {booking.time}
            </p>
          </div>
          <span
            className={`shrink-0 border px-3 py-1.5 text-[10px] font-mono font-bold tracking-[0.15em] uppercase ${statusStyles[booking.status]}`}
          >
            {booking.status}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function UpcomingBookings({ bookings }: { bookings: Booking[] }) {
  return (
    <section className="bg-black text-white pt-12 pb-16 sm:pb-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6">Upcoming bookings</h2>

        <div className="mb-10">
          <BookingList bookings={bookings} />
        </div>

        <Link
          id="find-more-classes-btn"
          href="/classes"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-display font-black tracking-[0.2em] uppercase px-8 py-4 transition-colors duration-200"
        >
          <span>Find More Classes</span>
          <span className="text-sm">→</span>
        </Link>
      </div>
    </section>
  )
}
