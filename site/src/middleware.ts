import i18next from "i18next";

import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  if (!i18next.isInitialized)
    await i18next.init({
      lng: "en",
    });

  return await next();
});
