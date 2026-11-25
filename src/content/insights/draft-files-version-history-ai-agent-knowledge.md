---
title: "Don't Throw Away Your Drafts: How Scattered Word and Excel Files Become a Knowledge Asset"
description: "Document version control for business: the final report shows what was decided, the drafts show why. Keep how work took shape without asking staff to write more."
publishDate: 2026-11-25T08:00:00Z
image: '~/assets/images/insights/draft-files-version-history-ai-agent-knowledge/wsp-05-og-cover-en.png'
coverImage: '~/assets/images/insights/draft-files-version-history-ai-agent-knowledge/wsp-05-og-cover-en.png'
ogImage: '~/assets/images/insights/draft-files-version-history-ai-agent-knowledge/wsp-05-og-cover-en.png'
coverImageAlt: "A stack of document versions: the final version on top, with the drafts below holding how the decision took shape."
translationId: drafts-version-history-knowledge-asset
lang: en
category: business-operations
contentType: Analysis
funnelStage: [Consideration]
audience: [CEO, COO, CFO]
primaryKeyword: "document version control for business"
secondaryKeywords: [document version history, draft documents, tacit knowledge capture, training AI agents on company data, artifact management, document management for SMEs, OnlyOffice, free edition]
ctaPrimaryText: "Take the Knowledge Management Maturity Assessment"
ctaSubtitle: "Identify your maturity level and the first improvement to make"
assessmentHref: /en/readiness/knowledge
draft: false
---

In most companies the filing routine is the same: the approved report is kept, and everything else stays on an employee's own computer until the drive fills up or the person leaves.

This article questions that "everything else." It is usually treated as clutter. But if you want an AI agent to help with production planning, those drafts may be the only record of how your best people actually work, something an SOP rarely captures.

Our earlier piece on [the cover note in a sign-off file](/en/insights/trending/cover-note-institutional-knowledge-loss) showed that tacit knowledge exists and the organization does not record it. This article takes the next step: a concrete way to keep and use that knowledge in digital work.

> **Executive summary**
> - The final version shows what the company decided. The intermediate versions can show why.
> - Version history does not replay what was in someone's head. It keeps **traces of the thinking process** through changes in the work product.
> - Managing a document as one artifact with many versions, instead of many loose files, keeps those traces without asking staff to write extra logs.
> - These traces can feed AI agents, but only with selection, access control and cross-checking against operational data.
> - You can start small. A full document management project is not a prerequisite.

## Drafts on employees' laptops: gold or clutter?

Picture a production planner. Over one month, this person may create:

1. An Excel file with order, inventory and machine-capacity data.
2. An Excel file testing several allocation options.
3. A Word file noting problems that came up.
4. A few revisions after talking with the shop floor.
5. The final report for the manager.

*This is an illustrative example by OKELAS, not a specific customer case.*

Once the report is approved, the company usually keeps only item 5. The other four sit in a Desktop folder and slowly disappear.

An experimental spreadsheet may never reach the report. A rejected option may hold assumptions, calculations and constraints nobody wrote down anywhere else. None of it looks polished, but it shows what the planner weighed.

## The final shows what was decided; the versions explain why

If you want an AI agent to take over part of production planning, the final report is not enough. The agent also needs to understand:

- Which options did the planner consider?
- Why was option A rejected?
- Which data made them change the decision?
- Which conditions counted as constraints?
- Which exceptions meant the normal process did not apply?

This information often never appears in official documents. It lives in how the document took shape.

![Two blocks joined by an arrow: the final shows what was decided, the intermediate versions show why; companies usually keep only the first.](~/assets/images/insights/draft-files-version-history-ai-agent-knowledge/wsp-05-final-vs-versions-en.svg)

*Figure 1. The final and the versions answer two different questions.*

That is also the difference from the cover-note story. A handwritten note is tacit knowledge **outside** any system. A digital draft is tacit knowledge **inside** files a system could already record, if the company chooses to.

## Version history keeps the trace of how a document took shape

One precision matters: version history does **not** record what a person thought. It keeps traces of the thinking through changes in the work product.

An illustrative example, with one artifact called "December production plan":

1. **Version 1, starting data.** Orders, inventory and machine capacity entered.
2. **Version 2, option A.** Output allocated to current capacity.
3. **Version 3, adjustment.** Revised after finding a machine due for maintenance.
4. **Version 4, option B.** Reallocated, with an overtime option added.
5. **Version 5, result.** The chosen option goes forward for approval.

![A chain of five versions: starting data, option A, an adjustment after a machine maintenance date surfaced, option B with overtime added, and the result sent for approval.](~/assets/images/insights/draft-files-version-history-ai-agent-knowledge/wsp-06-version-chain-en.svg)

*Figure 2. The version chain keeps the trace of the weighing process.*

From such a chain a company can gradually analyze which conditions made an option change, what is a routine decision and what is an exception, which repeated steps are missing from the SOP, and where official process and actual practice diverge.

There is a limit worth stating. If you only look at the difference between two versions, an AI or an analyst can guess wrongly why someone edited the document. Some changes are formatting; some are typo fixes. So version history should be combined with operational data, process events and real outcomes.

**Artifact history is not a complete record of thinking, but it is one of the most natural sources of evidence about how work is actually done.**

### How is a versioned artifact different from loose files?

| Scattered files on personal machines | A centrally managed artifact |
| --- | --- |
| Report_v1.docx, Report_v2_final.docx, Report_v2_final_new.docx | One artifact with many versions |
| Unclear which version is correct | Defined status and version |
| The final copy sits in email | Can be linked to a workflow |
| No change history | Creator, editors and timestamps |
| Hard to reuse | Can be retrieved, analyzed and reused |

