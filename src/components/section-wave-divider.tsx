/**
 * Separador minimalista entre secciones (ej. CTA y Footer).
 * Franja blanca con línea fina central y detalle decorativo.
 */
export function SectionWaveDivider() {
  return (
    <div
      className="relative flex h-20 w-full items-center justify-center bg-background md:h-24"
      role="presentation"
      aria-hidden
    >
      {/* Línea fina con detalle central */}
      <div className="flex items-center">
        <div className="h-px w-24 bg-primary/30" />
        <div className="mx-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/40" />
        <div className="h-px w-24 bg-primary/30" />
      </div>
    </div>
  );
}
