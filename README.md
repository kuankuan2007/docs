
# doc-k-markdown-vue

Documentation site for `@kuankuan/k-markdown-vue`.

## Purpose

This app renders the project documentation with the library itself, so it also serves as a real integration example for:

- custom node renderers
- custom code highlighting
- internal / external link handling
- LaTeX rendering

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Notes

- The docs source lives in `src/articles/`.
- The viewer components live in `src/components/`.
- This site imports `k-markdown-vue` both from the published package and, for some repo-internal examples, from source subpaths.
