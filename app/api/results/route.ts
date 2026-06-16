import { NextResponse } from "next/server";

// API-Football: World Cup 2026 = league 1, season 2026
const API_BASE = "https://v3.football.api-sports.io";
const LEAGUE_ID = 1;
const SEASON = 2026;

// Cache results for 5 minutes to stay well within the 100 req/day free limit
export const revalidate = 300;

interface ApiFixture {
  fixture: {
    id: number;
    date: string;
    status: { short: string; long: string };
  };
  teams: {
    home: { id: number; name: string; winner: boolean | null };
    away: { id: number; name: string; winner: boolean | null };
  };
  goals: { home: number | null; away: number | null };
}

export async function GET() {
  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured", fixtures: [] }, { status: 200 });
  }

  try {
    const res = await fetch(
      `${API_BASE}/fixtures?league=${LEAGUE_ID}&season=${SEASON}`,
      {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: `API error: ${res.status}`, fixtures: [] }, { status: 200 });
    }

    const data = await res.json();
    const fixtures: ApiFixture[] = data.response ?? [];

    // Normalize into a simple shape keyed by team name pairs + date
    const normalized = fixtures.map((f) => ({
      id: f.fixture.id,
      date: f.fixture.date,
      status: f.fixture.status.short, // "FT", "NS", "1H", "2H", "HT", etc.
      homeTeam: f.teams.home.name,
      awayTeam: f.teams.away.name,
      homeScore: f.goals.home,
      awayScore: f.goals.away,
    }));

    return NextResponse.json({ fixtures: normalized, fetchedAt: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json({ error: String(err), fixtures: [] }, { status: 200 });
  }
}
