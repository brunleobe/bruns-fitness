import Link from 'next/link'

export default function Schedule() {
  const classes = [
    {
      id: 'class-hiit-combat',
      level: 'ADVANCED',
      spots: '4 spots',
      spotsHighlight: true,
      image: '/classes/hiit.jpg',
      title: 'HIIT COMBAT',
      description: 'Hit harder. Move faster. Leave nothing behind.',
      time: '06:00 — 07:00',
      schedule: 'MON · WED · FRI · Marcus Webb',
    },
    {
      id: 'class-strength-lab',
      level: 'ALL LEVELS',
      spots: '8 spots',
      spotsHighlight: false,
      image: '/classes/strength.jpg',
      title: 'STRENGTH LAB',
      description: 'Progressive overload. Measurable gains. Real results.',
      time: '08:00 — 09:30',
      schedule: 'TUE · THU · Sofia Reyes',
    },
    {
      id: 'class-yoga-flow',
      level: 'BEGINNER',
      spots: '12 spots',
      spotsHighlight: false,
      image: '/classes/yoga.jpg',
      title: 'YOGA FLOW',
      description: 'Restore. Breathe. Come back stronger.',
      time: '12:00 — 13:00',
      schedule: 'DAILY · Aisha Nkosi',
    },
  ]

  return (
    <section id="schedule" className="bg-black text-white py-16 sm:py-24 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-red-600 inline-block" />
              <span className="text-red-600 text-xs font-mono font-bold tracking-[0.25em] uppercase">
                THIS WEEK
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none">
              On the schedule
            </h2>
          </div>

          <div>
            <Link
              id="full-schedule-btn"
              href="/classes"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white text-xs font-mono font-bold tracking-[0.2em] uppercase px-6 py-3.5 transition-all duration-200 hover:bg-white/5"
            >
              <span>FULL SCHEDULE</span>
              <span className="text-sm">→</span>
            </Link>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {classes.map((cls) => (
            <div
              key={cls.id}
              id={cls.id}
              className="bg-[#0e0e0e] border border-white/10 rounded-sm overflow-hidden flex flex-col group hover:border-white/25 transition-all duration-300"
            >
              {/* Image with badges */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Gradient overlay to dark card body */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                  <span className="border border-red-600/60 text-red-500 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-black/70 backdrop-blur-xs">
                    {cls.level}
                  </span>
                  <span
                    className={`font-mono text-[11px] font-bold tracking-wide px-2.5 py-1 bg-black/70 backdrop-blur-xs rounded-xs ${
                      cls.spotsHighlight ? 'text-red-400' : 'text-gray-400'
                    }`}
                  >
                    {cls.spots}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-6">
                <div>
                  <h3 className="text-white font-black text-xl tracking-tight uppercase mb-2 group-hover:text-red-500 transition-colors">
                    {cls.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    {cls.description}
                  </p>
                </div>

                {/* Time & Trainer Info + Join Button */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <div className="text-white font-bold text-xs sm:text-sm tracking-wide">
                      {cls.time}
                    </div>
                    <div className="text-gray-500 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                      {cls.schedule}
                    </div>
                  </div>

                  <a
                    id={`join-${cls.id}`}
                    href="#join"
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-display font-black tracking-widest uppercase px-5 py-2.5 transition-all duration-200 hover:scale-[1.03] active:scale-100"
                  >
                    JOIN
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Classes Button */}
        <div className="mt-12 sm:mt-16">
          <Link
            id="view-all-classes-btn"
            href="/classes"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white text-xs font-display font-black tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 hover:bg-white/5"
          >
            <span>VIEW ALL CLASSES</span>
            <span className="text-sm">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
