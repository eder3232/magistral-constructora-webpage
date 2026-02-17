"use client";

import { useMemo } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Circle,
  OverlayView,
} from "@react-google-maps/api";
import { Building2, Clock } from "lucide-react";
import {
  CATEGORIES,
  COLORS,
  MAP_RING_RADII_METERS,
  MAP_STYLES,
  TRAVEL_MODE_OPTIONS,
} from "./constants";
import { getEffectiveTravel } from "./utils";
import type { POI } from "./puntos_de_interes";
import type { ProjectData } from "./tipos";

const MAP_CONTAINER_STYLE = {
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
};
const DEFAULT_ZOOM = 16;

interface MapSectionProps {
  project: ProjectData;
  pois: POI[];
  filteredPois: POI[];
  hoveredId: number | null;
  onHoverChange: (id: number | null) => void;
  className?: string;
}

function MapLegend() {
  return (
    <div
      className="absolute bottom-6 left-3 flex flex-wrap gap-2 rounded-lg border border-border bg-background/95 px-2.5 py-2 shadow-sm"
      aria-hidden
    >
      {(
        Object.entries(CATEGORIES) as [
          keyof typeof CATEGORIES,
          (typeof CATEGORIES)[keyof typeof CATEGORIES],
        ][]
      ).map(([id, { label, color }]) => (
        <div
          key={id}
          className="flex items-center gap-1.5 rounded-md px-2 py-1"
        >
          <div
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-[10px] font-medium text-muted-foreground">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function PoiMarker({
  poi,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  poi: POI;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const cat = CATEGORIES[poi.category];
  const { travel, modeId } = getEffectiveTravel(poi);
  const modeLabel = TRAVEL_MODE_OPTIONS[modeId]?.label ?? "A pie";

  return (
    <OverlayView
      position={poi.coordinates}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(w, h) => ({ x: -w / 2, y: -h / 2 })}
      zIndex={isHovered ? 20 : 10}
    >
      <div
        className="relative flex cursor-pointer flex-col items-center"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isHovered && (
          <div
            className="absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 rounded-xl border bg-card px-3 py-2 shadow-xl text-card-foreground"
            style={{ borderColor: cat.color }}
          >
            <div className="whitespace-nowrap text-xs font-bold text-foreground">
              {poi.name}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span style={{ color: cat.color }} className="font-semibold">
                {travel.distanceMeters} m
              </span>
              <span className="opacity-60">·</span>
              <Clock className="size-2.5" aria-hidden />
              <span>{travel.travelTimeMinutes} min</span>
              <span className="opacity-80">{modeLabel.toLowerCase()}</span>
            </div>
            <div
              className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-current"
              style={{ borderTopColor: cat.color }}
            />
          </div>
        )}
        {isHovered && (
          <div
            className="absolute h-12 w-12 animate-ping rounded-full opacity-30"
            style={{
              border: `2px solid ${cat.color}`,
              animationDuration: "1.3s",
            }}
          />
        )}
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-background text-primary-foreground shadow-lg transition-all duration-200"
          style={{
            backgroundColor: cat.color,
            transform: isHovered ? "scale(1.15)" : "scale(1)",
            boxShadow: isHovered ? `0 0 16px ${cat.color}99` : undefined,
          }}
        >
          <cat.Icon className="size-4" aria-hidden />
        </div>
      </div>
    </OverlayView>
  );
}

function BuildingMarker({ project }: { project: ProjectData }) {
  return (
    <OverlayView
      position={project.coordinates}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(w, h) => ({ x: -w / 2, y: -h / 2 })}
      zIndex={25}
    >
      <div className="flex flex-col items-center">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-background text-primary-foreground shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
            animation: "ubicacion-glow 2.5s ease-in-out infinite",
          }}
        >
          <Building2 className="size-6" aria-hidden />
        </div>
        <div className="mt-1.5 rounded-md border border-primary/60 bg-primary px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">
          Su nuevo hogar
        </div>
      </div>
    </OverlayView>
  );
}

export function MapSection({
  project,
  pois,
  filteredPois,
  hoveredId,
  onHoverChange,
  className,
}: MapSectionProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-ubicacion",
    googleMapsApiKey: apiKey,
    language: "es",
  });

  const center = useMemo(
    () => ({ lat: project.coordinates.lat, lng: project.coordinates.lng }),
    [project.coordinates.lat, project.coordinates.lng]
  );

  if (!apiKey) {
    return (
      <div
        className={`flex min-h-[400px] items-center justify-center rounded-[1.25rem] border border-border bg-muted ${className ?? ""}`}
      >
        <p className="text-center text-sm text-muted-foreground">
          Configura NEXT_PUBLIC_GOOGLE_MAPS_API_KEY para ver el mapa.
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div
        className={`flex min-h-[400px] items-center justify-center rounded-[1.25rem] border border-border bg-muted ${className ?? ""}`}
      >
        <p className="text-center text-sm text-muted-foreground">
          No se pudo cargar el mapa. Verifica tu conexión.
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className={`animate-pulse rounded-[1.25rem] border border-border bg-muted ${className ?? ""}`}
        style={{ minHeight: 456 }}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[1.25rem] border border-border bg-muted ${className ?? ""}`}
    >
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={center}
        zoom={DEFAULT_ZOOM}
        options={{
          disableDefaultUI: true,
          gestureHandling: "cooperative",
          zoomControl: true,
          styles: MAP_STYLES,
        }}
      >
        {MAP_RING_RADII_METERS.map((radius) => (
          <Circle
            key={radius}
            center={center}
            radius={radius}
            options={{
              fillColor: COLORS.orange,
              fillOpacity:
                0.04 + MAP_RING_RADII_METERS.indexOf(radius) * 0.02,
              strokeColor: COLORS.orange,
              strokeOpacity: 0.15,
              strokeWeight: 1,
              clickable: false,
              zIndex: 1,
            }}
          />
        ))}
        <BuildingMarker project={project} />
        {filteredPois.map((poi) => (
          <PoiMarker
            key={poi.id}
            poi={poi}
            isHovered={hoveredId === poi.id}
            onMouseEnter={() => onHoverChange(poi.id)}
            onMouseLeave={() => onHoverChange(null)}
          />
        ))}
      </GoogleMap>
      <MapLegend />
    </div>
  );
}
