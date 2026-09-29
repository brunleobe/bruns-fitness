'use client'

import { useEffect } from 'react'
import type { FitnessClass } from '@/data/classesData'
import {
  BOOKING_WINDOW_DAYS,
  LOW_SPOTS_THRESHOLD,
  findBooking,
  spotsLeft,
  upcomingSessions,
  type ClassSession,
  type StoredBooking,
} from '@/lib/bookings'

interface SessionPickerProps {
  cls: FitnessClass
  bookings: StoredBooking[]
  now: number
  onBook: (session: ClassSession) => void
  onCancel: (session: ClassSession) => void
  onClose: () => void
}

/** Modal listing a class's upcoming sessions so a member can book (or cancel) a specific one. */
export default function SessionPicker({ cls, bookings, now, onBook, onCancel, onClose }: SessionPickerProps) {
  const sessions = upcomingSessions(cls.id, now)

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-picker-title"
    >
      <div
        className="w-full sm:max-w-lg max-h-[85vh] overflow-y-auto bg-[#0e0e0e] border border-white/10 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-red-500 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-2">
              Pick a session · next {BOOKING_WINDOW_DAYS} days
            </p>
            <h2 id="session-picker-title" className="text-2xl font-black uppercase tracking-tight">
              {cls.title}
            </h2>
            <p className="text-gray-500 text-xs font-mono tracking-wider mt-1">
              {cls.duration} · {cls.trainer}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-500 hover:text-white text-xl leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Sessions */}
        {sessions.length === 0 ? (
          <p className="text-gray-500 text-sm">No upcoming sessions in the next {BOOKING_WINDOW_DAYS} days.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {sessions.map((session) => {
              const booking = findBooking(bookings, session)
              const spots = spotsLeft(session, bookings)
              return (
                <li
                  key={session.key}
                  className="flex items-center justify-between gap-4 border border-white/10 px-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="text-white text-sm font-bold">
                      {session.dayLabel} {session.dateLabel}{' '}
                      <span className="font-mono text-gray-400">· {session.time}</span>
                    </p>
                    <p
                      className={`font-mono text-[10px] font-bold tracking-wider uppercase mt-1 ${
                        spots <= LOW_SPOTS_THRESHOLD ? 'text-red-500' : 'text-gray-500'
                      }`}
                    >
                      {spots === 0 ? 'Full' : `${spots} ${spots === 1 ? 'spot' : 'spots'} left`}
                    </p>
                  </div>

                  {booking ? (
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`font-mono text-[10px] font-bold tracking-[0.15em] uppercase ${
                          booking.status === 'CONFIRMED' ? 'text-green-500' : 'text-amber-500'
                        }`}
                      >
                        {booking.status === 'CONFIRMED' ? '✓ Booked' : 'Waitlist'}
                      </span>
                      <button
                        onClick={() => onCancel(session)}
                        className="font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-gray-500 hover:text-red-500 hover:underline underline-offset-4 cursor-pointer"
                      >
                        {booking.status === 'CONFIRMED' ? 'Cancel' : 'Leave'}
                      </button>
                    </div>
                  ) : spots === 0 ? (
                    <button
                      onClick={() => onBook(session)}
                      className="shrink-0 border border-amber-500/50 hover:bg-amber-500/10 text-amber-500 text-xs font-display font-black tracking-[0.15em] uppercase px-4 py-2 cursor-pointer"
                    >
                      Join Waitlist
                    </button>
                  ) : (
                    <button
                      onClick={() => onBook(session)}
                      className="shrink-0 bg-red-600 hover:bg-red-700 text-white text-xs font-display font-black tracking-[0.15em] uppercase px-5 py-2 cursor-pointer"
                    >
                      Book
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
