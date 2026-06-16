"use client";
import { useState, useMemo } from "react";
import { MATCHES } from "@/data/matches";
import { TEAMS } from "@/data/teams";
import { useLiveResults } from "@/hooks/useLiveResults";
import { toChicagoDate, groupByDate } from "@/lib/utils";

export default function ResultsView() {
  const [showAll, setShowAll] = useState(false);
  const { results, usingLive, lastUpdated } = useLiveResults();

  const finishedMatches = useMemo(() => {
    return MATCHES.filter(m => results[m.id]?.status === "finished");
  }, [results]);

  const liveMatches = useMemo(() => {
    return MATCHES.filter(m => results[m.id]?.status === "live");
  }, [results]);

  const grouped = groupByDate(showAll ? MATCHES : [...liveMatches, ...finishedMatches]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
        <h2 className="font-display text-3xl tracking-widest text-yellow-400">⚽ RESULTS</h2>
        <div className="flex items-center gap-3">
          {usingLive && lastUpdated && (
            <span className="text-[10px] text-emerald-400 tracking-widest uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot" /> Live · {lastUpdated.toLocaleTimeString("en-US",{timeZone:"America/Chicago",hour:"numeric",minute:"2-digit"})}
            </span>
          )}
          <button onClick={() => setShowAll(!showAll)}
            className="px-3 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase cursor-pointer"
            style={{ background: showAll ? "#FBBF24" : "rgba(255,255,255,0.05)", border: showAll ? "none" : "1px solid #1E293B", color: showAll ? "#000" : "#94A3B8" }}>
            {showAll ? "Played Only" : "Show All Matches"}
          </button>
        </div>
      </div>
      <p className="text-slate-500 text-sm mb-6">
        {finishedMatches.length} of {MATCHES.filter(m=>m.home!=="tbd").length} group stage matches played.
        {liveMatches.length > 0 && <span className="text-emerald-400 ml-2">● {liveMatches.length} live now</span>}
      </p>

      {Object.entries(grouped).map(([date, matches]) => (
        <section key={date} className="mb-8">
          <div className="flex items-center gap-3 mb-3 pb-2" style={{ borderBottom:"2px solid rgba(251,191,36,0.15)" }}>
            <div className="w-1 h-6 rounded-full bg-yellow-400" />
            <h3 className="text-slate-200 font-bold text-base">{date}</h3>
          </div>

          <div className="grid gap-2" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))" }}>
            {matches.map(m => {
              const homeT = TEAMS[m.home] ?? { emoji:"🏳️", short:"TBD", name:"TBD" };
              const awayT = TEAMS[m.away] ?? { emoji:"🏳️", short:"TBD", name:"TBD" };
              const result = results[m.id];
              const played = result?.status === "finished";
              const isLive = result?.status === "live";
              const homeWin = played && result.homeScore > result.awayScore;
              const awayWin = played && result.awayScore > result.homeScore;

              return (
                <div key={m.id} className="rounded-xl p-4"
                  style={{
                    background:"#0b1220",
                    border: isLive ? "1px solid rgba(74,222,128,0.5)" : played ? "1px solid rgba(74,222,128,0.2)" : "1px solid #1E293B"
                  }}>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-slate-600 tracking-widest uppercase">{m.group} · {m.stage}</span>
                    {isLive ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"
                        style={{ background:"rgba(74,222,128,0.15)", color:"#4ADE80", border:"1px solid rgba(74,222,128,0.4)" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot" /> LIVE
                      </span>
                    ) : played ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded"
                        style={{ background:"rgba(74,222,128,0.12)", color:"#4ADE80", border:"1px solid rgba(74,222,128,0.25)" }}>
                        FULL TIME
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded"
                        style={{ background:"rgba(100,116,139,0.12)", color:"#64748B", border:"1px solid rgba(100,116,139,0.25)" }}>
                        UPCOMING
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-2xl">{homeT.emoji}</span>
                      <span className="text-sm font-semibold" style={{ color: homeWin ? "#FBBF24" : "#E2E8F0" }}>
                        {homeT.name}
                      </span>
                    </div>

                    {(played || isLive) ? (
                      <div className="font-display text-2xl tracking-widest px-3" style={{ color: isLive ? "#4ADE80" : "#fff" }}>
                        {result.homeScore} – {result.awayScore}
                      </div>
                    ) : (
                      <div className="text-slate-700 text-xs px-3">vs</div>
                    )}

                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span className="text-sm font-semibold text-right" style={{ color: awayWin ? "#FBBF24" : "#E2E8F0" }}>
                        {awayT.name}
                      </span>
                      <span className="text-2xl">{awayT.emoji}</span>
                    </div>
                  </div>

                  {result?.notes && (
                    <p className="text-slate-600 text-[11px] mt-3 italic border-t border-slate-800 pt-2">
                      📝 {result.notes}
                    </p>
                  )}

                  {!played && !isLive && (
                    <p className="text-slate-700 text-[11px] mt-2">{toChicagoDate(m.kickoff)}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
