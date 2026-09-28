import { ALL_CLASSES, DAYS_SCHEDULE } from '@/data/classesData'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type BookingStatus = 'CONFIRMED' | 'WAITLIST'

/** What we persist in the cookie — one entry per booked class. */
export interface StoredBooking {
  classId: string
  status: BookingStatus
}

/** A booking resolved to its next upcoming session. */
export interface Booking extends StoredBooking {
  id: string
  title: string
  trainer: string
  room: string | null
  day: string       // e.g. "Mon"
  date: string      // e.g. "Sep 28"
  time: string      // start time, e.g. "06:00"
  startsAt: number  // epoch ms, for sorting
}

// Bump the version to wipe everyone's demo bookings.
export const BOOKINGS_COOKIE = 'bf-bookings-v2'

// Demo member starts with nothing booked.
export const DEFAULT_BOOKINGS: StoredBooking[] = []

// ─────────────────────────────────────────────
// Cookie (de)serialisation
// ─────────────────────────────────────────────

export function parseBookings(raw: string | undefined): StoredBooking[] {
  if (!raw) return DEFAULT_BOOKINGS
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return DEFAULT_BOOKINGS
    return parsed.filter(
      (b): b is StoredBooking =>
        typeof b?.classId === 'string' &&
        ALL_CLASSES.some((c) => c.id === b.classId) &&
        (b.status === 'CONFIRMED' || b.status === 'WAITLIST'),
    )
  } catch {
    return DEFAULT_BOOKINGS
  }
}

// ─────────────────────────────────────────────
// Next-session resolution
// ─────────────────────────────────────────────

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Soonest session after `now` for schedule slots like "MON · 06:00" or "DAILY · 12:00". */
function nextSession(schedule: string[], now: Date): Date | null {
  let best: Date | null = null
  for (const slot of schedule) {
    const [dayPart, timePart] = slot.split('·').map((s) => s.trim())
    const [h, m] = timePart.split(':').map(Number)
    const days = dayPart === 'DAILY' ? WEEKDAYS : [dayPart]
    for (const day of days) {
      const target = WEEKDAYS.indexOf(day)
      if (target < 0) continue
      const d = new Date(now)
      d.setHours(h, m, 0, 0)
      d.setDate(d.getDate() + ((target - d.getDay() + 7) % 7))
      if (d <= now) d.setDate(d.getDate() + 7)
      if (!best || d < best) best = d
    }
  }
  return best
}

function roomFor(title: string): string | null {
  for (const day of DAYS_SCHEDULE) {
    const session = day.sessions.find((s) => s.class === title)
    if (session) return session.room
  }
  return null
}

/** Resolves stored bookings to their next sessions, soonest first. */
export function resolveBookings(stored: StoredBooking[], now = new Date()): Booking[] {
  const result: Booking[] = []
  for (const b of stored) {
    const cls = ALL_CLASSES.find((c) => c.id === b.classId)
    const at = cls && nextSession(cls.schedule, now)
    if (!cls || !at) continue
    const weekday = WEEKDAYS[at.getDay()]
    result.push({
      ...b,
      id: `bk-${cls.id}`,
      title: cls.title,
      trainer: cls.trainer,
      room: roomFor(cls.title),
      day: weekday[0] + weekday.slice(1).toLowerCase(),
      date: `${MONTHS[at.getMonth()]} ${at.getDate()}`,
      time: `${String(at.getHours()).padStart(2, '0')}:${String(at.getMinutes()).padStart(2, '0')}`,
      startsAt: at.getTime(),
    })
  }
  return result.sort((a, b) => a.startsAt - b.startsAt)
}
