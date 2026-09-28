import Hero from '@/components/guest/Hero'
import ApexMethod from '@/components/guest/ApexMethod'
import Schedule from '@/components/guest/Schedule'
import MemberStories from '@/components/guest/MemberStories'
import CtaBanner from '@/components/guest/CtaBanner'
import MemberHero from '@/components/member/MemberHero'
import WeekAtAGlance from '@/components/member/WeekAtAGlance'
import UpcomingBookings from '@/components/member/UpcomingBookings'
import TrainerHero from '@/components/trainer/TrainerHero'
import TrainerToday from '@/components/trainer/TrainerToday'
import { getRole } from '@/lib/server/getRole'
import { getBookings } from '@/lib/server/getBookings'
import { resolveBookings } from '@/lib/bookings'

async function MemberHome() {
  const bookings = resolveBookings(await getBookings())
  return (
    <>
      <MemberHero bookings={bookings} />
      <WeekAtAGlance />
      <UpcomingBookings bookings={bookings} />
    </>
  )
}

function TrainerHome() {
  return (
    <>
      <TrainerHero />
      <TrainerToday />
    </>
  )
}

function GuestHome() {
  return (
    <>
      <Hero />
      <ApexMethod />
      <Schedule />
      <MemberStories />
      <CtaBanner />
    </>
  )
}

export default async function Home() {
  const role = await getRole()
  if (role === 'Member') return <MemberHome />
  if (role === 'Trainer') return <TrainerHome />
  return <GuestHome />
}
