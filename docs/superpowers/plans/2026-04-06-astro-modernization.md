# Quartz Astro Modernization — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Hexo 3.x Quartz site as a modern Astro static site with Tailwind CSS, optimized images, and GitHub Pages deployment.

**Architecture:** Astro with content collections for the 7 documentation pages, Tailwind CSS v4 via Vite plugin for styling, `astro:assets` Image component for image optimization. Dark industrial theme with full-bleed hero landing page and two-column doc layout with sidebar navigation.

**Tech Stack:** Astro (latest), Tailwind CSS v4, @tailwindcss/typography, TypeScript, GitHub Actions

---

## File Structure

```
src/
  assets/
    images/           # 26 optimized images
  components/
    Header.astro
    Footer.astro
    Hero.astro
    Sidebar.astro
  content/
    docs/
      01-introduction.md
      02-experiments.md
      03-parts-list.md
      04-cad-models.md
      05-software-setup.md
      06-electronics-setup.md
      07-hardware-assembly.md
  layouts/
    BaseLayout.astro
    DocLayout.astro
  pages/
    index.astro
    contact.astro
    docs/
      [id].astro
  styles/
    global.css
  content.config.ts
public/
  favicon.svg
astro.config.mjs
tsconfig.json
package.json
.github/
  workflows/
    deploy.yml
```

---

### Task 1: Initialize Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `src/pages/index.astro` (placeholder)

- [ ] **Step 1: Create package.json**

```json
{
  "name": "quartz",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install astro @tailwindcss/vite tailwindcss @tailwindcss/typography
```

- [ ] **Step 3: Create astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jaskiratr.github.io',
  base: '/quartz',
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 4: Create tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

- [ ] **Step 5: Create src/styles/global.css**

```css
@import 'tailwindcss';
@plugin '@tailwindcss/typography';

@theme {
  --color-bg: #0a0a0a;
  --color-bg-surface: #141414;
  --color-bg-elevated: #1e1e1e;
  --color-text: #f5f5f5;
  --color-text-muted: #a0a0a0;
  --color-accent: #e8872a;
  --color-accent-hover: #f09a40;
  --color-border: #2a2a2a;
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}

html {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  scroll-behavior: smooth;
}

body {
  min-height: 100dvh;
}

::selection {
  background-color: var(--color-accent);
  color: var(--color-bg);
}

/* Responsive embed container for iframes (Vimeo, Sketchfab) */
.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
  margin: 1.5rem 0;
}

.embed-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0.5rem;
}
```

- [ ] **Step 6: Create placeholder index page**

Create `src/pages/index.astro`:

```astro
---
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>QUARTZ</title>
    <link rel="stylesheet" href="/quartz/styles/global.css" />
  </head>
  <body>
    <h1>Quartz</h1>
  </body>
</html>
```

- [ ] **Step 7: Verify the dev server starts and builds**

Run:
```bash
npx astro build
```
Expected: Build succeeds, output in `dist/` directory.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/
git commit -m "feat: initialize Astro project with Tailwind CSS v4"
```

---

### Task 2: Base Layout and Header/Footer Components

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `public/favicon.svg`

- [ ] **Step 1: Create favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="28">◇</text>
</svg>
```

- [ ] **Step 2: Create Header component**

Create `src/components/Header.astro`:

```astro
---
const navItems = [
  { label: 'Docs', href: '/quartz/docs/introduction' },
  { label: 'Contact', href: '/quartz/contact' },
];
const currentPath = Astro.url.pathname;
---

<header class="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md">
  <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
    <a href="/quartz/" class="text-lg font-bold tracking-widest text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
      QUARTZ
    </a>
    <button
      id="mobile-menu-btn"
      class="md:hidden text-[var(--color-text)] p-2"
      aria-label="Toggle menu"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    <ul class="hidden md:flex items-center gap-8">
      {navItems.map(({ label, href }) => (
        <li>
          <a
            href={href}
            class:list={[
              'text-sm font-medium tracking-wide transition-colors',
              currentPath.startsWith(href)
                ? 'text-[var(--color-accent)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
            ]}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
  <ul
    id="mobile-menu"
    class="hidden md:hidden flex-col gap-4 px-6 pb-4"
  >
    {navItems.map(({ label, href }) => (
      <li>
        <a
          href={href}
          class:list={[
            'text-sm font-medium tracking-wide transition-colors',
            currentPath.startsWith(href)
              ? 'text-[var(--color-accent)]'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
          ]}
        >
          {label}
        </a>
      </li>
    ))}
  </ul>
</header>

<script>
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  btn?.addEventListener('click', () => {
    menu?.classList.toggle('hidden');
    menu?.classList.toggle('flex');
  });
</script>
```

- [ ] **Step 3: Create Footer component**

Create `src/components/Footer.astro`:

```astro
---
const year = new Date().getFullYear();
---

<footer class="border-t border-[var(--color-border)] py-8 mt-16">
  <div class="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
    <p>&copy; {year} Jaskirat Randhawa</p>
    <a
      href="https://github.com/danielsauter/quartz"
      class="hover:text-[var(--color-accent)] transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub
    </a>
  </div>
</footer>
```

