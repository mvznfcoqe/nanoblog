<template>
  <ContentRenderer :value="value" class="prose" />
</template>

<script setup lang="ts">
import type { ContentCollectionItem } from "@nuxt/content";

defineProps<{ value: ContentCollectionItem }>();
</script>
