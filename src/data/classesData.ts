// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type ClassCategory = 'ALL' | 'HIIT & CARDIO' | 'STRENGTH' | 'COMBAT' | 'RECOVERY'

export interface FitnessClass {
  id: string
  title: string
  subtitle: string
  tagline: string
  category: ClassCategory
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL LEVELS'
  intensity: number // 1 to 5
  duration: string
  trainer: string
  trainerRole: string
  spotsLeft: number    // open spots before the demo member books; 0 = full (waitlist only)
  schedule: string[]
  description: string
  highlights: string[]
  image: string
  calories: string
}

export interface DaySession {
  time: string
  class: string
  coach: string
  room: string
}

export interface DaySchedule {
  day: string
  sessions: DaySession[]
}

// ─────────────────────────────────────────────
// Classes data
// ─────────────────────────────────────────────

export const ALL_CLASSES: FitnessClass[] = [
  {
    id: 'class-hiit-combat',
    title: 'HIIT COMBAT',
    subtitle: 'Maximum Output & Explosive Conditioning',
    tagline: 'Hit harder. Move faster. Leave nothing behind.',
    category: 'HIIT & CARDIO',
    level: 'ADVANCED',
    intensity: 5,
    duration: '60 MIN',
    trainer: 'Marcus Webb',
    trainerRole: 'Head Performance Coach',
    spotsLeft: 4,
    schedule: ['MON · 06:00', 'WED · 06:00', 'FRI · 06:00'],
    description:
      'High-octane interval conditioning combined with combat drills. Push past lactate threshold with sprint intervals, battle ropes, and explosive plyometrics designed to torch calories.',
    highlights: ['Heart rate zone 4-5', 'Sprint conditioning', 'Agility ladders & ropes'],
    image: '/classes/hiit.jpg',
    calories: '750 - 950 kcal',
  },
  {
    id: 'class-strength-lab',
    title: 'STRENGTH LAB',
    subtitle: 'Compound Lifting & Hypertrophy',
    tagline: 'Progressive overload. Measurable gains. Real results.',
    category: 'STRENGTH',
    level: 'ALL LEVELS',
    intensity: 4,
    duration: '90 MIN',
    trainer: 'Sofia Reyes',
    trainerRole: 'Strength & Conditioning Specialist',
    spotsLeft: 8,
    schedule: ['TUE · 08:00', 'THU · 08:00'],
    description:
      'Structured progressive overload focusing on compound lifts: squats, deadlifts, bench presses, and accessory hypertrophy work. Coached with strict technique emphasis.',
    highlights: ['Barbell technique', 'Progressive overload tracking', 'Power rack protocols'],
    image: '/classes/strength.jpg',
    calories: '550 - 700 kcal',
  },
  {
    id: 'class-yoga-flow',
    title: 'YOGA FLOW',
    subtitle: 'Active Recovery & Joint Longevity',
    tagline: 'Restore. Breathe. Come back stronger.',
    category: 'RECOVERY',
    level: 'BEGINNER',
    intensity: 2,
    duration: '60 MIN',
    trainer: 'Aisha Nkosi',
    trainerRole: 'Mobility & Recovery Director',
    spotsLeft: 12,
    schedule: ['DAILY · 12:00'],
    description:
      'Dynamic vinyasa flow paired with deep fascial release and mobility drills. Designed specifically for heavy lifters and athletes seeking injury prevention and nervous system reset.',
    highlights: ['Myofascial decompression', 'Hip & shoulder openers', 'Breathwork downregulation'],
    image: '/classes/yoga.jpg',
    calories: '250 - 350 kcal',
  },
  {
    id: 'class-pilates-core',
    title: 'PILATES CORE',
    subtitle: 'Deep Core Activation & Postural Control',
    tagline: 'Build the foundation everything else is built on.',
    category: 'STRENGTH',
    level: 'INTERMEDIATE',
    intensity: 3,
    duration: '60 MIN',
    trainer: 'Elena Marsh',
    trainerRole: 'Pilates & Movement Specialist',
    spotsLeft: 6,
    schedule: ['MON · 17:30', 'WED · 17:30', 'SAT · 17:30'],
    description:
      'Precision-based Pilates targeting deep stabilisers, pelvic floor, and spinal alignment. Combines reformer-inspired mat work with controlled breathing to build genuine functional strength.',
    highlights: ['Deep core stabilisation', 'Spinal decompression', 'Postural correction'],
    image: '/classes/pilates.jpg',
    calories: '300 - 450 kcal',
  },
  {
    id: 'class-powerlifting',
    title: 'POWERLIFTING',
    subtitle: 'Maximal Strength & Competition Prep',
    tagline: 'More weight. More discipline. More you.',
    category: 'STRENGTH',
    level: 'ADVANCED',
    intensity: 5,
    duration: '90 MIN',
    trainer: 'Marcus Webb',
    trainerRole: 'Head Performance Coach',
    spotsLeft: 0,
    schedule: ['TUE · 19:00', 'FRI · 19:00'],
    description:
      'Dedicated powerlifting programming built around the squat, bench, and deadlift. Periodised blocks, competition-rule technique, and individualised coaching for every lifter.',
    highlights: ['Squat · Bench · Deadlift focus', 'Periodised programming', 'Competition prep'],
    image: '/classes/powerlifting.jpg',
    calories: '500 - 700 kcal',
  },
  {
    id: 'class-morning-run',
    title: 'MORNING RUN',
    subtitle: 'Endurance & Outdoor Conditioning',
    tagline: 'The city is your track. Dawn is your advantage.',
    category: 'HIIT & CARDIO',
    level: 'ALL LEVELS',
    intensity: 3,
    duration: '60 MIN',
    trainer: 'Jordan Kim',
    trainerRole: 'Endurance & Running Coach',
    spotsLeft: 15,
    schedule: ['DAILY · 05:30'],
    description:
      'Coach-led outdoor running sessions blending steady-state aerobic work with interval surges. Routes change weekly to keep the mind engaged and the body adapting.',
    highlights: ['Interval surge training', 'Pacing & cadence coaching', 'Weekly changing routes'],
    image: '/classes/run.jpg',
    calories: '400 - 600 kcal',
  },
]

