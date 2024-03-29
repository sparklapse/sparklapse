import typographyPlugin from "@tailwindcss/typography";

/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,pcss}"],
  theme: {
    extend: {},
  },
  plugins: [typographyPlugin()],
};
