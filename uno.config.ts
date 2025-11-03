import {
  defineConfig,
  presetTypography,
  presetWind3,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  presets: [presetWind3(), presetTypography()],
  transformers: [transformerDirectives()],
});
