import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ locals }, next) => {
  const response = await next();
  console.log(await response.text());
  return await next();
});
