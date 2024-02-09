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

  console.info("EDGE_MW", request, context);

  return { timezone: "Australia/Sydney" };
}
