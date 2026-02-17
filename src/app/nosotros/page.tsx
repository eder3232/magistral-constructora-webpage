import Image from "next/image";
import Link from "next/link";
import {
  Gem,
  Handshake,
  Users,
  Ruler,
  Building2,
  Home,
  LayoutGrid,
  UserCheck,
  Check,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONTACT } from "@/lib/site-config";
import { CtaSection } from "../_componentes/cta-section";

export const metadata = {
  title: "Nosotros | Magistral Constructora",
  description:
    "Conoce a Magistral Constructora: empresa arequipeña de proyectos inmobiliarios modernos. Calidad, transparencia y compromiso con tu hogar.",
};

const SECTION_CLASS =
  "mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32";
const TITLE_CLASS_LIGHT =
  "font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl";
const TITLE_CLASS_DARK =
  "font-display text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl";
const LINE_ORANGE = "h-1 w-10 rounded-full bg-secondary";
const PARAGRAPH_LIGHT = "text-base text-muted-foreground lg:text-lg [&+&]:mt-4";
const PARAGRAPH_DARK =
  "text-base text-primary-foreground/90 lg:text-lg [&+&]:mt-4";

const VALORES = [
  {
    icon: Gem,
    title: "Calidad sin concesiones",
    text: "Cada detalle importa. Construimos con estándares superiores desde la estructura hasta los acabados.",
  },
  {
    icon: Handshake,
    title: "Transparencia y confianza",
    text: "Creemos en relaciones claras, procesos honestos y comunicación directa con nuestros clientes.",
  },
  {
    icon: Users,
    title: "Compromiso con el cliente",
    text: "Acompañamos cada etapa: desde la primera visita hasta la entrega final.",
  },
  {
    icon: Ruler,
    title: "Responsabilidad técnica",
    text: "Aplicamos criterios de ingeniería moderna y normativas vigentes para garantizar seguridad.",
  },
  {
    icon: Building2,
    title: "Innovación en diseño urbano",
    text: "Creamos proyectos que se integran a la ciudad y mejoran la experiencia de vivir en ella.",
  },
] as const;

const QUE_HACEMOS = [
  {
    icon: Building2,
    title: "Construcción de Edificios Multifamiliares",
    text: "Desarrollamos proyectos residenciales modernos, seguros y pensados para el estilo de vida actual.",
  },
  {
    icon: Home,
    title: "Venta de Departamentos",
    text: "Comercializamos unidades diseñadas para brindar confort, funcionalidad y valorización.",
  },
  {
    icon: LayoutGrid,
    title: "Desarrollo de Proyectos Inmobiliarios",
    text: "Planificamos desde cero: ubicación estratégica, arquitectura contemporánea y ejecución eficiente.",
  },
  {
    icon: UserCheck,
    title: "Atención Personalizada",
    text: "Nuestro equipo acompaña al cliente durante todo el proceso de compra e inversión.",
  },
] as const;

