---
title: "AI in Workflow: Which Stages It Belongs In — and Which It Doesn't"
description: "AI doesn't participate in every workflow stage the same way. This article maps where AI processes information, where rules and people decide, and why that boundary matters."
publishDate: 2026-09-23T00:00:00Z
translationId: article-5-10-where-ai-fits-workflow
lang: en
category: workflow
contentType: Analysis
funnelStage:
  - Understanding
audience:
  - COO
  - CIO
  - Operations Director
primaryKeyword: "AI in business workflows"
secondaryKeywords:
  - "intent recognition workflow"
  - "levels of automation workflow"
  - "where to use AI in a workflow"
  - "human oversight AI workflow"
  - "human-in-the-loop automation"
assessmentHref: /en/readiness/ai
coverImage: '~/assets/images/insights/where-ai-fits-in-workflow/wfi-00-og-cover-en.png'
ogImage: '~/assets/images/insights/where-ai-fits-in-workflow/wfi-00-og-cover-en.png'
coverImageAlt: "The four information-processing stages of a workflow. AI participates in stages 1 and 2 (acquisition, analysis); rules and people handle stages 3 and 4 (decision, execution)."
draft: false
---

---

> **Executive Summary**
>
> - The question "should we add AI to this workflow" usually gets answered too early. The better question: **which stage of an information-processing chain should AI participate in?**
> - The Parasuraman, Sheridan and Wickens (2000) framework breaks a processing chain into four stages: information acquisition, information analysis, decision and action selection, and action implementation.
> - **AI participates in stages 1-2:** intent recognition, information extraction, controlled classification, and interpretation with evidence. These are the stages where AI can handle unstructured input that rules alone cannot process.
> - **Stages 3 (decision) and 4 (execution) are not where AI acts independently.** Decisions belong to approved rules or people; execution belongs to the workflow system — with authority explicitly defined and separated from AI.
> - Every AI output must include traceable evidence — so the person deciding can verify, not just accept an AI "conclusion."

---

Many conversations about "AI in workflow" at the COO/CIO level start and end with a vague question: "should we add AI to process X?" That question is hard to answer because it bundles together many very different things.

A real workflow isn't a single block. It's made up of several stages: gathering data, understanding what that data means, deciding what to do, and carrying out that action. AI can participate in some of these stages — but not all, and not in the same way. That boundary needs to be clear — not to restrict AI, but to keep authority in the right place.

→ *Related: [Programmed vs. Nonprogrammed Decisions: Rules, Judgment, and Where Each Belongs](/en/insights/workflow/programmed-vs-nonprogrammed-decisions)*

---

## Four Stages of an Information-Processing Chain

![The four-stage information-processing model: acquisition, analysis, decision and action selection, and implementation, mapped to recording an event, classifying it, deciding, and acting; the level of control needed can differ at each stage.](~/assets/images/insights/where-ai-fits-in-workflow/wfi-01-four-stages-en-dark.svg)

The model developed by Parasuraman, Sheridan and Wickens (2000), published in IEEE Transactions on Systems, Man, and Cybernetics, is one of the most-cited frameworks in human-machine interaction and automation research. It divides a processing chain into four stages:

1. **Information acquisition** — sensing and capturing input data from various sources.
2. **Information analysis** — synthesizing and interpreting the collected data to understand what it means.
3. **Decision and action selection** — weighing options and choosing the appropriate action.
4. **Action implementation** — carrying out the chosen action.

The most important insight from this model: **the level of control needed doesn't have to be — and shouldn't be — the same across all four stages.** A system can let AI handle unstructured input analysis completely while keeping a person at the decision stage, or use a rule at the decision stage and a workflow system at execution. There's no single formula.

---

## What AI Does in Stages 1 and 2

Information acquisition and analysis are where AI creates the clearest value in enterprise workflows — because these are the stages where unstructured input needs to be processed before rules can apply.

Four specific things AI does in these two stages:

**Intent recognition.** A request written in natural language — an email, a chat message, a free-form field — has no predefined structure. AI reads it and determines what the request is asking for, what it needs, and which category of issue it belongs to. This is the prerequisite for the workflow to process it at all.

**Structured information extraction.** From unstructured documents — invoices, contracts, meeting notes, complaint emails — AI pulls out specific data fields (amounts, dates, product names, order codes) into a form the workflow can use and verify. AI doesn't "understand" the document in a meaningful sense — it extracts so that rules and people can work with the data.

**Controlled classification.** AI assigns input to a predefined category — request type, priority level, relevant department, event type. "Controlled" means: categories are defined by authorized people, not created by AI; results below a confidence threshold are routed to a person.

