import { cookies } from 'next/headers'
import { BOOKINGS_COOKIE, parseBookings, type StoredBooking } from '@/lib/bookings'

// Reads the demo member's bookings from the request cookie.
export async function getBookings(): Promise<StoredBooking[]> {
  return parseBookings((await cookies()).get(BOOKINGS_COOKIE)?.value)
}
