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

const faviconsAmount = 32;

const favicons = Array.from(Array(faviconsAmount), (_, i) => {
  return `/favicon/favicon-${i + 1}.ico`;
});

const faviconIndex = ref(0);
const favicon = ref(favicons[faviconIndex.value]);

const changeAnimatedFavicon = () => {
  console.log(faviconIndex.value);
  if (faviconIndex.value === faviconsAmount - 1) {
    faviconIndex.value = 0;
  } else {
    faviconIndex.value += 1;
  }

  favicon.value = favicons[faviconIndex.value];
};

onMounted(() => {
  if (!isDesktop) {
    return;
  }

  if (isFirefox) {
    favicon.value = `/favicon/favicon.gif`;

    return;
  }

  setInterval(changeAnimatedFavicon, 1000);
});

useHead({ link: [{ rel: "icon", href: favicon }] });
</script>
