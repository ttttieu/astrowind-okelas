---
title: "From Request/Approval to Event/Action: When an Action Does Not Need to Wait for Approval"
description: "Most approval delay comes from simple, repeating decisions forced through a process built for complex ones. Event/Action moves approval from each case to the rule level: an authorized person decides in advance, and the event only triggers a rule that has already been approved."
publishDate: 2026-09-23T00:00:00Z
updatedDate: 2026-10-06T00:00:00Z
translationId: article-5-9-request-approval-to-event-action
lang: en
category: workflow
contentType: Analysis
funnelStage:
  - Understanding
audience:
  - COO
  - CIO
  - Operations Director
primaryKeyword: "event-driven approval workflow"
secondaryKeywords:
  - "request approval workflow"
  - "event-driven workflow"
  - "conditional approval"
  - "rules workflow"
  - "workflow automation approval"
assessmentHref: /en/readiness/workflow
coverImage: '~/assets/images/insights/request-approval-to-event-action-workflow/wfr-00-og-cover-en.png'
ogImage: '~/assets/images/insights/request-approval-to-event-action-workflow/wfr-00-og-cover-en.png'
coverImageAlt: "Request → Approval has a wait-for-approval step in the middle of each case; Event/Action uses a rule an authorized person issued in advance so the action happens on time, and routes cases outside the rule to a person."
ctaPrimaryText: 'Workflow Readiness Assessment'
ctaSubtitle: "How's your work flowing?"
draft: false
---

---

## Executive Summary

- The common model is **Request → Approval**: someone submits a request, waits for a chain of sign-offs, and only then does the action happen. Its delay usually does not come from hard decisions. It comes from **simple, repeating decisions going through the path built for complex ones**.
- **Event/Action does not remove approval.** It moves approval earlier and up a level: an authorized person decides **once, at the rule level**, for a whole class of cases with clear criteria. The event only triggers a rule that has already been approved. The system does not decide on its own.
- Cases outside the rule still go to an authorized person, with full context and evidence. Judgment stays with people.
- Conditions for the shift: enough precedent, rules issued by authorized people with a named owner, evidence left on every run, and review after the fact.

---

## Introduction

A recurring raw-material order: the usual supplier, within the approved limit. It sits in a department head's inbox for three days because he is traveling. Nobody doubts this order. It waits because the process requires a signature.

If that sounds familiar, the problem may not be the approver or the software. It may be the design: approval has been set as the default step for every case. This article looks at why that creates delay, what Event/Action changes, and the conditions for making the shift without losing control.

---

## Why Request → Approval Creates Delay

Three structural reasons are common.

1. **Approval is a default step, not a conditional one.** Many processes require sign-off on every case, including repeating, low-value ones.
2. **Wait time depends on the approver's calendar, not on how urgent the request is.**
3. **Approval often does not distinguish risk.** A request for a small amount and a request for a very large one can pass through the same chain.

