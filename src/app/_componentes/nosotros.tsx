"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    src: "/home/nosotros/ventas_con_cliente_1.png",
    alt: "Asesores de ventas de Magistral Constructora con clientes",
  },
  {
    src: "/home/nosotros/ventas_con_cliente_2.png",
    alt: "Equipo de ventas atendiendo a clientes",
  },
  {
    src: "/home/nosotros/ventas_con_cliente_3.png",
    alt: "Nuestro personal de ventas con clientes",
  },
] as const;

export function Nosotros() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const desc1Ref = useRef<HTMLParagraphElement>(null);
  const desc2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      const slides = [slide1Ref.current, slide2Ref.current, slide3Ref.current].filter(Boolean);
      if (slides.length !== 3) return;

      const [s1, s2, s3] = slides as [HTMLDivElement, HTMLDivElement, HTMLDivElement];

      gsap.set([s2, s3], { y: "100%", opacity: 0 });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0,
      )
        .fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
          0.1,
        )
        .fromTo(
          desc1Ref.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.2,
        )
        .fromTo(
          desc2Ref.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.3,
        );

      tl.fromTo(
        s1,
        { y: 0, opacity: 1 },
        { y: "-100%", opacity: 0, duration: 1, ease: "power3.inOut" },
        1,
      );
      tl.fromTo(
        s2,
        { y: "100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.inOut" },
        1,
      );
      tl.fromTo(
        s2,
        { y: 0, opacity: 1 },
        { y: "-100%", opacity: 0, duration: 1, ease: "power3.inOut" },
        2,
      );
      tl.fromTo(
        s3,
        { y: "100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.inOut" },
        2,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="relative w-full overflow-hidden bg-background"
      aria-labelledby="nosotros-heading"
    >
      <div
        ref={pinRef}
        className="relative flex min-h-screen w-full flex-col lg:flex-row"
      >
        {/* Columna texto: fija a la izquierda */}
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:max-w-[50%] lg:px-12 lg:py-16">
          <h2
            id="nosotros-heading"
            ref={titleRef}
            className="font-sans text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            Compromiso y experiencia a tu servicio
          </h2>
          <div
            ref={lineRef}
            className="mt-4 h-1 w-14 origin-left rounded-full bg-secondary"
          />
          <p
            ref={desc1Ref}
            className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            En Magistral Constructora nos dedicamos a materializar tu hogar con
            calidad y transparencia. Nuestro equipo te acompaña desde el primer
            contacto hasta la entrega de llaves, con atención personalizada y un
            compromiso firme con los plazos y estándares que prometemos.
          </p>
          <p
            ref={desc2Ref}
            className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Con años de experiencia en Arequipa, conocemos el mercado local y las
            necesidades de las familias. Por eso cada proyecto integra diseño,
            solidez y un servicio cercano para que tu inversión sea tranquila y
            tu experiencia, excelente.
          </p>
        </div>

        {/* Columna carrusel: 3 slides apilados, transición con scroll */}
        <div className="relative flex-1 overflow-hidden lg:min-h-screen">
          <div className="relative h-[60vh] w-full lg:h-screen">
            <div
              ref={slide1Ref}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative h-full w-full max-w-md overflow-hidden rounded-xl border-2 border-secondary/30 shadow-xl">
                <Image
                  src={SLIDES[0].src}
                  alt={SLIDES[0].alt}
                  width={1200}
                  height={1600}
                  className="h-full w-full object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
            <div
              ref={slide2Ref}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative h-full w-full max-w-md overflow-hidden rounded-xl border-2 border-secondary/30 shadow-xl">
                <Image
                  src={SLIDES[1].src}
                  alt={SLIDES[1].alt}
                  width={1200}
                  height={1600}
                  className="h-full w-full object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div
              ref={slide3Ref}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative h-full w-full max-w-md overflow-hidden rounded-xl border-2 border-secondary/30 shadow-xl">
                <Image
                  src={SLIDES[2].src}
                  alt={SLIDES[2].alt}
                  width={1200}
                  height={1600}
                  className="h-full w-full object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
