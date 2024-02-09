import { geolocation } from "@vercel/edge";
import { find } from "geo-tz";
import type { RequestContext } from "@vercel/edge";

export default function ({
  request,
  context,
}: {
  request: Request;
  context: RequestContext;
}) {
  const loc = geolocation(request);

  let timezone = "Australia/Sydney";
  if (loc.latitude && loc.longitude) {
    let search = find(parseFloat(loc.latitude), parseFloat(loc.longitude));
    if (search.length > 0) timezone = search[0];
  }

  return { timezone };
}