const DIFERENCIALES = [
  "Enfoque en proyectos multifamiliares modernos",
  "Diseño arquitectónico contemporáneo",
  "Construcción bajo normativa técnica y estándares antisísmicos",
  "Acabados seleccionados para alta durabilidad y estética",
  "Compromiso real con los tiempos de entrega",
  "Atención cercana y trato transparente",
] as const;

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[50vh] items-center justify-center overflow-hidden"
        aria-label="Presentación Nosotros"
      >
        <Image
          src="/nosotros/hero.jpg"
          alt="Magistral Constructora — construcción y equipo"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto h-1 w-12 rounded-full bg-secondary" />
          <h1 className="mt-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
            Nosotros
          </h1>
          <p className="mt-2 text-base text-primary-foreground/90 md:text-lg">
            Construimos espacios que elevan tu estilo de vida.
          </p>
        </div>
      </section>

      {/* Intro Magistral — fondo claro */}
      <section className="bg-background" aria-label="Quiénes somos">
        <div className={SECTION_CLASS}>
          <div className={LINE_ORANGE} />
          <h2 className={`mt-4 ${TITLE_CLASS_LIGHT}`}>
            Magistral Constructora
          </h2>
          <p className={`mt-6 ${PARAGRAPH_LIGHT}`}>
            En <strong>Magistral Constructora</strong>, somos una empresa
            arequipeña dedicada al desarrollo de proyectos inmobiliarios
            modernos, seguros y funcionales. Nuestro propósito es claro: crear
            hogares y edificios multifamiliares con estándares de calidad
            superiores, pensados para brindar bienestar, confianza y
            valorización a largo plazo.
          </p>
          <p className={PARAGRAPH_LIGHT}>
            Desde Arequipa, trabajamos con una visión contemporánea de la
            construcción: diseño inteligente, ingeniería responsable y
            compromiso total con nuestros clientes.
          </p>
        </div>
      </section>

      {/* Nuestra Historia — fondo oscuro */}
      <section className="bg-primary" aria-label="Nuestra historia">
        <div className={SECTION_CLASS}>
          <div className={LINE_ORANGE} />
          <h2 className={`mt-4 ${TITLE_CLASS_DARK}`}>Nuestra Historia</h2>
          <p className={`mt-6 ${PARAGRAPH_DARK}`}>
            Magistral Constructora nace con el objetivo de transformar la forma
            en que se vive la ciudad. Creemos que un edificio no es solo
            concreto y planos: es un espacio donde se construyen familias,
            sueños y futuro.
          </p>
          <p className={PARAGRAPH_DARK}>
            Nuestro primer gran proyecto, el{" "}
            <strong className="text-primary-foreground">
              Edificio Multifamiliar Magistral
            </strong>
            , representa el inicio de una nueva etapa en el desarrollo urbano de
            Arequipa: arquitectura moderna, acabados de alta calidad y una
            ejecución estructural rigurosa.
          </p>
          <p className={PARAGRAPH_DARK}>
            Hoy, avanzamos con una meta firme: consolidarnos como una
            constructora referente en el sur del Perú.
          </p>
        </div>
      </section>

      {/* Misión y Visión — fondo claro */}
      <section className="bg-background" aria-label="Misión y visión">
        <div className={SECTION_CLASS}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className={LINE_ORANGE} />
              <h2 className={`mt-4 ${TITLE_CLASS_LIGHT}`}>Misión</h2>
              <p className={`mt-6 ${PARAGRAPH_LIGHT}`}>
                Desarrollar proyectos inmobiliarios en Arequipa que combinen{" "}
                <strong>calidad estructural, diseño moderno y confianza</strong>
                , ofreciendo a nuestros clientes hogares seguros, funcionales y
                con alta valorización.
              </p>
            </div>
            <div>
              <div className={LINE_ORANGE} />
              <h2 className={`mt-4 ${TITLE_CLASS_LIGHT}`}>Visión</h2>
              <p className={`mt-6 ${PARAGRAPH_LIGHT}`}>
                Ser una de las constructoras e inmobiliarias más reconocidas del
                sur del país, destacando por nuestra{" "}
                <strong>
                  excelencia constructiva, innovación en proyectos
                  multifamiliares y compromiso con cada familia que confía en
                  nosotros.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores — fondo oscuro */}
      <section className="bg-primary" aria-label="Nuestros valores">
        <div className={SECTION_CLASS}>
          <div className="mx-auto max-w-3xl text-center">
            <div className={`${LINE_ORANGE} mx-auto`} />
            <h2 className={`mt-4 ${TITLE_CLASS_DARK}`}>Nuestros Valores</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
            {VALORES.map(({ icon: Icon, title, text }) => (
              <Card
                key={title}
                className="border-primary bg-primary/50 text-primary-foreground shadow-none"
              >
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20 text-secondary">
                    <Icon className="size-6" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-primary-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-primary-foreground/90 lg:text-base">
                    {text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Qué Hacemos — fondo claro */}
      <section className="bg-background" aria-label="Qué hacemos">
        <div className={SECTION_CLASS}>
          <div className={LINE_ORANGE} />
          <h2 className={`mt-4 ${TITLE_CLASS_LIGHT}`}>Qué Hacemos</h2>
          <p className={`mt-4 ${PARAGRAPH_LIGHT}`}>
            En Magistral Constructora ofrecemos soluciones integrales en el
            sector inmobiliario:
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {QUE_HACEMOS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                  <Icon className="size-6" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className={`mt-2 flex-grow ${PARAGRAPH_LIGHT}`}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Diferencial — fondo oscuro */}
      <section className="bg-primary" aria-label="Nuestro diferencial">
        <div className={SECTION_CLASS}>
          <div className={LINE_ORANGE} />
          <h2 className={`mt-4 ${TITLE_CLASS_DARK}`}>Nuestro Diferencial</h2>
          <p className={`mt-4 ${PARAGRAPH_DARK}`}>
            En un mercado competitivo, Magistral Constructora destaca por:
          </p>
          <ul className="mt-8 space-y-4">
            {DIFERENCIALES.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-primary-foreground/90"
              >
                <Check
                  className="mt-0.5 size-5 shrink-0 text-secondary"
                  aria-hidden
                />
                <span className="text-base lg:text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Compromiso con Arequipa — fondo claro + imagen */}
      <section className="bg-background" aria-label="Compromiso con Arequipa">
        <div className={SECTION_CLASS}>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:order-2">
              <Image
                src="/nosotros/misti.jpg"
                alt="Arequipa — ciudad donde construimos"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="lg:order-1">
              <div className={LINE_ORANGE} />
              <h2 className={`mt-4 ${TITLE_CLASS_LIGHT}`}>
                Compromiso con Arequipa
              </h2>
              <p className={`mt-6 ${PARAGRAPH_LIGHT}`}>
                Creemos en el crecimiento urbano sostenible. Por eso,
                desarrollamos proyectos que aportan valor a la ciudad, elevan el
                estándar de vivienda y generan oportunidades para nuevas
                familias e inversionistas.
              </p>
              <p className={PARAGRAPH_LIGHT}>
                Construimos pensando en el presente, pero también en el futuro
                de Arequipa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Conversemos — fondo oscuro */}

      <CtaSection />
    </>
  );
}
