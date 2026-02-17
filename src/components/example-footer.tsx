import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { SITE_CONTACT, SITE_SOCIAL } from "@/lib/site-config";

const ENLACES_PROYECTO = [
    { href: "#el-proyecto", label: "El Edificio" },
    { href: "#caracteristicas", label: "Características" },
    { href: "#avance-de-obra", label: "Avance de Obra" },
    { href: "#ubicacion", label: "Ubicación" },
] as const;

const ENLACES_LEGALES = [
    { href: "/libro-reclamaciones", label: "Libro de reclamaciones" },
    { href: "/terminos-y-condiciones", label: "Términos y condiciones" },
] as const;

export function Footer() {
    return (
        <footer
            className="bg-brand-navy-dark px-4 py-10 md:px-8 md:py-12 lg:px-16 lg:py-14"
            aria-label="Pie de página"
        >
            <div className="mx-auto max-w-6xl">
                {/* Fila 1: Logo + tres columnas de contenido */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
                    {/* Logo + Magistral (ocupa primera celda, en desktop puede ser más estrecha) */}
                    <div className="lg:col-span-1">
                        <Link
                            href="/"
                            className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-dark"
                            aria-label="Magistral Constructora - Inicio"
                        >
                            <Image
                                src="/brand/logo_magistral.svg"
                                alt="Magistral Constructora"
                                width={160}
                                height={48}
                                className="h-10 w-auto"
                            />
                        </Link>
                        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-brand-white/90">
                            Magistral
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-brand-white/80">
                            Una constructora comprometida con crear hogares de calidad donde
                            las familias puedan crecer juntas.
                        </p>
                    </div>

                    {/* El Proyecto */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-white/90">
                            El Proyecto
                        </h3>
                        <ul className="mt-3 space-y-2.5">
                            {ENLACES_PROYECTO.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-brand-white/80 transition-colors hover:text-brand-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacto (solo datos de contacto) */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-white/90">
                            Contacto
                        </h3>
                        <address className="mt-3 not-italic text-sm text-brand-white/80">
                            <p className="leading-relaxed">{SITE_CONTACT.direccion}</p>
                            <p className="mt-2">
                                <a
                                    href={SITE_CONTACT.telefonoHref}
                                    className="transition-colors hover:text-brand-white"
                                >
                                    {SITE_CONTACT.telefonoDisplay}
                                </a>
                            </p>
                            <p className="mt-2">
                                <a
                                    href={`mailto:${SITE_CONTACT.email}`}
                                    className="transition-colors hover:text-brand-white"
                                >
                                    {SITE_CONTACT.email}
                                </a>
                            </p>
                        </address>
                    </div>

                    {/* Espaciador en desktop para alinear columnas; en móvil no se muestra */}
                    <div className="hidden lg:block" aria-hidden />
                </div>

                {/* Fila 2: Enlaces legales (izq) + Redes sociales (der) */}
                <div className="mt-10 flex flex-col gap-6 border-t border-brand-white/10 pt-8 md:mt-12 md:flex-row md:items-center md:justify-between md:gap-8 lg:mt-14 lg:pt-10">
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-white/70">
                            Enlaces legales
                        </h3>
                        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
                            {ENLACES_LEGALES.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-brand-orange underline underline-offset-2 transition-colors hover:text-brand-orange/90"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-brand-white/70">
                            Síguenos
                        </span>
                        <ul className="flex items-center gap-3" aria-label="Redes sociales">
                            {SITE_SOCIAL.map(({ url, label }) => (
                                <li key={url}>
                                    <SocialIcon
                                        url={url}
                                        aria-label={label}
                                        className="!h-9 !w-9"
                                        bgColor="transparent"
                                        fgColor="#ffffff"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Fila 3: Copyright */}
                <div className="mt-8 border-t border-brand-white/10 pt-6 md:mt-10">
                    <p className="text-center text-xs text-brand-white/60 md:text-sm">
                        © 2026 Magistral Constructora. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
