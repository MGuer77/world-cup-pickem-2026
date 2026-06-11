"use client";
import { useState, useMemo } from "react";
import { MOCK_LEADERBOARD } from "@/data/matches";
import type { LeaderboardUser, PredictionOutcome, SortKey } from "@/types";

interface Props {
  nickname: string;
  predictions: Record<string, PredictionOutcome>;
}

const MEDALS = ["🥇", "🥈", "🥉"];

export default function LeaderboardView({ nickname, predictions }: Props) {
  const [sort, setSort] = useState<SortKey>("points");

  const myStats = useMemo(() => {
    const total = Object.keys(predictions).length;
    const correct = Math.floor(total * 0.65);
    return {
      nickname,
      points: correct * 10,
      correct,
      total,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
      isMe: true,
    } as LeaderboardUser;
  }, [nickname, predictions]);

  const allUsers = useMemo(() => {
    const combined = [...MOCK_LEADERBOARD, myStats] as LeaderboardUser[];
    return combined.sort((a, b) => {
      if (sort === "points")   return b.points   - a.points;
      if (sort === "accuracy") return b.accuracy - a.accuracy;
      return b.correct - a.correct;
    });
  }, [myStats, sort]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h2 className="font-display text-3xl tracking-widest text-yellow-400 mb-6">
        🏆 LEADERBOARD
      </h2>

      {/* Sort controls */}
      <div className="flex gap-2 mb-6">
        {(["points", "accuracy", "correct"] as SortKey[]).map((s) => (
          <button key={s} onClick={() => setSort(s)}
            className="px-3 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase cursor-pointer transition-all"
            style={{
              background: sort === s ? "#FBBF24" : "rgba(255,255,255,0.05)",
              border: sort === s ? "none" : "1px solid #1E293B",
              color: sort === s ? "#000" : "#94A3B8",
            }}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1E293B" }}>
        {/* Header */}
        <div className="grid px-5 py-3 text-[10px] font-bold tracking-widest uppercase text-slate-600"
          style={{ gridTemplateColumns: "52px 1fr 80px 80px 72px", background: "#06090f", borderBottom: "1px solid #1E293B" }}>
          <span>#</span>
          <span>Player</span>
          <span>Points</span>
          <span>Correct</span>
          <span>Accuracy</span>
        </div>

        {/* Rows */}
        {allUsers.map((user, i) => (
          <div key={user.nickname}
            className="grid px-5 py-4 items-center transition-colors"
            style={{
              gridTemplateColumns: "52px 1fr 80px 80px 72px",
              background: user.isMe
                ? "rgba(251,191,36,0.07)"
                : i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
              borderBottom: "1px solid #0c111c",
              borderLeft: user.isMe ? "3px solid #FBBF24" : "3px solid transparent",
            }}>

            {/* Rank */}
            <span className="font-display text-xl">
              {i < 3
                ? MEDALS[i]
                : <span style={{ color: "#374151" }}>{i + 1}</span>
              }
            </span>

            {/* Name */}
            <span className="font-semibold text-sm" style={{ color: user.isMe ? "#FBBF24" : "#E2E8F0" }}>
              {user.nickname}
              {user.isMe && <span className="ml-2 text-[10px] text-yellow-600 tracking-widest uppercase">(you)</span>}
            </span>

            {/* Points */}
            <span className="font-bold text-base text-yellow-400">{user.points}</span>

            {/* Correct */}
            <span className="text-emerald-400 text-sm">{user.correct}</span>

            {/* Accuracy */}
            <span className="text-blue-400 text-sm">{user.accuracy}%</span>
          </div>
        ))}
      </div>

      <p className="text-slate-700 text-xs mt-3 italic">
        * Leaderboard data is simulated. Your score is estimated based on predictions made.
      </p>
    </div>
  );
}
