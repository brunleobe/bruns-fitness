'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PlanModal from '@/components/PlanModal'

type ClassCategory = 'ALL' | 'HIIT & CARDIO' | 'STRENGTH' | 'COMBAT' | 'RECOVERY'

interface FitnessClass {
  id: string
  title: string
  subtitle: string
  category: ClassCategory
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL LEVELS'
  intensity: number // 1 to 5
  duration: string
  trainer: string
  trainerRole: string
  spots: string
  spotsHighlight: boolean
  schedule: string[]
  description: string
  highlights: string[]
  image: string
  calories: string
}

const ALL_CLASSES: FitnessClass[] = [
  {
    id: 'class-hiit-combat',
    title: 'HIIT COMBAT',
    subtitle: 'Maximum Output & Explosive Conditioning',
    category: 'HIIT & CARDIO',
    level: 'ADVANCED',
    intensity: 5,
    duration: '60 MIN',
    trainer: 'Marcus Webb',
    trainerRole: 'Head Performance Coach',
    spots: '4 spots left',
    spotsHighlight: true,
    schedule: ['MON · 06:00', 'WED · 06:00', 'FRI · 07:00'],
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
    category: 'STRENGTH',
    level: 'ALL LEVELS',
    intensity: 4,
    duration: '90 MIN',
    trainer: 'Sofia Reyes',
    trainerRole: 'Strength & Conditioning Specialist',
    spots: '8 spots left',
    spotsHighlight: false,
    schedule: ['TUE · 08:00', 'THU · 08:00', 'SAT · 10:00'],
    description:
      'Structured progressive overload focusing on compound lifts: squats, deadlifts, bench presses, and accessory hypertrophy work. Coached with strict technique emphasis.',
    highlights: ['Barbell technique', 'Progressive overload tracking', 'Power rack protocols'],
    image: '/classes/strength.jpg',
    calories: '550 - 700 kcal',
  },
  {
    id: 'class-metcon-beast',
    title: 'METCON BEAST',
    subtitle: 'Unbroken Functional Capacity',
    category: 'HIIT & CARDIO',
    level: 'INTERMEDIATE',
    intensity: 5,
    duration: '50 MIN',
    trainer: 'David Vance',
    trainerRole: 'Cross-Training Lead',
    spots: '6 spots left',
    spotsHighlight: false,
    schedule: ['MON · 17:30', 'WED · 17:30', 'SAT · 09:00'],
    description:
      'Relentless metabolic conditioning. Work in teams and solo across ski ergs, curved treadmills, heavy kettlebells, and bodyweight endurance circuits with zero downtime.',
    highlights: ['Assault bike intervals', 'Kettlebell clean & press', 'Sandbag carries'],
    image: '/classes/metcon.jpg',
    calories: '650 - 850 kcal',
  },
  {
    id: 'class-apex-boxing',
    title: 'APEX BOXING',
    subtitle: 'Strike Power & Kinetic Movement',
    category: 'COMBAT',
    level: 'INTERMEDIATE',
    intensity: 4,
    duration: '60 MIN',
    trainer: 'Marcus Webb',
    trainerRole: 'Striking Coach',
    spots: '5 spots left',
    spotsHighlight: true,
    schedule: ['TUE · 18:30', 'FRI · 18:30', 'SUN · 11:00'],
    description:
      'Authentic boxing mechanics. Master combinations on heavy aqua bags, footwork angles, defensive head movement, and core rotational power. Hand wraps required.',
    highlights: ['Aqua heavy bag circuits', 'Footwork & slip lines', 'Rotational core power'],
    image: '/classes/boxing.jpg',
    calories: '700 - 900 kcal',
  },
  {
    id: 'class-yoga-flow',
    title: 'YOGA FLOW & MOBILITY',
    subtitle: 'Active Recovery & Joint Longevity',
    category: 'RECOVERY',
    level: 'BEGINNER',
    intensity: 2,
    duration: '60 MIN',
    trainer: 'Aisha Nkosi',
    trainerRole: 'Mobility & Recovery Director',
    spots: '12 spots left',
    spotsHighlight: false,
    schedule: ['DAILY · 12:00', 'SAT · 08:00', 'SUN · 10:00'],
    description:
      'Dynamic vinyasa flow paired with deep fascial release and mobility drills. Designed specifically for heavy lifters and athletes seeking injury prevention and nervous system reset.',
    highlights: ['Myofascial decompression', 'Hip & shoulder openers', 'Breathwork downregulation'],
    image: '/classes/yoga.jpg',
    calories: '250 - 350 kcal',
  },
]

