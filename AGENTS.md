# Repository Guidelines

## Project Structure & Module Organization

This repository contains the Italian-language La Pergola restaurant website, built with plain HTML, CSS, and JavaScript. Public pages live at the repository root: `index.html`, `menu.html`, `eventi.html`, `evento.html`, and other informational pages. This checkout serves files directly from the root; it has no `dist/` directory.

- `assets/js/content.js`: restaurant details, menu categories/items, and events in `window.PERGOLA`.
- `assets/js/site.js`: cinematic introduction, navigation, filters, and gallery interactions.
- `assets/css/tokens.css`: shared brand variables; `site.css`: layout and responsive styling.
- `assets/images/` and `assets/brand/`: scene images, logos, and favicon.
- `docs/`: verification notes, JSON results, and screenshots; these are evidence, not an executable test suite.

## Build, Test, and Development Commands

No dependency installation or build step is required.

- `Start-Process ./index.html` (PowerShell): open the homepage directly in the default browser.
- Use VS Code Live Server for an HTTP preview when needed.
- `node --check assets/js/content.js` and `node --check assets/js/site.js`: validate JavaScript syntax when Node.js is available.

Deploy the root HTML files and assets while preserving relative paths.

## Coding Style & Naming Conventions

Follow existing formatting: two-space indentation in JavaScript and CSS; retain the surrounding HTML style. Use camelCase for JavaScript functions, kebab-case for CSS classes and HTML filenames, and `data-*` attributes for interaction hooks. Keep shared content in `content.js` and visual constants in CSS variables. No formatter or linter configuration is included.

## Testing Guidelines

Follow `docs/VERIFICHE.md`: check local links, mobile navigation, keyboard focus, Escape handling, gallery controls, menu filters, and event slugs. Verify reduced-motion and JavaScript-disabled fallbacks. Check for horizontal overflow at widths from 320 to 1920 px. Previous checks used Playwright and axe-core; no runnable harness or coverage threshold is included. Record new verification evidence in `docs/`.

## Commit & Pull Request Guidelines

This checkout has no Git metadata, so existing commit conventions cannot be established. Use concise imperative subjects, such as `Fix mobile gallery focus`. Describe the change, reference any related issue, report verification performed, and include desktop/mobile screenshots for visual changes.

## Content & Configuration

Publish only confirmed restaurant information. Keep contact data, HTML fallbacks, and structured data synchronized. Use timezone-qualified ISO 8601 event dates. Leave preview indexing restrictions in place until production content and URLs are reviewed.