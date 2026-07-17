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

    /* --- Precarga de los frames --- */
    const images: HTMLImageElement[] = [];
    const state = { frame: 0 };
    let currentFrame = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      images[i - 1] = img;
    }

    /* --- Dibujo con ajuste "cover" (centrado, sin deformar) --- */
    const drawFrame = (index: number) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      context.clearRect(0, 0, cw, ch);
      context.drawImage(img, dx, dy, dw, dh);
    };

    const render = () => {
      const next = Math.round(state.frame);
      currentFrame = next;
      drawFrame(next);
    };

    /* --- Tamaño del canvas según el contenedor + densidad de pantalla --- */
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      drawFrame(currentFrame);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    /* Dibuja el primer frame en cuanto cargue (evita canvas en blanco) */
    if (images[0]) {
      if (images[0].complete && images[0].naturalWidth > 0) {
        drawFrame(0);
      } else {
        images[0].addEventListener("load", () => drawFrame(0), { once: true });
      }
    }

    /* Recalcular posiciones cuando termine de cargar el último frame */
    const last = images[TOTAL_FRAMES - 1];
    const onLastLoad = () => ScrollTrigger.refresh();
    if (last && !last.complete) {
      last.addEventListener("load", onLastLoad, { once: true });
    }

    /* --- Respeta "reduce motion": frame estático, sin pin ni scrub --- */
    // `?motion=full` / `?motion=reduce` fuerza el modo (útil para previsualizar
    // en una máquina con "reduce motion" activado); por defecto respeta el SO.
    const motionParam = new URLSearchParams(window.location.search).get("motion");
    const prefersReduced =
      motionParam === "reduce" ||
      (motionParam !== "full" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Muestra un frame intermedio (oficinas ya a la vista) sin animar.
        const staticFrame = TOTAL_FRAMES - 1;
        const showStatic = () => drawFrame(staticFrame);
        currentFrame = staticFrame;
        if (images[staticFrame]?.complete) showStatic();
        else images[staticFrame]?.addEventListener("load", showStatic, { once: true });
        gsap.set(textBRef.current, { opacity: 1, y: 0 });
        gsap.set(textARef.current, { opacity: 0 });
        return;
      }

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
          onUpdate: render,
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
      window.removeEventListener("resize", resizeCanvas);
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
