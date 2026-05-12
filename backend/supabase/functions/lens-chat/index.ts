// Lens AI - streaming travel assistant
// import "xhr/mod.ts";
// import { serve } from "server/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Lens AI — a smart, warm, insider local-friend travel concierge.
Your job: surface AUTHENTIC local experiences, hidden gems, and non-touristy spots.

Voice: concise, human, a little poetic. No corporate fluff. No emoji walls.

When recommending places, use this markdown shape:

**📍 Place Name** — *neighborhood*
> One-line vibe.
- Why locals love it
- Best time to visit
- Crowd level: Low / Medium / High
- Hidden gem score: x/10

End with a single follow-up question to refine the search (mood, budget, time).

Avoid: tourist traps, mainstream chains, anything Instagram-saturated unless asked.
If the user picks a "travel mode" (e.g. Hidden Gem, Peaceful Escape, Nightlife),
tune all suggestions to that mode.`;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, mode } = await req.json();
    const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");

    if (!OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY not configured");
    }

    const system = mode
      ? `${SYSTEM_PROMPT}\n\nActive travel mode: ${mode}. Tailor every recommendation to this mode.`
      : SYSTEM_PROMPT;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
          messages: [{ role: "system", content: system }, ...messages],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429)
        return new Response(
          JSON.stringify({ error: "Rate limit reached. Try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      if (response.status === 402)
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Add credits in workspace settings." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("lens-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
