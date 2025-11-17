// src/data/clubsGeo.ts
export type ClubGeo = {
  club_name: string;
  lat: number;
  lng: number;
  province?: string;
  total_carts?: number;
  models?: string; // e.g., "G2 5-seater x 80; VIP 4-seater x 20"
};

export const CLUBS_GEO: ClubGeo[] = [
  // --- sample placeholders (replace with your real list) ---
  { club_name: "Sky Valley CC", province: "Gyeonggi", lat: 37.2996, lng: 127.4310, total_carts: 120, models: "G2 5s x 100, VIP 4s x 20" },
  { club_name: "Crystal Valley CC", province: "Gangwon",  lat: 37.6407, lng: 127.8087, total_carts: 90,  models: "G3 5s x 70, Utility x 20" },
  { club_name: "ClubD Cheongdam", province: "Seoul",     lat: 37.5193, lng: 127.0560, total_carts: 30,  models: "VIP 4s x 30" },
  { club_name: "LakeSide CC",      province: "Gyeonggi",  lat: 37.1447, lng: 127.1083, total_carts: 150, models: "G2 5s x 120, 8s x 30" },
];

export function clubsToGeoJSON(clubs: ClubGeo) {
  return {
    type: "Feature",
    properties: {
      club_name: clubs.club_name,
      province: clubs.province ?? "",
      total_carts: clubs.total_carts ?? 0,
      models: clubs.models ?? "",
    },
    geometry: { type: "Point", coordinates: [clubs.lng, clubs.lat] },
  } as const;
}

export function clubsCollection() {
  return {
    type: "FeatureCollection",
    features: CLUBS_GEO.map(clubsToGeoJSON),
  } as const;
}
