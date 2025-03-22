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
        <div class="capitalize">
          <span
            v-for="(tag, index) in getArticlePageTags(article)"
            :key="tag"
            @click="handleTagClicked(tag)"
          >
            <template v-if="index">,</template>
            {{ tag }}
          </span>
        </div>

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

const { play } = useSound("/assets/sounds/sylvana.mp3", { volume: 0.6 });

const route = useRoute("article");
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
      article.path.startsWith(`/articles`) &&
      article.path.endsWith(`/${locale.value}`)
    );
  });
});

const getArticlePagePath = (article: ContentCollectionItem) => {
  return article.path.split("/").filter(Boolean).slice(1, -1).join("/");
};

const getArticlePageTags = (article: ContentCollectionItem) => {
  if (!article.meta.tags || !Array.isArray(article.meta.tags)) {
    return [];
  }

  return article.meta.tags.slice(0, 3);
};

const getArticleLocalizedDate = (article: ContentCollectionItem) => {
  if (typeof article.meta.date !== "string") {
    return;
  }

  const [day, month, year] = article.meta.date.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString(locale.value);
};

const gamesTagClickedCount = ref(0);

const handleTagClicked = (tag: string) => {
  if (tag === "games") {
    gamesTagClickedCount.value += 1;

    if (gamesTagClickedCount.value === 3) {
      play();

      gamesTagClickedCount.value = 0;
    }
  }
};
</script>
