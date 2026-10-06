---
title: "When a Workflow Knows the Organization's Context: Maintained Knowledge, Decisions Still Made by People"
description: "The same data can mean different things in different contexts. A workflow that 'knows context' does not mean the system loosens rules by itself, but that context the organization maintains reaches the right rule or the right person. This article covers what context is, three ways it enters a workflow, and what manufacturers should prepare first."
publishDate: 2026-10-06T00:00:00Z
translationId: article-5-16-context-aware-workflow
lang: en
category: workflow
contentType: Analysis
funnelStage:
  - Understanding
  - Consideration
audience:
  - COO
  - CIO
  - Operations Director
primaryKeyword: "context-aware workflow organizational knowledge"
secondaryKeywords:
  - "organizational context workflow"
  - "workflow knowledge management"
  - "context rules workflow"
  - "Ba knowledge workflow"
  - "workflow decision context"
assessmentHref: /en/readiness/digitalization
coverImage: '~/assets/images/insights/context-aware-workflow-organizational-knowledge/wfb-00-og-cover-en.png'
ogImage: '~/assets/images/insights/context-aware-workflow-organizational-knowledge/wfb-00-og-cover-en.png'
coverImageAlt: "Rules alone versus a context-aware workflow: the same transaction data, different meaning depending on the organizational context maintained."
draft: false
---

---

> **Executive Summary**
>
> - Two purchase requests that both exceed the budget by 10% may need two different treatments, because one comes from a strategic supplier of many years and the other from a new supplier with late deliveries. The transaction data is the same; **the meaning differs because the context differs**.
> - "Context-aware workflow" is often read as the system recognizing when to apply rules flexibly. That reading pushes decision authority toward the system. A sounder reading: **context is knowledge the organization maintains, with an owner and a validity period, and the workflow brings it to the right rule or the right person**.
> - Context enters a workflow in three ways: as **authoritative data that rules can read**, as **evidence for the decision-maker**, and as **a signal for the rule owner to review**. None of the three lets the system adjust rules by itself.
> - For small and mid-sized manufacturers the practical question is often not "implement now?" but: **what must the organization maintain so that one day a workflow has context to use?**

---

## Introduction

Two purchase requests arrive on the same day, both over the 10% budget limit. The rule says: over the limit goes to the director for approval. Both are forwarded the same way.

The director looks at the two requests and sees at once that they differ. The first is raw material from a supplier that has delivered on time for eight years, and production demand is up this month. The second is from a new supplier whose last two lots arrived late. The director approves the first quickly and asks hard questions about the second. Nothing in the transaction data shows that difference. It lives in the director's head.

That is the gap between a workflow that follows rules and one that understands the organization. This article is about narrowing that gap without moving decision authority to the system.

