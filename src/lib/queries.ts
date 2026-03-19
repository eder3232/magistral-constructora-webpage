export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    metaDescription,
    publishedAt,
    mainImage {
      asset,
      alt
    }
  }`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    metaDescription,
    publishedAt,
    mainImage {
      asset,
      alt
    },
    body
  }`;
