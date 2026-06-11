"use client";

const QUICK_LINKS = [
  {
    label: "McDonald's Happy Meal WC Promotion",
    url: "https://www.happymeal.com/digital/fsq30294/",
    icon: "🍔",
    desc: "McDonald's official World Cup Happy Meal digital experience",
    color: "#FFC72C",
    bg: "rgba(255,199,44,0.08)",
    border: "rgba(255,199,44,0.25)",
  },
  {
    label: "Panini FIFA WC 2026 Collection",
    url: "https://paninicollection.fifa.com/launch",
    icon: "🃏",
    desc: "Official FIFA World Cup 2026 Panini sticker & card collection",
    color: "#E53E3E",
    bg: "rgba(229,62,62,0.08)",
    border: "rgba(229,62,62,0.25)",
  },
  {
    label: "McDonald's & FIFA World Cup 2026",
    url: "https://corporate.mcdonalds.com/corpmcd/our-stories/article/US-FIFA-world-cup-2026.html",
    icon: "🌐",
    desc: "McDonald's corporate story — official FIFA World Cup 2026 partner",
    color: "#FBBF24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.25)",
  },
];

const STREAMING_GUIDE = [
  {
    name: "FOX",
    icon: "📺",
    color: "#fff",
    bg: "#1a1a2e",
    border: "rgba(255,255,255,0.2)",
    url: "https://www.foxsports.com/soccer/fifa-world-cup",
    desc: "70 matches including ALL knockouts, semis, final & every USMNT group game. Free with cable/satellite.",
    matchCount: "70 matches",
  },
  {
    name: "FS1",
    icon: "📺",
    color: "#fff",
    bg: "#0a2342",
    border: "rgba(255,255,255,0.15)",
    url: "https://www.foxsports.com/soccer/fifa-world-cup",
    desc: "34 matches — primarily group stage games. Available with cable/satellite or live TV streaming services.",
    matchCount: "34 matches",
  },
  {
    name: "FOX One ▶",
    icon: "💻",
    color: "#FBBF24",
    bg: "#12110a",
    border: "rgba(251,191,36,0.4)",
    url: "https://fox.com/soccer/fifa-world-cup",
    desc: "Stream ALL 104 matches live and on-demand in 4K. $19.99/month or $199.99/year. Also on Prime Video.",
    matchCount: "ALL 104 matches",
  },
  {
    name: "🆓 Tubi FREE",
    icon: "🆓",
    color: "#000",
    bg: "#FA4C00",
    border: "rgba(0,0,0,0.15)",
    url: "https://tubitv.com/hubs/fifa-world-cup-fox-hub",
    desc: "Free simulcast of 2 matches only: Mexico vs South Africa (Jun 11) and USA vs Paraguay (Jun 12). No sign-up needed.",
    matchCount: "2 matches FREE",
  },
  {
    name: "🇪🇸 Telemundo",
    icon: "📡",
    color: "#fff",
    bg: "#4B0082",
    border: "rgba(255,255,255,0.1)",
    url: "https://www.telemundo.com/deportes/futbol/copa-mundial",
    desc: "Spanish-language broadcast of 92 matches on Telemundo. Universo carries 12 matches. Free with cable.",
    matchCount: "92 matches (ES)",
  },
  {
    name: "🦚 Peacock ES",
    icon: "📱",
    color: "#000",
    bg: "#00A36C",
    border: "rgba(0,0,0,0.1)",
    url: "https://www.peacocktv.com",
    desc: "Stream ALL 104 matches live in Spanish on Peacock. Subscription required. Perfect for cord-cutters.",
    matchCount: "ALL 104 (ES)",
  },
];

export default function GamesView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">

      {/* ── Streaming Guide ── */}
      <h2 className="font-display text-3xl tracking-widest text-yellow-400 mb-2">📺 WHERE TO WATCH</h2>
      <p className="text-slate-500 text-sm mb-6">
        Complete US streaming and broadcast guide for all 104 matches.
      </p>

      <div className="grid gap-3 mb-12" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))" }}>
        {STREAMING_GUIDE.map(s => (
          <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
            className="flex gap-4 items-start rounded-xl p-4 group match-card"
            style={{ background:s.bg, border:`1px solid ${s.border}`, textDecoration:"none" }}>
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-black"
                style={{ background:"rgba(255,255,255,0.1)", color:s.color }}>
                {s.icon}
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm mb-0.5 group-hover:underline" style={{ color:s.color }}>
                {s.name}
              </div>
              <div className="text-[11px] font-bold tracking-wider uppercase mb-1.5"
                style={{ color:s.color, opacity:0.7 }}>
                {s.matchCount}
              </div>
              <div className="text-slate-500 text-xs leading-relaxed">{s.desc}</div>
            </div>
          </a>
        ))}
      </div>

      {/* ── Quick Links ── */}
      <h2 className="font-display text-3xl tracking-widest text-yellow-400 mb-2">🔗 QUICK LINKS</h2>
      <p className="text-slate-500 text-sm mb-6">Official partner promotions and collectibles.</p>

      <div className="grid gap-4" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))" }}>
        {QUICK_LINKS.map(({ label, url, icon, desc, color, bg, border }) => (
          <a key={url} href={url} target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-xl p-4 group match-card"
            style={{ background:bg, border:`1px solid ${border}`, textDecoration:"none" }}>
            <span className="text-3xl flex-shrink-0 mt-0.5">{icon}</span>
            <div>
              <div className="font-bold text-sm leading-tight group-hover:underline" style={{ color }}>
                {label}
              </div>
              <div className="text-slate-600 text-xs mt-1 leading-relaxed">{desc}</div>
              <div className="text-xs mt-2 truncate" style={{ color, opacity:0.6 }}>
                {url.replace("https://","").split("/")[0]}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
