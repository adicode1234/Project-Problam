import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles, MapPin } from "lucide-react";
import { CATEGORIES, PLACES, SORTS, type Place } from "@/data/places";
import { PlaceCard } from "@/components/PlaceCard";
import { PlacesMap } from "@/components/PlacesMap";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { HOTELS } from "@/data/hotels";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — LocalLens" },
      { name: "description", content: "Search any city. Filter by vibe. Discover places locals actually love." },
      { property: "og:title", content: "Discover hidden places — LocalLens" },
      { property: "og:description", content: "Filter by category, sort by local love. Live map of insider spots." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({ city: (s.city as string) || "" }),
  component: Discover,
});

const PHRASES = [
  "scanning local forums…",
  "analyzing social check-ins…",
  "detecting tourist saturation…",
  "discovering hidden gems…",
];

function Discover() {
  const { city: initial } = Route.useSearch();
  const [query, setQuery] = useState(initial);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Local love");
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [phrase, setPhrase] = useState(0);

  // Run "AI loading" briefly when query changes
  useEffect(() => {
    if (!query) return;
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => setPhrase((p) => (p + 1) % PHRASES.length), 400);
    return () => clearInterval(id);
  }, [loading]);

  const filtered = useMemo(() => {
  let r: any[] = [];

  // HOTELS CATEGORY
  if (category === "Hotels") {
    r = HOTELS.map((hotel) => ({
      id: hotel.id,
      name: hotel.name,
      city: hotel.city,
      neighbourhood: hotel.neighbourhood,
      category: "Hotels",
      image: hotel.image,
      price_range: hotel.price_range,
      why_locals_love_it: hotel.why_stay_here,
      local_love: Math.round(hotel.rating * 20),
      crowd_score: 4,
      coordinates: hotel.coordinates,
      tags: hotel.tags,
    }));
  } else {
    r = PLACES.slice();

    if (category !== "All") {
      r = r.filter((p) => p.category === category);
    }
  }

  // SEARCH FILTER
  if (query.trim()) {
    const q = query.toLowerCase();

    r = r.filter((p) =>
      [
        p.city,
        p.name,
        p.neighbourhood,
        ...(p.tags || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }

  // SORTING
  if (category === "Hidden Gems") {
      r.sort((a, b) => a.crowd_score - b.crowd_score);
    } else if (sort === "Local love") {
      r.sort((a, b) => b.local_love - a.local_love);
    } else if (sort === "Least crowded") {
      r.sort((a, b) => a.crowd_score - b.crowd_score);
    } else if (sort === "Trending") {
      r.sort(
        (a, b) =>
          b.local_love + (10 - b.crowd_score) -
          (a.local_love + (10 - a.crowd_score))
      );
    } else if (sort === "Cheapest") {
      r.sort((a, b) => a.price_range.length - b.price_range.length);
    }
    return r;
  }, [query, category, sort]);

  return (
    <div className="relative">
      <BackgroundVideo variant="river" intensity="strong" />

      <section className="max-w-6xl mx-auto px-6 pt-8 pb-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Sparkles className="h-3 w-3 text-accent" /> Live local intelligence
        </div>
        <h1 className="font-display text-4xl sm:text-6xl">Discover.</h1>
        <p className="text-muted-foreground mt-2">Type a city, vibe, or category. Lens does the rest.</p>

        {/* Search bar */}
        <div className="mt-6 flex items-center gap-2 glass-strong rounded-full p-2 pl-5 shadow-glass max-w-2xl">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Quiet coffee in Tokyo, hidden bars in Paris…"
            className="flex-1 bg-transparent outline-none text-sm py-2"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-xs text-muted-foreground hover:text-foreground px-2">clear</button>
          )}
        </div>

        {/* Filters */}
        <div className="mt-6 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`shrink-0 text-xs px-3.5 py-1.5 rounded-full border transition ${category === c ? "bg-primary text-primary-foreground border-primary" : "bg-card/60 border-border hover:border-accent"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}
              className="bg-card border border-border rounded-full px-3 py-1.5 text-xs outline-none cursor-pointer"
            >
              {SORTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <section className="max-w-6xl mx-auto px-6 pb-4">
          <div className="glass rounded-2xl p-5 flex items-center gap-3 animate-fade-up">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse-soft" />
            <span className="text-sm shimmer-text">{PHRASES[phrase]}</span>
          </div>
        </section>
      )}

      {/* Map + Results */}
      <section className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-[1fr_440px] gap-6">
        <div>
          <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
            <MapPin className="h-3 w-3" /> {filtered.length} place{filtered.length !== 1 ? "s" : ""}
          </div>
          {filtered.length ? (
            <div className="grid sm:grid-cols-2 gap-5">
              {filtered.map((p) => (
                <PlaceCard key={p.id} place={p} onHover={setHover} />
              ))}
            </div>
          ) : (
            <div className="glass rounded-3xl p-12 text-center">
              <div className="font-display text-2xl">No places match.</div>
              <p className="text-sm text-muted-foreground mt-2">Try a broader search or change filters.</p>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 h-[600px] lg:h-[calc(100vh-7rem)] glass rounded-3xl p-2 shadow-glass">
          <PlacesMap places={filtered} activeId={hover} />
        </aside>
      </section>
    </div>
  );
}
