"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES, TRAVEL_MODE_OPTIONS } from "./constants";
import { getEffectiveTravel } from "./utils";
import type { POI } from "./puntos_de_interes";

interface POIListProps {
  pois: POI[];
  hoveredId: number | null;
  onHoverChange: (id: number | null) => void;
  className?: string;
}

export function POIList({
  pois,
  hoveredId,
  onHoverChange,
  className,
}: POIListProps) {
  return (
    <div
      className={cn(
        "flex max-h-[456px] flex-col gap-2 overflow-y-auto pr-1",
        className
      )}
      role="list"
      aria-label="Puntos de interés cercanos"
    >
      {pois.map((poi) => {
        const cat = CATEGORIES[poi.category];
        const { travel, modeId } = getEffectiveTravel(poi);
        const modeLabel = TRAVEL_MODE_OPTIONS[modeId]?.label ?? "A pie";
        const isHovered = hoveredId === poi.id;

        return (
          <div
            key={poi.id}
            role="listitem"
            onMouseEnter={() => onHoverChange(poi.id)}
            onMouseLeave={() => onHoverChange(null)}
            className={cn(
              "flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200",
              isHovered
                ? "translate-x-1 border-opacity-60"
                : "border-border bg-muted/60"
            )}
            style={
              isHovered
                ? {
                  borderColor: `${cat.color}55`,
                  backgroundColor: `${cat.color}12`,
                }
                : undefined
            }
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border"
              style={{
                backgroundColor: `${cat.color}18`,
                borderColor: `${cat.color}30`,
              }}
            >
              <cat.Icon className="size-5" style={{ color: cat.color }} aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-foreground">
                {poi.name}
              </div>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <span style={{ color: cat.color }} className="font-semibold">
                  {travel.distanceMeters} m
                </span>
                <span className="opacity-60">·</span>
                <Clock className="size-3" aria-hidden />
                <span>{travel.travelTimeMinutes} min</span>
                <span className="opacity-80">{modeLabel.toLowerCase()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
