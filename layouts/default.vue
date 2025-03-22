<template>
  <div class="font-sans mx-5">
    <header class="flex justify-between py-5 font-mono">
      <a class="flex gap-2 items-center" href="/">
        <img src="/assets/logo.gif" alt="Angry logo" class="size-6" />

        frkam / nanoblog
      </a>
    </header>

    <div class="max-w-prose mx-auto mt-5">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import "@unocss/reset/tailwind.css";

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
