"use client";
import { useState } from "react";
import { MATCHES } from "@/data/matches";
import { groupByDate } from "@/lib/utils";
import MatchCard from "./MatchCard";
import type { PredictionOutcome } from "@/types";

const STAGES = ["All", "Group Stage", "Round of 32", "Round of 16", "Quarter-Final", "Semi-Final", "Final"];

interface Props {
  predictions: Record<string, PredictionOutcome>;
  onPredict: (matchId: string, outcome: PredictionOutcome) => void;
}

export default function PredictionsView({ predictions, onPredict }: Props) {
  const [activeStage, setActiveStage] = useState("All");

  const filtered = activeStage === "All"
    ? MATCHES
    : MATCHES.filter((m) => m.stage === activeStage);

  const grouped = groupByDate(filtered);
  const totalMade = Object.keys(predictions).length;
  const predictableMatches = MATCHES.filter(m => m.home !== "tbd").length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <h2 className="font-display text-3xl tracking-widest text-yellow-400">🎯 MAKE YOUR PREDICTIONS</h2>
        <div className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
          style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)", color: "#FBBF24" }}>
          {totalMade} / {predictableMatches} made
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {STAGES.map((s) => (
          <button key={s} onClick={() => setActiveStage(s)}
            className="px-3 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase cursor-pointer transition-all"
            style={{
              background: activeStage === s ? "#FBBF24" : "rgba(255,255,255,0.05)",
              border: activeStage === s ? "none" : "1px solid #1E293B",
              color: activeStage === s ? "#000" : "#94A3B8",
            }}>
            {s === "All" ? "All Matches" : s}
          </button>
        ))}
      </div>

      {Object.entries(grouped).map(([date, matches]) => (
        <section key={date} className="mb-10">
          <div className="flex items-center gap-3 mb-4 pb-2" style={{ borderBottom: "2px solid rgba(251,191,36,0.15)" }}>
            <div className="w-1 h-6 rounded-full bg-yellow-400" />
            <h3 className="text-slate-200 font-bold text-base">{date}</h3>
            <span className="text-slate-600 text-sm">
              {matches.filter((m) => predictions[m.id]).length}/{matches.length} predicted
            </span>
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))" }}>
            {matches.map((m) => (
              <MatchCard key={m.id} match={m} prediction={predictions[m.id]} onPredict={onPredict} showExpert />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
