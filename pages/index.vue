<template>
  <ContentRenderer v-if="homePageContent" :value="homePageContent" />

  <hr v-if="articlesForCurrentLocale.length" />

  <div class="flex flex-col gap-3 mt-4">
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
import { ContentRenderer } from "~/shared/ui/content-renderer";

const route = useRoute("article");
const { locale } = useI18n();

const { data: homePageContent } = await useAsyncData(route.path, async () => {
  const path = `/${locale.value}`;

  return queryCollection("index").path(path).first();
});

const { data: articles } = await useAsyncData("articles", async () => {
  return queryCollection("articles").all();
});

const articlesForCurrentLocale = computed(() => {
  if (!articles.value) {
    return [];
  }

  return articles.value.filter((article: ArticlesCollectionItem) => {
    return (
      article.path.startsWith(`/articles`) &&
      article.path.endsWith(`/${locale.value}`)
    );
  });
});
</script>
