import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, MapPin, Sparkles, Clock, Users, Lightbulb, UtensilsCrossed, Hotel } from "lucide-react";
import { PLACES } from "@/data/places";
import { HOTELS } from "@/data/hotels";
import { useFavorites } from "@/hooks/useFavorites";
import { PlacesMap } from "@/components/PlacesMap";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

export const Route = createFileRoute("/place/$id")({
  loader: ({ params }) => {
  const foundPlace = PLACES.find((p) => p.id === params.id);

  if (foundPlace) {
    return { place: foundPlace };
  }

  const hotel = HOTELS.find((h) => h.id === params.id);

  if (hotel) {
    return {
      place: {
        ...hotel,

        category: "Hotels",

        why_locals_love_it: hotel.why_stay_here,

        local_love: Math.round(hotel.rating * 2),

        crowd_score: 5,

        best_time: "Anytime",

        what_to_order: "Hotel dining available",

        insider_tip: "Book early for better prices.",

        tags: ["luxury", "stay", "travel"],

        public_transport: null,

        nearby_hotels: [],
      },
    };
  }

  throw notFound();
},

  head: ({ loaderData }) => {
    const p = loaderData?.place;
    return {
      meta: p
        ? [
          { title: `${p.name} — ${p.city} · QuietTrails` },
{
  name: "description",
  content: p.why_locals_love_it,
},
          { property: "og:title", content: `${p.name} — ${p.neighbourhood}, ${p.city}` },
          { property: "og:description", content: p.why_locals_love_it },
          { property: "og:image", content: p.image },
          { property: "twitter:image", content: p.image },
        ]
        : [{ title: "Place — LocalLens" }],
    };
  },
  notFoundComponent: () => (
    <div className="max-w-md mx-auto py-32 text-center">
      <h1 className="font-display text-4xl">Lost the trail.</h1>
      <p className="text-muted-foreground mt-2">This place isn't on our map yet.</p>
      <Link to="/discover" search={{ city: "" }} className="mt-6 inline-block underline">Back to Discover</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="max-w-md mx-auto py-32 text-center">
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <Link to="/discover" search={{ city: "" }} className="mt-4 inline-block underline">Back to Discover</Link>
    </div>
  ),
  component: PlaceDetails,
});

const HOURS = [
  { h: "8a", v: 2 }, { h: "10a", v: 3 }, { h: "12p", v: 6 }, { h: "2p", v: 7 },
  { h: "4p", v: 5 }, { h: "6p", v: 8 }, { h: "8p", v: 9 }, { h: "10p", v: 6 },
];

