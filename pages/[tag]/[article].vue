<template>
  <ContentRenderer v-if="article" :value="article" />

  <template v-else>Not found</template>
</template>

<script setup lang="ts">
import { ContentRenderer } from "~/shared/ui/content-renderer";

const route = useRoute("tag-article");
const { locale } = useI18n();

const { data: article } = await useAsyncData(route.path, async () => {
  const { article, tag } = route.params;

  const path = `/articles/${tag}/${article}/${locale.value}`;

  return queryCollection("content").path(path).first();
});
</script>
