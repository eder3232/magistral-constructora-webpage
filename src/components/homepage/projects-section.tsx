"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData, type ProjectData } from "./projects-data";
import { Button } from "@/components/ui/button";
import "./projects-section.css";

gsap.registerPlugin(ScrollTrigger);

function ProjectBlock({ project, index }: { project: ProjectData; index: number }) {
  const blockRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers = [
        { ref: subtitleRef, y: 24, delay: 0 },
        { ref: titleRef, y: 36, delay: 0.08 },
        { ref: locationRef, y: 20, delay: 0.12 },
        { ref: lineRef, width: "0%", delay: 0.18 },
        { ref: descRef, y: 24, delay: 0.2 },
        { ref: statsRef, y: 32, delay: 0.28 },
        { ref: featuresRef, y: 20, delay: 0.36 },
        { ref: ctaRef, y: 24, delay: 0.44 },
      ];

      triggers.forEach(({ ref, y, delay }, i) => {
        const el = ref.current;
        if (!el || !blockRef.current) return;
        const isLine = ref === lineRef;
        gsap.fromTo(
          el,
          {
            opacity: 0,
            ...(isLine ? { width: "0%" } : { y }),
          },
          {
            opacity: 1,
            ...(isLine ? { width: "60px" } : { y: 0 }),
            duration: 0.85,
            ease: "power3.out",
            delay,
            scrollTrigger: {
              trigger: blockRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      if (statusRef.current && blockRef.current) {
        gsap.fromTo(
          statusRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.2,
            scrollTrigger: {
              trigger: blockRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (imageWrapRef.current && blockRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          { opacity: 0, x: 80, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: blockRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, blockRef);

    return () => ctx.revert();
  }, [project.id]);

  return (
    <section
      ref={blockRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--projects-bg)" }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <span
              ref={subtitleRef}
              className="uppercase text-xs tracking-[0.25em] block"
              style={{ color: project.accent }}
            >
              {project.subtitle}
            </span>
            <h2
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mt-2 mb-4 lg:mb-6 leading-tight"
              style={{ color: "var(--projects-text)", fontFamily: "var(--projects-font-heading)" }}
            >
              {project.name}
            </h2>
            <div ref={locationRef} className="flex items-center gap-2 mb-6">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={project.accent}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-sm" style={{ color: "var(--projects-text-muted)" }}>
                {project.location}
              </span>
            </div>
            <div
              ref={lineRef}
              className="h-0.5 mb-6 w-0 overflow-hidden"
              style={{ maxWidth: 60, background: project.accent }}
            />
            <p
              ref={descRef}
              className="text-base max-w-lg leading-relaxed mb-8"
              style={{ color: "var(--projects-text-muted)" }}
            >
              {project.description}
            </p>
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {project.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-2 justify-start">
                  <span
                    className="text-3xl md:text-4xl font-bold"
                    style={{ color: "var(--projects-text)", fontFamily: "var(--projects-font-heading)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs uppercase tracking-widest mt-1"
                    style={{ color: "var(--projects-text-muted)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
            <div ref={featuresRef} className="mb-8">
              <span
                className="uppercase text-[10px] tracking-widest block mb-3"
                style={{ color: "var(--projects-text-muted-2)" }}
              >
                Amenidades
              </span>
              <div className="flex flex-wrap gap-2">
                {project.features.map((feat) => (
                  <span
                    key={feat}
                    className="inline-block border px-4 py-1.5 text-sm rounded-full"
                    style={{
                      borderColor: `${project.accent}44`,
                      color: project.accent,
                    }}
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>
            <div ref={ctaRef}>
              <Button
                variant="outline"
                className="uppercase tracking-widest text-sm rounded border-2 hover:bg-white hover:text-slate-900 transition-colors"
                style={{
                  borderColor: project.accent,
                  // color: project.accent,
                }}
              >
                Conocer Proyecto →
              </Button>
            </div>
          </div>

          {/* Right: image */}
          <div ref={imageWrapRef} className="order-1 lg:order-2 relative">
            <div
              ref={statusRef}
              className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide"
              style={{
                background: "var(--projects-bg-overlay)",
                border: `1px solid ${project.statusColor}55`,
                color: project.statusColor,
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: project.statusColor }}
              />
              {project.status}
            </div>
            <div
              className="relative aspect-[3/4] rounded-xl overflow-hidden"
              style={{
                border: `1px solid ${project.accent}22`,
                boxShadow: "var(--projects-shadow)",
              }}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current && headingRef.current) {
        gsap.fromTo(
          lineRef.current,
          { height: 0 },
          {
            height: 60,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }
      [labelRef, titleRef, spanRef, descRef, indicatorsRef].forEach((ref, i) => {
        const el = ref.current;
        if (!el || !headingRef.current) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.1 + i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="projects-section" style={{ background: "var(--projects-bg)" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Section header */}
      <div
        ref={headingRef}
        className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6 relative"
        style={{ background: "var(--projects-bg)" }}
      >
        <div
          ref={lineRef}
          className="w-px overflow-hidden"
          style={{ background: "linear-gradient(to bottom, transparent, var(--projects-header-accent-muted))", marginBottom: 32 }}
        />
        <span
          ref={labelRef}
          className="uppercase text-[11px] tracking-[0.35em] mb-6"
          style={{ color: "var(--projects-header-accent-soft)" }}
        >
          Nuestro trabajo
        </span>
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{ color: "var(--projects-text)", fontFamily: "var(--projects-font-heading)" }}
        >
          Nuestros
          <br />
          <span ref={spanRef} style={{ color: "var(--projects-header-accent)" }}>
            Proyectos
          </span>
        </h1>
        <p
          ref={descRef}
          className="max-w-md text-base leading-relaxed"
          style={{ color: "var(--projects-text-muted)" }}
        >
          Edificios diseñados con pasión, construidos con excelencia. Cada proyecto es una promesa de calidad de vida en Arequipa.
        </p>
        <div
          ref={indicatorsRef}
          className="flex flex-wrap items-center justify-center gap-6 mt-12"
        >
          {projectsData.map((p) => (
            <div key={p.id} className="flex items-center gap-3">
              <div
                className="w-8 h-0.5 rounded-full"
                style={{ background: p.accent }}
              />
              <span className="text-xs tracking-widest" style={{ color: "var(--projects-text-muted-2)" }}>
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {projectsData.map((project, index) => (
        <ProjectBlock key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
