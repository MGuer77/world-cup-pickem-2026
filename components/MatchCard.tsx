"use client";
import { TEAMS } from "@/data/teams";
import { EXPERT_CONSENSUS } from "@/data/expertConsensus";
import { toChicagoTimeOnly } from "@/lib/utils";
import type { Match, PredictionOutcome } from "@/types";

const TBD_TEAM = { id:"tbd", name:"TBD", short:"TBD", emoji:"🏳️", color:"#374151" };

// Official broadcast info sourced from FOX Sports (foxsports.com, Jan 29 2026)
// FOX One streams ALL 104 games. Telemundo/Peacock carry ALL games in Spanish.
// Tubi free simulcast: ONLY m001 (MEX-RSA) and m004 (USA-PAR).
const TV_INFO: Record<string, {
  label: string; url: string; color: string; bg: string; border: string; free?: boolean;
}> = {
  FOX:       { label:"FOX",           url:"https://www.foxsports.com/soccer/fifa-world-cup",                   color:"#fff",    bg:"#1a1a2e", border:"rgba(255,255,255,0.2)" },
  FS1:       { label:"FS1",           url:"https://www.foxsports.com/soccer/fifa-world-cup",                   color:"#fff",    bg:"#0a2342", border:"rgba(255,255,255,0.15)" },
  "FOX One": { label:"▶ FOX One",     url:"https://fox.com/soccer/fifa-world-cup",                             color:"#FBBF24", bg:"#12110a", border:"rgba(251,191,36,0.4)" },
  Tubi:      { label:"🆓 Tubi FREE",  url:"https://tubitv.com/hubs/fifa-world-cup-fox-hub",                   color:"#000",    bg:"#FA4C00", border:"rgba(0,0,0,0.1)",  free:true },
  Telemundo: { label:"🇪🇸 Telemundo", url:"https://www.telemundo.com/deportes/futbol/copa-mundial",           color:"#fff",    bg:"#4B0082", border:"rgba(255,255,255,0.1)" },
  Peacock:   { label:"🦚 Peacock ES", url:"https://www.peacocktv.com",                                         color:"#000",    bg:"#00A36C", border:"rgba(0,0,0,0.1)" },
};

const STAGE_STYLES: Record<string, { bg:string; text:string; border:string }> = {
  "Group Stage":   { bg:"#0f2a4a", text:"#60A5FA", border:"#1D4ED8" },
  "Round of 32":  { bg:"#0a2a1f", text:"#34D399", border:"#059669" },
  "Round of 16":  { bg:"#0f2a1a", text:"#4ADE80", border:"#16A34A" },
  "Quarter-Final":{ bg:"#2a0f0f", text:"#F87171", border:"#DC2626" },
  "Semi-Final":   { bg:"#1a0f2a", text:"#C084FC", border:"#7C3AED" },
  "3rd Place":    { bg:"#1a1a0a", text:"#FCD34D", border:"#B45309" },
  "Final":        { bg:"#2a1f00", text:"#FBBF24", border:"#FBBF24" },
};

interface Props {
  match: Match;
  compact?: boolean;
  prediction?: PredictionOutcome;
  onPredict?: (matchId: string, outcome: PredictionOutcome) => void;
  showExpert?: boolean;
}

function WatchBtn({ channel }: { channel: string }) {
  const info = TV_INFO[channel];
  if (!info) return null;
  return (
    <a href={info.url} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold transition-opacity hover:opacity-80"
      style={{ background:info.bg, color:info.color, border:`1px solid ${info.border}`, textDecoration:"none", whiteSpace:"nowrap" }}>
      {info.label}
    </a>
  );
}

