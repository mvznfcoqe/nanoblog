<template>
  <ContentRenderer v-if="article" :value="article" />

  <template v-else>Not found</template>
</template>

<script setup lang="ts">
import { ContentRenderer } from "~/shared/ui/content-renderer";

const route = useRoute("article");
const { locale } = useI18n();

const { data: article } = await useAsyncData(route.path, async () => {
  const { article } = route.params;

  const path = `/${locale.value}/articles/${article}`;

  return queryCollection("articles").path(path).first();
});
</script>
