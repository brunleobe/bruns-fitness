// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface Trainer {
  id: string
  name: string
  yearsExp: number
  role: string
  highlight: string     // short credential line shown in detail panel
  bio: string
  certifications: string[]
  image: string
  classes: string[]
  sessionRate: number   // 1-on-1 price in $/hr
}

// ─────────────────────────────────────────────
// Trainers data
// ─────────────────────────────────────────────

export const ALL_TRAINERS: Trainer[] = [
  {
    id: 'trainer-marcus-webb',
    name: 'Marcus Webb',
    yearsExp: 12,
    role: 'Head of Strength & Combat',
    highlight: '400+ clients transformed',
    bio: 'Former professional boxer turned elite strength coach. Marcus has transformed over 400 clients through his signature high-intensity methodology — built on discipline, precision, and the belief that most people are capable of far more than they think.',
    certifications: ['NASM-CPT', 'Boxing Coach L3'],
    image: '/trainers/marcus.jpg',
    classes: ['HIIT COMBAT', 'POWERLIFTING'],
    sessionRate: 85,
  },
  {
    id: 'trainer-sofia-reyes',
    name: 'Sofia Reyes',
    yearsExp: 8,
    role: 'Strength & Conditioning',
    highlight: 'CSCS-certified, Olympic lift specialist',
    bio: "Olympic lifting background with a relentless focus on functional movement patterns. Sofia's clients don't just get stronger — they move better, recover faster, and consistently break personal records they once thought were ceilings.",
    certifications: ['CSCS', 'FMS Specialist'],
    image: '/trainers/sofia.jpg',
    classes: ['STRENGTH LAB'],
    sessionRate: 85,
  },
  {
    id: 'trainer-aisha-nkosi',
    name: 'Aisha Nkosi',
    yearsExp: 10,
    role: 'Yoga & Mindful Movement',
    highlight: 'RYT-500, breathwork certified',
    bio: '500-hour certified with deep expertise in breathwork, mobility, and recovery. Aisha bridges the gap between peak performance and inner stillness — because the strongest athletes are also the most recovered ones.',
    certifications: ['RYT-500', 'Yin Yoga'],
    image: '/trainers/aisha.jpg',
    classes: ['YOGA FLOW', 'PILATES CORE'],
    sessionRate: 85,
  },
  {
    id: 'trainer-jordan-kim',
    name: 'Jordan Kim',
    yearsExp: 6,
    role: 'Endurance & Speed Coaching',
    highlight: '2x Boston Marathon finisher',
    bio: "Two-time Boston Marathon finisher who coaches runners from first 5K to ultramarathon. Jordan's approach: speed is a trainable skill. Aerobic base is everything. And consistency beats intensity every single time.",
    certifications: ['RRCA Coach', 'NASM-CPT'],
    image: '/trainers/jordan.jpg',
    classes: ['MORNING RUN'],
    sessionRate: 85,
  },
]
