import ClassesSection from '@/components/classes/ClassesSection'
import { getRole } from '@/lib/server/getRole'
import { getBookings } from '@/lib/server/getBookings'
import GuestClasses from './GuestClasses'
import MemberClasses from './MemberClasses'

export default async function ClassesPage() {
  const role = await getRole()
  if (role === 'Member') return <MemberClasses bookings={await getBookings()} />
  if (role === 'Trainer') return <ClassesSection view="trainer" />
  return <GuestClasses />
}
