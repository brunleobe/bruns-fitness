import { ALL_CLASSES, DAYS_SCHEDULE } from '@/data/classesData'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type BookingStatus = 'CONFIRMED' | 'WAITLIST'

/** One scheduled occurrence of a class, in gym-local wall-clock time. */
export interface ClassSession {
  classId: string
  date: string       // "2026-09-30"
  time: string       // "06:00"
}

/** A session with display labels, e.g. for the session picker. */
export interface SessionSlot extends ClassSession {
  key: string
  dayLabel: string   // "Wed"
  dateLabel: string  // "Sep 30"
}

/** What we persist in the cookie — one entry per booked session. */
export interface StoredBooking extends ClassSession {
  status: BookingStatus
}

/** A stored booking resolved for display. */
export interface Booking extends StoredBooking {
  id: string
  title: string
  trainer: string
  room: string | null
  dayLabel: string
  dateLabel: string
}

// Bump the version to wipe everyone's demo bookings (v3: per-session bookings).
export const BOOKINGS_COOKIE = 'bf-bookings-v3'

// Demo member starts with nothing booked.
export const DEFAULT_BOOKINGS: StoredBooking[] = []

/** Members can book sessions up to this many days ahead (today included). */
export const BOOKING_WINDOW_DAYS = 7

/** Classes at or below this many open spots get a "low spots" highlight. */
export const LOW_SPOTS_THRESHOLD = 4

// All dates/times are the gym's local time, so server and browser always agree.
export const GYM_TIME_ZONE = 'Africa/Lagos'

// ─────────────────────────────────────────────
// Date helpers (plain "YYYY-MM-DD" / "HH:MM" strings)
// ─────────────────────────────────────────────

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const TIME_RE = /^\d{2}:\d{2}$/

/** Current gym-local date and time for a given instant. */
function gymNow(nowMs: number): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: GYM_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(nowMs)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00'
  return { date: `${get('year')}-${get('month')}-${get('day')}`, time: `${get('hour')}:${get('minute')}` }
}

function toUtc(date: string): Date {
  return new Date(`${date}T00:00:00Z`)
}

function addDays(date: string, days: number): string {
  const d = toUtc(date)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

function labels(date: string): { dayLabel: string; dateLabel: string } {
  const d = toUtc(date)
  const wd = WEEKDAYS[d.getUTCDay()]
  return { dayLabel: wd[0] + wd.slice(1).toLowerCase(), dateLabel: `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}` }
}

export function sessionKey(s: ClassSession): string {
  return `${s.classId}@${s.date}T${s.time}`
}

function isSameSession(a: ClassSession, b: ClassSession): boolean {
  return a.classId === b.classId && a.date === b.date && a.time === b.time
}

function isUpcoming(s: ClassSession, nowMs: number): boolean {
  const now = gymNow(nowMs)
  return `${s.date} ${s.time}` > `${now.date} ${now.time}`
}

// ─────────────────────────────────────────────
// Schedule
// ─────────────────────────────────────────────

/** Bookable sessions of a class within the booking window, soonest first. */
export function upcomingSessions(classId: string, nowMs: number): SessionSlot[] {
  const cls = ALL_CLASSES.find((c) => c.id === classId)
  if (!cls) return []
  const today = gymNow(nowMs).date
  const slots: SessionSlot[] = []
  for (let offset = 0; offset < BOOKING_WINDOW_DAYS; offset++) {
    const date = addDays(today, offset)
    const weekday = WEEKDAYS[toUtc(date).getUTCDay()]
    for (const slot of cls.schedule) {
      // Schedule slots look like "MON · 06:00" or "DAILY · 12:00".
      const [dayPart, time] = slot.split('·').map((s) => s.trim())
      if (dayPart !== 'DAILY' && dayPart !== weekday) continue
      const session = { classId, date, time }
      if (!isUpcoming(session, nowMs)) continue
      slots.push({ ...session, key: sessionKey(session), ...labels(date) })
    }
  }
  return slots.sort((a, b) => a.key.localeCompare(b.key))
}

export function isBookableSession(s: ClassSession, nowMs: number): boolean {
  return upcomingSessions(s.classId, nowMs).some((slot) => isSameSession(slot, s))
}

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
        typeof b.date === 'string' && DATE_RE.test(b.date) &&
        typeof b.time === 'string' && TIME_RE.test(b.time) &&
        (b.status === 'CONFIRMED' || b.status === 'WAITLIST'),
    )
  } catch {
    return DEFAULT_BOOKINGS
  }
}

// ─────────────────────────────────────────────
// Booking rules — shared by server actions and optimistic UI updates
// ─────────────────────────────────────────────

/** Open spots in one session, after the demo member's own confirmed booking takes one. */
export function spotsLeft(session: ClassSession, bookings: StoredBooking[]): number {
  const cls = ALL_CLASSES.find((c) => c.id === session.classId)
  if (!cls) return 0
  const taken = bookings.some((b) => isSameSession(b, session) && b.status === 'CONFIRMED') ? 1 : 0
  return Math.max(0, cls.spotsLeft - taken)
}

export function findBooking(bookings: StoredBooking[], session: ClassSession): StoredBooking | undefined {
  return bookings.find((b) => isSameSession(b, session))
}

/** Books a session: confirmed if a spot is open, otherwise onto that session's waitlist. */
export function addBooking(bookings: StoredBooking[], session: ClassSession): StoredBooking[] {
  if (findBooking(bookings, session)) return bookings
  const status: BookingStatus = spotsLeft(session, bookings) > 0 ? 'CONFIRMED' : 'WAITLIST'
  return [...bookings, { classId: session.classId, date: session.date, time: session.time, status }]
}

/** Cancels a booking or leaves the waitlist; a confirmed spot is freed again. */
export function removeBooking(bookings: StoredBooking[], session: ClassSession): StoredBooking[] {
  return bookings.filter((b) => !isSameSession(b, session))
}

/** Drops sessions that have already started. */
export function pruneBookings(bookings: StoredBooking[], nowMs: number): StoredBooking[] {
  return bookings.filter((b) => isUpcoming(b, nowMs))
}

// ─────────────────────────────────────────────
// Display
// ─────────────────────────────────────────────

function roomFor(title: string): string | null {
  for (const day of DAYS_SCHEDULE) {
    const session = day.sessions.find((s) => s.class === title)
    if (session) return session.room
  }
  return null
}

/** Upcoming bookings with display details, soonest first. */
export function resolveBookings(stored: StoredBooking[], nowMs = Date.now()): Booking[] {
  const result: Booking[] = []
  for (const b of pruneBookings(stored, nowMs)) {
    const cls = ALL_CLASSES.find((c) => c.id === b.classId)
    if (!cls) continue
    result.push({
      ...b,
      id: sessionKey(b),
      title: cls.title,
      trainer: cls.trainer,
      room: roomFor(cls.title),
      ...labels(b.date),
    })
  }
  return result.sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
}
