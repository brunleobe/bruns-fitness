import TrainersSection from '@/components/trainers/TrainersSection'
import { getRole } from '@/lib/server/getRole'
import { getSessionRequests } from '@/lib/server/getSessionRequests'
import MemberTrainers from './MemberTrainers'

export default async function TrainersPage() {
  const role = await getRole()
  if (role === 'Member') return <MemberTrainers requestedIds={await getSessionRequests()} />
  return <TrainersSection />
}
