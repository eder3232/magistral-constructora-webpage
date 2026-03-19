import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Descripción (SEO)",
      type: "text",
      rows: 3,
      description: "Máximo 160 caracteres para Google",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo (SEO)",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Contenido",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
