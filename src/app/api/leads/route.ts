import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE_CONTACT } from "@/lib/site-config";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

function buildLeadEmailBody(data: { nombre: string; telefono: string }) {
  return `
Nuevo lead desde la web (formulario CTA)

— DATOS —
Nombre: ${data.nombre}
Teléfono: ${data.telefono}

—
Magistral Constructora - Solicitud de contacto
  `.trim();
}

/**
 * POST /api/leads
 * Recibe nombre y teléfono del formulario CTA y envía un correo a emailSendLeads.
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
  const nombre = typeof raw?.nombre === "string" ? raw.nombre.trim() : "";
  const telefono = typeof raw?.telefono === "string" ? raw.telefono.trim() : "";

  if (!nombre || !telefono) {
    return NextResponse.json(
      { success: false, message: "Nombre y teléfono son requeridos" },
      { status: 400 }
    );
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
      replyTo: undefined,
      subject: `[Web] Nuevo lead: ${nombre}`,
      text: buildLeadEmailBody({ nombre, telefono }),
    });
  } catch (err) {
    console.error("[api/leads] Error enviando correo:", err);
    return NextResponse.json(
      { success: false, message: "Error al enviar el correo. Intente más tarde." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
