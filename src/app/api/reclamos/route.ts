import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE_CONTACT } from "@/lib/site-config";
import { reclamosFormSchema } from "@/lib/reclamos-schema";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

function buildCorreoInterno(data: {
  tipoRegistro: string;
  nombreCompleto: string;
  tipoDocumento: string;
  numeroDocumento: string;
  telefono: string;
  correo: string;
  fechaIncidente: string;
  descripcion: string;
  pedidoSolucion: string;
  codigo: string;
}) {
  return `
Nuevo registro en el Libro de Reclamaciones Virtual
Código: ${data.codigo}
Tipo: ${data.tipoRegistro}

— DATOS DEL CONSUMIDOR —
Nombre: ${data.nombreCompleto}
Documento: ${data.tipoDocumento} ${data.numeroDocumento}
Teléfono: ${data.telefono}
Correo: ${data.correo}

— DETALLE —
Fecha del incidente: ${data.fechaIncidente}
Descripción:
${data.descripcion}

Pedido o solución esperada:
${data.pedidoSolucion}

—
Magistral Constructora - Libro de Reclamaciones
  `.trim();
}

function buildCorreoConstancia(data: {
  nombreCompleto: string;
  codigo: string;
  fechaHora: string;
}) {
  return `
Estimado/a ${data.nombreCompleto},

Su registro ha sido recibido correctamente en el Libro de Reclamaciones Virtual de Magistral Constructora.

Código de registro: ${data.codigo}
Fecha y hora de registro: ${data.fechaHora}

Será atendido en un plazo máximo de quince (15) días hábiles, conforme a la normativa vigente.

Para cualquier consulta puede contactarnos:
• Teléfono: ${SITE_CONTACT.telefonoDisplay}
• Dirección: ${SITE_CONTACT.direccion}
• Correo: ${SITE_CONTACT.emailToShowInThePage}

—————————————————————————————
📌 Aviso Legal (Versión Formal)

En cumplimiento de lo establecido en el Código de Protección y Defensa del Consumidor (Ley N.º 29571) y el Reglamento del Libro de Reclamaciones, se informa al consumidor que:

La presentación de un reclamo o queja a través del presente Libro de Reclamaciones Virtual constituye un medio formal para dejar constancia de su disconformidad respecto a los productos o servicios ofrecidos por Magistral Constructora.

La formulación del reclamo o queja no impide al consumidor acudir a otras vías de solución de controversias, ni constituye requisito previo para interponer una denuncia ante el INDECOPI.

Magistral Constructora dará respuesta al reclamo o queja presentado en un plazo máximo de quince (15) días hábiles, conforme a la normativa vigente.

Los datos personales consignados serán tratados de manera confidencial y utilizados únicamente para la gestión y atención del reclamo o queja, de acuerdo con la Ley de Protección de Datos Personales (Ley N.º 29733).

—
Magistral Constructora
  `.trim();
}

/**
 * POST /api/reclamos
 * Recibe el formulario del Libro de Reclamaciones, valida, envía correo interno a Soporte
 * y constancia al consumidor.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Cuerpo de la petición inválido" },
      { status: 400 }
    );
  }

  const parsed = reclamosFormSchema.safeParse(body);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { success: false, message: "Datos inválidos", errors },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (!EMAIL_USER || !EMAIL_PASS) {
    return NextResponse.json(
      { success: false, message: "Configuración de correo no disponible" },
      { status: 500 }
    );
  }

  const codigo = `RECL-${Date.now()}`;
  const fechaHora = new Date().toLocaleString("es-PE", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    // 1. Correo interno a Soporte (replyTo = consumidor)
    await transporter.sendMail({
      from: EMAIL_USER,
      to: SITE_CONTACT.emailSoporte,
      replyTo: data.correo,
      subject: `[Libro de Reclamaciones] ${data.tipoRegistro} - ${codigo}`,
      text: buildCorreoInterno({
        tipoRegistro: data.tipoRegistro,
        nombreCompleto: data.nombreCompleto,
        tipoDocumento: data.tipoDocumento,
        numeroDocumento: data.numeroDocumento,
        telefono: data.telefono,
        correo: data.correo,
        fechaIncidente: data.fechaIncidente,
        descripcion: data.descripcion,
        pedidoSolucion: data.pedidoSolucion,
        codigo,
      }),
    });

    // 2. Constancia al consumidor
    await transporter.sendMail({
      from: EMAIL_USER,
      to: data.correo,
      subject: `Constancia de registro - Libro de Reclamaciones ${codigo}`,
      text: buildCorreoConstancia({
        nombreCompleto: data.nombreCompleto,
        codigo,
        fechaHora,
      }),
    });
  } catch (err) {
    console.error("[api/reclamos] Error enviando correo:", err);
    return NextResponse.json(
      { success: false, message: "Error al enviar el correo. Intente más tarde." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, codigo },
    { status: 200 }
  );
}
