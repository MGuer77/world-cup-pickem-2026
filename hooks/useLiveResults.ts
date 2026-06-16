"use client";
import { useState, useEffect } from "react";
import { MATCHES } from "@/data/matches";
import { RESULTS as STATIC_RESULTS, type MatchResult } from "@/data/results";
import { mapApiTeamToId } from "@/data/teamNameMap";

interface ApiFixture {
  id: number;
  date: string;
  status: string; // "FT", "NS", "1H", "2H", "HT", "PEN", etc.
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
}

const FINISHED_STATUSES = new Set(["FT", "AET", "PEN"]);
const LIVE_STATUSES = new Set(["1H", "2H", "HT", "ET", "BT", "P", "LIVE"]);

/**
 * Fetches live results from /api/results (API-Football) and merges them
 * with the static fallback dataset in data/results.ts.
 * Live data always wins when available; static data fills gaps.
 */
export function useLiveResults() {
  const [results, setResults] = useState<Record<string, MatchResult>>(STATIC_RESULTS);
  const [loading, setLoading] = useState(true);
  const [usingLive, setUsingLive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchLive() {
      try {
        const res = await fetch("/api/results");
        if (!res.ok) return;
        const data = await res.json();
        const fixtures: ApiFixture[] = data.fixtures ?? [];
        if (fixtures.length === 0) return;

        const merged: Record<string, MatchResult> = { ...STATIC_RESULTS };

        for (const fx of fixtures) {
          const homeId = mapApiTeamToId(fx.homeTeam);
          const awayId = mapApiTeamToId(fx.awayTeam);
          if (!homeId || !awayId) continue;

          // Find the matching internal match by team pair
          const match = MATCHES.find(
            m => (m.home === homeId && m.away === awayId)
          );
          if (!match) continue;

          let status: MatchResult["status"] = "scheduled";
          if (FINISHED_STATUSES.has(fx.status)) status = "finished";
          else if (LIVE_STATUSES.has(fx.status)) status = "live";

          if (fx.homeScore === null || fx.awayScore === null) continue;

          merged[match.id] = {
            matchId: match.id,
            homeScore: fx.homeScore,
            awayScore: fx.awayScore,
            status,
            notes: merged[match.id]?.notes,
          };
        }

        if (!cancelled) {
          setResults(merged);
          setUsingLive(true);
          setLastUpdated(new Date());
        }
      } catch {
        // Silent fallback to static data
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchLive();
    // Refresh every 60 seconds while the tab is open
    const interval = setInterval(fetchLive, 60_000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  return { results, loading, usingLive, lastUpdated };
}
