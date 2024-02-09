import { geolocation } from "@vercel/edge";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(({ locals, request }, next) => {
  const loc = geolocation(request);

  console.info(loc);

  let tz = `${loc.country}/${loc.city}`;
  try {
    const date = new Date();
    date.toLocaleTimeString("en", { timeZone: tz });
    locals.timezone = tz;
  } catch (e) {
    console.error(`Invalid timezone: ${tz}`);
    console.error(e);
  }

  return next();
});
