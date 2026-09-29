'use client'

import { useOptimistic, useTransition } from 'react'
import ClassesSection from '@/components/classes/ClassesSection'
import { bookSession, cancelBooking } from '@/lib/server/actions'
import { addBooking, removeBooking, type ClassSession, type StoredBooking } from '@/lib/bookings'

type BookingChange = { type: 'book' | 'cancel'; session: ClassSession }

interface MemberClassesProps {
  bookings: StoredBooking[]
  /** Render time from the server, so server and browser compute the same sessions. */
  now: number
}

export default function MemberClasses({ bookings, now }: MemberClassesProps) {
  // Same rules as the server actions, so the UI updates instantly and agrees with the server.
  const [optimisticBookings, applyChange] = useOptimistic(bookings, (state, change: BookingChange) =>
    change.type === 'book' ? addBooking(state, change.session) : removeBooking(state, change.session),
  )
  const [, startTransition] = useTransition()

  function handleBook(session: ClassSession) {
    startTransition(async () => {
      applyChange({ type: 'book', session })
      await bookSession(session.classId, session.date, session.time)
    })
  }

  function handleCancel(session: ClassSession) {
    startTransition(async () => {
      applyChange({ type: 'cancel', session })
      await cancelBooking(session.classId, session.date, session.time)
    })
  }

  return (
    <ClassesSection
      view="member"
      bookings={optimisticBookings}
      now={now}
      onBookSession={handleBook}
      onCancelSession={handleCancel}
    />
  )
}
