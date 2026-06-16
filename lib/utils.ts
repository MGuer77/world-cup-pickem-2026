import type { Match } from "@/types";

export function toChicagoTime(isoString: string): string {
  return new Date(isoString).toLocaleString("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export function toChicagoDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function toChicagoTimeOnly(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export function toChicagoNow(): string {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export function groupByDate(matches: Match[]): Record<string, Match[]> {
  const groups: Record<string, Match[]> = {};
  for (const m of matches) {
    const key = toChicagoDate(m.kickoff);
    if (!groups[key]) groups[key] = [];
    groups[key].push(m);
  }
  return groups;
}

export function getNextMatch(matches: Match[]): Match {
  const now = new Date();
  return matches.find((m) => new Date(m.kickoff) > now) ?? matches[matches.length - 1];
}
