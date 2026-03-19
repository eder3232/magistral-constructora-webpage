import { client } from "@/lib/sanity";
import { postsQuery } from "@/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: "Blog | Magistral Constructora",
  description: "Artículos y noticias sobre construcción e inmobiliaria en Arequipa.",
};

export default async function BlogPage() {
  const posts = await client.fetch(postsQuery, {}, { next: { tags: ["posts"] } });

  return (
    <main className="w-full">
      <section className="relative w-full overflow-hidden bg-primary py-16 md:py-24">
        <div
          aria-hidden
          className="absolute -top-24 left-1/2 h-72 w-160 -translate-x-1/2 rounded-full bg-secondary/25 blur-3xl"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Actualizaciones
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
              Blog
            </h1>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-secondary" />
            <p className="mt-4 text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
              Artículos y noticias sobre construcción e inmobiliaria. Ideas,
              avances y consejos para tu próximo proyecto.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
                Últimos artículos
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Mostramos las publicaciones más recientes de nuestra constructora.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-primary/20 text-primary">
                {posts.length} publicaciones
              </Badge>
            </div>
          </div>

          <div className="grid gap-6">
            {posts.map((post: any) => {
              const publishedDate = post.publishedAt
                ? new Date(post.publishedAt)
                : null;

              const formattedDate = publishedDate
                ? publishedDate.toLocaleDateString("es-CL", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })
                : null;

              return (
                <article key={post._id}>
                  <Card className="group overflow-hidden border-primary/15 bg-card p-0 gap-0 shadow-sm transition-shadow hover:shadow-md">
                    {post.mainImage && (
                      <div className="relative aspect-video w-full bg-primary/5">
                        <Link
                          href={`/blog/${post.slug.current}`}
                          aria-label={`Leer: ${post.title}`}
                        >
                          <Image
                            src={urlFor(post.mainImage).width(1200).height(675).url()}
                            alt={post.mainImage.alt || post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            priority={false}
                          />
                        </Link>
                      </div>
                    )}

                    <div className="p-6 sm:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        {formattedDate ? (
                          <Badge variant="secondary" className="text-white">
                            {formattedDate}
                          </Badge>
                        ) : null}

                        <span className="text-xs uppercase tracking-widest text-muted-foreground">
                          Blog
                        </span>
                      </div>

                      <h2 className="mt-4 text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="inline-flex items-center gap-2 hover:text-secondary transition-colors"
                        >
                          {post.title}
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </h2>

                      {post.metaDescription ? (
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {post.metaDescription}
                        </p>
                      ) : null}

                      <div className="mt-6 flex items-center justify-between gap-3">
                        {post.publishedAt ? (
                          <time
                            dateTime={post.publishedAt}
                            className="text-xs text-muted-foreground"
                          >
                            Publicado: {formattedDate ?? post.publishedAt}
                          </time>
                        ) : (
                          <span className="text-xs text-muted-foreground"> </span>
                        )}

                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-secondary ring-1 ring-secondary/20 transition hover:bg-secondary/10"
                        >
                          Leer artículo
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
