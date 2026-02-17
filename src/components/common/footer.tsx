import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { SITE_CONTACT, SITE_SOCIAL } from "@/lib/site-config";

const ENLACES_NAVEGACION = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/proyectos/magistral-deluxe", label: "Magistral" },
  { href: "/proyectos/residencial-bustamante", label: "Bustamante 702" },
] as const;

const ENLACES_LEGALES = [
  { href: "/libro-de-reclamaciones", label: "Libro de reclamaciones" },
  { href: "/terminos-y-condiciones", label: "Términos y condiciones" },
] as const;

export function Footer() {
  return (
    <footer
      className="border-t border-primary-foreground/10 bg-primary px-4 py-10 md:px-8 md:py-12 lg:px-16 lg:py-14"
      aria-label="Pie de página"
    >
      <div className="mx-auto max-w-6xl">
        {/* Fila 1: Logo + tres columnas de contenido */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Logo + Magistral */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              aria-label="Magistral Constructora - Inicio"
            >
              <Image
                src="/logos/logo_sin_fondo.svg"
                alt="Magistral Constructora"
                width={160}
                height={48}
                className="h-10 w-auto"
              />
            </Link>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">
              Magistral
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
              Una constructora comprometida con crear hogares de calidad donde
              las familias puedan crecer juntas.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">
              Navegación
            </h3>
            <ul className="mt-3 space-y-2.5">
              {ENLACES_NAVEGACION.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">
              Contacto
            </h3>
            <address className="mt-3 not-italic text-sm text-primary-foreground/80">
              <p className="leading-relaxed">{SITE_CONTACT.direccion}</p>
              <p className="mt-2">
                <a
                  href={SITE_CONTACT.telefonoHref}
                  className="transition-colors hover:text-primary-foreground"
                >
                  {SITE_CONTACT.telefonoDisplay}
                </a>
              </p>
              <p className="mt-2">
                <a
                  href={`mailto:${SITE_CONTACT.emailToShowInThePage}`}
                  className="transition-colors hover:text-primary-foreground"
                >
                  {SITE_CONTACT.emailToShowInThePage}
                </a>
              </p>
            </address>
          </div>

          <div className="hidden lg:block" aria-hidden />
        </div>

        {/* Fila 2: Enlaces legales + Redes sociales */}
        <div className="mt-10 flex flex-col gap-6 border-t border-primary-foreground/10 pt-8 md:mt-12 md:flex-row md:items-center md:justify-between md:gap-8 lg:mt-14 lg:pt-10">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
              Enlaces legales
            </h3>
            <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
              {ENLACES_LEGALES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-accent underline underline-offset-2 transition-colors hover:text-accent/90"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
              Síguenos
            </span>
            <ul className="flex items-center gap-3" aria-label="Redes sociales">
              {SITE_SOCIAL.map(({ url, label }) => (
                <li key={url}>
                  <SocialIcon
                    url={url}
                    label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    bgColor="transparent"
                    fgColor="currentColor"
                    style={{ width: 36, height: 36 }}
                    className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fila 3: Copyright */}
        <div className="mt-8 border-t border-primary-foreground/10 pt-6 md:mt-10">
          <p className="text-center text-xs text-primary-foreground/60 md:text-sm">
            © 2026 Magistral Constructora. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