- [ ] **Step 4: Create BaseLayout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Machine Driven Glass Fabrication' } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/quartz/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <title>{title} | QUARTZ</title>
  </head>
  <body class="flex min-h-dvh flex-col">
    <Header />
    <main class="flex-1 pt-16">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 5: Update index.astro to use BaseLayout**

Replace `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Home">
  <div class="mx-auto max-w-6xl px-6 py-16">
    <h1 class="text-4xl font-bold">QUARTZ</h1>
    <p class="mt-4 text-[var(--color-text-muted)]">Machine Driven Glass Fabrication</p>
  </div>
</BaseLayout>
```

- [ ] **Step 6: Build and verify**

Run:
```bash
npx astro build
```
Expected: Build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/ public/
git commit -m "feat: add BaseLayout, Header, and Footer components"
```

---

### Task 3: Migrate Images

**Files:**
- Create: `src/assets/images/` — 26 images from `source/images/`

- [ ] **Step 1: Create assets directory and copy only used images**

Run:
```bash
mkdir -p src/assets/images

# Images referenced in content
cp "source/images/intro.jpg" src/assets/images/
cp "source/images/intro3.jpg" src/assets/images/
cp "source/images/XCarve1000.jpg" src/assets/images/
cp "source/images/Extruder grabcad.jpg" src/assets/images/extruder-grabcad.jpg
cp "source/images/Extruder Mod.jpg" src/assets/images/extruder-mod.jpg
cp "source/images/extruder mount.jpg" src/assets/images/extruder-mount.jpg
cp "source/images/XCarve1000 mod.jpg" src/assets/images/xcarve1000-mod.jpg
cp "source/images/rhino.jpg" src/assets/images/
cp "source/images/chilipeppr.jpg" src/assets/images/
cp "source/images/tinyg2.jpg" src/assets/images/
cp "source/images/mount1.jpg" src/assets/images/
cp "source/images/mount2.jpg" src/assets/images/
cp "source/images/mount3.jpg" src/assets/images/
cp "source/images/extruder1.jpg" src/assets/images/
cp "source/images/extruder2.jpg" src/assets/images/
cp "source/images/extruder3.jpg" src/assets/images/
cp "source/images/extruder4.jpg" src/assets/images/
cp "source/images/vacuum1.jpg" src/assets/images/
cp "source/images/vacuum2.jpg" src/assets/images/
cp "source/images/assemble1.jpg" src/assets/images/
cp "source/images/assemble2.jpg" src/assets/images/
cp "source/images/assemble3.jpg" src/assets/images/
cp "source/images/assemble4.jpg" src/assets/images/
cp "source/images/assemble5.jpg" src/assets/images/
cp "source/images/assemble6.jpg" src/assets/images/
```

Note: Files with spaces in names are renamed to kebab-case (e.g., `Extruder Mod.jpg` → `extruder-mod.jpg`). Also `XCarve1000 mod.jpg` → `xcarve1000-mod.jpg`. `XCarve1000.jpg` stays as-is since it has no spaces.

- [ ] **Step 2: Verify 26 images are present**

Run:
```bash
ls src/assets/images/ | wc -l
```
Expected: `26` (but `25` is also correct since there are 25 unique files — some images like `XCarve1000.jpg` are used in multiple posts but only one copy is needed).

Actually the distinct image files are:
`intro.jpg`, `intro3.jpg`, `XCarve1000.jpg`, `extruder-grabcad.jpg`, `extruder-mod.jpg`, `extruder-mount.jpg`, `xcarve1000-mod.jpg`, `rhino.jpg`, `chilipeppr.jpg`, `tinyg2.jpg`, `mount1.jpg`, `mount2.jpg`, `mount3.jpg`, `extruder1.jpg`, `extruder2.jpg`, `extruder3.jpg`, `extruder4.jpg`, `vacuum1.jpg`, `vacuum2.jpg`, `assemble1-6.jpg` = **25 files**.

- [ ] **Step 3: Commit**

```bash
git add src/assets/images/
git commit -m "feat: migrate 25 used images to src/assets"
```

---

### Task 4: Content Collection Setup and Content Migration

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/docs/01-introduction.md`
- Create: `src/content/docs/02-experiments.md`
- Create: `src/content/docs/03-parts-list.md`
- Create: `src/content/docs/04-cad-models.md`
- Create: `src/content/docs/05-software-setup.md`
- Create: `src/content/docs/06-electronics-setup.md`
- Create: `src/content/docs/07-hardware-assembly.md`

- [ ] **Step 1: Create content.config.ts**

Create `src/content.config.ts`:

```typescript
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    description: z.string().optional(),
  }),
});

export const collections = { docs };
```

- [ ] **Step 2: Create 01-introduction.md**

Create `src/content/docs/01-introduction.md`:

```markdown
---
title: Introduction
order: 1
description: Overview of the Quartz machine-driven glass fabrication project
---

![CAD Model](../../assets/images/intro.jpg)

Quartz is a material research project that unites state of the art computer-aided rapid prototyping technology (CNC) with glass - one of the most versatile design materials.

Using open source CNC hardware and custom-developed software, this speculative project aims to develop a novel computer-aided material process for the use of glass in the formation of two and three-dimensional artifacts. This project can be broadly divided into 3 categories:

- Material Research
- Machine Customization
- Parametric modelling

You'll need to be familiar with basic CAD modelling and CNC fabrication. The Resources page lists the breakdown of setup you'll need in order to get started. We recommended that you read through all materials and take the steps outlined here before getting started experimenting with glass extrusions. There is a bit of a learning curve.

![Glass result](../../assets/images/intro3.jpg)
```

