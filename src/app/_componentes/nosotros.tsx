"use client";

import Image from "next/image";

export function Nosotros() {
  return (
    <section
      id="nosotros"
      className="relative w-full overflow-hidden bg-background py-16 md:py-24 lg:py-32"
      aria-labelledby="nosotros-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Texto */}
            <div>
              <h2
                id="nosotros-heading"
                className="font-sans text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
              >
                Compromiso y experiencia a tu servicio
              </h2>
              <div className="mt-4 h-1 w-14 rounded-full bg-secondary" />
              <p className="mt-6 text-base text-muted-foreground leading-relaxed md:text-lg">
                En Magistral Constructora nos dedicamos a materializar tu hogar
                con calidad y transparencia. Nuestro equipo te acompaña desde el
                primer contacto hasta la entrega de llaves, con atención
                personalizada y un compromiso firme con los plazos y estándares
                que prometemos.
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed md:text-lg">
                Con años de experiencia en Arequipa, conocemos el mercado local
                y las necesidades de las familias. Por eso cada proyecto integra
                diseño, solidez y un servicio cercano para que tu inversión sea
                tranquila y tu experiencia, excelente.
              </p>
            </div>

            {/* Imagen con decorador en secundario */}
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-2xl bg-secondary/20"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-xl border-2 border-secondary/30 shadow-lg">
                <Image
                  src="/home/nosotros/nosotros.jpg"
                  alt="Equipo de Magistral Constructora atendiendo a clientes en oficina"
                  width={800}
                  height={533}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
