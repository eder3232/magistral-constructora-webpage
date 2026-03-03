"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const OVERLAY_OPACITY = 0.4;
const STAGGER_DELAY = 0.2;
const CONTENT_DURATION = 0.8;
const KEN_BURNS_DURATION = 2.5;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Ken Burns: zoom + pan suave en el fondo (entrada) */
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1, x: 0, y: 0 },
          {
            scale: 1.06,
            x: "-1%",
            y: "-1%",
            duration: KEN_BURNS_DURATION,
            ease: "power2.out",
          }
        );
      }

      /* Overlay: fade-in corto */
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          {
            opacity: OVERLAY_OPACITY,
            duration: 0.7,
            ease: "power2.out",
          }
        );
      }

      /* Contenido: stagger (h1 → subtítulo → botón) */
      const contentEls = [titleRef.current, subtitleRef.current, ctaRef.current].filter(Boolean);
      gsap.fromTo(
        contentEls,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: CONTENT_DURATION,
          stagger: STAGGER_DELAY,
          ease: "power3.out",
          delay: 0.25,
        }
      );

      /* Salida ligada al scroll: contenido sube y se desvanece, fondo zoom + parallax */
      if (!sectionRef.current) return;

      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=70%",
          scrub: 0.6,
        },
      });

      if (titleRef.current) {
        exitTl.to(
          titleRef.current,
          { opacity: 0, y: -60, ease: "power2.in" },
          0,
        );
      }
      if (subtitleRef.current) {
        exitTl.to(
          subtitleRef.current,
          { opacity: 0, y: -50, ease: "power2.in" },
          0,
        );
      }
      if (ctaRef.current) {
        exitTl.to(ctaRef.current, { opacity: 0, y: -40, ease: "power2.in" }, 0);
      }
      if (bgRef.current) {
        exitTl.to(
          bgRef.current,
          {
            scale: 1.2,
            y: "-12%",
            x: "-2%",
            ease: "power2.in",
          },
          0,
        );
      }
      if (overlayRef.current) {
        exitTl.to(
          overlayRef.current,
          { opacity: 0.75, ease: "power2.in" },
          0,
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background: wrapper para recortar el Ken Burns */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat origin-center"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            willChange: "transform",
          }}
        />
        {/* Overlay: opacidad inicial 0, GSAP hace fade-in */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Contenido: opacidad y posición iniciales para el stagger */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight mb-6"
          style={{ opacity: 0, transform: "translateY(28px)" }}
        >
          Tu hogar en Arequipa
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl lg:text-2xl text-balance text-gray-100 mb-12 leading-relaxed"
          style={{ opacity: 0, transform: "translateY(28px)" }}
        >
          Departamentos y proyectos inmobiliarios en las mejores zonas de Arequipa
        </p>
        <div
          ref={ctaRef}
          style={{ opacity: 0, transform: "translateY(28px)" }}
        >
          <Button
            size="lg"
            onClick={() => {
              const contactoSection = document.getElementById("contacto");
              if (contactoSection) {
                contactoSection.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Contáctanos
          </Button>
        </div>
      </div>
    </section>
  );
}
