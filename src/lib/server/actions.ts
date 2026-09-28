'use server'

import { cookies } from 'next/headers'
import { ROLE_COOKIE, isRole } from '@/lib/role'
import { BOOKINGS_COOKIE, parseBookings } from '@/lib/bookings'
import { ALL_CLASSES } from '@/data/classesData'
import { ALL_TRAINERS } from '@/data/trainersData'
import { SESSION_REQUESTS_COOKIE, parseSessionRequests } from '@/lib/sessionRequests'

const COOKIE_OPTIONS = {
  path: '/',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 30,
} as const

export async function setRole(role: string) {
  if (!isRole(role)) return
  ;(await cookies()).set(ROLE_COOKIE, role, COOKIE_OPTIONS)
}

export async function bookClass(classId: string) {
  if (!ALL_CLASSES.some((c) => c.id === classId)) return
  const store = await cookies()
  const bookings = parseBookings(store.get(BOOKINGS_COOKIE)?.value)
  if (bookings.some((b) => b.classId === classId)) return
  bookings.push({ classId, status: 'CONFIRMED' })
  store.set(BOOKINGS_COOKIE, JSON.stringify(bookings), COOKIE_OPTIONS)
}

export async function requestSession(trainerId: string) {
  if (!ALL_TRAINERS.some((t) => t.id === trainerId)) return
  const store = await cookies()
  const requests = parseSessionRequests(store.get(SESSION_REQUESTS_COOKIE)?.value)
  if (requests.includes(trainerId)) return
  requests.push(trainerId)
  store.set(SESSION_REQUESTS_COOKIE, JSON.stringify(requests), COOKIE_OPTIONS)
}
