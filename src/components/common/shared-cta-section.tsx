"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE_CONTACT } from "@/lib/site-config";

export interface SharedCtaSectionProps {
  /**
   * true = fondo primario (oscuro) y texto blanco
   * false = fondo blanco y texto color primario
   * Los decoradores usan siempre el color secundario.
   */
  dark?: boolean;
  /** ID opcional para la sección (p. ej. "contacto") */
  id?: string;
  /** Título opcional (por defecto el del home) */
  title?: string;
  /** Subtítulo opcional */
  subtitle?: string;
}

export function SharedCtaSection({
  dark = true,
  id = "contacto",
  title = "¿Listo para tu proyecto?",
  subtitle = "Llámanos o déjanos tus datos y te contactamos a la brevedad.",
}: SharedCtaSectionProps) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim()) {
      toast.error("Por favor completa nombre y teléfono.");
      return;
    }
    setEnviando(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre.trim(), telefono: telefono.trim() }),
      });
      const data = (await res.json()) as { success: boolean; message?: string };
      if (!res.ok) {
        toast.error(data.message ?? "Error al enviar. Intenta de nuevo.");
        return;
      }
      toast.success("¡Mensaje recibido! Te contactaremos pronto.");
      setNombre("");
      setTelefono("");
    } catch {
      toast.error("Error de conexión. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  const isDark = dark;

  const sectionClasses = isDark
    ? "bg-primary text-primary-foreground"
    : "bg-white text-primary";

  const headingClasses = isDark
    ? "text-primary-foreground"
    : "text-primary";

  const subtextClasses = isDark
    ? "text-primary-foreground/90"
    : "text-primary/90";

  const cardClasses = isDark
    ? "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground"
    : "bg-primary/5 border-primary/20 text-primary";

  const labelClasses = isDark ? "text-primary-foreground" : "text-primary";
  const inputClasses = isDark
    ? "border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:border-secondary focus-visible:ring-secondary/50"
    : "border-primary/30 bg-primary/10 text-primary placeholder:text-primary/50 focus-visible:border-secondary focus-visible:ring-secondary/50";

  const linkClasses = isDark
    ? "text-primary-foreground hover:text-secondary focus-visible:ring-secondary focus-visible:ring-offset-primary"
    : "text-primary hover:text-secondary focus-visible:ring-secondary focus-visible:ring-offset-white";

  const smallLabelClasses = isDark
    ? "text-primary-foreground/80"
    : "text-primary/80";

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden py-16 md:py-24 ${sectionClasses}`}
      aria-labelledby="shared-cta-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2
            id="shared-cta-heading"
            className={`text-center text-3xl font-bold tracking-tight md:text-4xl ${headingClasses}`}
          >
            {title}
          </h2>
          <p className={`mt-3 text-center text-lg ${subtextClasses}`}>
            {subtitle}
          </p>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
            {/* Llamar ahora - decorador con color secundario */}
            <div
              className={`flex flex-col items-center justify-center rounded-xl p-8 text-center backdrop-blur-sm ${cardClasses}`}
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Phone className="size-7" aria-hidden />
              </div>
              <p className={`mt-4 text-sm font-medium uppercase tracking-wider ${smallLabelClasses}`}>
                Llámanos ahora
              </p>
              <a
                href={SITE_CONTACT.telefonoHref}
                className={`mt-2 text-2xl font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${linkClasses}`}
              >
                {SITE_CONTACT.telefonoDisplay}
              </a>
            </div>

            {/* Formulario */}
            <form
              onSubmit={handleSubmit}
              className={`rounded-xl border p-6 shadow-lg backdrop-blur-sm md:p-8 ${cardClasses}`}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shared-cta-nombre" className={labelClasses}>
                    Nombre
                  </Label>
                  <Input
                    id="shared-cta-nombre"
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shared-cta-telefono" className={labelClasses}>
                    Teléfono
                  </Label>
                  <Input
                    id="shared-cta-telefono"
                    type="tel"
                    placeholder="+51 9XX XXX XXX"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                    className={inputClasses}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={enviando}
                  variant="secondary"
                  size="lg"
                  className="mt-4 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  {enviando ? "Enviando…" : "Solicitar contacto"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
