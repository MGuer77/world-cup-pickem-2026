"use client";
import { useCountdown } from "@/hooks/useCountdown";
import { getNextMatch, toChicagoNow, toChicagoTime } from "@/lib/utils";
import { MATCHES } from "@/data/matches";
import { TEAMS } from "@/data/teams";
import MEXICO_IMG from "@/data/mexicoImage";
import type { ViewKey } from "@/types";

const NAV_ITEMS: { key: ViewKey; label: string; icon: string }[] = [
  { key:"schedule",    label:"Schedule",      icon:"📅" },
  { key:"predictions", label:"Predictions",   icon:"🎯" },
  { key:"groups",      label:"Groups",        icon:"📋" },
  { key:"results",     label:"Results",       icon:"⚽" },
  { key:"my-picks",    label:"My Picks",      icon:"👤" },
  { key:"statistics",  label:"Stats",         icon:"📊" },
  { key:"games",       label:"Games & Links", icon:"🎮" },
  { key:"fantasy",     label:"Fantasy Team",  icon:"🏅" },
];

interface Props {
  nickname: string;
  view: ViewKey;
  setView: (v: ViewKey) => void;
}

function CountUnit({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center min-w-[52px]">
      <div className="font-display text-4xl leading-none text-yellow-400 tracking-wider">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[10px] text-slate-600 tracking-widest uppercase mt-1">{label}</div>
    </div>
  );
}

export default function Hero({ nickname, view, setView }: Props) {
  const next  = getNextMatch(MATCHES);
  const { d, h, m, s } = useCountdown(next.kickoff);
  const homeT = TEAMS[next.home] ?? { emoji:"⚽", short:"TBD", name:"TBD" };
  const awayT = TEAMS[next.away] ?? { emoji:"⚽", short:"TBD", name:"TBD" };

  return (
    <header style={{
      background:"linear-gradient(180deg,#040810 0%,#0a1628 55%,#0d1f3c 100%)",
      borderBottom:"1px solid #0f1f3a",
    }}>
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* ── Mexico Champions Card (base64 embedded — works on Vercel) ── */}
        <div className="flex justify-center mb-6">
          <div style={{
            borderRadius: 16,
            overflow: "hidden",
            maxWidth: 480,
            width: "100%",
            boxShadow: "0 0 40px rgba(0,168,71,0.35), 0 0 80px rgba(206,0,0,0.15)",
            border: "2px solid rgba(0,168,71,0.4)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MEXICO_IMG}
              alt="Mexico FIFA World Cup 2026 Champions — FIFA Museum card with Saint Tank"
              style={{ width:"100%", height:"auto", display:"block" }}
            />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-4xl">🏆</span>
            <h1 className="font-display text-3xl sm:text-5xl tracking-[0.2em] text-yellow-400">
              WORLD CUP PICK&#39;EM 2026
            </h1>
            <span className="text-4xl">🏆</span>
          </div>
          <p className="text-slate-600 text-xs tracking-[0.2em] uppercase mt-1">
            All times Chicago CT · {toChicagoNow()}
          </p>
        </div>

        {/* Countdown to next match */}
        <div className="rounded-xl p-5 mb-8 text-center"
          style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(251,191,36,0.12)" }}>
          <p className="text-slate-600 text-[11px] tracking-[0.25em] uppercase mb-4">Next Match</p>
          <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
            <span className="text-5xl">{homeT.emoji}</span>
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl tracking-[0.15em] text-white">
                {homeT.short} <span className="text-slate-700">VS</span> {awayT.short}
              </div>
              <div className="text-slate-500 text-xs mt-1">{homeT.name} · {awayT.name}</div>
            </div>
            <span className="text-5xl">{awayT.emoji}</span>
          </div>
          <p className="text-slate-400 text-xs mb-5">
            {toChicagoTime(next.kickoff)} · {next.stadium}, {next.city}
          </p>
          <div className="flex gap-5 justify-center items-center">
            <CountUnit label="Days"  value={d} />
            <span className="text-yellow-500 text-3xl font-black pb-4">:</span>
            <CountUnit label="Hours" value={h} />
            <span className="text-yellow-500 text-3xl font-black pb-4">:</span>
            <CountUnit label="Mins"  value={m} />
            <span className="text-yellow-500 text-3xl font-black pb-4">:</span>
            <CountUnit label="Secs"  value={s} />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-wrap gap-2 justify-center">
          {NAV_ITEMS.map(({ key, label, icon }) => {
            const active  = view === key;
            const display = key === "my-picks" ? nickname : label;
            return (
              <button key={key} onClick={() => setView(key)}
                className="px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
                style={{
                  background: active ? "linear-gradient(90deg,#FBBF24,#F59E0B)" : "rgba(255,255,255,0.05)",
                  border: active ? "none" : "1px solid rgba(255,255,255,0.08)",
                  color: active ? "#000" : "#94A3B8",
                }}>
                {icon} {display}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
