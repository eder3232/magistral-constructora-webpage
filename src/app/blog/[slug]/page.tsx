import { client, urlFor } from "@/lib/sanity";
import { postBySlugQuery, postsQuery } from "@/lib/queries";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar } from "lucide-react";

// ISR: regenera como máximo cada hora. La invalidación on-demand
// (webhook de Sanity → /api/revalidate) se encarga del resto.
export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

// Genera todas las rutas /blog/[slug] como HTML estático en build time
export async function generateStaticParams() {
  const posts = await client.fetch(
    postsQuery,
    {},
    { next: { tags: ["posts"] } }
  );
  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
}

// Metadata dinámica por post — title, description y Open Graph para SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(
    postBySlugQuery,
    { slug },
    { next: { tags: ["posts"] } }
  );
  if (!post) return { title: "Post no encontrado" };

  return {
    title: `${post.title} | Magistral Constructora`,
    description: post.metaDescription ?? undefined,
    openGraph: {
      title: post.title,
      description: post.metaDescription ?? undefined,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      images: post.mainImage
        ? [{ url: urlFor(post.mainImage).width(1200).height(630).url() }]
        : [],
    },
  };
}

// Componentes personalizados para el Portable Text de Sanity
const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-10 mb-4 text-3xl font-bold leading-tight text-primary sm:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 text-2xl font-bold leading-snug text-primary sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-2 text-xl font-semibold leading-snug text-primary">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-base leading-relaxed text-foreground/80">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-secondary pl-5 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary underline underline-offset-2 hover:opacity-80 transition-opacity"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 ml-6 list-disc space-y-1.5 text-foreground/80">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 ml-6 list-decimal space-y-1.5 text-foreground/80">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-base leading-relaxed">{children}</li>
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch(
    postBySlugQuery,
    { slug },
    { next: { tags: ["posts"] } }
  );

  if (!post) notFound();

  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : null;
  const formattedDate = publishedDate
    ? publishedDate.toLocaleDateString("es-CL", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
    : null;

  return (
    <main className="w-full">
      {/* Hero — mismo estilo que /blog/page.tsx */}
      <section className="relative w-full overflow-hidden bg-primary py-16 md:py-24">
        <div
          aria-hidden
          className="absolute -top-24 left-1/2 h-72 w-160 -translate-x-1/2 rounded-full bg-secondary/25 blur-3xl"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 mb-6 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              Volver al Blog
            </Link>

            {formattedDate && (
              <div className="mb-4">
                <Badge variant="secondary" className="gap-1.5">
                  <Calendar className="size-3" />
                  {formattedDate}
                </Badge>
              </div>
            )}

            <h1 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl leading-tight">
              {post.title}
            </h1>
            <div className="mt-4 h-1 w-20 rounded-full bg-secondary" />

            {post.metaDescription && (
              <p className="mt-4 text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
                {post.metaDescription}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Contenido del artículo */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <article className="mx-auto max-w-3xl">
            {/* Imagen principal */}
            {post.mainImage && (
              <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-xl bg-primary/5">
                <Image
                  src={urlFor(post.mainImage).width(1200).height(675).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Cuerpo del post (Portable Text de Sanity) */}
            {post.body && (
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            )}

            {/* Pie del artículo */}
            <div className="mt-12 border-t border-border pt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-secondary ring-1 ring-secondary/20 transition hover:bg-secondary/10"
              >
                <ArrowLeft className="size-4" />
                Ver todos los artículos
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
