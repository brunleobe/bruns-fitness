import RoleHero from '@/components/ui/RoleHero'
import { TODAY_SESSIONS } from '@/data/trainerPortalData'

export default function TrainerHero() {
  const count = TODAY_SESSIONS.length

  return (
    <RoleHero
      headline={['MAKE', 'TODAY', 'COUNT.']}
      subtitle={
        <>
          {count} {count === 1 ? 'session' : 'sessions'} on the books today. Your clients showed up
          because of you. Make it worth their while.
        </>
      }
      primary={{ id: 'trainer-hero-schedule-btn', label: "Today's Schedule", href: '#todays-sessions' }}
      secondary={{ id: 'trainer-hero-classes-btn', label: 'View All Classes', href: '/classes' }}
    />
  )
}
