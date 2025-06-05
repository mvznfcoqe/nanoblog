import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: "page",
      source: "articles/**/*.md",
      schema: z.object({
        path: z.string(),
        date: z.string(),
        tags: z.array(z.string()),
      }),
    }),
    books: defineCollection({
      type: "data",
      source: "books/**/*.md",
      schema: z.object({
        path: z.string(),
        title: z.string(),
        description: z.string(),
        author: z.string(),
        url: z.string().url(),
        cover: z.string().url(),
        date: z.string(),
      }),
    }),
  },
});
