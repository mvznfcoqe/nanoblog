<template>
  <div class="flex flex-col gap-3">
    <Article
      v-for="article in articlesForCurrentLocale"
      :key="article.id"
      v-bind="article"
    />
  </div>
</template>

<script setup lang="ts">
import type { ArticlesCollectionItem } from "@nuxt/content";
import { Article } from "@/pages/main";

const { locale } = useI18n();

const { data: articles } = await useAsyncData("articles", async () => {
  return queryCollection("articles").all();
});

const articlesForCurrentLocale = computed(() => {
  if (!articles.value) {
    return [];
  }

  return articles.value.filter((article: ArticlesCollectionItem) => {
    return article.path.startsWith(`/${locale.value}/articles`);
  });
});
</script>
