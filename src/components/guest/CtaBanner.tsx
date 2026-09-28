export default function CtaBanner() {
  return (
    <section id="join" className="bg-black text-white py-24 sm:py-32 border-t border-white/5 relative z-10 overflow-hidden">
      {/* Subtle background ambient red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Main Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6">
          <span className="block text-white">Your future self</span>
          <span className="block text-red-600 mt-1">starts today.</span>
        </h2>

        {/* Subtitle description */}
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-10">
          No initiation fees. No long-term contracts. Cancel anytime. The only thing you risk is the next version of yourself.
        </p>

        {/* Action Button */}
        <div>
          <a
            id="cta-join-apex-btn"
            href="#join"
            className="inline-block bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-black tracking-[0.2em] uppercase px-10 py-5 transition-all duration-200 hover:scale-[1.02] active:scale-100 shadow-lg shadow-red-600/20"
          >
            JOIN APEX — FROM $29/MO
          </a>
        </div>
      </div>
    </section>
  )
}
