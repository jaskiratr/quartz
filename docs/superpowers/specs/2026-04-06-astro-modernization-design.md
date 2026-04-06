# Quartz — Astro Modernization Design

## Overview

Rebuild the Quartz static site (currently Hexo 3.x, circa 2016) as a modern Astro site with Tailwind CSS, optimized images, and GitHub Pages deployment. The site documents a machine-driven glass fabrication research project.

## Tech Stack

- **Astro** (latest) — static site generator
- **Tailwind CSS v4** — styling
- **Content Collections** — structured markdown content
- **astro:assets** — image optimization (WebP, responsive, lazy loading)
- **GitHub Actions** — CI/CD to GitHub Pages

## Project Structure

```
src/
  content/
    docs/             # 7 markdown files with order field
    config.ts         # Content collection schema
  layouts/
    BaseLayout.astro  # HTML shell, head, fonts, global styles
    DocLayout.astro   # Two-column layout with sidebar
  pages/
    index.astro       # Hero landing page
    docs/
      [slug].astro    # Dynamic route for each doc page
    contact.astro     # Simple contact page
  components/
    Header.astro      # Site header / nav
    Footer.astro      # Site footer
    Hero.astro        # Landing page hero section
    VideoEmbed.astro  # Responsive Vimeo embed wrapper
    ImageGallery.astro # Grid layout for multi-image steps
    Sidebar.astro     # Doc navigation sidebar
  assets/
    images/           # 26 used images only (optimized via astro:assets)
public/
  # favicon
.github/
  workflows/
    deploy.yml        # GitHub Actions workflow
```

## Pages

### Landing Page (`/`)

- Full-viewport hero with `intro.jpg` as background
- Title: "QUARTZ", subtitle: "Machine Driven Glass Fabrication"
- Brief 2-sentence intro from the Introduction post
- CTA button linking to the first doc section
- Dark overlay on hero image for text readability

### Doc Pages (`/docs/[slug]`)

Seven sections, ordered:

1. **Introduction** — Project overview, two images
2. **Experiments** — Gallery of Vimeo video embeds (no images), organized by test type and failure modes
3. **Parts List** — Structured list of components with external links
4. **CAD Models** — Images, Sketchfab 3D embeds, Dropbox download links
5. **Software Setup** — Setup instructions, images, GitHub gist embed
6. **Electronics Setup** — Wiring guide, one image, reference links
7. **Hardware Assembly** — Step-by-step with video, many images in grid layouts

Each doc page includes:
- Sticky sidebar navigation (desktop) / drawer nav (mobile) showing all 7 sections
- Previous / Next navigation at bottom
- Full content-width images, grid layout for multi-image steps

### Contact (`/contact`)

Simple page with link to GitHub issues. Minimal content.

### Removed Pages

- About (empty)
- Archives, Categories, Tags (Hexo artifacts)

## Visual Design

### Color Palette

- Background: near-black (`#0a0a0a`)
- Accent: warm amber/orange (molten glass aesthetic)
- Text: off-white (`#f5f5f5`)
- Secondary: warm grays for borders, muted text

### Typography

- Clean sans-serif (Inter or system font stack)
- Large bold headings
- Comfortable reading width (~65ch) for body text

### Layout

- **Desktop:** Two-column — sticky sidebar nav (left), content (right)
- **Mobile:** Single column, hamburger/drawer for nav
- **Landing:** Full-bleed hero, no sidebar

### Image Treatment

- Full content-width for single images
- CSS grid for multi-image step sequences (e.g., assembly photos)
- Optimized via `astro:assets` — WebP conversion, responsive srcset, lazy loading

### Embeds

- Vimeo: responsive 16:9 `<iframe>` containers
- Sketchfab: same responsive treatment
- GitHub Gist: kept as `<script>` embed in the Software Setup page

## Content Migration

### Markdown Files

The 7 Hexo posts become content collection entries. Changes:
- Frontmatter updated: add `order` field, keep `title`
- Image paths updated from `/images/foo.jpg` to imports from `../../assets/images/foo.jpg`
- HTML embed divs (Vimeo, Sketchfab) preserved as raw HTML in markdown
- Remove Hexo-specific `<!-- more -->` tags

### Images

**26 images retained** (referenced in content):

From Introduction: `intro.jpg`, `intro3.jpg`
From CAD Models: `XCarve1000.jpg`, `Extruder grabcad.jpg`, `Extruder Mod.jpg`, `extruder mount.jpg`, `XCarve1000 mod.jpg`
From Software Setup: `rhino.jpg`, `chilipeppr.jpg`
From Electronics Setup: `tinyg2.jpg`
From Hardware Assembly: `mount1-3.jpg`, `extruder1-4.jpg`, `vacuum1-2.jpg`, `assemble1-6.jpg`

**24 images removed** (unreferenced): all `DSC08xxx.JPG` files, `Assemble (3).JPG`, `extruder5-7.jpg`, `tinyg.jpg`, `intro1.jpg`, `image1.jpg`, `image2.jpg`

Images are placed in `src/assets/images/` for processing by `astro:assets`.

## Deployment

- **Target:** `jaskiratr.github.io/quartz`
- **Astro config:** `base: '/quartz'`, `site: 'https://jaskiratr.github.io'`
- **GitHub Actions:** On push to `main`, build and deploy to GitHub Pages
- **No CNAME** — using default GitHub Pages URL
- **Old `gh-pages` branch on upstream (`danielsauter/quartz`):** left untouched

## Out of Scope

- Client-side JS frameworks (React, Vue, etc.)
- Search functionality
- Comments / analytics
- Blog/post listing — this is structured documentation, not a blog
- Image lightbox (can be added later)
