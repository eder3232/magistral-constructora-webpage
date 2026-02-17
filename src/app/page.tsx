import { Hero } from "@/components/homepage/hero";
import { ProjectsSection } from "@/components/homepage/projects-section";
import { ParallaxImageMarquee } from "@/components/homepage/parallax-image-marquee";
import { CtaSection } from "@/components/homepage/cta-section";
import { SectionWaveDivider } from "@/components/section-wave-divider";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <ParallaxImageMarquee />
      <ProjectsSection />
      <CtaSection />
      <SectionWaveDivider />
      <Footer />
    </main>
  );
}
