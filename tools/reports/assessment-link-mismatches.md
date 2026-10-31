# Assessment Link Mismatches (2.3)

## Summary
- **Total articles with mismatches**: 21
- **Status**: REPORT ONLY (no fixes applied)
- **Definition**: Articles where assessmentHref frontmatter field differs from assessment link appearing in article body

## Detailed List

| File | assessmentHref | Link in Body | Note |
|------|---|---|---|
| approval-to-end-to-end-workflow | /en/readiness/workflow | /en/readiness/digitalization | Workflow article, body links to digitalization |
| approval-workflow-den-end-to-end | /readiness/workflow | /readiness/digitalization | VI version of above |
| co-workflow-van-lam-viec-cham | /readiness/workflow | /readiness/digitalization | Workflow article, body links to digitalization |
| digitized-vs-optimized-workflow | /en/readiness/workflow | /en/readiness/digitalization | Workflow article, body links to digitalization |
| email-spreadsheet-work-tracking | /en/readiness/workflow | /en/readiness/digitalization | Workflow article, body links to digitalization |
| event-driven-workflow | /en/readiness/workflow | /en/readiness/digitalization | Workflow article, body links to digitalization |
| event-driven-workflow-la-gi | /readiness/workflow | /readiness/digitalization | VI version of above |
| how-to-use-erp-data | /en/readiness/erp | /en/readiness/ai | ERP article, body links to AI |
| khai-thac-du-lieu-erp | /readiness/erp | /readiness/ai | VI version of above |
| programmed-vs-nonprogrammed-decisions | /en/readiness/workflow | /en/readiness/digitalization | Workflow article, body links to digitalization |
| rag-limitations-enterprise-ai | /en/readiness/workflow | /en/readiness/ai | Workflow/AI article, just fixed in 2.1 |
| rule-hay-con-nguoi-quyet-dinh-trong-workflow | /readiness/workflow | /readiness/digitalization | Workflow article, body links to digitalization |
| so-hoa-workflow-vs-toi-uu-workflow | /readiness/workflow | /readiness/digitalization | Workflow article, body links to digitalization |
| theo-doi-cong-viec-email-excel | /readiness/workflow | /readiness/digitalization | Workflow article, body links to digitalization |
| workflow-automation-vs-intelligent | /readiness/workflow | /readiness/digitalization | Workflow article, body links to digitalization |
| workflow-automation-vs-intelligent-workflow | /en/readiness/workflow | /en/readiness/digitalization | EN version of above |
| workflow-co-the-nhanh-hon | /readiness/workflow | /readiness/digitalization | Workflow article, body links to digitalization |
| workflow-digitized-still-slow | /en/readiness/workflow | /en/readiness/digitalization | Workflow article, body links to digitalization |
| workflow-human-bottleneck | /en/readiness/workflow | /en/readiness/digitalization | Workflow article, body links to digitalization |
| workflow-improvement-next-level | /en/readiness/workflow | /en/readiness/digitalization | Workflow article, body links to digitalization |
| workflow-phu-thuoc-con-nguoi | /readiness/workflow | /readiness/digitalization | VI version of workflow article |

## Pattern Analysis

### Workflow → Digitalization (18 articles)
**Pattern**: Articles with `assessmentHref: /readiness/workflow` contain links to `/readiness/digitalization` in body.

**Likely reason**: Articles discuss both workflow optimization AND digital transformation as next steps. The CTA links to Workflow assessment, but body discusses Digitalization path.

**Examples**:
- "email-spreadsheet-work-tracking" 
- "workflow-automation-vs-intelligent"
- Multiple workflow-related articles

### ERP ↔ AI (3 articles)
- "how-to-use-erp-data" and "khai-thac-du-lieu-erp": ERP assessmentHref but link to AI in body
- "rag-limitations-enterprise-ai": Workflow assessmentHref but links to AI in body

**Likely reason**: Articles discuss both ERP/AI aspects or downstream implications.

## Notes for Editor

These mismatches indicate intentional cross-assessment links within articles. The discrepancy between frontmatter and body suggests:
1. Article scope covers multiple assessment areas
2. CTA focuses on primary assessment (assessmentHref)
3. Body content provides options to related assessment paths

**No corrections recommended** without editorial review to understand intent behind each mismatch.

## For Phase 2.2 Cross-Check

One of these articles (rag-limitations-enterprise-ai) was also modified in Phase 2.1. Verify that the fixed assessmentHref (/en/readiness/workflow) aligns with content intentions.
