import {
  defineConfig,
  presetTypography,
  presetWind3,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  presets: [presetWind3(), presetTypography()],
  transformers: [transformerDirectives()],
  theme: {
    fontFamily: {
      mono: "'Roboto Mono Variable', monospace",
    },
    container: {
      center: true,
      maxWidth: {
        sm: "100%",
        md: "768px",
        lg: "768px",
        xl: "768px",
        "2xl": "768px",
      },
    },
  },
});
