"use client";
import { MATCHES } from "@/data/matches";
import { groupByDate } from "@/lib/utils";
import MatchCard from "./MatchCard";

export default function ScheduleView() {
  const grouped = groupByDate(MATCHES);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h2 className="font-display text-3xl tracking-widest text-yellow-400 mb-8">
        📅 MATCH SCHEDULE — CHICAGO TIME (CT)
      </h2>

      {Object.entries(grouped).map(([date, matches]) => (
        <section key={date} className="mb-10">
          <div className="flex items-center gap-3 mb-4 pb-2"
            style={{ borderBottom: "2px solid rgba(251,191,36,0.15)" }}>
            <div className="w-1 h-6 rounded-full bg-yellow-400" />
            <h3 className="text-slate-200 font-bold text-base">{date}</h3>
            <span className="text-slate-600 text-sm">{matches.length} match{matches.length > 1 ? "es" : ""}</span>
          </div>

          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
            {matches.map((m) => (
              <MatchCard key={m.id} match={m} compact showExpert={false} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
