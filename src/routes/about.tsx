import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Sparkles, Heart, Globe } from "lucide-react";
import { BackgroundVideo } from "@/components/BackgroundVideo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — LocalLens" },
      { name: "description", content: "Why we built LocalLens. The anti-tourist travel guide." },
      { property: "og:title", content: "About LocalLens" },
      { property: "og:description", content: "We believe the best places aren't on top-10 lists. They're in conversations between locals." },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: Heart, title: "Local-first", text: "We surface what locals love, not what tour groups visit." },
  { icon: Sparkles, title: "AI with taste", text: "Models trained on local sentiment — not affiliate kickbacks." },
  { icon: Globe, title: "Quiet by design", text: "We measure crowd levels and recommend off-peak. Your trip, not theirs." },
  { icon: Compass, title: "Always curious", text: "New cities every month. Fresh insights every week." },
];

function About() {
  return (
    <div className="relative">
      <BackgroundVideo variant="mountain" intensity="strong" />

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Our manifesto</div>
        <h1 className="font-display text-5xl sm:text-7xl mt-3 leading-[1.05]">
          The best places aren't on top-10 lists.<br />
          <span className="text-aurora">They're in conversations between locals.</span>
        </h1>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12 prose-lg">
        <p className="text-lg leading-relaxed text-muted-foreground">
          QuietTrails started after a trip to Kyoto where we spent four days in line for the same temples
          everyone else was photographing. On the fifth morning, a barista pointed us toward a mossy
          shrine three blocks from the tourist route. It was empty, beautiful, and felt like the
          city's secret. We thought: what if AI could be that barista — for every traveler, in every city?
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground mt-6">
          So we built one. We scan local forums, neighborhood blogs, social check-ins, and news in real time.
          Our models look for places with high local engagement and low tourist saturation. Then we hand you
          a curated map — quiet, honest, recommended like a friend would.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="glass rounded-3xl p-7 hover:shadow-glass transition">
              <div className="h-11 w-11 rounded-2xl gradient-aurora grid place-items-center shadow-glow">
                <v.icon className="h-5 w-5 text-white" />
              </div>
              <div className="font-display text-2xl mt-4">{v.title}</div>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="font-display text-4xl sm:text-5xl">Travel quietly. Find more.</h2>
        <Link to="/discover" search={{ city: "" }} className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-medium shadow-glow hover:scale-[1.03] transition">
          Start exploring
        </Link>
      </section>
    </div>
  );
}
