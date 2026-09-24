---
title: "AI Agent and Workflow: Defining Who Decides and Who Executes"
slug: "ai-agent-decision-workflow-execution"
language: "en"
translationKey: "article-5-14-decide-vs-execute"
type: "analysis"
cluster: "workflow"
parentPillar: "pillar-5-next-gen-workflow"
funnelStage: ["understanding"]
audience: ["CIO", "COO"]
date: 2026-09-23
draft: true
seo:
  title: "AI Agent and Workflow: Who Decides, Who Executes?"
  description: "When AI agents and workflow systems operate together, the division of responsibility must be clear: who has authority to decide and who carries out the action. Here's how to structure it."
  primaryKeyword: "AI agent decision workflow execution"
  secondaryKeywords:
    - "AI agent responsibilities workflow"
    - "who decides AI workflow"
    - "AI decision making boundary"
    - "workflow AI authority"
  searchIntent: "Understanding — architects and operations leaders designing the right relationship between AI and workflow"
cta:
  primary: "Workflow Readiness Assessment"
relatedInternalLinks:
  - "intelligent-workflow-next-generation" # Pillar 5, parent
  - "ai-agent-and-workflow" # article 5.13, previous
  - "rules-vs-reasoning" # article 5.15 (proposed), next
  - "least-privilege-for-ai" # article 6.12 (proposed), cross-cluster
  - "workflow-readiness-assessment"
evidenceSources:
  - "COSO Internal Control – Integrated Framework — the Segregation of Duties principle"
---

## Executive Summary

- The previous article established the general principle: workflow provides structure, agents handle reasoning. This article digs into a more specific question: within that structure, **who actually has the authority to decide, and who merely has the job of executing?**
- A governance principle with decades of history in auditing and finance — **Segregation of Duties**, a core component of the COSO Internal Control — Integrated Framework — states that no single individual should simultaneously hold the authority to initiate, approve, execute, and record a transaction. This principle applies almost directly to designing the relationship between an AI agent and workflow.
- Workflow's role isn't to "execute everything" — it's to **define the authority boundary**: which actions require a decision, what counts as a valid decision, and who is accountable for executing afterward.
- The agent's role is to **reason and propose** within that boundary — but an agent producing a proposal doesn't automatically mean that proposal has been "decided" in the governance sense of the word.
- A clear responsibility model — who proposes, who confirms authority, who executes, who records the evidence — is a prerequisite for putting an agent into any workflow that carries real risk.

---

## Opening

A question that seems simple but often gets overlooked when designing a system with an AI agent: when an agent produces a proposal and an action later takes place, **who actually made the decision?**

The obvious answer is "the person, since the agent only proposed." But in practice, that boundary blurs very quickly: if the agent auto-executes after a period with no response, if "confirmation" is just a click without genuine review of the content, or if the agent has direct technical access to the execution system — then on paper it looks like "a person decided," but in practice, the decision was effectively made by the agent beforehand.

This isn't a theoretical problem. It's a concrete governance issue, and financial auditing has had a principle for handling exactly this kind of problem for decades.

---

## Decision vs. Execution: Two Distinct Roles

**Claim:** Deciding and executing are fundamentally different roles, and collapsing both into a single entity (whether human or AI) weakens the control capability of the entire system.

The **Segregation of Duties** principle, one of the core components of the COSO Internal Control — Integrated Framework, was built precisely to handle this problem in a financial and accounting context. The principle states: no single individual should simultaneously hold more than one of these roles — initiating a transaction, approving it, having direct access to the related assets, and recording/reconciling that transaction. The underlying reason: when one person (or one system) holds all these roles, the ability to detect errors or fraud drops sharply, because there's no longer an independent check.

Applying this principle to the AI agent and workflow context, two roles clearly need to be kept separate:

- **Decision:** the act of confirming that a specific proposal is approved to proceed, based on having genuinely weighed the relevant context and risk.
- **Execution:** the act of actually carrying out what was decided — transferring money, updating a record, sending a notification outside the organization.

