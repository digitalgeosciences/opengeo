# Open Geosciences

An open catalogue of geoscience software, datasets, and learning material designed to help researchers, educators, and practitioners find modern, open-source tools. This repository hosts the Vite + React front-end that powers [Digital Geoscience's](https://digitalgeosciences.com/) public directory.

## Features

- **Curated tool cards** with icons, descriptions, category filters, and enriched tag metadata sourced from `src/data/tools.json`.
- **Responsive UI** built with Tailwind CSS and shadcn components for consistent theming and accessibility.
- **Light/Dark modes** managed via `next-themes`, with a toggle in the site header and light mode as the default.
- **Contribution & contact workflows** backed by configurable endpoints so submissions flow into your preferred review process.

## Tech Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- [next-themes](https://github.com/pacocoursey/next-themes) for theme management
- [React Hook Form](https://react-hook-form.com/) + [zod](https://github.com/colinhacks/zod) for validation

## Getting Started

```bash
git clone <repo-url>
cd opengeo
npm install
npm run dev
```

The development server runs at `http://localhost:5173/` by default.

### Environment Variables

Forms submit to a Google Apps Script (or any HTTPS endpoint) defined by `VITE_GOOGLE_SCRIPT_URL`. Create a `.env` file:

```bash
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXXXXXX/exec
```

If the variable is absent, the UI shows a graceful error and asks the user to try again later.

## Project Structure

```
src/
├─ App.tsx              # App shell & routing
├─ components/          # Reusable UI (Header, Footer, ThemeToggle, etc.)
├─ data/tools.json      # Catalogue source data
├─ pages/               # Route components (Index, About, Contribute, Contact)
├─ index.css            # Theme tokens (light & dark)
└─ lib, hooks, etc.     # Helper utilities
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

## Available Scripts

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| `npm run dev`  | Start the Vite dev server with HMR           |
| `npm run build`| Create a production build (`dist/`)          |
| `npm run lint` | Run ESLint across the project                |
| `npm run preview` | Preview the production build locally     |

## Contributing

1. Fork/clone this repository.
2. Create a branch for your update (`feat/new-tool`, `fix/layout`, etc.).
3. Update the relevant data or components.
4. Run `npm run lint` and `npm run build` before opening a PR.

You can also use the in-app **Contribute** page to submit new tools or updates if you prefer a form-based workflow.

## Acknowledgements

Open Geosciences is inspired by the community-maintained [softwareunderground/awesome-open-geoscience](https://doi.org/10.5281/zenodo.8354180) list compiled by Justin Gosses, Jesper Dramsch, Evan Bianco, Dieter Werthmüller, Andrew Moodie, Bane Sullivan, Matteo Niccoli, Leonardo Uieda, and many other contributors. Their work laid the foundation for this catalogue.

## License

Unless otherwise noted inside the repository or associated data files, this project is provided under the MIT License. Please attribute the Digital Geoscience team and upstream tool authors when reusing the catalogue.
