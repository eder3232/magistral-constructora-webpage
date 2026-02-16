import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight mb-6">
          Tu hogar en Arequipa
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl lg:text-2xl text-balance text-gray-100 mb-12 leading-relaxed">
          Departamentos y proyectos inmobiliarios en las mejores zonas de Arequipa
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          className="bg-secondary hover:bg-[#ff5722] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Contáctanos
        </Button>
      </div>
    </section>
  );
}
