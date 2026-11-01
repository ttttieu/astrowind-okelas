# OKELAS Website — Claude Code CLI Guidelines

Last verified against `main` on 2026-11-01. See [AGENTS.md](./AGENTS.md) for the generic AstroWind template notes (components, Tailwind v4, config.yaml) and `.agents/skills/` for task-specific skills. This file describes what is **specific to OKELAS** and takes precedence where the two differ.

## 1. Project Overview

- **Brand**: OKELAS (Organization Knowledge Operating System).
- **Positioning**: B2B knowledge-management and operations system for Vietnamese manufacturing SMEs: process standardization, progressive eQMS, ERP readiness, AI readiness.
- **Audience**: C-level, operations and quality directors.
- **Site**: https://www.okelas.com — static Astro site deployed on Vercel (`vercel.json`), bilingual Vietnamese (default, no prefix) and English (`/en`).
- **Stack**: Astro 7, Tailwind CSS v4, TypeScript, MDX, Sharp. Node >= 22. Decap CMS (`public/decapcms/`) edits articles through git.
- `api/` (assessment backend) and the root `*.py`, `*.log`, `questions_*.json` files belong to the assessment tooling. Do not touch them unless the task is about assessments.

## 2. Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server at localhost:4321 |
| `npm run build` | Production build to `dist/` (expect 292 pages at the time of writing) |
| `npm run check` | `astro check` + ESLint + Prettier |
| `npm ci` | Clean install. The lockfile must stay in sync with `package.json`; if `npm ci` fails, fix the lockfile in its own PR. |

## 3. Protected Files (do not modify unless the prompt says so)

- Infrastructure: `astro.config.ts`, `vercel.json`, `package.json`, `package-lock.json`, `src/layouts/*`, `src/components/CustomStyles.astro`, `src/content.config.ts`, `vendor/`.
- Approved article text. Follow `docs/05_OKELAS_Article_Editing_Guard.md`: do not rewrite or shorten an approved article; only insert links, images with a short caption, and fill the EDITABLE blocks.
- Stable pages (`src/pages/**`) unless explicitly requested.

## 4. Content Architecture (Insights)

- **Single collection**: `insights`, defined in `src/content.config.ts` (the active schema). `src/content/config.ts` is a legacy file that Astro ignores; do not edit it or rely on it.
- **One flat folder**: `src/content/insights/<slug>.md`. There are no `vi/` or `en/` subfolders, and no `src/content/post/`. The file name is the article id and the URL slug: lowercase kebab-case, no accents. VI and EN versions are **separate files with different slugs**.
- **Pairing**: both versions share the same `translationId` and differ in `lang` (`vi` | `en`).
- **Routes**:
  - Vietnamese: `/insights/<category>/<slug>`
  - English: `/en/insights/<category>/<slug>`
  - Category hubs: `/insights/<category>` and `/en/insights/<category>` (files in `src/pages/insights/*.astro` and `src/pages/en/insights/*.astro`). Shared helper: `src/lib/insights.ts`.
- **Categories** (enum): `business-operations`, `knowledge-management`, `erp`, `ai`, `compliance`, `workflow`, `trending`. Current size: 218 articles = 109 VI + 109 EN pairs.
- **Frontmatter schema** (authoritative: `src/content.config.ts`):

```yaml
---
title: "Title (no trailing — OKELAS; the site appends it)"
description: "Meta description, <= 180 characters"
publishDate: 2026-10-24T07:00:00Z
image: '~/assets/images/insights/<slug>/<file>.png'       # cover
coverImage: '~/assets/images/insights/<slug>/<file>.png'  # shown on list pages
ogImage: '~/assets/images/insights/<slug>/<file>.png'     # og:image / social share
coverImageAlt: "Alt text for the cover"
translationId: shared-id-for-vi-and-en
lang: vi            # or en
category: trending  # one of the 7 enum values
contentType: Opening   # Opening | Analysis | Case & Evidence | Pillar
funnelStage: [Awareness]   # Awareness | Understanding | Consideration
audience: [CEO, COO]
primaryKeyword: "..."
secondaryKeywords: [..., ...]
ctaPrimaryText: "..."
ctaSubtitle: "..."
assessmentHref: /readiness/knowledge     # EN files: /en/readiness/...
draft: false
---
```

