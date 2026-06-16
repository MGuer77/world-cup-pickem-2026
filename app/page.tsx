"use client";
import { useAppState } from "@/hooks/useAppState";
import NicknameModal from "@/components/NicknameModal";
import Hero from "@/components/Hero";
import ScheduleView from "@/components/ScheduleView";
import PredictionsView from "@/components/PredictionsView";
import MyPicksView from "@/components/MyPicksView";
import StatisticsView from "@/components/StatisticsView";
import GamesView from "@/components/GamesView";
import GroupsView from "@/components/GroupsView";
import ResultsView from "@/components/ResultsView";
import FantasyView from "@/components/FantasyView";
import BackgroundAudio from "@/components/BackgroundAudio";
import type { ViewKey } from "@/types";
import { useState } from "react";

export default function Home() {
  const { state, hydrated, setNickname, predict } = useAppState();
  const [view, setView] = useState<ViewKey>("schedule");

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background:"#040810" }}>
        <span className="font-display text-3xl tracking-widest text-yellow-400 animate-pulse">LOADING…</span>
      </div>
    );
  }

  const views: Record<ViewKey, React.ReactNode> = {
    schedule:    <ScheduleView />,
    predictions: <PredictionsView predictions={state.predictions} onPredict={predict} />,
    groups:      <GroupsView />,
    results:     <ResultsView />,
    "my-picks":  <MyPicksView nickname={state.nickname ?? "Player"} predictions={state.predictions} />,
    statistics:  <StatisticsView predictions={state.predictions} />,
    games:       <GamesView />,
    fantasy:     <FantasyView />,
  };

  return (
    <div className="min-h-screen" style={{ background:"#060c18" }}>
      {!state.nickname && <NicknameModal onSet={setNickname} />}
      <Hero nickname={state.nickname ?? "Player"} view={view} setView={setView} />
      <main>{views[view]}</main>
      <footer className="text-center py-8 px-4 text-[11px] tracking-widest"
        style={{ borderTop:"1px solid #0a1020", color:"#1E293B" }}>
        WORLD CUP PICK&#39;EM 2026 &nbsp;·&nbsp; ALL TIMES CHICAGO CT &nbsp;·&nbsp; NOT AFFILIATED WITH FIFA
      </footer>
      <BackgroundAudio />
    </div>
  );
}
