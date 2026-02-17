const BASE = "/home/parrallax-image-marquee";

/**
 * Rutas de las 14 imágenes (1080x720).
 * Fila 1: 7 imágenes. Fila 2: 7 imágenes.
 * Ajusta los nombres si tus archivos tienen otro formato (ej. .webp, row1-01.jpg).
 */
export const parallaxMarqueeImages = {
  row1: [
    `${BASE}/row1-01.png`,
    `${BASE}/row1-02.png`,
    `${BASE}/row1-03.png`,
    `${BASE}/row1-04.png`,
    `${BASE}/row1-05.png`,
    `${BASE}/row1-06.png`,
    `${BASE}/row1-07.png`,
  ],
  row2: [
    `${BASE}/row2-01.png`,
    `${BASE}/row2-02.png`,
    `${BASE}/row2-03.png`,
    `${BASE}/row2-04.png`,
    `${BASE}/row2-05.png`,
    `${BASE}/row2-06.png`,
    `${BASE}/row2-07.png`,
  ],
} as const;
