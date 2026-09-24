---
title: "AI in Workflow: Mapping Where It Fits and What It Should Do"
slug: "where-ai-fits-in-workflow"
language: "en"
translationKey: "article-5-10-where-ai-fits-workflow"
type: "analysis"
cluster: "workflow"
parentPillar: "pillar-5-next-gen-workflow"
funnelStage: ["understanding"]
audience: ["COO", "CIO", "Operations Director"]
date: 2026-09-23
draft: true
seo:
  title: "Where Can AI Participate in Workflow — and What Can It Actually Do?"
  description: "AI doesn't fit into every workflow step the same way. This article maps the specific points where AI can add value — and where human control should stay in place."
  primaryKeyword: "AI integration into workflow"
  secondaryKeywords:
    - "where AI fits in workflow"
    - "AI workflow touchpoints"
    - "AI in business process"
    - "workflow AI participation"
  searchIntent: "Understanding — operations and IT leaders trying to identify where AI can practically improve their workflows"
cta:
  primary: "Workflow Readiness Assessment"
relatedInternalLinks:
  - "intelligent-workflow-next-generation" # Pillar 5, parent
  - "request-approval-to-event-action-workflow" # article 5.9, previous
  - "self-classifying-workflow" # article 5.11 (proposed), next
  - "ai-agents-in-business" # article 2.6, cross-cluster
  - "ai-agents-and-workflow" # article 6.13 (proposed), cross-cluster
  - "workflow-readiness-assessment"
evidenceSources:
  - "Parasuraman, Sheridan & Wickens, \"A Model for Types and Levels of Human Interaction with Automation,\" IEEE Transactions on Systems, Man, and Cybernetics, 2000"
  - "Sheridan & Verplank, human-machine automation interaction scale, 1978"
---

## Executive Summary

- The question "should we add AI to this workflow" usually gets answered too early, with a specific product. A better question is: **which stage of an information-processing chain should AI participate in, and at what level of automation?**
- A widely cited framework from human-machine systems engineering — the model developed by Parasuraman, Sheridan and Wickens (2000) — breaks a processing chain into four stages: **information acquisition, information analysis, decision and action selection, and action implementation** — and shows that the appropriate level of automation can differ across stages, rather than being uniform.
- Four concrete forms of AI participation in workflow — classify, route, recommend, and execute — map onto these four stages, each carrying a different level of risk and requiring a different degree of control.
- General principle: the level of automation should scale with how reversible an action is and how certain the input data is — the same level of automation shouldn't be applied uniformly to every step.

---

## Opening

Many "AI in workflow" conversations at the COO/CIO level start and end with a fairly vague question: "should we add AI to process X?" That question is hard to answer because it lumps many very different kinds of decisions into a single concept.

A real workflow isn't a single block — it's made up of several smaller stages: gathering data, understanding what that data means, deciding what to do, and finally carrying out that action. AI can participate in each stage in very different ways, carrying very different levels of risk. This article uses an academically grounded framework to make that distinction concrete.

---

## Mapping AI Participation Points

**Claim:** Any processing chain — whether in a business workflow or a technical system — can be broken into similar information-processing stages, and each stage can be automated to a different degree.

The model developed by Parasuraman, Sheridan and Wickens (2000), published in IEEE Transactions on Systems, Man, and Cybernetics, is one of the most widely cited frameworks in human-machine interaction and automation research. It divides a processing chain into four stages:

1. **Information acquisition** — sensing and capturing input data from various sources.
2. **Information analysis** — synthesizing and interpreting the collected data to understand what it means.
3. **Decision and action selection** — weighing options and choosing the appropriate action.
4. **Action implementation** — carrying out the chosen action.

The most important insight from this model: the level of automation doesn't need to, and shouldn't, be the same across all four stages. A system can fully automate data acquisition while only partially supporting the decision stage, and leave execution entirely to a person — or the reverse — depending on the nature of the work.

Applied to enterprise workflow, these four stages map onto: the system captures a request or event → the system understands/classifies that request → the system or a person decides on an action → the action gets carried out.

---

