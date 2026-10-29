---
title: "Separation of Duties for AI in Workflow: Who Interprets, Who Decides, Who Executes, Who Records"
description: "When AI agents and workflows operate together, the first governance question is who decides and who executes. This article applies the internal-control principle of segregation of duties to workflows with AI: four separate roles, three questions for each type of action, and the technical limits to set on agents."
publishDate: 2026-10-06T00:00:00Z
translationId: article-5-17-separation-of-duties-workflow
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
primaryKeyword: "segregation of duties AI workflow"
secondaryKeywords:
  - "separation of duties AI agent"
  - "AI internal control workflow"
  - "COSO AI workflow"
  - "AI agent governance"
  - "workflow access control AI"
assessmentHref: /en/readiness/workflow
coverImage: '~/assets/images/insights/separation-of-duties-ai-in-workflow/wfm-00-og-cover-en.png'
ogImage: '~/assets/images/insights/separation-of-duties-ai-in-workflow/wfm-00-og-cover-en.png'
coverImageAlt: "Merged roles versus separated roles in a workflow with AI: when one entity holds all four roles, controls stop working."
ctaPrimaryText: 'Workflow Readiness Assessment'
ctaSubtitle: "How's your work flowing?"
draft: false
---

---

> **Executive Summary**
>
> - When an AI agent works inside a workflow, the first governance question is not "how capable is the agent" but **who decides, who executes, and who records**. If one entity, human or AI, does all three, your controls stop working.
> - **Segregation of duties** is a foundational internal-control principle, described in the COSO internal control framework. It applies to AI as it does to staff: the person who initiates, approves, executes and records a transaction should not be one and the same.
> - For a workflow with AI, it can be split into four roles: **AI interprets input and prepares evidence; a rule issued by an authorized person, or a person, decides; the system executes when a rule permits; the workflow records the full trail**. Outside these four sits one more: the person who issues and changes rules.
> - Separation must be enforced by **technical access rights**, not only by instruction. An agent should lack the ability to execute actions that need independent decision, should not approve its own output, and should not be able to edit rules or logs.

---

## Introduction

A company lets an AI agent read supplier emails. One day an email announces a change of bank account. The agent reads it, finds it plausible, updates the supplier master record, and since a payment is pending, also sends the money to the new account. Every step takes seconds, and each looks reasonable on its own.

No one in this chain checks that the email is genuine. No independent party confirms the master-data change. No one stops the payment. One entity has initiated, approved, executed and recorded. The problem is not whether the agent is "smart", but that the process dropped a basic control principle.

