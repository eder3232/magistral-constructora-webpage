export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  location: string;
  status: string;
  statusColor: string;
  description: string;
  stats: ProjectStat[];
  features: string[];
  image: string;
  accent: string;
}

export const projectsData: ProjectData[] = [
  {
    id: "magistral",
    slug: "magistral-deluxe",
    name: "MAGISTRAL",
    subtitle: "Edificio Multifamiliar",
    location: "Calle Los Arces N°220 A, Cayma",
    status: "En Construcción",
    statusColor: "#22c55e",
    description:
      "Un proyecto de 7 niveles diseñado bajo los criterios de construcciones sostenibles. Iluminación LED, aparatos sanitarios de bajo consumo, techos verdes y materiales certificados con menor impacto ambiental.",
    stats: [
      { label: "Pisos", value: "7" },
      { label: "Departamentos", value: "12" },
      { label: "Estacionamientos", value: "13" },
      { label: "m² Área Techada", value: "1,940" },
    ],
    features: ["Sky Bar", "Coworking", "SUM", "Área de Parrilla", "Techos Verdes", "Monta-vehículos"],
    image: "/home/projects/magistral_tiny.png",
    accent: "#5C3500",
  },
  {
    id: "bustamante",
    slug: "residencial-bustamante",
    name: "BUSTAMANTE 702",
    subtitle: "Edificio Multifamiliar",
    location: "Calle Bustamante 702, José Luis Bustamante y Rivero",
    status: "En Proceso de Licencia",
    statusColor: "#f59e0b",
    description:
      "Diseño moderno de 5 niveles con azotea, que integra funcionalidad y confort en cada departamento. Estructura de concreto armado con acabados de primera calidad y áreas comunes pensadas para la convivencia.",
    stats: [
      { label: "Pisos", value: "5" },
      { label: "Departamentos", value: "9" },
      { label: "Estacionamientos", value: "5" },
      { label: "m² Área Techada", value: "1,115" },
    ],
    features: ["SUM", "Área de Parrilla", "Ascensor", "Jardín Interior", "Terraza", "Bicicletero"],
    image: "/home/projects/bustamante_tiny.png",
    accent: "#FFE29E",
  },
];