**Implication:** If an agent is both the party proposing and the party with the technical ability to execute on its own without an independent confirmation point, the system has unintentionally merged two roles that should have been kept apart — regardless of whether the design documentation says "a human still decides."

---

## How Workflow Defines the Boundary

Workflow's core role in relation to an agent isn't to technically "contain" it — it's to **explicitly define the authority boundary before any agent proposal is even made.**

That boundary needs to clearly answer three questions for every type of action in the process:

1. **Does this action require an independent decision at all?** Some actions (an internal reminder email, say) may not, because the consequence is low and easily reversible. Others (transferring money, sending an official external response) always do.
2. **What counts as a valid decision?** This is the point most easily blurred in practice — it needs a clear definition: does a confirmation click with no actual review of the content count as a valid decision? Does a timeout with no response, followed by automatic proceeding, count as one?
3. **Who or what system is responsible for executing once a decision is made?** Execution should be a separate step, triggered by a recorded, valid decision — not an automatic continuation immediately following the proposal.

Workflow is where these three questions get answered explicitly and consistently, instead of being left to form randomly through how the agent happens to be technically configured.

---

## AI Agent Reasoning Within the Boundary

Within the boundary workflow has defined, the agent's role is to **reason and produce a well-grounded proposal** — but that proposal, however high-quality, doesn't automatically become a valid decision in the governance sense.

This carries a few concrete design consequences:

- **An agent's proposal needs to be presented clearly as a proposal**, not as a completed action — accompanied by its basis (what data, what precedent) so the reviewer can genuinely evaluate it, not just confirm it reflexively.
- **An agent shouldn't have the technical access to self-execute** actions already identified as requiring an independent decision, even when the agent is "confident" in its own proposal. The technical capability to execute should stay separate from the capability to reason and propose.
- **An agent handling a case faster doesn't mean the decision/execution boundary is allowed to blur.** Speed is the agent's benefit in preparation and reasoning — not a reason to skip the independent decision step for actions that genuinely require one.

This connects directly to the previous article in the series: an agent is good at the part that needs flexible reasoning, but good reasoning capability doesn't mean the same entity should also be handed decision and execution authority.

---

## A Responsibility Model

Combining the above into a four-role model that can be applied to any specific action in a workflow:

| Role | Who/what holds it | Responsibility |
|---|---|---|
| **Propose** | AI agent | Reason based on data and precedent, produce a proposal with a clearly stated basis |
| **Authorize** | A person, or a pre-defined rule within the workflow | Confirm whether the proposal falls within an automatically approved threshold, or needs escalation to someone with higher authority |
| **Execute** | An execution system, technically separate from the proposing agent | Carry out the action once a valid authorization is confirmed |
| **Record** | The workflow system | Log the full evidence: who proposed, based on what, who authorized, when it was executed |

These four roles don't necessarily need four completely separate people or systems in every case — for low-risk actions, the "authorize" role can be an automated rule that a person already approved in advance (echoing the Event → Action principle covered in article 5.9). But for actions with meaningful risk or consequence, these four roles should be clearly separated, in the same spirit as the segregation-of-duties principle.

---

## Conclusion

"Who decides, who executes" isn't a minor technical detail — it's a core governance question when putting an AI agent into any workflow with real risk. A principle that has existed for decades in internal control — never collapsing initiation, approval, and execution into a single entity — applies almost directly to this context. An agent can reason and propose brilliantly; that doesn't change the fact that deciding and executing still need to be kept separate and clearly recorded.

## Next Step

For a specific process you're considering adding an agent to, try filling in the four-role table above: who proposes, who authorizes, who executes, who records the evidence. If you can't clearly fill in all four boxes, that's a sign the decision/execution boundary hasn't been designed tightly enough before deployment. Or take the **Workflow Readiness Assessment** to evaluate your organization's readiness.
