import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export const ArticleSchema = z.object({
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const BookSchema = z.object({
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
    articles: defineCollection({
      type: "page",
      source: "articles/**/*.md",
      schema: ArticleSchema,
    }),
    books: defineCollection({
      type: "data",
      source: "books/**/*.md",
      schema: BookSchema,
    }),
    index: defineCollection({
      type: "page",
      source: "index/**/*.md",
      schema: z.object({}),
    }),
  },
});
