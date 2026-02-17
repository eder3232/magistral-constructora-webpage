import { AvanceDeObra } from "./_components/avance-de-obra";
import { CaracteristicasV2 } from "./_components/caracteristicas";
import { DistribucionDepartamentos } from "./_components/distribucion-departamentos";
import { Estadisticas } from "./_components/estadisticas";
import { Hero } from "./_components/hero";
import { ParallaxImageMarquee } from "../../_componentes/parallax-image-marquee";
import { Sostenibilidad } from "./_components/sostenibilidad";
import { UbicacionSection } from "./_components/ubicacion/UbicacionSection";

const Page = () => {
  return (
    <div>
      <Hero />
      <UbicacionSection />
      <DistribucionDepartamentos />
      <CaracteristicasV2 />
      <Estadisticas />
      <AvanceDeObra />
      <Sostenibilidad />
      <ParallaxImageMarquee />
    </div>
  );
};

export default Page;
