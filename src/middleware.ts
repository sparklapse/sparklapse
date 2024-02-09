import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ locals, request }, next) => {
  locals.timezone = "Australia/Sydney";
  const response = await next();

  console.log(request, response);
  return response;
});
