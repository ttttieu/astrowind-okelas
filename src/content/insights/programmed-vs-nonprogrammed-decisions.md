---
title: "Programmed vs. Nonprogrammed Decisions: Rules, Judgment, and Where Each Belongs"
description: "Not every decision should be a workflow rule, and not everything requires human judgment. Herbert Simon's 1960 framework is still the most practical tool for drawing this boundary."
publishDate: 2026-09-23T00:00:00Z
translationId: workflow-rule-human-decision
lang: en
category: workflow
contentType: Analysis
funnelStage:
  - Understanding
audience:
  - COO
  - CIO
  - Operations Director
primaryKeyword: "programmed vs nonprogrammed decisions"
secondaryKeywords:
  - "Herbert Simon decision types"
  - "when to automate a decision"
  - "rule-based workflow"
  - "human judgment in workflow"
  - "business rules management"
assessmentHref: /en/readiness/workflow
coverImage: '~/assets/images/insights/programmed-vs-nonprogrammed-decisions/wfd-00-og-cover-en.png'
ogImage: '~/assets/images/insights/programmed-vs-nonprogrammed-decisions/wfd-00-og-cover-en.png'
coverImageAlt: "A continuum from repetitive decisions (encode as rules) to novel decisions (human judgment); AI supports input preparation at both ends."
ctaPrimaryText: 'Workflow Readiness Assessment'
ctaSubtitle: "How's your work flowing?"
draft: false
---

---

> **Executive Summary**
>
> - When designing a workflow that involves AI, the most practical question isn't "which AI to use" — it's: **should this step be a hard rule, or does it require human judgment?**
> - Herbert Simon — economist and Nobel laureate (1978) — drew a clear distinction in 1960: **programmed decisions** (repetitive, clearly structured, handled by procedures) and **nonprogrammed decisions** (novel, complex, requiring judgment). The distinction still holds.
> - What sits at the "needs judgment" end belongs to people. Systems can prepare input — interpreting unstructured data, assembling evidence — but the authority to judge stays with humans, not AI.
> - When enough precedent accumulates, human judgment can become a **proposed rule** → human review and approval → then a rule. The scope of judgment narrows over time because more rules get issued — not because more authority is delegated to AI.

---

When a team starts designing a workflow that involves AI, one question comes up quickly: should this step be a rule in the system, or should someone make a judgment call each time? It sounds like a technology question, but it's actually a governance question that was studied long before modern AI existed.

In 1960, Herbert Simon — who later received the Nobel Prize in Economics in 1978 — published "The New Science of Management Decision," in which he drew a distinction that still holds up today: the difference between programmed and nonprogrammed decisions.

→ *Related: [From Request/Approval to Event/Action: Rethinking How Work Flows](/en/insights/workflow/request-approval-to-event-action-workflow)*

---

## Two Types of Decisions, One Continuum

In "The New Science of Management Decision" (1960), Simon distinguishes:

**Programmed decisions:** repetitive, clearly structured, handled through established procedures or automated systems. When criteria are stable and can be written down, these decisions are good candidates for workflow rules — there's no need to involve a person's judgment each time, and doing so just adds latency.

**Nonprogrammed decisions:** novel, complex, requiring judgment and weighing multiple factors at once. The variations can't all be enumerated in advance. These belong to people. A system can prepare the inputs — interpreting unstructured documents, assembling evidence from similar past cases — but the authority to decide stays with a person, not an AI.

Simon also emphasized: programmed and nonprogrammed are **two ends of a continuum**, not two fully separate boxes. Most real business decisions sit somewhere in between — and **the position isn't fixed**. It can shift toward the programmable end as experience accumulates.

What AI adds to this picture isn't a third layer of judgment sitting between rules and people. AI enters in two supporting roles: interpreting unstructured inputs so rules can run, and assembling evidence so people can decide faster and with better grounding.

---

## Four Criteria for Placing a Decision

