'use client'

import { PLANS } from '@/data/pricingData'
import type { PricingPlan } from '@/data/pricingData'

// ─────────────────────────────────────────────
// Plan card
// ─────────────────────────────────────────────

function PlanCard({ plan, onBook, isCurrent }: { plan: PricingPlan; onBook: () => void; isCurrent: boolean }) {
  return (
    <div
      className={`relative flex flex-col border transition-all duration-300 overflow-hidden ${
        plan.isPopular
          ? 'border-red-600 bg-[#0d0d0d]'
          : 'border-white/10 bg-[#0a0a0a] hover:border-white/20'
      }`}
    >
      {/* Most popular banner */}
      {plan.isPopular && (
        <div className="bg-red-600 text-white text-[10px] font-display font-black tracking-[0.25em] uppercase text-center py-2">
          Most Popular
        </div>
      )}

      <div className="p-7 sm:p-8 flex flex-col flex-1">
        {/* Tag */}
        <p className={`text-[10px] font-mono font-black tracking-[0.2em] uppercase mb-2 ${plan.isPopular ? 'text-red-500' : 'text-gray-500'}`}>
          {plan.tag}
        </p>

        {/* Plan name */}
        <h2 className="text-xl font-black uppercase text-white tracking-tight mb-4">
          {plan.name}
        </h2>

        {/* Price */}
        <div className="flex items-end gap-1 mb-3">
          <span className="font-display text-4xl sm:text-5xl font-black text-white leading-none">
            ${plan.price}
          </span>
          <span className="text-gray-500 text-sm mb-1">/mo</span>
        </div>

        {/* Tagline */}
        <p className="text-gray-400 text-xs leading-relaxed mb-7">{plan.tagline}</p>

        {/* Features */}
        <ul className="flex flex-col gap-3 flex-1 mb-8">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-xs text-gray-300">
              <span className="text-red-500 font-black text-sm leading-none mt-px shrink-0">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {isCurrent ? (
          <div className="w-full py-3.5 text-center text-xs font-display font-black tracking-[0.2em] uppercase border border-green-500/40 bg-green-500/5 text-green-500">
            ✓ Current Plan
          </div>
        ) : (
          <button
            onClick={onBook}
            className={`w-full py-3.5 text-xs font-display font-black tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer ${
              plan.isPopular
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'border border-white/30 hover:border-white text-white hover:bg-white/5'
            }`}
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────

interface PricingSectionProps {
  onBook: () => void
  /** Member view: the plan the member is on. Omit for guests. */
  currentPlanId?: string
}

export default function PricingSection({ onBook, currentPlanId }: PricingSectionProps) {
  return (
    <section className="bg-black text-white pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-red-600 inline-block" />
            <span className="text-red-500 text-xs font-mono font-bold tracking-[0.25em] uppercase">
              Membership
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black leading-[1.05] mb-5">
            Simple pricing.<br />Serious results.
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            No initiation fees. No hidden charges. No minimum commitment. Upgrade, downgrade, or
            cancel any time — your call.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onBook={onBook} isCurrent={plan.id === currentPlanId} />
          ))}
        </div>

        {/* Guarantee banner */}
        <div className="mt-8 border border-white/10 bg-[#0a0a0a] p-8 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left */}
          <div>
            <p className="text-red-500 text-[10px] font-mono font-black tracking-[0.25em] uppercase mb-3">
              Our Guarantee
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
              30 days or your money back.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Try Bruns Fitness for 30 days. If you don&apos;t feel the difference — in energy, in strength,
              in how you show up — we&apos;ll refund you in full. No forms. No runaround. That&apos;s
              our commitment to you.
            </p>
          </div>

          {/* Right — bullet list */}
          <ul className="flex flex-col gap-3.5">
            {[
              'No initiation or setup fees',
              'Cancel or pause anytime',
              'Full refund within 30 days',
              'Upgrade or downgrade instantly',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                <span className="text-red-500 font-black text-base shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-6 h-px bg-red-600 inline-block" />
            <span className="text-red-500 text-xs font-mono font-bold tracking-[0.25em] uppercase">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-8">Common questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: 'Can I freeze my membership?',
                a: 'Yes — you can freeze your account for up to 3 months per calendar year with no charge and no penalty.',
              },
              {
                q: 'Is there a joining fee?',
                a: "None. Your first charge is your first month. You're training the day you sign up.",
              },
              {
                q: 'What happens if I cancel?',
                a: 'Your access continues through the end of the billing period. No partial refunds, no drama.',
              },
              {
                q: 'Are group classes included?',
                a: 'PERFORM and BLACK memberships include unlimited group classes, bookable through the Bruns Fitness app up to 7 days in advance.',
              },
              {
                q: 'Can I bring a guest?',
                a: 'BLACK members receive 2 guest passes per month. Other tiers can purchase day passes at the front desk.',
              },
              {
                q: 'Do you offer corporate plans?',
                a: 'Yes — contact hello@brunsfitness.com for group rates and enterprise agreements.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="border border-white/8 bg-[#0a0a0a] p-6 hover:border-white/15 transition-colors duration-200">
                <p className="text-white text-sm font-bold mb-2">{q}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
