import { Hero } from "@/app/_componentes/hero";
import { Nosotros } from "@/app/_componentes/nosotros";
import { ProjectsSection } from "@/app/_componentes/projects-section";
import { ParallaxImageMarquee } from "@/app/_componentes/parallax-image-marquee";
import { CtaSection } from "@/app/_componentes/cta-section";
import { SectionWaveDivider } from "@/app/_componentes/section-wave-divider";
import { Footer } from "@/components/common/footer";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <ParallaxImageMarquee />
      <ProjectsSection />
      <Nosotros />
      <CtaSection />
      <SectionWaveDivider />
    </main>
  );
}
