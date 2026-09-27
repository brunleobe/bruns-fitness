'use client'

import { useState } from 'react'
import { ALL_CLASSES } from '@/data/classesData'
import type { FitnessClass } from '@/data/classesData'

// ─────────────────────────────────────────────
// Types & helpers
// ─────────────────────────────────────────────

type LevelFilter = 'ALL CLASSES' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL LEVELS'

const LEVEL_FILTERS: LevelFilter[] = [
  'ALL CLASSES',
  'BEGINNER',
  'INTERMEDIATE',
  'ADVANCED',
  'ALL LEVELS',
]

const LEVEL_BADGE: Record<string, string> = {
  ADVANCED: 'bg-red-600 text-white',
  INTERMEDIATE: 'bg-orange-500 text-white',
  BEGINNER: 'bg-emerald-600 text-white',
  'ALL LEVELS': 'bg-sky-600 text-white',
}

function parseDurationMinutes(duration: string): number {
  const match = duration.match(/(\d+)/)
  return match ? parseInt(match[1]) : 60
}

function addMinutes(time: string, mins: number): string {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + mins
  const endH = Math.floor(total / 60) % 24
  const endM = total % 60
  return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`
}

/** Returns e.g. "06:00 — 07:00" from first schedule slot + duration */
function getTimeRange(cls: FitnessClass): string {
  const firstSlot = cls.schedule[0] // e.g. 'MON · 06:00'
  const timePart = firstSlot.split('· ')[1]?.trim() ?? '00:00'
  const end = addMinutes(timePart, parseDurationMinutes(cls.duration))
  return `${timePart} — ${end}`
}

/** Returns e.g. "MON · WED · FRI · Marcus Webb" */
function getDaysAndTrainer(cls: FitnessClass): string {
  const days = cls.schedule.map((s) => s.split(' ·')[0].trim())
  return [...days, cls.trainer].join(' · ')
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function ClassCard({ cls, onBook }: { cls: FitnessClass; onBook: () => void }) {
  return (
    <div className="group bg-[#0a0a0a] border border-white/8 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image area */}
      <div className="relative h-56 overflow-hidden bg-zinc-900 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cls.image}
          alt={cls.title}
          className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Level badge */}
        <span
          className={`absolute top-3 left-3 ${LEVEL_BADGE[cls.level] ?? 'bg-gray-700 text-white'} text-[10px] font-black tracking-widest px-2.5 py-1 uppercase`}
        >
          {cls.level}
        </span>

        {/* Spots */}
        <span
          className={`absolute top-3 right-3 text-[10px] font-black tracking-wider px-2.5 py-1 uppercase ${
            cls.spotsHighlight
              ? 'bg-red-600 text-white'
              : 'text-gray-300'
          }`}
        >
          {cls.spots}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-base font-black uppercase text-white tracking-tight group-hover:text-red-500 transition-colors mb-1">
          {cls.title}
        </h3>
        <p className="text-red-500 text-xs italic leading-relaxed">{cls.tagline}</p>

        {/* Footer row */}
        <div className="mt-auto pt-4 border-t border-white/8 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-white text-sm font-black tracking-wide tabular-nums">
              {getTimeRange(cls)}
            </div>
            <div className="text-gray-500 text-[10px] mt-0.5 tracking-wide truncate">
              {getDaysAndTrainer(cls)}
            </div>
          </div>
          <button
            onClick={onBook}
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-black tracking-[0.15em] uppercase px-5 py-2.5 shrink-0 transition-all duration-200 cursor-pointer"
          >
            JOIN
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

interface ClassesSectionProps {
  onBook: () => void
}

export default function ClassesSection({ onBook }: ClassesSectionProps) {
  const [activeLevel, setActiveLevel] = useState<LevelFilter>('ALL CLASSES')

  const filtered =
    activeLevel === 'ALL CLASSES'
      ? ALL_CLASSES
      : ALL_CLASSES.filter((c) => c.level === activeLevel)

  return (
    <section className="bg-black text-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-red-600 inline-block" />
              <span className="text-red-500 text-xs font-bold tracking-[0.25em] uppercase">
                Class Schedule
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black leading-[1.05] mb-5">
              Every class.<br />Every level.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              From your first session to your{' '}
              <span className="text-white font-semibold">thousandth</span> — we have a class for where
              you are right now, and for where you&apos;re going.
            </p>
          </div>

          <div className="lg:text-right lg:pt-3 shrink-0">
            <p className="text-sm">
              <span className="text-red-500 font-bold">Members book free.</span>{' '}
              <span className="text-gray-300">Join from $29/mo.</span>
            </p>
          </div>
        </div>

        {/* ── Level filter tabs ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {LEVEL_FILTERS.map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`px-5 py-2 text-xs font-black tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                activeLevel === level
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/40'
                  : 'border border-white/20 text-gray-400 hover:text-white hover:border-white/40'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* ── Cards grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cls) => (
              <ClassCard key={cls.id} cls={cls} onBook={onBook} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-600 text-sm font-bold uppercase tracking-widest">
            No classes at this level yet.
          </div>
        )}
      </div>
    </section>
  )
}
