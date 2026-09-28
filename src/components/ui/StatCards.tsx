export interface StatCard {
  label: string
  value: string
  note?: string
}

export default function StatCards({ stats }: { stats: StatCard[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
      {stats.map((stat) => (
        <div key={stat.label} className="border border-white/10 bg-[#0e0e0e] p-7">
          <p className="text-red-500 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-5">
            {stat.label}
          </p>
          <p className="font-display text-4xl font-black text-white leading-none">{stat.value}</p>
          {stat.note && <p className="text-gray-500 text-xs mt-3">{stat.note}</p>}
        </div>
      ))}
    </div>
  )
}
