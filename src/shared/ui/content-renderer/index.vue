<template>
  <ContentRenderer :value="value" class="prose prose-gray font-500" />
</template>

<script setup lang="ts">
import type { ContentCollectionItem } from "@nuxt/content";

defineProps<{ value: ContentCollectionItem }>();
</script>
