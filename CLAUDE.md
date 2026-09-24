# Claude Code Configuration
# OKELAS Website — Claude Code CLI Guidelines

## 1. Project Overview & Brand Positioning
- **Brand**: OKELAS (Organization Knowledge Operating System)
- **Positioning**: High-performance B2B knowledge management & operation system focusing on Process Standardization, Progressive eQMS, ERP Readiness, and AI Readiness.
- **Target Audience**: C-Level executives, Operations Directors, Quality Directors (Manufacturing & SMEs).

## 2. Tech Stack & Commands
- **Framework**: Astro (AstroWind starter theme)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **CMS / Content**: Markdown / MDX via Content Collections
- **Commands**:
  - Dev Server: `npm run dev`
  - Production Build: `npm run build`
  - Type & Syntax Check: `npm run astro check`

## 3. Protected Files & Directories (DO NOT OVERWRITE)
- **DO NOT modify or overwrite stable production pages** unless explicitly instructed in the prompt.
- **DO NOT delete or rewrite existing articles** inside `src/content/post/vi/` or `src/content/post/en/`.
- **Core Layout Protection**: Preserve `src/layouts/PageLayout.astro` and `src/layouts/Layout.astro`.

## 4. UI/UX & Design System
- **Components**: Strictly reuse existing AstroWind UI widgets (`Hero`, `Features`, `Content`, `CallToAction`, `Steps`, `Stats`).
- **Color Palette**: Enterprise B2B theme — Navy Blue (Primary), Slate Gray, Tech Accent Blue.
- **Header**: Contains OKELAS text logo, main navigation, and language picker (`VI / EN`). Announcement bar is disabled.

## 5. Bilingual Architecture & Content Guidelines (Insights / Blog)
- **Independent Bilingual Files**: Each article MUST be an independent `.md` or `.mdx` file located in its designated language folder:
  - Vietnamese: `src/content/post/vi/`
  - English: `src/content/post/en/`
- **Translation Slug Linkage**:
  - Articles covering the same topic in both languages MUST link to each other using the `translationSlug` field in the frontmatter.
  - Example (VI): `translationSlug: 'process-standardization-eqms'`
  - Example (EN): `translationSlug: 'chuan-hoa-quy-trinh-eqms'`
- **Frontmatter Schema Requirements**:
  All blog/insight markdown files must strictly comply with `src/content/config.ts`:
  ```yaml
  ---
  title: 'Tên bài viết chuẩn SEO (dưới 60 ký tự)'
  excerpt: 'Mô tả ngắn gọn thu hút C-Level (150-160 ký tự)'
  publishDate: 2026-09-24T00:00:00Z
  image: '~/assets/images/sample.png'
  category: 'eQMS' # Choose from: Process, eQMS, ERP Readiness, AI Readiness, Knowledge
  tags: ['Process', 'Quality', 'ERP']
  translationSlug: 'corresponding-article-slug'
  ---
  SEO & Tag Policy:

File name & slug MUST be in lowercase kebab-case without Vietnamese accents (e.g., chuan-hoa-quy-trinh-eqms.md).

Keep tag pages set to robots: index: false in site config to avoid thin-content issues.

## 6. Pillar Article Format Standard
All pillar articles in `src/content/insights/` MUST follow this strict format:

**File Structure:**
```
---
[frontmatter only - no metadata tables]
---

---

> **Tóm tắt cho CEO** / **Executive Summary**
>
> - Bullet point 1
> - Bullet point 2
> - Bullet point 3

---

## Main Section (H2)

Content starts here with H2/H3 hierarchy only.

### Subsection (H3)

No H1 headings in body — title comes from frontmatter only.
```

**Common Issues to Avoid:**
1. ❌ H2 summary sections (`## Tóm tắt`) — must be blockquote format (`> **Tóm tắt**`)
2. ❌ Duplicate H1 headings in body matching frontmatter title
3. ❌ Metadata/information tables (Thông tin chung, SEO sections) — remove before publishing
4. ❌ Missing summary sections — all pillars must have one
5. ❌ Character encoding errors (mojibake like `â€"`) — use proper em-dash `—`
6. ❌ Missing article content — must include full body text after summary
7. ❌ Inconsistent summary blockquote style — always use `> **Title**` format

**Frontmatter Schema for Pillars:**
```yaml
---
title: "Article Title with Proper — Em-Dash"
description: "Clear description text"
publishDate: 2026-09-24T00:00:00Z
translationId: pillar-name-identifier
lang: en / vi
category: [business-operations | ai | erp | compliance | knowledge-management]
contentType: Pillar
funnelStage:
  - Awareness
  - Understanding
  - Consideration
audience: [CEO, COO, CIO, etc]
primaryKeyword: "main keyword"
secondaryKeywords: ["keyword1", "keyword2"]
assessmentHref: /readiness/[assessment-type]
draft: false
---
```

**Routing & Localization:**
- Vietnamese pillars: `/insights/{category}/{vi-slug}` (bare route)
- English pillars: `/en/insights/{category}/{en-slug}` (prefixed route)
- Bilingual linkage uses `translationId` field for language switcher (not just URL prefix toggling)

## 7. Safety & Verification Workflow
Before finalizing any task, Claude Code CLI must perform the following:

Validate all new frontmatter schemas against src/content/config.ts.

Run npm run astro check and npm run build to confirm there are zero build or TypeScript errors.

Ensure no unauthorized files were modified via git status.

See [AGENTS.md](./AGENTS.md) for all project documentation and AI agent instructions.