(This is an illustrative scenario, not a specific customer's case.)

![Two purchase requests with the same transaction data but different organizational context lead to different handling.](~/assets/images/insights/context-aware-workflow-organizational-knowledge/wfb-01-same-data-different-meaning-en-dark.svg)

---

## What Context Means in a Workflow

![Four groups of context in a workflow; each factor needs an owner, a source and a validity period so it does not go stale silently.](~/assets/images/insights/context-aware-workflow-organizational-knowledge/wfb-02-four-groups-of-context-en-dark.svg)

Context is information outside the transaction itself that changes its meaning and how it should be handled. Four common groups:

- **Relationships and history:** how long a supplier has worked with you, past incidents, strategic customers.
- **Current organizational conditions:** each department's capacity, competing demands on resources, recent policy changes.
- **Shifting priorities:** importance that changes by month or business situation.
- **Precedents and accepted exceptions:** how similar cases were handled, and why.

What sets context apart from ordinary data: **it expires and it has an owner.** "Supplier A is strategic" is true until when, confirmed by whom? "This month we prioritize export orders" was issued by whom, and applies until what date? Context with no owner and no expiry goes stale silently, and stale context is more dangerous than none.

---

## Why Rules Alone Are Not Enough

Each rule reflects conditions at the time it was written. Organizations keep changing, so there are situations where a rule is technically right but contextually wrong:

- a budget limit set company-wide but misaligned with a department's strategic phase;
- a request ranked low priority that becomes urgent because of an external event;
- requests always routed to one approver who is overloaded while others have spare capacity.

This is a natural limit of rules, not anyone's fault. The question is what to do about it. There are two directions, and they differ fundamentally.

**First direction: let the system recognize when to loosen a rule.** It sounds attractive, but it turns every application of a rule into a judgment nobody answers for. When it loosens wrongly, no one is accountable, and the organization cannot tell which rule was set aside and why.

**Second direction: bring context into the workflow as knowledge with an owner.** A rule remains a rule; what changes is how much the rule and the decision-maker can see. This is the direction this article takes.

---

## Three Ways Context Enters a Workflow

![Three paths context takes into a workflow; no path lets AI or the system adjust a rule by itself on the basis of context.](~/assets/images/insights/context-aware-workflow-organizational-knowledge/wfb-03-three-paths-en-dark.svg)

**1. Context as authoritative data that rules can read.** If "strategic supplier" is an attribute confirmed by the purchasing director, with an effective date, a rule can reference it: "over the limit by at most 10% and the supplier is in the strategic group goes to the department head instead of the director". The rule stays deterministic and auditable. The flexibility does not come from the system interpreting; it comes from **an authorized person issuing the context, and issuing the rule that uses it**.

**2. Context as evidence for the decision-maker.** For cases outside what rules may run on their own, the system presents the relevant context with the case: the supplier relationship, similar cases, current priorities, each with its source. This is the evidence preparation described in [AI Prepares the Evidence, People Decide](/en/insights/workflow/ai-prepared-evidence-human-decision). The decision-maker no longer has to remember or hunt.

**3. Context as a signal to review rules.** When a group of cases keeps getting handled as exceptions because of the same contextual factor, the rule has drifted from reality. The system records it and alerts the rule owner. The rule changes only when an authorized person issues the change, as described in [Handling Exceptions in Workflow](/en/insights/workflow/exception-handling-in-workflow).

| Path | What context does | Who decides | Does the rule change? |
|---|---|---|---|
| Authoritative data | An input rules can read, with an owner and an expiry | A rule issued by an authorized person | No, the rule already says how to use the context |
| Evidence | Accompanies the exception case, with sources | A person | No |
| Review signal | Shows a rule drifting | The rule owner | Only if an authorized person issues the change |

What they share: no path lets AI or the system adjust a rule by itself on the basis of context.

---

## The Organizational Knowledge Layer Behind the Workflow

The three paths need a foundation: **organizational knowledge maintained continuously**, not entered once. Nonaka and Konno (1998) use the concept of "Ba" for a shared space where knowledge is shared, created and used, arguing that knowledge is tied to a specific context rather than existing apart from it. Applied to a company: information in a system becomes usable knowledge only when its context travels with it.

In OKELAS's view (an OKELAS viewpoint, not an empirical finding), the full operating chain is Process → Workflow → Event → Evidence → Knowledge → Decision → Action. How intelligent a workflow can be depends on the Evidence and Knowledge layers behind it. Many AI-in-workflow efforts stop at classification and routing, as described in [Classification and Routing in Workflow](/en/insights/workflow/ai-classification-and-routing-in-workflow), partly because the organization lacks a structured enough knowledge layer to refer to.

---

## What to Prepare First

![Five preparation steps in order; bringing it into the system is the last step, not the first.](~/assets/images/insights/context-aware-workflow-organizational-knowledge/wfb-04-prepare-in-order-en-dark.svg)

A small or mid-sized manufacturer does not need a large system to start. Pick one process and go in order:

1. **Choose a recurring decision where context changes the handling.** For example purchasing over budget, accepting a raw-material lot slightly off specification, prioritizing an urgent order.
2. **List the contextual factors the decision-maker actually uses.** Ask them, then write it down.
3. **For each factor, name the owner, the source and the validity period.** A factor without an owner is not used yet.
4. **Record the decision and reason** when an exception occurs, so context and precedent accumulate.
5. **Only then bring it into the system**: let rules read the confirmed context, and let decision-makers see the rest as evidence.

This order follows the principle of solving an operational problem with the smallest sufficient system. It also shows that the hard part is usually not technology but naming owners and keeping information current.

---

## Self-Check

1. For a decision where "only the long-timers know how to handle it", what context are they using that nobody has written down?
2. Do your important contextual factors (strategic suppliers, this month's priorities, precedents) have owners and expiry dates?
3. When context changes, who updates it, and how do you know?
4. When an exception is accepted, is the reason recorded so there is something to stand on next time?
5. Is any proposal letting the system "flexibly" loosen rules where you cannot name who is accountable?

If three or more make you hesitate, start by assigning owners to context, before thinking about technology.

---

## Conclusion

A workflow that knows context is not a workflow that decides by itself when to set a rule aside. It is a workflow in which organizational knowledge — with an owner, a source and an expiry — reaches the right rule or the right person at the right time. Rules are still issued by authorized people. Decisions outside the rules still belong to people, now with the full context in hand.

For most small and mid-sized manufacturers, the question to ask is not "when will we have a context-aware workflow", but: **what must the organization establish first, so that one day a workflow has trustworthy context to use?**

OKELAS's Digitalization Readiness Assessment helps you see where your company stands against that foundation.

---

## Sources

- Nonaka, I., & Konno, N. (1998). The concept of "Ba": Building a foundation for knowledge creation. *California Management Review*, 40(3), 40–54.
- Nonaka, I., & Takeuchi, H. (1995). *The Knowledge-Creating Company*. Oxford University Press.
- Simon, H. A. (1960). *The New Science of Management Decision*. Harper & Brothers.

## Related Articles

- [AI Prepares the Evidence, People Decide: What a Good Case File Looks Like](/en/insights/workflow/ai-prepared-evidence-human-decision)
- [Handling Exceptions in Workflow: When No Rule Covers the Decision](/en/insights/workflow/exception-handling-in-workflow)
- [Classification and Routing in Workflow: AI Reads the Content, Rules Decide the Route](/en/insights/workflow/ai-classification-and-routing-in-workflow)
- [Where AI Fits in a Workflow: Interpreting Input and Preparing Evidence](/en/insights/workflow/where-ai-fits-in-workflow)
