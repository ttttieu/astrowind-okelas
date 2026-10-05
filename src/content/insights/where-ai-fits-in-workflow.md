---
title: "AI in Workflow: Mapping Where It Fits and What It Should Do"
description: "AI doesn't fit into every workflow step the same way. This article maps the specific points where AI can add value — and where human control should stay in place."
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
primaryKeyword: "AI integration into workflow"
secondaryKeywords:
  - "where AI fits in workflow"
  - "AI workflow touchpoints"
  - "AI in business process"
  - "workflow AI participation"
assessmentHref: /en/readiness/digitalization
coverImage: '~/assets/images/insights/where-ai-fits-in-workflow/wfi-00-og-cover-en.png'
ogImage: '~/assets/images/insights/where-ai-fits-in-workflow/wfi-00-og-cover-en.png'
coverImageAlt: "The four information-processing stages of a workflow, and four ways AI can participate: classify, route, recommend, execute."
draft: false
---

---

> **Executive Summary**
>
> - The question "should we add AI to this workflow" usually gets answered too early, with a specific product. A better question is: **which stage of an information-processing chain should AI participate in, and at what level of automation?**
> - A widely cited framework from human-machine systems engineering — the model developed by Parasuraman, Sheridan and Wickens (2000) — breaks a processing chain into four stages: **information acquisition, information analysis, decision and action selection, and action implementation** — and shows that the appropriate level of automation can differ across stages, rather than being uniform.
> - Four concrete forms of AI participation in workflow — classify, route, recommend, and execute — map onto these four stages, each carrying a different level of risk and requiring a different degree of control.
> - General principle: the level of automation should scale with how reversible an action is and how certain the input data is — the same level of automation shouldn't be applied uniformly to every step.

---

Many "AI in workflow" conversations at the COO/CIO level start and end with a fairly vague question: "should we add AI to process X?" That question is hard to answer because it lumps many very different kinds of decisions into a single concept.

A real workflow isn't a single block — it's made up of several smaller stages: gathering data, understanding what that data means, deciding what to do, and finally carrying out that action. AI can participate in each stage in very different ways, carrying very different levels of risk. This article uses an academically grounded framework to make that distinction concrete.

→ *Related: [From Request/Approval to Event/Action: Rethinking How Work Flows](/en/insights/workflow/request-approval-to-event-action-workflow)*

---

## Mapping AI Participation Points

![The four-stage information-processing model: acquisition, analysis, decision and action selection, and implementation, mapped to recording an event, classifying it, deciding, and acting; the automation level can differ at each stage.](~/assets/images/insights/where-ai-fits-in-workflow/wfi-01-four-stages-en-dark.svg)

Any processing chain — whether in a business workflow or a technical system — can be broken into similar information-processing stages, and each stage can be automated to a different degree.

The model developed by Parasuraman, Sheridan and Wickens (2000), published in IEEE Transactions on Systems, Man, and Cybernetics, is one of the most widely cited frameworks in human-machine interaction and automation research. It divides a processing chain into four stages:

1. **Information acquisition** — sensing and capturing input data from various sources.
2. **Information analysis** — synthesizing and interpreting the collected data to understand what it means.
3. **Decision and action selection** — weighing options and choosing the appropriate action.
4. **Action implementation** — carrying out the chosen action.

The most important insight from this model: the level of automation doesn't need to, and shouldn't, be the same across all four stages. A system can fully automate data acquisition while only partially supporting the decision stage, and leave execution entirely to a person — or the reverse — depending on the nature of the work.

Applied to enterprise workflow, these four stages map onto: the system captures a request or event → the system understands/classifies that request → the system or a person decides on an action → the action gets carried out.

---

## Classify, Route, Recommend, Execute

![Four ways AI participates in a workflow: classify, route, recommend and execute, with risk rising from low to highest.](~/assets/images/insights/where-ai-fits-in-workflow/wfi-02-four-ai-modes-en-dark.svg)

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

![Two criteria for choosing the automation level: reversibility of the action and certainty of the input data; easily reversible actions and clear data tolerate more automation.](~/assets/images/insights/where-ai-fits-in-workflow/wfi-03-two-criteria-en-dark.svg)

An important caveat from Parasuraman and colleagues' own model: automation doesn't just replace people — it **changes the nature of human work**, and can produce unintended consequences such as automation complacency or skill decay when people no longer regularly practice making the decision themselves. This is why choosing the right level of automation shouldn't be based purely on technical capability (can AI do this) — it also needs to weigh the long-term effect on the team's decision-making ability.

![Choosing the automation level should not rest only on whether AI can do it, but also on long-term effects such as automation complacency and skill decline in decision-making.](~/assets/images/insights/where-ai-fits-in-workflow/wfi-05-beyond-can-ai-do-it-en-dark.svg)

---

## A Framework for AI-Workflow Integration

![Four steps: break the workflow into four stages, assess reversibility and data certainty, implement one stage at a time, and review periodically.](~/assets/images/insights/where-ai-fits-in-workflow/wfi-04-four-step-framework-en-dark.svg)

Combining the above into a practical sequence:

**Step 1 — Break the workflow into the four stages.** For a specific process, clearly identify what counts as acquisition, analysis, decision, and action — instead of treating the whole process as one block.

**Step 2 — Assess reversibility and data certainty for each stage.** A stage with easily reversible actions and clear data can consider a higher level of automation (route, even execute). A stage involving hard-to-reverse actions or ambiguous data should stop at classify or recommend.

**Step 3 — Roll out one stage at a time, not the whole process at once.** For example, start by letting AI classify and route requests, keeping people in charge of the decision stage for the first few months to verify classification accuracy, before considering an expansion into recommend.

**Step 4 — Set up a periodic review mechanism.** Since the appropriate level of automation can shift over time (as more data accumulates and model reliability gets verified), there should be a regular checkpoint to adjust automation levels at each stage, rather than fixing them once and leaving them unchanged.

→ *Related: [Next-Generation Workflow: When AI and Organizational Knowledge Change How Work Operates](/en/insights/workflow/intelligent-workflow-next-generation)*

---

## Conclusion

"AI in workflow" isn't a binary decision (yes or no) — it's a set of smaller decisions about which stage AI should participate in, and at what level. Using the four-stage framework (acquisition, analysis, decision, action) alongside the two evaluation criteria (reversibility and data certainty) turns the vague question "should we use AI" into a concrete, staged, and verifiable sequence of decisions.

---

*This article is part of a series on workflow, AI adoption, and operational management for manufacturing SMEs.*

**Related articles:**
- [From Request/Approval to Event/Action: Rethinking How Work Flows](/en/insights/workflow/request-approval-to-event-action-workflow)
- [Workflow Automation vs. Intelligent Workflow: Why They're Not the Same](/en/insights/workflow/workflow-automation-vs-intelligent-workflow)
- [Next-Generation Workflow: When AI and Organizational Knowledge Change How Work Operates](/en/insights/workflow/intelligent-workflow-next-generation)

**→ [Complete the Digitalization Readiness Assessment](/en/readiness/digitalization)**