![Simon's programmed–nonprogrammed continuum with four identification criteria below: frequency, stability of criteria, enumerability of variants, and consequence of error.](~/assets/images/insights/programmed-vs-nonprogrammed-decisions/wfd-01-simon-continuum-en-dark.svg)

To determine where a specific decision sits on the continuum — and what mechanism fits best — four practical questions:

**1. Frequency.** Does this type of situation arise daily, weekly, or only a few times a year? Higher frequency increases the payoff of writing a rule. A rule used hundreds of times is worth the investment; a rule used twice a year may not be.

**2. Stability of criteria.** Do the decision criteria shift with seasons, policy changes, or market conditions? Stable criteria make rules durable. Frequently-changing criteria mean rules need constant maintenance — and an unmaintained rule is often worse than no rule at all.

**3. How enumerable the variations are.** Can you write down most of the cases that could realistically arise, or do new variants keep appearing? If you can't enumerate, a hard rule will keep missing edge cases — and the cases it misses tend to be the ones that matter.

**4. The consequence of getting it wrong.** If a rule is applied incorrectly to an exception, how serious is the result? High consequence means keeping a person at the confirmation step, or at minimum at an exception approval step.

These four criteria don't produce a binary answer. They help locate a decision on the continuum and choose the right mechanism.

---

## Decision Type Table: Who Handles What

![Decision type table mapping four categories of decisions to three columns: workflow rule, AI supports input, human decides.](~/assets/images/insights/programmed-vs-nonprogrammed-decisions/wfd-02-decision-table-en-dark.svg)

| Decision characteristics | Workflow rule | AI supports input | Human decides |
|---|:---:|:---:|:---:|
| Repetitive, clear criteria, structured data | Yes | Not needed | Not needed |
| Repetitive, but unstructured input (text, email) | Yes — after AI interprets | Interprets input | Confirms if high risk |
| Infrequent, criteria not yet stable | Not yet — needs precedent | Assembles evidence | Judgment call |
| High consequence of error, regardless of frequency | Default path only | Prepares evidence file | Required confirmation |

The key point: AI doesn't appear in the "decides" column. AI appears in the "supports input" column. Authority stays with people; AI interprets and prepares so people can decide faster and with better information.

*Related: [AI in Workflow: Mapping Where It Fits and What It Should Do](/en/insights/workflow/where-ai-fits-in-workflow)*

---

## When Precedent Accumulates: From Judgment to Rule

![A five-step flow from recording exceptions to a new rule in the workflow: record → identify pattern → propose rule → human review → new rule.](~/assets/images/insights/programmed-vs-nonprogrammed-decisions/wfd-03-precedent-to-rule-en-dark.svg)

One of Simon's points that's easy to miss when applying this framework to system design: **the position on the continuum isn't fixed**. When enough precedent builds — when a type of decision has been handled by people many times with consistent outcomes and the pattern is clear — it can gradually become programmable.

The right mechanism for this transition:

**Step 1 — Record exceptions.** Each time a person handles a case that falls outside existing rules, the system records the situation and the decision as evidence — not to train AI to decide independently, but to accumulate verifiable precedent.

**Step 2 — Identify the pattern.** When the same type of situation appears enough times with consistent handling, the data is sufficient to suggest: "this could become a rule." The suggestion could come from AI pattern recognition or from an operations team member reviewing the log.

**Step 3 — A person reviews and approves.** A proposed rule doesn't become a rule automatically. The rule owner reviews the proposal, adjusts if needed, and issues it formally with clear conditions.

**Step 4 — The new rule enters the workflow.** Future cases of that type are handled by the rule, without escalation. The scope requiring human judgment shrinks.

This is why the scope of human judgment narrows over time — **not because more authority is delegated to AI**, but because more rules get issued based on real experience, confirmed by people with authority.

→ *Related: [Exception Handling in Business Workflows](/en/insights/workflow/exception-handling-in-workflow)*

---

## Rule Lifecycle Management

Rules don't manage themselves. A mature workflow operation needs active rule lifecycle management:

**Rule owner:** every rule needs someone responsible for periodic review. Not necessarily IT — usually the operations person who understands the context and knows when conditions are shifting.

**Rule change process:** when the environment changes (new policy, new product, new customer requirement), rules need to be updated through a formal process — not edited directly in the system without a record. Untraced changes make it impossible to understand why a rule behaves the way it does.

**Audit trail:** each time a rule is applied, it should leave a trace. This enables post-hoc verification and early detection of when a rule is starting to misfire.

**Signals that a rule needs review:** an unusual spike in exceptions suggests the rule isn't covering enough cases; complaints after rule execution suggest the rule is running in the wrong direction.

Organizations that don't manage rule lifecycle find that old rules accumulate and become a source of exceptions — the environment has changed but the rules haven't.

---

## Decision Inventory Checklist

Before designing or redesigning a workflow, a decision inventory is the step most commonly skipped — and the one that creates the most value.

**For each step in the process, answer:**

- [ ] What type of decision does this step require? (approval, classification, routing, calculation, confirmation, escalation?)
- [ ] Have the criteria for this decision been written down, or do they live in one person's head?
- [ ] What percentage of real cases are handled using the same logic?
- [ ] When the logic can't be applied, where does that decision go? (proper escalation? bypassed? handled off-system via chat or email?)
- [ ] If the person responsible is away for a week, how does this step get handled?

The output of the inventory isn't a list of things to delegate to AI. It's:
- Decisions that can be encoded as rules now (sufficient frequency, stable criteria, low consequence of error);
- Decisions that need more precedent before a rule can be written;
- Decisions that must stay with people because the consequence of error is too high or criteria are too volatile.

→ *Related: [Segregation of Duties When Using AI in Workflows](/en/insights/workflow/separation-of-duties-ai-in-workflow)*

---

## Conclusion

The real question isn't "should we use AI here" — it's "where does this decision sit on the continuum, and what mechanism fits that position best?"

Simon's 1960 framework is still the right tool for answering it. What AI adds isn't a new layer of judgment — it's the ability to prepare better inputs: interpreting unstructured data so rules can run, and assembling evidence so people can judge faster and with better grounding.

A more mature organization isn't one that delegates more to AI — it's one that knows which decisions are ready to encode as rules, which require people, and has a working mechanism for systematically converting human judgment into rules as experience and confidence accumulate.

---

*This article is part of a series on workflow design, AI adoption, and operational management for manufacturing SMEs.*

**Related articles:**
- [From Request/Approval to Event/Action: Rethinking How Work Flows](/en/insights/workflow/request-approval-to-event-action-workflow)
- [Exception Handling in Business Workflows](/en/insights/workflow/exception-handling-in-workflow)
- [AI in Workflow: Mapping Where It Fits and What It Should Do](/en/insights/workflow/where-ai-fits-in-workflow)
- [Segregation of Duties When Using AI in Workflows](/en/insights/workflow/separation-of-duties-ai-in-workflow)

**→ [Complete the Digitalization Readiness Assessment](/en/readiness/digitalization)**
