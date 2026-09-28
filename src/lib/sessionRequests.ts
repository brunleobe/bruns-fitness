import { ALL_TRAINERS } from '@/data/trainersData'

// Trainer ids the member has requested a 1-on-1 session with.
export const SESSION_REQUESTS_COOKIE = 'bf-session-requests-v1'

export function parseSessionRequests(raw: string | undefined): string[] {
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (id): id is string => typeof id === 'string' && ALL_TRAINERS.some((t) => t.id === id),
    )
  } catch {
    return []
  }
}
