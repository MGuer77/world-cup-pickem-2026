"use client";
import { useState, useEffect, useCallback } from "react";
import type { AppState, PredictionOutcome } from "@/types";
import { upsertUser, syncUsersFromShared } from "@/lib/db";
const STORAGE_KEY = "wc2026_state";
const DEFAULT_STATE: AppState = { nickname:null, predictions:{}, darkMode:true };
function loadState(): AppState { if(typeof window==="undefined")return DEFAULT_STATE; try{const r=localStorage.getItem(STORAGE_KEY);return r?{...DEFAULT_STATE,...JSON.parse(r)}:DEFAULT_STATE;}catch{return DEFAULT_STATE;} }
function saveState(s: AppState) { try{localStorage.setItem(STORAGE_KEY,JSON.stringify(s));}catch{} }
export function useAppState() {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { const loaded=loadState(); setState(loaded); setHydrated(true); if(loaded.nickname)upsertUser(loaded.nickname,loaded.predictions); syncUsersFromShared(); }, []);
  const setNickname = useCallback((name: string) => { setState(prev => { const next={...prev,nickname:name}; saveState(next); upsertUser(name,next.predictions); return next; }); }, []);
  const predict = useCallback((matchId: string, outcome: PredictionOutcome) => { setState(prev => { const predictions={...prev.predictions,[matchId]:outcome}; const next={...prev,predictions}; saveState(next); if(prev.nickname)upsertUser(prev.nickname,predictions); return next; }); }, []);
  return { state, hydrated, setNickname, predict };
}
