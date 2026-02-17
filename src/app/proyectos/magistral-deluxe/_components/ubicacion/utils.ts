import type { POI, POITravel, TravelInfo, TravelModeId } from "./puntos_de_interes";

const MODE_ORDER: TravelModeId[] = ["caminando", "carro_propio", "bus_colectivo"];

/**
 * Obtiene distancia y tiempo para el modo activo. Si el POI no tiene datos
 * para ese modo, devuelve el primer modo disponible.
 */
export function getTravelForMode(
  travel: POITravel,
  activeMode: TravelModeId
): TravelInfo | null {
  if (travel[activeMode]) return travel[activeMode];
  for (const mode of MODE_ORDER) {
    const info = travel[mode];
    if (info) return info;
  }
  return null;
}

export type EffectiveTravelModeId = "caminando" | "carro_propio";

/**
 * Define qué mostrar por POI: si tiempo a pie < 10 min → a pie;
 * si no → en vehículo propio (si existe). Colectivo no se muestra.
 */
export function getEffectiveTravel(poi: POI): {
  travel: TravelInfo;
  modeId: EffectiveTravelModeId;
} {
  const { caminando, carro_propio } = poi.travel;
  if (caminando.travelTimeMinutes < 10) {
    return { travel: caminando, modeId: "caminando" };
  }
  if (carro_propio) {
    return { travel: carro_propio, modeId: "carro_propio" };
  }
  return { travel: caminando, modeId: "caminando" };
}

/**
 * Cuenta POIs con al menos un dato a pie dentro del radio dado (metros).
 */
export function countWithinWalkingRadius(
  pois: POI[],
  radiusMeters: number
): number {
  return pois.filter(
    (p) => p.travel.caminando.distanceMeters <= radiusMeters
  ).length;
}
