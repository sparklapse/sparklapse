import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ locals }, next) => {
  console.log(locals);

  return await next();
});
