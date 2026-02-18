import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bell, CalendarClock, Info, MapPin, Route } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CtaSection } from "@/app/_componentes/cta-section";

export default function Page() {
  return (
    <main className="min-h-screen bg-muted">
      <section className="relative overflow-hidden bg-primary pt-16 md:pt-20">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-20">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Próximamente
              </Badge>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground/70">
                <Info className="h-3.5 w-3.5" />
                Información en preparación
              </span>
            </div>

            <h1 className="mt-5 font-serif text-4xl font-light leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Residencial
              <br />
              <span className="italic text-secondary">Bustamante</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
              Estamos afinando detalles de diseño, acabados, tipologías y
              disponibilidad. Esta página se publicará muy pronto con
              información completa y actualizada.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="secondary" className="font-semibold">
                <Link href="/proyectos">
                  <ArrowLeft className="h-4 w-4" />
                  Ver otros proyectos
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="bg-white/5 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground border-white/15"
              >
                <Link href="/#contacto">
                  <Bell className="h-4 w-4" />
                  Quiero que me contacten
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-primary-foreground/80">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-secondary" />
                Coop. Manuel Prado N° 58, Mz E Lote 28 – J.L. Bustamante y Rivero, Arequipa
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-secondary" />
                Fecha de lanzamiento: por anunciar
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/20">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/projects/bustamante/hero.png"
                  alt="Imagen referencial del proyecto Residencial Bustamante"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs leading-relaxed text-primary-foreground/85">
                    Imagen referencial. Sujeta a cambios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-12">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="h-5 w-5 text-secondary" />
                Ubicación y vías de acceso
              </CardTitle>
              <CardDescription>
                Dirección y conectividad del proyecto.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-sm font-semibold text-foreground">Dirección</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Coop. de Vivienda Popular Manuel Prado N° 58, Mz E Lote 28 – José Luis Bustamante y Rivero – Arequipa.
                </p>
              </div>
              <Separator />
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Route className="h-4 w-4 text-secondary" />
                  Vías de comunicación y acceso a la zona
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Se encuentra en la Calle Indo con 10.50 ml de sección de vía. A 550 m de la Av. Los Incas y a 450 m de la Av. Porongoche.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-7">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">¿Qué encontrarás aquí?</CardTitle>
              <CardDescription>
                Contenido de referencia (aún no definido). Publicaremos los
                detalles finales cuando estén confirmados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {(
                  [
                    "Tipologías y metrajes",
                    "Planos y distribución",
                    "Acabados y especificaciones",
                    "Disponibilidad y precios",
                    "Opciones de financiamiento",
                  ] as const
                ).map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                      <Info className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {item}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Muy pronto
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Si te interesa este proyecto, podemos avisarte cuando esté
                  listo.
                </p>
                <Button asChild className="font-semibold">
                  <Link href="/#contacto">Contactar</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-5">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Estado del proyecto</CardTitle>
              <CardDescription>
                Esta página está en modo “Próximamente”.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-muted/40 p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Publicación de información
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Estamos preparando la ficha del proyecto con datos
                    verificados.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-muted/40 p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Actualizaciones
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Una vez definidos los detalles, esta página mostrará el
                    contenido completo.
                  </p>
                </div>

                <Button disabled variant="outline" className="w-full">
                  Descargar brochure (próximamente)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <CtaSection />
    </main>
  );
}
