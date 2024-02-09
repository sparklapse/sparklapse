export default function (request: Request) {
  const url = new URL(request.url);

  return Response.redirect(url);
}
