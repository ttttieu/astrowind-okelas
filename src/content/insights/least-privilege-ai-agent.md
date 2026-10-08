---
title: "Least Privilege for AI Agents: Designing Authority That Matches the Task"
description: "An AI agent should only be granted the minimum permissions needed for a specific task — nothing more. Here's how the principle of least privilege applies to AI agents and how to implement it in enterprise environments."
publishDate: 2026-09-23T00:00:00Z
coverImage: '~/assets/images/insights/least-privilege-ai-agent/alp-00-og-cover-en.png'
ogImage: '~/assets/images/insights/least-privilege-ai-agent/alp-00-og-cover-en.png'
coverImageAlt: "Four ascending steps labelled Read, Request, Recommend and Execute; the highest step is highlighted."
translationId: article-6-12-least-privilege
lang: en
category: ai
contentType: Analysis
funnelStage:
  - Consideration
audience:
  - CIO
  - IT Architect
  - Security
primaryKeyword: "least privilege AI agent"
secondaryKeywords:
  - "AI agent permission model"
  - "limiting AI agent access"
  - "AI agent authorization design"
  - "AI access control principle"
assessmentHref: /en/readiness/ai
ctaPrimaryText: 'Assess your AI readiness'
ctaSubtitle: 'Identify your AI readiness level'
draft: false
---

---

> **Executive Summary**
>
> - Least privilege is one of the oldest and most thoroughly validated security design principles in computer science — formally presented by Jerome Saltzer and Michael Schroeder in 1975, in one of the foundational works of information security. The original statement: every program and every privileged user of a system should operate using **the least amount of privilege necessary to complete the job** — no more.
> - Applied to AI agents, this principle needs a new layer of specificity, because an agent's "job" isn't a static task — it can encompass many different kinds of action, from merely reading data to autonomously executing a transaction. This is exactly why a tiered permission model — not a single on/off switch — is the right approach.
> - A practical tiered model has four levels: **Read** → **Request** (draft an action, not sent) → **Recommend** (a suggestion with reasoning attached, needs confirmation) → **Execute** (self-execute within a pre-approved threshold). Each tier corresponds to a different level of risk and needs a different level of oversight.
> - Failing to apply this principle systematically is exactly the root of the **Excessive Agency** risk — which climbed from position LLM06 to LLM03 in the OWASP Top 10 for LLM Applications 2026, in a single year.
> - Designing a permission model for an AI agent isn't a policy document — it needs to be enforced at the technical level, tied to a mechanism that clearly defines which agent, what permission, for what task, valid until when.

---

Having established in article 6.11 that authority needs to be granted explicitly, separate from a model's capability, the next question is a practical one: **how should that authority actually be designed?**

The answer doesn't need to be invented from scratch — it's existed in computer science for half a century, under the name **least privilege**. This article applies that principle concretely to the enterprise AI agent context.

---

## What Least Privilege Means

![Two horizontal bars: broad access across the full width above; least privilege, much shorter, below.](~/assets/images/insights/least-privilege-ai-agent/alp-01-broad-vs-minimal-en.svg)

