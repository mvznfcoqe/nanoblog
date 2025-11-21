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
  </div>
</template>

<script setup lang="ts">
import type {
  ArticlesCollectionItem,
  BooksCollectionItem,
} from "@nuxt/content";
import { Article } from "@/pages/main";
import { Book } from "@/pages/main";

const localePath = useLocalePath();
const { locale } = useI18n();

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
      return (
        article.path.startsWith(`/articles`) &&
        article.path.endsWith(`/${locale.value}`)
      );
    })
    .slice(0, 3);
});

const booksForCurrentLocale = computed(() => {
  if (!books.value) {
    return [];
  }

  return books.value
    .filter((book: BooksCollectionItem) => {
      return (
        book.path.startsWith(`/books`) && book.path.includes(`/${locale.value}`)
      );
    })
    .slice(0, 3);
});
</script>
