"use client";
import { useMemo } from "react";
import { MATCHES } from "@/data/matches";
import { TEAMS } from "@/data/teams";
import type { PredictionOutcome } from "@/types";

interface Props {
  predictions: Record<string, PredictionOutcome>;
}

function StatBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-slate-400">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "#1E293B" }}>
        <div className="h-full rounded-full progress-bar"
          style={{ width: `${pct}%`, background: color, "--bar-width": `${pct}%` } as React.CSSProperties} />
      </div>
    </div>
  );
}

const TOURNAMENT_FAVORITES = [
  { teamId: "fra", pct: 18 }, { teamId: "arg", pct: 17 },
  { teamId: "bra", pct: 15 }, { teamId: "eng", pct: 12 },
  { teamId: "esp", pct: 11 }, { teamId: "ger", pct: 9  },
  { teamId: "por", pct: 7  }, { teamId: "ned", pct: 5  },
];

export default function StatisticsView({ predictions }: Props) {
  const myStats = useMemo(() => {
    const vals = Object.values(predictions);
    const total = vals.length || 1;
    return {
      homeWins: Math.round((vals.filter((v) => v === "home_win").length / total) * 100),
      draws:    Math.round((vals.filter((v) => v === "draw").length    / total) * 100),
      awayWins: Math.round((vals.filter((v) => v === "away_win").length / total) * 100),
      total:    vals.length,
    };
  }, [predictions]);

  const topTeams = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.entries(predictions).forEach(([matchId, pick]) => {
      const m = MATCHES.find((x) => x.id === matchId);
      if (!m || m.home === "tbd" || m.away === "tbd") return;
      const team = pick === "home_win" ? m.home : pick === "away_win" ? m.away : null;
      if (team) counts[team] = (counts[team] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [predictions]);

  const card = { background: "#0b1220", border: "1px solid #1E293B" };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h2 className="font-display text-3xl tracking-widest text-yellow-400 mb-8">📊 STATISTICS</h2>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>

        <div className="rounded-xl p-5" style={card}>
          <h3 className="text-slate-300 font-bold text-xs tracking-widest uppercase mb-4">Your Prediction Split</h3>
          {myStats.total === 0 ? <p className="text-slate-600 text-sm">No predictions yet.</p> : (
            <>
              <StatBar label="Home Wins" pct={myStats.homeWins} color="#3B82F6" />
              <StatBar label="Draws"     pct={myStats.draws}    color="#6B7280" />
              <StatBar label="Away Wins" pct={myStats.awayWins} color="#EF4444" />
            </>
          )}
        </div>

        <div className="rounded-xl p-5" style={card}>
          <h3 className="text-slate-300 font-bold text-xs tracking-widest uppercase mb-4">All-User Prediction Trends</h3>
          <StatBar label="Home Wins" pct={48} color="#3B82F6" />
          <StatBar label="Draws"     pct={22} color="#6B7280" />
          <StatBar label="Away Wins" pct={30} color="#EF4444" />
          <p className="text-slate-700 text-xs mt-2 italic">* Simulated global data</p>
        </div>

        <div className="rounded-xl p-5" style={card}>
          <h3 className="text-slate-300 font-bold text-xs tracking-widest uppercase mb-4">Your Most Backed Teams</h3>
          {topTeams.length === 0
            ? <p className="text-slate-600 text-sm">Make predictions to see your top picks.</p>
            : topTeams.map(([teamId, count]) => {
                const t = TEAMS[teamId];
                return (
                  <div key={teamId} className="flex items-center gap-3 mb-2.5">
                    <span className="text-2xl">{t.emoji}</span>
                    <span className="text-slate-400 flex-1 text-sm">{t.name}</span>
                    <span className="font-bold text-yellow-400 text-sm">{count} pick{count > 1 ? "s" : ""}</span>
                  </div>
                );
              })
          }
        </div>

        <div className="rounded-xl p-5" style={card}>
          <h3 className="text-slate-300 font-bold text-xs tracking-widest uppercase mb-4">Tournament Win Probability (Expert)</h3>
          {TOURNAMENT_FAVORITES.map(({ teamId, pct }) => {
            const t = TEAMS[teamId];
            return (
              <div key={teamId} className="flex items-center gap-2 mb-2">
                <span className="text-xl w-7">{t.emoji}</span>
                <span className="text-slate-400 text-xs w-24">{t.name}</span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#1E293B" }}>
                  <div className="h-full rounded-full progress-bar"
                    style={{ width: `${pct * 5}%`, background: t.color, "--bar-width": `${pct * 5}%` } as React.CSSProperties} />
                </div>
                <span className="text-yellow-400 text-xs font-bold w-8 text-right">{pct}%</span>
              </div>
            );
          })}
          <p className="text-slate-700 text-xs mt-2 italic">* Expert aggregate estimates</p>
        </div>
      </div>
    </div>
  );
}