- [ ] **Step 3: Create 02-experiments.md**

Create `src/content/docs/02-experiments.md`:

```markdown
---
title: Experiments
order: 2
description: Gallery of glass extrusion experiments and test results
---

#### Basic Geometry Tests
To find appropriate heat and speed settings for extrusion, we conducted over one hundred iterations listed in reverse chronology.

- **Horizontal Circle**
There is no vertical component in this extrusion. It is used to observe any dragging of the extruded geometry away from the intended path. This test helps reduce the relative dip in extrusion from the initial starting point.
<div class='embed-container'>
  <iframe src='https://player.vimeo.com/video/172656445' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
</div>

- **Vertical Arc Generation**
This vertical arc geometry determines lateral sag.
<div class='embed-container'>
  <iframe src='https://player.vimeo.com/video/172656447' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
</div>

- **Vertical Extrusion Test**
This preliminary test determines the consistency of the extrusion in one dimension. It is conducted vertically so that gravity adds minimal distortion along the extrusion path.
<div class='embed-container'>
  <iframe src='https://player.vimeo.com/video/172656446' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
</div>

---

## Causes of Failures

- **Excessive heat**
If the speed of extrusion is too high relative to the material feed rate, the extrusion tapers. If the speed of the carriage is too high, the extruded material may collapse as it does not cool down quickly enough.
<div class='embed-container'>
  <iframe src='https://player.vimeo.com/video/172656440' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
</div>

- **Excessive speed**
If the speed of extrusion is high relative to the feed rate of the material, you can achieve thin extrusions. If the speed of the carriage is too high, the extruded material may not cool instantly and collapse.
<div class='embed-container'>
  <iframe src='https://player.vimeo.com/video/172656441' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
</div>

- **Low Flame**
For this test, a mini Butane torch was used. The rated heat of the flame generated by [this torch](http://blazerproducts.com/the-gb-2001-micro-torch.html) is 1370ºC, too low to fully liquify the glass. Hence, the heat generated is barely enough to bend the glass rod. The following footage was sped up by 100X.
<div class='embed-container'>
  <iframe src='https://player.vimeo.com/video/172656442' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
</div>

- **Re-Heating and Deviation**
Without the use of vacuum to evacuate excess hot air, the flame reheats previously extruded geometry. This causes a deviation from intended extrusion path.
<div class='embed-container'>
  <iframe src='https://player.vimeo.com/video/172656444' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
</div>

- **Glass suction**
If the vacuum hose is placed too close the semi-liquid glass, it may get sucked in. Maintaining an appropriate distance and angle is crucial to appropriately divert excess hot air.
<div class='embed-container'>
  <iframe src='https://player.vimeo.com/video/172656443' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
</div>

---

#### Handheld Tests
Initial extrusions carried out by hand to better understand the material properties and behaviour of soft (Effetre/Moretti) glass.
<div class='embed-container'>
  <iframe src='https://player.vimeo.com/video/143218193' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
</div>
```

- [ ] **Step 4: Create 03-parts-list.md**

Create `src/content/docs/03-parts-list.md`:

