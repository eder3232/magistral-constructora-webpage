export type CategoryId =
    | "comercial"
    | "educacion"
    | "salud"
    | "servicios"
// | "recreacion"
// | "transporte"

/** Modos de transporte para distancia y tiempo de llegada */
export type TravelModeId = "caminando" | "carro_propio" | "bus_colectivo";

export interface TravelInfo {
    distanceMeters: number;
    travelTimeMinutes: number;
}

/** Por cada modo de transporte, distancia y tiempo. "A pie" es obligatorio en todos los POIs. */
export interface POITravel {
    caminando: TravelInfo;
    carro_propio?: TravelInfo;
    bus_colectivo?: TravelInfo;
}

export interface POI {
    id: number;
    name: string;
    category: CategoryId;
    coordinates: { lat: number; lng: number };
    travel: POITravel;
    description?: string;
}

export const POIS: POI[] = [
    // --- COMERCIAL ---
    {
        id: 1,
        name: "Real Plaza",
        category: "comercial",
        coordinates: { lat: -16.389171578983113, lng: -71.54947115634027 },
        travel: { caminando: { distanceMeters: 400, travelTimeMinutes: 6 } },
        description: "Supermercado Real Plaza Arequipa"
    },
    {
        id: 2,
        name: "Mall Aventura Plaza",
        category: "comercial",
        coordinates: { lat: -16.390249593444384, lng: -71.54653750762107 },
        travel: { caminando: { distanceMeters: 700, travelTimeMinutes: 11 } },
        description: "Mall Aventura Plaza Cayma"
    },
    {
        id: 3,
        name: "El Tablon Cayma",
        category: "comercial",
        coordinates: { lat: -16.389374356849856, lng: -71.54785338210574 },
        travel: { caminando: { distanceMeters: 400, travelTimeMinutes: 6 } },
        description: "El Tablon Cayma"
    },
    {
        id: 4,
        name: "Presto",
        category: "comercial",
        coordinates: { lat: -16.389852764455195, lng: -71.5463894255504 },
        travel: { caminando: { distanceMeters: 1100, travelTimeMinutes: 16 } },
        description: "Pizzeria Presto Italo Peruana"
    },
    {
        id: 5,
        name: "Polleria El Marques",
        category: "comercial",
        coordinates: { lat: -16.38880769206295, lng: -71.54894164265717 },
        travel: { caminando: { distanceMeters: 250, travelTimeMinutes: 4 } },
        description: "El Marques Original Polleria"
    },
    // --- EDUCACION ---
    {
        id: 6,
        name: "I.E.E. Honorio Delgado",
        category: "educacion",
        coordinates: { lat: -16.387441311216836, lng: -71.54876298238476 },
        travel: { caminando: { distanceMeters: 200, travelTimeMinutes: 3 } },
        description: "Institución Educativa Emblemática Honorio Delgado Espinoza"
    },
    {
        id: 7,
        name: "Lord Byron",
        category: "educacion",
        //-16.391461197683814, -71.55057826578854
        coordinates: { lat: -16.391461197683814, lng: -71.55057826578854 },
        travel: {
            caminando: { distanceMeters: 950, travelTimeMinutes: 14 },
            bus_colectivo: { distanceMeters: 950, travelTimeMinutes: 12 },
            carro_propio: { distanceMeters: 950, travelTimeMinutes: 7 }
        },
        description: "Institución Educativa Lord Byron"
    },
    {
        id: 8,
        name: "Colegio Peruano Britanico",
        category: "educacion",
        //-16.39698538457921, -71.54857673653592
        coordinates: { lat: -16.39698538457921, lng: -71.54857673653592 },
        travel: {
            caminando: { distanceMeters: 1400, travelTimeMinutes: 28 },
            bus_colectivo: { distanceMeters: 1400, travelTimeMinutes: 21 },
            carro_propio: { distanceMeters: 1400, travelTimeMinutes: 11 }
        },
        description: "Colegio Internacional Peruano Britanico"
    },
    {
        id: 9,
        name: "Colegion San Francisco",
        category: "educacion",
        //-16.38132904795041, -71.53987968768362
        coordinates: { lat: -16.38132904795041, lng: -71.53987968768362 },
        travel: {
            caminando: { distanceMeters: 1900, travelTimeMinutes: 27 },
            carro_propio: { distanceMeters: 1900, travelTimeMinutes: 9 }
        },
        description: "Escuela Católica San Francisco de Asis"
    },
    {
        id: 10,
        name: "Colegio San Jose",
        category: "educacion",
        //-16.38579056279642, -71.54939353383283
        coordinates: { lat: -16.38579056279642, lng: -71.54939353383283 },
        travel: {
            caminando: { distanceMeters: 160, travelTimeMinutes: 2 },
            carro_propio: { distanceMeters: 160, travelTimeMinutes: 1 }
        },
        description: "Colegio San Jose de Calasanz Circa"
    },
    {
        id: 11,
        name: "UCSM",
        category: "educacion",
        //-16.405904675635927, -71.54925346764493
        coordinates: { lat: -16.405904675635927, lng: -71.54925346764493 },
        travel: {
            caminando: { distanceMeters: 2700, travelTimeMinutes: 40 },
            bus_colectivo: { distanceMeters: 2700, travelTimeMinutes: 25 },
            carro_propio: { distanceMeters: 2700, travelTimeMinutes: 16 }
        },
        description: "Universidad Católica Santa María"
    },
    {
        id: 12,
        name: "Clinica San Juan de Dios",
        category: "salud",
        //-16.388244932038422, -71.55009683482534
        coordinates: { lat: -16.388244932038422, lng: -71.55009683482534 },
        travel: {
            caminando: { distanceMeters: 450, travelTimeMinutes: 6 },
            carro_propio: { distanceMeters: 450, travelTimeMinutes: 4 }
        },
        description: "Clínica San Juan de Dios Arequipa"
    },
    {
        id: 13,
        name: "Clinica Florez Salud",
        category: "salud",
        //-16.39240161628415, -71.54907297752739
        coordinates: { lat: -16.39240161628415, lng: -71.54907297752739 },
        travel: {
            caminando: { distanceMeters: 800, travelTimeMinutes: 12 },
            carro_propio: { distanceMeters: 800, travelTimeMinutes: 3 }
        },
        description: "Clínica Florez Salud"
    },
    {
        id: 14,
        name: "Policlínico García Bragagnini",
        category: "salud",
        //-16.39192179170642, -71.5484658650659
        coordinates: { lat: -16.39192179170642, lng: -71.5484658650659 },
        travel: {
            caminando: { distanceMeters: 700, travelTimeMinutes: 11 },
            carro_propio: { distanceMeters: 700, travelTimeMinutes: 2 }
        },
        description: "Policlínico García Bragagnini"
    },

    // --- SERVICIOS ---
    {
        id: 15,
        name: "BCP",
        category: "servicios",
        coordinates: { lat: -16.38953367006983, lng: -71.54726078717034 },
        travel: { caminando: { distanceMeters: 450, travelTimeMinutes: 7 } },
        description: "Banco de Crédito del Perú"
    },
    {
        id: 16,
        name: "Interbank",
        category: "servicios",
        coordinates: { lat: -16.38963157660332, lng: -71.54702393554803 },
        travel: { caminando: { distanceMeters: 500, travelTimeMinutes: 7 } },
        description: "Interbank C.C. Cayma"
    },
    {
        id: 17,
        name: "Movistar",
        category: "servicios",
        coordinates: { lat: -16.389081646814322, lng: -71.54873553770376 },
        travel: { caminando: { distanceMeters: 290, travelTimeMinutes: 4 } },
        description: "Movistar Tienda Los Arces Cayma"
    },
    {
        id: 18,
        name: "Banco de la Nación",
        category: "servicios",
        coordinates: { lat: -16.388542010945088, lng: -71.54896976157639 },
        travel: { caminando: { distanceMeters: 210, travelTimeMinutes: 3 } },
        description: "Banco de la Nación"
    }
];
