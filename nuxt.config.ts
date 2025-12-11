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
				{
					rel: "icon",
					type: "image/png",
					href: "/favicon/favicon-96x96.png",
					sizes: "96x96",
				},
				{
					rel: "icon",
					type: "image/svg+xml",
					href: "/favicon/favicon.svg",
				},
				{
					rel: "shortcut icon",
					href: "/favicon/favicon.ico",
				},
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/favicon/apple-touch-icon.png",
				},
				{ rel: "manifest", href: "/favicon/site.webmanifest" },
			],
			meta: [
				{
					name: "apple-mobile-web-app-title",
					content: "nanoblog",
				},
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
		defaultLocale: "ru",
		strategy: "prefix_except_default",
		langDir: "./locales",
	},
	site: {
		url: "https://frkam.dev",
		name: "frkam / nanoblog",
		trailingSlash: true,
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
	routeRules: {
		"/ru": { redirect: { to: "/", statusCode: 301 } },
		"/ru/**": { redirect: { to: "/**", statusCode: 301 } },
	},
});
