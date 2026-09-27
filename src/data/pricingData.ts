// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface PricingPlan {
  id: string
  tag: string           // small label above name (e.g. "GET STARTED")
  name: string
  price: number
  tagline: string
  features: string[]
  isPopular: boolean    // shows the "MOST POPULAR" banner & red CTA
}

// ─────────────────────────────────────────────
// Plans
// ─────────────────────────────────────────────

export const PLANS: PricingPlan[] = [
  {
    id: 'plan-access',
    tag: 'Get Started',
    name: 'ACCESS',
    price: 29,
    tagline: 'Everything you need to show up and get after it.',
    features: [
      'Gym floor access 6AM-10PM',
      'Locker & towel service',
      '2 group classes per month',
      'Fitness onboarding session',
      'Apex member app',
    ],
    isPopular: false,
  },
  {
    id: 'plan-perform',
    tag: 'Most Popular',
    name: 'PERFORM',
    price: 69,
    tagline: 'For athletes who train with intent, not habit.',
    features: [
      '24/7 facility access',
      'Unlimited group classes',
      '1 personal training session/mo',
      'Monthly body composition scan',
      'Nutrition & recovery guide',
      'Priority class booking',
    ],
    isPopular: true,
  },
  {
    id: 'plan-black',
    tag: 'No Limits',
    name: 'BLACK',
    price: 129,
    tagline: 'The full Apex experience, without compromise.',
    features: [
      '24/7 VIP floor access',
      'Unlimited everything',
      '4 personal training sessions/mo',
      'Custom meal & macro planning',
      'Sauna, cold plunge & spa',
      'Dedicated concierge line',
      'Guest passes (2/mo)',
    ],
    isPopular: false,
  },
]
