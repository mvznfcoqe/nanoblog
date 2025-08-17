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

const articlePath = computed(() => {
  if (!props.path) {
    return;
  }

  return `/${locale.value}/${props.path.split("/").filter(Boolean).slice(1, -1).join("/")}`;
});
</script>

<template>
  <div class="flex flex-col prose">
    <a v-if="articlePath" :href="articlePath">
      {{ title }}
    </a>

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
