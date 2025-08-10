<template>
  <ContentRenderer :value="value" class="prose" />
</template>

<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{ value: IndexCollectionItem }>();
</script>
