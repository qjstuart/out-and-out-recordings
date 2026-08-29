# Agent Notes

## Code Style

- Prefer `function` declarations for ordinary named functions.
- Use `const` for values produced by framework factories, configuration objects,
  constants, and other non-function values. For example, TanStack route and
  server-function exports may stay as `const`, while their handler logic should
  live in named `function` declarations when practical.

## Stripe Catalogue Security

- Treat files imported by client-rendered routes or components, including
  `src/data/*.ts`, as public and potentially included in browser bundles.
- Public catalogue records must identify purchasable items with stable internal
  product IDs. These are our own identifiers, not Stripe Product IDs (`prod_`).
  Do not put Stripe Product or Price IDs in the public catalogue.
- Keep Stripe Product and Price mappings in server-only modules such as
  `*.server.ts`. Product (`prod_`) and Price (`price_`) IDs are not credentials,
  but the browser does not need them.
- Never trust a Stripe Product ID, Price ID, amount, or currency supplied by the
  client. Accept an internal product ID, validate it, and resolve all Stripe
  commerce details from authoritative server-side configuration.
- Return only data required for display to the client, such as `unitAmount` and
  `currency`. Do not expose `priceId` unless a client-side Stripe API
  specifically requires it.
- Never expose Stripe secret keys (`sk_`), restricted keys (`rk_`), or webhook
  signing secrets (`whsec_`). Store them as Cloudflare secrets and access them
  only from server code.
