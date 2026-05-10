import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, Compass, ArrowRight, Coffee, Trees, Beer, Quote, Search } from "lucide-react";
import { PLACES } from "@/data/places";
import { PlaceCard } from "@/components/PlaceCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuietTrails — Skip the crowds. Find real places." },
      { name: "description", content: "AI-powered local discovery for travelers who want authentic experiences. Hidden gems, local cafes, quiet escapes." },
      { property: "og:title", content: "QuietTrails — Anti-Tourist Travel Guide" },
      { property: "og:description", content: "Travel like a local. Discover places only locals know." },
    ],
  }),
  component: Home,
});

function Counter({ to, label, suffix = "" }: { to: number; label: string; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return (
    <div>
      <div className="font-display text-5xl sm:text-6xl">{n.toLocaleString()}{suffix}</div>
      <div className="text-sm text-muted-foreground mt-2">{label}</div>
    </div>
  );
}

const STEPS = [
  { icon: Search, title: "Scan local data", text: "Forums, social check-ins, and neighborhood news, in real time." },
  { icon: Sparkles, title: "AI analyzes authenticity", text: "Detects tourist saturation and local sentiment." },
  { icon: Compass, title: "Discover real spots", text: "Curated places locals actually love — not the postcard ones." },
];

const TESTIMONIALS = [
  { name: "Mira S.", role: "Designer, Berlin", text: "I planned five days in Kyoto with LocalLens. Not one tourist trap. Found a temple I still dream about." },
  { name: "Diogo P.", role: "Photographer, Lisbon", text: "It sent me to the Tasca on a Monday. The fado singer remembered me by Wednesday." },
  { name: "Ritika G.", role: "Writer, Mumbai", text: "I'm from Kolkata and it told me about a Sunday breakfast market my grandmother used to take me to." },
];

function Home() {
  //const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const featured = PLACES.slice(0, 6);
  const filteredPlaces = PLACES.filter((place) =>
  `${place.name} ${place.city} ${place.neighbourhood}`
    .toLowerCase()
    .includes(query.toLowerCase())
).slice(0, 6);

  return (
    <div className="relative overflow-hidden">
      {/* Cinematic background video — mountains, rivers, sea */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[100vh] min-h-[720px] overflow-hidden">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
        >
          <source
            src="https://cdn.pixabay.com/video/2024/05/12/211641.mp4?download"
            type="video/mp4"
          />
          <source
            src="https://cdn.pixabay.com/video/2020/08/30/48569-454825064_large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Readability overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />
        <div className="absolute inset-0 gradient-hero opacity-60 mix-blend-soft-light" />
      </div>
      <div className="pointer-events-none absolute -top-40 -left-20 -z-10 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl gradient-aurora animate-blob" />
      <div className="pointer-events-none absolute top-1/3 -right-32 -z-10 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl gradient-aurora animate-blob" style={{ animationDelay: "-6s" }} />

      {/* Hero */}
      <section className="relative max-w-5xl mx-auto px-6 pt-12 sm:pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs mb-6 animate-fade-up">
          <Sparkles className="h-3 w-3 text-accent" />
          <span>AI-powered · Real-time local intelligence</span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[1.02] animate-fade-up" style={{ animationDelay: "60ms" }}>
          Skip the crowds.<br />
          <span className="text-aurora">Find real places.</span>
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto animate-fade-up" style={{ animationDelay: "140ms" }}>
          AI-powered local discovery for travelers who want authentic experiences — not tourist checklists.
        </p>

        <div
  className="mt-10 max-w-lg mx-auto animate-fade-up relative"
  style={{ animationDelay: "220ms" }}
>
  <form
    onSubmit={(e) => {
      e.preventDefault();

      if (filteredPlaces.length > 0) {
        window.location.href = `/place/${filteredPlaces[0].id}`;
      }
    }}
    className="flex items-center gap-2 glass-strong rounded-full p-2 pl-5 shadow-glass"
  >
    <Search className="h-4 w-4 text-muted-foreground" />

    <input
      type="text"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        setShowDropdown(true);
      }}
      placeholder="Try Tokyo, Paris, Kolkata…"
      className="flex-1 bg-transparent outline-none text-sm py-2"
    />

    <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:scale-[1.03] transition">
      Discover <ArrowRight className="h-3.5 w-3.5" />
    </button>
  </form>

  {showDropdown && query && (
    <div className="absolute top-full left-0 right-0 mt-3 rounded-3xl overflow-hidden bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl z-50">
      {filteredPlaces.length > 0 ? (
        filteredPlaces.map((place) => (
          <Link
            key={place.id}
            to="/place/$id"
            params={{ id: place.id }}
            onClick={() => setShowDropdown(false)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition"
          >
            <img
              src={place.image}
              alt={place.name}
              className="h-12 w-12 rounded-xl object-cover"
            />

            <div className="text-left">
              <div className="text-sm font-medium text-white">
                {place.name}
              </div>

              <div className="text-xs text-white/60">
                {place.neighbourhood}, {place.city}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="px-4 py-4 text-sm text-white/60">
          No places found
        </div>
      )}
    </div>
  )}
</div>
      </section>

      {/* Stats */}
      <section className="relative max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-3 gap-8 text-center">
          <Counter to={120} label="Cities explored" suffix="+" />
          <Counter to={1840} label="Hidden gems found" />
          <Counter to={92000} label="Local reviews analyzed" suffix="+" />
        </div>
      </section>

      {/* Featured */}
      <section className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl">Featured hidden gems</h2>
            <p className="text-muted-foreground mt-2">Curated this week. Quietly recommended.</p>
          </div>
          <Link to="/discover" search={{ city: "Kyoto" }} className="hidden sm:inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all">
            See all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => <PlaceCard key={p.id} place={p} />)}
        </div>
      </section>

      {/* How it works */}
      <section className="relative max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl">How QuietTrails works</h2>
          <p className="text-muted-foreground mt-3">Three quiet steps to authentic discovery.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div key={s.title} className="glass rounded-3xl p-7 hover:shadow-glass transition animate-fade-up relative" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-xs text-muted-foreground font-mono">0{i + 1}</div>
              <div className="h-12 w-12 rounded-2xl gradient-aurora grid place-items-center mt-3 mb-4 shadow-glow">
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <div className="font-display text-2xl">{s.title}</div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="relative max-w-5xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Coffee, title: "Third-wave coffee", text: "Roasters locals queue for." },
            { icon: Trees, title: "Quiet escapes", text: "Parks, temples, riversides." },
            { icon: Beer, title: "Underground bars", text: "Jazz cellars, neighborhood tascas." },
          ].map((c) => (
            <div key={c.title} className="glass rounded-3xl p-6 hover:-translate-y-1 transition">
              <c.icon className="h-6 w-6 text-accent" />
              <div className="font-display text-2xl mt-3">{c.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{c.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative max-w-6xl mx-auto px-6 py-24">
        <h2 className="font-display text-4xl sm:text-5xl text-center mb-12">Travelers who slowed down.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="glass-strong rounded-3xl p-7 shadow-glass">
              <Quote className="h-5 w-5 text-accent mb-4" />
              <p className="text-[15px] leading-relaxed">{t.text}</p>
              <div className="mt-5 pt-5 border-t border-border/60">
                <div className="font-medium text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="font-display text-5xl sm:text-6xl">Your city, unfiltered.</h2>
        <p className="text-muted-foreground mt-4 max-w-md mx-auto">
          Stop following the same itinerary. Start traveling with someone who actually lives there.
        </p>
        <Link to="/discover" search={{ city: "Kyoto" }} className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground font-medium shadow-glow hover:scale-[1.03] transition">
          Start Exploring <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
