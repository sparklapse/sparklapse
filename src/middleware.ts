import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(({ locals, request }, next) => {
  console.info("ASTRO_MW", locals, request);

  return next();
});