const DAYS_SCHEDULE = [
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
      { time: '18:30 - 19:30', class: 'APEX BOXING', coach: 'Marcus Webb', room: 'Combat Zone' },
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
      { time: '18:30 - 19:30', class: 'APEX BOXING', coach: 'Marcus Webb', room: 'Combat Zone' },
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
      { time: '11:00 - 12:00', class: 'APEX BOXING', coach: 'Marcus Webb', room: 'Combat Zone' },
    ],
  },
]

export default function ClassesPage() {
  const [activeCategory, setActiveCategory] = useState<ClassCategory>('ALL')
  const [selectedDay, setSelectedDay] = useState<string>('MONDAY')
  const [modalOpen, setModalOpen] = useState(false)

  const categories: ClassCategory[] = ['ALL', 'HIIT & CARDIO', 'STRENGTH', 'COMBAT', 'RECOVERY']

  const filteredClasses =
    activeCategory === 'ALL'
      ? ALL_CLASSES
      : ALL_CLASSES.filter((c) => c.category === activeCategory)

  const currentDaySchedule = DAYS_SCHEDULE.find((d) => d.day === selectedDay)

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 border-b border-white/10 overflow-hidden">
        {/* Background glow & subtle grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-950/25 via-black to-black pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Breadcrumb & tag */}
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/"
              className="text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors"
            >
              HOME
            </Link>
            <span className="text-gray-600 text-xs">/</span>
            <span className="text-red-500 text-xs font-bold tracking-widest uppercase">
              CLASSES & SCHEDULE
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-red-600 inline-block" />
                <span className="text-red-500 text-xs font-bold tracking-[0.25em] uppercase">
                  UNCOMPROMISING CURRICULUM
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none mb-6">
                ELITE CLASS <br />
                <span className="text-red-600">SCHEDULE.</span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Every session is coach-led, performance-tracked, and capped to maintain individual
                attention. Whether breaking your anaerobic ceiling or building foundational power,
                find your discipline below.
              </p>
            </div>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-3 gap-4 border border-white/10 bg-white/[0.02] p-5 rounded-sm lg:self-end">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">34</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Classes / Wk
                </div>
              </div>
              <div className="border-l border-white/10 pl-4">
                <div className="text-2xl sm:text-3xl font-black text-red-500">1:12</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Coach Ratio
                </div>
              </div>
              <div className="border-l border-white/10 pl-4">
                <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Equipment Provided
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-12 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs font-black tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white shadow-lg shadow-red-950/40'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
                {cat === 'ALL' && (
                  <span className="ml-2 text-[10px] opacity-75">({ALL_CLASSES.length})</span>
                )}
                {cat !== 'ALL' && (
                  <span className="ml-2 text-[10px] opacity-75">
                    ({ALL_CLASSES.filter((c) => c.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Classes Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-[#0b0b0b] border border-white/10 hover:border-red-600/50 transition-all duration-300 flex flex-col group overflow-hidden rounded-sm"
            >
              {/* Card Image banner */}
              <div className="relative h-60 w-full overflow-hidden bg-zinc-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/40 to-transparent" />

                {/* Level Tag & Spots left */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-black/80 backdrop-blur-sm border border-white/15 text-white text-[10px] font-black tracking-widest px-3 py-1 uppercase">
                    {cls.level}
                  </span>
                  <span
                    className={`text-[10px] font-black tracking-widest px-3 py-1 uppercase backdrop-blur-sm ${
                      cls.spotsHighlight
                        ? 'bg-red-600 text-white'
                        : 'bg-black/80 border border-white/15 text-gray-300'
                    }`}
                  >
                    {cls.spots}
                  </span>
                </div>

                {/* Duration & Calorie badge */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-bold text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    {cls.duration}
                  </span>
                  <span className="text-[11px] text-gray-400">{cls.calories}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight group-hover:text-red-500 transition-colors">
                    {cls.title}
                  </h3>
                  <p className="text-red-500 text-[11px] font-bold tracking-wider uppercase mb-3">
                    {cls.subtitle}
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6">
                    {cls.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 mb-6 border-t border-b border-white/5 py-4">
                    {cls.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                        <span className="text-red-500 font-bold">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Schedule days */}
                  <div className="mb-6">
                    <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1.5">
                      Weekly Timeslots
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cls.schedule.map((timeSlot, i) => (
                        <span
                          key={i}
                          className="bg-white/5 text-gray-300 border border-white/10 text-[10px] font-semibold px-2 py-1"
                        >
                          {timeSlot}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer with Coach & Book button */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-white text-xs font-bold">{cls.trainer}</div>
                    <div className="text-[10px] text-gray-500 uppercase">{cls.trainerRole}</div>
                  </div>

                  <button
                    onClick={() => setModalOpen(true)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-black tracking-widest uppercase px-5 py-2.5 transition-all duration-200 hover:scale-[1.03] active:scale-100 cursor-pointer"
                  >
                    BOOK SPOT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Schedule Timetable Section */}
      <section className="py-16 sm:py-24 bg-[#070707] border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-6 h-px bg-red-600 inline-block" />
                <span className="text-red-500 text-xs font-bold tracking-[0.25em] uppercase">
                  MASTER TIMETABLE
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                WEEKLY SCHEDULE MATRIX
              </h2>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm max-w-md">
              Doors open 15 minutes before the first morning session. Lockers, towel service, and
              hyperice recovery boots are complimentary for all booked members.
            </p>
          </div>

          {/* Day Selector Buttons */}
          <div className="flex overflow-x-auto gap-2 pb-4 mb-8 scrollbar-none">
            {DAYS_SCHEDULE.map((d) => (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`px-6 py-3 text-xs font-black tracking-widest uppercase shrink-0 transition-all cursor-pointer ${
                  selectedDay === d.day
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {d.day}
              </button>
            ))}
          </div>

          {/* Current Day Sessions Table */}
          <div className="border border-white/10 bg-black divide-y divide-white/5">
            {currentDaySchedule?.sessions.map((session, index) => (
              <div
                key={index}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4 sm:gap-8">
                  <div className="w-32 shrink-0">
                    <span className="text-white text-sm sm:text-base font-black tracking-wider">
                      {session.time}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white text-base sm:text-lg font-black uppercase tracking-tight">
                      {session.class}
                    </h4>
                    <p className="text-gray-400 text-xs">
                      Led by <span className="text-white font-semibold">{session.coach}</span> ·{' '}
                      <span className="text-red-500">{session.room}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 font-bold uppercase tracking-wider">
                    Open for Booking
                  </span>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="border border-white/30 hover:border-white text-white text-xs font-bold tracking-widest uppercase px-5 py-2 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    RESERVE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation & FAQ */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-6 h-px bg-red-600 inline-block" />
            <span className="text-red-500 text-xs font-bold tracking-[0.25em] uppercase">
              PREPARATION
            </span>
            <span className="w-6 h-px bg-red-600 inline-block" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            WHAT TO EXPECT AT APEX
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-white/10 bg-[#0c0c0c] p-7 rounded-sm">
            <div className="text-red-600 text-xl font-black mb-3">01</div>
            <h3 className="text-white text-base font-bold uppercase tracking-tight mb-2">
              Arrival & Check-in
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Arrive 10 minutes prior to class start. First-timers receive biometric wristband
              pairing and gym floor walkthrough from coach on duty.
            </p>
          </div>

          <div className="border border-white/10 bg-[#0c0c0c] p-7 rounded-sm">
            <div className="text-red-600 text-xl font-black mb-3">02</div>
            <h3 className="text-white text-base font-bold uppercase tracking-tight mb-2">
              Gear & Apparel
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Clean training shoes required. Hand wraps provided for Boxing; sweat towels and chilled
              alkaline water bottles are unlimited in every studio.
            </p>
          </div>

          <div className="border border-white/10 bg-[#0c0c0c] p-7 rounded-sm">
            <div className="text-red-600 text-xl font-black mb-3">03</div>
            <h3 className="text-white text-base font-bold uppercase tracking-tight mb-2">
              Post-Class Protocol
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Every class includes access to the contrast therapy suite: cold plunge tub (4°C) and
              Finnish dry sauna to accelerate muscular recovery.
            </p>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-red-950/40 via-red-900/20 to-black border border-red-600/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-2">
              READY TO TEST YOUR LIMITS?
            </h3>
            <p className="text-gray-300 text-sm max-w-xl">
              Join Bruns Fitness today. Get access to our complete class curriculum, elite trainers,
              and premier facility.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-black tracking-[0.2em] uppercase px-8 py-4 shrink-0 transition-all duration-200 hover:scale-[1.02] active:scale-100 cursor-pointer"
          >
            START TRAINING NOW
          </button>
        </div>
      </section>

      <Footer />

      {/* Plan modal */}
      <PlanModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
