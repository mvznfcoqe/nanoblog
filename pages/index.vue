<template>
  <ContentRenderer v-if="homePageContent" :value="homePageContent" />

  <div class="flex flex-col gap-3">
    <div
      class="flex flex-col"
      v-for="article in articlesForCurrentLocale"
      :key="article.id"
    >
      <a :href="getArticlePagePath(article)">
        {{ article.title }}
      </a>

      <div class="text-xs opacity-50">
        {{ getArticleLocalizedDate(article) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContentCollectionItem } from "@nuxt/content";

const route = useRoute("tag-article");
const { locale } = useI18n();

const { data: homePageContent } = await useAsyncData(route.path, async () => {
  const path = `/main/${locale.value}`;

  return queryCollection("content").path(path).first();
});

const { data: articles } = await useAsyncData(route.path, async () => {
  return queryCollection("content").all();
});

const articlesForCurrentLocale = computed(() => {
  if (!articles.value) {
    return [];
  }

  return articles.value.filter((article: ContentCollectionItem) => {
    return article.path.endsWith(`/${locale.value}`);
  });
});

const getArticlePagePath = (article: ContentCollectionItem) => {
  return article.path.split("/").slice(0, -1).join("/");
};

const getArticleLocalizedDate = (article: ContentCollectionItem) => {
  if (typeof article.meta.date !== "string") {
    return;
  }

  const [day, month, year] = article.meta.date.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString(locale.value);
};
</script>
