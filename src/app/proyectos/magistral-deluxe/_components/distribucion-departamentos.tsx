"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

const BASE_IMAGE = "/projects/magistral/planos/png";
const BASE_PDF = "/projects/magistral/planos/pdf";

/** Orden según construcción: arriba 700, abajo 100, luego semisótano y sótano */
const NIVELES: {
  id: string;
  label: string;
  image: string;
  pdf: string;
  fullWidth?: boolean;
}[] = [
  {
    id: "701",
    label: "701",
    image: `${BASE_IMAGE}/a_701.png`,
    pdf: `${BASE_PDF}/a_701.pdf`,
  },
  {
    id: "702",
    label: "702",
    image: `${BASE_IMAGE}/a_702.png`,
    pdf: `${BASE_PDF}/a_702.pdf`,
  },
  {
    id: "601",
    label: "601",
    image: `${BASE_IMAGE}/a_601.png`,
    pdf: `${BASE_PDF}/a_601.pdf`,
  },
  {
    id: "602",
    label: "602",
    image: `${BASE_IMAGE}/a_602.png`,
    pdf: `${BASE_PDF}/a_601.pdf`,
  },
  {
    id: "501",
    label: "501",
    image: `${BASE_IMAGE}/a_501.png`,
    pdf: `${BASE_PDF}/a_501.pdf`,
  },
  {
    id: "502",
    label: "502",
    image: `${BASE_IMAGE}/a_502.png`,
    pdf: `${BASE_PDF}/a_502.pdf`,
  },
  {
    id: "401",
    label: "401",
    image: `${BASE_IMAGE}/a_401.png`,
    pdf: `${BASE_PDF}/a_401.pdf`,
  },
  {
    id: "402",
    label: "402",
    image: `${BASE_IMAGE}/a_402.png`,
    pdf: `${BASE_PDF}/a_402.pdf`,
  },
  {
    id: "301",
    label: "301",
    image: `${BASE_IMAGE}/a_301.png`,
    pdf: `${BASE_PDF}/a_301.pdf`,
  },
  {
    id: "302",
    label: "302",
    image: `${BASE_IMAGE}/a_302.png`,
    pdf: `${BASE_PDF}/a_302.pdf`,
  },
  {
    id: "201",
    label: "201",
    image: `${BASE_IMAGE}/a_201.png`,
    pdf: `${BASE_PDF}/a_201.pdf`,
  },
  {
    id: "202",
    label: "202",
    image: `${BASE_IMAGE}/a_202.png`,
    pdf: `${BASE_PDF}/a_202.pdf`,
  },
  {
    id: "101",
    label: "101",
    image: `${BASE_IMAGE}/a_101.png`,
    pdf: `${BASE_PDF}/a_101.pdf`,
  },
  {
    id: "102",
    label: "102",
    image: `${BASE_IMAGE}/a_102.png`,
    pdf: `${BASE_PDF}/a_102.pdf`,
  },
  {
    id: "semi_sotano",
    label: "Semisótano",
    image: `${BASE_IMAGE}/semi_sotano.png`,
    pdf: `${BASE_PDF}/semi_sotano.pdf`,
    fullWidth: true,
  },
  {
    id: "sotano",
    label: "Sótano",
    image: `${BASE_IMAGE}/sotano.png`,
    pdf: `${BASE_PDF}/sotano.pdf`,
    fullWidth: true,
  },
];

const ROOT_MARGIN = "0px 0px -100px 0px";
const THRESHOLD = 0;

export function DistribucionDepartamentos() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [selectedId, setSelectedId] = useState<string>(NIVELES[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selected = NIVELES.find((n) => n.id === selectedId) ?? NIVELES[0];
  const preloadSizes = "(max-width: 1023px) 100vw, 60vw";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { rootMargin: ROOT_MARGIN, threshold: THRESHOLD },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="distribucion"
      aria-label="Distribución de Departamentos"
      className={cn("distribucion bg-primary", inView && "in-view")}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
        <h2 className="text-center font-display text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
          Distribución de departamentos
        </h2>

        {/*
          LAYOUT DESKTOP (lg): 60% previsualización imagen | 40% lista de botones.
          LAYOUT MOBILE: imagen + descarga sticky arriba; lista de botones debajo (scroll).
        */}
        <div className="mt-10 flex flex-col gap-6 lg:mt-12 lg:flex-row lg:gap-8">
          {/* Columna izquierda — 60% en desktop; en mobile bloque sticky (imagen + descarga) */}
          <div className="lg:w-[60%] lg:min-w-0 lg:flex-shrink-0">
            {/* En mobile: sticky para que la imagen siga visible al hacer scroll en la lista */}
            <div className="sticky top-0 z-10 -mx-4 bg-primary px-4 pb-4 lg:static lg:mx-0 lg:px-0 lg:pb-0">
              {/* Contenedor de ancho fijo: no cambia de tamaño al cambiar de imagen */}
              <div
                className="relative w-full overflow-hidden rounded-xl border border-primary-foreground/20 bg-card"
                style={{ aspectRatio: "4/3" }}
              >
                {/* Imagen visible */}
                <Image
                  key={selected.id}
                  src={selected.image}
                  alt={`Plano de planta - ${selected.label}`}
                  fill
                  sizes={preloadSizes}
                  className="object-contain p-4"
                />
                {/* Precarga: al entrar la sección en vista se cargan todas (Next/Image = misma URL optimizada). Al hacer hover se prioriza esa imagen. */}
                {inView && (
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0"
                    aria-hidden
                  >
                    {NIVELES.map((nivel) => (
                      <div key={nivel.id} className="absolute inset-0">
                        <Image
                          src={nivel.image}
                          alt=""
                          fill
                          sizes={preloadSizes}
                          className="object-contain p-4"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {hoveredId && hoveredId !== selectedId && (
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0"
                    aria-hidden
                  >
                    <Image
                      src={
                        NIVELES.find((n) => n.id === hoveredId)?.image ??
                        NIVELES[0].image
                      }
                      alt=""
                      fill
                      sizes={preloadSizes}
                      className="object-contain p-4"
                    />
                  </div>
                )}
              </div>
              <a
                href={selected.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex"
                download
                aria-label={`Descargar plano en PDF - ${selected.label}`}
              >
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Descargar plano PDF
                </Button>
              </a>
            </div>
          </div>

          {/* Columna derecha — 40% en desktop; en mobile lista debajo de la imagen sticky */}
          <div className="lg:w-[40%] lg:min-w-0 lg:flex-shrink-0">
            <p className="mb-3 text-sm font-medium text-primary-foreground/90">
              Seleccione un departamento o nivel
            </p>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              {NIVELES.map((nivel) => {
                const isSelected = selectedId === nivel.id;
                return (
                  <Button
                    key={nivel.id}
                    variant="outline"
                    className={cn(
                      "min-h-10 text-sm sm:min-h-11 sm:text-base",
                      nivel.fullWidth && "col-span-2",
                      isSelected
                        ? "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-secondary-foreground"
                        : "border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
                    )}
                    onClick={() => setSelectedId(nivel.id)}
                    onMouseEnter={() => setHoveredId(nivel.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    aria-pressed={isSelected}
                    aria-label={`Plano ${nivel.label}`}
                  >
                    {nivel.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
