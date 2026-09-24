---
title: "Workflow Rules vs. AI Reasoning: A Practical Division of Responsibility"
slug: "workflow-rules-vs-ai-reasoning"
language: "en"
translationKey: "article-5-15-rules-vs-reasoning"
type: "analysis"
cluster: "workflow"
parentPillar: "pillar-5-next-gen-workflow"
funnelStage: ["understanding"]
audience: ["CIO", "COO", "Operations Director"]
date: 2026-09-23
draft: true
seo:
  title: "Workflow Sets the Rules. AI Handles the Reasoning. Here's How to Divide Them."
  description: "Not everything should be a workflow rule. And not everything should be left to AI judgment. Here's a practical framework for deciding what goes where."
  primaryKeyword: "workflow rules vs AI reasoning"
  secondaryKeywords:
    - "what to encode in workflow"
    - "AI reasoning in workflow"
    - "workflow AI design"
    - "rules vs intelligence"
  searchIntent: "Understanding — system architects and operations leaders deciding what belongs in workflow rules vs AI"
cta:
  primary: "Workflow Readiness Assessment"
relatedInternalLinks:
  - "intelligent-workflow-next-generation" # Pillar 5, parent
  - "ai-agent-decision-workflow-execution" # article 5.14, previous
  - "agentic-workflow" # article 5.16 (proposed), next
  - "least-privilege-for-ai" # article 6.12 (proposed), cross-cluster
  - "workflow-readiness-assessment"
evidenceSources:
  - "Herbert A. Simon, \"The New Science of Management Decision,\" 1960 — programmed vs. nonprogrammed decisions"
---

## Executive Summary

- A specific question the earlier articles in this series haven't directly answered: when designing a process, **how do you know what should be a hard rule in the workflow, and what should be left to AI reasoning?**
- The answer isn't new, and it wasn't invented in the AI era. Herbert Simon — the economist who won the Nobel Prize in 1978 — drew this distinction back in 1960, in "The New Science of Management Decision": **programmed decisions** are repetitive, clearly structured, and can be handled by established procedures or automated systems; **nonprogrammed decisions** are novel, complex, and require judgment, creativity, and deeper analysis.
- Simon also emphasized: this is a **continuum**, not two fully separate categories. Most real-world decisions sit somewhere between the two ends.
- Applied to workflow + AI design: whatever falls near the "programmed" end should be encoded as a workflow rule; whatever falls near the "nonprogrammed" end should be handed to reasoning (AI or human).
- An important point that's often missed: where a type of decision sits on the continuum **isn't fixed** — it can shift toward "programmed" over time, once enough precedent accumulates to turn what once required judgment into something that can be written as a rule.

---

## Opening

Here's a practical question many IT/operations teams run into when they start designing a workflow with AI involved: "should this be a rule in the system, or should we let AI use its own judgment?" It sounds like a technology question, but it's actually a governance question that was studied long before modern AI existed.

In 1960, Herbert Simon — who would later win the Nobel Prize in Economics in 1978 — published "The New Science of Management Decision," in which he drew a distinction that still holds up today: the difference between programmed and nonprogrammed decisions.

---

## What Belongs in Workflow Rules

**Claim:** Decisions that are highly repetitive, clearly structured, and have criteria that stay stable over time should be encoded as workflow rules — they don't need, and shouldn't be handed to, AI reasoning.

According to Simon, **programmed decisions** are repetitive and routine, handled through established procedures or automated systems. His examples include things like daily trading limits or compliance checks within financial institutions — cases where the decision criteria are already clear and stable.

Traits that identify a decision as a good candidate for a rule:

- **High frequency.** This type of situation occurs often enough that writing a general rule provides clear value over handling each case individually.
- **Stable criteria.** The conditions for the decision don't shift constantly — a threshold or a logical condition can be written down and applied consistently over a long stretch of time.
- **Low ambiguity.** Input data is clearly structured, and applying the rule doesn't require contextual interpretation.

