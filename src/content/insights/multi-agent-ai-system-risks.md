---
title: "Multi-Agent AI: When Coordination Creates Capabilities Beyond Individual Boundaries"
description: "A single agent has bounded authority. Multiple agents coordinating can create behaviors and impacts larger than the sum of their individual permissions. Here's why multi-agent systems need a separate control layer."
publishDate: 2026-09-23T00:00:00Z
coverImage: '~/assets/images/insights/multi-agent-ai-system-risks/amas-00-og-cover-en.png'
ogImage: '~/assets/images/insights/multi-agent-ai-system-risks/amas-00-og-cover-en.png'
coverImageAlt: "On the left, three agents with narrow permissions; on the right, a larger effective-authority block, joined by a dashed arrow labelled can exceed the sum."
translationId: article-6-6-multi-agent-systems
lang: en
category: ai
contentType: Analysis
funnelStage:
  - Understanding
audience:
  - CIO
primaryKeyword: "multi-agent AI system risks"
secondaryKeywords:
  - "multi-agent behavior"
  - "AI agents coordination"
  - "multi-agent control"
  - "agent to agent communication"
assessmentHref: /en/readiness/ai
ctaPrimaryText: 'Assess your AI readiness'
ctaSubtitle: 'Identify your AI readiness level'
draft: false
---

---

> **Executive Summary**
>
> - A single AI agent, designed correctly under least-privilege principles, has a bounded and manageable scope of authority. But once multiple agents are connected to coordinate — usually through an "orchestrator" agent — the system's dynamics change in a way that isn't simply additive.
> - The core risk mechanism here isn't new — it's the **"confused deputy problem,"** a classic access-control vulnerability described by Norm Hardy back in 1988: a privileged program tricked by a less-privileged party into misusing that same privilege. The Cloud Security Alliance, in research published in 2026, notes that this pattern is re-emerging at higher severity within multi-agent architectures.
> - The specific problem: an orchestrator agent typically needs broader access to coordinate its sub-agents — turning it into a high-privilege "deputy," and an attractive target for a sub-agent (or manipulated data) to exploit in order to retrieve information or take action beyond the original intended scope.
> - This is exactly what the CSA calls **"the aggregation problem"** — the effective total authority of a multi-agent system can be far greater than the sum of each individual agent's permissions, because information and actions can be relayed through multiple agents along paths nobody designed in advance.
> - For business: controlling each agent individually under least privilege is necessary, but not sufficient — an additional control layer is needed at the level of **information flow between agents**.

---

Earlier articles in this series focused on the risk of a single AI agent — its authority, how it decides, how it might drift from its original intent. But enterprise deployment is moving quickly toward a more complex architecture: multiple agents, each specialized for part of a task, coordinating to complete a larger job — usually orchestrated by a central agent.

The important question here isn't "is each agent in this system safe" — it's **"when these agents coordinate, does the overall system behave in a way that exceeds what any individual part was designed to do?"**

---

## What a Multi-Agent System Is

![Diagram: a broad-access orchestrator connected down to three narrow-access sub-agents.](~/assets/images/insights/multi-agent-ai-system-risks/amas-01-orchestrator-en.svg)

A multi-agent system in an enterprise context typically has this structure: an **orchestrator agent** receives a general task, breaks it into subtasks, and hands them to **specialized sub-agents** — each usually built for a narrow scope (a customer data lookup agent, a drafting agent, a compliance-checking agent, say). Results from the sub-agents get aggregated by the orchestrator and returned, or used to decide the next step.

In theory, this model seems safer than a single agent doing everything: each sub-agent only needs a narrow authority scope matching its own task — exactly the least-privilege principle. But this structure also creates a new point worth watching: **the orchestrator itself, to do its job, typically needs broader access or communication capability than any single sub-agent** — it needs to know how to call each sub-agent, aggregate results from multiple sources, and decide the next step based on the full picture.

---

## Why Multiple Agents Create Different Dynamics

![Chain of three blocks: the user has no right, the compiler uses its own right, the billing file is overwritten; a note sits below.](~/assets/images/insights/multi-agent-ai-system-risks/amas-02-confused-deputy-en.svg)

The "orchestrator" position in a multi-agent system exactly reproduces the conditions of a security vulnerability known for decades — the **confused deputy problem**.

