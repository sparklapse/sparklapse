import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ locals, request }, next) => {
  console.log("Hello from middleware!");

  const response = await next();
  console.log(request, response);
  locals.timezone = "Australia/Sydney";

  return response;
});
