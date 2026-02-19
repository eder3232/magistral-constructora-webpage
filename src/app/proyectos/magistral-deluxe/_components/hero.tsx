"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const OVERLAY_OPACITY = 0.5;
const STAGGER_DELAY = 0.2;
const CONTENT_DURATION = 0.8;
const KEN_BURNS_DURATION = 3;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Ken Burns: zoom + pan suave en el fondo */
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1, x: 0, y: 0 },
          {
            scale: 1.08,
            x: "-2%",
            y: "-2%",
            duration: KEN_BURNS_DURATION,
            ease: "power2.out",
          },
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
          },
        );
      }

      /* Contenido: stagger (h1 → subtítulo → botón) */
      const contentEls = [
        titleRef.current,
        subtitleRef.current,
        ctaRef.current,
      ].filter(Boolean);
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
        },
      );
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
          className="absolute inset-0 origin-center"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/projects/magistral/hero.png"
            alt="Magistral Deluxe"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* Overlay: opacidad inicial 0, GSAP hace fade-in */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Contenido: opacidad y posición iniciales para el stagger */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-balance leading-tight mb-6"
          style={{ opacity: 0, transform: "translateY(28px)" }}
        >
          MAGISTRAL DELUXE
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl lg:text-2xl text-balance text-gray-100 mb-12 leading-relaxed max-w-3xl mx-auto"
          style={{ opacity: 0, transform: "translateY(28px)" }}
        >
          Experiencia de lujo y confort en el corazón de Cayma
        </p>
        <div ref={ctaRef} style={{ opacity: 0, transform: "translateY(28px)" }}>
          <Button
            size="lg"
            onClick={() => {
              const ubicacionSection = document.getElementById("ubicacion");
              if (ubicacionSection) {
                ubicacionSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Conocer más
          </Button>
        </div>
      </div>
    </section>
  );
}