```markdown
---
title: Parts List
order: 3
description: Complete list of hardware components needed for the project
---

- [X-Carve Machine](https://www.inventables.com/technologies/x-carve/customize#fully-loaded)
  You may order one without the Spindle and Motion Controller.
  This project is based on following configuration:
  - 1000mm Rail Kit
  - ACME Lead Screw Kit

- [TinyG Motion Controller](http://synthetos.myshopify.com/products/tinyg)

- 3X [Spindle Mounting Plates](https://www.inventables.com/technologies/spindle-mounting-plate)
  - Part Number: 30287-01

- 1X [500mm Aluminum Extrusion](https://www.inventables.com/technologies/aluminum-extrusion-20mm-x-20mm-black)
  - Part Number: 26049-01
  - Manually cut in 250mm Halves

- 1X Pack of [Tslot screws](https://www.inventables.com/technologies/pre-assembly-t-slot-nuts)
  - Pitch: 0.5mm
  - Part Number: 25281-01

- 1X Pack of [Button Head Cap Screw](https://www.inventables.com/technologies/button-head-cap-screw?recommended=product)
  - Length: 16mm
  - Pitch: 0.5mm
  - Part Number: 25286-11

- 1X Pack of [Nylon Insert Lock Nut](https://www.inventables.com/technologies/nylon-insert-lock-nut)
  - Part Number: 30265-02
  - Pitch: 0.5mm

- [Multipurpose 6061 Aluminum](http://www.mcmaster.com/#9008k62/=1165kyw)
  - Rectangular Bar 3"x3"x6"
  - Part Number: 9008K62

- [3D printer Extruder](https://www.amazon.com/Sintron-Printer-Extruder-Upgrade-MakerBot/dp/B00SLL9OO8)

- 1X [Seat washer](http://www.homedepot.com/p/DANCO-1-4-in-Faucet-Seat-Washers-for-Price-Pfister-80359/203193501)
  - 1/4" Faucet Seat Washer
  - Model Number: 80359
  - Part Number: 711262

- [Glass rods](http://www.mcmaster.com/#8496k22/=12wav0h)
  - Part Number: 8496K22
  - *This project used a locally sourced sampler set of approximately same specifications.*

- [Vaccon Venturi Pump](http://www.vaccon.com/CDF-Home.aspx)
  - Model Number: CDF-375H
  - Silencer Optional

- NPT Fittings (May be available in local hardware stores)
  - [Watts LFA-16 Compression Coupling](https://www.amazon.com/Watts-LFA16-Compression-Female-Adapter/dp/B004VT3ZYO) — 1/4" OD x 1/4" FIP
  - [Industrial Shape Hose Coupling](http://www.mcmaster.com/#6718K26) — 1/4" NPTF Male, Part Number: 6718K26
  - [AllstarBrass Straight Inverted Flare Female Brake Line Adapter Fitting](https://www.amazon.com/gp/product/B006K8MH2U) — 1/8" NPT Male to 1/4", Part Number: ALL50121

- [High Temperature Corrosion Resistant Braided Hose](http://www.mcmaster.com/#5680K12)
  - Flexible, 3/8 NPT Male Fittings
  - Part Number: 5680K12
  - Length 72" and up

- [Propane Tank](http://www.bernzomatic.com/product/ts916-16-4-oz-propane-camping-cylinder/) — Model: TX-916

- [Trigger Start Torch](http://www.bernzomatic.com/product/ts8000bzkc-high-intensity-trigger-start-torch-kit/) — Model: TS8000BZKC

- 1X Pack [Hose Clamps](http://www.mcmaster.com/#5362k12/=12wbx5l)
  - 3/4" ID
  - Part Number: 5362K12

- G-Clamps

- Zipties

- [Air Compressor](https://www.amazon.com/PORTER-CABLE-C3151-OILFREE-COMPRESSOR/dp/B001DUNC3I)
  - Model Number: Porter-Cable C3151
  - Capacity: 4.5 GALLON 150 PSI

**Notes:** These parts are an indication of what was used and tested during the documentation of this project. Feel free to experiment with different designs and materials.
```

- [ ] **Step 5: Create 04-cad-models.md**

Create `src/content/docs/04-cad-models.md`:

```markdown
---
title: CAD Models
order: 4
description: 3D models and technical drawings for the machine modifications
---

![Machine CAD](../../assets/images/XCarve1000.jpg)

## X Carve 1000mm

The model for the X-Carve 1000mm and its parts is available on [GrabCAD Workbench](https://workbench.grabcad.com/workbench/projects/gcl5zpCuwqCXWLvYktLQBc-2IHvossNo37ycTOkzg6gREW#/space/gcvs_XeRNVzNkfG_tFTAMd0C2lBbCsLcagOxXb1Jlki0kT/folder/858489).

---

## Extruder Original CAD

The reference file for the 3D printer extruder was taken from [GrabCAD Library](https://grabcad.com/library/china-extruder-for-3d-printer-from-aliexpress-1).

![GrabCad Extruder](../../assets/images/extruder-grabcad.jpg)

---

## Extruder Modification

The extruder will require to be machined in order to enlarge the feed and extrusion openings. More details can be found in the linked CAD files. It is highly recommended to carry out your own measurements specific to the extruder you own. These drawings are intended to provide a guide to share the required modifications.

![Extruder Modified](../../assets/images/extruder-mod.jpg)

<div class='embed-container'>
  <iframe width="100%" height="480" src="https://sketchfab.com/models/ec986721a17f40f2b00fd561553fb349/embed" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel=""></iframe>
</div>

[Download .3dm Rhino File](https://www.dropbox.com/s/v5pvn5o80edqq0c/extruder%20mod.3dm?dl=0) | [Download .stp File](https://www.dropbox.com/s/hwm30xc2ja88o7x/extruder%20mod.stp?dl=0)

---

## Aluminium Mounts for the Extruder

You'll need some basic experience for Lathe Machining. Please seek help from a workshop technician for extra assistance. The drawings are annotated with measurements in the Rhino file. They may vary depending upon the model of your extruder and the glass rods you own.

![Extruder Mount](../../assets/images/extruder-mount.jpg)

<div class='embed-container'>
  <iframe width="100%" height="480" src="https://sketchfab.com/models/8a998a0730a74d8391d096257696d2f6/embed" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel=""></iframe>
</div>

[Download .3dm Rhino File](https://www.dropbox.com/s/8g3itv43fneh8n2/extruder%20mount.3dm?dl=0) | [Download .stp File](https://www.dropbox.com/s/jf1a3pl2my2fpgk/extruder%20mount.stp?dl=0)

---

## Final Assembly

![Machine CAD](../../assets/images/xcarve1000-mod.jpg)

[Download .3dm Rhino File](https://www.dropbox.com/s/xrf9nrrtaag5o8s/Xcarve_mod.3dm?dl=0)
```