function PlaceDetails() {
  const { place } = Route.useLoaderData();
  const hotelPlace = place as any;
  const { has, toggle } = useFavorites();
  const fav = has(place.id);
  const nearby = PLACES.filter((p) => p.city === place.city && p.id !== place.id).slice(0, 3);

  return (
    <div className="relative">
      {/* Hero image */}
      <div className="relative h-[55vh] min-h-[400px] -mt-20 overflow-hidden">
        <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/40" />

        <div className="absolute inset-x-0 bottom-0 max-w-6xl mx-auto px-6 pb-10">
          <Link to="/discover" search={{ city: "" }} className="inline-flex items-center gap-1.5 text-xs text-white/90 backdrop-blur-md bg-black/30 px-3 py-1.5 rounded-full hover:bg-black/40">
            <ArrowLeft className="h-3 w-3" /> Back to Discover
          </Link>
          <div className="mt-4 flex items-end justify-between gap-6">
            <div className="text-white drop-shadow-lg">
              <div className="text-xs uppercase tracking-widest opacity-90">{place.category} · {place.price_range}</div>
              <h1 className="font-display text-5xl sm:text-7xl mt-2 leading-[1.05]">{place.name}</h1>
              <div className="mt-2 flex items-center gap-1.5 text-sm opacity-95">
                <MapPin className="h-4 w-4" /> {place.neighbourhood}, {place.city}
              </div>
            </div>
            <button
              onClick={() => toggle(place.id)}
              className={`shrink-0 h-12 w-12 grid place-items-center rounded-full backdrop-blur-md shadow-xl border border-white/20 transition-all duration-300 ${
  fav
    ? "bg-rose-500 text-white scale-105"
    : "bg-black/55 hover:bg-black/75 text-white"
}`}
            >
              <Heart className={`h-5 w-5 ${fav ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
        {/* Main */}
        <div className="lg:col-span-2 space-y-10">
          <div className="glass-strong rounded-3xl p-7 shadow-glass">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-accent" /> AI-generated local summary
            </div>
            <p className="text-lg leading-relaxed mt-3 font-display">
              {place.why_locals_love_it}
            </p>
          </div>

          <Stat label="Local love" value={place.local_love} />
          <Stat label="Crowd score (lower = quieter)" value={place.crowd_score} inverted />

          {/* Crowd timeline */}
          <div>
            <h2 className="font-display text-2xl mb-4">Crowd prediction · today</h2>
            <div className="glass rounded-3xl p-6">
              <div className="flex items-end gap-2 h-32">
                {HOURS.map((h) => (
                  <div key={h.h} className="flex-1 flex flex-col items-center justify-end gap-1.5">
                    <div
                      className="w-full rounded-t-md transition-all hover:opacity-80"
                      style={{
                        height: `${h.v * 14}px`,
                        background:
                          h.v <= 4
                            ? "var(--jade, #6aa67c)"
                            : h.v <= 7
                              ? "var(--accent)"
                              : "var(--destructive)",
                      }}
                    />
                    <span className="text-[10px] text-muted-foreground">{h.h}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: "var(--jade,#6aa67c)" }} /> Quiet</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" /> Moderate</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" /> Crowded</span>
              </div>
            </div>
          </div>
          {/* HOTEL DETAILS */}
<div className="glass rounded-3xl p-6 space-y-5">
  <h2 className="font-display text-3xl">
    Hotel Information
  </h2>

  {/* Address */}
  <div>
    <div className="text-sm text-muted-foreground">
      Address
    </div>

    <div className="mt-1 text-base">
      {hotelPlace.address}
    </div>
  </div>

  {/* Check in/out */}
  <div className="grid sm:grid-cols-2 gap-4">
    <div>
      <div className="text-sm text-muted-foreground">
        Check In
      </div>

      <div className="mt-1">
        {hotelPlace.check_in}
      </div>
    </div>

    <div>
      <div className="text-sm text-muted-foreground">
        Check Out
      </div>

      <div className="mt-1">
        {hotelPlace.check_out}
      </div>
    </div>
  </div>

  {/* Amenities */}
  <div>
    <div className="text-sm text-muted-foreground mb-2">
      Amenities
    </div>

    <div className="flex flex-wrap gap-2">
      {hotelPlace.amenities?.map((item: string) => (
        <span
          key={item}
          className="px-3 py-1 rounded-full bg-secondary text-sm"
        >
          {item}
        </span>
      ))}
    </div>
  </div>

  {/* Nearby attractions */}
  <div>
    <div className="text-sm text-muted-foreground mb-2">
      Nearby Attractions
    </div>

    <div className="flex flex-wrap gap-2">
      {hotelPlace.nearby_attractions?.map((item: string) => (
        <span
          key={item}
          className="px-3 py-1 rounded-full bg-secondary text-sm"
        >
          {item}
        </span>
      ))}
    </div>
  </div>

  {/* Buttons */}
  <div className="flex flex-wrap gap-3 pt-2">
    {hotelPlace.official_website && (
      <a
        href={hotelPlace.official_website}
        target="_blank"
        rel="noopener noreferrer"
        className="px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium"
      >
        Official Website
      </a>
    )}

    {hotelPlace.booking_link && (
      <a
        href={hotelPlace.booking_link}
        target="_blank"
        rel="noopener noreferrer"
        className="px-5 py-3 rounded-full bg-accent text-accent-foreground text-sm font-medium"
      >
        Book Now
      </a>
    )}
  </div>
</div>

          {/* Atmosphere tags */}
          <div>
            <h2 className="font-display text-2xl mb-4">Atmosphere</h2>
            <div className="flex flex-wrap gap-2">
              {place.tags?.map((t: string) => (
                <span key={t} className="px-3 py-1.5 rounded-full glass text-xs">#{t}</span>
              ))}
            </div>
          </div>

          {/* Nearby */}
          {nearby.length > 0 && (
            <div>
              <h2 className="font-display text-2xl mb-4">Nearby hidden gems</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {nearby.map((n) => (
                  <Link key={n.id} to="/place/$id" params={{ id: n.id }} className="group glass rounded-2xl overflow-hidden hover:shadow-glass transition">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={n.image} alt={n.name} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-muted-foreground">{n.category}</div>
                      <div className="font-medium mt-0.5">{n.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <Info icon={<Clock className="h-4 w-4" />} title="Best time" body={place.best_time} />
          <Info icon={<UtensilsCrossed className="h-4 w-4" />} title="What to order" body={place.what_to_order} />
          <Info icon={<Lightbulb className="h-4 w-4" />} title="Insider tip" body={place.insider_tip} accent />
          <Info icon={<Users className="h-4 w-4" />} title="Neighbourhood" body={`${place.neighbourhood}, ${place.city}`} />
          {place.public_transport?.nearest_airport && (
            <>
              {place.public_transport.nearest_airport && (
                <Info
                  icon={<MapPin className="h-4 w-4" />}
                  title="Nearest Airport"
                  body={place.public_transport.nearest_airport}
                />
              )}

              {place.public_transport.nearest_railway && (
                <Info
                  icon={<MapPin className="h-4 w-4" />}
                  title="Nearest Railway"
                  body={place.public_transport.nearest_railway}
                />
              )}

              {place.public_transport.nearest_bus_stop && (
                <Info
                  icon={<MapPin className="h-4 w-4" />}
                  title="Nearest Bus Stop"
                  body={place.public_transport.nearest_bus_stop}
                />
              )}
            </>
          )}
          {place.nearby_hotels?.length > 0 && (
            <div className="glass rounded-2xl p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Hotel className="h-4 w-4" />
                Nearby Hotels
              </div>

              <div className="mt-4 space-y-3">
                {place.nearby_hotels.map((hotel, idx) => (
                  <div
                    key={idx}
                    className="border border-border rounded-xl p-3 bg-card/40"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">
                        {hotel.name}
                      </div>

                      <span className="text-xs px-2 py-1 rounded-full bg-accent/20">
                        {hotel.price_range}
                      </span>
                    </div>

                    <div className="text-xs text-muted-foreground mt-1 capitalize">
                      {hotel.tier}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="glass rounded-3xl p-2 h-72">
            <PlacesMap places={[place as any]} />
          </div>
        </aside>
      </section>
    </div>
  );
}

function Info({ icon, title, body, accent }: { icon: React.ReactNode; title: string; body: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 ${accent ? "bg-accent/15 border border-accent/30" : "glass"}`}>
      <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">{icon}{title}</div>
      <div className="text-sm mt-2 leading-relaxed">{body}</div>
    </div>
  );
}

function Stat({ label, value, inverted }: { label: string; value: number; inverted?: boolean }) {
  const color = inverted
    ? value <= 4 ? "var(--jade,#6aa67c)" : value <= 7 ? "var(--accent)" : "var(--destructive)"
    : "var(--accent)";
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-display text-2xl">{value}/10</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${value * 10}%`, background: color }} />
      </div>
    </div>
  );
}
