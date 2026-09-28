import Link from 'next/link'
import { SITE_STATS } from '@/data/siteStatsData'

interface HeroLink {
  id: string
  label: string
  href: string
}

interface RoleHeroProps {
  /** Three headline words — the middle one is red. */
  headline: [string, string, string]
  subtitle: React.ReactNode
  primary: HeroLink
  secondary: HeroLink
}

/** Signed-in hero shared by the member and trainer home pages. */
export default function RoleHero({ headline, subtitle, primary, secondary }: RoleHeroProps) {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex flex-col">

      {/* Background image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero.jpg"
          alt=""
          className="w-full h-full object-cover object-top opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-6 w-full pt-24 pb-12">
        <div className="max-w-xl">

          {/* Location tag */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-red-600" />
            <p className="text-red-500 text-[10px] font-mono font-bold tracking-[0.25em] uppercase">
              Lagos, Nigeria &nbsp;·&nbsp; Est. 2020
            </p>
          </div>

          {/* Headline */}
          <h1 className="leading-none font-black uppercase mb-8 tracking-tight">
            <span className="block text-white text-[clamp(4rem,10vw,8rem)]">{headline[0]}</span>
            <span className="block text-red-600 text-[clamp(4rem,10vw,8rem)]">{headline[1]}</span>
            <span className="block text-white text-[clamp(4rem,10vw,8rem)]">{headline[2]}</span>
          </h1>

          {/* Personalised subtitle */}
          <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-sm">{subtitle}</p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              id={primary.id}
              href={primary.href}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-display font-black tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 hover:scale-[1.02] active:scale-100"
            >
              {primary.label}
            </Link>
            <Link
              id={secondary.id}
              href={secondary.href}
              className="border border-white/40 hover:border-white text-white text-xs font-display font-black tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 hover:bg-white/5"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Stats strip — bottom right */}
      <div className="relative z-10 w-full flex justify-end">
        <div className="grid grid-cols-2 sm:grid-cols-4 w-full lg:w-auto border-t border-white/10 bg-black/60 backdrop-blur-sm">
          {SITE_STATS.map((stat) => (
            <div
              key={stat.label}
              className="px-6 lg:px-10 py-6 text-center border-l border-white/10 first:border-l-0 lg:first:border-l"
            >
              <div className="font-display text-2xl sm:text-3xl font-black text-red-600 tracking-tight leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-[10px] font-mono font-bold text-gray-500 tracking-[0.2em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
