export const ROLES = ['Guest', 'Member', 'Trainer'] as const
export type Role = (typeof ROLES)[number]

export const ROLE_COOKIE = 'bf-role'

export function isRole(value: unknown): value is Role {
  return ROLES.includes(value as Role)
}
