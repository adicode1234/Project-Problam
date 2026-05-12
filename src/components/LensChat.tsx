import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Send,
  Mic,
  X,
  Compass,
  Loader2,
  ArrowUpRight,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import logo from "@/assets/logo.png";

type Msg = { role: "user" | "assistant"; content: string; ts: number };

const TRAVEL_MODES = [
  { id: "Hidden Gem Mode", label: "Hidden Gems", emoji: "💎" },
  { id: "Local Food Mode", label: "Local Food", emoji: "🍜" },
  { id: "Peaceful Escape Mode", label: "Peaceful Escape", emoji: "🌿" },
  { id: "Nightlife Explorer", label: "Nightlife", emoji: "🌃" },
  { id: "Solo Traveler", label: "Solo", emoji: "🎒" },
  { id: "Budget Explorer", label: "Budget", emoji: "💸" },
  { id: "Luxury Local", label: "Luxury", emoji: "🥂" },
  { id: "Rainy Day Explorer", label: "Rainy Day", emoji: "☂️" },
];

const SUGGESTED = [
  "Quiet coffee shops in Tokyo where locals work",
  "Hidden food spots in Kolkata under budget",
  "Where to avoid tourists in Paris",
  "Underground jazz bars locals love in NYC",
];

const LOADING_PHRASES = [
  "analyzing local sentiment…",
  "scanning community forums…",
  "detecting tourist saturation…",
  "discovering hidden gems…",
  "building authentic itinerary…",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/lens-chat`;

function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function LensChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [mode, setMode] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recogRef = useRef<any>(null);

  useEffect(() => {
    if (!loading) return;
    const id = setInterval(
      () => setPhraseIdx((i) => (i + 1) % LOADING_PHRASES.length),
      1400
    );
    return () => clearInterval(id);
  }, [loading]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: Msg = { role: "user", content: trimmed, ts: Date.now() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    let assistantText = "";
    const upsert = (chunk: string) => {
      assistantText += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantText } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantText, ts: Date.now() }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
          mode,
        }),
      });

      if (!resp.ok || !resp.body) {
        const errText =
          resp.status === 429
            ? "Too many requests. Take a breath and try again."
            : resp.status === 402
            ? "AI credits exhausted. Add credits in workspace settings."
            : "Something went wrong. Try again.";
        upsert(errText);
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, idx);
          buf = buf.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const c = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (c) upsert(c);
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      upsert("Connection lost. Try again in a sec.");
    } finally {
      setLoading(false);
    }
  };

  const toggleVoice = () => {
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert("Voice input isn't supported in this browser.");
      return;
    }
    if (listening) {
      recogRef.current?.stop();
      return;
    }
    const r = new SR();
    r.lang = "en-US";
    r.interimResults = false;
    r.onresult = (e: any) => setInput(e.results[0][0].transcript);
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recogRef.current = r;
    setListening(true);
    r.start();
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 rounded-full pl-4 pr-5 py-3 bg-primary text-primary-foreground shadow-glow hover:scale-105 transition-transform"
          aria-label="Open Lens AI"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-accent animate-pulse-soft" />
            <span className="relative rounded-full bg-accent h-2 w-2" />
          </span>
          <Sparkles className="h-4 w-4" />
          <span className="font-medium text-sm">Ask QuietTrails</span>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 sm:w-[420px] sm:h-[640px] sm:max-h-[85vh] animate-fade-up">
          <div className="glass-strong h-full sm:rounded-3xl flex flex-col overflow-hidden shadow-glass">
            {/* Header */}
            <div className="relative px-5 py-4 border-b border-border/60">
              <div className="absolute inset-0 gradient-aurora opacity-10 pointer-events-none" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
  src={logo}
  alt="QuietTrails"
  className="h-9 w-9 rounded-xl object-cover shadow-glow"
/>
                  <div>
                    <div className="font-display text-xl leading-none">QuietTrails AI</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-jade animate-pulse-soft" style={{ background: "var(--jade)" }} />
                      your local insider
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 grid place-items-center rounded-full hover:bg-secondary transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Travel modes */}
              <div className="relative mt-3 flex gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1 pb-0.5">
                {TRAVEL_MODES.map((m) => {
                  const active = mode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMode(active ? null : m.id)}
                      className={`shrink-0 text-xs px-2.5 py-1.5 rounded-full border transition ${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card/60 border-border hover:border-accent"
                      }`}
                    >
                      <span className="mr-1">{m.emoji}</span>
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
              {messages.length === 0 && (
                <div className="space-y-5 animate-fade-up">
                  <div className="text-center pt-4">
                    <div className="font-display text-3xl leading-tight">
                      Where to, <span className="text-aurora">traveler</span>?
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                      Ask me anything. I'll find places only the locals know.
                    </p>
                  </div>
                  <div className="space-y-2">
                    {SUGGESTED.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="w-full text-left text-sm px-4 py-3 rounded-2xl glass hover:shadow-glass transition group flex items-center justify-between gap-3"
                      >
                        <span>{s}</span>
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-bubble-in`}
                >
                  <div className={`max-w-[85%] ${m.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "glass rounded-bl-md"
                      }`}
                    >
                      {m.role === "assistant" ? (
                        <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0 prose-strong:text-foreground prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground prose-blockquote:not-italic">
                          <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                      ) : (
                        m.content
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground px-1">
                      {fmtTime(m.ts)}
                    </span>
                  </div>
                </div>
              ))}

              {loading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start animate-bubble-in">
                  <div className="glass px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-2.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />
                    <span className="text-[13px] shimmer-text">
                      {LOADING_PHRASES[phraseIdx]}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border/60 bg-card/40">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-end gap-2"
              >
                <div className="flex-1 glass rounded-2xl px-3.5 py-2.5 flex items-center gap-2 focus-within:shadow-glow transition-shadow">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode ? `Ask in ${mode}…` : "Ask QuietTrails anything…"}
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={toggleVoice}
                    className={`h-8 w-8 grid place-items-center rounded-full transition ${
                      listening ? "bg-destructive text-destructive-foreground animate-pulse" : "hover:bg-secondary"
                    }`}
                    aria-label="Voice input"
                  >
                    <Mic className="h-4 w-4" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="h-11 w-11 grid place-items-center rounded-2xl bg-primary text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                QuietTrails may romanticize. Verify before you go.
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none}`}</style>
    </>
  );
}