The point is that **no one has to change how they think or keep a separate work diary**. They still draft, test and edit as usual, and the system records how the artifact took shape. The behavioral cost is far lower than asking everyone to write another report explaining what they did.

![Two different blocks: many scattered files with many names, and one managed artifact with many versions; staff work as before while the system records the process.](~/assets/images/insights/draft-files-version-history-ai-agent-knowledge/wsp-07-loose-vs-artifact-en.svg)

*Figure 3. From loose files to an artifact with history.*

## From artifact history to AI agents

When companies want to build an AI agent, many start by feeding it SOPs, work instructions, policies, forms and training material. Those describe how work **should** be done. They do not necessarily show how work **actually** happens.

One way to see it is three sources of knowledge for an AI agent (*a discussion framework proposed by OKELAS, not a certified methodology*):

1. **Prescribed knowledge:** SOPs, policies, standards, instructions. They say how work is supposed to be done.
2. **Operational knowledge:** process events, transaction data, real outcomes. They say what happened.
3. **Process artifacts:** drafts, versions, comments, trial options. They help show the choices and adjustments made along the way.

Rather than training an AI only on what the company wrote into official documents, there is a chance to also draw on what the company actually did.

![Three cards: prescribed knowledge, operational knowledge, and process artifacts such as drafts and versions; the third is usually missed.](~/assets/images/insights/draft-files-version-history-ai-agent-knowledge/wsp-08-three-sources-en.svg)

*Figure 4. Three knowledge sources; the third is usually not kept.*

Not every draft is valuable. Some versions are only formatting, some changes are mistakes, and some content is sensitive and should not go to an AI. Recording how employees work also needs clear notice and rules on who can access it and for what purpose. So selection, classification, access control and a defined purpose are required.

If nothing is captured, most of these traces simply disappear.

## OnlyOffice: more than a replacement for Word and Excel

In our [previous article](/en/insights/business-operations/software-license-crackdown-cheaper-office-alternative) we argued that moving to a cheaper suite saves license fees but not manual work. Here is another role OnlyOffice can play when it sits inside OKELAS instead of running alone.

- **Editing tool:** employees keep a familiar place to create and edit DOCX, XLSX and PPTX when needed. That lowers the barrier to change.
- **Review tool:** when AI produces a draft, staff open it to check, comment, edit and approve. That is a shift from creating content directly to controlling it.
- **Gateway to artifact management:** integrated into OKELAS, editing ties into the artifact lifecycle. Each save creates a retrievable version, shows who edited and when, allows comparison and restore, and links to workflows, tasks and related records.

OnlyOffice then stops being just an office application. It becomes a working interface over artifacts that OKELAS manages. People still write when they need to, but no longer manage dozens of files on personal machines, or download, edit locally and upload again.

## The free edition: start without a document management project

Many SMEs think of document management as a large system with a rollout project, permissions, workflow configuration and training. That is true of a full DMS. But you can start from a simpler need:

**Don't let each employee manage dozens of document versions on their own machine. Put the artifact in a workspace that manages versions.**

The OKELAS Free Edition provides an artifact management foundation with version history. A company can begin with a few ordinary work documents: gather them in one place and keep the history of how they came about. No need to change every process, and no need to ask staff for extra work logs.

One thing to be clear about: the Free Edition runs on-premise. It is not a SaaS service you sign up for and use. Deployment takes some technical knowledge, and the OKELAS team can help if you want to get started.

As needs grow, you can add department and role permissions, review and approval flows, document registration, release version control, links to SOPs and workflows, and audit trails.

One boundary should stay clear: version history for managing the work process does **not automatically replace** formal document control under GMP or ISO. Approved documents still need proper release, change control and archiving. *This is a governance perspective, not compliance or legal advice.*

## Keep how the work was done, not only the result

For AI to take on part of human work, a company first has to preserve traces of how people did that work. SOPs tell AI what to do. Operational data shows what happened. Artifact history adds evidence of how people tried, adjusted and finished.

The cover-note article said companies are losing knowledge. This one says they can begin recovering it, starting with the Word and Excel files employees create every day.

**Companies tend to keep what employees finished, and throw away what could help AI learn how to finish it.**

<!-- EDITABLE:cta START -->

---

**Is your company keeping the result of the work, or also how it came to be?**

→ [Take the Knowledge Management Maturity Assessment](/en/readiness/knowledge) to identify your maturity level and the first improvement to make.

→ If you would like to deploy the OKELAS Free Edition, [contact the OKELAS team](/en/contact). Because it runs on-premise, installation needs some technical knowledge; we will work through a deployment that fits your company.

<!-- EDITABLE:cta END -->

<!-- EDITABLE:links START -->

**Further reading:**

- (previous) [Vietnam's Software License Crackdown: Don't Just Find a Cheaper Office Suite, Find a New Way to Work](/en/insights/business-operations/software-license-crackdown-cheaper-office-alternative)
- (pillar) [Digital Transformation for Manufacturing SMEs](/en/insights/business-operations/digital-transformation-manufacturing-sme)
- (related) [What Gets Thrown Away With the Cover Note](/en/insights/trending/cover-note-institutional-knowledge-loss)
- (related) [Document Explosion: when AI creates more documents](/en/insights/knowledge-management/ai-document-explosion)

<!-- EDITABLE:links END -->

## Sources

- This article uses no external statistics. The examples (a December production plan, a five-version chain) are illustrative, not customer cases.
- The descriptions of OnlyOffice integration and the OKELAS Free Edition (artifact management, version history) are product information supplied by OKELAS, with no independent source.
- Using artifact history as input for AI agents, and the three-source knowledge framing, are OKELAS's view and discussion framework, not independently validated research.
- Governance perspective, not compliance or legal advice.