**Claim:** The least-privilege principle states that an entity (a program, a user, or — in today's context — an AI agent) should only be granted exactly the amount of authority needed to complete its assigned task, no more.

This principle was formally presented in "The Protection of Information in Computer Systems" (Saltzer & Schroeder, Proceedings of the IEEE, 1975) — one of the most foundational works in information security, published a full decade before the first U.S. Department of Defense computer security standard (the Orange Book, 1985). The original statement: **"every program and every privileged user of the system should operate using the least amount of privilege necessary to complete the job."**

The underlying rationale for this principle isn't to prevent deliberate malicious behavior — more precisely, it's to **limit the damage that can result from accident or error**. This is an important point to emphasize: least privilege doesn't assume the granted entity has bad intent — it simply acknowledges that mistakes can always happen, and designs the system so a mistake can't spread beyond a necessary scope.

Saltzer and Schroeder also proposed an important complementary principle: **"complete mediation"** — every access to every object must be checked for authority, with no exception based on having "already checked once before." Applied to an AI agent, this means: authority needs to be verified at each specific action, not just once when the agent is initialized.

---

## Why This Applies to AI Agents

![Three numbered cards: broad access, many steps in sequence, and data and actions blurring together.](~/assets/images/insights/least-privilege-ai-agent/alp-02-three-traits-en.svg)

The least-privilege principle was born for traditional computer systems, but three traits of AI agents make applying it more urgent, if no less important:

**1. AI agents are often granted broad access "to flexibly handle any situation"** — precisely the opposite of the least-privilege spirit. Because an agent needs to handle situations that can't all be enumerated in advance, there's a natural pull toward granting broad rather than narrow permissions, to avoid the agent getting "stuck" for lack of authority. This is exactly the mechanism that leads to Excessive Agency risk.

**2. The consequence of violating this principle with an AI agent is more severe than with traditional software**, because an agent can autonomously execute multiple consecutive steps — a permission flaw can be exploited across several steps before it's caught, not just once.

**3. The boundary between "data to read" and "actions permitted" is more easily blurred with an AI agent**, because an agent processes natural language and tends to treat content in its context as potentially instructive — making it both more important, and no less difficult, to clearly delineate permission tiers.

The trend has already been documented: the **Excessive Agency** risk climbed from position LLM06 to LLM03 in "OWASP Top 10 for LLM Applications 2026" within a single year — reflecting exactly the failure to apply least privilege systematically as the pace of AI agent deployment accelerates.

---

## Example Permission Tiers: Read / Request / Recommend / Execute

![Four ascending columns labelled Read, Request, Recommend and Execute, each with a short description.](~/assets/images/insights/least-privilege-ai-agent/alp-03-four-tiers-en.svg)

One practical way to apply least privilege to an AI agent is to design a four-tier model, instead of a binary "has permission" or "doesn't."

**Tier 1 — Read.** The agent can query and read data to support analysis or answer questions, but has no ability to change anything. This is the lowest-risk tier, fitting most information-synthesis, lookup, or classification tasks.

**Tier 2 — Request.** The agent can draft a specific action — an email, an order, a record update — but that action stays in a draft state, not sent or executed. A person reviews the full content before deciding.

**Tier 3 — Recommend.** The agent doesn't just draft a proposal — it produces a specific recommendation with reasoning attached — but the final decision still rests with an independent confirmation point, per the decision/execution boundary.

**Tier 4 — Execute.** The agent is authorized to self-execute an action without confirming each time, but only within a threshold pre-approved by a person: most repetitive, low-value cases with clear precedent go straight to action; cases exceeding the threshold automatically drop back to Tier 3.

![Two example cards: internal reminder email at the Execute tier; editing financial records at the Request tier.](~/assets/images/insights/least-privilege-ai-agent/alp-04-one-agent-tiers-en.svg)

These four tiers aren't fixed for an entire agent — they should be assigned separately for **each type of action** an agent can take. The same agent might sit at Tier 4 for sending an internal reminder email, but only at Tier 2 for editing a financial record.

---

## Designing a Permission Model

![Four numbered step cards in order; the step to check at every action is highlighted.](~/assets/images/insights/least-privilege-ai-agent/alp-05-four-steps-en.svg)

To move from principle to practice, four concrete steps:

**1. List every type of action an agent can take**, rather than treating "the agent's permissions" as a single block.

**2. Assign each action to one of the four tiers**, based on the severity of consequence and reversibility if that action goes wrong — not based on whether the agent "seems trustworthy enough."

**3. Enforce permission checking at each specific action** (Saltzer & Schroeder's "complete mediation" principle), not just once when the agent is configured — meaning the system needs to re-verify authority scope every time the agent attempts an action.

**4. Review periodically and retain the ability to revoke**, keeping the authority-evaluation process entirely separate from the capability-evaluation process.

---

## Conclusion

Least privilege isn't a new concept that needs inventing for AI — it's a security design principle validated over 50 years, now needing to be deliberately applied to a new kind of entity. The four-tier model — Read, Request, Recommend, Execute — is one way to make that principle concrete for AI agents, helping companies avoid today's most common trend: granting broad access for convenience, then discovering the real scope of risk only after an incident.

---

*This article is part of the OKELAS AI Control series.*

**Related articles:**
- [AI Needs Authority, Not Just Intelligence: The Dimension Most Organizations Miss](/en/insights/ai/ai-authority-vs-intelligence)
- [AI Needs a Control Layer: What Lives Between the Agent and Your Organization](/en/insights/ai/enterprise-ai-control-layer-architecture)
- [How Far Should AI Be Allowed to Go? The Enterprise Case for an AI Control Layer](/en/insights/ai/enterprise-ai-control-layer)

**→ [AI Readiness Assessment](/en/readiness/ai)**
