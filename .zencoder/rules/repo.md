# Repository Overview

This document provides a concise, structured overview of the repository to help assistants understand and operate within the project quickly and safely.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **React**: 19
- **Styling**: Tailwind CSS v4
- **Linting**: ESLint 9, eslint-config-next 15
- **Build**: Turbopack for dev and build

## Scripts (package.json)

- **dev**: `next dev --turbopack`
- **build**: `next build --turbopack`
- **start**: `next start`
- **lint**: `eslint`

## Project Structure (key paths)

- `src/app/`
  - `layout.tsx` – Root layout
  - `page.tsx` – Main landing page
  - `globals.css` – Global styles
- `src/components/`
  - `HeroSection.tsx`, `ProblemSection.tsx`, `SolutionSection.tsx`, `ValuePropositionSection.tsx`, `CTASection.tsx`, `Footer.tsx`, `MainForm.tsx`
- `public/` – Static assets (SVGs, images)
- `.next/` – Build output (generated)
- `next.config.ts` – Next.js configuration (includes `@` alias to `src` via webpack)
- `tsconfig.json` – TS config with `paths` mapping `@/*` to `src/*`

## Environment Variables

- `.env.local` is used for local-only variables.
- Current known variables:
  - `NEXT_PUBLIC_GOOGLE_FORMS_URL` – Public URL to embed Google Forms in the MVP form.

Note: `MainForm.tsx` currently hardcodes the Google Forms URL. Consider reading from `process.env.NEXT_PUBLIC_GOOGLE_FORMS_URL` for consistency.

## How to Run

1. Install dependencies: `npm install`
2. Development: `npm run dev` (http://localhost:3000)
3. Lint: `npm run lint`

## Build & Start (Production)

1. Build: `npm run build`
2. Start: `npm run start`

## Notable Config

- `next.config.ts` sets `reactStrictMode` and `swcMinify` and defines a webpack alias `@` -> `src`.
- `tsconfig.json` mirrors the alias in `paths`.

## Known Considerations

- **React 19 + Next 15**: Ensure your dependencies and ESLint config are aligned with React 19.
- **Forms URL**: Using both `.env.local` and a hardcoded URL can diverge. Prefer environment-configured value.
- **Turbopack**: Both dev and build use `--turbopack`. If you hit issues, try without Turbopack for comparison.

## Suggested Improvements (non-breaking)

- Refactor `MainForm.tsx` to read the Google Forms URL from `NEXT_PUBLIC_GOOGLE_FORMS_URL` with a safe fallback.
- Add minimal tests or a smoke check script if CI is introduced later.

## Quick Reference

- Node 18+ recommended.
- Start URL: `http://localhost:3000`
- Static assets: `public/`
- Components: `src/components/`
- Pages (App Router): `src/app/`
