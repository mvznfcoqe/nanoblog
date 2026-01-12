<template>
  <div>
    <div>
      <div class="flex justify-between items-center">
        <h4>{{ $t("home.latestArticles") }}</h4>

        <NuxtLink :to="localePath('/articles')" class="text-gray">
          {{ $t("home.viewMore") }}
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-3">
        <Article
          v-for="article in articlesForCurrentLocale"
          :key="article.id"
          v-bind="article"
        />
      </div>
    </div>

    <div class="mt-5">
      <div class="flex justify-between items-center">
        <h4 class="flex justify-between items-center">
          {{ $t("home.latestBooks") }}
        </h4>

        <NuxtLink :to="localePath('/books')" class="text-gray">
          {{ $t("home.viewMore") }}
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-2">
        <Book
          v-for="book in booksForCurrentLocale"
          :key="book.id"
          v-bind="book"
        />
      </div>
    </div>

    <div class="mt-5">
      <div class="flex justify-between items-center">
        <h4>{{ $t("home.metrics") }}</h4>
      </div>

      <div>
        <Metrics />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ArticlesCollectionItem,
  BooksCollectionItem,
} from "@nuxt/content";
import { Article, Book } from "@/pages/main";
import Metrics from "~/pages/main/ui/metrics.vue";

const { locale, t } = useI18n();

useSeoMeta({
  title: `%siteName`,
  description: t("pages.main.description"),
});

const localePath = useLocalePath();

const { data: articles } = await useAsyncData("articles", async () => {
  return queryCollection("articles").all();
});

const { data: books } = await useAsyncData<BooksCollectionItem[]>(
  "books",
  async () => {
    return queryCollection("books").all();
  }
);

const articlesForCurrentLocale = computed(() => {
  if (!articles.value) {
    return [];
  }

  return articles.value
    .filter((article: ArticlesCollectionItem) => {
      return article.path.startsWith(`/${locale.value}/articles`);
    })
    .slice(0, 3);
});

const booksForCurrentLocale = computed(() => {
  if (!books.value) {
    return [];
  }

  return books.value
    .filter((book: BooksCollectionItem) => {
      return book.path.startsWith(`/${locale.value}/books`);
    })
    .slice(0, 3);
});
</script>
