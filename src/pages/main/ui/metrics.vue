<template>
  <div>
    <Loader v-if="isLoading" />

    <div class="grid sm:grid-cols-2 gap-2" v-else-if="providers">
      <MetricsNode v-for="node in nodes" :node="node" :providers="providers" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMetricsNodes, getProviders } from "~/shared/api/metrics";
import MetricsNode from "./metrics-node.vue";
import { Loader } from "~/shared/ui/loader";

const { data: providers, status: providersStatus } = useAsyncData(
  "providers",
  async () => {
    const { data } = await getProviders();
    return data || null;
  },
  { server: false }
);

const {
  data: nodesData,
  status: nodesStatus,
  refresh: refreshNodes,
} = useAsyncData(
  "metricsNodes",
  async () => {
    const { data } = await getMetricsNodes();
    return data?.nodes || [];
  },
  { server: false }
);

const nodes = computed(() => nodesData.value || []);

const isLoading = computed(() => {
  console.log(providers.value);
  if (providers.value) return;

  return providersStatus.value === "pending" || nodesStatus.value === "pending";
});

const metricsPollInterval = 5000;

useIntervalFn(() => {
  refreshNodes();
}, metricsPollInterval);
</script>