- [ ] **Step 6: Create 05-software-setup.md**

Create `src/content/docs/05-software-setup.md`:

```markdown
---
title: Software Setup
order: 5
description: Software requirements and workflow for generating and running G-Code
---

## Requirements

- [McNeel Rhino](https://www.rhino3d.com/)
- [Serial Port JSON Server](https://github.com/johnlauer/serial-port-json-server)
- [TinyG - Hardware Fiddle](https://github.com/synthetos/TinyG/wiki/Chilipeppr)

---

## Setup the TinyG Board

- Install [FTDI Drivers](https://github.com/synthetos/TinyG/wiki/Connecting-TinyG#install-ftdi-drivers)
- Power up and connect the TinyG board using via USB to your computer.
- Run the Serial Port JSON Server and leave it running in the background.
- Open your browser and go to [chilipeppr.com/tinyg](http://chilipeppr.com/tinyg)
- Go to the Serial Port JSON Server fiddle in bottom right and refresh to see the TinyG listed.
- Select and connect to the board.
- **Change the following settings:**
  - Change Latch Velocity to 50
  - X and Y Travel/rev = 36.54
  - X and Y Microsteps = 8
  - Z Travel/rev = 1.25
  - Z microsteps = 4

---

## Workflow

### Generate the Geometry

- The extrusion path is first created in Rhino. All the measurements are in millimeters unless otherwise specified.
- Run the Python Script Editor in Rhino. Use command: **EditPythonScript** in Rhino Console.
- Run [this script](https://gist.github.com/jaskiratr/9baad314e0218bfb0174f3a6bb7eccc1#file-quartz-rhino-python-script-py) to generate a G-Code file. The code has been taken and modified from [timcastelijn/gcode-generator](https://github.com/timcastelijn/gcode-generator).
- Copy the contents of the saved file that contains the newly written G-Code. Paste it in Chilipeppr to perform the extrusion.

![Rhino](../../assets/images/rhino.jpg)

### Run the Extrusion

- This project used browser based Chilipeppr workspace to control the machine.
- Open your browser and go to [chilipeppr.com/tinyg](http://chilipeppr.com/tinyg)
- Go to the Serial Port JSON Server fiddle in bottom right and refresh to see the TinyG listed.
- Select and connect to the board.
- Go to 'Workspace TinyG' fiddle on top left and click the load GCode button. Paste the contents under 'Open Gcode From Clipboard'.
- Insert the glass rod in the extruder and zero the machine to the correct point for extrusion.
- Power on the air-compressor to start the vacuum and ignite the propane torch at low flame. Leave it on for a few seconds till the glass is in semi-liquid state.
- Press play button in Chilipeppr GCode fiddle to initiate the movement of the machine.

![chilipeppr](../../assets/images/chilipeppr.jpg)

**Useful Links**

- [TinyG Documentation](https://github.com/synthetos/TinyG)
- [Shapeoko TinyG Setup](https://github.com/synthetos/TinyG/wiki/TinyG-Shapeoko-Setup)
- [Chilipeppr Documentation](https://github.com/synthetos/TinyG/wiki/Chilipeppr)
- [TinyG G-Code Generator](https://github.com/timcastelijn/gcode-generator)
- [Modified G-Code Generator](https://gist.github.com/jaskiratr/9baad314e0218bfb0174f3a6bb7eccc1#file-quartz-rhino-python-script-py)

<script src="https://gist.github.com/jaskiratr/9baad314e0218bfb0174f3a6bb7eccc1.js"></script>
```

- [ ] **Step 7: Create 06-electronics-setup.md**

Create `src/content/docs/06-electronics-setup.md`:

```markdown
---
title: Electronics Setup
order: 6
description: Wiring guide for stepper motors and TinyG controller
---

The electronics are fairly easy to setup. The X-Carve may come bundled with Grbl Shield that drives the motors. You'll need to drive 4 motors: X, Y, Z axis stepper motors and A axis, a rotational axis for the extruder motor. TinyG board is a good alternative that is compatible with Chilipeppr. It has 4 motor drivers on-board.

![Tinyg](../../assets/images/tinyg2.jpg)

## Stepper Motor Wiring

- Simply connect the stepper motors to the respective axis on the controller board. More details [here](https://github.com/synthetos/TinyG/wiki/Connecting-TinyG#wire-your-motors).
- Connect the limit switches.
- You can run the wiring to the extruder through [drag chain](https://www.inventables.com/technologies/drag-chain) already present on the board.

## Reference Links

- [TinyG Wiring](https://github.com/synthetos/TinyG/wiki/Connecting-TinyG)
- [X Carve Wiring](http://x-carve-instructions.inventables.com/step10/)
```

- [ ] **Step 8: Create 07-hardware-assembly.md**

Create `src/content/docs/07-hardware-assembly.md`:

