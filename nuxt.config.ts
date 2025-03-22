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
    "nuxt-cloudflare-analytics",
  ],
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon/favicon-1.ico" },
      ],
      title: "frkam / nanoblog",
    },
  },
  experimental: {
    typedPages: true,
  },
  i18n: {
    locales: ["ru"],
    defaultLocale: "ru",
  },
  cloudflareAnalytics: {
    token: "4f9fe97ac3af40b5a4a6c37ede082fae",
    scriptPath: "/scripts/cf.js",
  },
});
