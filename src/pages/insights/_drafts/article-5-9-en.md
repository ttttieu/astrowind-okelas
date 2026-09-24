---
title: "From Request/Approval to Event/Action: Rethinking How Work Flows"
slug: "request-approval-to-event-action-workflow"
language: "en"
translationKey: "article-5-9-request-approval-to-event-action"
type: "analysis"
cluster: "workflow"
parentPillar: "pillar-5-next-gen-workflow"
funnelStage: ["understanding"]
audience: ["COO", "CIO", "Operations Director"]
date: 2026-09-23
draft: true
seo:
  title: "From Request → Approval to Event → Action: A New Model for How Work Flows"
  description: "Traditional workflow requires someone to submit a request and wait for approval. The new model starts from an event and moves directly to action — fewer waiting points, faster outcomes."
  primaryKeyword: "event action workflow model"
  secondaryKeywords:
    - "from request approval to event action"
    - "new workflow model"
    - "event-driven operations"
    - "workflow paradigm shift"
  searchIntent: "Understanding — operations leaders evaluating a shift from traditional request/approval patterns"
cta:
  primary: "Workflow Readiness Assessment"
relatedInternalLinks:
  - "intelligent-workflow-next-generation" # Pillar 5, parent
  - "event-driven-workflow" # article 5.8, previous
  - "ai-in-workflow" # article 5.10 (proposed), next
  - "workflow-readiness-assessment"
evidenceSources:
  - "Lean Six Sigma — Process Cycle Efficiency (PCE) / Manufacturing Cycle Effectiveness (MCE)"
---

## Executive Summary

- The most common workflow model today is **Request → Approval**: someone submits a request, waits through a chain of sign-offs, and only then does the action happen. This model inserts "waiting for approval" into the middle of every process, including cases that don't actually require human judgment.
- In Lean Six Sigma, a widely used metric — Process Cycle Efficiency (PCE) — typically reveals a surprising number: most ordinary processes achieve a PCE of only 5-10%. In other words, 90-95% of a process's total time isn't spent actually doing work — it's spent waiting: waiting in line, waiting for someone to be free, waiting in an approval queue. A process is considered "lean" once that ratio exceeds 25%. Approval is one of the most common forms of queue in office and operational processes.
- The **Event → Action** model doesn't eliminate approval — it repositions it: keeping the approval step only for cases that genuinely require judgment, while letting action proceed directly once an event meets defined conditions, with evidence fully recorded for later verification.
- This isn't about removing control — it's about separating **substantive control** (requiring human judgment) from **procedural control** (a signature required only out of habit).

---

## Opening

The previous article covered event-driven workflow — a system's ability to detect an event and start a process on its own, instead of waiting for someone to create a request. This article goes one step further: if the system can already detect the event, why keep the same approval chain afterward for every single case?

That's the core difference between the two models. The old model: **Request → Approval → Action** — always with a waiting point for approval in the middle. The new model: **Event → Action**, with approval appearing only when genuinely needed, not as a default step.

---

## Why Request/Approval Creates Latency

**Claim:** The request/approval model inserts a waiting point into the middle of every process, regardless of whether that particular case actually requires human judgment.

In Lean Six Sigma, the concept of Process Cycle Efficiency (PCE) — the ratio of value-adding time to a process's total completion time — often produces a number that surprises many managers: most ordinary processes achieve a PCE of only 5-10%. In other words, 90-95% of a process's time isn't spent actually processing the work — it's spent waiting: waiting for a turn, waiting for someone to be available, waiting in an approval queue. A process is considered "lean" once this ratio exceeds 25%.

Approval is one of the most common forms of queue in office and operational processes, for three reasons:

1. **Approval is designed as a default step, not a conditional one.** Many processes require sign-off for every case, including repetitive, low-value cases with a clear precedent — not because judgment is needed, but because "the process always has that step."
2. **Approval depends on the approver's calendar**, not on the urgency of the request. An important request can wait exactly as long as an unimportant one if both sit in the same person's queue.
3. **Approval often doesn't distinguish risk level.** A request for a small amount and a request for a large one can travel through the exact same approval chain, even though the judgment required is very different.

