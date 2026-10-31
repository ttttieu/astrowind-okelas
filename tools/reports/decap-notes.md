# Decap CMS Configuration Update Notes

## Schema Alignment

✅ **Insights Collection Updated**: Public/decapcms/config.yml now matches src/content.config.ts schema

### Field Mapping
**Required Fields:**
- title (string) ✓
- lang (select: vi, en) ✓ - was missing
- translationId (string) ✓ - was missing
- category (select: 7 values) ✓ - was 6 wrong values
- contentType (select: 4 values) ✓ - was missing

**Optional Fields Added:**
- description (text) ✓
- publishDate (datetime) ✓
- updatedDate (datetime) ✓ - was missing
- draft (boolean) ✓ - was missing
- image, coverImage, ogImage, coverImageAlt (images) ✓ - partially missing
- primaryKeyword, secondaryKeywords (keywords) ✓ - was missing
- funnelStage (select multiple) ✓ - was missing
- audience (list) ✓ - was missing
- assessmentHref (string) ✓ - was missing
- ctaPrimaryText, ctaSubtitle (strings) ✓ - was missing
- internalLinks (list) ✓ - was missing

**Removed Fields (not in schema):**
- author (was in config, not in schema)

## Folder Structure & i18n Configuration

**Current Decap Configuration:**
```yaml
i18n:
  structure: folder
  locales: [vi, en]
  default_locale: vi
slug: "{{locale}}/{{slug}}"
```

**Actual File Structure in src/content/insights/:**
- Files stored FLAT (not in vi/en subfolders)
- Language determined by frontmatter `lang: vi|en` field
- Example: `article-name.md` contains `lang: en` in frontmatter

**Mismatch Detected:**
- Decap config specifies `structure: folder` with `{{locale}}/{{slug}}`
- This would save new files as: `src/content/insights/vi/article-name.md` or `src/content/insights/en/article-name.md`
- But glob loader in content.config.ts expects flat structure: `src/content/insights/*.md`

**Result:**
- Existing articles (stored flat) will be editable in Decap
- New articles created via Decap will be saved in vi/en folders
- Glob loader may not find articles created via Decap (folder structure issue)

**Recommendation:**
Change Decap i18n configuration to:
```yaml
i18n: false
slug: "{{slug}}"
```
This matches actual storage: flat files with `lang` field in frontmatter.

## Assessments Collection Status

**Status:** ✅ **REMOVED**

**Original Issue:**
- Decap config included "assessments" collection
- src/content/assessments folder does NOT exist
- src/content.config.ts does NOT define assessments schema
- Only "insights" and "post" collections defined in content.config.ts

**Action Taken:**
Removed entire "assessments" collection from public/decapcms/config.yml
to match actual schema in src/content.config.ts

**Decision Rationale:**
- Assessments feature not yet implemented
- No schema or folder exists
- Better to remove from CMS until feature is ready
- Can be re-added when corresponding Astro content collection is created