- The body has **no `# H1`** (the layout renders the title). Start with prose or the summary blockquote (`> **Tóm tắt cho CEO**` / `> **Executive summary**`).
- **Validation**: `python tools/check_meta.py src/content/insights/<file>.md --repo .` checks frontmatter, CTA, links, images and the VI/EN pair against the live schema. Run it for every article you touch.

## 5. Images

- **Where**: article images live in `src/assets/images/insights/<slug>/` (Astro optimizes and hashes them). Legacy images may still be under `public/assets/images/insights/`; they work but are not optimized. Put new images in `src/assets/`.
- **Reference**: `![alt](~/assets/images/insights/<slug>/<file>)` in the body, and `~/assets/...` in frontmatter.
- **Social cover**: every article needs `image`, `coverImage` and `ogImage` (1200x630 PNG). If `ogImage`/`coverImage` is missing the site falls back to the default hero image, which is wrong for sharing. Trending covers are named `tr-NN-og-cover-<lang>.png`.
- **Body figures**: SVG, `viewBox` 1200 x H, `role="img"` + `aria-label`, Inter font, brand palette, one message per figure, text >= 12 px. Always write the alt text. Do not put unsourced numbers on figures. Label illustrative examples as such.
- **Light/dark**: the theme is the site toggle (`html.dark`), not the OS.
  - A markdown image that points to `...-dark.svg|png` is rendered as a light + dark pair (`src/utils/dark-image-remark.ts`, CSS in `CustomStyles.astro`). Reference only the `-dark` file; the light twin must exist next to it.
  - SVGs that use `@media (prefers-color-scheme: dark)` follow the toggle through `html.dark img { color-scheme: dark }`.
  - Do not reintroduce client-side `src` swapping.
- **Generators** (reproducible, spec-driven):
  - `tools/covers/` — trending covers. `node tools/covers/gen_covers.js`, then `python3 tools/covers/apply_frontmatter.py`.
  - `tools/figures/` — trending body figures. `node tools/figures/gen_figures.js`, then `python3 tools/figures/insert_figures.py` (idempotent).
  - They need `npm i --no-save @fontsource-variable/inter playwright` in **one** command (separate `--no-save` installs prune each other).

## 6. Bilingual and Link Rules

- **Vietnamese is the primary version.** The English version is adapted (terms, SEO keywords, headings, CTA), not translated sentence by sentence.
- **Every internal link in English content must start with `/en`** (body, `assessmentHref`, CTAs). Never link an English article to a Vietnamese path.
- Language is detected from the URL (`/en...` = English). Header, logo and menu links must keep the current language (`src/components/widgets/Header.astro`); the switcher uses `translationId` (`src/components/common/LanguageSwitcher.astro`).
- English-only pages (Why, Solutions, Readiness, About) need an alias under `src/pages/en/` that mirrors the Vietnamese page.

## 7. Content Standards

Authoritative project documents live in the claude.ai Project "OKELAS content": `01_OKELAS_Content_System_Context`, `02_..._Production_Standard`, `03_..._Pillar_Map`, `04_..._Image_Production_Standard`, `05_..._Article_Editing_Guard`. Only `05` is mirrored in the repo (`docs/05_OKELAS_Article_Editing_Guard.md`). Follow them; if a prompt cites one you cannot read, ask for it instead of guessing.

- Do not invent statistics, customer cases, ROI or product capabilities. Mark illustrative examples as illustrative. Name the source and period for important figures.
- Tool disclaimer for OKELAS-coined frameworks: "discussion framework proposed by OKELAS, not a certified methodology".
- ISO/GMP/compliance topics carry: "governance perspective, not compliance or legal advice".

## 8. Working Rules for the CLI

- Work on a new branch from `origin/main`; never commit to `main`. Open a PR and **do not merge**.
- Change only the files the task names. No drive-by edits to infrastructure, layouts, config or other articles.
- Do not invent alt text, captions or frontmatter values; use the supplied spec.
- Report **raw command output** (not "done" or a checkmark). If a command fails, stop and paste the error.
- Before finishing: `git status --short` shows only the intended files; `npm ci` and `npm run build` succeed; run `tools/check_meta.py` on touched articles.
- Built HTML is minified (astro-compress). Meta tags can be unquoted and attribute order can differ, so match with tolerant regexes (e.g. `grep -oE '<meta [^>]*og:image"[^>]*>'`).
- Commit messages: short imperative, no claims that were not verified.
