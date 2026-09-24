---
title: "Least Privilege for AI Agents: Designing Authority That Matches the Task"
slug: "least-privilege-ai-agent"
language: "en"
translationKey: "article-6-12-least-privilege"
type: "analysis"
cluster: "ai-control"
parentPillar: "enterprise-ai-control-layer"
funnelStage: ["consideration"]
audience: ["CIO", "IT Architect", "Security"]
date: 2026-09-23
draft: true
seo:
  title: "Least Privilege for AI Agents: How to Design Authority Boundaries"
  description: "An AI agent should only be granted the minimum permissions needed for a specific task — nothing more. Here's how the principle of least privilege applies to AI agents and how to implement it in enterprise environments."
  primaryKeyword: "least privilege AI agent"
  secondaryKeywords:
    - "AI agent permission model"
    - "limiting AI agent access"
    - "AI agent authorization design"
    - "AI access control principle"
  searchIntent: "Consideration — IT architects designing permission frameworks for AI agents"
cta:
  primary: "AI Readiness Assessment"
  secondary: "Contact OKELAS"
relatedInternalLinks:
  - "enterprise-ai-control-layer" # Pillar 6, parent
  - "ai-authority-vs-intelligence" # article 6.11, previous
  - "ai-control-layer-solution" # article 6.13 (proposed), next
  - "ai-agent-decision-workflow-execution" # article 5.14, cross-cluster
  - "ai-readiness-assessment"
evidenceSources:
  - "Jerome Saltzer & Michael Schroeder, \"The Protection of Information in Computer Systems,\" Proceedings of the IEEE, 1975"
  - "OWASP GenAI Security Project, \"OWASP Top 10 for LLM Applications 2026\" — Excessive Agency"
---

## Executive Summary

- Least privilege is one of the oldest and most thoroughly validated security design principles in computer science — formally presented by Jerome Saltzer and Michael Schroeder in 1975, in one of the foundational works of information security. The original statement: every program and every privileged user of a system should operate using **the least amount of privilege necessary to complete the job** — no more.
- Applied to AI agents, this principle needs a new layer of specificity, because an agent's "job" isn't a static task — it can encompass many different kinds of action, from merely reading data to autonomously executing a transaction. This is exactly why a tiered permission model — not a single on/off switch — is the right approach.
- A practical tiered model has four levels: **Read** → **Request** (draft an action, not sent) → **Recommend** (a suggestion with reasoning attached, needs confirmation) → **Execute** (self-execute within a pre-approved threshold). Each tier corresponds to a different level of risk and needs a different level of oversight.
- Failing to apply this principle systematically is exactly the root of the **Excessive Agency** risk — which climbed from position LLM06 to LLM03 in the OWASP Top 10 for LLM Applications 2026, in a single year.
- Designing a permission model for an AI agent isn't a policy document — it needs to be enforced at the technical level, tied to a mechanism that clearly defines which agent, what permission, for what task, valid until when.

---

## Opening

Having established in article 6.11 that authority needs to be granted explicitly, separate from a model's capability, the next question is a practical one: **how should that authority actually be designed?**

The answer doesn't need to be invented from scratch — it's existed in computer science for half a century, under the name **least privilege**. This article applies that principle concretely to the enterprise AI agent context.

---

## What Least Privilege Means

