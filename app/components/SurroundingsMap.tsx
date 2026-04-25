"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";

export type Place = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  duration?: string;
};

type Props = {
  places: Place[];
  home: Place;
  activeId: string | null;
  onActiveChange?: (id: string | null) => void;
};

const COLORS = {
  ivoire: "#F7F4EE",
  ivoire90: "#F2EEE6",
  pierre: "#E8E1D5",
  brun: "#2A1F14",
  terracotta: "#B8553A",
  olive: "#6B7A5A",
};

function FitBounds({
  bounds,
}: {
  bounds: L.LatLngBoundsExpression;
}) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [32, 32] });
  }, [map, bounds]);
  return null;
}

function homeIcon() {
  const html = `
    <div style="
      position: relative;
      transform: translate(-50%, -100%);
    ">
      <svg width="34" height="42" viewBox="0 0 34 42" fill="none" aria-hidden="true">
        <path d="M17 0 C7.6 0 0 7.6 0 17 C0 28 17 42 17 42 S34 28 34 17 C34 7.6 26.4 0 17 0 Z"
              fill="${COLORS.terracotta}" stroke="${COLORS.ivoire}" stroke-width="1.5"/>
        <circle cx="17" cy="16" r="5" fill="${COLORS.ivoire}"/>
      </svg>
    </div>
  `;
  return L.divIcon({
    className: "lf-home-pin",
    html,
    iconSize: [34, 42],
    iconAnchor: [17, 42],
  });
}

export default function SurroundingsMap({
  places,
  home,
  activeId,
  onActiveChange,
}: Props) {
  const allCoords = useMemo<L.LatLngTuple[]>(
    () => [
      [home.lat, home.lng],
      ...places.map((p) => [p.lat, p.lng] as L.LatLngTuple),
    ],
    [home, places],
  );
  const bounds = useMemo<L.LatLngBoundsExpression>(
    () => L.latLngBounds(allCoords).pad(0.1),
    [allCoords],
  );

  return (
    <MapContainer
      bounds={bounds}
      scrollWheelZoom={false}
      attributionControl
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.ivoire90,
        borderRadius: "inherit",
      }}
    >
      <FitBounds bounds={bounds} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
      />

      {/* Pin maison */}
      <Marker position={[home.lat, home.lng]} icon={homeIcon()}>
        <Tooltip
          permanent
          direction="right"
          offset={[12, -22]}
          className="lf-tooltip lf-tooltip-home"
        >
          {home.name}
        </Tooltip>
      </Marker>

      {/* Villages */}
      {places.map((p) => (
        <VillageMarker
          key={p.id}
          place={p}
          isActive={activeId === p.id}
          onActiveChange={onActiveChange}
        />
      ))}
    </MapContainer>
  );
}

function VillageMarker({
  place,
  isActive,
  onActiveChange,
}: {
  place: Place;
  isActive: boolean;
  onActiveChange?: (id: string | null) => void;
}) {
  const ref = useRef<L.CircleMarker | null>(null);

  useEffect(() => {
    if (isActive) ref.current?.bringToFront();
  }, [isActive]);

  return (
    <CircleMarker
      ref={ref}
      center={[place.lat, place.lng]}
      radius={isActive ? 9 : 5}
      pathOptions={{
        color: COLORS.ivoire,
        weight: isActive ? 2 : 1.25,
        fillColor: isActive ? COLORS.terracotta : COLORS.olive,
        fillOpacity: isActive ? 1 : 0.85,
      }}
      eventHandlers={{
        mouseover: () => onActiveChange?.(place.id),
        mouseout: () => onActiveChange?.(null),
      }}
    >
      <Tooltip
        permanent={isActive}
        direction="top"
        offset={[0, -8]}
        className={`lf-tooltip ${isActive ? "lf-tooltip-active" : ""}`}
      >
        {place.name}
        {place.duration ? ` · ${place.duration}` : ""}
      </Tooltip>
    </CircleMarker>
  );
}
