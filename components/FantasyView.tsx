"use client";

export default function FantasyView() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 animate-fade-in text-center">
      <div className="text-6xl mb-6">⚽🏆</div>
      <h2 className="font-display text-3xl tracking-widest text-yellow-400 mb-4">FIFA FANTASY</h2>
      <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-md mx-auto">
        Build your fantasy squad with real World Cup 2026 players, score points based on
        their real-world performances, and compete with friends on the official FIFA platform.
      </p>

      <a href="https://play.fifa.com/fantasy/en/team" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display text-xl tracking-widest transition-all hover:opacity-90"
        style={{ background:"linear-gradient(90deg,#FBBF24,#F59E0B)", color:"#000", textDecoration:"none" }}>
        🎮 OPEN FIFA FANTASY
      </a>

      <p className="text-slate-700 text-xs mt-6">
        play.fifa.com/fantasy — opens in a new tab on the official FIFA site
      </p>

      <div className="grid gap-4 mt-12" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))" }}>
        {[
          { icon:"👥", label:"Build Your Squad", desc:"Pick players across all 48 teams" },
          { icon:"📈", label:"Earn Points", desc:"Based on real match performances" },
          { icon:"🏅", label:"Compete", desc:"Join leagues with friends worldwide" },
        ].map(({ icon, label, desc }) => (
          <div key={label} className="rounded-xl p-4" style={{ background:"#0b1220", border:"1px solid #1E293B" }}>
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-slate-200 font-bold text-sm mb-1">{label}</div>
            <div className="text-slate-600 text-xs">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
