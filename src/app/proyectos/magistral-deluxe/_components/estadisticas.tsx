"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
const STATS = [
  { value: 7, label: "Pisos" },
  { value: 12, label: "Departamentos" },
  { value: 13, label: "Estacionamientos" },
  { value: 1940, label: "m² de área total" },
] as const;

const ROOT_MARGIN = "0px 0px -100px 0px";
const THRESHOLD = 0;

export function Estadisticas() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [inView, setInView] = useState(false);
  const animated = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { rootMargin: ROOT_MARGIN, threshold: THRESHOLD }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || animated.current) return;

    const refs = numberRefs.current.filter(Boolean);
    if (refs.length !== STATS.length) return;

    animated.current = true;

    const duration = 1.5;
    const stagger = 0.2;
    const ease = "power2.out" as const;

    STATS.forEach((stat, i) => {
      const el = refs[i];
      if (!el) return;

      const obj = { value: 0 };

      gsap.to(obj, {
        value: stat.value,
        duration,
        delay: i * stagger,
        ease,
        onUpdate: () => {
          el.textContent = Math.round(obj.value).toLocaleString("es-PE");
        },
      });
    });
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="estadisticas"
      aria-label="Estadísticas del Edificio"
      className="bg-primary px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              <div className="font-display text-5xl font-bold text-primary-foreground md:text-6xl lg:text-6xl">
                <span
                  ref={(el) => {
                    numberRefs.current[i] = el;
                  }}
                >
                  0
                </span>
              </div>
              <div className="mt-3 h-0.5 w-12 rounded-full bg-secondary" />
              <p className="mt-3 text-base text-primary-foreground/90 md:text-lg">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-16 text-center font-display text-lg italic text-primary-foreground/80 md:text-xl">
          Construido con calidad y precisión
        </p>
      </div>
    </section>
  );
}
