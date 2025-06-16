<template>
  <div class="font-sans mx-5">
    <header class="flex justify-between gap-2 py-5 font-mono">
      <div class="flex items-center gap-4">
        <a class="flex gap-2 items-center" href="/">
          <img src="/assets/logo.gif" alt="Angry logo" class="size-6" />
          frkam / nanoblog
        </a>
        <nav class="flex gap-2">
          <NuxtLink
            :to="localePath('/')"
            class="text-gray-800 hover:text-gray-600 transition-colors"
          >
            Home
          </NuxtLink>
          <NuxtLink>
            I nee
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

const { isFirefox, isDesktop } = useDevice();

const favicon = ref();

onMounted(() => {
  if (isFirefox && isDesktop) {
    favicon.value = `/favicon/favicon.gif`;

    return;
  }
});

useHead({ link: [{ rel: "icon", href: favicon }] });
</script>
