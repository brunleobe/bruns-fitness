'use client'

import { useState } from 'react'
import { ALL_TRAINERS } from '@/data/trainersData'
import type { Trainer } from '@/data/trainersData'

// ─────────────────────────────────────────────
// Trainer card
// ─────────────────────────────────────────────

function TrainerCard({
  trainer,
  isSelected,
  onClick,
}: {
  trainer: Trainer
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`group flex flex-col bg-[#0a0a0a] border transition-all duration-300 overflow-hidden cursor-pointer ${
        isSelected
          ? 'border-red-600'
          : 'border-white/8 hover:border-white/20'
      }`}
    >
      {/* Image — square */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={trainer.image}
          alt={trainer.name}
          className="w-full h-full object-cover object-top brightness-90 group-hover:brightness-100 transition-all duration-500 group-hover:scale-105"
        />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent" />

        {/* Name & exp overlaid at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white text-base font-black leading-tight drop-shadow">{trainer.name}</p>
          <p className="text-red-500 text-xs font-bold mt-0.5">{trainer.yearsExp} yrs exp.</p>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-4 pt-3 pb-4 flex flex-col gap-2.5">
        <p className="text-gray-300 text-xs leading-snug">{trainer.role}</p>
        <div className="flex flex-wrap gap-1.5">
          {trainer.certifications.map((cert) => (
            <span
              key={cert}
              className="bg-white/5 border border-white/10 text-gray-400 font-mono text-[10px] font-bold tracking-wider px-2.5 py-1 uppercase"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Detail panel
// ─────────────────────────────────────────────

function BookSessionBox({
  trainer,
  requested,
  onRequest,
  onCancel,
}: {
  trainer: Trainer
  requested: boolean
  onRequest: () => void
  onCancel: () => void
}) {
  const firstName = trainer.name.split(' ')[0]
  return (
    <div className="border border-white/8 bg-white/[0.02] p-6 self-start">
      <p className="text-red-500 text-[10px] font-mono font-black tracking-[0.2em] uppercase mb-3">
        Book a Session
      </p>
      <div className="flex items-end gap-1 mb-3">
        <span className="font-display text-4xl font-black text-white leading-none">${trainer.sessionRate}</span>
        <span className="text-gray-500 text-sm mb-0.5">/hr</span>
      </div>
      <p className="text-gray-400 text-xs leading-relaxed mb-6">
        One-on-one with {firstName}. Custom programming, real-time coaching, and full
        accountability.
      </p>
      {requested ? (
        <>
          <div className="w-full py-3.5 text-center text-xs font-display font-black tracking-[0.2em] uppercase border border-green-500/40 bg-green-500/5 text-green-500">
            ✓ Request Sent
          </div>
          <button
            onClick={onCancel}
            className="w-full mt-3 font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-gray-500 hover:text-red-500 underline-offset-4 hover:underline transition-colors cursor-pointer"
          >
            Cancel request
          </button>
        </>
      ) : (
        <button
          onClick={onRequest}
          className="w-full py-3.5 text-xs font-display font-black tracking-[0.2em] uppercase bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 cursor-pointer"
        >
          Request a Session
        </button>
      )}
    </div>
  )
}

function MembersOnlyBox() {
  return (
    <div className="border border-white/8 bg-white/[0.02] p-6 self-start">
      <p className="text-gray-500 text-[10px] font-mono font-black tracking-[0.2em] uppercase mb-3">
        Members Only
      </p>
      <p className="text-gray-300 text-xs leading-relaxed mb-3">
        Join Bruns Fitness to book 1-on-1 sessions with our certified coaches — from <span className="text-white font-semibold">$85/hr.</span>
      </p>
      <p className="text-gray-600 text-[10px] uppercase tracking-wider">
        Included in PERFORM &amp; BLACK plans
      </p>
    </div>
  )
}

function TrainerDetail({ trainer, children }: { trainer: Trainer; children: React.ReactNode }) {
  return (
    <div className="mt-4 border border-white/10 bg-[#0a0a0a] p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 animate-[fadeIn_0.25s_ease]">
      {/* Left — main info */}
      <div className="md:col-span-2">
        <p className="text-red-500 text-[10px] font-mono font-black tracking-[0.25em] uppercase mb-3">
          Trainer Profile
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-1">
          {trainer.name}
        </h2>
        <p className="text-gray-400 text-sm mb-1">{trainer.role}</p>
        <p className="text-gray-600 text-xs mb-6">{trainer.highlight}</p>
        <p className="text-gray-300 text-sm leading-relaxed">{trainer.bio}</p>
      </div>

      {/* Right — booking / members-only box */}
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────

interface TrainersSectionProps {
  /** Member view: trainer ids already requested. Omit for the guest view. */
  requestedIds?: string[]
  onRequestSession?: (trainerId: string) => void
  onCancelSession?: (trainerId: string) => void
}

export default function TrainersSection({
  requestedIds,
  onRequestSession,
  onCancelSession,
}: TrainersSectionProps = {}) {
  const [selectedId, setSelectedId] = useState<string | null>(ALL_TRAINERS[0].id)

  const selectedTrainer = ALL_TRAINERS.find((t) => t.id === selectedId) ?? null

  function handleCardClick(id: string) {
    setSelectedId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="bg-black text-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-red-600 inline-block" />
            <span className="text-red-500 text-xs font-mono font-bold tracking-[0.25em] uppercase">
              Our Team
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black leading-[1.05] mb-5">
            The coaches<br />behind the results.
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Every Bruns Fitness coach is{' '}
            <span className="text-red-500 font-semibold">certified</span>, experienced, and
            obsessively focused on one{' '}
            <span className="text-white font-semibold">thing</span>: making you better. Select a
            coach to learn more.
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ALL_TRAINERS.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              isSelected={selectedId === trainer.id}
              onClick={() => handleCardClick(trainer.id)}
            />
          ))}
        </div>

        {/* Detail panel */}
        {selectedTrainer && (
          <TrainerDetail trainer={selectedTrainer}>
            {requestedIds ? (
              <BookSessionBox
                trainer={selectedTrainer}
                requested={requestedIds.includes(selectedTrainer.id)}
                onRequest={() => onRequestSession?.(selectedTrainer.id)}
                onCancel={() => onCancelSession?.(selectedTrainer.id)}
              />
            ) : (
              <MembersOnlyBox />
            )}
          </TrainerDetail>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
