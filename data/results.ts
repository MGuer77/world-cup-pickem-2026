// Real confirmed results — Matchday 1 complete (Jun 11–14, 2026)
// Source: ESPN, CBS Sports, FOX News (verified June 15, 2026)

export interface MatchResult {
  matchId: string;
  homeScore: number;
  awayScore: number;
  status: "finished" | "live" | "scheduled";
  notes?: string;
}

export const RESULTS: Record<string, MatchResult> = {
  // Thu Jun 11 — Group A
  m001: { matchId:"m001", homeScore:2, awayScore:0, status:"finished", notes:"3 red cards — most ever in a World Cup match" },
  m002: { matchId:"m002", homeScore:2, awayScore:1, status:"finished", notes:"South Korea comeback win" },
  // Fri Jun 12 — Group B & D
  m003: { matchId:"m003", homeScore:1, awayScore:1, status:"finished" },
  m004: { matchId:"m004", homeScore:4, awayScore:1, status:"finished", notes:"Historic USMNT performance" },
  // Sat Jun 13 — Group B, C, D
  m005: { matchId:"m005", homeScore:1, awayScore:1, status:"finished", notes:"Qatar's first-ever WC point" },
  m006: { matchId:"m006", homeScore:1, awayScore:1, status:"finished", notes:"Vinícius Júnior equalizer for Brazil" },
  m007: { matchId:"m007", homeScore:1, awayScore:0, status:"finished", notes:"Scotland's first WC win since 1990" },
  m008: { matchId:"m008", homeScore:2, awayScore:0, status:"finished", notes:"Australia shock Türkiye" },
  // Sun Jun 14 — Group E, F
  m009: { matchId:"m009", homeScore:7, awayScore:1, status:"finished", notes:"Germany rout Curaçao" },
  m010: { matchId:"m010", homeScore:2, awayScore:2, status:"finished", notes:"Dramatic late draw" },
  m011: { matchId:"m011", homeScore:1, awayScore:0, status:"finished" },
  m012: { matchId:"m012", homeScore:5, awayScore:1, status:"finished", notes:"Sweden rout Tunisia" },
};

export function getResult(matchId: string): MatchResult | null {
  return RESULTS[matchId] ?? null;
}
