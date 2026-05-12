import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Users, Sparkles } from "lucide-react";
import type { Place } from "@/data/places";
import { useFavorites } from "@/hooks/useFavorites";

export function PlaceCard({ place, onHover }: { place: Place; onHover?: (id: string | null) => void }) {
  const { has, toggle } = useFavorites();
  const fav = has(place.id);

  return (
    <Link
      to="/place/$id"
      params={{ id: place.id }}
      onMouseEnter={() => onHover?.(place.id)}
      onMouseLeave={() => onHover?.(null)}
      className="group glass rounded-3xl overflow-hidden hover:shadow-glass hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(place.id);
          }}
          aria-label="Save"
          className={`absolute top-3 right-3 h-10 w-10 grid place-items-center rounded-full backdrop-blur-md shadow-lg border border-white/20 transition-all duration-300 ${
  fav
    ? "bg-rose-500 text-white scale-105"
    : "bg-black/55 hover:bg-black/75 text-white"
}`}
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-black/65 text-white font-semibold backdrop-blur-md shadow-md border border-white/10">
            {place.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl leading-tight">{place.name}</h3>
            <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {place.neighbourhood}, {place.city}
            </div>
          </div>
          <span className="text-xs text-muted-foreground shrink-0">{place.price_range}</span>
        </div>

        <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-2">
          {place.why_locals_love_it}
        </p>

        <div className="mt-auto pt-4 flex items-center gap-3 text-xs">
          <Score icon={<Sparkles className="h-3 w-3" />} label="Local love" value={place.local_love} tone="accent" />
          <Score icon={<Users className="h-3 w-3" />} label="Crowd" value={place.crowd_score} tone="muted" inverted />
        </div>
      </div>
    </Link>
  );
}

function Score({
  icon,
  label,
  value,
  tone,
  inverted,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone: "accent" | "muted";
  inverted?: boolean;
}) {
  const pct = (value / 10) * 100;
  const color = tone === "accent"
    ? "var(--accent)"
    : inverted
    ? value <= 4 ? "var(--jade, #6aa67c)" : value <= 7 ? "var(--accent)" : "var(--destructive)"
    : "var(--accent)";
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
        <span className="flex items-center gap-1">{icon}{label}</span>
        <span className="font-medium text-foreground">{value}/10</span>
      </div>
      <div className="h-1 rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}
