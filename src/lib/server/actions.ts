'use server'

import { cookies } from 'next/headers'
import { ROLE_COOKIE, isRole } from '@/lib/role'
import {
  BOOKINGS_COOKIE,
  addBooking,
  isBookableSession,
  parseBookings,
  pruneBookings,
  removeBooking,
  type StoredBooking,
} from '@/lib/bookings'
import { ALL_TRAINERS } from '@/data/trainersData'
import {
  SESSION_REQUESTS_COOKIE,
  addSessionRequest,
  parseSessionRequests,
  removeSessionRequest,
} from '@/lib/sessionRequests'

const COOKIE_OPTIONS = {
  path: '/',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 30,
} as const

export async function setRole(role: string) {
  if (!isRole(role)) return
  ;(await cookies()).set(ROLE_COOKIE, role, COOKIE_OPTIONS)
}

// ── Class bookings ──────────────────────────

async function updateBookings(update: (bookings: StoredBooking[]) => StoredBooking[]) {
  const store = await cookies()
  const current = pruneBookings(parseBookings(store.get(BOOKINGS_COOKIE)?.value), Date.now())
  store.set(BOOKINGS_COOKIE, JSON.stringify(update(current)), COOKIE_OPTIONS)
}

export async function bookSession(classId: string, date: string, time: string) {
  const session = { classId, date, time }
  // Only real, upcoming sessions inside the booking window can be booked.
  if (!isBookableSession(session, Date.now())) return
  await updateBookings((bookings) => addBooking(bookings, session))
}

export async function cancelBooking(classId: string, date: string, time: string) {
  await updateBookings((bookings) => removeBooking(bookings, { classId, date, time }))
}

// ── 1-on-1 session requests ─────────────────

async function updateSessionRequests(update: (ids: string[]) => string[]) {
  const store = await cookies()
  const requests = update(parseSessionRequests(store.get(SESSION_REQUESTS_COOKIE)?.value))
  store.set(SESSION_REQUESTS_COOKIE, JSON.stringify(requests), COOKIE_OPTIONS)
}

export async function requestSession(trainerId: string) {
  if (!ALL_TRAINERS.some((t) => t.id === trainerId)) return
  await updateSessionRequests((ids) => addSessionRequest(ids, trainerId))
}

export async function cancelSessionRequest(trainerId: string) {
  await updateSessionRequests((ids) => removeSessionRequest(ids, trainerId))
}
