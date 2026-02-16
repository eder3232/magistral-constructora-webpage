import { Hero } from "@/components/homepage/hero";
import { ProjectsSection } from "@/components/homepage/projects-section";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <ProjectsSection />
    </main>
  );
}
