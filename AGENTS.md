# AGENTS.md

## Project type
Static single-page portfolio. No build system, no package manager, no framework.
Deployed via GitHub Pages.

## File structure
- `index.html` — entire site in one file (all sections inline)
- `index.css` — all styles (~778 lines)
- `app.js` — all JS (~401 lines)
- `imagenes/` — logo/favicon
- `proyectos/` — demo `.mp4` files with Spanish filenames containing spaces

## Running locally
No build step. Serve the root directory with any static server:
```
python3 -m http.server
# or
npx serve .
```
Then open `http://localhost:8000` (or whatever port).

## Dependencies (CDN only — no npm)
- GSAP 3.12.5 + ScrollTrigger
- Three.js r128
- Google Fonts: Chakra Petch, Inter, Monomakh, Raleway
- Devicons (jsdelivr) for skill icons

## Key quirks
- **Three.js canvas disabled on mobile** (`< 968px` viewport width) — don't add canvas-dependent code without checking this guard in `app.js`.
- **Preloader animation on load:** `body` gets class `preloader-active` (scroll locked, height `100vh`) until the GSAP "zoom through T" completes. JS that needs the page ready must account for this.
- **Video filenames have spaces and Spanish characters** (e.g., `Grabación 2025-11-08 203227.mp4`) — always quote `src` paths in HTML.
- **Email placeholder:** `app.js:239` uses `tiago@ejemplo.com` — not a real address.
- **Accent color:** `#00ffcc` used consistently for highlights, borders, interactive states.
- All UI copy and code comments are in **Spanish**.

## No linting, testing, or CI
There are no test suites, linters, formatters, or GitHub Actions workflows.
