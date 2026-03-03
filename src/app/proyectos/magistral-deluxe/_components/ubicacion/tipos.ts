export type {
  CategoryId,
  TravelModeId,
  TravelInfo,
  POITravel,
  POI,
} from "./puntos_de_interes";
export { POIS } from "./puntos_de_interes";

/** Datos del proyecto (edificio) — coincide con ubicacion_proyecto.json */
export interface ProjectData {
  projectName: string;
  projectAddress: string;
  coordinates: { lat: number; lng: number };
  /** Desplazamiento del centro del mapa en metros (x: este/oeste, y: norte/sur). Opcional. */
  x?: number;
  y?: number;
}
