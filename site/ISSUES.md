# Issues

A list of known issues that affect the site in the long term.

## Dev notes

> Issues with client components and SSR in content

For some reason, content seems to have this issue where if a component is client rendered, it must be `client:only` or not at all. The `client:idle` and other forms cause the server to 500 where it fails to import. Still unable to create a minimum reproduction.
