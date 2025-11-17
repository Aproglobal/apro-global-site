// src/components/MapKoreaInteractive.tsx
import React, { useMemo, useRef, useState } from "react";
import Map, { Layer, Source, Popup, NavigationControl, type MapLayerMouseEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { clubsCollection } from "../data/clubsGeo";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;
const KOREA_CENTER: [number, number] = [127.8, 36.5]; // lng, lat
const KOREA_ZOOM = 5.6;
const STYLE_URL = "mapbox://styles/mapbox/light-v11";

// Layers
const clusterLayer: any = {
  id: "clusters",
  type: "circle",
  source: "clubs",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "carts"],
      "#A7F3D0", 50,
      "#34D399", 150,
      "#059669"
    ],
    "circle-radius": [
      "interpolate", ["linear"], ["get", "carts"],
      20, 16,
      80, 26,
      200, 40
    ],
    "circle-opacity": 0.85,
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
    "text-field": ["to-string", ["get", "carts"]],
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

export default function MapKoreaInteractive({
  height = 560,
  fallbackSrc = "/assets/map-korea.png"
}: { height?: number; fallbackSrc?: string; }) {
  const data = useMemo(() => clubsCollection(), []);
  const [popup, setPopup] = useState<any | null>(null);
  const mapRef = useRef<any>(null);

  // Alt+Click to read coordinates (handy while you fill CLUBS_GEO)
  const onAltClick = (e: MapLayerMouseEvent) => {
    if (!e.originalEvent.altKey) return;
    const { lng, lat } = e.lngLat;
    // eslint-disable-next-line no-console
    console.log("lat/lng:", { lat: +lat.toFixed(6), lng: +lng.toFixed(6) });
  };

  // No token? Show a clean static fallback
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
        interactiveLayerIds={["clusters", "unclustered-point"]}
        onClick={(e) => {
          onAltClick(e);
          // Zoom into clusters on click
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
      >
        <NavigationControl position="top-right" />
        <Source
          id="clubs"
          type="geojson"
          data={data as any}
          cluster={true}
          clusterMaxZoom={13}
          clusterRadius={60}
          clusterProperties={{
            // sum total_carts into property 'carts' for cluster bubbles
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
