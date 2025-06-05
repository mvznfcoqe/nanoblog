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
    "@vueuse/nuxt",
    "@nuxt/image",
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
    locales: ["ru", "en"],
    defaultLocale: "en",
    strategy: "prefix",
  },
  cloudflareAnalytics: {
    token: "6a325b5be6754676a4daefe7c6257681",
    scriptPath: "/scripts/cf.js",
  },
});