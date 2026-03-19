// El Studio es una app interactiva (solo cliente)
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/config";

// No pre-renderizar el studio — es una app interactiva
export const dynamic = "force-dynamic";

export default function SanityStudioPage() {
  return <NextStudio config={config} />;
}

