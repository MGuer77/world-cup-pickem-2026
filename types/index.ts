export type MatchStatus = "scheduled" | "live" | "finished";
export type PredictionOutcome = "home_win" | "draw" | "away_win";
export type SortKey = "points" | "accuracy" | "correct" | "total";
export type ViewKey = "schedule" | "predictions" | "my-picks" | "statistics" | "games" | "groups" | "results" | "fantasy";

export interface Team {
  id: string; name: string; short: string; emoji: string; color: string;
}
export interface Match {
  id: string; home: string; away: string; stadium: string; city: string;
  kickoff: string; group: string; stage: string; status: MatchStatus;
  tv?: string[]; homeScore?: number; awayScore?: number;
}
export interface ExpertConsensus {
  home: number; draw: number; away: number; confidence: number; sources: number;
}
export interface LeaderboardUser {
  nickname: string; points: number; correct: number; total: number; accuracy: number; isMe?: boolean;
}
export interface ChatMessage {
  id: string; nickname: string; text: string; timestamp: number;
}
export interface AppState {
  nickname: string | null; predictions: Record<string, PredictionOutcome>; darkMode: boolean;
}
export interface NewsArticle {
  id: string; title: string; summary: string; date: string;
  category: string; url: string; imageEmoji: string;
}
