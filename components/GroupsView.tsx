"use client";
import { useState, useMemo } from "react";
import { GROUPS } from "@/data/groups";
import { TEAMS } from "@/data/teams";
import { MATCHES } from "@/data/matches";
import { useLiveResults } from "@/hooks/useLiveResults";
import type { GroupTeamStanding } from "@/data/groups";
import type { MatchResult } from "@/data/results";

function computeStandings(teamIds: string[], results: Record<string, MatchResult>): GroupTeamStanding[] {
  const table: Record<string, GroupTeamStanding> = {};
  teamIds.forEach(id => {
    table[id] = { teamId:id, played:0, won:0, drawn:0, lost:0, goalsFor:0, goalsAgainst:0, points:0 };
  });

  MATCHES.forEach(m => {
    if (!teamIds.includes(m.home) || !teamIds.includes(m.away)) return;
    const res = results[m.id];
    if (!res || res.status !== "finished") return;

    const h = table[m.home], a = table[m.away];
    h.played++; a.played++;
    h.goalsFor += res.homeScore; h.goalsAgainst += res.awayScore;
    a.goalsFor += res.awayScore; a.goalsAgainst += res.homeScore;

    if (res.homeScore > res.awayScore) { h.won++; h.points += 3; a.lost++; }
    else if (res.homeScore < res.awayScore) { a.won++; a.points += 3; h.lost++; }
    else { h.drawn++; a.drawn++; h.points += 1; a.points += 1; }
  });

  return Object.values(table).sort((x, y) => {
    if (y.points !== x.points) return y.points - x.points;
    const xgd = x.goalsFor - x.goalsAgainst, ygd = y.goalsFor - y.goalsAgainst;
    if (ygd !== xgd) return ygd - xgd;
    return y.goalsFor - x.goalsFor;
  });
}

export default function GroupsView() {
  const [open, setOpen] = useState<string | null>("Group A");
  const { results, usingLive, lastUpdated } = useLiveResults();

  const standingsByGroup = useMemo(() => {
    const map: Record<string, GroupTeamStanding[]> = {};
    GROUPS.forEach(g => { map[g.name] = computeStandings(g.teamIds, results); });
    return map;
  }, [results]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
        <h2 className="font-display text-3xl tracking-widest text-yellow-400">📋 GROUP STANDINGS</h2>
        {usingLive && lastUpdated && (
          <span className="text-[10px] text-emerald-400 tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot" /> Live · {lastUpdated.toLocaleTimeString("en-US",{timeZone:"America/Chicago",hour:"numeric",minute:"2-digit"})}
          </span>
        )}
      </div>
      <p className="text-slate-500 text-sm mb-6">
        Top 2 from each group + 8 best 3rd-place teams advance to the Round of 32.
      </p>


      <div className="grid gap-3" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))" }}>
        {GROUPS.map(g => {
          const standings = standingsByGroup[g.name];
          const isOpen = open === g.name;
          return (
            <div key={g.name} className="rounded-xl overflow-hidden"
              style={{ background:"#0b1220", border:"1px solid #1E293B" }}>
              <button onClick={() => setOpen(isOpen ? null : g.name)}
                className="w-full flex items-center justify-between px-4 py-3 cursor-pointer"
                style={{ background:"rgba(251,191,36,0.06)" }}>
                <span className="font-display text-lg tracking-widest text-yellow-400">{g.name}</span>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {g.teamIds.map(id => (
                      <span key={id} className="text-lg" style={{ filter:"drop-shadow(0 0 2px rgba(0,0,0,0.5))" }}>
                        {TEAMS[id]?.emoji}
                      </span>
                    ))}
                  </div>
                  <span className="text-slate-600 text-sm">{isOpen ? "▲" : "▼"}</span>
                </div>
              </button>

              {isOpen && (
                <div className="px-2 pb-2">
                  <div className="grid px-3 py-2 text-[9px] font-bold tracking-widest uppercase text-slate-600"
                    style={{ gridTemplateColumns:"24px 1fr 28px 28px 28px 28px 36px 32px" }}>
                    <span>#</span><span>Team</span><span>P</span><span>W</span><span>D</span><span>L</span><span>GD</span><span>Pts</span>
                  </div>
                  {standings.map((s, i) => {
                    const team = TEAMS[s.teamId];
                    const gd = s.goalsFor - s.goalsAgainst;
                    const qualifies = i < 2;
                    return (
                      <div key={s.teamId}
                        className="grid px-3 py-2 items-center rounded-lg"
                        style={{
                          gridTemplateColumns:"24px 1fr 28px 28px 28px 28px 36px 32px",
                          background: qualifies ? "rgba(74,222,128,0.06)" : "transparent",
                          borderLeft: qualifies ? "3px solid #4ADE80" : "3px solid transparent",
                        }}>
                        <span className="text-slate-500 text-xs font-bold">{i+1}</span>
                        <span className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
                          <span className="text-lg">{team?.emoji}</span> {team?.short}
                        </span>
                        <span className="text-slate-400 text-xs text-center">{s.played}</span>
                        <span className="text-slate-400 text-xs text-center">{s.won}</span>
                        <span className="text-slate-400 text-xs text-center">{s.drawn}</span>
                        <span className="text-slate-400 text-xs text-center">{s.lost}</span>
                        <span className="text-slate-400 text-xs text-center">{gd > 0 ? `+${gd}` : gd}</span>
                        <span className="text-yellow-400 text-sm font-bold text-center">{s.points}</span>
                      </div>
                    );
                  })}
                  <p className="text-slate-700 text-[10px] mt-2 px-3 italic">
                    Green = currently qualifying for Round of 32
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
