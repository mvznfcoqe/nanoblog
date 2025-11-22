import { definePerson } from "nuxt-schema-org/schema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  srcDir: "src",
  dir: {
    plugins: "shared/plugins",
    public: "shared/public",
    assets: "shared/assets",
    pages: "../pages",
    layouts: "../layouts",
    middleware: "shared/middleware",
  },
  modules: [
    "@unocss/nuxt",
    "@nuxt/content",
    "@nuxtjs/device",
    "nuxt-typed-router",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "nuxt-schema-org",
  ],
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon/favicon.gif" },
      ],
      title: "frkam / nanoblog",
    },
  },
  experimental: {
    typedPages: true,
  },
  i18n: {
    locales: [
      {
        code: "ru",
        language: "ru",
        file: "ru.json",
      },
      {
        code: "en",
        language: "en",
        file: "en.json",
      },
    ],
    defaultLocale: "en",
    strategy: "prefix",
    langDir: "./locales",
  },
  site: {
    url: "https://frkam.dev",
    name: "frkam / nanoblog",
  },
  schemaOrg: {
    identity: definePerson({
      name: "frkam",
      url: "https://frkam.dev",
      sameAs: [
        "https://github.com/mvznfcoqe",
        "https://t.me/mvznfcoqe",
        "frkam@icloud.com",
      ],
    }),
  },
});
