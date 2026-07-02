# Agent Notes

## Code Style

- Prefer `function` declarations for ordinary named functions.
- Use `const` for values produced by framework factories, configuration objects,
  constants, and other non-function values. For example, TanStack route and
  server-function exports may stay as `const`, while their handler logic should
  live in named `function` declarations when practical.
