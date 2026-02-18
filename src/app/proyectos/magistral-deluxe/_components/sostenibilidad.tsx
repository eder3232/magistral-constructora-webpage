"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const PUNTOS = [
  {
    icon: "/projects/magistral/sostenibilidad/lightbulb.png",
    title: "Eficiencia Energética",
    description: "Iluminación LED en todas las áreas comunes del edificio",
  },
  {
    icon: "/projects/magistral/sostenibilidad/water-drop.png",
    title: "Ahorro de Agua",
    description: "Aparatos sanitarios de bajo consumo en cada departamento",
  },
  {
    icon: "/projects/magistral/sostenibilidad/planet-earth.png",
    title: "Materiales Sostenibles",
    description: "Uso de materiales certificados con menor impacto ambiental",
  },
  {
    icon: "/projects/magistral/sostenibilidad/air-quality.png",
    title: "Ventilación Natural",
    description: "Diseño que prioriza luz natural y circulación de aire",
  },
] as const;

const ROOT_MARGIN = "0px 0px -100px 0px";
const THRESHOLD = 0;

export function Sostenibilidad() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

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
      id="sostenibilidad"
      aria-label="Sostenibilidad"
      className={cn(
        "sostenibilidad bg-primary px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32",
        inView && "in-view",
      )}
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="sostenibilidad-title text-center font-sans text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
          Construido pensando en el futuro
        </h2>
        <p className="sostenibilidad-desc mx-auto mt-4 max-w-2xl text-center text-base text-primary-foreground/85 md:text-lg">
          El Edificio Magistral fue diseñado siguiendo las líneas de
          construcciones sostenibles, garantizando un hogar respetuoso con el
          medio ambiente y con las generaciones por venir.
        </p>

        <div className="sostenibilidad-grid mt-12 grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {PUNTOS.map((punto) => (
            <div
              key={punto.title}
              className="sostenibilidad-item flex flex-col items-center text-center"
            >
              <div className="relative h-14 w-14 md:h-16 md:w-16">
                <Image
                  src={punto.icon}
                  alt=""
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="mt-4 font-sans text-lg font-semibold text-primary-foreground md:text-xl">
                {punto.title}
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
                {punto.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