**Interpretation with evidence.** Once data is extracted and classified, AI synthesizes and interprets what it means — which past cases does this resemble? Are there risk flags according to existing rules? What information is still missing? Each interpretation must include traceable evidence — the source, the raw data it came from.

This is the boundary of AI in the processing chain: **AI's interpretation does not become authority.** AI prepares information so the next step — whether a rule or a person — can act with full context.

**What AI does not do here:** AI does not decide on actions, does not execute any action, and does not suggest actions in a way that lets the system run automatically on that suggestion. Every AI output is information with evidence — for issued rules or authorized people to act on.

---

## The Four-Layer Boundary Table

To be precise about who handles what in a workflow with AI:

| Layer | Responsible for |
|---|---|
| **Workflow / rule** | What must happen, what is permitted, calculations, checks, state changes, execution under approved authority |
| **KVM / evidence** | Retrieving, resolving, and tracing organizational knowledge — precedents, standard documents, decision history |
| **AI** | Intent recognition, extraction, controlled classification, interpretation of results and evidence for human review |
| **People** | Judging exceptions, approving high-risk actions, issuing and revising rules, confirming evidence before high-consequence actions |

Three principles that accompany this table:

- **AI interpretation does not become authority.** AI may interpret organizational information, but that interpretation does not replace the authority of a rule or a person.
- **Precedent is evidence, not authority.** AI can surface similar past cases as part of the evidence package — but precedent is reference information; whether to follow it is a human decision.
- **Agentic capability is optional, not a maturity milestone.** A workflow with AI in stages 1-2 is already a mature workflow — no agent is needed to be "more advanced."

→ *Related: [Workflow Automation and AI Support — Two Different Roles](/en/insights/workflow/automation-and-ai-in-workflow)*

---

## Stages 3 and 4: Decision and Execution Don't Belong to AI

A common design mistake when adding AI to workflows is letting AI "suggest an action" and then having the system automatically follow that suggestion. This silently transfers decision authority to AI without any explicit control mechanism.

**Stage 3 — decision and action selection:** belongs to two parties:
- **Approved rules**, when the conditions fall into an already-encoded group (repetitive, clear criteria, acceptable consequence of error — as determined by authorized review).
- **People**, when the situation falls outside existing rules, the consequence is high, or the criteria aren't stable enough to encode yet.

AI's role at this stage is one thing: **preparing the evidence file** — traceable facts, similar past cases, risk flags based on rules — so the decision-maker has real grounds to consider rather than just reflex-clicking "approve." AI doesn't choose; AI prepares so the authorized person can choose.

**Stage 4 — action implementation:** belongs to the workflow system, with technical permissions granted according to explicitly defined authority — not AI acting independently. The separation between AI (interprets) and system (executes) is one of the most important control principles when designing workflows with AI.

→ *Related: [Segregation of Duties When Using AI in Workflows](/en/insights/workflow/segregation-of-duties-ai-workflow)*

---

## The Boundary: Rules, AI, and People

| Stage | Workflow rule | AI supports input | People |
|---|---|---|---|
| Information acquisition | Capture according to defined fields and rules | Extract, interpret from emails, forms, document images | Not needed, unless data is ambiguous |
| Information analysis | Apply written criteria and thresholds | Classify; synthesize evidence from similar past cases | Confirm if high risk |
| Decision selection | Only when criteria are clear and consequence of error is low (default path) | Suggest with evidence, does not decide | Judgment call; confirmation required if consequence of error is high |
| Action implementation | Execute actions that the rule has authorized | Does not execute | Execute or approve hard-to-reverse actions |

This table isn't about how much AI can do — it's about where AI stops. In stages 1 and 2, AI supports input for rules and people. In stages 3 and 4, decision and execution belong to issued rules or authorized people — not AI.

---

## Two Factors That Determine the Level of Control Needed

There's no universal answer for every workflow — but two factors help determine: can this step be handled automatically by a rule, or does it require human confirmation before execution?

**How reversible the action is.** This factor doesn't determine how much AI participates — it determines whether a workflow rule has sufficient grounds to run automatically, or whether human confirmation is required. Easily reversible actions (creating a draft, sending a reminder, applying an internal label) can be handled and routed automatically by a rule without additional confirmation. Hard-to-reverse or irreversible actions (confirming a contract, denying a customer request, updating a financial record) need a person at the confirmation step before execution — even if the analysis stage upstream already had AI support.

