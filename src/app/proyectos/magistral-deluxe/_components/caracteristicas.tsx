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
    image: "/projects/magistral/caracteristicas_images/skybar.png",
    title: "Sky Bar",
    description:
      "Disfruta del mejor panorama de Cayma desde la azotea con un espacio exclusivo para relajarte y socializar.",
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
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-16">
        <h2 className="text-center font-sans text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
          Características y amenidades
        </h2>

        <div className="relative mt-10 lg:mt-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 sm:-ml-4 md:-ml-6">
              {ITEMS.map((item) => (
                <CarouselItem
                  key={item.title}
                  className="basis-full pl-2 sm:pl-4 md:basis-[85%] md:pl-6 lg:basis-[70%]"
                >
                  <article
                    className={cn(
                      "overflow-hidden rounded-xl border-0 bg-card shadow-md",
                      "flex flex-col md:flex-row md:items-stretch",
                    )}
                  >
                    <div className="relative aspect-[16/10] w-full shrink-0 md:aspect-auto md:w-2/5 md:min-h-[280px]">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="object-cover"
                        priority={false}
                      />
                      <div
                        className="absolute left-0 right-0 top-0 h-1 bg-secondary"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                      <h3 className="font-sans text-xl font-semibold text-foreground md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-base text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              className="-left-2 size-10 border-2 border-border bg-background/90 shadow-md hover:bg-background md:-left-6 md:size-12"
              aria-label="Anterior"
            />
            <CarouselNext
              className="-right-2 size-10 border-2 border-border bg-background/90 shadow-md hover:bg-background md:-right-6 md:size-12"
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
