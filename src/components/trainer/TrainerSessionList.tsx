import { TODAY_SESSIONS } from '@/data/trainerPortalData'

/** The demo trainer's sessions for today. */
export default function TrainerSessionList() {
  return (
    <ul className="flex flex-col gap-4">
      {TODAY_SESSIONS.map((session) => (
        <li
          key={session.id}
          className="flex items-center gap-6 sm:gap-12 border border-white/10 bg-[#0e0e0e] px-6 py-6 hover:border-white/20 transition-colors duration-200"
        >
          <span className="font-display text-red-500 text-2xl font-black tabular-nums w-16 shrink-0">
            {session.time}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-white text-base font-black tracking-tight">{session.title}</p>
            <p className="text-gray-500 text-xs font-mono tracking-wider mt-1">
              {session.kind} &nbsp;·&nbsp; {session.durationMin} min
            </p>
          </div>
          <span className="shrink-0 border border-white/10 px-3 py-1.5 text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-gray-400">
            {session.format}
          </span>
        </li>
      ))}
    </ul>
  )
}
