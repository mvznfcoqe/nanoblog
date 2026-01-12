import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
	input:
		"https://raw.githubusercontent.com/mvznfcoqe/metrics/refs/heads/main/docs/swagger.json",
	output: "./src/shared/api/metrics/generated",
	plugins: ["@hey-api/client-ofetch"],
});
