"use client";
import { MATCHES } from "@/data/matches";
import { TEAMS } from "@/data/teams";
import { toChicagoDate } from "@/lib/utils";
import type { PredictionOutcome } from "@/types";

interface Props {
  nickname: string;
  predictions: Record<string, PredictionOutcome>;
}

export default function MyPicksView({ nickname, predictions }: Props) {
  const totalPicks    = Object.keys(predictions).length;
  const pickedMatches = MATCHES.filter(m => predictions[m.id]);
  const predictable   = MATCHES.filter(m => m.home !== "tbd").length;

  const cards = [
    { label:"Picks Made",      value:totalPicks,              icon:"📝", color:"#A78BFA" },
    { label:"Remaining",       value:predictable - totalPicks, icon:"🎯", color:"#60A5FA" },
    { label:"Total Points",    value:"—", note:"Awarded after June 11", icon:"⚡", color:"#FBBF24" },
    { label:"Correct Picks",   value:"—", note:"Results pending",       icon:"✅", color:"#10B981" },
    { label:"Incorrect Picks", value:"—", note:"Results pending",       icon:"❌", color:"#EF4444" },
    { label:"Accuracy",        value:"—", note:"Results pending",       icon:"📊", color:"#F97316" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">

      {/* Profile header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background:"linear-gradient(135deg,#FBBF24,#F59E0B)" }}>
          ⚽
        </div>
        <div>
          <h2 className="font-display text-3xl tracking-widest text-yellow-400">{nickname.toUpperCase()}</h2>
          <p className="text-slate-600 text-xs mt-0.5">Your prediction dashboard</p>
        </div>
      </div>

      {/* Info banner */}
      <div className="rounded-lg px-4 py-3 mb-6 flex items-start gap-3"
        style={{ background:"rgba(59,130,246,0.07)", border:"1px solid rgba(59,130,246,0.2)" }}>
        <span className="text-xl mt-0.5">ℹ️</span>
        <p className="text-blue-300 text-sm leading-relaxed">
          Tournament starts <strong>June 11, 2026</strong>. Points and accuracy update automatically
          from real match results only. Each correct prediction earns <strong>+10 points</strong>.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-3 mb-10" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))" }}>
        {cards.map(({ label, value, icon, color, note }) => (
          <div key={label} className="rounded-xl p-4 text-center"
            style={{ background:"#0b1220", border:"1px solid #1E293B" }}>
            <div className="text-2xl mb-2">{icon}</div>
            <div className="font-display text-3xl tracking-wider" style={{ color }}>{value}</div>
            <div className="text-[10px] text-slate-600 tracking-widest uppercase mt-1 leading-tight">{label}</div>
            {note && <div className="text-[9px] text-slate-700 mt-1 italic">{note}</div>}
          </div>
        ))}
      </div>

      {/* Pick list */}
      <h3 className="text-slate-200 font-bold text-base tracking-wider mb-4">
        Your Predictions ({pickedMatches.length} of {predictable})
      </h3>

      {pickedMatches.length === 0 ? (
        <div className="rounded-xl text-center py-16 px-8"
          style={{ background:"#0b1220", border:"1px solid #1E293B" }}>
          <div className="text-5xl mb-4">🎯</div>
          <p className="text-slate-500 text-base">No predictions yet.</p>
          <p className="text-slate-600 text-sm mt-1">Head to Predictions to get started!</p>
        </div>
      ) : (
        <div className="grid gap-2" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))" }}>
          {pickedMatches.map(m => {
            const p = predictions[m.id];
            const homeT = TEAMS[m.home];
            const awayT = TEAMS[m.away];
            const label = { home_win:`${homeT.short} Win`, draw:"Draw", away_win:`${awayT.short} Win` }[p];
            return (
              <div key={m.id} className="flex items-center justify-between gap-3 rounded-lg px-4 py-3"
                style={{ background:"#0b1220", border:"1px solid #1a2a1a" }}>
                <div>
                  <div className="text-sm font-semibold text-slate-200">
                    {homeT.emoji} {homeT.short} vs {awayT.short} {awayT.emoji}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {toChicagoDate(m.kickoff).split(",").slice(0,2).join(",")}
                    <span className="ml-2 text-[10px] text-slate-700">· Pending result</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-md flex-shrink-0"
                  style={{ background:"rgba(251,191,36,0.1)", border:"1px solid rgba(251,191,36,0.25)", color:"#FBBF24" }}>
                  ✓ {label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