**Implication:** Trying to use AI reasoning for this type of decision doesn't add proportional value — it just adds latency, cost, and makes things harder to verify compared to a simple, transparent rule. This echoes a point made earlier in this series: traditional automation remains the right choice for most repetitive, clearly-ruled work.

---

## What Requires Reasoning

**Claim:** Novel, complex decisions, or ones whose criteria haven't been fully defined in advance, need a different mode of handling — Simon called this "problem solving," not rule application.

**Nonprogrammed decisions**, per Simon, are novel and complex, requiring judgment, creativity, and deep analysis — they can't be coded into a computer program the way a repetitive decision can. Traits that identify them:

- **A situation never encountered before, or rare enough that there isn't yet enough precedent to derive a general rule.**
- **Multiple factors need to be weighed at once**, where the relative importance of each factor can shift depending on the specific situation.
- **Input data is ambiguous or unstructured**, requiring interpretation before any criteria can even be applied.

This is exactly the kind of work where AI reasoning — or human judgment — fits far better than a hard rule. Trying to write a single rule that covers every variation of this type of decision usually produces one of two bad outcomes: either the rule becomes too complex to maintain, or it misses important cases because they couldn't all be enumerated in advance.

---

## The Practical Boundary

Simon made a point that's easy to overlook when applying this distinction: programmed and nonprogrammed aren't two fully separate categories — they're **two ends of a continuum**. Most real business decisions don't sit at either extreme; they sit somewhere in between.

Four practical criteria for placing a specific decision on that continuum:

1. **Frequency.** Does it happen daily, weekly, or only a few times a year?
2. **Stability of criteria.** Do the decision criteria shift with seasons, new policy, or market conditions?
3. **How enumerable the variations are.** Can you write down all (or nearly all) possible cases, or do new variants keep appearing?
4. **The consequence of getting it wrong.** If a hard rule gets applied incorrectly to an exception, how serious is the consequence?

One important point, rarely mentioned when applying Simon's framework to modern AI: **where a type of decision sits on the continuum isn't fixed — it can shift over time.** A situation that initially required reasoning (because it was new, with no precedent) can gradually become programmable once enough cases have been processed and recurring patterns become clear — exactly the mechanism covered in the article on intelligent routing: precedent-based suggestions, over time, can become the basis for a new rule.

---

## How to Design Workflow + AI Correctly

Combining the above into a practical design sequence:

**Step 1 — List the types of decisions within a specific process**, rather than treating the whole process as one uniform block.

**Step 2 — Evaluate each decision type against the four criteria above**, to determine whether it sits closer to the "programmed" or "nonprogrammed" end of the continuum.

**Step 3 — Encode the "programmed" end as a workflow rule.** This should be the default choice for most of the volume, because it's cheaper, faster, and easier to verify.

**Step 4 — Hand the "nonprogrammed" end to reasoning** — this could be AI with appropriate oversight (following the decision/execution model covered in the previous article), or a person, depending on risk level and data maturity.

**Step 5 — Set up a mechanism to track the shift.** Periodically review the decisions still sitting in "needs reasoning" territory — if enough precedent and clear patterns have accumulated, consider converting part of that into a new rule, gradually narrowing the scope that still requires reasoning.

Step 5 is the piece most likely to get skipped, but it's also where cumulative value gets built over time: an organization that does this well will see the scope requiring AI reasoning steadily shrink down to genuinely novel cases, while most of the workload gets handled by transparent, fast, cheap rules.

---

## Conclusion

The boundary between "should be a rule" and "needs reasoning" isn't a new technology question created by AI — it's a governance question studied more than six decades ago. What's changed in the AI era isn't the nature of the question, but the tools available for handling the "nonprogrammed" part — from only people, now with AI reasoning as an additional option. But the underlying principle stays the same: repetitive, clearly structured decisions should be rules; novel, complex decisions requiring judgment need reasoning.

## Next Step

Pick a specific process, list the types of decisions within it, and apply the four criteria above to each one. The result will give you a clear map: what should become a rule now, what should be handed to reasoning, and what to keep watching for a future conversion. Or take the **Workflow Readiness Assessment** for a fuller evaluation.
