import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Place } from "@/data/places";
import { useNavigate } from "@tanstack/react-router";

// Custom marker via divIcon — no asset path issues
const makeIcon = (active: boolean) =>
  L.divIcon({
    className: "",
    html: `<div style="
      width:${active ? 36 : 28}px;height:${active ? 36 : 28}px;
      border-radius:50%;
      background:linear-gradient(135deg,#C96A3D,#7A8B6F);
      border:3px solid white;
      box-shadow:0 4px 14px rgba(201,106,61,0.5);
      transform:translate(-50%,-50%);
      transition:all .2s ease;
    "></div>`,
    iconSize: [0, 0],
  });

export function PlacesMap({
  places,
  activeId,
  onSelect,
}: {
  places: Place[];
  activeId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const map = L.map(ref.current, { zoomControl: true, scrollWheelZoom: true }).setView([20, 0], 2);
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, []);

  // Sync markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    places.forEach((p) => {
      const m = L.marker(p.coordinates, { icon: makeIcon(p.id === activeId) })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:Inter,sans-serif;min-width:180px">
            <div style="font-weight:600;font-size:14px;margin-bottom:2px">${p.name}</div>
            <div style="font-size:11px;color:#888">${p.neighbourhood}, ${p.city}</div>
            <div style="font-size:12px;margin-top:6px;color:#444">${p.why_locals_love_it.slice(0, 90)}…</div>
            <a data-id="${p.id}" style="display:inline-block;margin-top:8px;font-size:12px;color:#C96A3D;font-weight:500;cursor:pointer">View details →</a>
          </div>`
        )
        .on("click", () => onSelect?.(p.id))
        .on("popupopen", (e) => {
          const link = (e.popup.getElement() as HTMLElement)?.querySelector(`a[data-id="${p.id}"]`);
          link?.addEventListener("click", () => navigate({ to: "/place/$id", params: { id: p.id } }));
        });
      markersRef.current[p.id] = m;
    });

    if (places.length) {
      const bounds = L.latLngBounds(places.map((p) => p.coordinates));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }
  }, [places, navigate, onSelect, activeId]);

  // Fly to active
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !activeId) return;
    const place = places.find((p) => p.id === activeId);
    if (!place) return;
    map.flyTo(place.coordinates, 14, { duration: 0.8 });
    markersRef.current[activeId]?.openPopup();
    Object.entries(markersRef.current).forEach(([id, m]) => m.setIcon(makeIcon(id === activeId)));
  }, [activeId, places]);

  return <div ref={ref} className="h-full w-full rounded-2xl overflow-hidden" style={{ minHeight: 400 }} />;
}
