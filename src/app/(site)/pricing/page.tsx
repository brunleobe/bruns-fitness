import { redirect } from 'next/navigation'
import { getRole } from '@/lib/server/getRole'
import { MEMBER } from '@/data/memberData'
import PricingView from './PricingView'

export default async function PricingPage() {
  const role = await getRole()
  // Trainers don't buy plans.
  if (role === 'Trainer') redirect('/')
  return <PricingView currentPlanId={role === 'Member' ? MEMBER.planId : undefined} />
}
