'use client'

import { useState } from 'react'

type Plan = {
  id: string
  name: string
  price: number
  tag?: string
  description: string
  features: string[]
}

const plans: Plan[] = [
  {
    id: 'access',
    name: 'ACCESS',
    price: 29,
    description: 'Everything you need to show up and get after it.',
    features: [
      'Gym floor access 6AM-10PM',
      'Locker & towel service',
      '2 group classes per month',
    ],
  },
  {
    id: 'perform',
    name: 'PERFORM',
    price: 69,
    tag: 'POPULAR',
    description: 'For athletes who train with intent, not habit.',
    features: [
      '24/7 facility access',
      'Unlimited group classes',
      '1 personal training session/mo',
    ],
  },
  {
    id: 'black',
    name: 'BLACK',
    price: 129,
    description: 'The full Apex experience, without compromise.',
    features: [
      '24/7 VIP floor access',
      'Unlimited everything',
      '4 personal training sessions/mo',
    ],
  },
]

type Step2Fields = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

type Step3Fields = {
  cardNumber: string
  expiry: string
  cvv: string
  nameOnCard: string
}

type Props = {
  open: boolean
  onClose: () => void
}

export default function PlanModal({ open, onClose }: Props) {
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState<string>('perform')
  const [step2, setStep2] = useState<Step2Fields>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })
  const [step3, setStep3] = useState<Step3Fields>({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [step2Attempted, setStep2Attempted] = useState(false)

  const step2Valid =
    step2.firstName.trim() !== '' &&
    step2.lastName.trim() !== '' &&
    step2.email.trim() !== '' &&
    step2.phone.trim() !== ''

  if (!open) return null

  const currentPlan = plans.find((p) => p.id === selectedPlan)!

  const handleClose = () => {
    setStep(1)
    setSelectedPlan('perform')
    setStep2({ firstName: '', lastName: '', email: '', phone: '' })
    setStep3({ cardNumber: '', expiry: '', cvv: '', nameOnCard: '' })
    setStep2Attempted(false)
    setSubmitted(false)
    onClose()
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      {/* Modal Panel */}
      <div className="relative w-full max-w-md bg-[#111] border border-white/10 text-white shadow-2xl overflow-hidden">


        {/* Step progress gauge — 3 segments */}
        <div className="flex w-full gap-1">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 h-0.5 bg-white/10 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-red-600 origin-left transition-transform duration-500 ease-out"
                style={{ transform: step >= s ? 'scaleX(1)' : 'scaleX(0)' }}
              />
            </div>
          ))}
        </div>


        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-6">
          <div>
            <p className="text-red-600 text-[10px] font-bold tracking-[0.25em] uppercase mb-2">
              STEP {step} OF 3
            </p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase leading-tight">
              {step === 1 && 'Choose your plan'}
              {step === 2 && 'Your details'}
              {step === 3 && !submitted && 'Payment'}
              {step === 3 && submitted && "You're in."}
            </h2>
          </div>
          <button
            id="modal-close-btn"
            onClick={handleClose}
            className="text-gray-500 hover:text-white text-xl transition-colors duration-200 leading-none pt-1"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Step 1: Plan selection */}
        {step === 1 && (
          <div className="px-8 pb-8 space-y-3">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id
              return (
                <button
                  key={plan.id}
                  id={`plan-${plan.id}-btn`}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full text-left p-5 border transition-all duration-200 ${isSelected
                    ? 'border-red-600 bg-white/5'
                    : 'border-white/10 hover:border-white/30 bg-transparent'
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-black text-sm sm:text-base uppercase tracking-wide">
                        {plan.name}
                      </span>
                      {plan.tag && (
                        <span className="bg-red-600 text-white text-[9px] font-black tracking-widest uppercase px-2 py-0.5">
                          {plan.tag}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className={`text-xl font-black ${isSelected ? 'text-red-500' : 'text-white'}`}>
                        ${plan.price}
                      </span>
                      <span className="text-gray-500 text-xs">/mo</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mb-3">{plan.description}</p>
                  <div className="grid grid-cols-1 gap-1">
                    {plan.features.map((f) => (
                      <span key={f} className="text-gray-500 text-[11px] before:content-['·'] before:mr-1.5">
                        {f}
                      </span>
                    ))}
                  </div>
                </button>
              )
            })}

            {/* Continue CTA */}
            <button
              id="modal-step1-continue-btn"
              onClick={() => setStep(2)}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-black tracking-[0.2em] uppercase py-4 mt-4 transition-all duration-200 hover:scale-[1.01] active:scale-100"
            >
              CONTINUE — ${currentPlan.price}/MO
            </button>
          </div>
        )}

        {/* Step 2: Personal Details */}
        {step === 2 && (
          <div className="px-8 pb-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">First Name</label>
                <input
                  id="detail-first-name"
                  type="text"
                  value={step2.firstName}
                  onChange={(e) => setStep2({ ...step2, firstName: e.target.value })}
                  className={`w-full bg-white/5 border text-white text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-gray-600 ${step2Attempted && !step2.firstName.trim()
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-white/10 focus:border-red-600'
                    }`}
                  placeholder="Jane"
                />
                {step2Attempted && !step2.firstName.trim() && (
                  <p className="text-red-500 text-[10px] font-bold mt-1">Required</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">Last Name</label>
                <input
                  id="detail-last-name"
                  type="text"
                  value={step2.lastName}
                  onChange={(e) => setStep2({ ...step2, lastName: e.target.value })}
                  className={`w-full bg-white/5 border text-white text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-gray-600 ${step2Attempted && !step2.lastName.trim()
                    ? 'border-red-500 focus:border-red-400'
                    : 'border-white/10 focus:border-red-600'
                    }`}
                  placeholder="Doe"
                />
                {step2Attempted && !step2.lastName.trim() && (
                  <p className="text-red-500 text-[10px] font-bold mt-1">Required</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">Email</label>
              <input
                id="detail-email"
                type="email"
                value={step2.email}
                onChange={(e) => setStep2({ ...step2, email: e.target.value })}
                className={`w-full bg-white/5 border text-white text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-gray-600 ${step2Attempted && !step2.email.trim()
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-white/10 focus:border-red-600'
                  }`}
                placeholder="jane@example.com"
              />
              {step2Attempted && !step2.email.trim() && (
                <p className="text-red-500 text-[10px] font-bold mt-1">Required</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">Phone</label>
              <input
                id="detail-phone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={step2.phone}
                onChange={(e) => setStep2({ ...step2, phone: e.target.value.replace(/\D/g, '') })}
                className={`w-full bg-white/5 border text-white text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-gray-600 ${step2Attempted && !step2.phone.trim()
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-white/10 focus:border-red-600'
                  }`}
                placeholder="2340000000000"
              />
              {step2Attempted && !step2.phone.trim() && (
                <p className="text-red-500 text-[10px] font-bold mt-1">Required</p>
              )}
            </div>

            {/* Error summary */}
            {step2Attempted && !step2Valid && (
              <p className="text-red-500 text-xs font-bold tracking-wide">
                Please fill in all fields to continue.
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                id="modal-step2-back-btn"
                onClick={() => setStep(1)}
                className="flex-1 border border-white/20 hover:border-white/40 text-gray-400 hover:text-white text-xs font-black tracking-[0.2em] uppercase py-4 transition-all duration-200"
              >
                BACK
              </button>
              <button
                id="modal-step2-continue-btn"
                onClick={() => {
                  setStep2Attempted(true)
                  if (step2Valid) setStep(3)
                }}
                className={`flex-[2] text-xs font-black tracking-[0.2em] uppercase py-4 transition-all duration-300 ${step2Valid
                  ? 'bg-red-600 hover:bg-red-700 text-white hover:scale-[1.01] active:scale-100 cursor-pointer'
                  : 'bg-red-950 text-gray-500 cursor-pointer'
                  }`}
              >
                CONTINUE
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && !submitted && (
          <div className="px-8 pb-8 space-y-4">
            {/* Plan summary pill */}
            <div className="flex items-center justify-between bg-white/5 border border-white/10 px-4 py-3">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{currentPlan.name} Plan</span>
              <span className="text-red-500 font-black text-sm">${currentPlan.price}/mo</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">Card Number</label>
              <input
                id="payment-card-number"
                type="text"
                value={step3.cardNumber}
                onChange={(e) => setStep3({ ...step3, cardNumber: e.target.value })}
                className="w-full bg-white/5 border border-white/10 focus:border-red-600 text-white text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-gray-600"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">Expiry</label>
                <input
                  id="payment-expiry"
                  type="text"
                  value={step3.expiry}
                  onChange={(e) => setStep3({ ...step3, expiry: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 focus:border-red-600 text-white text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-gray-600"
                  placeholder="MM / YY"
                  maxLength={7}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">CVV</label>
                <input
                  id="payment-cvv"
                  type="text"
                  value={step3.cvv}
                  onChange={(e) => setStep3({ ...step3, cvv: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 focus:border-red-600 text-white text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-gray-600"
                  placeholder="•••"
                  maxLength={4}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">Name on Card</label>
              <input
                id="payment-name-on-card"
                type="text"
                value={step3.nameOnCard}
                onChange={(e) => setStep3({ ...step3, nameOnCard: e.target.value })}
                className="w-full bg-white/5 border border-white/10 focus:border-red-600 text-white text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-gray-600"
                placeholder="Jane Doe"
              />
            </div>

            <p className="text-gray-600 text-[11px] leading-relaxed">
              No initiation fees. Cancel anytime. Billed monthly.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                id="modal-step3-back-btn"
                onClick={() => setStep(2)}
                className="flex-1 border border-white/20 hover:border-white/40 text-gray-400 hover:text-white text-xs font-black tracking-[0.2em] uppercase py-4 transition-all duration-200"
              >
                BACK
              </button>
              <button
                id="modal-step3-confirm-btn"
                onClick={handleSubmit}
                className="flex-[2] bg-red-600 hover:bg-red-700 text-white text-xs font-black tracking-[0.2em] uppercase py-4 transition-all duration-200 hover:scale-[1.01] active:scale-100"
              >
                CONFIRM — ${currentPlan.price}/MO
              </button>
            </div>
          </div>
        )}

        {/* Step 3 Confirmed: Success */}
        {step === 3 && submitted && (
          <div className="px-8 pb-12 text-center space-y-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-red-600/10 border border-red-600/30">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black uppercase">Welcome to Apex.</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Check your email for your membership confirmation and next steps. See you on the floor.
              </p>
            </div>
            <button
              id="modal-success-close-btn"
              onClick={handleClose}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-black tracking-[0.2em] uppercase py-4 transition-all duration-200"
            >
              LET'S GO
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