export default function MatchCard({ match, compact, prediction, onPredict, showExpert }: Props) {
  const homeT  = TEAMS[match.home] ?? TBD_TEAM;
  const awayT  = TEAMS[match.away] ?? TBD_TEAM;
  const expert = EXPERT_CONSENSUS[match.id];
  const style  = STAGE_STYLES[match.stage] ?? STAGE_STYLES["Group Stage"];
  const isTbd  = match.home === "tbd" || match.away === "tbd";
  const tvChannels = match.tv ?? [];
  const hasTubi    = tvChannels.includes("Tubi");

  // Build the ordered button list for this match:
  // 1. Primary linear (FOX or FS1)
  // 2. Tubi (only if assigned)
  // 3. FOX One streaming (always for FOX/FS1 games)
  // 4. Spanish: Telemundo + Peacock (always)
  const watchButtons: string[] = [
    ...tvChannels.filter(c => c !== "Tubi"),      // FOX or FS1 first
    ...(hasTubi ? ["Tubi"] : []),                  // Tubi only where assigned
    "FOX One",                                     // always available
    "Telemundo",                                   // always — Spanish
    "Peacock",                                     // always — Spanish streaming
  ];

  const PICKS: { key: PredictionOutcome; label: string }[] = [
    { key:"home_win", label:`${homeT.short} Win` },
    { key:"draw",     label:"Draw" },
    { key:"away_win", label:`${awayT.short} Win` },
  ];

  return (
    <div className="match-card rounded-xl overflow-hidden"
      style={{ background:"linear-gradient(135deg,#0b1220 0%,#0f1724 100%)", border:`1px solid ${style.border}33` }}>

      {/* Stage banner */}
      <div className="flex items-center justify-between px-4 py-2"
        style={{ background:style.bg, borderBottom:`1px solid ${style.border}22` }}>
        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color:style.text }}>
          {match.stage}
        </span>
        <span className="text-[10px] text-slate-600 tracking-wider">{match.group}</span>
      </div>

      <div className="px-4 py-4">

        {/* Teams */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 text-right">
            <div className={compact ? "text-4xl" : "text-5xl"}>{homeT.emoji}</div>
            <div className="text-slate-200 text-sm font-bold mt-1 leading-tight">{homeT.name}</div>
          </div>
          <div className="font-display text-2xl text-slate-700 tracking-widest w-10 text-center">VS</div>
          <div className="flex-1 text-left">
            <div className={compact ? "text-4xl" : "text-5xl"}>{awayT.emoji}</div>
            <div className="text-slate-200 text-sm font-bold mt-1 leading-tight">{awayT.name}</div>
          </div>
        </div>

        {/* Match info */}
        <div className="text-[11px] text-slate-600 space-y-0.5 pb-3 border-b border-slate-800">
          <div>🕐 {toChicagoTimeOnly(match.kickoff)}</div>
          <div>🏟 {match.stadium} · {match.city}</div>
        </div>

        {/* ── Watch Live buttons ── */}
        {watchButtons.length > 0 && (
          <div className="mt-3">
            <p className="text-[9px] text-slate-700 tracking-widest uppercase mb-1.5">📺 Watch Live (US)</p>
            <div className="flex flex-wrap gap-1.5">
              {watchButtons.map(ch => <WatchBtn key={ch} channel={ch} />)}
            </div>
          </div>
        )}

        {/* Expert consensus */}
        {showExpert && expert && !isTbd && (
          <div className="mt-3 rounded-lg p-3" style={{ background:"rgba(255,255,255,0.03)" }}>
            <p className="text-[10px] text-slate-600 tracking-widest uppercase mb-2">
              Expert Consensus · {expert.sources} sources · {expert.confidence}% confidence
            </p>
            {([
              { label:homeT.short, pct:expert.home, color:homeT.color||"#3B82F6" },
              { label:"Draw",      pct:expert.draw, color:"#4B5563" },
              { label:awayT.short, pct:expert.away, color:awayT.color||"#EF4444" },
            ] as { label:string; pct:number; color:string }[]).map(({ label, pct, color }) => (
              <div key={label} className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] text-slate-500 w-8 text-right">{label}</span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background:"#1E293B" }}>
                  <div className="h-full rounded-full progress-bar"
                    style={{ width:`${pct}%`, background:color, "--bar-width":`${pct}%` } as React.CSSProperties} />
                </div>
                <span className="text-[10px] font-bold text-yellow-400 w-8">{pct}%</span>
              </div>
            ))}
          </div>
        )}

        {/* TBD notice */}
        {isTbd && (
          <div className="mt-3 text-center text-[11px] text-slate-700 italic py-1">
            Matchup confirmed after group stage
          </div>
        )}

        {/* Prediction buttons */}
        {onPredict && !isTbd && (
          <div className="flex gap-1.5 mt-3">
            {PICKS.map(({ key, label }) => {
              const active = prediction === key;
              return (
                <button key={key} onClick={() => onPredict(match.id, key)}
                  className="flex-1 py-2 px-1 rounded-md text-[10px] font-bold tracking-wider uppercase cursor-pointer transition-all"
                  style={{
                    background: active ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.04)",
                    border: active ? "2px solid #FBBF24" : "1px solid #1E293B",
                    color: active ? "#FBBF24" : "#64748B",
                  }}>
                  {active ? "✓ " : ""}{label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
