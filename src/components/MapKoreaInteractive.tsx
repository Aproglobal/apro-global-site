// src/components/MapKoreaInteractive.tsx
import React, { useMemo, useState, useRef, useEffect } from "react";
import Map, { Layer, Source, Popup, NavigationControl, type MapLayerMouseEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { clubsCollection } from "../data/clubsGeo";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;
const KOREA_CENTER: [number, number] = [127.8, 36.5]; // lng, lat
const KOREA_ZOOM = 5.6;

// Style: use a Mapbox style or your custom Studio style
const STYLE_URL = "mapbox://styles/mapbox/light-v11"; // feels premium and matches your UI

// ---------- Layers ----------
const clusterLayer: any = {
  id: "clusters",
  type: "circle",
  source: "clubs",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "carts"],      // we’ll accumulate ‘carts’ via clusterProperties
      "#A7F3D0", 50,         // low
      "#34D399", 150,        // medium
      "#059669"              // high
    ],
    "circle-radius": [
      "interpolate", ["linear"], ["get", "carts"],
      20, 16,   // carts 20 → radius 16
      80, 26,   // carts 80 → radius 26
      200, 40   // carts 200 → radius 40
    ],
    "circle-opacity": 0.8,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#ffffff"
  }
};

const clusterCountLayer: any = {
  id: "cluster-count",
  type: "symbol",
  source: "clubs",
  filter: ["has", "point_count"],
  layout: {
    "text-field": [
      "format",
      ["get", "carts"], { "font-scale": 1.0 }
    ],
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12
  },
  paint: { "text-color": "#0b0b0b" }
};

const unclusteredPointLayer: any = {
  id: "unclustered-point",
  type: "circle",
  source: "clubs",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#10B981",
    "circle-radius": [
      "interpolate", ["linear"], ["get", "total_carts"],
      0, 5,
      40, 7,
      100, 9,
      200, 12
    ],
    "circle-stroke-width": 1.5,
    "circle-stroke-color": "#ffffff"
  }
};

// ---------- Component ----------
export default function MapKoreaInteractive({
  height = 520,
  fallbackSrc = "/assets/map-korea.png"
}: {
  height?: number;
  fallbackSrc?: string;
}) {
  const data = useMemo(() => clubsCollection(), []);
  const [popup, setPopup] = useState<any | null>(null);
  const mapRef = useRef<any>(null);

  // alt+click to log lng/lat while you prepare data
  const onAltClick = (e: MapLayerMouseEvent) => {
    if (!e.originalEvent.altKey) return;
    const { lng, lat } = e.lngLat;
    console.log("lat/lng:", { lat: +lat.toFixed(6), lng: +lng.toFixed(6) });
  };

  // If no token → static image fallback (still branded & fast)
  if (!MAPBOX_TOKEN) {
    return (
      <div className="relative">
        <img
          src={fallbackSrc}
          alt="South Korea map"
          className="w-full h-auto rounded-2xl border border-zinc-200 dark:border-zinc-800"
          style={{ maxHeight: height }}
        />
        <div className="mt-2 text-xs text-zinc-500">
          (Interactive map disabled — add <code>VITE_MAPBOX_TOKEN</code> to enable.)
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude: KOREA_CENTER[0], latitude: KOREA_CENTER[1], zoom: KOREA_ZOOM }}
        style={{ width: "100%", height }}
        mapStyle={STYLE_URL}
        onClick={(e) => {
          onAltClick(e);
          // click cluster to zoom in
          const features = e.features ?? [];
          const cluster = features.find((f: any) => f.layer?.id === "clusters");
          if (cluster && mapRef.current) {
            const clusterId = cluster.properties.cluster_id;
            const map = mapRef.current.getMap();
            (map as any).getSource("clubs").getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
              if (err) return;
              map.easeTo({ center: cluster.geometry.coordinates, zoom, duration: 600 });
            });
          }
        }}
        interactiveLayerIds={["clusters", "unclustered-point"]}
        onMouseMove={(e) => {
          const f = (e.features || []).find((x: any) => x.layer?.id === "unclustered-point");
          if (!f) { setPopup(null); return; }
          const p = f.properties;
          setPopup({
            lngLat: e.lngLat,
            club_name: p.club_name,
            province: p.province,
            total_carts: Number(p.total_carts ?? 0),
            models: p.models
          });
        }}
        onMouseLeave={() => setPopup(null)}
      >
        <NavigationControl position="top-right" />

        <Source
          id="clubs"
          type="geojson"
          data={data as any}
          cluster={true}
          clusterMaxZoom={13}
          clusterRadius={60}
          // Sum 'total_carts' into cluster property 'carts'
          clusterProperties={{
            carts: ["+", ["coalesce", ["get", "total_carts"], 0]]
          }}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>

        {popup && (
          <Popup
            closeButton={false}
            longitude={popup.lngLat.lng}
            latitude={popup.lngLat.lat}
            anchor="top-left"
            offset={8}
            maxWidth="280px"
          >
            <div className="text-sm">
              <div className="font-semibold">{popup.club_name}</div>
              {popup.province && <div className="text-xs text-zinc-500">{popup.province}</div>}
              <div className="mt-1">Total carts: <b>{popup.total_carts}</b></div>
              {popup.models && <div className="mt-0.5 text-xs text-zinc-600">{popup.models}</div>}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
