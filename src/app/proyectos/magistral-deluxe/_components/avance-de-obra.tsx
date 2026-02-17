"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const HITOS = [
  {
    title: "Diseño Arquitectónico",
    status: "completado" as const,
    description: "Planos y memoria descriptiva aprobados",
  },
  {
    title: "Permisos y Licencias",
    status: "completado" as const,
    description: "Aprobación municipal según normativa vigente",
  },
  {
    title: "Excavación",
    status: "en-curso" as const,
    description: "Se está realizando actualmente la excavación del terreno",
  },
  {
    title: "Construcción Estructural",
    status: "proximo" as const,
    description: "Inicio de la estructura de concreto armado",
  },
  {
    title: "Acabados y Entrega",
    status: "proximo" as const,
    description: "Acabados interiores y entrega de departamentos",
  },
];

export function AvanceDeObra() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const hitosRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 30%",
            scrub: true,
          },
        },
      );

      hitosRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1 * i,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="avance-de-obra"
      aria-label="Avance de Obra"
      className="bg-background px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
          El proyecto está en movimiento
        </h2>
        <p className="mt-3 text-center text-base text-muted-foreground md:text-lg">
          Conoce cómo avanza la obra paso a paso
        </p>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Video — en mobile no se muestra; en tablet arriba; en desktop izquierda */}
          <div className="order-1 overflow-hidden rounded-xl lg:order-1">
            <video
              src="/projects/magistral/avance/avance_obra.mp4"
              className="w-full rounded-xl object-cover"
              playsInline
              muted
              loop
              controls
              aria-label="Video del avance de obra"
            >
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>

          {/* Timeline */}
          <div className="order-2 relative lg:order-2">
            <div className="relative flex flex-col">
              {/* Línea vertical que se dibuja al scroll */}
              <div className="absolute left-[19px] top-0 h-full w-0.5 bg-muted-foreground/30 md:left-6">
                <div
                  ref={lineRef}
                  className="h-full w-full origin-top bg-secondary"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>

              {HITOS.map((hito, i) => (
                <div
                  key={hito.title}
                  ref={(el) => {
                    hitosRef.current[i] = el;
                  }}
                  className="relative flex gap-4 pb-10 last:pb-0 md:gap-5"
                >
                  {/* Icono / punto del timeline */}
                  <div className="relative z-10 flex shrink-0 items-center justify-center">
                    {hito.status === "completado" ? (
                      <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary-foreground md:size-12">
                        <Check className="size-5 md:size-6" strokeWidth={2.5} />
                      </div>
                    ) : hito.status === "en-curso" ? (
                      <div className="avance-obra-en-curso flex size-10 items-center justify-center rounded-full border-2 border-secondary bg-background text-secondary md:size-12">
                        <Loader2
                          className="size-5 animate-spin md:size-6"
                          aria-hidden
                        />
                      </div>
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-full border-2 border-muted-foreground bg-background text-muted-foreground md:size-12">
                        <Circle
                          className="size-4 md:size-5"
                          fill="currentColor"
                        />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 pt-1">
                    <h3 className="font-display text-lg font-semibold text-foreground md:text-xl">
                      {hito.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground md:text-base">
                      {hito.description}
                    </p>
                    {hito.status === "completado" && (
                      <span className="mt-2 inline-block text-xs font-medium text-secondary">
                        Completado
                      </span>
                    )}
                    {hito.status === "en-curso" && (
                      <span className="mt-2 inline-block text-xs font-medium text-secondary">
                        En curso
                      </span>
                    )}
                    {hito.status === "proximo" && (
                      <span className="mt-2 inline-block text-xs font-medium text-muted-foreground">
                        Próximo
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
