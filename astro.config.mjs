import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://sparklapse.com",
  integrations: [mdx(), sitemap(), tailwind(), svelte()],
  vite: {
    resolve: {
      alias: {
        $components: "/src/components",
        $layouts: "/src/layouts",
      },
    },
  },
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
