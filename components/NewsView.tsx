"use client";
import { useState, useEffect, useCallback } from "react";
import type { NewsArticle } from "@/types";
const SEED: NewsArticle[] = [
  { id:"n001",title:"FIFA World Cup 2026 Draw Complete: All 12 Groups Confirmed",summary:"48 teams across 12 groups. USA, Mexico, and Canada seeded in Groups D, A, and B.",date:"2025-12-05",category:"Draw",url:"https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/news",imageEmoji:"🎲" },
  { id:"n002",title:"USA vs Paraguay Opens on FOX & Tubi — Free Jun 12",summary:"USMNT open at SoFi Stadium Jun 12. One of only two games streaming free on Tubi.",date:"2026-01-29",category:"USMNT",url:"https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/news",imageEmoji:"🇺🇸" },
  { id:"n003",title:"Mexico vs South Africa Opens Tournament — Free on Tubi Jun 11",summary:"Host Mexico begins at Estadio Azteca Jun 11 — one of only two Tubi-streamed matches.",date:"2025-12-06",category:"Group Stage",url:"https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/news",imageEmoji:"🇲🇽" },
  { id:"n004",title:"Argentina vs Algeria in Group J",summary:"Defending champions Argentina face Algeria, Austria, and Jordan. Messi's side heavy favorites.",date:"2025-12-07",category:"Groups",url:"https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/news",imageEmoji:"🇦🇷" },
  { id:"n005",title:"France vs Senegal Headline Group I at MetLife",summary:"World Cup holders France face Senegal, Norway and Iraq in one of the most-watched group games.",date:"2025-12-07",category:"Groups",url:"https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/news",imageEmoji:"🇫🇷" },
  { id:"n006",title:"Brazil Draw Morocco, Haiti, Scotland in Group C",summary:"Five-time champions Brazil open against Morocco at MetLife Stadium on June 13.",date:"2025-12-07",category:"Groups",url:"https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/news",imageEmoji:"🇧🇷" },
  { id:"n007",title:"England vs Croatia Rematch in Group L — AT&T Stadium Jun 17",summary:"England face Croatia, Ghana and Panama. The rivalry continues in Arlington.",date:"2025-12-08",category:"Groups",url:"https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/news",imageEmoji:"🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id:"n008",title:"FOX Sports: All 104 Matches on FOX/FS1 — Stream Free on FOX One in 4K",summary:"70 matches on FOX, 34 on FS1. Every match streams on FOX One in 4K. Telemundo/Peacock carry Spanish rights.",date:"2026-01-29",category:"Broadcast",url:"https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/news",imageEmoji:"📺" },
  { id:"n009",title:"MetLife Stadium Hosts World Cup Final — July 19",summary:"MetLife Stadium in East Rutherford, NJ hosts the 2026 FIFA World Cup Final on July 19.",date:"2025-06-16",category:"Venues",url:"https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/news",imageEmoji:"🏟️" },
  { id:"n010",title:"Record $1B Prize Fund for 48-Team 2026 World Cup",summary:"FIFA announced a record $1 billion prize fund. 104 matches across 16 host cities.",date:"2025-11-20",category:"Tournament",url:"https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/news",imageEmoji:"💰" },
];
const CATS = ["All","USMNT","Groups","Draw","Venues","Broadcast","Tournament","Group Stage"];
async function fetchLive(): Promise<NewsArticle[]> {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, tools:[{type:"web_search_20250305",name:"web_search"}], messages:[{role:"user",content:`Search for 5 recent FIFA World Cup 2026 news articles. Return ONLY a JSON array (no markdown) with objects: {id,title,summary,date,category,url,imageEmoji}.`}] }) });
    if (!res.ok) return [];
    const data = await res.json();
    const text = (data.content??[]).filter((b:{type:string})=>b.type==="text").map((b:{text:string})=>b.text).join("");
    const s=text.indexOf("["),e=text.lastIndexOf("]"); if(s===-1||e===-1)return [];
    return JSON.parse(text.slice(s,e+1)) as NewsArticle[];
  } catch { return []; }
}
export default function NewsView() {
  const [articles, setArticles] = useState<NewsArticle[]>(SEED);
  const [cat, setCat] = useState("All");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date|null>(null);
  const refresh = useCallback(async () => { setLoading(true); const live = await fetchLive(); if(live.length>0){const existing=new Set(SEED.map(a=>a.title.toLowerCase()));const fresh=live.filter(a=>!existing.has(a.title.toLowerCase()));setArticles([...fresh,...SEED]);} setLastUpdated(new Date()); setLoading(false); }, []);
  useEffect(() => { refresh(); const t=setInterval(refresh,60_000); return()=>clearInterval(t); }, [refresh]);
  const filtered = cat==="All"?articles:articles.filter(a=>a.category===cat);
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div><h2 className="font-display text-3xl tracking-widest text-yellow-400">📰 WC 2026 NEWS</h2>{lastUpdated&&<p className="text-slate-600 text-xs mt-1">Updated {lastUpdated.toLocaleTimeString("en-US",{timeZone:"America/Chicago",hour:"numeric",minute:"2-digit",timeZoneName:"short"})} · Auto-refreshes every 60s</p>}</div>
        <button onClick={refresh} disabled={loading} className="px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase cursor-pointer" style={{background:loading?"#1E293B":"rgba(251,191,36,0.12)",border:"1px solid rgba(251,191,36,0.3)",color:loading?"#374151":"#FBBF24"}}>{loading?"⏳ Refreshing…":"🔄 Refresh"}</button>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">{CATS.map(c=><button key={c} onClick={()=>setCat(c)} className="px-3 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase cursor-pointer" style={{background:cat===c?"#FBBF24":"rgba(255,255,255,0.05)",border:cat===c?"none":"1px solid #1E293B",color:cat===c?"#000":"#94A3B8"}}>{c}</button>)}</div>
      <div className="grid gap-4" style={{gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))"}}>
        {filtered.map(a=>(
          <a key={a.id} href={a.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden group match-card" style={{background:"#0b1220",border:"1px solid #1E293B",textDecoration:"none"}}>
            <div className="flex items-center justify-between px-4 py-3" style={{background:"rgba(251,191,36,0.06)",borderBottom:"1px solid #1E293B"}}><span className="text-2xl">{a.imageEmoji}</span><div className="flex items-center gap-2"><span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded" style={{background:"rgba(251,191,36,0.12)",color:"#FBBF24",border:"1px solid rgba(251,191,36,0.2)"}}>{a.category}</span><span className="text-[10px] text-slate-600">{a.date}</span></div></div>
            <div className="p-4"><h3 className="text-slate-100 font-bold text-sm leading-snug mb-2 group-hover:text-yellow-400 transition-colors">{a.title}</h3><p className="text-slate-500 text-xs leading-relaxed mb-3">{a.summary}</p><span className="text-yellow-500 text-xs font-semibold">Read more → FIFA.com</span></div>
          </a>
        ))}
      </div>
    </div>
  );
}
