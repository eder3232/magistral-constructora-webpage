import type { Metadata } from "next";
import { FormularioReclamo } from "./formulario-reclamo";

export const metadata: Metadata = {
  title: "Libro de reclamaciones | Magistral Constructora",
  description:
    "Registre su reclamo o queja de forma formal. Magistral Constructora atiende su Libro de Reclamaciones Virtual conforme a la normativa del INDECOPI. Respuesta en 15 días hábiles.",
};

export default function LibroReclamacionesPage() {
  return (
    <>
      {/* Hero de página interna */}
      <section
        className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-primary"
        aria-label="Libro de reclamaciones"
      >
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto h-1 w-12 rounded-full bg-secondary" />
          <h1 className="mt-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
            Libro de reclamaciones
          </h1>
          <p className="mt-2 text-base text-primary-foreground/90 md:text-lg">
            Deje constancia formal de su reclamo o queja. Le responderemos en un
            plazo máximo de 15 días hábiles, conforme a la normativa vigente.
          </p>
        </div>
      </section>

      {/* Sección información legal */}
      <section
        className="bg-background"
        aria-labelledby="info-legal-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <h2
              id="info-legal-heading"
              className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl"
            >
              Información importante
            </h2>
            <div className="mt-4 h-1 w-10 rounded-full bg-secondary" />
            <div className="mt-6 space-y-4 text-base text-muted-foreground lg:text-lg">
              <p>
                En cumplimiento de lo establecido en el Código de Protección y
                Defensa del Consumidor (Ley N.º 29571) y el Reglamento del Libro
                de Reclamaciones, se informa al consumidor que:
              </p>
              <p>
                La presentación de un reclamo o queja a través del presente
                Libro de Reclamaciones Virtual constituye un medio formal para
                dejar constancia de su disconformidad respecto a los productos o
                servicios ofrecidos por Magistral Constructora.
              </p>
              <p>
                La formulación del reclamo o queja no impide al consumidor
                acudir a otras vías de solución de controversias, ni constituye
                requisito previo para interponer una denuncia ante el INDECOPI.
              </p>
              <p>
                Magistral Constructora dará respuesta al reclamo o queja
                presentado en un plazo máximo de quince (15) días hábiles,
                conforme a la normativa vigente.
              </p>
              <p>
                Los datos personales consignados serán tratados de manera
                confidencial y utilizados únicamente para la gestión y atención
                del reclamo o queja, de acuerdo con la Ley de Protección de
                Datos Personales (Ley N.º 29733).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección formulario */}
      <section
        className="bg-primary"
        aria-labelledby="form-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
          <h2
            id="form-heading"
            className="font-display text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl"
          >
            Registre su reclamo o queja
          </h2>
          <div className="mt-4 h-1 w-10 rounded-full bg-secondary" />
          <p className="mt-6 text-base text-primary-foreground/90 lg:text-lg">
            Complete el formulario con sus datos y el detalle de su registro.
            Recibirá una constancia por correo y le atenderemos en un plazo
            máximo de 15 días hábiles.
          </p>
          <div className="mt-10">
            <FormularioReclamo />
          </div>
        </div>
      </section>
    </>
  );
}
