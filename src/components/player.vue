<template>
  <video class="video" autoplay muted loop playsinline>
    <source v-for="{ src, type } in sources" :src="src" :type="type" />
  </video>
</template>

<script lang="ts" setup>
defineProps<{
  sources: { src: string; type: string }[];
}>();
</script>

<style scoped>
.video {
  width: 100%;
}
</style>
