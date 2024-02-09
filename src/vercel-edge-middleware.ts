import { geolocation } from "@vercel/edge";
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

  return { timezone };
}
