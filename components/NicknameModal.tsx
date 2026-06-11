"use client";
import { useState } from "react";

const SUGGESTIONS = ["SoccerKing", "GoalMachine", "ChicagoFan23", "TikiTaka99", "MidfieldMaestro"];

interface Props {
  onSet: (name: string) => void;
}

export default function NicknameModal({ onSet }: Props) {
  const [val, setVal] = useState("");

  const submit = () => {
    const trimmed = val.trim();
    if (trimmed.length >= 2) onSet(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)" }}>
      <div className="w-full max-w-md rounded-2xl p-8 animate-fade-in"
        style={{
          background: "linear-gradient(135deg, #080d1a 0%, #0f1724 100%)",
          border: "1px solid rgba(251,191,36,0.25)",
          boxShadow: "0 0 80px rgba(251,191,36,0.12), 0 24px 64px rgba(0,0,0,0.6)",
        }}>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">⚽</div>
          <h1 className="font-display text-4xl tracking-widest text-yellow-400 mb-2">
            WORLD CUP 2026
          </h1>
          <p className="text-slate-400 text-sm">
            Choose a nickname to start making predictions — no account needed.
          </p>
        </div>

        {/* Input */}
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Enter your nickname…"
          maxLength={24}
          className="w-full px-4 py-3 rounded-lg text-white placeholder-slate-600 text-base mb-3 outline-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "2px solid rgba(251,191,36,0.35)",
            fontFamily: "inherit",
          }}
          autoFocus
        />

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => setVal(s)}
              className="px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors"
              style={{
                background: "rgba(251,191,36,0.08)",
                border: "1px solid rgba(251,191,36,0.25)",
                color: "#FBBF24",
              }}>
              {s}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={submit}
          disabled={val.trim().length < 2}
          className="w-full py-3 rounded-lg font-display text-xl tracking-widest transition-all"
          style={{
            background: val.trim().length >= 2
              ? "linear-gradient(90deg, #FBBF24, #F59E0B)"
              : "#1E293B",
            color: val.trim().length >= 2 ? "#000" : "#374151",
            cursor: val.trim().length >= 2 ? "pointer" : "not-allowed",
          }}>
          LET'S GO →
        </button>
      </div>
    </div>
  );
}
