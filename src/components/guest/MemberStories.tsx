export default function MemberStories() {
  const stories = [
    {
      id: 'story-priya',
      quote:
        '“I\'ve been a member of six gyms. Bruns Fitness is the first one where I actually showed up consistently — because the coaches made me feel like I owed it to myself, not to them.”',
      author: 'Priya S.',
      membership: 'Member since 2023',
    },
    {
      id: 'story-daniel',
      quote:
        '“Down 22 lbs, deadlifting 160 kg, sleeping better than I have in a decade. I came for the equipment. I stayed for the culture.”',
      author: 'Daniel R.',
      membership: 'Member since 2022',
    },
    {
      id: 'story-nneka',
      quote:
        '“The body comp scans alone changed how I think about progress. The number on the scale is the least interesting metric. Bruns Fitness taught me that.”',
      author: 'Nneka O.',
      membership: 'Member since 2024',
    },
  ]

  return (
    <section id="stories" className="bg-black text-white py-16 sm:py-24 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <span className="w-6 h-px bg-red-600 inline-block" />
          <span className="text-red-600 text-xs font-mono font-bold tracking-[0.25em] uppercase">
            MEMBER STORIES
          </span>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              id={story.id}
              className="bg-[#0e0e0e] border border-white/10 rounded-sm p-8 sm:p-10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group"
            >
              <blockquote className="text-gray-300 italic text-base sm:text-lg leading-relaxed mb-10 font-normal">
                {story.quote}
              </blockquote>

              <div className="pt-4 border-t border-white/5 space-y-1">
                <div className="text-white font-bold text-sm tracking-wide">
                  {story.author}
                </div>
                <div className="text-gray-500 text-xs tracking-wider font-mono">
                  {story.membership}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
