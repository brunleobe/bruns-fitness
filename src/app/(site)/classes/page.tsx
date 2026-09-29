import ClassesSection from '@/components/classes/ClassesSection'
import { getRole } from '@/lib/server/getRole'
import { getBookings } from '@/lib/server/getBookings'
import { pruneBookings } from '@/lib/bookings'
import GuestClasses from './GuestClasses'
import MemberClasses from './MemberClasses'

export default async function ClassesPage() {
  const role = await getRole()
  if (role === 'Member') {
    const now = Date.now()
    return <MemberClasses bookings={pruneBookings(await getBookings(), now)} now={now} />
  }
  if (role === 'Trainer') return <ClassesSection view="trainer" />
  return <GuestClasses />
}
