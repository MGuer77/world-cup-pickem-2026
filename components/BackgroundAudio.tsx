"use client";
import { useState, useEffect, useRef } from "react";
const YT_VIDEO_ID = "-msZv_fLVJk";
const YT_PLAYLIST = "RD-msZv_fLVJk";
declare global { interface Window { YT: { Player: new (el:HTMLElement|string, opts:Record<string,unknown>) => YTPlayer; PlayerState: { PLAYING:number; PAUSED:number }; }; onYouTubeIframeAPIReady: () => void; } }
interface YTPlayer { playVideo:()=>void; pauseVideo:()=>void; setVolume:(v:number)=>void; getPlayerState:()=>number; destroy:()=>void; }
export default function BackgroundAudio() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(40);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const playerRef = useRef<YTPlayer|null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const apiLoaded = useRef(false);
  useEffect(() => {
    if (apiLoaded.current) return; apiLoaded.current = true;
    const tag = document.createElement("script"); tag.src = "https://www.youtube.com/iframe_api"; document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => {
      if (!containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, { height:"1", width:"1", videoId:YT_VIDEO_ID, playerVars:{autoplay:0,controls:0,disablekb:1,fs:0,iv_load_policy:3,list:YT_PLAYLIST,listType:"playlist",loop:1,modestbranding:1,playsinline:1,rel:0}, events:{ onReady:()=>{ setReady(true); playerRef.current?.setVolume(40); } } });
    };
    return () => { playerRef.current?.destroy(); };
  }, []);
  const toggle = () => { if (!playerRef.current || !ready) return; if (playing) { playerRef.current.pauseVideo(); setPlaying(false); } else { playerRef.current.playVideo(); setPlaying(true); } };
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => { const v=Number(e.target.value); setVolume(v); playerRef.current?.setVolume(v); };
  if (!visible) return null;
  return (
    <div style={{ position:"fixed", bottom:20, right:20, zIndex:999, background:"linear-gradient(135deg,#0b1220,#111827)", border:"1px solid rgba(251,191,36,0.3)", borderRadius:14, padding:"10px 14px", display:"flex", alignItems:"center", gap:10, boxShadow:"0 8px 32px rgba(0,0,0,0.6)", backdropFilter:"blur(8px)", minWidth:240 }}>
      <div ref={containerRef} style={{ position:"absolute", opacity:0, pointerEvents:"none", width:1, height:1 }} />
      <div style={{ fontSize:22, animation:playing?"spin 3s linear infinite":"none", display:"inline-block" }}>🎵</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:"#FBBF24", fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:4, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{playing?"♪ Playing…":"WC 2026 Music"}</div>
        <input type="range" min={0} max={100} value={volume} onChange={handleVolume} style={{ width:"100%", accentColor:"#FBBF24", cursor:"pointer", height:4 }} />
      </div>
      <button onClick={toggle} disabled={!ready} style={{ width:34, height:34, borderRadius:"50%", background:ready?(playing?"rgba(251,191,36,0.2)":"linear-gradient(135deg,#FBBF24,#F59E0B)"):"#1E293B", border:playing?"2px solid #FBBF24":"none", color:playing?"#FBBF24":"#000", fontSize:14, cursor:ready?"pointer":"not-allowed", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .2s" }}>{!ready?"…":playing?"⏸":"▶"}</button>
      <button onClick={()=>setVisible(false)} style={{ background:"none", border:"none", color:"#374151", cursor:"pointer", fontSize:16, lineHeight:1, padding:2, flexShrink:0 }}>✕</button>
      <style>{`@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}
