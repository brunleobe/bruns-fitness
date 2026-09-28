'use client'

import { useOptimistic, useTransition } from 'react'
import ClassesSection from '@/components/classes/ClassesSection'
import { bookClass } from '@/lib/server/actions'
import type { StoredBooking } from '@/lib/bookings'

export default function MemberClasses({ bookings }: { bookings: StoredBooking[] }) {
  const [optimisticBookings, addBooking] = useOptimistic(
    bookings,
    (state, classId: string): StoredBooking[] => [...state, { classId, status: 'CONFIRMED' }],
  )
  const [, startTransition] = useTransition()

  function handleBook(classId: string) {
    startTransition(async () => {
      addBooking(classId)
      await bookClass(classId)
    })
  }

  return <ClassesSection view="member" onBook={handleBook} bookings={optimisticBookings} />
}
