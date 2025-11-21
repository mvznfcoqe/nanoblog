<template>
  <div class="font-mono mx-5 flex flex-col h-full">
    <header class="flex justify-between gap-6 py-5 container">
      <div class="flex items-center gap-6">
        <NuxtLink class="flex gap-2 items-center" :to="localePath('/')">
          <img src="/favicon/favicon.gif" alt="Angry logo" class="size-6" />
          <span class="hidden sm:inline">frkam / </span>nanoblog
        </NuxtLink>
        <nav class="flex gap-4">
          <NuxtLink
            :to="localePath('/articles')"
            class="text-gray-800 hover:text-gray-600 transition-colors"
          >
            articles
          </NuxtLink>
          <NuxtLink
            :to="localePath('/books')"
            class="text-gray-800 hover:text-gray-600 transition-colors"
          >
            books
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
import Footer from "~/shared/ui/layout/footer.vue";

const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const { locale } = useI18n();
</script>