**Implication:** The problem isn't that approval is "bad" — approval is genuinely necessary for decisions that carry risk or require judgment. The problem is that when approval is applied as a default step for every case, it turns into an undifferentiated queue, extending processing time without adding proportional control value.

---

## How Event → Action Works Differently

The Event → Action model doesn't remove approval — it **repositions** it based on the risk and exception level of each specific case, instead of applying it uniformly.

The basic structure:

1. **An event occurs** (a condition is met, a threshold is crossed, a status changes).
2. **The system evaluates the event against pre-defined rules and thresholds** — risk level, value, how closely it matches established precedent.
3. **The outcome branches accordingly:**
   - If the event falls within a safe threshold and matches a clear precedent → **action proceeds directly**, with no wait for approval, but still fully recorded with evidence for later verification.
   - If the event exceeds the threshold, doesn't match precedent, or carries high risk → **it routes to the person with the authority to judge it**, with full context attached so they can decide faster.

The most important difference from the old model: **approval is no longer a fixed step in the chain — it's a conditional branch.** Most cases (typically repetitive, low-value, low-risk ones) go straight to action. Only the minority that genuinely require judgment go through approval.

---

## Real-World Examples

**Recurring purchasing.** A repeat order for raw materials, from the usual supplier, within a pre-approved limit, can be processed and sent the moment the "inventory below threshold" event fires — without a person re-approving it from scratch every time. By contrast, an order involving a new supplier, or exceeding the usual limit, still routes to someone with the authority to decide.

**Customer refunds and returns.** A return request within published policy, low value, with no unusual history from that customer, can be processed the moment it's logged. A high-value request, or one showing an unusual pattern (the same customer returning items repeatedly in a short period), gets routed for human review.

**Adjusting production schedules for a material shortage.** When the system detects that a material will run short ahead of a specific order, and a pre-approved substitute plan already exists for that exact situation, the system can adjust the schedule and notify people automatically — instead of waiting for a meeting to decide.

Across all three examples, the shared principle is: **the rules and thresholds are decided once, in advance, by someone with the authority to set them** — and the system then applies that rule to each specific case, escalating to a person only when a case falls outside what's already been decided.

---

## What It Takes to Make the Shift

Moving from Request/Approval to Event/Action isn't a switch you flip — it requires three conditions:

**1. Enough history to define what counts as a "clear precedent."** Deciding which cases can go straight to action needs to be based on a large enough body of historical data to set a safe threshold with actual grounding — not a guess.

**2. Decision-makers willing to decide in advance, rather than case by case.** This is usually the biggest organizational obstacle: many managers feel safer approving each case individually than setting a general rule to apply — even though, logically, that rule is simply the sum of many similar decisions they've already made before.

**3. A mechanism for post-hoc review, not just pre-approval control.** Once action is allowed to proceed directly for in-threshold cases, the organization needs a periodic mechanism to review cases that were handled automatically — to catch early if a threshold is set wrong, or if an unusual pattern is being missed.

A cautious rollout starts with decisions that are low-value, high-frequency, and have the clearest precedent — where the risk of shifting to Event → Action is lowest, and the speed benefit is most obvious.

---

## Conclusion

The difference between Request/Approval and Event/Action isn't about having control or not — both models have control. The difference is where that control is placed: applied uniformly to every case, or applied only where human judgment is genuinely needed. For most manufacturing SMEs, most of the "delay from waiting on approval" doesn't come from complex decisions — it comes from simple, repetitive decisions still traveling through the process designed for complex ones.

## Next Step

Pick one of your existing approval processes, and estimate what percentage of cases over the past three months genuinely had a clear precedent, low value, and nothing unusual about them. If that percentage is high, this is the process worth shifting toward the Event → Action model first. Or take the **Workflow Readiness Assessment** for a fuller evaluation.
