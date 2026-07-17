"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Config de la secuencia de frames (ver public/hero_drone/README.md) */
/* ------------------------------------------------------------------ */
const TOTAL_FRAMES = 60;
const frameSrc = (i: number) =>
  `/hero_drone/frame_${String(i).padStart(4, "0")}.jpg`; // frame_0001.jpg …

/* Cuánto scroll dura el scrub (300% = 3 alturas de viewport de recorrido). */
const SCRUB_LENGTH = "+=300%";

/* Tope de densidad de pixel: 1.5 basta para un fondo full-bleed y ahorra RAM. */
const MAX_DPR = 1.5;

/* Debajo de este ancho mostramos un frame estático (rendimiento en móvil). */
const MOBILE_BREAKPOINT = 768;

/* Frame que se muestra en modo estático (la "llegada" a las oficinas). */
const STATIC_FRAME_INDEX = TOTAL_FRAMES - 1;

/* ------------------------------------------------------------------ */
/* Copys del overlay — edítalos aquí sin tocar la lógica              */
/* ------------------------------------------------------------------ */
const TEXT_A = {
  eyebrow: "AREQUIPA",
  title: "Construimos donde vivimos",
};
const TEXT_B = {
  eyebrow: "NUESTRAS OFICINAS",
  title: "Aquí empieza tu proyecto",
};

export function DroneReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textARef = useRef<HTMLDivElement>(null);
  const textBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    /* --- Decidir modo: animado vs. estático ---
       En desktop siempre anima (muestra los frames al hacer scroll). En móvil
       usa un frame estático por rendimiento (evita cargar los ~24MB de frames).
       `?motion=full` / `?motion=reduce` fuerza el modo para previsualizar. */
    const motionParam = new URLSearchParams(window.location.search).get("motion");
    const staticMode =
      motionParam === "full"
        ? false
        : motionParam === "reduce"
          ? true
          : window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;

    /* --- Pintado con ajuste "cover" (centrado, sin deformar) --- */
    let currentImg: HTMLImageElement | null = null;
    const paint = (img: HTMLImageElement) => {
      if (!img.complete || img.naturalWidth === 0) return;
      currentImg = img;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      context.clearRect(0, 0, cw, ch);
      context.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    /* --- Tamaño del canvas según contenedor + densidad de pantalla --- */
    const sizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      if (currentImg) paint(currentImg); // repintar el frame vigente
    };
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);

    /* =============================================================== */
    /* MODO ESTÁTICO: una sola imagen, sin pin ni scrub (rápido)       */
    /* =============================================================== */
    if (staticMode) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(STATIC_FRAME_INDEX + 1);
      const show = () => paint(img);
      if (img.complete && img.naturalWidth) show();
      else img.addEventListener("load", show, { once: true });

      gsap.set(textARef.current, { opacity: 0 });
      gsap.set(textBRef.current, { opacity: 1, y: 0 });

      return () => window.removeEventListener("resize", sizeCanvas);
    }

    /* =============================================================== */
    /* MODO ANIMADO: precarga los 60 frames + pin + scrub              */
    /* =============================================================== */
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      images[i - 1] = img;
    }

    let currentIndex = -1;
    const drawIndex = (index: number) => {
      if (index === currentIndex) return; // guard: evita redibujar el mismo frame
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      currentIndex = index;
      paint(img);
    };

    /* Decodifica y muestra el primer frame cuanto antes (evita canvas negro) */
    const first = images[0];
    const showFirst = () => drawIndex(0);
    if (first.complete && first.naturalWidth) {
      showFirst();
    } else if (typeof first.decode === "function") {
      first.decode().then(showFirst).catch(() => {
        first.addEventListener("load", showFirst, { once: true });
      });
    } else {
      first.addEventListener("load", showFirst, { once: true });
    }

    /* Recalcular posiciones cuando cargue el último frame (cambia el layout) */
    const last = images[TOTAL_FRAMES - 1];
    const onLastLoad = () => ScrollTrigger.refresh();
    if (last && !last.complete) {
      last.addEventListener("load", onLastLoad, { once: true });
    }

    const state = { frame: 0 };
    const ctx = gsap.context(() => {
      gsap.set(textARef.current, { opacity: 0, y: 24 });
      gsap.set(textBRef.current, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: SCRUB_LENGTH,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* Frames: barre 0 → último a lo largo de todo el scroll */
      tl.to(
        state,
        {
          frame: TOTAL_FRAMES - 1,
          ease: "none",
          snap: { frame: 1 },
          onUpdate: () => drawIndex(Math.round(state.frame)),
          duration: 1,
        },
        0,
      );

      /* Texto A: entra al inicio (sobre el horizonte) y sale a la mitad */
      tl.to(textARef.current, { opacity: 1, y: 0, ease: "power2.out", duration: 0.12 }, 0.04)
        .to(textARef.current, { opacity: 0, y: -24, ease: "power2.in", duration: 0.12 }, 0.4);

      /* Texto B: entra al aterrizar en las oficinas */
      tl.to(textBRef.current, { opacity: 1, y: 0, ease: "power2.out", duration: 0.14 }, 0.6);
    }, sectionRef);

    return () => {
      window.removeEventListener("resize", sizeCanvas);
      last?.removeEventListener("load", onLastLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      aria-label="Vista aérea de Arequipa hacia las oficinas de Magistral Constructora"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Scrim: oscurece arriba y abajo para que el texto se lea sobre el cielo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60"
      />

      {/* Overlays de texto (cross-fade con el scroll) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center">
        <div ref={textARef} className="absolute max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
            {TEXT_A.eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            {TEXT_A.title}
          </h2>
        </div>

        <div ref={textBRef} className="absolute max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
            {TEXT_B.eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            {TEXT_B.title}
          </h2>
        </div>
      </div>
    </section>
  );
}
