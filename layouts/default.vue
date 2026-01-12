<template>
  <div class="font-mono mx-5 flex flex-col h-full">
    <header class="flex justify-between gap-6 py-5 container">
      <div class="flex items-center gap-6">
        <NuxtLink class="flex gap-2 items-center" :to="localePath('/')">
          <img :src="Logo" alt="Logo" class="size-6" />
          <span class="hidden sm:inline">frkam / </span>nanoblog
        </NuxtLink>
        <nav class="flex gap-4">
          <NuxtLink
            :to="localePath('/articles')"
            class="text-gray-800 hover:text-gray-600 transition-colors"
          >
            {{ $t("nav.articles") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/books')"
            class="text-gray-800 hover:text-gray-600 transition-colors"
          >
            {{ $t("nav.books") }}
          </NuxtLink>
        </nav>
      </div>

      <div class="flex items-center">
        <NuxtLink :to="switchLocalePath('en')" v-if="locale === 'ru'">
          en
        </NuxtLink>

        <NuxtLink :to="switchLocalePath('ru')" v-if="locale === 'en'">
          ru
        </NuxtLink>
      </div>
    </header>

    <div class="prose container flex-1">
      <slot />
    </div>

    <Footer class="container" />
  </div>
</template>

<script setup lang="ts">
import "@/shared/assets/styles.css";
import "@unocss/reset/tailwind.css";
import "@fontsource-variable/roboto-mono";
import Logo from "~/shared/assets/logo.jpg";
import { Footer } from "~/shared/ui/layout";

const siteName = "frkam / nanoblog";

useHead({
  templateParams: {
    siteName,
  },
});

const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const { locale } = useI18n();

useSeoMeta({
  ogLocale: locale,
  ogSiteName: siteName,
});
</script>
