import { z } from "zod";

/** Tipo de documento de identidad */
export const TIPO_DOCUMENTO = ["DNI", "CE"] as const;

/** Tipo de registro en el libro de reclamaciones */
export const TIPO_REGISTRO = ["Reclamo", "Queja"] as const;

const tipoDocumentoSchema = z.enum(TIPO_DOCUMENTO);
const tipoRegistroSchema = z.enum(TIPO_REGISTRO);

/** Número de documento (longitud según tipo se valida en el refine del objeto) */
const numeroDocumentoSchema = z
  .string()
  .min(1, "Ingrese el número de documento");

export const reclamosFormSchema = z
  .object({
    // Datos del consumidor
    nombreCompleto: z
      .string()
      .min(2, "Ingrese su nombre completo")
      .max(200, "Nombre demasiado largo"),
    tipoDocumento: tipoDocumentoSchema,
    numeroDocumento: numeroDocumentoSchema,
    telefono: z
      .string()
      .min(7, "Ingrese un teléfono válido")
      .max(20, "Teléfono demasiado largo"),
    correo: z.string().email("Ingrese un correo electrónico válido"),

    // Detalle del registro
    tipoRegistro: tipoRegistroSchema,
    fechaIncidente: z.string().min(1, "Seleccione la fecha del incidente"),
    descripcion: z
      .string()
      .min(20, "La descripción debe tener al menos 20 caracteres")
      .max(2000, "Descripción demasiado larga"),
    pedidoSolucion: z
      .string()
      .min(1, "Indique el pedido o solución esperada")
      .max(2000, "Texto demasiado largo"),
  })
  .refine(
    (data) => {
      if (data.tipoDocumento === "DNI") {
        return /^\d{8}$/.test(data.numeroDocumento);
      }
      // CE: 9 a 15 caracteres alfanuméricos
      return /^[A-Za-z0-9]{9,15}$/.test(data.numeroDocumento);
    },
    {
      message: "DNI debe tener 8 dígitos; CE entre 9 y 15 caracteres alfanuméricos",
      path: ["numeroDocumento"],
    }
  );

export type ReclamosFormData = z.infer<typeof reclamosFormSchema>;
