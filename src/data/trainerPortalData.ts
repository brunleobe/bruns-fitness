// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface TrainerSession {
  id: string
  time: string
  title: string          // client name for 1:1, class name for group
  kind: string           // e.g. "1-on-1 PT", "Assessment", "Group"
  durationMin: number
  format: '1:1' | 'GROUP'
}

// ─────────────────────────────────────────────
// Mock trainer day (demo data, fictional clients)
// ─────────────────────────────────────────────

export const TODAY_SESSIONS: TrainerSession[] = [
  { id: 'ts-1', time: '07:00', title: 'Alex Novak', kind: '1-on-1 PT', durationMin: 60, format: '1:1' },
  { id: 'ts-2', time: '09:00', title: 'Priya Sharma', kind: 'Assessment', durationMin: 45, format: '1:1' },
  { id: 'ts-3', time: '11:00', title: 'HIIT COMBAT', kind: 'Group', durationMin: 60, format: 'GROUP' },
  { id: 'ts-4', time: '14:00', title: 'Tom Briggs', kind: '1-on-1 PT', durationMin: 60, format: '1:1' },
]

export const ACTIVE_CLIENTS = 28
export const MONTH_REVENUE = 4280
