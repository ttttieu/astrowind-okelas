---
title: "Delegating Workflow Steps to AI: Think at the Task Level, Govern It as a Participant"
description: "Instead of asking whether AI can replace a role, ask which steps in that role's workflow can be delegated to AI, with a clear task, permissions and trail. This article merges two ideas into one framework: delegate the step, not the decision."
publishDate: 2026-10-06T00:00:00Z
translationId: article-5-18-delegating-steps-workflow
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
primaryKeyword: "delegating workflow steps to AI"
secondaryKeywords:
  - "AI participant workflow"
  - "task-level AI automation"
  - "non-human identity workflow"
  - "AI employee governance"
  - "AI access management workflow"
assessmentHref: /en/readiness/workflow
coverImage: '~/assets/images/insights/delegating-workflow-steps-to-ai/wfl-00-og-cover-en.png'
ogImage: '~/assets/images/insights/delegating-workflow-steps-to-ai/wfl-00-og-cover-en.png'
coverImageAlt: "The common question 'which role will AI replace' versus the useful question 'which steps of this role should be delegated to AI'."
ctaPrimaryText: 'Workflow Readiness Assessment'
ctaSubtitle: "How's your work flowing?"
draft: false
---

---

> **Executive Summary**
>
> - "Can AI replace this role?" tends to produce two extreme reactions: excessive fear or unrealistic expectation. A more useful question: **which steps in this role's workflow can be delegated to AI, and which should stay with people?**
> - Research by the McKinsey Global Institute (2017) analyzed the constituent activities of hundreds of occupations and concluded that very few occupations can be fully automated, while most contain a substantial share of activities with technical automation potential. Automation and AI should be viewed at the **activity (task) level, not the job level**.
> - "Delegating to AI" should mean **delegating a step**: interpreting input or preparing evidence for that step. It does not mean delegating decision authority. Decisions remain with rules issued by authorized people, or with people.
> - An AI working inside a workflow should be governed as a **participant**: its own identity, a permission scope tied to its task, a traceable trail and a manageable lifecycle. Not every step needs the full level of governance; apply it selectively according to risk.

---

## Introduction

A small or mid-sized manufacturer is short-staffed in accounts receivable. Hiring is slow and costly. The finance director asks: "Can AI take over the receivables accountant role?"

The question lumps several different things into one. A receivables accountant does not do one thing; they do many: match invoices, track overdue balances, remind customers to pay, handle disputes, prepare periodic reports. Each has a very different fit for AI. Matching invoices is repetitive with a clear standard of right and wrong. Handling a dispute with a long-standing customer needs judgment and relationship.