// ─────────────────────────────────────────────
// Weekly schedule data
// ─────────────────────────────────────────────

export const DAYS_SCHEDULE: DaySchedule[] = [
  {
    day: 'MONDAY',
    sessions: [
      { time: '06:00 - 07:00', class: 'HIIT COMBAT', coach: 'Marcus Webb', room: 'Arena A' },
      { time: '12:00 - 13:00', class: 'YOGA FLOW', coach: 'Aisha Nkosi', room: 'Studio 2' },
      { time: '17:30 - 18:20', class: 'METCON BEAST', coach: 'David Vance', room: 'Pit B' },
      { time: '19:00 - 20:30', class: 'STRENGTH LAB', coach: 'Sofia Reyes', room: 'Iron Bay' },
    ],
  },
  {
    day: 'TUESDAY',
    sessions: [
      { time: '08:00 - 09:30', class: 'STRENGTH LAB', coach: 'Sofia Reyes', room: 'Iron Bay' },
      { time: '12:00 - 13:00', class: 'YOGA FLOW', coach: 'Aisha Nkosi', room: 'Studio 2' },
      { time: '18:30 - 19:30', class: 'BRUNS BOXING', coach: 'Marcus Webb', room: 'Combat Zone' },
    ],
  },
  {
    day: 'WEDNESDAY',
    sessions: [
      { time: '06:00 - 07:00', class: 'HIIT COMBAT', coach: 'Marcus Webb', room: 'Arena A' },
      { time: '12:00 - 13:00', class: 'YOGA FLOW', coach: 'Aisha Nkosi', room: 'Studio 2' },
      { time: '17:30 - 18:20', class: 'METCON BEAST', coach: 'David Vance', room: 'Pit B' },
    ],
  },
  {
    day: 'THURSDAY',
    sessions: [
      { time: '08:00 - 09:30', class: 'STRENGTH LAB', coach: 'Sofia Reyes', room: 'Iron Bay' },
      { time: '12:00 - 13:00', class: 'YOGA FLOW', coach: 'Aisha Nkosi', room: 'Studio 2' },
      { time: '18:00 - 19:00', class: 'HIIT COMBAT', coach: 'Marcus Webb', room: 'Arena A' },
    ],
  },
  {
    day: 'FRIDAY',
    sessions: [
      { time: '07:00 - 08:00', class: 'HIIT COMBAT', coach: 'Marcus Webb', room: 'Arena A' },
      { time: '12:00 - 13:00', class: 'YOGA FLOW', coach: 'Aisha Nkosi', room: 'Studio 2' },
      { time: '18:30 - 19:30', class: 'BRUNS BOXING', coach: 'Marcus Webb', room: 'Combat Zone' },
    ],
  },
  {
    day: 'SATURDAY',
    sessions: [
      { time: '08:00 - 09:00', class: 'YOGA FLOW', coach: 'Aisha Nkosi', room: 'Studio 2' },
      { time: '09:00 - 09:50', class: 'METCON BEAST', coach: 'David Vance', room: 'Pit B' },
      { time: '10:00 - 11:30', class: 'STRENGTH LAB', coach: 'Sofia Reyes', room: 'Iron Bay' },
    ],
  },
  {
    day: 'SUNDAY',
    sessions: [
      { time: '10:00 - 11:00', class: 'YOGA FLOW', coach: 'Aisha Nkosi', room: 'Studio 2' },
      { time: '11:00 - 12:00', class: 'BRUNS BOXING', coach: 'Marcus Webb', room: 'Combat Zone' },
    ],
  },
]
