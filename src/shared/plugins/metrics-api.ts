import { client } from "../api/metrics/generated/client.gen";

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig();

	client.setConfig({
		baseUrl: config.public.metricsApiUrl,
	});
});
