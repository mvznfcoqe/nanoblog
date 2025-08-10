<template>
  <div class="font-sans mx-5">
    <header class="flex justify-between gap-6 py-5 font-mono">
      <div class="flex items-center gap-6">
        <a class="flex gap-2 items-center" href="/">
          <img src="/assets/logo.gif" alt="Angry logo" class="size-6" />
          <span class="hidden sm:inline">frkam / </span>nanoblog
        </a>
        <nav class="flex gap-2">
          <NuxtLink
            :to="localePath('/books')"
            class="text-gray-800 hover:text-gray-600 transition-colors"
          >
            Books
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

    <div class="max-w-prose mx-auto mt-5">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import "@unocss/reset/tailwind.css";

const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const { locale } = useI18n();
</script>
