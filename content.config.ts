import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { asSitemapCollection } from "@nuxtjs/sitemap/content";

const ArticleSchema = z.object({
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
  description: z.string(),
});

const BookSchema = z.object({
  path: z.string(),
  title: z.string(),
  description: z.string(),
  author: z.string(),
  url: z.string().url(),
  cover: z.string().url(),
  date: z.string(),
});

export default defineContentConfig({
  collections: {
    articles: defineCollection(
      asSitemapCollection({
        type: "page",
        source: "**/articles/**/*.md",
        schema: ArticleSchema,
      })
    ),
    books: defineCollection(
      asSitemapCollection({
        type: "data",
        source: "**/books/**/*.md",
        schema: BookSchema,
      })
    ),
  },
});
