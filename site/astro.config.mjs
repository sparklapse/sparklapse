import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/static";
import min from "astro-min";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://sparklapse.com",
  integrations: [mdx(), sitemap(), tailwind(), svelte(), min()],
  vite: {
    resolve: {
      alias: {
        $components: "/src/components",
        $connections: "/src/connections",
        $layouts: "/src/layouts",
      },
    },
  },
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