**How clear the input data is.** With structured, low-ambiguity data (a number crossing a defined threshold, a status change), AI classification and extraction results are more reliable — a rule can act on that result without additional confirmation. With unstructured, ambiguous, or context-dependent data (an emotionally worded complaint, a non-standard incident description), keep the scope of AI input support narrower at the analysis stage — and make sure evidence accompanies AI output so a person can verify it.

![Two factors for choosing the level of control: reversibility of the action and clarity of input data; easily reversible actions and clear data tolerate a lower level of control at the analysis stage.](~/assets/images/insights/where-ai-fits-in-workflow/wfi-03-two-criteria-en-dark.svg)

These two factors don't produce a specific number — they're questions to answer before deciding how far AI should go at each stage.

---

## Automation Complacency — The Risk Rarely Discussed

![Choosing the control level should not rest only on whether AI can do it, but also on long-term effects such as automation complacency and skill decline in decision-making.](~/assets/images/insights/where-ai-fits-in-workflow/wfi-05-beyond-can-ai-do-it-en-dark.svg)

Parasuraman and colleagues also identified a consequence rarely mentioned when automation levels are increased: **automation complacency** — the tendency for people to reduce their monitoring effort when a system performs well over time, causing them to miss anomalies or fail to catch AI errors before they cause harm.

Two design principles follow from this:

**Evidence is mandatory at every AI output.** When AI classifies, extracts, or interprets — the output must include the original data source and the basis for the classification, not just the result. The reviewer must have enough information to disagree, not just approve or reject without knowing why.

**Keep people practicing judgment.** If AI handles the entire analysis stage and people only click "approve" without actually reviewing, decision-making skill within the team decays — and when the system encounters an out-of-distribution case, no one has the skills left to handle it correctly. This is the hidden cost of over-automation that almost never appears in AI adoption discussions.

→ *Related: [AI Prepares the Evidence; People Decide](/en/insights/workflow/ai-decision-support-evidence)*

---

## A Practical Framework for AI-Workflow Integration

![Four steps: break the workflow into four stages, assess the level of control needed, deploy one stage at a time, and review periodically.](~/assets/images/insights/where-ai-fits-in-workflow/wfi-04-four-step-framework-en-dark.svg)

**Step 1 — Break the workflow into the four stages.** For a specific process, clearly identify what counts as acquisition, analysis, decision, and execution — instead of treating the whole process as one block.

**Step 2 — Assess the level of control needed for each stage.** For stages 1-2: is the input structured or unstructured? Can AI extract and classify accurately enough? For stages 3-4: does this decision belong to a rule or a person? Is the action reversible?

**Step 3 — Roll out one stage at a time, not the whole process at once.** *Illustrative scenario:* start by letting AI handle intent recognition and classification of incoming requests, keeping people in charge of the decision stage for the first few months to verify classification accuracy, before considering expansion into evidence preparation. Expanding AI means expanding the scope of input support — not expanding into autonomous decisions.

**Step 4 — Set up a periodic review mechanism.** The scope of what rules handle and the scope of AI input support can expand over time as data accumulates and model reliability gets validated in practice. There should be a regular checkpoint — not a one-time setting that never gets revisited.

---

## Conclusion

The real question isn't "can AI do this step" — it's "which stage does this step belong to, and what level of control fits the nature of that stage?"

Stages 1 and 2 (acquisition and analysis) are where AI adds the clearest value: intent recognition, extraction, controlled classification, interpretation with evidence. Stage 3 (decision) belongs to approved rules or people — AI prepares evidence, doesn't choose. Stage 4 (execution) belongs to the workflow system with explicitly defined authority.

Knowing which part is AI's, which is the rule's, and which is the person's — that is the core capability of an organization running AI-supported workflows responsibly.

---

*This article is part of a series on workflow design, AI adoption, and operational management for manufacturing SMEs.*

**Related articles:**
- [Programmed vs. Nonprogrammed Decisions: Rules, Judgment, and Where Each Belongs](/en/insights/workflow/programmed-vs-nonprogrammed-decisions)
- [Workflow Automation and AI Support — Two Different Roles](/en/insights/workflow/automation-and-ai-in-workflow)
- [Intelligent Workflow Routing: Classify, Route Without Manual Intervention](/en/insights/workflow/intelligent-workflow-routing)
- [AI Prepares the Evidence; People Decide](/en/insights/workflow/ai-decision-support-evidence)
- [Segregation of Duties When Using AI in Workflows](/en/insights/workflow/segregation-of-duties-ai-workflow)

**→ [Complete the AI Readiness Assessment](/en/readiness/ai)**
