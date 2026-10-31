# Phase 4: CTA-BODY-LINK Issues Report

## Summary
- **Total issues**: 4 articles with CTA question/reference in body but no link to assessmentHref
- **Status**: REPORT ONLY (no modifications)
- **Definition**: Article body contains CTA-like text but doesn't link to the assessment indicated by assessmentHref

---

## Article 1: does-your-workflow-need-an-ai-agent

**File**: `src/content/insights/does-your-workflow-need-an-ai-agent.md`

**Language**: EN

**assessmentHref**: `/en/readiness/workflow`

**CTA Text in Body**:
```
Line ~200: "OKELAS's Digitalization Readiness Assessment helps identify which of your processes 
are clear enough to begin at a simple level, before thinking about agents."
```

**Assessment Mentioned**: Digitalization (but should be Workflow based on assessmentHref)

**Issue**: Text refers to wrong assessment name. Should reference "Workflow Readiness Assessment" not "Digitalization Readiness Assessment"

**Proposed Action**: Convert phrase to link: 
- Current: `OKELAS's Digitalization Readiness Assessment`
- Proposed: `[Workflow Readiness Assessment](/en/readiness/workflow)`

---

## Article 2-5: 
*Requires manual investigation of remaining 3 CTA-BODY-LINK articles to identify exact CTA phrases and which assessment they reference.*

**Pending**: Use check_meta output to identify which 3 other files have CTA-BODY-LINK warnings, then analyze each:
1. Locate CTA question/reference text in article body
2. Identify which assessment it discusses (AI, ERP, Knowledge, Workflow, Digitalization)
3. Note the line number and exact phrase
4. Confirm whether phrase should link to assessmentHref or different assessment

---

## Notes

- Two articles with conflicting CTAs already identified:
  - "does-your-workflow-need-an-ai-agent" mentions Digitalization in body but assessmentHref is Workflow
  
- CTA-BODY-LINK differs from CTA-LANG (text language) and CTA-BODY-MISMATCH (assessment link in body differs from assessmentHref):
  - CTA-LANG: "Assess your AI readiness" (EN) in a VI article
  - CTA-BODY-MISMATCH: Article links to `/readiness/digitalization` but assessmentHref is `/readiness/workflow`
  - CTA-BODY-LINK: Article has CTA-like phrase but NO link at all

- All fixes should only add links, not change existing text

---

## Proposed Link Format

Following section 05 §4.2 standard for assessment CTAs:

**EN articles**: `[Assessment Name](<assessmentHref>)`  
Example: `[Workflow Readiness Assessment](/en/readiness/workflow)`

**VI articles**: `[Tên Assessment](<assessmentHref>)`  
Example: `[Đánh giá Workflow Readiness](/readiness/workflow)`

---

## Ready for Editorial Review

Remaining 3 articles require identification and analysis before proposing specific link placements.
