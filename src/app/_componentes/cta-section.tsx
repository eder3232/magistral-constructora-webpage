"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE_CONTACT } from "@/lib/site-config";

export function CtaSection() {
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

  return (
    <section
      id="contacto"
      className="relative w-full overflow-hidden bg-primary py-16 md:py-24"
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2
            id="cta-heading"
            className="text-center text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl"
          >
            ¿Listo para tu proyecto?
          </h2>
          <p className="mt-3 text-center text-lg text-primary-foreground/90">
            Llámanos o déjanos tus datos y te contactamos a la brevedad.
          </p>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
            {/* Llamar ahora */}
            <div className="flex flex-col items-center justify-center rounded-xl bg-primary-foreground/10 p-8 text-center backdrop-blur-sm">
              <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Phone className="size-7" aria-hidden />
              </div>
              <p className="mt-4 text-sm font-medium uppercase tracking-wider text-primary-foreground/80">
                Llámanos ahora
              </p>
              <a
                href={SITE_CONTACT.telefonoHref}
                className="mt-2 text-2xl font-semibold text-primary-foreground transition hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                {SITE_CONTACT.telefonoDisplay}
              </a>
            </div>

            {/* Formulario */}
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 p-6 shadow-lg backdrop-blur-sm md:p-8"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cta-nombre" className="text-primary-foreground">
                    Nombre
                  </Label>
                  <Input
                    id="cta-nombre"
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:border-secondary focus-visible:ring-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta-telefono" className="text-primary-foreground">
                    Teléfono
                  </Label>
                  <Input
                    id="cta-telefono"
                    type="tel"
                    placeholder="+51 9XX XXX XXX"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                    className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:border-secondary focus-visible:ring-secondary/50"
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