(This is an illustrative scenario, not a specific customer's case.)

![The supplier bank-account scenario: one agent merging the full chain of initiate–approve–execute–record versus each role held by a separate entity.](~/assets/images/insights/separation-of-duties-ai-in-workflow/wfm-01-merged-vs-separated-en-dark.svg)

---

## The Principle of Segregation of Duties

In internal control, segregation of duties divides the key activities of a transaction among different people, so that an error or fraud is hard to commit without someone else noticing. The COSO (2013) internal control framework treats it among control activities, and the principle has long been familiar in accounting, finance and purchasing.

The point to hold on to: the principle does not depend on whether the acting entity is a person or a machine. An AI agent that can initiate, approve and execute in seconds does not make the principle obsolete. It makes it more important, because speed lets an error spread before anyone can look.

Two common beliefs to avoid:

- **"If the agent is good enough, no need to separate."** Average accuracy does not replace independent control. Controls exist precisely to catch cases where the acting entity is wrong without knowing it.
- **"A person clicks approve, so it is separated."** If the approver sees only a button and no evidence, or always approves what is suggested, the separation exists only on paper.

---

## Four Roles in a Workflow with AI

![Four roles in a workflow with AI plus the rule issuer; the "must not do" column for each role.](~/assets/images/insights/separation-of-duties-ai-in-workflow/wfm-02-four-roles-en-dark.svg)

| Role | Who or what holds it | What it does | What it must not do |
|---|---|---|---|
| Interpret and prepare | AI | Reads unstructured input, assigns a type, finds and collects evidence, states sources and certainty | Approve; execute; treat its own output as a decision |
| Decide | A rule issued by an authorized person, or a person | Confirms an action is within authority; judges cases outside the rules | Be taken on by the same entity that executes |
| Execute | The system, under the rights granted | Carries out actions that have been permitted | Expand its own rights; act without a valid decision |
| Record | The workflow | Keeps the trail: who decided, which evidence they saw, why, when | Be edited or deleted by the executing entity |

Outside these four sits the **rule issuer**. This person decides which rules exist, how far they apply and when they change. Changing rules does not belong to AI or the executing system, as described in [Handling Exceptions in Workflow](/en/insights/workflow/exception-handling-in-workflow).

This split matches the two jobs AI does in [Where AI Fits in a Workflow](/en/insights/workflow/where-ai-fits-in-workflow): interpreting input and preparing evidence. Both belong to the first role. They do not include deciding or executing.

---

## Three Questions the Workflow Must Answer for Each Type of Action

![Three questions for each type of action: does it need an independent decision, what counts as a valid decision, who executes after the decision.](~/assets/images/insights/separation-of-duties-ai-in-workflow/wfm-03-three-questions-en-dark.svg)

Separation is not applied once for the whole system. It is decided for each type of action, with three questions:

**1. Does this action need an independent decision?** Actions with large consequences, hard to reverse, or touching money, master data or compliance usually do. Small, reversible actions within a clear rule can run under a rule issued by an authorized person.

**2. What counts as a valid decision?** Is a click on "approve" without evidence a decision? Does silence after a deadline count as consent? At minimum, a valid decision has an authorized person, the evidence they saw, a reason, and a time. Silence is not consent.

**3. Who executes after the decision?** The executing entity should be technically separate from the entity that prepared the file. An agent that prepares evidence should not be the one holding the credentials to carry out the action.

The first two questions belong to process design. The third belongs to access design, and it is where the principle is most easily missed.

---

## Enforcing Separation Through Access

![What the agent may and may not have technical access to do.](~/assets/images/insights/separation-of-duties-ai-in-workflow/wfm-04-access-controls-en-dark.svg)

An instruction that "the agent must not approve itself" protects nothing if the agent has the technical ability to approve. Some common design directions:

- **Least privilege.** An agent that interprets and prepares evidence needs only read access to evidence sources and write access to the case file, not write access to business systems.
- **Separate credentials per role.** The executing entity uses credentials different from the agent that prepares files.
- **The agent does not approve its own output.** If the agent is part of an approval flow, the decision is still made by an independent rule or person.
- **The agent cannot edit rules or logs.** These two are the foundation of control. The rule issuer and the recording system must sit outside the agent's rights.
- **AI output is labeled as preparation, not as an approved result.** Whoever views it knows at once what they are looking at.

These are familiar internal-control design practices applied to AI. How tight they need to be depends on the risk of each process.

---

## Speed Is Not a Reason to Merge the Roles

The common argument for merging roles is speed: separate them and the process slows down. Two points to weigh.

First, not every action needs the same separation. Tight separation is needed for high-risk actions. Low-risk, reversible actions within a clear rule can run automatically and still honor the principle, because the decision was made in advance by an authorized person, in the form of a rule.

Second, separating roles does not mean slowing down. When the evidence AI prepares is good, decision-makers spend less time, as described in [AI Prepares the Evidence, People Decide](/en/insights/workflow/ai-prepared-evidence-human-decision). The saving comes from preparation, not from dropping control.

---

## Common Mistakes

- **One "do-everything agent".** An agent that reads, decides, executes and records at once is a single point of failure for the whole process.
- **Rubber-stamp approval.** The approver sees no evidence, or pressure leads them to always agree.
- **A log written and editable by the executing entity.** A trail like that cannot be trusted.
- **Rules edited automatically.** The system finds a rule "unsuitable" and adjusts it. That hands rule issuance to the system.
- **Treating one AI checking another as independent control.** An AI reviewing another AI's output can be a useful filter, but it does not replace an authorized person or rule.

---

## Where to Start

1. **List the actions** in processes where AI takes part, prioritizing those touching money, master data, compliance, or that are hard to reverse.
2. **Build an action × role matrix**: for each action, who (or what) initiates, decides, executes and records. If a cell is empty or one entity holds three cells, look closer.
3. **Check actual access** the agent has against the matrix. Actual access is often wider than intended.
4. **Define a valid decision** for each high-risk action type.
5. **Review periodically**: sample to see whether separation still holds in real operation.

---

## Self-Check

1. Is there any action in your process where the same entity, human or AI, initiates, approves and executes?
2. Does the approver see the evidence before approving, or only a button?
3. Is the agent's actual technical access wider than you intended?
4. Is the log written and protected independently of the executing entity?
5. Who may edit rules, and does the agent have any path to edit them?
6. Is silence after a deadline being counted as consent anywhere?

If three or more make you hesitate, review the separation of roles before widening the agent's scope.

---

## Conclusion

Bringing AI into a workflow does not remove the need for segregation of duties; it makes the need clearer, because AI's speed shortens the time for an error to spread. A safe design is one where AI does its own part well — interpreting and preparing evidence — while the decision belongs to a rule issued by an authorized person or to a person, execution is done by the system under granted rights, and the trail is recorded independently by the workflow.

The question to keep in mind when assessing any proposal about AI agents: **who decides, who executes, who records, and could they be the same entity?**

---

## Sources

- Committee of Sponsoring Organizations of the Treadway Commission, COSO (2013). *Internal Control – Integrated Framework*.
- Parasuraman, R., Sheridan, T. B., & Wickens, C. D. (2000). A model for types and levels of human interaction with automation. *IEEE Transactions on Systems, Man, and Cybernetics – Part A*, 30(3), 286–297.

## Related Articles

- [AI Prepares the Evidence, People Decide: What a Good Case File Looks Like](/en/insights/workflow/ai-prepared-evidence-human-decision)
- [When a Workflow Knows the Organization's Context](/en/insights/workflow/context-aware-workflow-organizational-knowledge)
- [Handling Exceptions in Workflow: When No Rule Covers the Decision](/en/insights/workflow/exception-handling-in-workflow)
- [Where AI Fits in a Workflow: Interpreting Input and Preparing Evidence](/en/insights/workflow/where-ai-fits-in-workflow)
