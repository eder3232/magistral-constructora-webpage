import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/revalidate?secret=<REVALIDATE_SECRET>
 *
 * Endpoint para on-demand ISR. Configura este webhook en Sanity Studio:
 *   URL: https://tu-dominio.com/api/revalidate?secret=<tu-secreto>
 *   Trigger: on create, update, delete — tipo "post"
 *
 * Variable de entorno requerida: REVALIDATE_SECRET
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }

  revalidateTag("posts", { expire: 0 });

  return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}