![Three reasons Request → Approval creates delay: approval is a default step, wait time depends on the approver's calendar, approval does not distinguish risk.](~/assets/images/insights/request-approval-to-event-action-workflow/wfr-02-why-approval-creates-latency-en-dark.svg)

Lean measures this with **Process Cycle Efficiency (PCE)**: value-adding time divided by total process lead time (George, 2002). For business processes with many waiting steps, the figure tends to be low. The exact level varies widely across organizations and processes, so the most reliable approach is to measure your own: from the moment a request arises to the moment the action happens, how much of that time is waiting for approval?

---

## The Root Cause: Programmed Decisions on the Path for Nonprogrammed Ones

Herbert Simon (1960) distinguished **programmed decisions** (repetitive, clear criteria) from **nonprogrammed decisions** (new, complex, requiring judgment). The two sit on a continuum. For more, see [Rule or Human Judgment: Which Workflow Decisions to Automate](/en/insights/workflow/programmed-vs-nonprogrammed-decisions).

Request → Approval treats every decision as the second kind. Each case, even one that has repeated hundreds of times with the same outcome, passes through a person who judges it from scratch. That is why most approval delay does not come from complex decisions. It comes from simple decisions using the wrong path.

---

## How Event/Action Works

![Comparing two models: Request → Approval (approval case by case) and Event/Action (rule issued in advance by an authorized person, event triggers the rule).](~/assets/images/insights/request-approval-to-event-action-workflow/wfr-01-request-approval-vs-event-action-en-dark.svg)

The basic structure has three steps.

1. **An event occurs:** a condition is met, a threshold is crossed, a status changes.
2. **A rule evaluates the event.** This is a rule an authorized person issued in advance, with conditions and thresholds written down.
3. **The outcome decides the route:**
   - The event falls within the rule and matches confirmed precedent: **the action proceeds directly**, with evidence recorded each time.
   - The event exceeds a threshold, falls outside precedent or carries high risk: **it goes to an authorized person**, with context and evidence so they can judge faster.

![Event/Action routing: event within rule scope → action proceeds directly with evidence; event outside scope → goes to authorized person with context.](~/assets/images/insights/request-approval-to-event-action-workflow/wfr-03-conditional-approval-branch-en-dark.svg)

The core difference is not whether approval exists. It is **where approval happens**.

| | Request → Approval | Event/Action |
|---|---|---|
| When approval happens | Every time a request arrives | Once, when the rule is issued; and for each exception case |
| Who decides | The approver, case by case | An authorized person issues the rule; people judge exception cases |
| Where control sits | Before every action | Before the rule is issued, and in review after it runs |
| Evidence | Easily scattered across emails and signatures | Recorded every time the rule runs |

### The role of AI

Events do not always arrive as structured data. When one arrives as an email, a message or a scanned document, AI can interpret it into structured data so a rule can run, and can prepare evidence for exception cases. AI is not the party that decides on any branch. For more, see [Where AI Fits in a Workflow](/en/insights/workflow/where-ai-fits-in-workflow).

---

## Illustrative Examples from Operations

![Three illustrative examples: recurring purchasing, handling returns, adjusting the production schedule — each with a rule issued in advance and clear routing between in-rule cases and exceptions.](~/assets/images/insights/request-approval-to-event-action-workflow/wfr-04-three-examples-en-dark.svg)

The examples below are illustrative scenarios, not data or real customer cases.

**Recurring purchasing.** A repeating raw-material order, the usual supplier, within an approved limit. The purchasing lead issues this rule in advance. When the event "stock falls to threshold" occurs, the order is created under the rule. A new supplier or an amount over the limit goes to an approver.

**Handling returns.** A return within policy, low value, with no unusual history: processed immediately under the rule. A high-value or unusual one goes to an authorized person with the customer's history.

**Adjusting the production schedule.** When material is short and a substitution plan was approved in advance, the schedule is adjusted under that plan. A plan that has not been approved waits for an authorized person.

In all three, the decision was made earlier by a specific person. The event only makes that decision take effect at the right moment.

---

## Conditions for Making the Shift

![Four conditions for making the shift to Event/Action: enough precedent, authorized person decides in advance and puts their name on the rule, evidence left on every run, post-hoc review.](~/assets/images/insights/request-approval-to-event-action-workflow/wfr-05-four-conditions-en-dark.svg)

1. **Enough precedent** to define a "clear case" from real data: which cases have repeated, with consistent outcomes.
2. **An authorized person willing to decide in advance** rather than case by case, and to put their name on the rule. Each rule has a rule owner responsible for review.
3. **Evidence left on every run**, so results can be verified later and traced when needed.
4. **Post-hoc review** to catch early any threshold that was set wrongly.

The cautious path starts with low-value, high-frequency decisions with the clearest precedent, then expands by issuing more rules through a process with a named approver. Scope does not grow by handing the system more authority.

---

## What Should Not Be Moved

![What should not be moved to Event/Action: hard-to-reverse actions, unstable criteria decisions, approvals required by regulation or contract.](~/assets/images/insights/request-approval-to-event-action-workflow/wfr-06-what-not-to-move-en-dark.svg)

- **Hard-to-reverse or irreversible actions**, such as large payments or confirming a contract. Keep a person confirming before the action is carried out.
- **Decisions with unstable criteria**, or where new variants keep appearing that a rule cannot list.
- **Approvals required by regulation, standards or customer contracts.** Identify which approvals are of this kind before changing anything, because these are not formal control.

### Risk when it goes wrong

A rule with a wrong threshold repeats its error quickly and consistently. That is why post-hoc review is not a formality. Signals to watch: exceptions rising unusually, complaints rising after the rule runs, actions that had to be reversed. When a signal appears, change the rule through the formal process and record the reason, rather than editing it directly.

---

## Self-Check: What Is Your Approval Step Actually Controlling?

For each approval step in your process, try to answer:

1. Of the last 10 requests, how many did the approver reject or send back for changes? If nearly all were approved as submitted, this step may be formal control. (This is an OKELAS observation, not a standard threshold.)
2. Are the approval criteria written down, or do they live in the approver's head?
3. Do a low-value request and a high-value request pass through the same chain?
4. When the approver is out for a week, where do requests go?
5. Does each approval leave traceable evidence, or does it live only in email?

If several answers surprise you, this may be the place to start. OKELAS's Digitalization Level Assessment helps place these steps in the wider picture of your digitalization.

---

## Conclusion

The difference is not whether control exists. It is where control sits. Request → Approval applies the same scrutiny to every case. Event/Action reserves human judgment for the cases that need it, and lets decisions an authorized person issued in advance run at the right moment, with evidence and with someone accountable.

Most approval delay does not come from complex decisions. It comes from simple, repeating decisions still going through the process built for complex ones.

---

## Sources

- Simon, H. A. (1960). *The New Science of Management Decision*. Harper & Brothers.
- George, M. L. (2002). *Lean Six Sigma: Combining Six Sigma Quality with Lean Speed*. McGraw-Hill. (Definition of Process Cycle Efficiency.)

## Related Articles

- [Rule or Human Judgment: Which Workflow Decisions to Automate](/en/insights/workflow/programmed-vs-nonprogrammed-decisions)
- [Where AI Fits in a Workflow: Interpreting Input and Preparing Evidence](/en/insights/workflow/where-ai-fits-in-workflow)
- Event-Driven Workflow: How Systems Detect Events Automatically
- From Approval Workflow to End-to-End Workflow