**Claim:** The least-privilege principle states that an entity (a program, a user, or — in today's context — an AI agent) should only be granted exactly the amount of authority needed to complete its assigned task, no more.

This principle was formally presented in "The Protection of Information in Computer Systems" (Saltzer & Schroeder, Proceedings of the IEEE, 1975) — one of the most foundational works in information security, published a full decade before the first U.S. Department of Defense computer security standard (the Orange Book, 1985). The original statement, based on Saltzer's earlier 1970 notes: **"every program and every privileged user of the system should operate using the least amount of privilege necessary to complete the job."**

The underlying rationale for this principle isn't to prevent deliberate malicious behavior — more precisely, it's to **limit the damage that can result from accident or error**. This is an important point to emphasize: least privilege doesn't assume the granted entity has bad intent — it simply acknowledges that mistakes can always happen, and designs the system so a mistake can't spread beyond a necessary scope.

Saltzer and Schroeder also proposed an important complementary principle: **"complete mediation"** — every access to every object must be checked for authority, with no exception based on having "already checked once before." Applied to an AI agent, this means: authority needs to be verified at each specific action, not just once when the agent is initialized.

---

## Why This Applies to AI Agents

The least-privilege principle was born for traditional computer systems, but three traits of AI agents make applying it more urgent, if no less important:

**1. AI agents are often granted broad access "to flexibly handle any situation"** — precisely the opposite of the least-privilege spirit. Because an agent needs to handle situations that can't all be enumerated in advance (as covered in the articles on agentic workflow), there's a natural pull toward granting broad rather than narrow permissions, to avoid the agent getting "stuck" for lack of authority. This is exactly the mechanism that leads to Excessive Agency risk.

**2. The consequence of violating this principle with an AI agent is more severe than with traditional software**, because an agent can autonomously execute multiple consecutive steps (as covered in article 6.3, on the Thought-Action-Observation loop) — a permission flaw can be exploited across several steps before it's caught, not just once.

**3. The boundary between "data to read" and "actions permitted" is more easily blurred with an AI agent**, because an agent processes natural language and tends to treat content in its context as potentially instructive (covered in articles 6.6 and 6.8) — making it both more important, and no less difficult, to clearly delineate permission tiers.

The trend has already been documented: the **Excessive Agency** risk climbed from position LLM06 to LLM03 in "OWASP Top 10 for LLM Applications 2026" within a single year — reflecting exactly the failure to apply least privilege systematically as the pace of AI agent deployment accelerates.

---

## Example Permission Tiers: Read / Request / Recommend / Execute

One practical way to apply least privilege to an AI agent is to design a four-tier model, instead of a binary "has permission" or "doesn't."

**Tier 1 — Read.** The agent can query and read data to support analysis or answer questions, but has no ability to change anything. This is the lowest-risk tier, fitting most information-synthesis, lookup, or classification tasks covered in Pillar 5 (articles 5.10, 5.11).

**Tier 2 — Request.** The agent can draft a specific action — an email, an order, a record update — but that action stays in a draft state, not sent or executed. A person reviews the full content before deciding.

**Tier 3 — Recommend.** The agent doesn't just draft a proposal — it produces a specific recommendation with reasoning attached, based on what data, what precedent (exactly the "recommend" function covered in article 5.10) — but the final decision still rests with an independent confirmation point, per the decision/execution boundary covered in article 5.14.

**Tier 4 — Execute.** The agent is authorized to self-execute an action without confirming each time, but only within a threshold pre-approved by a person — exactly the Event → Action model covered in Pillar 5 (article 5.9): most repetitive, low-value cases with clear precedent go straight to action; cases exceeding the threshold automatically drop back to Tier 3.

These four tiers aren't fixed for an entire agent — they should be assigned separately for **each type of action** an agent can take. The same agent might sit at Tier 4 for sending an internal reminder email, but only at Tier 2 for editing a financial record.

---

## Designing a Permission Model

To move from principle to practice, four concrete steps:

**1. List every type of action an agent can take**, rather than treating "the agent's permissions" as a single block — exactly the approach covered in article 5.15, on breaking down decisions before classifying them.

**2. Assign each action to one of the four tiers**, based on the severity of consequence and reversibility if that action goes wrong — exactly the authorization questions covered in article 6.9, not based on whether the agent "seems trustworthy enough."

**3. Enforce permission checking at each specific action** (exactly Saltzer & Schroeder's "complete mediation" principle), not just once when the agent is configured — meaning the system needs to re-verify authority scope every time the agent attempts an action, not assume previously granted authority still applies.

**4. Review periodically and retain the ability to revoke**, exactly as covered in article 6.11, on separating the authority-evaluation process from the capability-evaluation process.

This is also exactly why a separate architectural mechanism — like KVM, covered at the start of Pillar 6 — has real value for the Read tier: forcing every agent access to organizational knowledge through defined operations (Trace, FindEvidence, Resolve) instead of letting an agent freely access raw data, making "complete mediation" at the data-read level technically achievable, not just a policy on paper.

---

## Conclusion

Least privilege isn't a new concept that needs inventing for AI — it's a security design principle validated over 50 years, now needing to be deliberately applied to a new kind of entity. The four-tier model — Read, Request, Recommend, Execute — is one way to make that principle concrete for AI agents, helping companies avoid today's most common trend: granting broad access for convenience, then discovering the real scope of risk only after an incident.

## Next Step

For a specific AI agent your company operates, list every type of action it can take and assign each to one of the four tiers — Read/Request/Recommend/Execute. If most of its actions sit at Tier 4 without having gone through a clear consequence/reversibility assessment, that's where to focus first. Take the **AI Readiness Assessment** for a fuller evaluation, or contact the OKELAS team to discuss designing a permission model suited to your company's systems.
