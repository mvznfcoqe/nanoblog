<template>
  <ContentRenderer v-if="homePageContent" :value="homePageContent" />

  <div class="flex flex-col gap-3">
    <div
      class="flex flex-col prose"
      v-for="article in articlesForCurrentLocale"
      :key="article.id"
    >
      <a :href="getArticlePagePath(article)">
        {{ article.title }}
      </a>

      <div class="flex gap-2 text-xs opacity-50">
        <div class="capitalize">{{ getArticlePageTag(article) }}</div>

        <div>
          {{ getArticleLocalizedDate(article) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContentCollectionItem } from "@nuxt/content";
import { ContentRenderer } from "~/shared/ui/content-renderer";

const route = useRoute("tag-article");
const { locale } = useI18n();

const { data: homePageContent } = await useAsyncData(route.path, async () => {
  const path = `/${locale.value}`;

  return queryCollection("content").path(path).first();
});

const { data: articles } = await useAsyncData("articles", async () => {
  return queryCollection("content").all();
});

const articlesForCurrentLocale = computed(() => {
  if (!articles.value) {
    return [];
  }

  return articles.value.filter((article: ContentCollectionItem) => {
    return (
      article.path.endsWith(`/${locale.value}`) &&
      article.path.startsWith(`/articles`)
    );
  });
});

const getArticlePagePath = (article: ContentCollectionItem) => {
  return article.path.split("/").filter(Boolean).slice(1, -1).join("/");
};

const getArticlePageTag = (article: ContentCollectionItem) => {
  return article.path.split("/").filter(Boolean)[1];
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
