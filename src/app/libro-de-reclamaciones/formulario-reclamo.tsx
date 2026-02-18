"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  reclamosFormSchema,
  TIPO_DOCUMENTO,
  TIPO_REGISTRO,
  type ReclamosFormData,
} from "@/lib/reclamos-schema";
import { CheckCircle2 } from "lucide-react";

const defaultValues: Partial<ReclamosFormData> = {
  tipoDocumento: "DNI",
  tipoRegistro: "Reclamo",
  nombreCompleto: "",
  numeroDocumento: "",
  telefono: "",
  correo: "",
  fechaIncidente: "",
  descripcion: "",
  pedidoSolucion: "",
};

export function FormularioReclamo() {
  const [success, setSuccess] = useState<{ codigo: string } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ReclamosFormData>({
    resolver: zodResolver(reclamosFormSchema),
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: ReclamosFormData) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/reclamos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setSubmitError(
          json.message ?? "No se pudo enviar el reclamo. Intente de nuevo.",
        );
        return;
      }

      if (json.success && json.codigo) {
        setSuccess({ codigo: json.codigo });
      } else {
        setSubmitError("Respuesta inesperada del servidor.");
      }
    } catch {
      setSubmitError(
        "Error de conexión. Verifique su internet e intente de nuevo.",
      );
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-xl rounded-xl border border-secondary/40 bg-card p-8 text-center shadow-lg md:p-10">
        <CheckCircle2 className="mx-auto size-14 text-secondary" />
        <h3 className="mt-4 font-sans text-2xl font-bold text-card-foreground">
          Su reclamo ha sido registrado correctamente
        </h3>
        <p className="mt-2 text-base text-card-foreground/90">
          Hemos enviado una constancia a su correo electrónico.
        </p>
        <p className="mt-2 text-base text-card-foreground/90">
          Será atendido en un plazo máximo de 15 días hábiles.
        </p>
        {success.codigo && (
          <p className="mt-4 text-sm font-medium text-card-foreground">
            Código de registro: {success.codigo}
          </p>
        )}
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-2xl space-y-6 rounded-xl bg-card p-6 text-card-foreground shadow-lg md:p-8"
      >
        {submitError && (
          <div
            role="alert"
            className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {submitError}
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-sans text-lg font-semibold text-foreground">
            Datos del consumidor
          </h3>
          <FormField
            control={form.control}
            name="nombreCompleto"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">
                  Nombre completo
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. Juan Pérez García"
                    className="min-h-[44px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="tipoDocumento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">
                    Tipo de documento
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    name={field.name}
                  >
                    <FormControl>
                      <SelectTrigger className="min-h-[44px] w-full">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TIPO_DOCUMENTO.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numeroDocumento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">
                    Número de documento
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        form.watch("tipoDocumento") === "DNI"
                          ? "8 dígitos"
                          : "9-15 caracteres"
                      }
                      className="min-h-[44px]"
                      inputMode={
                        form.watch("tipoDocumento") === "DNI"
                          ? "numeric"
                          : "text"
                      }
                      maxLength={form.watch("tipoDocumento") === "DNI" ? 8 : 15}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Teléfono</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Ej. 999 888 777"
                    className="min-h-[44px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="correo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">
                  Correo electrónico
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="min-h-[44px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 border-t border-border pt-6">
          <h3 className="font-sans text-lg font-semibold text-foreground">
            Detalle del registro
          </h3>
          <FormField
            control={form.control}
            name="tipoRegistro"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">
                  Tipo de registro
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  name={field.name}
                >
                  <FormControl>
                    <SelectTrigger className="min-h-[44px] w-full">
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TIPO_REGISTRO.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fechaIncidente"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">
                  Fecha del incidente
                </FormLabel>
                <FormControl>
                  <Input type="date" className="min-h-[44px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">
                  Descripción (mínimo 20 caracteres)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describa los hechos con el mayor detalle posible..."
                    className="min-h-[120px] resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pedidoSolucion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">
                  Pedido o solución esperada
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Indique qué espera que se haga para resolver su caso..."
                    className="min-h-[100px] resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-h-[44px] w-full bg-secondary px-8 text-secondary-foreground hover:bg-secondary/90 sm:w-auto"
        >
          {isSubmitting ? "Enviando…" : "Enviar reclamo"}
        </Button>
      </form>
    </Form>
  );
}
