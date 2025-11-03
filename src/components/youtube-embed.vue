<template>
  <div class="w-full my-4">
    <iframe
      class="max-w-full! aspect-ratio-video w-full! h-auto!"
      :src="embedUrl"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface YouTubeEmbedProps {
  videoId: string;
}

const props = defineProps<YouTubeEmbedProps>();

const embedUrl = computed(() => {
  return `https://www.youtube.com/embed/${props.videoId}`;
});
</script>
