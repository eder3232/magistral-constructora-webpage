"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/config";

// No pre-renderizar el studio — es una app interactiva del lado del cliente
export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
