# Devanshi Pandey — 3D Portfolio

Premium red/black interactive developer portfolio built with React, TypeScript, Vite, React Three Fiber, Three.js, Framer Motion, and Lucide.

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repository into Vercel.
3. Vercel detects Vite automatically.
4. Build command: `npm run build`
5. Output directory: `dist`

No environment variables are required for the current version.

## Main editable files

- `src/data/portfolio.ts` — profile, projects, experience, skills, contact links.
- `src/assets/profile-cutout.webp` — transparent hero portrait used by the 3D presentation.
- `src/components/Scene.tsx` — interactive Three.js/R3F scenes.
- `src/components/ProjectCard.tsx` — 3D project cards and project detail modal.
- `src/styles.css` — visual system, responsive layouts, 3D CSS effects.

## Design update

The hero no longer presents the portrait as a flat square image. The supplied photo is prepared as a transparent cutout and displayed as a floating dimensional subject with a backplate, orbit rings, grid, glow, parallax, depth, and red edge lighting. The background scene also responds subtly to pointer movement.

The project cards use pointer-based 3D tilt, cursor-positioned glow, layered depth, and elevated hover states. The laptop scene has a more dimensional model with keyboard geometry and pointer-responsive screen movement.

## Accessibility/performance

- 3D is decorative and content remains available without WebGL.
- Reduced-motion preferences are respected.
- Desktop gets the full interaction layer; mobile reduces the heavier effects.
- GitHub API failures fall back to the featured static project content.
