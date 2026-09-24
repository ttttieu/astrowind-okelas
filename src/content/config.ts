import { defineCollection, z } from 'astro:content';

/**
 * Insights article collection schema.
 *
 * Field naming decisions (report for future articles to use consistently):
 *   translationId  — shared key linking EN + VI versions of the same article
 *                    (e.g. "erp-pillar-why-fail"). Different from the URL slug
 *                    of either language version.
 *   lang           — "en" | "vi"
 *   category       — matches the 5 hub slugs: business-operations |
 *                    knowledge-management | erp | ai | compliance
 *   contentType    — Opening | Analysis | Case & Evidence | Pillar
 *   funnelStage    — Awareness | Understanding | Consideration
 *
 * Note: existing draft pillars in src/pages/insights/drafts/ use different
 * field names (content_type, funnel_stage, cluster, translationKey). These
 * must be normalized to this schema before being moved into this collection.
 */
const insightsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Core SEO / page fields
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.date().optional(),
    updatedDate: z.date().optional(),
    image: z.string().optional(),

    // Bilingual linking
    translationId: z.string(),       // shared between EN + VI versions
    lang: z.enum(['en', 'vi']),

    // Taxonomy
    category: z.enum([
      'business-operations',
      'knowledge-management',
      'erp',
      'ai',
      'compliance',
    ]),
    contentType: z.enum(['Opening', 'Analysis', 'Case & Evidence', 'Pillar']),
    funnelStage: z
      .enum(['Awareness', 'Understanding', 'Consideration'])
      .optional(),

    // Audience (free-form tags, not validated)
    audience: z.array(z.string()).optional(),

    // SEO extras
    primaryKeyword: z.string().optional(),
    secondaryKeywords: z.array(z.string()).optional(),

    // Links
    assessmentHref: z.string().optional(),
    internalLinks: z.array(z.string()).optional(),

    // Draft flag — draft: true articles are excluded from production builds
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  insights: insightsCollection,
};
