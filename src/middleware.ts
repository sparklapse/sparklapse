import { geolocation } from "@vercel/edge";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(({ locals, request }, next) => {
  const loc = geolocation(request);

  if (loc.country && loc.city) locals.timezone = `${loc.country}/${loc.city}`;

  return next();
});
