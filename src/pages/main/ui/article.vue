<script setup lang="ts">
import { parse } from "date-fns";
import { dateFormat } from "~/shared/consts/formats";

type Props = {
  tags?: string[];
  path?: string;
  title: string;
  date?: string;
};

const props = defineProps<Props>();

const { locale } = useI18n();
const localePath = useLocalePath();

const articlePath = computed(() => {
  if (!props.path) {
    return;
  }

  const articleName = props.path.split("/").at(-1);

  if (!articleName) {
    return;
  }

  return localePath(
    {
      name: "article",
      params: {
        article: articleName,
      },
    },
    locale.value
  );
});
</script>

<template>
  <div class="flex flex-col">
    <NuxtLink v-if="articlePath" :to="articlePath">
      {{ title }}
    </NuxtLink>

    <div v-else>
      {{ title }}
    </div>

    <div class="flex gap-1 text-xs opacity-50" v-if="tags || date">
      <div v-if="date">
        {{ parse(date, dateFormat, new Date()).toLocaleDateString(locale) }},
      </div>

      <div class="capitalize" v-if="tags">
        <span v-for="(tag, index) in tags" :key="tag">
          <template v-if="index">,</template>
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
