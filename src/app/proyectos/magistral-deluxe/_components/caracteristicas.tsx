"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const ITEMS = [
  {
    image: "/projects/magistral/caracteristicas_images/recepcion.png",
    title: "Recepción",
    description:
      "Un espacio moderno y funcional para recibir a los invitados y ofrecer un servicio de primera clase.",
  },
  {
    image: "/projects/magistral/caracteristicas_images/coworking.png",
    title: "Coworking",
    description:
      "Un ambiente moderno y tranquilo para trabajar desde casa sin salir del edificio.",
  },
  {
    image: "/projects/magistral/caracteristicas_images/area_parrilla.png",
    title: "Área de Parrilla",
    description:
      "Celebra los momentos más importantes con tu familia en un espacio diseñado para compartir.",
  },
  {
    image: "/projects/magistral/caracteristicas_images/techos_verdes.png",
    title: "Techos Verdes",
    description:
      "Espacios verdes integrados que contribuyen al bienestar de los residentes y al medio ambiente.",
  },
  {
    image: "/projects/magistral/caracteristicas_images/estacionamientos.png",
    title: "Estacionamiento",
    description:
      "13 estacionamientos vehiculares y 7 espacios para bicicletas en niveles subterráneos.",
  },
  {
    image: "/projects/magistral/caracteristicas_images/dormitorio.png",
    title: "Departamentos de 2 y 3 Dormitorios",
    description:
      "Espacios amplios y funcionales adaptados para familias de diferentes tamaños.",
  },
] as const;

export function CaracteristicasV2() {
  const [api, setApi] = useState<CarouselApi>(undefined);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section
      id="caracteristicas"
      aria-label="Características"
      className="bg-background py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="text-center font-sans text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
          Características y amenidades
        </h2>

        <div className="relative mt-10 lg:mt-14">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {ITEMS.map((item) => (
                <CarouselItem key={item.title} className="basis-full pl-0">
                  <article className="group relative w-full overflow-hidden rounded-2xl bg-card shadow-xl ring-1 ring-border/50">
                    {/* Imagen 1800×1200 — ratio 3:2, ancho completo */}
                    <div className="relative aspect-3/2 w-full">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 1280px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        priority={false}
                      />
                      {/* Franja inferior con gradiente para legibilidad */}
                      <div
                        className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-linear-to-t from-black/85 via-black/50 to-transparent pt-24 pb-6 pl-5 pr-5 md:pb-8 md:pl-8 md:pr-8"
                        aria-hidden
                      />
                      {/* Contenido superpuesto */}
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-8">
                        <div className="mx-auto max-w-3xl">
                          <span className="mb-1 block h-0.5 w-12 bg-secondary" aria-hidden />
                          <h3 className="font-sans text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
                            {item.title}
                          </h3>
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base lg:text-lg">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              className="-left-3 size-11 border-2 border-border bg-background/95 shadow-lg hover:bg-background md:-left-4 md:size-12"
              aria-label="Anterior"
            />
            <CarouselNext
              className="-right-3 size-11 border-2 border-border bg-background/95 shadow-lg hover:bg-background md:-right-4 md:size-12"
              aria-label="Siguiente"
            />
          </Carousel>

          {/* Indicadores (dots) */}
          <div className="mt-6 flex justify-center gap-2">
            {ITEMS.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Ir a característica ${index + 1}`}
                aria-current={selectedIndex === index ? "true" : undefined}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
                  selectedIndex === index
                    ? "scale-125 bg-secondary"
                    : "bg-muted-foreground/40 hover:bg-muted-foreground/60",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
