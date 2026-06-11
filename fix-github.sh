#!/bin/bash
# ============================================================
# Run this script ONCE to completely reset your GitHub repo
# with the correct folder structure.
#
# Prerequisites: git installed, GitHub remote already set up
# ============================================================

set -e

echo "🧹 Clearing all existing files from git tracking..."
git rm -rf . --quiet

echo "📁 Creating required folder structure..."
mkdir -p app components data hooks lib types public

echo "📄 Writing app/page.tsx..."
cat > app/page.tsx << 'EOF'
"use client";
import { useAppState } from "@/hooks/useAppState";
import NicknameModal from "@/components/NicknameModal";
import Hero from "@/components/Hero";
import ScheduleView from "@/components/ScheduleView";
import PredictionsView from "@/components/PredictionsView";
import LeaderboardView from "@/components/LeaderboardView";
import MyPicksView from "@/components/MyPicksView";
import StatisticsView from "@/components/StatisticsView";
import type { ViewKey } from "@/types";
import { useState } from "react";

export default function Home() {
  const { state, hydrated, setNickname, predict } = useAppState();
  const [view, setView] = useState<ViewKey>("schedule");

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#040810" }}>
        <span className="font-display text-3xl tracking-widest text-yellow-400 animate-pulse">LOADING…</span>
      </div>
    );
  }

  const views: Record<ViewKey, React.ReactNode> = {
    schedule:    <ScheduleView />,
    predictions: <PredictionsView predictions={state.predictions} onPredict={predict} />,
    leaderboard: <LeaderboardView nickname={state.nickname ?? "You"} predictions={state.predictions} />,
    "my-picks":  <MyPicksView nickname={state.nickname ?? "Player"} predictions={state.predictions} />,
    statistics:  <StatisticsView predictions={state.predictions} />,
  };

  return (
    <div className="min-h-screen" style={{ background: "#060c18" }}>
      {!state.nickname && <NicknameModal onSet={setNickname} />}
      <Hero nickname={state.nickname ?? "Player"} view={view} setView={setView} />
      <main>{views[view]}</main>
      <footer className="text-center py-8 px-4 text-[11px] tracking-widest"
        style={{ borderTop: "1px solid #0a1020", color: "#1E293B" }}>
        WORLD CUP PICK&#39;EM 2026 &nbsp;·&nbsp; ALL TIMES IN CHICAGO CENTRAL TIME
        &nbsp;·&nbsp; NOT AFFILIATED WITH FIFA
      </footer>
    </div>
  );
}
EOF

echo "📄 Writing app/layout.tsx..."
cat > app/layout.tsx << 'EOF'
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Cup Pick'em 2026",
  description: "Make predictions for every FIFA World Cup 2026 match. Track your accuracy, earn points, and climb the leaderboard — no account needed.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚽</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
EOF

echo "📄 Writing app/globals.css..."
cat > app/globals.css << 'EOF'
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background-color: #060c18;
  color: #F1F5F9;
  font-family: 'Barlow', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}
.font-display { font-family: 'Bebas Neue', Impact, sans-serif; }
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #040810; }
::-webkit-scrollbar-thumb { background: #1E3A5F; border-radius: 3px; }
.match-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
.match-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.5); }
@keyframes growBar { from { width: 0%; } to { width: var(--bar-width); } }
.progress-bar { animation: growBar 0.7s ease-out forwards; }
@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
.animate-fade-in { animation: fadeIn 0.35s ease-out; }
EOF

echo "✅ app/ folder written"
