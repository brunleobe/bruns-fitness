import { cookies } from 'next/headers'
import { SESSION_REQUESTS_COOKIE, parseSessionRequests } from '@/lib/sessionRequests'

// Reads the trainer ids the demo member has requested sessions with.
export async function getSessionRequests(): Promise<string[]> {
  return parseSessionRequests((await cookies()).get(SESSION_REQUESTS_COOKIE)?.value)
}
