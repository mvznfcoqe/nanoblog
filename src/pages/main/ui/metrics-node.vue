<template>
  <div class="border-2 rounded-1">
    <div class="flex justify-between items-center p-2">
      <div>
        {{ countryCodeToFlag(node.location) }}

        <NuxtLink
          v-if="providerLink"
          :to="providerLink"
          external
          target="_blank"
        >
          {{ node.provider }}
        </NuxtLink>
        <span v-else>{{ node.provider }}</span>
      </div>

      <div class="flex gap-2 items-center">
        <span class="text-3 text-align-end">
          {{ uptime }}
        </span>

        <span
          class="w-2.5 h-2.5 rounded-full border-1"
          :class="[isUp ? 'bg-green border-green-6' : 'bg-red border-red-6']"
        ></span>
      </div>
    </div>

    <div class="flex gap-1 border-t-2 p-2 text-3">
      <div>down {{ download }} mbps</div>

      |

      <div>up {{ upload }} mbps</div>
    </div>

    <div class="border-t-2 p-2 text-3">
      <div v-for="(containers, serviceName) in services">
        {{ serviceName }}:
        <span v-for="(container, i) in containers"
          ><template v-if="i">, </template>{{ container }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { intervalToDuration } from "date-fns";
import type { ModelsNode, ModelsProvider } from "~/shared/api/metrics";

const props = defineProps<{
  node: ModelsNode;
  providers: Record<string, ModelsProvider>;
}>();

const providerLink = computed(() => {
  return props.providers[props.node.provider].link;
});

const countryCodeToFlag = (code: string) => {
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
};

const isUp = computed(() => {
  return props.node.uptime;
});

const UNITS = [
  ["years", "y"],
  ["months", "m"],
  ["days", "d"],
  ["hours", "h"],
  ["minutes", "min"],
  ["seconds", "s"],
];

const maxUnits = 2;

const uptime = computed(() => {
  if (!props.node.uptime) return "down";

  const duration = intervalToDuration({
    start: 0,
    end: props.node.uptime * 1000,
  });

  return UNITS.filter(
    ([key]) => duration[key as keyof typeof duration] ?? 0 > 0
  )
    .slice(0, maxUnits)
    .map(([key, label]) => `${duration[key as keyof typeof duration]}${label}`)
    .join(" ");
});

const bytesToMegabits = (bytes: number) => {
  return ((bytes * 8) / 1024 / 1024).toFixed(1);
};

const download = computed(() => {
  return bytesToMegabits(props.node.network.download);
});

const upload = computed(() => {
  return bytesToMegabits(props.node.network.upload);
});

const services = computed(() => {
  return props.node.containers.reduce(
    (acc, container) => {
      if (!acc[container.project]) {
        acc[container.project] = [container.name];
      } else {
        acc[container.project] = [...acc[container.project], container.name];
      }

      return acc;
    },
    {} as Record<string, string[]>
  );
});
</script>
