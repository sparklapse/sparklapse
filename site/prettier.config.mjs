/** @type {import("prettier").Config & Record<string, any>} */
export default {
  useTabs: false,
  singleQuote: false,
  tabWidth: 2,
  semi: true,
  trailingComma: "all",
  printWidth: 100,
  endOfLine: "lf",
  bracketSameLine: false,
  jsxSingleQuote: false,
  singleAttributePerLine: false,
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss", "prettier-plugin-svelte"],
  tailwindFunctions: ["cx", "clsx"],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};
