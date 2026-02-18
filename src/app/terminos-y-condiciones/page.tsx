import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_CONTACT } from "@/lib/site-config";

export const metadata = {
  title: "Términos y Condiciones | Magistral Constructora",
  description:
    "Términos y condiciones de uso del sitio web de Magistral Constructora. Conoce las condiciones de acceso, uso de la información referencial y protección de datos.",
};

export default function TerminosYCondicionesPage() {
  return (
    <>
      {/* Hero — fondo oscuro */}
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-primary">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto h-1 w-12 rounded-full bg-secondary" />
          <h1 className="mt-4 font-sans text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
            Términos y Condiciones de Uso
          </h1>
          <p className="mt-2 text-base text-primary-foreground/90 md:text-lg">
            Magistral Constructora · Última actualización: Febrero 2026
          </p>
        </div>
      </section>

      {/* Sección 1-4 — fondo crema */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
          <ArticleBlock
            number={1}
            title="Identificación del Titular del Sitio Web"
            content={
              <>
                <p>
                  El presente sitio web es operado por{" "}
                  <strong>Magistral Constructora</strong>, empresa dedicada al
                  desarrollo, construcción y comercialización de proyectos
                  inmobiliarios en la ciudad de <strong>Arequipa, Perú</strong>,
                  incluyendo el proyecto{" "}
                  <strong>Edificio Multifamiliar Magistral</strong>.
                </p>
                <p className="mt-4">
                  El acceso y uso de este sitio web se encuentra sujeto a los
                  presentes Términos y Condiciones.
                </p>
              </>
            }
          />
          <ArticleBlock
            number={2}
            title="Aceptación de los Términos"
            content={
              <>
                <p>
                  Al navegar, acceder o utilizar este sitio web, el usuario
                  declara haber leído, comprendido y aceptado los presentes
                  Términos y Condiciones.
                </p>
                <p className="mt-4">
                  Si el usuario no está de acuerdo con estos términos, deberá
                  abstenerse de utilizar el sitio.
                </p>
              </>
            }
          />
          <ArticleBlock
            number={3}
            title="Uso Permitido del Sitio"
            content={
              <>
                <p>
                  El usuario se compromete a utilizar este sitio web únicamente
                  con fines lícitos y de manera responsable.
                </p>
                <p className="mt-4 font-medium text-foreground">
                  Queda prohibido:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                  <li>Utilizar el sitio para fines fraudulentos o ilegales.</li>
                  <li>
                    Alterar, dañar o interferir con el funcionamiento del sitio.
                  </li>
                  <li>
                    Intentar acceder sin autorización a sistemas internos o
                    bases de datos.
                  </li>
                  <li>
                    Proporcionar información falsa o inexacta en formularios.
                  </li>
                </ul>
              </>
            }
          />
          <ArticleBlock
            number={4}
            title="Información Referencial del Contenido Inmobiliario"
            content={
              <>
                <p>
                  Toda la información contenida en este sitio web, incluyendo
                  pero no limitándose a:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                  <li>Imágenes, renders y fotografías</li>
                  <li>Planos, metrajes y distribuciones</li>
                  <li>Precios, promociones o beneficios</li>
                  <li>Acabados, equipamiento y características</li>
                </ul>
                <p className="mt-4">
                  tiene carácter <strong>referencial</strong> y puede estar
                  sujeta a modificaciones sin previo aviso por razones técnicas,
                  comerciales o normativas.
                </p>
                <p className="mt-4">
                  Magistral Constructora no garantiza que el contenido publicado
                  sea definitivo o vinculante.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Sección 5-8 — fondo oscuro */}
      <section className="bg-primary">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
          <ArticleBlockDark
            number={5}
            title="Cotizaciones, Separaciones y Contratación"
            content={
              <p>
                El uso de formularios de contacto, solicitudes de información o
                cotización{" "}
                <strong>
                  no constituye una reserva, separación ni contrato de
                  compraventa
                </strong>
                . Toda adquisición de unidades inmobiliarias se formaliza
                únicamente mediante documentos contractuales suscritos entre las
                partes.
              </p>
            }
          />
          <ArticleBlockDark
            number={6}
            title="Responsabilidad Limitada"
            content={
              <>
                <p>
                  Magistral Constructora realiza esfuerzos razonables para
                  mantener la información actualizada y el sitio operativo; sin
                  embargo, no se responsabiliza por:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-primary-foreground/90">
                  <li>Interrupciones temporales del servicio web</li>
                  <li>Errores técnicos o fallas de conectividad</li>
                  <li>
                    Decisiones tomadas por el usuario basadas únicamente en
                    información referencial
                  </li>
                  <li>Uso indebido del sitio por terceros</li>
                </ul>
              </>
            }
          />
          <ArticleBlockDark
            number={7}
            title="Propiedad Intelectual"
            content={
              <>
                <p>
                  Todo el contenido presente en este sitio web es propiedad de
                  Magistral Constructora o cuenta con autorización para su uso.
                </p>
                <p className="mt-4">Esto incluye:</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-primary-foreground/90">
                  <li>Nombre comercial y logotipos</li>
                  <li>Textos, imágenes, renders y material gráfico</li>
                  <li>Diseño y estructura del sitio</li>
                </ul>
                <p className="mt-4">
                  Queda prohibida su reproducción total o parcial sin
                  autorización expresa.
                </p>
              </>
            }
          />
          <ArticleBlockDark
            number={8}
            title="Protección de Datos Personales"
            content={
              <>
                <p>
                  Los datos personales proporcionados por el usuario a través
                  del sitio web serán tratados de forma confidencial y
                  utilizados únicamente para:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-primary-foreground/90">
                  <li>Contacto comercial</li>
                  <li>Atención de solicitudes</li>
                  <li>Gestión de reclamos o quejas</li>
                </ul>
                <p className="mt-4">
                  De conformidad con la{" "}
                  <strong>
                    Ley N.º 29733 – Ley de Protección de Datos Personales
                  </strong>
                  , el usuario podrá ejercer sus derechos de acceso,
                  rectificación, cancelación u oposición.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Sección 9-12 — fondo crema */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
          <ArticleBlock
            number={9}
            title="Enlaces Externos"
            content={
              <>
                <p>
                  Este sitio puede contener enlaces a plataformas externas como:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                  <li>Google Maps</li>
                  <li>WhatsApp</li>
                  <li>Redes sociales</li>
                </ul>
                <p className="mt-4">
                  Magistral Constructora no se responsabiliza por el contenido,
                  políticas o prácticas de dichos sitios externos.
                </p>
              </>
            }
          />
          <ArticleBlock
            number={10}
            title="Modificaciones de los Términos"
            content={
              <p>
                Magistral Constructora se reserva el derecho de modificar o
                actualizar los presentes Términos y Condiciones en cualquier
                momento. Las modificaciones entrarán en vigencia desde su
                publicación en el sitio web.
              </p>
            }
          />
          <ArticleBlock
            number={11}
            title="Legislación Aplicable y Jurisdicción"
            content={
              <p>
                Estos Términos y Condiciones se rigen por las leyes de la
                República del Perú. Cualquier controversia será sometida a la
                jurisdicción de los tribunales competentes de la ciudad de{" "}
                <strong>Arequipa</strong>.
              </p>
            }
          />
          <ArticleBlock
            number={12}
            title="Contacto"
            content={
              <>
                <p>
                  Para consultas relacionadas con estos Términos y Condiciones,
                  puede comunicarse con:
                </p>
                <p className="mt-4 font-medium text-foreground">
                  Área Responsable: Atención al Cliente
                </p>
                <p className="mt-2">
                  <strong>Correo:</strong>{" "}
                  <a
                    href={`mailto:${SITE_CONTACT.emailToShowInThePage}`}
                    className="text-secondary underline underline-offset-2 hover:no-underline"
                  >
                    {SITE_CONTACT.emailToShowInThePage}
                  </a>
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* CTA final — fondo oscuro */}
      <section className="bg-primary">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center md:px-8 md:py-24 lg:px-16 lg:py-32">
          <h2 className="font-sans text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
            ¿Tienes preguntas?
          </h2>
          <p className="mt-4 text-base text-primary-foreground/90 lg:text-lg">
            Estamos para atenderte. Llámanos al número que figura en contacto o
            visita nuestra página de inicio.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="min-h-[44px] min-w-[200px] bg-secondary px-8 text-secondary-foreground hover:bg-secondary/90"
            >
              <Link href="/">Ir al inicio</Link>
            </Button>
            <Button
              asChild
              className="min-h-[44px] min-w-[200px] border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <span>Llamar al {SITE_CONTACT.telefonoDisplay}</span>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function ArticleBlock({
  number,
  title,
  content,
}: {
  number: number;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <article className="mb-16 last:mb-0">
      <div className="h-1 w-10 rounded-full bg-secondary" />
      <h2 className="mt-4 font-sans text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
        {number}. {title}
      </h2>
      <div className="mt-6 space-y-4 text-base text-muted-foreground lg:text-lg [&_p]:leading-relaxed [&_ul]:leading-relaxed">
        {content}
      </div>
    </article>
  );
}

function ArticleBlockDark({
  number,
  title,
  content,
}: {
  number: number;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <article className="mb-16 last:mb-0">
      <div className="h-1 w-10 rounded-full bg-secondary" />
      <h2 className="mt-4 font-sans text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
        {number}. {title}
      </h2>
      <div className="mt-6 space-y-4 text-base text-primary-foreground/90 lg:text-lg [&_p]:leading-relaxed [&_ul]:leading-relaxed">
        {content}
      </div>
    </article>
  );
}
