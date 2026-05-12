import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { PLACES } from "@/data/places";
import { useFavorites } from "@/hooks/useFavorites";
import { PlaceCard } from "@/components/PlaceCard";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { useMemo } from "react";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Your favorites — LocalLens" },
      { name: "description", content: "Saved places, organized by city." },
    ],
  }),
  component: Favorites,
});

function Favorites() {
  const { ids } = useFavorites();
  const saved = useMemo(() => PLACES.filter((p) => ids.includes(p.id)), [ids]);
  const byCity = useMemo(() => {
    const m: Record<string, typeof saved> = {};
    saved.forEach((p) => {
      (m[p.city] ??= []).push(p);
    });
    return m;
  }, [saved]);

  return (
    <div className="relative">
      <BackgroundVideo variant="city" intensity="strong" />
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="font-display text-5xl sm:text-6xl">Your favorites</h1>
          <p className="text-muted-foreground mt-2">{saved.length} place{saved.length !== 1 ? "s" : ""} saved.</p>
        </div>
      </div>

      {saved.length === 0 ? (
        <div className="glass rounded-3xl p-16 text-center max-w-xl mx-auto">
          <div className="h-14 w-14 rounded-full bg-accent/20 grid place-items-center mx-auto">
            <Heart className="h-6 w-6 text-accent" />
          </div>
          <h2 className="font-display text-3xl mt-5">Nothing saved yet.</h2>
          <p className="text-muted-foreground mt-2">Tap the heart on any place to keep it here.</p>
          <Link to="/discover" search={{ city: "Kyoto" }} className="mt-6 inline-block px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:scale-[1.03] transition">
            Discover places
          </Link>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(byCity).map(([city, places]) => (
            <section key={city}>
              <h2 className="font-display text-3xl mb-5">{city}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {places.map((p) => <PlaceCard key={p.id} place={p} />)}
              </div>
            </section>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