```markdown
---
title: Hardware Assembly
order: 7
description: Step-by-step guide to assembling the glass extrusion machine
---

<div class='embed-container'>
  <iframe src='https://player.vimeo.com/video/172000091' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
</div>

---

## Steps

All the parts (not tools) mentioned below can be found in the [Parts List](/quartz/docs/03-parts-list).

### Preparing the Extruder Mount

**Note**: The CAD design may vary for different extruders. Double check every measurement using a pair of digital calipers and mark the machining lines with healthy tolerances.

- Cut the Aluminium 6061 block in two pieces using a cold saw. The size of each block is equal to the bounding box around the designed CAD model.
- Mark the cutting lines and projections using digital calipers, a scribe tool and set squares.
- Use a milling machine to trim the sides to the required dimensions.
- Finally use the milling machine to create the required holes for screws.
- Test it with the modified extruder and make sure the mount doesn't create any hindrances in the movement of the glass rod.

![1](../../assets/images/mount1.jpg)
![2](../../assets/images/mount2.jpg)
![3](../../assets/images/mount3.jpg)

### Modifying the Extruder

The intent is to disassemble the 3D printer filament extruder and modify it to extrude the glass rod.

**Note**: The CAD file does not mention the screw tap pitch that holds the two modified parts of the extruder. Design it according to your convenience.

- Refer to the [CAD models](/quartz/docs/04-cad-models) with correct annotations for measurements while machining.
- Some dimensions may vary, it is highly suggested that you use the models as a reference and adjust the dimensions according to your extruder and glass rods.
- Use scribe tool and set squares to mark the milling points. Clamp the pieces at correct level and use a milling machine to make the modifications.
- Fit the rubber seat [washer](http://www.homedepot.com/p/DANCO-1-4-in-Faucet-Seat-Washers-for-Price-Pfister-80359/203193501) on the motor gear.
- Test if the glass rod passes well through the extruder. Look for any shaky or loose parts. The movement should be firm and smooth.

![1](../../assets/images/extruder1.jpg)
![2](../../assets/images/extruder2.jpg)
![3](../../assets/images/extruder3.jpg)
![4](../../assets/images/extruder4.jpg)

### Vacuum Assembly

- The compressed air intake of the venturi pump is connected to the pressure hose from the compressor.
- Use the NPT fittings mentioned in the [Parts List](/quartz/docs/03-parts-list).
- Connect the stainless steel hose to the vacuum side of the pump. The hose will be mounted on the machine carriage.
- The venturi pump may rest away from the machine, as long as the hoses are long enough to allow sufficient movement during extrusion.
- **Warning** — The stainless steel pipe will get hot during extrusion. It is recommended to use non-contact methods to monitor the operating temperature of the machine parts.

![1](../../assets/images/vacuum1.jpg)
![2](../../assets/images/vacuum2.jpg)

### Assembling the Machine

**Note**: First assemble the modified extruder and the extruder mounts on a Spindle Mounting Plate. Test the movement of the glass rod by simply running the stepper motor of the extruder in each direction.

- Dismount the spindle if your machine came with it.
- Take a [500mm Aluminum Extrusion](https://www.inventables.com/technologies/aluminum-extrusion-20mm-x-20mm-black) and cut it in two halves.
- Mount each half on a separate [Spindle Mounting Plate](https://www.inventables.com/technologies/spindle-mounting-plate); one for the left side that will hold the propane torch and one for the right side that will hold the vacuum tube.
- Assemble the plates in the configuration shown below.
- Make a hole in two hose clamps for mounting them on one of the Aluminium Extrusions using button cap screws and T-slot screws.
- Use zipties as shown in photos to mount the propane torch on the Aluminium Extrusion.
- The torch should feel secured in all 3 axes. The only relatively free movement will be rotational around Z-axis. Rotate the torch to aim at the glass rod. Use any appropriate methods to lock the position of the torch in place.
- Run the stainless steel hose through the hose clamps. Point its end at the glass rod and across the propane torch tip.
- Find a correct sweet spot for the suction of the air.

**Note**: If it is too close to the rod, the molten glass might get sucked in as well. Make sure it is close enough to sufficiently evacuate the flame away from everything after it heats the glass rod.

![1](../../assets/images/assemble1.jpg)
![2](../../assets/images/assemble2.jpg)
![3](../../assets/images/assemble3.jpg)
![4](../../assets/images/assemble4.jpg)
![5](../../assets/images/assemble5.jpg)
![6](../../assets/images/assemble6.jpg)
```

- [ ] **Step 9: Build to verify content collection works**