(This is an illustrative scenario, not a specific customer's case.)

---

## Ask at the Activity Level, Not the Role Level

The McKinsey Global Institute report *A Future That Works* (2017) analyzed more than two thousand constituent activities across more than eight hundred occupations. The commonly cited result: very few occupations, under 5%, could be fully automated with technology demonstrated at that time, while about 60% of occupations had at least 30% of their constituent activities technically automatable. Read the figure carefully: it is an estimate of **technical potential** as of 2017, not a forecast of jobs lost, and it says nothing about whether adoption makes economic or organizational sense.

What is worth keeping is the conclusion about how to look: **automation rarely replaces a whole job; it usually changes part of it.** So analysis should go from the job down to its steps.

---

## Decompose a Role into Steps

![The receivables accountant role broken into constituent activity steps; each step has a very different fit for AI.](~/assets/images/insights/delegating-workflow-steps-to-ai/wfl-01-role-to-steps-en-dark.svg)

Take the receivables accountant as an illustration. The table is a discussion framework, not an assessment of any specific company.

| Activity | Character | How far AI can help | What people keep |
|---|---|---|---|
| Match invoices to orders | Repetitive, high volume, clear right/wrong | Interpret documents, match so rules can run; mismatches go to the exception path | Handle mismatches outside the rules |
| Track overdue balances | Repetitive, per issued thresholds | Collect and summarize; rules trigger reminders per threshold | Set thresholds, handle special customers |
| Remind customers to pay | Templated but relationship-sensitive | Draft by context | Approve and send for key customers |
| Handle disputes | Needs judgment and relationship | Prepare the file, similar cases | Decide and negotiate |
| Periodic reports | Repetitive, compilation | Compile figures with sources | Review and sign |

Every row has a part AI can help with, but that part is **interpreting input and preparing evidence**, not deciding. These are the two jobs described in [Where AI Fits in a Workflow](/en/insights/workflow/where-ai-fits-in-workflow).

---

## Three Traits of a Step Worth Delegating

![Three traits of a step worth delegating to AI: repetitive and high-volume, needs information preparation before a decision, right and wrong can be defined and verified.](~/assets/images/insights/delegating-workflow-steps-to-ai/wfl-02-three-traits-en-dark.svg)

**1. Repetitive, high volume.** Steps that occur often and consume cumulative time, even if each instance is not complex, are good candidates.

**2. Needs preparation or compilation before a person decides.** AI prepares context and relevant data; the person focuses on what needs judgment. This is where the value is clearest, as analyzed in [AI Prepares the Evidence, People Decide](/en/insights/workflow/ai-prepared-evidence-human-decision).

**3. Right and wrong can be defined and verified.** If you can say clearly whether the step was done correctly, delegating and checking is far easier than for a step where "right" depends on relationship or situational judgment.

Conversely, steps that build relationships, negotiate, or exercise judgment in ambiguous situations with no precedent should stay with people. This is a present-day assessment that may change, and any change should go through deliberate review.

---

## "Delegating" Means Delegating a Step, with a Task Card

![A seven-item task card: goal, input, output, who receives it, permissions, when to stop, who is accountable.](~/assets/images/insights/delegating-workflow-steps-to-ai/wfl-03-task-card-en-dark.svg)

To delegate a step to AI without losing control, each step should have a short **task card** that answers:

- **Goal of the step:** what AI does, within what scope.
- **Input:** what AI may read.
- **Output:** the form and place of the result, with sources and certainty.
- **Who receives the output:** which rule reads it, or which person reviews it.
- **Permissions:** what AI may and may not do (see [Separation of Duties for AI in Workflow](/en/insights/workflow/separation-of-duties-ai-in-workflow)).
- **When to stop and hand to a person:** uncertain, missing information or out of scope.
- **Who is accountable** for the step and reviews it periodically.

A task card makes "delegating" concrete and checkable. It also forces the organization to say whether the step is truly separate from the others.

---

## Govern AI as a Participant, Not Just a Tool

![AI participant versus tool: four distinguishing traits — distinct identity, task-scoped permissions, traceable accountability, manageable lifecycle.](~/assets/images/insights/delegating-workflow-steps-to-ai/wfl-04-participant-vs-tool-en-dark.svg)

Many organizations use AI as a tool called when needed: send a request, get a result, done. For summarizing a document for reference, that is enough. But when AI performs a step inside a process, questions like "what has this AI done, where, with what permissions, over the past three months" need an answer.

The identity and access management (IAM) field is forming the concept of **non-human identity**: treating an agent as an identity with an owner, a purpose and a permission scope, reviewed and revoked when no longer needed, instead of a shared API key. From this come four traits that distinguish an AI participant from a tool:

1. **A distinct identity, not shared.** Tied to a specific purpose and scope of work.
2. **A permission scope tied to the task**, not broad "just in case" access.
3. **Accountability traceable to that identity:** which result came from which participant, with which data and rights.
4. **A manageable lifecycle:** granted access on joining, monitored, revoked when the role ends.

An illustrative QC example: an AI participant is assigned to review measurement data from one production stage to detect unusual trends. It has read access to that stage's data only, cannot alter raw data and cannot stop production on its own. Each review is recorded: which data, which threshold or pattern, why the alert. The decision to stop belongs to an authorized person or a rule they issued. When that stage ends, the participant's access is revoked.

The difference is not that AI is "smarter", but that the whole activity is governed and verifiable, consistent with ISO/GMP system requirements.

---

## Three Conditions for a Delegated Step to Work

**1. The step is clearly separate from others.** You must know what AI prepares, who decides, who executes, so responsibility does not blur.

**2. There is enough historical data or clear rules** for AI to work reliably. If the step sits in "much judgment needed" territory, supervise more closely or hold off.

**3. Identity and permission governance is in place** as described above, at a level proportionate to the risk.

Missing any one, delegating usually adds more operational risk than value, even if the AI model is technically capable of the task.

When is full governance not needed? For low-risk tasks that do not affect operational decisions, such as summarizing a document for reference, a simple tool model remains reasonable. Full governance should go to AI roles that run continuously, influence real decisions, or must be explained to an assessing body (ISO, GMP). Building such governance costs far more than a simple API call, so be selective.

---

## Support and Replacement: The Boundary Must Be Designed

The question many leaders actually care about: will this cost employees their jobs?

The honest answer: the effect depends on **the share of a role's activities delegated to AI**, not a yes or no for the whole role. Suppose, as an illustration, that most of a role's activities are repetitive with clear right and wrong, and AI takes most of them. The person's role then changes substantially, concentrating on what needs judgment, relationship and exception handling. You can call that restructuring the role around what people do best. It may also change how many people are needed for that volume of work; this should not be presented as if there were no effect.

What matters is that the boundary is **designed deliberately**: which activities are delegated, which are kept, why, and with the affected employees involved in the process. Otherwise the boundary forms by accident through scattered AI tool rollouts.

---

## Where to Start

1. **Choose one role** with heavy volume or a staffing gap, and list its constituent activities with the people who do them.
2. **Assess each activity** against the three traits: repetitive, needs information preparation, verifiable right and wrong.
3. **Pick one step** that scores highest with moderate risk. Write a task card for it.
4. **Grant minimum permissions** and name someone accountable for periodic review.
5. **Run in parallel for a few cycles**, measure handling time, the share of cases handed to people and the share of results corrected, then decide whether to expand.

---

## Self-Check

1. Are you asking "which role will AI replace" or "which step of this role should be delegated to AI"?
2. For the step you plan to delegate, can you write a task card with input, output, permissions, stopping point and accountable person?
3. Does the AI use its own identity or a shared key?
4. Are the AI's permissions wider than its task?
5. Can you answer "what has this AI done in the past three months"?
6. Are the employees who currently do these steps involved in the decision to delegate?

If three or more make you hesitate, complete the task card and permission governance before expanding.

---

## Conclusion

Asking "which step of a workflow can be delegated to AI" is more useful than asking "who can AI replace". Delegating here means delegating a step — interpreting input or preparing evidence — not decision authority. For delegating with control, the step must be separate, the AI governed as a participant with its own identity, permissions and trail, and the boundary between what AI does and what people keep must be designed deliberately.

For many resource-constrained small and mid-sized manufacturers, this is a practical way to extend processing capacity without trading away operational control.

OKELAS's Digitalization Readiness Assessment helps identify which of your processes are clear enough to begin delegating step by step.

---

## Sources

- McKinsey Global Institute (2017). *A Future That Works: Automation, Employment, and Productivity*.
- Parasuraman, R., Sheridan, T. B., & Wickens, C. D. (2000). A model for types and levels of human interaction with automation. *IEEE Transactions on Systems, Man, and Cybernetics – Part A*, 30(3), 286–297.
- Committee of Sponsoring Organizations of the Treadway Commission, COSO (2013). *Internal Control – Integrated Framework*.

## Related Articles

- [Separation of Duties for AI in Workflow: Who Interprets, Who Decides, Who Executes, Who Records](/en/insights/workflow/separation-of-duties-ai-in-workflow)
- [AI Prepares the Evidence, People Decide: What a Good Case File Looks Like](/en/insights/workflow/ai-prepared-evidence-human-decision)
- [When a Workflow Knows the Organization's Context](/en/insights/workflow/context-aware-workflow-organizational-knowledge)
- [Where AI Fits in a Workflow: Interpreting Input and Preparing Evidence](/en/insights/workflow/where-ai-fits-in-workflow)
