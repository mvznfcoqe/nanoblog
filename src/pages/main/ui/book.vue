<script setup lang="ts">
import { parse } from "date-fns";
import { dateFormat } from "~/shared/consts/formats";
import { textToId } from "~/shared/lib/text-to-id";

type Props = {
	title: string;
	date?: string;
	description?: string;
};

const props = defineProps<Props>();

const { locale } = useI18n();
const localePath = useLocalePath();

const bookPath = computed(() => {
	return localePath(
		{ name: "books", hash: `#${textToId(props.title)}` },
		locale.value,
	);
});
</script>

<template>
  <div class="flex flex-col prose">
    <NuxtLink v-if="bookPath" :to="bookPath">
      {{ title }}
    </NuxtLink>

    <div v-else>
      {{ title }}
    </div>

    <div class="flex gap-1 text-xs opacity-50" v-if="date">
      <div v-if="date">
        {{ parse(date, dateFormat, new Date()).toLocaleDateString(locale) }}
      </div>
    </div>
  </div>
</template>
