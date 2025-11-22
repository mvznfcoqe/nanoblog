<template>
  <ContentRenderer v-if="article" :value="article" />

  <template v-else>Not found</template>
</template>

<script setup lang="ts">
import { ContentRenderer } from "~/shared/ui/content-renderer";

const route = useRoute("articles-article");
const { locale } = useI18n();

const { data: article } = await useAsyncData(route.path, async () => {
  const { article } = route.params;

  const path = `/${locale.value}/articles/${article}`;

  return queryCollection("articles").path(path).first();
});

const title = computed(() => {
  if (!article.value) {
    return;
  }

  return article.value.title;
});

const description = computed(() => {
  if (!article.value) {
    return;
  }

  return article.value.description;
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
});
</script>