## Classification: Classify, Route, Recommend, Execute

From these four stages, four concrete forms of AI participation in enterprise workflow can be identified:

**1. Classify.** AI reads input data — an email, a form, a scanned document — and assigns it to a pre-defined category (request type, priority level, relevant department). This corresponds to the information analysis stage. Low risk, since AI isn't deciding on an action, only interpreting data.

**2. Route.** Based on the classification result, AI determines where this request should go — which person, department, or sub-process. This is the transition point between analysis and decision. Low-to-medium risk, since a mistake here typically only causes a delay (misrouted, needs re-sending), not a direct consequence.

**3. Recommend.** AI proposes a specific action based on data and precedent, but a person still makes the final call. This corresponds to the decision-selection stage, at a low level of automation — on Sheridan and Verplank's 1978 scale, this is roughly equivalent to the computer suggesting a few options for the human to choose from. Medium risk, depending on whether the recommendation is explained clearly enough for a person to verify it.

**4. Execute.** AI directly carries out the action — sending a notification, creating an order, updating a record — without requiring a person's confirmation on a case-by-case basis. This corresponds to a high level of automation at the implementation stage. This is the highest-risk of the four, since the consequence occurs the moment AI acts, before a person has a chance to intervene.

These four forms aren't mutually exclusive — a specific workflow might use AI to classify and route most cases, while only recommending (not executing) at the final decision point, depending on how risky that process is.

---

## Where Human Control Should Stay

There's no universal answer for every workflow — but two criteria help determine the appropriate level of automation at each stage:

**How reversible the action is.** An easily reversible action (sending a reminder, drafting a message that hasn't been sent) can tolerate a higher level of automation. A hard-to-reverse or irreversible action (transferring money, confirming a contract, denying a customer's request) should stay at "recommend" or lower, so a person confirms it before it's carried out.

**How certain the input data is.** With clearly structured, low-ambiguity data (a number crossing a defined threshold), AI can operate with more confidence at the analysis and decision stages. With unstructured, ambiguous data, or data that requires contextual interpretation (an emotionally worded complaint email), automation should stay lower at the analysis stage, and human judgment should stay firmly in place at the decision stage.

An important caveat from Parasuraman and colleagues' own model: automation doesn't just replace people — it **changes the nature of human work**, and can produce unintended consequences such as automation complacency or skill decay when people no longer regularly practice making the decision themselves. This is why choosing the right level of automation shouldn't be based purely on technical capability (can AI do this) — it also needs to weigh the long-term effect on the team's decision-making ability.

---

## A Framework for AI-Workflow Integration

Combining the above into a practical sequence:

**Step 1 — Break the workflow into the four stages.** For a specific process, clearly identify what counts as acquisition, analysis, decision, and action — instead of treating the whole process as one block.

**Step 2 — Assess reversibility and data certainty for each stage.** A stage with easily reversible actions and clear data can consider a higher level of automation (route, even execute). A stage involving hard-to-reverse actions or ambiguous data should stop at classify or recommend.

**Step 3 — Roll out one stage at a time, not the whole process at once.** For example, start by letting AI classify and route requests, keeping people in charge of the decision stage for the first few months to verify classification accuracy, before considering an expansion into recommend.

**Step 4 — Set up a periodic review mechanism.** Since the appropriate level of automation can shift over time (as more data accumulates and model reliability gets verified), there should be a regular checkpoint to adjust automation levels at each stage, rather than fixing them once and leaving them unchanged.

---

## Conclusion

"AI in workflow" isn't a binary decision (yes or no) — it's a set of smaller decisions about which stage AI should participate in, and at what level. Using the four-stage framework (acquisition, analysis, decision, action) alongside the two evaluation criteria (reversibility and data certainty) turns the vague question "should we use AI" into a concrete, staged, and verifiable sequence of decisions.

## Next Step

Pick a specific process, break it into the four stages above, and for each one, ask: is the action here easily reversible, and is the data clear enough? The answer will tell you which stage is ready for AI, and at what level. Or take the **Workflow Readiness Assessment** for a fuller evaluation.
