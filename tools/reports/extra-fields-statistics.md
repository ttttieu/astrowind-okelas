# Extra Fields in Frontmatter (2.4)

## Summary
- **Extra field types found**: 3
- **Total article instances**: 97
- **Status**: STATISTICS ONLY (no removals)

## Field Breakdown

### 1. `tags` — 92 articles

**Definition**: Not in content.config.ts schema. Appears to be legacy field used before content collection migration.

**Examples**:
- ai-agent-doanh-nghiep
- ai-agents-for-business
- agentic-ai-vs-ai-assistant
- (90 more articles)

**Usage**: Appears to contain topic tags like `['RAG', 'Enterprise AI', 'Chatbots']`

**Note**: Ignored during build (not validated, dropped from schema). Marks 4% of articles as stray FM fields in check_meta.

---

### 2. `seo_title` — 4 articles

**Definition**: Not in schema. Likely SEO-specific metadata from previous content system.

**Examples**:
- ai-adoption-real-problem
- ai-tim-dieu-con-nguoi-bo-sot
- approval-to-end-to-end-workflow
- workflow-improvement-next-level

**Usage**: Contains alternative titles for SEO optimization.

**Note**: Ignored during build. Part of FM-STRAY warning (96 total file instances).

---

### 3. `slug` — 1 article

**Definition**: Not in schema. URL slug definition (usually auto-generated from filename).

**Example**:
- php2shell-ai-readiness

**Note**: Ignored during build, appears redundant with filename-based slug generation.

---

## Check_meta Coverage

According to baseline:
- **FM-STRAY warning**: 96 articles with extra fields
- **Fields counted**: tags (92) + seo_title (4) = 96 ✓

The discrepancy of 1 (slug) appears 1 additional time in the WARN FM-STRAY output due to how check_meta counts field instances vs. unique articles.

## Recommendation

**No action required** (2.4 is statistics-only). Extra fields are:
1. Safely ignored (not in schema = not processed)
2. Harmless (don't affect functionality)
3. Low priority for cleanup (only ~5% of articles)

If desired for future cleanup:
- Remove `tags` field from all 92 articles (lowest priority)
- Remove `seo_title` from 4 articles (minimal impact)
- Remove `slug` from 1 article (almost negligible)

This would eliminate FM-STRAY warnings and reduce frontmatter clutter.
