<template>
  <div class="flex flex-col gap-8">
    <div
      class="flex flex-col sm:flex-row gap-2 w-full"
      v-for="{
        id,
        title,
        description,
        author,
        date,
        url,
        cover,
      } in booksForCurrentLocale"
      :key="id"
      :id="textToId(title)"
    >
      <a :href="url" class="max-w-50% sm:w-18 shrink-0 flex items-center">
        <NuxtImg class="w-full" :src="cover" />
      </a>

      <div class="flex flex-col">
        <a :href="url">{{ title }}</a>
        {{ description }}

        <div class="flex gap-2 text-xs opacity-50">
          {{ getBookLocalizedDate(date) }},
          {{ author }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BooksCollectionItem } from "@nuxt/content";
import { textToId } from "~/shared/lib/text-to-id";

const { locale, t } = useI18n();

useSeoMeta({
  title: `${t("pages.books.title")} %separator %siteName`,
  description: t("pages.books.description"),
});

const { data: books } = await useAsyncData<BooksCollectionItem[]>(
  "books",
  async () => {
    return queryCollection("books").all();
  }
);

const booksForCurrentLocale = computed(() => {
  if (!books.value) {
    return [];
  }

  return books.value.filter((book: BooksCollectionItem) => {
    return book.path.startsWith(`/${locale.value}/books`);
  });
});

const getBookLocalizedDate = (bookDate: string) => {
  const [day, month, year] = bookDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString(locale.value);
};
</script>
