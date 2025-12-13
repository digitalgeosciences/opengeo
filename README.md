# OpenGeo

An open catalogue of geoscience software, datasets, and learning material designed to help researchers, educators, and practitioners find modern, open-source tools. This repository hosts the Vite + React front-end that powers [Digital Geoscience's](https://digitalgeosciences.com/) public directory.

## Features

- **Curated tool cards** with icons, descriptions, category filters, and enriched tag metadata sourced from `src/data/tools.json`.
- **Announcement + contributor data** configured via JSON (`src/data/announcement.json`, `src/data/contributors.json`) so editors can update copy or rosters without shipping new code.
- **Responsive UI** built with Tailwind CSS and shadcn components for consistent theming and accessibility.
- **Light/Dark modes** managed via `next-themes`, with a toggle in the site header and light mode as the default.
- **Community workflows** that route contributions through GitHub Discussions and send contact requests via a simple mailto handoff.

## Tech Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- [next-themes](https://github.com/pacocoursey/next-themes) for theme management
- [React Hook Form](https://react-hook-form.com/) + [zod](https://github.com/colinhacks/zod) for validation

## Getting Started

### Prerequisites

- Node.js 18.0+ (Vite 5 requires an active LTS release).
- npm 9+ (ships with Node 18) or pnpm 8+ if you prefer workspaces.
- Git CLI for cloning and keeping your fork up to date.
- Optional: VS Code with the ESLint and Tailwind CSS IntelliSense extensions for inline linting and design tokens.

### Installation

```bash
git clone <repo-url>
cd opengeo
npm install
npm run dev
```

The development server runs at `http://localhost:5173/` by default.

### Environment Variables

The current build does not require any mandatory env vars. Optional values:

| Variable | Purpose | Example |
| --- | --- | --- |
| `VITE_LAST_UPDATED` | Overrides the build timestamp shown in the footer | `2025-02-15` |

Add optional values inside `.env.local` if you want to control footer copy during local builds.

## Project Structure

```
src/
  App.tsx             # App shell & routing
  components/         # Reusable UI (Header, Footer, ThemeToggle, etc.)
  data/               # Static JSON (tools, announcement, contributors)
  pages/              # Route components (Index, About, Contribute, Contact)
  index.css           # Theme tokens (light & dark)
  lib/                # Helper utilities
  hooks/              # Shared hooks
```

Tool data lives in `src/data/tools.json`. Each entry contains:

```json
{
  "name": "Tool name",
  "icon": "🛰️",
  "description": "Short summary",
  "link": "https://example.com",
  "category": "Earth Observation and Satellite Data Portals",
  "tags": ["remote-sensing", "imagery", "satellite-data"],
  "stars": null
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `name` | Yes | Display name rendered in cards and used by search. |
| `icon` | Yes | Short text or emoji that serves as the tool avatar inside `ToolCard`. |
| `description` | Yes | Keep to two short sentences so it fits inside the card layout. |
| `link` | Yes | Public landing page or repo URL; must include the protocol. |
| `category` | Yes | Choose from the existing values in `src/data/tools.json`. If you introduce a new category, audit the UI so filters and navigation incorporate it. |
| `tags` | At least one | Lowercase strings used for the tag filter on the Index page. |
| `dynamic` | Optional | `true` renders a blue badge with a check mark, `false` renders a gray badge with “=” to indicate nondynamic; omit the field to hide the badge. |
| `stars` | Optional | Number of GitHub stars or `null` to hide the metric (currently unused but reserved for future surfacing). |

## Available Scripts

| Command            | Description                                       |
| ------------------ | ------------------------------------------------- |
| `npm run dev`      | Start the Vite dev server with HMR                |
| `npm run build`    | Create a production build (`dist/`)               |
| `npm run build:dev`| Build using the development env for staging QA    |
| `npm run lint`     | Run ESLint across the project                     |
| `npm run preview`  | Preview the production build locally              |

Additional tips:

- Run `npm run lint -- --fix` before committing to auto-resolve common style errors.
- Execute `npm run build && npm run preview` before publishing to mirror the Netlify/Vercel production bundle.
- There are currently no automated tests; rely on manual QA around the form workflows and the Index filters after data changes.

## Contributing

**Fast path (no code):** Use the in-app **Contribute** page, which links to the public [GitHub Discussions](https://github.com/digitalgeosciences/opengeo/discussions) board. Start a new topic with tool details, links, maintainer info, and suggested tags.

**Code/data contributions:**
1. Fork/clone this repository.
2. Create a branch for your update (`feat/new-tool`, `fix/layout`, etc.).
3. Update the relevant JSON data (`src/data/*.json`) or components.
4. Run `npm run lint` and `npm run build` before opening a PR.

For private/sensitive topics, email `info@digitalgeosciences.com` (also available on the Contact page).

## Citation
```
Alqubalee, A. (2025). OpenGeo (v0.1.0). Zenodo. https://doi.org/10.5281/zenodo.17915411
```

## Acknowledgements

OpenGeos is inspired by the community-maintained [softwareunderground/awesome-open-geoscience](https://doi.org/10.5281/zenodo.8354180) list compiled by Justin Gosses, Jesper Dramsch, Evan Bianco, Dieter Werthmueller, Andrew Moodie, Bane Sullivan, Matteo Niccoli, Leonardo Uieda, and many other contributors. Their work laid the foundation for this catalogue.

## License

Unless otherwise noted inside the repository or associated data files, this project is provided under the MIT License. Please attribute the Digital Geoscience team and upstream tool authors when reusing the catalogue.
