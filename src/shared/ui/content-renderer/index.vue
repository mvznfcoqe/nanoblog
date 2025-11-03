<template>
  <ContentRenderer :value="value" class="content prose" />
</template>

<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{ value: IndexCollectionItem }>();
</script>

<style>
.content img {
  @apply w-full;
}
</style>
