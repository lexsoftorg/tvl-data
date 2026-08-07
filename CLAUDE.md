# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing landing page for **TVL Data Transfer** — TVL Tech's "sovereign data layer for AI": change-data-capture pipelines that move enterprise data (SAP, Oracle, Postgres, files) into Google BigQuery, refine it Bronze → Silver → Gold, and serve it to AI agents through an MCP server. Bilingual (English + Romanian), hosted on GitHub Pages at custom domain `data.tvl.tech`.

This site is a sibling of `../tvl-academy-lp` and deliberately reuses its design system and stack. When something is unclear, that repo is the reference implementation.

## Architecture

No build tools, bundler, or package manager — open `index.html` in a browser and it runs. The site is a shared stylesheet + script plus one HTML file per language:

- `index.html` — English page (`lang="en"`), the canonical root
- `ro/index.html` — Romanian translation (`lang="ro"`); a full copy of the same section structure, so **any content/layout change must be made in both files**
- `index.css` — all styles, shared by both pages. First ~1180 lines are inherited verbatim from `tvl-academy-lp`; the block after the `TVL DATA TRANSFER — additional components` banner comment holds this site's new components (language toggle, standards band, flow diagram, medallion tiers, capability checklist, big metric, compare grid, track record)
- `index.js` — shared minimal vanilla JS: dynamic year, hamburger menu, FAQ accordion (ARIA-wired), and email de-obfuscation that fills every `[id^="emailLink"]` span with `sales@tvl.tech`

The Romanian page lives in a subdirectory, so it references assets one level up: `../index.css`, `../index.js`, `../favicon.svg`, `../images/`.

## Page structure (both languages, in order)

hero → challenge → sovereignty (+ standards band) → how it works (Capture/Route/Deliver) → sources→BigQuery (flow diagram) → data refinement (Bronze/Silver/Gold medallion) → capabilities checklist → reliability & scale (22,000 rows/sec metric) → AI agents → how we compare (3 cards, TVL is `.is-winner`) → Romstal case study → track record → FAQ → contact → footer.

All source content derives from the "TVL Data Transfer v6" deck (15 slides). Keep claims consistent with it — notably `22,000 rows/second`, `2 to thousands of nodes`, and the Romstal stack (Vertex AI · LangChain/LangGraph · Cloud Run).

## Design system

Inherited from `tvl-academy-lp`, defined as CSS custom properties in `:root` at the top of `index.css`:

- Brand red `--red: #ff4a3d` (+ `--red-dark`, `--red-light`). Note the logo SVG paths are hardcoded `#FF4931` — leave them.
- Fonts: **Space Grotesk** (display / headings) + **Manrope** (body), loaded via Google Fonts `@import`
- Dark `#0f0f0f`, light background `#f7f6f4`; mobile breakpoint at 768px (plus 900px/1024px for the new multi-column components)

## Integrations

- **Pipedrive** — contact form embedded on both pages. The `data-pd-webforms` URL is a **placeholder** (`REPLACE_WITH_TVL_DATA_FORM_ID`); swap in the real TVL Data Transfer form hash before launch.
- **Cloudflare** — email-decode script (`/cdn-cgi/scripts/...`), active only when served behind Cloudflare
- **Google Fonts** — Space Grotesk + Manrope
- **Unsplash** — hero, challenge and OG images loaded by absolute URL (no local copies)

Local images live in `images/` (currently just `romstal-logo.png`, reused from the academy site).

## Deployment

Pushes to `main` on `github.com/lexsoftorg/tvl-data` deploy via GitHub Pages. Custom domain is in `CNAME` (`data.tvl.tech`). SEO assets: `robots.txt`, `sitemap.xml` (both language URLs with hreflang alternates), `favicon.svg`, plus per-page canonical/hreflang tags, OpenGraph/Twitter cards and JSON-LD in each `<head>`.
