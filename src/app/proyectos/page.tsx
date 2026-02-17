"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Building2, Home, Car, ArrowRight, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { CtaSection } from "../_componentes/cta-section";

const proyectos = [
  {
    slug: "magistral-deluxe",
    nombre: "Edificio Magistral",
    ubicacion: "Calle Los Arces N°220 A, Cayma",
    distrito: "Cayma",
    descripcion:
      "Edificio multifamiliar de 7 niveles + azotea con diseño sostenible, amenities premium en la azotea y sistema de monta-vehículos.",
    niveles: 7,
    departamentos: 12,
    estacionamientos: 13,
    dormitorios: "2 y 3 dormitorios",
    areaTerreno: "301.20 m²",
    estado: "En venta",
    imagen: "/projects/magistral/hero.png",
    highlights: ["Sky Bar", "Coworking", "Techos verdes", "Monta-vehículos"],
  },
  {
    slug: "bustamante",
    nombre: "Edificio Bustamante",
    ubicacion: "Calle Indo, Coop. Manuel Prado N°58, Mz E Lt 28",
    distrito: "José Luis Bustamante y Rivero",
    descripcion:
      "Edificio multifamiliar de 5 niveles + azotea con departamentos funcionales de 2 dormitorios, jardines interiores y ascensor directo.",
    niveles: 5,
    departamentos: 9,
    estacionamientos: 5,
    dormitorios: "2 dormitorios",
    areaTerreno: "250.75 m²",
    estado: "Pre-venta",
    imagen: "/projects/bustamante/hero.png",
    highlights: [
      "Jardín interior",
      "Walking closet",
      "SUM",
      "Área de parrilla",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ProyectosPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-muted">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-20">
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

        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-secondary">
              Magistral Constructora
            </p>
            <h1 className="font-serif text-5xl font-light leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
              Nuestros
              <br />
              <span className="italic text-secondary">Proyectos</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/85">
              Desarrollamos edificios multifamiliares que combinan diseño
              arquitectónico contemporáneo con construcción sostenible en las
              mejores zonas de Arequipa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {proyectos.map((proyecto) => (
            <motion.article
              key={proyecto.slug}
              variants={itemVariants}
              onClick={() => router.push(`/proyectos/${proyecto.slug}`)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden bg-muted">
                <Image
                  src={proyecto.imagen}
                  alt={proyecto.nombre}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Estado badge */}
                <div className="absolute top-4 left-4">
                  <Badge
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-lg ${
                      proyecto.estado === "En venta"
                        ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {proyecto.estado}
                  </Badge>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Bottom info on image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-1.5 text-primary-foreground/80">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="text-sm">{proyecto.distrito}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-serif text-2xl font-medium text-foreground transition-colors group-hover:text-primary">
                    {proyecto.nombre}
                  </h2>
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted transition-all duration-300 group-hover:bg-secondary">
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-secondary-foreground group-hover:translate-x-0.5" />
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {proyecto.descripcion}
                </p>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-muted p-3 text-center">
                    <Layers className="mx-auto mb-1 h-4 w-4 text-secondary" />
                    <p className="text-lg font-semibold text-foreground">
                      {proyecto.niveles}
                    </p>
                    <p className="text-[11px] text-muted-foreground">Niveles</p>
                  </div>
                  <div className="rounded-xl bg-muted p-3 text-center">
                    <Home className="mx-auto mb-1 h-4 w-4 text-secondary" />
                    <p className="text-lg font-semibold text-foreground">
                      {proyecto.departamentos}
                    </p>
                    <p className="text-[11px] text-muted-foreground">Deptos.</p>
                  </div>
                  <div className="rounded-xl bg-muted p-3 text-center">
                    <Car className="mx-auto mb-1 h-4 w-4 text-secondary" />
                    <p className="text-lg font-semibold text-foreground">
                      {proyecto.estacionamientos}
                    </p>
                    <p className="text-[11px] text-muted-foreground">Estac.</p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {proyecto.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Divider + bottom info */}
                <div className="mt-5 border-t border-border pt-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{proyecto.dormitorios}</span>
                    <span>Terreno: {proyecto.areaTerreno}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* CTA Bottom */}
      <CtaSection />
    </main>
  );
}
