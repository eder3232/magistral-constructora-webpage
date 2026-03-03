"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type TipoContacto = "cotizacion" | "trabajo" | "venta-terreno";

// ——— Formulario: Cotizar propiedad ———
const COTIZACION_FIELDS = {
  nombre: "",
  email: "",
  telefono: "",
  propiedadInteres: "",
  mensaje: "",
} as const;

// ——— Formulario: Trabajar con nosotros ———
const TRABAJO_FIELDS = {
  nombre: "",
  email: "",
  telefono: "",
  puestoInteres: "",
  experiencia: "",
  linkCv: "",
  linkPortafolio: "",
} as const;

// ——— Formulario: Vender terreno ———
const VENTA_TERRENO_FIELDS = {
  nombre: "",
  email: "",
  telefono: "",
  ubicacionTerreno: "",
  metrosCuadrados: "",
  mensaje: "",
} as const;

export default function ContactanosPage() {
  const [cotizacion, setCotizacion] = useState<
    Record<keyof typeof COTIZACION_FIELDS, string>
  >({ ...COTIZACION_FIELDS });
  const [trabajo, setTrabajo] = useState<
    Record<keyof typeof TRABAJO_FIELDS, string>
  >({ ...TRABAJO_FIELDS });
  const [ventaTerreno, setVentaTerreno] = useState<
    Record<keyof typeof VENTA_TERRENO_FIELDS, string>
  >({ ...VENTA_TERRENO_FIELDS });
  const [enviando, setEnviando] = useState<TipoContacto | null>(null);

  async function submit(tipo: TipoContacto, data: Record<string, string>) {
    setEnviando(tipo);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo, ...data }),
      });
      const json = (await res.json()) as {
        success?: boolean;
        message?: string;
      };
      if (!res.ok) {
        toast.error(json.message ?? "Error al enviar. Intenta de nuevo.");
        return;
      }
      toast.success("Mensaje enviado. Te contactaremos pronto.");
      if (tipo === "cotizacion") setCotizacion({ ...COTIZACION_FIELDS });
      if (tipo === "trabajo") setTrabajo({ ...TRABAJO_FIELDS });
      if (tipo === "venta-terreno")
        setVentaTerreno({ ...VENTA_TERRENO_FIELDS });
    } catch {
      toast.error("Error de conexión. Intenta de nuevo.");
    } finally {
      setEnviando(null);
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 md:py-16">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Contáctanos
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Elige el tipo de consulta y completa el formulario. Te responderemos a
          la brevedad.
        </p>
      </header>

      <Tabs defaultValue="cotizacion" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-1 sm:grid-cols-3 mb-8">
          <TabsTrigger value="cotizacion" className="text-sm sm:whitespace-nowrap whitespace-normal text-center">
            Cotizar propiedad
          </TabsTrigger>
          <TabsTrigger value="trabajo" className="text-sm sm:whitespace-nowrap whitespace-normal text-center">
            Trabajar con nosotros
          </TabsTrigger>
          <TabsTrigger value="venta-terreno" className="text-sm sm:whitespace-nowrap whitespace-normal text-center">
            Vender tu terreno
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cotizacion" className="mt-0">
          <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative aspect-[1024/1536] rounded-xl overflow-hidden bg-muted">
              <Image
                src="/contactanos/cotizacion.png"
                alt="Cotización de propiedad"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary mb-1">
                Cotizar una propiedad
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                ¿Interesado en alguna de nuestras propiedades? Déjanos tus datos
                y te enviamos información y cotización.
              </p>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit("cotizacion", cotizacion);
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cot-nombre">Nombre completo</Label>
                    <Input
                      id="cot-nombre"
                      value={cotizacion.nombre}
                      onChange={(e) =>
                        setCotizacion((s) => ({ ...s, nombre: e.target.value }))
                      }
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cot-telefono">Teléfono</Label>
                    <Input
                      id="cot-telefono"
                      type="tel"
                      value={cotizacion.telefono}
                      onChange={(e) =>
                        setCotizacion((s) => ({
                          ...s,
                          telefono: e.target.value,
                        }))
                      }
                      placeholder="Ej. 999 888 777"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cot-email">Correo electrónico</Label>
                  <Input
                    id="cot-email"
                    type="email"
                    value={cotizacion.email}
                    onChange={(e) =>
                      setCotizacion((s) => ({ ...s, email: e.target.value }))
                    }
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cot-propiedad">Propiedad de interés</Label>
                  <Input
                    id="cot-propiedad"
                    value={cotizacion.propiedadInteres}
                    onChange={(e) =>
                      setCotizacion((s) => ({
                        ...s,
                        propiedadInteres: e.target.value,
                      }))
                    }
                    placeholder="Ej. Proyecto Bustamante, Magistral Deluxe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cot-mensaje">Mensaje (opcional)</Label>
                  <Textarea
                    id="cot-mensaje"
                    value={cotizacion.mensaje}
                    onChange={(e) =>
                      setCotizacion((s) => ({ ...s, mensaje: e.target.value }))
                    }
                    placeholder="Comentarios o preguntas"
                    rows={3}
                    className="resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={enviando === "cotizacion"}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                >
                  {enviando === "cotizacion" ? "Enviando…" : "Enviar solicitud"}
                </Button>
              </form>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="trabajo" className="mt-0">
          <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative aspect-[1024/1536] rounded-xl overflow-hidden bg-muted order-2 md:order-1">
              <Image
                src="/contactanos/trabaja-con-nosotros.png"
                alt="Trabajar con nosotros"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-xl font-semibold text-primary mb-1">
                Trabajar con nosotros
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                ¿Quieres formar parte de Magistral Constructora? Cuéntanos de ti
                y del puesto que te interesa.
              </p>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit("trabajo", trabajo);
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tra-nombre">Nombre completo</Label>
                    <Input
                      id="tra-nombre"
                      value={trabajo.nombre}
                      onChange={(e) =>
                        setTrabajo((s) => ({ ...s, nombre: e.target.value }))
                      }
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tra-telefono">Teléfono</Label>
                    <Input
                      id="tra-telefono"
                      type="tel"
                      value={trabajo.telefono}
                      onChange={(e) =>
                        setTrabajo((s) => ({
                          ...s,
                          telefono: e.target.value,
                        }))
                      }
                      placeholder="Ej. 999 888 777"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tra-email">Correo electrónico</Label>
                  <Input
                    id="tra-email"
                    type="email"
                    value={trabajo.email}
                    onChange={(e) =>
                      setTrabajo((s) => ({ ...s, email: e.target.value }))
                    }
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tra-puesto">Puesto de interés</Label>
                  <Input
                    id="tra-puesto"
                    value={trabajo.puestoInteres}
                    onChange={(e) =>
                      setTrabajo((s) => ({
                        ...s,
                        puestoInteres: e.target.value,
                      }))
                    }
                    placeholder="Ej. Ingeniero, Obrero, Administrativo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tra-experiencia">
                    Experiencia (opcional)
                  </Label>
                  <Input
                    id="tra-experiencia"
                    value={trabajo.experiencia}
                    onChange={(e) =>
                      setTrabajo((s) => ({
                        ...s,
                        experiencia: e.target.value,
                      }))
                    }
                    placeholder="Años o breve descripción"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tra-linkCv">Enlace a tu CV (opcional)</Label>
                  <Input
                    id="tra-linkCv"
                    type="url"
                    value={trabajo.linkCv}
                    onChange={(e) =>
                      setTrabajo((s) => ({ ...s, linkCv: e.target.value }))
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tra-linkPortafolio">
                    Enlace a tu portafolio (opcional)
                  </Label>
                  <Input
                    id="tra-linkPortafolio"
                    type="url"
                    value={trabajo.linkPortafolio}
                    onChange={(e) =>
                      setTrabajo((s) => ({
                        ...s,
                        linkPortafolio: e.target.value,
                      }))
                    }
                    placeholder="https://..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={enviando === "trabajo"}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                >
                  {enviando === "trabajo" ? "Enviando…" : "Enviar postulación"}
                </Button>
              </form>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="venta-terreno" className="mt-0">
          <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative aspect-[1024/1536] rounded-xl overflow-hidden bg-muted">
              <Image
                src="/contactanos/vende-tu-terreno.png"
                alt="Vender tu terreno"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary mb-1">
                Vender tu terreno
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Si tienes un terreno y te interesa venderlo a la empresa,
                cuéntanos sobre él y te contactamos.
              </p>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit("venta-terreno", ventaTerreno);
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ven-nombre">Nombre completo</Label>
                    <Input
                      id="ven-nombre"
                      value={ventaTerreno.nombre}
                      onChange={(e) =>
                        setVentaTerreno((s) => ({
                          ...s,
                          nombre: e.target.value,
                        }))
                      }
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ven-telefono">Teléfono</Label>
                    <Input
                      id="ven-telefono"
                      type="tel"
                      value={ventaTerreno.telefono}
                      onChange={(e) =>
                        setVentaTerreno((s) => ({
                          ...s,
                          telefono: e.target.value,
                        }))
                      }
                      placeholder="Ej. 999 888 777"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ven-email">Correo electrónico</Label>
                  <Input
                    id="ven-email"
                    type="email"
                    value={ventaTerreno.email}
                    onChange={(e) =>
                      setVentaTerreno((s) => ({ ...s, email: e.target.value }))
                    }
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ven-ubicacion">Ubicación del terreno</Label>
                  <Input
                    id="ven-ubicacion"
                    value={ventaTerreno.ubicacionTerreno}
                    onChange={(e) =>
                      setVentaTerreno((s) => ({
                        ...s,
                        ubicacionTerreno: e.target.value,
                      }))
                    }
                    placeholder="Distrito, dirección o referencia"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ven-metros">
                    Metros cuadrados (opcional)
                  </Label>
                  <Input
                    id="ven-metros"
                    value={ventaTerreno.metrosCuadrados}
                    onChange={(e) =>
                      setVentaTerreno((s) => ({
                        ...s,
                        metrosCuadrados: e.target.value,
                      }))
                    }
                    placeholder="Ej. 200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ven-mensaje">Mensaje (opcional)</Label>
                  <Textarea
                    id="ven-mensaje"
                    value={ventaTerreno.mensaje}
                    onChange={(e) =>
                      setVentaTerreno((s) => ({
                        ...s,
                        mensaje: e.target.value,
                      }))
                    }
                    placeholder="Detalles adicionales del terreno"
                    rows={3}
                    className="resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={enviando === "venta-terreno"}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                >
                  {enviando === "venta-terreno"
                    ? "Enviando…"
                    : "Enviar solicitud"}
                </Button>
              </form>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
