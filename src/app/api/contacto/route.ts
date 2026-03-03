import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE_CONTACT } from "@/lib/site-config";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

type TipoContacto = "cotizacion" | "trabajo" | "venta-terreno";

const SUBJECTS: Record<TipoContacto, string> = {
  cotizacion: "[Web] Solicitud de cotización de propiedad",
  trabajo: "[Web] Postulación para trabajar con nosotros",
  "venta-terreno": "[Web] Solicitud de venta de terreno",
};

const LABELS: Record<string, string> = {
  nombre: "Nombre completo",
  email: "Correo",
  telefono: "Teléfono",
  propiedadInteres: "Propiedad de interés",
  mensaje: "Mensaje",
  puestoInteres: "Puesto de interés",
  experiencia: "Experiencia",
  linkCv: "Enlace a CV",
  linkPortafolio: "Enlace a portafolio",
  ubicacionTerreno: "Ubicación del terreno",
  metrosCuadrados: "Metros cuadrados",
};

function buildEmailBody(
  tipo: TipoContacto,
  data: Record<string, string>
): string {
  const lines = Object.entries(data)
    .filter(([, v]) => v != null && String(v).trim() !== "")
    .map(([k, v]) => `${LABELS[k] ?? k}: ${String(v).trim()}`);
  return `
Solicitud desde Contactános - ${SUBJECTS[tipo]}

— DATOS —
${lines.join("\n")}

—
Magistral Constructora
  `.trim();
}

/**
 * POST /api/contacto
 * Recibe tipo (cotizacion | trabajo | venta-terreno) y campos del formulario.
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

  const raw = body as Record<string, unknown>;
  const tipo = raw?.tipo as TipoContacto | undefined;

  if (
    !tipo ||
    !["cotizacion", "trabajo", "venta-terreno"].includes(tipo)
  ) {
    return NextResponse.json(
      { success: false, message: "Tipo de contacto inválido" },
      { status: 400 }
    );
  }

  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (key === "tipo") continue;
    if (typeof value === "string") data[key] = value;
    else if (value != null) data[key] = String(value);
  }

  if (!EMAIL_USER || !EMAIL_PASS) {
    return NextResponse.json(
      { success: false, message: "Configuración de correo no disponible" },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: SITE_CONTACT.emailSendLeads,
      replyTo: data.email || undefined,
      subject: SUBJECTS[tipo],
      text: buildEmailBody(tipo, data),
    });
  } catch (err) {
    console.error("[api/contacto] Error enviando correo:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Error al enviar el mensaje. Intente más tarde.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
