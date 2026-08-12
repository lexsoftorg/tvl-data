# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing landing page for **TVL Data Transfer** — TVL Tech's "sovereign data layer for AI": change-data-capture pipelines that move enterprise data (SAP, Oracle, SQL Server, DB2, Postgres, files) into the customer's chosen target — a data lake, database or warehouse (BigQuery, Postgres, MySQL, MongoDB, Splunk, Elasticsearch, and more) — refine it Bronze → Silver → Gold, and serve it to AI agents through an MCP server. **Target-agnostic: BigQuery is one example, not the only target — don't reframe the copy as BigQuery-only.** Bilingual (English + Romanian), live at `https://data.tvl.tech`.

Originally forked from the sibling `../tvl-academy-lp` but has since diverged into its own coral-forward identity; that repo is no longer a reliable reference.

## Hard rules (learned the hard way)

- **Every content/layout change must be made in BOTH `index.html` and `ro/index.html`.** They are full copies with the same section structure, different language.
- **Copy contains NO em-dashes and NO hyphens** (a deliberate anti-"AI-tell" style choice). Exceptions: the proper noun `Gaia-X`, and required Romanian enclitic hyphens in RO (`pipeline-ul`, `target-ul`, `batch-uri`, `API-uri`…). Use commas/colons/periods instead of em-dashes. Don't reintroduce them.
- **Do not delete the verification files**: `googleb711148e917cbd0d.html` (Google Search Console), `BingSiteAuth.xml` (Bing), and `7a863d492ef99146546e4f17b125992a.txt` (IndexNow key). Removing them breaks site verification.
- **No new claims without grounding.** Pricing, competitor comparisons, and superlatives have been deliberately kept off the site (a bias/groundedness audit blocked them). Everything on the page traces to the "TVL Data Transfer v6" deck or verified facts. Keep it that way.
- Lighthouse (mobile, live) is **100 / 100 / 100 / 100**. Preserve that: keep contrast ≥ 4.5:1, keep third-party JS off initial load, keep images sized.

## Architecture

No build tools, bundler, or package manager — open `index.html` in a browser and it runs.

- `index.html` — English page (`lang="en"`), canonical root
- `ro/index.html` — Romanian page (`lang="ro"`); references assets one level up (`../index.css`, `../index.js`, `../fonts/`, `../images/`)
- `index.css` — all styles, shared by both pages. It has grown by appended blocks over time (banner comments mark each: "REDESIGN v2/v3", "CONTRAST FIXES", etc.). Later blocks intentionally override earlier ones. `@font-face` rules are inlined at the very top.
- `index.js` — shared vanilla JS: nav frosts on scroll (`.scrolled`), click-to-load booking form, dynamic year, hamburger menu, FAQ accordion (ARIA), reduced-motion pause of the hero video, decorative-SVG `aria-hidden`, email de-obfuscation (`sales@tvl.tech` into every `[id^="emailLink"]`)
- `form.html` — isolated page holding the Pipedrive embed; loaded on demand (see Integrations)

## Page structure (both languages, in order)

hero (coral, animated architecture **video** + "In production" pill) → credibility strip → challenge (pain-point cards) → sovereignty (+ standards band) → how it works (Capture/Route/Deliver) → sources→target (flow diagram) → data refinement (Bronze/Silver/Gold medallion) → capabilities (bento grid) → **works-with** (integrations chips) → reliability & scale (22,000 rows/sec, dark band) → AI agents → how we compare (3 cards + comparison table) → track record → **how we deliver** (Scope/Build/Operate) → **engage** (Scoped pilot / Framework contract / Managed service) → FAQ → contact (coral, click-to-load form) → footer.

Content derives from the "TVL Data Transfer v6" deck. Notable verified figures: `22,000 rows/second`, `2 to thousands of nodes`. (The Romstal case study was removed on request; the green "In production" pill was kept without the name.)

## Design system (coral-forward)

CSS custom properties in `:root` (top of `index.css`, after the `@font-face` block):

- Brand coral `--red: #ff4a3d` (+ `--red-dark #d63a2a`). `--red-ink: #b02616` is the **deep red used for small text on light backgrounds** (passes WCAG AA where bright coral fails). The logo SVG paths are hardcoded `#FF4931` — CSS recolors them white over the coral hero and back on scroll.
- Warm near-black grounds for the hero and dark bands: `--ink #0f0c0b`, `--ink-2 #191210`. Hero + contact CTA are a deep coral gradient (`#f24a36 → #d6301f → #ad230f`) deep enough that white text clears AA.
- Fonts: **Space Grotesk** (display) + **Manrope** (body), **self-hosted** as woff2 in `/fonts/` (latin + latin-ext for Romanian diacritics), inlined `@font-face`. No external font requests.
- Mobile breakpoint 768px (plus 900/1024px for multi-column grids). Respects `prefers-reduced-motion`.

## Integrations

- **Pipedrive booking form** lives in `form.html` and is **click-to-load**: the contact section shows a facade with an "Open the booking form" button; clicking it sets the iframe `src` to `/form.html`, which is where the Pipedrive loader (and its reCAPTCHA payload) finally runs. This keeps ~600 KB of third-party JS off initial load (that is what earns Performance 100). The `data-pd-webforms` hash is currently the **shared TVL Academy form** — swap in a dedicated TVL Data Transfer form when ready.
- Everything else is **self-hosted** (fonts, images, video, CSS, JS) — no Google Fonts, no Unsplash, no Cloudflare script. Consistent with the sovereignty positioning.

Assets in `images/`: `architecture.mp4` + `architecture.webm` (hero video), `architecture-static.webp`/`.png` (poster + OG image), plus WebP logos. Prefer WebP; keep a PNG only where needed for the OG meta.

## SEO / GEO

- Structured data in each `<head>`: `SoftwareApplication`, `FAQPage`, `Organization`, `VideoObject` (all validated).
- Canonical + hreflang (en/ro/x-default), `sitemap.xml`, self-hosted OG/Twitter image.
- `robots.txt` explicitly welcomes AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…); `llms.txt` gives answer-engines a clean product brief.
- Verified in Google Search Console and Bing (sitemaps submitted); IndexNow key present.

## Deployment

Pushes to `main` on `github.com/lexsoftorg/tvl-data` deploy via GitHub Pages (~30–60s). Custom domain in `CNAME` (`data.tvl.tech`), HTTPS enforced. Branded `404.html`.

To verify visually without the browser extension: run Lighthouse and extract `fullPageScreenshot` from its JSON (a real rendered screenshot of the live page).
