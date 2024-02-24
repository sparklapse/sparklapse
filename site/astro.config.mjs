import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";

import i18next from "i18next";

await i18next.init({
  lng: "en",
});

// https://astro.build/config
export default defineConfig({
  site: "https://sparklapse.com",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru", "ko", "ja", "es"],
  },
  integrations: [mdx(), sitemap(), tailwind(), svelte()],
  vite: {
    resolve: {
      alias: {
        $components: "/src/components",
        $connections: "/src/connections",
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