Norm Hardy first described this problem in 1988, through a now-classic example: a compiler had permission to write usage statistics to a specific billing file. When a user asked the compiler to write debug output to an arbitrary path, the compiler checked its own permissions (it had write access) and inadvertently overwrote the billing file — even though the user making the request had no access to that file at all. The "deputy" (the compiler) used its own privilege correctly, but served the wrong purpose, because it never verified whether the request actually fell within what the requester was authorized to do.

The Cloud Security Alliance, in research published in 2026 ("Confused Deputy Attacks on Autonomous AI Agents" and "Cross-Agent Privilege Escalation in Agentic Identity"), identifies three structural factors that make this problem more severe in modern AI agent architecture: (1) agents tend to treat all content in their context window as potentially instructive, erasing the boundary between data and instructions; (2) the broad permissions that make an agent useful also make the consequences of a successful attack severe; (3) multi-agent architectures create propagation paths that can cross organizational boundaries with no human oversight at each step.

An orchestrator agent, without being "malicious," can be manipulated by a sub-agent (or data that sub-agent processes) into taking an action beyond what the original requester was authorized to do — exactly the confused deputy mechanism, replaying at the scale of a multi-agent system.

→ *Related: [When AI Circumvents Its Limits: What Controlled Research Has Documented](/en/insights/ai/ai-bypassing-restrictions-research)*

---

## The Question of Aggregate Authority

![Three agents with their own permissions feed into one effective system-reach block, larger than the sum of its parts.](~/assets/images/insights/multi-agent-ai-system-risks/amas-03-aggregation-en.svg)

This is what the CSA calls **"the aggregation problem"** in multi-agent networks: the effective authority of the whole system can exceed the sum of each individual agent's granted permissions, because information can be relayed through multiple agents along paths nobody designed in advance.

The practical question every CIO/IT architect should ask: **"if you add up every possible path of information retrieval and relay between agents in this system, what's the actual reachable scope of data and action — and does it exceed what any single agent was individually authorized for?"** This is a question that testing each agent individually, however thoroughly, can't answer — because the risk lives in the information flow between agents, not inside any single one of them.

This is also why a deterministic intermediary layer — such as how KVM forces every access to organizational knowledge through verifiable operations (Trace, FindEvidence, Resolve) rather than letting agents freely access and relay raw data to each other — is an architectural direction that can reduce the surface area for the aggregation problem.

![Three agents enter a KVM block with three functions, Trace, FindEvidence, Resolve, then organizational knowledge.](~/assets/images/insights/multi-agent-ai-system-risks/amas-05-kvm-intermediary-en.svg)

→ *Related: [Least Privilege for AI Agents: Designing Authority That Matches the Task](/en/insights/ai/least-privilege-ai-agent)*

---

## Enterprise Control Implications

![Three numbered rows, each an implication for enterprise control.](~/assets/images/insights/multi-agent-ai-system-risks/amas-04-implications-en.svg)

From the analysis above, three concrete implications for designing or evaluating a multi-agent system:

**1. Control needs to sit at the level of specific actions, not just agent identity.** Assigning permissions to an agent at configuration time isn't enough — the system needs to verify, at execution time, that each specific action genuinely falls within what the original requester is authorized to do.

**2. The orchestrator should be treated as the highest-risk target in the system, not a neutral component.** Because it typically holds the broadest coordination access, the orchestrator deserves the same level of scrutiny and control as the highest-privilege agent in the whole system.

**3. Monitor the data flow between agents, not just each agent individually.** Each individual agent's activity log might look entirely normal, while the aggregate flow of information between them reveals an unusual path.

---

*This article is part of the OKELAS AI Control series.*

**Related articles:**
- [When AI Circumvents Its Limits: What Controlled Research Has Documented](/en/insights/ai/ai-bypassing-restrictions-research)
- [Least Privilege for AI Agents: Designing Authority That Matches the Task](/en/insights/ai/least-privilege-ai-agent)
- [How Far Should AI Be Allowed to Go? The Enterprise Case for an AI Control Layer](/en/insights/ai/enterprise-ai-control-layer)

**→ [AI Readiness Assessment](/en/readiness/ai)**
