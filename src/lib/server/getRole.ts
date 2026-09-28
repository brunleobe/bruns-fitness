import { cookies } from 'next/headers'
import { ROLE_COOKIE, isRole, type Role } from '@/lib/role'

// Reads the demo role from the request cookie. Defaults to Guest.
export async function getRole(): Promise<Role> {
  const value = (await cookies()).get(ROLE_COOKIE)?.value
  return isRole(value) ? value : 'Guest'
}
