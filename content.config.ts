import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { asSitemapCollection } from "@nuxtjs/sitemap/content";
import { asSchemaOrgCollection } from "nuxt-schema-org/content";

const ArticleSchema = z.object({
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
  description: z.string(),
  preview: z.string(),
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
      asSchemaOrgCollection(
        asSitemapCollection({
          type: "page",
          source: "**/articles/**/*.md",
          schema: ArticleSchema,
        })
      )
    ),
    books: defineCollection(
      asSchemaOrgCollection(
        asSitemapCollection({
          type: "data",
          source: "**/books/**/*.md",
          schema: BookSchema,
        })
      )
    ),
  },
});
