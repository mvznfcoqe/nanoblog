<template>
  <div class="font-mono mx-5">
    <header class="flex justify-between gap-6 py-5 mx-auto max-w-820px">
      <div class="flex items-center gap-6">
        <NuxtLink class="flex gap-2 items-center" :to="localePath('/')">
          <img src="/favicon/favicon.gif" alt="Angry logo" class="size-6" />
          <span class="hidden sm:inline">frkam / </span>nanoblog
        </NuxtLink>
        <nav class="flex gap-2">
          <NuxtLink
            :to="localePath('/articles')"
            class="text-gray-800 hover:text-gray-600 transition-colors"
          >
            Articles
          </NuxtLink>
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

    <div class="prose mx-auto max-w-820px">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import "@unocss/reset/tailwind.css";
import "@fontsource-variable/roboto-mono";

const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const { locale } = useI18n();
</script>
