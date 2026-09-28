// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface MemberProfile {
  firstName: string
  planId: string        // matches a PricingPlan id
  renewsOn: string
}

export interface MemberStat {
  label: string
  value: string
  note: string
}

export interface Payment {
  id: string
  date: string
  amount: number
  status: 'PAID' | 'FAILED'
}

// ─────────────────────────────────────────────
// Mock member (demo data, no real person)
// ─────────────────────────────────────────────

export const MEMBER: MemberProfile = {
  firstName: 'Alex',
  planId: 'plan-perform',
  renewsOn: 'Oct 15, 2026',
}

export const MEMBER_STATS: MemberStat[] = [
  { label: 'Classes this month', value: '11', note: '+3 vs last month' },
  { label: 'Personal record', value: '185 kg', note: 'Deadlift · Sep 4' },
  { label: 'Current streak', value: '14 days', note: "Don't break the chain" },
]

export const PAYMENT_HISTORY: Payment[] = [
  { id: 'pay-3', date: 'Sep 15, 2026', amount: 69, status: 'PAID' },
  { id: 'pay-2', date: 'Aug 15, 2026', amount: 69, status: 'PAID' },
  { id: 'pay-1', date: 'Jul 15, 2026', amount: 69, status: 'PAID' },
]
