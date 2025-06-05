<template>
  <ContentRenderer v-if="homePageContent" :value="homePageContent" />

  <div class="flex flex-col gap-3">
    <div
      class="flex flex-col prose"
      v-for="{ id, title, tags, date, path } in articlesForCurrentLocale"
      :key="id"
    >
      <a :href="getArticlePagePath(path)">
        {{ title }}
      </a>

      <div class="flex gap-1 text-xs opacity-50">
        <div>
          {{ parse(date, dateFormat, new Date()).toLocaleDateString(locale) }},
        </div>

        <div class="capitalize">
          <span
            v-for="(tag, index) in tags"
            :key="tag"
            @click="handleTagClicked(tag)"
          >
            <template v-if="index">,</template>
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArticlesCollectionItem } from "@nuxt/content";
import { parse } from "date-fns";
import { dateFormat } from "~/shared/consts/formats";
import { ContentRenderer } from "~/shared/ui/content-renderer";

const { play } = useSound("/assets/sounds/sylvana.mp3", { volume: 0.6 });

const route = useRoute("article");
const { locale } = useI18n();

const { data: homePageContent } = await useAsyncData(route.path, async () => {
  const path = `/${locale.value}`;

  return queryCollection("articles").path(path).first();
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

const getArticlePagePath = (path: ArticlesCollectionItem["path"]) => {
  return path.split("/").filter(Boolean).slice(1, -1).join("/");
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
