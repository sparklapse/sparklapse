import { vitePreprocess } from "@astrojs/svelte";
import { preprocessMeltUI, sequence } from "@melt-ui/pp";

/** @type {import("svelte/compiler").CompileOptions} */
export default {
  css: "external",
  hydratable: true,
  preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),
};
