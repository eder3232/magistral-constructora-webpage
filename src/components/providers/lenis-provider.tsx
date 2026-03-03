"use client";

import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";
import { LenisScrollTriggerSync } from "./lenis-scrolltrigger-sync";

type LenisProviderProps = {
  children: React.ReactNode;
};

/**
 * Lenis por ruta: al cambiar pathname, React desmonta esta instancia y monta otra,
 * así cada página tiene su propia instancia de Lenis que empieza en scroll 0.
 * Evita el problema de scroll restaurado o saltar a #contacto al navegar.
 * LenisScrollTriggerSync hace que GSAP ScrollTrigger reciba el scroll de Lenis.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const pathname = usePathname();

  return (
    <ReactLenis
      key={pathname}
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      }}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