Run:
```bash
npx astro build
```
Expected: Build succeeds (content collection is defined but not yet rendered — that's fine).

- [ ] **Step 10: Commit**

```bash
git add src/content.config.ts src/content/
git commit -m "feat: add content collection with 7 migrated doc pages"
```

---

### Task 5: Sidebar and Doc Layout

**Files:**
- Create: `src/components/Sidebar.astro`
- Create: `src/layouts/DocLayout.astro`

- [ ] **Step 1: Create Sidebar component**

Create `src/components/Sidebar.astro`:

```astro
---
import { getCollection } from 'astro:content';

interface Props {
  currentId: string;
}

const { currentId } = Astro.props;
const docs = await getCollection('docs');
const sorted = docs.sort((a, b) => a.data.order - b.data.order);
---

<aside id="sidebar" class="hidden lg:block w-64 shrink-0">
  <nav class="sticky top-24 space-y-1">
    <p class="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">Documentation</p>
    {sorted.map((doc) => (
      <a
        href={`/quartz/docs/${doc.id}`}
        class:list={[
          'block rounded-md px-3 py-2 text-sm transition-colors',
          doc.id === currentId
            ? 'bg-[var(--color-bg-elevated)] text-[var(--color-accent)] font-medium'
            : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text)]',
        ]}
      >
        {doc.data.title}
      </a>
    ))}
  </nav>
</aside>

<!-- Mobile sidebar drawer -->
<div id="sidebar-overlay" class="fixed inset-0 z-40 bg-black/60 hidden lg:hidden" aria-hidden="true"></div>
<aside
  id="sidebar-mobile"
  class="fixed top-0 left-0 z-50 h-full w-64 -translate-x-full transform bg-[var(--color-bg)] border-r border-[var(--color-border)] p-6 pt-20 transition-transform lg:hidden"
>
  <nav class="space-y-1">
    <p class="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">Documentation</p>
    {sorted.map((doc) => (
      <a
        href={`/quartz/docs/${doc.id}`}
        class:list={[
          'block rounded-md px-3 py-2 text-sm transition-colors',
          doc.id === currentId
            ? 'bg-[var(--color-bg-elevated)] text-[var(--color-accent)] font-medium'
            : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text)]',
        ]}
      >
        {doc.data.title}
      </a>
    ))}
  </nav>
</aside>

<button
  id="sidebar-toggle"
  class="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] shadow-lg lg:hidden"
  aria-label="Open navigation"
>
  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</button>

<script>
  const toggle = document.getElementById('sidebar-toggle');
  const mobileSidebar = document.getElementById('sidebar-mobile');
  const overlay = document.getElementById('sidebar-overlay');

  function openSidebar() {
    mobileSidebar?.classList.remove('-translate-x-full');
    mobileSidebar?.classList.add('translate-x-0');
    overlay?.classList.remove('hidden');
  }

  function closeSidebar() {
    mobileSidebar?.classList.add('-translate-x-full');
    mobileSidebar?.classList.remove('translate-x-0');
    overlay?.classList.add('hidden');
  }

  toggle?.addEventListener('click', openSidebar);
  overlay?.addEventListener('click', closeSidebar);
</script>
```

- [ ] **Step 2: Create DocLayout**

Create `src/layouts/DocLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro';
import Sidebar from '../components/Sidebar.astro';
import { getCollection } from 'astro:content';

interface Props {
  title: string;
  description?: string;
  currentId: string;
}

const { title, description, currentId } = Astro.props;

const docs = await getCollection('docs');
const sorted = docs.sort((a, b) => a.data.order - b.data.order);
const currentIndex = sorted.findIndex((d) => d.id === currentId);
const prev = currentIndex > 0 ? sorted[currentIndex - 1] : null;
const next = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;
---

<BaseLayout title={title} description={description}>
  <div class="mx-auto flex max-w-6xl gap-10 px-6 py-10">
    <Sidebar currentId={currentId} />
    <article class="min-w-0 flex-1">
      <header class="mb-8">
        <h1 class="text-3xl font-bold tracking-tight">{title}</h1>
      </header>
      <div class="prose prose-invert prose-lg max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-a:text-[var(--color-accent)] prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-lg
        prose-hr:border-[var(--color-border)]
        prose-strong:text-[var(--color-text)]">
        <slot />
      </div>
      <nav class="mt-16 flex items-center justify-between border-t border-[var(--color-border)] pt-8">
        {prev ? (
          <a href={`/quartz/docs/${prev.id}`} class="group flex flex-col">
            <span class="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">Previous</span>
            <span class="text-sm font-medium text-[var(--color-accent)] group-hover:underline">{prev.data.title}</span>
          </a>
        ) : <div />}
        {next ? (
          <a href={`/quartz/docs/${next.id}`} class="group flex flex-col items-end">
            <span class="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">Next</span>
            <span class="text-sm font-medium text-[var(--color-accent)] group-hover:underline">{next.data.title}</span>
          </a>
        ) : <div />}
      </nav>
    </article>
  </div>
</BaseLayout>
```

- [ ] **Step 3: Build and verify**

Run:
```bash
npx astro build
```
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/Sidebar.astro src/layouts/DocLayout.astro
git commit -m "feat: add Sidebar component and DocLayout with prev/next nav"
```

---

### Task 6: Doc Pages Route

**Files:**
- Create: `src/pages/docs/[id].astro`

- [ ] **Step 1: Create the dynamic doc route**

Create `src/pages/docs/[id].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import DocLayout from '../../layouts/DocLayout.astro';

export async function getStaticPaths() {
  const docs = await getCollection('docs');
  return docs.map((doc) => ({
    params: { id: doc.id },
    props: { doc },
  }));
}

const { doc } = Astro.props;
const { Content } = await render(doc);
---

<DocLayout title={doc.data.title} description={doc.data.description} currentId={doc.id}>
  <Content />
</DocLayout>
```

- [ ] **Step 2: Build and verify pages are generated**

Run:
```bash
npx astro build
```
Expected: Build succeeds. Check that pages are generated:
```bash
ls dist/quartz/docs/
```
Expected: directories for each doc page (e.g., `introduction/`, `experiments/`, etc.) — the exact names depend on how the glob loader generates IDs from filenames (it strips the numeric prefix and uses the slug).

Note: The glob loader generates `id` from the filename. For `01-introduction.md`, the id will be `01-introduction`. If you prefer cleaner URLs, the filenames can be adjusted. Check the actual IDs:
```bash
npx astro build 2>&1 | head -30
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/docs/
git commit -m "feat: add dynamic doc pages route"
```

---

### Task 7: Hero Component and Landing Page

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.astro`:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/images/intro.jpg';
---

<section class="relative flex min-h-dvh items-center justify-center overflow-hidden">
  <Image
    src={heroImage}
    alt="Glass extrusion in progress"
    class="absolute inset-0 h-full w-full object-cover"
    widths={[640, 1024, 1440, 1920]}
    sizes="100vw"
  />
  <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--color-bg)]"></div>
  <div class="relative z-10 mx-auto max-w-3xl px-6 text-center">
    <h1 class="text-5xl font-bold tracking-widest sm:text-7xl">QUARTZ</h1>
    <p class="mt-4 text-lg text-[var(--color-text-muted)] sm:text-xl">
      Machine Driven Glass Fabrication
    </p>
    <p class="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)]">
      A material research project uniting computer-aided rapid prototyping technology with glass — one of the most versatile design materials.
    </p>
    <a
      href="/quartz/docs/01-introduction"
      class="mt-10 inline-block rounded-md bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold text-[var(--color-bg)] transition-colors hover:bg-[var(--color-accent-hover)]"
    >
      Get Started
    </a>
  </div>
