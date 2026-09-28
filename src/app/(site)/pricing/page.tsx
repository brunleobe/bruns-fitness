import { redirect } from 'next/navigation'
import { getRole } from '@/lib/server/getRole'
import PricingView from './PricingView'

export default async function PricingPage() {
  // Trainers don't buy plans.
  if ((await getRole()) === 'Trainer') redirect('/')
  return <PricingView />
}
