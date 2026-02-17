import type { CategoryId, TravelModeId } from "./puntos_de_interes";
import {
  ShoppingBag,
  Bus,
  GraduationCap,
  Heart,
  Trees,
  MapPin,
  Footprints,
  Building2,
  Car,
  Bus as BusIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Colores alineados con globals.css (primary #003b5c, secondary #ff6a39) */
export const COLORS = {
  primary: "#003b5c",
  secondary: "#ff6a39",
  orange: "#ff6a39",
  orangeLight: "#f08a4a",
  /** Verde para categoría servicios (chart-4) */
  verde: "#b8a530",
  /** Rojo suave para salud (destructive) */
  salud: "#c2410c",
  white: "#FFFFFF",
  graySoft: "#6b7280",
  /** Fondo claro para contenedor del mapa en sección blanca */
  mapContainerBg: "#f5f5f5",
} as const;

/** Categorías con etiqueta, color e icono (paleta del proyecto) */
export const CATEGORIES: Record<
  CategoryId,
  { label: string; color: string; Icon: LucideIcon }
> = {
  comercial: {
    label: "Comercial",
    color: COLORS.orange,
    Icon: ShoppingBag,
  },
  // transporte: {
  //   label: "Transporte",
  //   color: COLORS.graySoft,
  //   Icon: Bus,
  // },
  servicios: {
    label: "Servicios",
    color: COLORS.verde,
    Icon: Building2,
  },
  educacion: {
    label: "Educación",
    color: COLORS.primary,
    Icon: GraduationCap,
  },
  salud: {
    label: "Salud",
    color: COLORS.salud,
    Icon: Heart,
  },
  // recreacion: {
  //   label: "Recreación",
  //   color: "#5a8a5a",
  //   Icon: Trees,
  // },
};

/** Opciones del selector de modo de transporte */
export const TRAVEL_MODE_OPTIONS: Record<
  TravelModeId,
  { label: string; Icon: LucideIcon }
> = {
  caminando: { label: "A pie", Icon: Footprints },
  carro_propio: { label: "En vehículo propio", Icon: Car },
  bus_colectivo: { label: "En colectivo", Icon: BusIcon },
};

/** Id para filtro "Todos" */
export const FILTER_ALL = "todos" as const;

/** Radios de los anillos del mapa en metros */
export const MAP_RING_RADII_METERS = [100, 250, 500, 1000];

/** Estilos del mapa (tema claro, coherente con sección blanca) */
export const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#e8e8e8" }] },
  { elementType: "geometry.fill", stylers: [{ color: "#fafafa" }] },
  { elementType: "geometry.stroke", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: COLORS.graySoft }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: "#dbeafe" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [{ color: "#f5f5f5" }],
  },
];