</section>
```

- [ ] **Step 2: Update landing page**

Replace `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
---

<BaseLayout title="Home">
  <Hero />
</BaseLayout>
```

- [ ] **Step 3: Build and verify**

Run:
```bash
npx astro build
```
Expected: Build succeeds. The hero image is optimized and included in the output.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add Hero component and landing page"
```

---

### Task 8: Contact Page

**Files:**
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Create contact page**

Create `src/pages/contact.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Contact">
  <div class="mx-auto max-w-2xl px-6 py-24 text-center">
    <h1 class="text-3xl font-bold tracking-tight">Contact</h1>
    <p class="mt-6 text-[var(--color-text-muted)] leading-relaxed">
      Feel free to reach us through
      <a
        href="https://github.com/danielsauter/quartz/issues"
        class="text-[var(--color-accent)] hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >GitHub</a>.
      You may ask any questions or share your opinions about the project.
      Our goal is to always improve the results and share them openly with the community.
    </p>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Build and verify**

Run:
```bash
npx astro build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: add contact page"
```

---

### Task 9: GitHub Actions Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create deploy workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v6
      - name: Install, build, and upload your site
        uses: withastro/action@v6

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

- [ ] **Step 2: Commit**

```bash
git add .github/
git commit -m "ci: add GitHub Actions workflow for Pages deployment"
```

---

### Task 10: Build Verification and Cleanup

**Files:**
- Remove (later, after verifying everything works): old Hexo files

- [ ] **Step 1: Full build test**

Run:
```bash
npx astro build
```
Expected: Build succeeds with no errors.

- [ ] **Step 2: Preview the site locally**

Run:
```bash
npx astro preview
```
Expected: Site loads at `http://localhost:4321/quartz/`. Manually verify:
- Landing page hero renders with the intro image
- Navigation links work
- All 7 doc pages render with images
- Sidebar highlights the active page
- Prev/next navigation works
- Vimeo embeds render as responsive iframes
- Sketchfab embeds render
- Contact page renders
- Mobile: hamburger menu opens sidebar drawer

- [ ] **Step 3: Check for broken image references**

Run:
```bash
npx astro build 2>&1 | grep -i "error\|warning\|could not"
```
Expected: No image-related errors.

- [ ] **Step 4: Remove old Hexo files**

Run:
```bash
rm -rf themes/ scaffolds/ source/ _config.yml
```

These are the old Hexo theme, scaffolding templates, source content (already migrated), and Hexo config. The old `package.json` was already replaced in Task 1.

- [ ] **Step 5: Update .gitignore**

Create/update `.gitignore`:

```
node_modules/
dist/
.astro/
```

- [ ] **Step 6: Final build after cleanup**

Run:
```bash
npx astro build
```
Expected: Build still succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove old Hexo files, add .gitignore"
```

---

### Task 11: Push and Deploy

- [ ] **Step 1: Rename branch to main (if needed)**

The repo currently uses `master`. GitHub Pages workflow targets `main`. Either update the workflow to use `master`, or rename:

```bash
git branch -m master main
```

If renaming, also update the remote default branch on GitHub.

Alternatively, edit `.github/workflows/deploy.yml` to use `branches: [master]` instead.

- [ ] **Step 2: Push to origin**

```bash
git push origin main
```

- [ ] **Step 3: Enable GitHub Pages**

Go to `https://github.com/jaskiratr/quartz/settings/pages` and set Source to **GitHub Actions**.

- [ ] **Step 4: Verify deployment**

Check `https://github.com/jaskiratr/quartz/actions` for the workflow run. Once complete, verify the site at `https://jaskiratr.github.io/quartz/`.
