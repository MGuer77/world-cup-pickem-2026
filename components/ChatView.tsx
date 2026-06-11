"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatMessage } from "@/types";
import { getChatMessages, addChatMessage, syncChatFromShared } from "@/lib/db";
interface Props { nickname: string; }
export default function ChatView({ nickname }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const load = useCallback(async () => { const msgs = await syncChatFromShared(); setMessages(msgs); }, []);
  useEffect(() => { setMessages(getChatMessages()); load(); const t = setInterval(load, 15_000); return () => clearInterval(t); }, [load]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  const send = async () => {
    const text = input.trim(); if (!text || sending) return;
    setSending(true); setInput("");
    const msg = await addChatMessage(nickname, text);
    setMessages(prev => [...prev, msg]); setSending(false); inputRef.current?.focus();
  };
  function color(name: string) {
    const c = ["#FBBF24","#34D399","#60A5FA","#F87171","#C084FC","#FB923C","#38BDF8","#A3E635"];
    let h = 0; for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) & 0xffffffff;
    return c[Math.abs(h) % c.length];
  }
  function fmt(ts: number) { return new Date(ts).toLocaleTimeString("en-US", { timeZone:"America/Chicago", hour:"numeric", minute:"2-digit" }); }
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h2 className="font-display text-3xl tracking-widest text-yellow-400">💬 FAN CHAT</h2>
          <p className="text-slate-600 text-xs mt-0.5">Chatting as <span className="font-bold" style={{ color: color(nickname) }}>{nickname}</span> · {messages.length} messages · syncs every 15s</p>
        </div>
        <button onClick={load} className="text-xs px-3 py-1.5 rounded-lg cursor-pointer" style={{ background:"rgba(255,255,255,0.05)", border:"1px solid #1E293B", color:"#64748B" }}>🔄 Sync</button>
      </div>
      <div className="rounded-xl overflow-hidden mb-3" style={{ border:"1px solid #1E293B" }}>
        <div className="overflow-y-auto p-4 space-y-3" style={{ height:420, background:"#080d1a" }}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-700"><div className="text-4xl mb-3">⚽</div><p className="text-sm">No messages yet. Start the conversation!</p></div>
          ) : messages.map(msg => {
            const isMe = msg.nickname.toLowerCase() === nickname.toLowerCase();
            return (
              <div key={msg.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black" style={{ background: color(msg.nickname), color:"#000" }}>{msg.nickname.slice(0,2).toUpperCase()}</div>
                <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div className="flex items-center gap-2"><span className="text-[11px] font-bold" style={{ color: color(msg.nickname) }}>{isMe ? "You" : msg.nickname}</span><span className="text-[10px] text-slate-700">{fmt(msg.timestamp)}</span></div>
                  <div className="px-3 py-2 rounded-xl text-sm leading-relaxed" style={{ background: isMe ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.05)", border: isMe ? "1px solid rgba(251,191,36,0.25)" : "1px solid #1E293B", color: isMe ? "#FDE68A" : "#CBD5E1", borderBottomRightRadius: isMe ? 4 : 12, borderBottomLeftRadius: isMe ? 12 : 4 }}>{msg.text}</div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
        <div className="flex gap-2 p-3" style={{ background:"#0b1220", borderTop:"1px solid #1E293B" }}>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value.slice(0,300))} onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(); }}} placeholder="Type a message… (Enter to send)" className="flex-1 px-3 py-2 rounded-lg text-sm text-white placeholder-slate-700 outline-none" style={{ background:"rgba(255,255,255,0.05)", border:"1px solid #1E293B", fontFamily:"inherit" }} />
          <button onClick={send} disabled={!input.trim() || sending} className="px-4 py-2 rounded-lg font-bold text-sm transition-all" style={{ background: input.trim() && !sending ? "linear-gradient(90deg,#FBBF24,#F59E0B)" : "#1E293B", color: input.trim() && !sending ? "#000" : "#374151", cursor: input.trim() && !sending ? "pointer" : "not-allowed" }}>{sending ? "…" : "Send"}</button>
        </div>
      </div>
      <p className="text-slate-700 text-xs text-center">{300 - input.length} characters remaining</p>
    </div>
  );
}
