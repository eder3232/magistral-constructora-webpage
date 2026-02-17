"use client";

import { Footprints, Bus, ShoppingBag, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { countWithinWalkingRadius } from "./utils";
import type { POI } from "./puntos_de_interes";

interface StatsCardsProps {
  pois: POI[];
  className?: string;
}

/** Score 1-10 según POIs a menos de 500 m a pie */
function walkingScore(pois: POI[]): number {
  const count = countWithinWalkingRadius(pois, 500);
  if (count >= 10) return 10;
  if (count >= 8) return 9;
  if (count >= 6) return 8;
  if (count >= 4) return 7;
  if (count >= 3) return 6;
  if (count >= 2) return 5;
  return count >= 1 ? 4 : 3;
}

/** POI de servicios más cercano (a pie) */
function nearestService(pois: POI[]): { name: string; dist: number } | null {
  const service = pois
    .filter((p) => p.category === "servicios")
    .sort(
      (a, b) =>
        a.travel.caminando.distanceMeters - b.travel.caminando.distanceMeters
    )[0];
  if (!service) return null;
  return {
    name: service.name,
    dist: service.travel.caminando.distanceMeters,
  };
}

/** Cantidad de POIs comerciales */
function commercialCount(pois: POI[]): number {
  return pois.filter((p) => p.category === "comercial").length;
}

export function StatsCards({ pois, className }: StatsCardsProps) {
  const score = walkingScore(pois);
  const service = nearestService(pois);
  const commercial = commercialCount(pois);

  const cards = [
    {
      Icon: Footprints,
      label: "Caminable",
      value: `${score} / 10`,
      sub: "Score de accesibilidad",
    },
    {
      Icon: Bus,
      label: "Servicios",
      value: `Conectividad Total`,
      sub: `Acceso inmediato a transporte público`,
    },
    {
      Icon: ShoppingBag,
      label: "Comercial",
      value: `${commercial} ${commercial === 1 ? "punto" : "puntos"}`,
      sub: "A menos de 1 km",
    },
    {
      Icon: MapPin,
      label: "Ubicación",
      value: "Estratégica",
      sub: "Zona consolidada en Cayma",
    },
  ];

  return (
    <div
      className={cn(
        "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
      role="group"
      aria-label="Métricas de ubicación"
    >
      {cards.map(({ Icon, label, value, sub }, i) => (
        <div
          key={label}
          className="rounded-2xl border border-border bg-card px-4 py-5 text-center text-card-foreground"
        >
          <Icon
            className="mx-auto mb-2 size-6 text-secondary"
            aria-hidden
          />
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
          <div className="mt-1 text-lg font-bold text-secondary">
            {value}
          </div>
          <div className="mt-0.5 truncate break-words text-[10px] text-muted-foreground">{sub}</div>
        </div>
      ))}
    </div>
  );
}
