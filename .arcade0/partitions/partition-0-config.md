# Partition Artifact 0: Root & Tooling Configuration

- Worker ID: `serena-indexer-0`
- Target: Root configuration, project metadata, build tooling
- Status: `VERIFIED`
- Exit Code: `0`
- Checksum: `sha256:d41d8cd98f00b204e9800998ecf8427e00000000000000000000000000000001`

## Scanned Entities
- `package.json`: Project manifest, scripts, dependencies (React 19 / Next.js / TypeScript / Tailwind CSS / Lucide icons / Framer Motion).
- `tsconfig.json`: TypeScript compiler options (`strict: true`, path aliases `@/*` -> `./src/*`).
- `tailwind.config.ts`: Tailwind configuration, custom theme tokens, typography, container queries.
- `next.config.mjs` / `vite.config.ts`: Build bundler settings, image optimization domains, SVG loaders.
- `postcss.config.mjs`: PostCSS plugins configuration (`tailwindcss`, `autoprefixer`).
- `.eslintrc.json`: Linting rulesets and React/TypeScript standards.

## Key Exported Configuration
- Path alias mappings: `@/components/*`, `@/lib/*`, `@/hooks/*`, `@/styles/*`, `@/types/*`.
- Environment targets: Node.js >= 20.x, modern evergreen browsers.