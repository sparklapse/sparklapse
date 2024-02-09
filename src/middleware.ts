import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ locals }, next) => {
  return await next();
});
