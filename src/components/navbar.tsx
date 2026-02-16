"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Nosotros", href: "/nosotros" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + nombre */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Magistral Constructora - Inicio"
          >
            <div className="relative w-10 h-10 md:w-11 md:h-11 flex-shrink-0">
              <Image
                src="/logos/logo_sin_fondo.svg"
                alt=""
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className={`font-bold text-lg md:text-xl tracking-tight transition-colors duration-300 ${
                scrolled ? "text-white" : "text-white drop-shadow-md"
              }`}
            >
              Magistral Constructora
            </span>
          </Link>

          {/* Links de escritorio */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:opacity-90 ${
                  scrolled ? "text-slate-200 hover:text-white" : "text-white/90 hover:text-white drop-shadow-sm"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              size="sm"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-semibold rounded-lg px-5 shadow-md"
            >
              <Link href="#contacto">Contáctanos</Link>
            </Button>
          </div>

          {/* Menú móvil */}
          <div className="flex md:hidden items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-lg ${scrolled ? "text-white hover:bg-white/10" : "text-white hover:bg-white/10 drop-shadow-sm"}`}
                  aria-label="Abrir menú"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-900 border-slate-800">
                <SheetHeader>
                  <SheetTitle className="text-white font-bold text-lg">
                    Magistral Constructora
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 pt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="py-3 px-2 text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button
                    asChild
                    className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-semibold rounded-lg"
                  >
                    <Link href="#contacto">Contáctanos</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
