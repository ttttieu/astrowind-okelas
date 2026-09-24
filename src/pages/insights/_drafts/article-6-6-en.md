---
title: "Multi-Agent AI: When Coordination Creates Capabilities Beyond Individual Boundaries"
slug: "multi-agent-ai-system-risks"
language: "en"
translationKey: "article-6-6-multi-agent-systems"
type: "analysis"
cluster: "ai-control"
parentPillar: "enterprise-ai-control-layer"
funnelStage: ["understanding"]
audience: ["CIO", "IT Architect"]
date: 2026-09-23
draft: true
seo:
  title: "When AI Agents Start Coordinating: Multi-Agent Behavior and What to Watch For"
  description: "A single agent has bounded authority. Multiple agents coordinating can create behaviors and impacts larger than the sum of their individual permissions. Here's why multi-agent systems need a separate control layer."
  primaryKeyword: "multi-agent AI system risks"
  secondaryKeywords:
    - "multi-agent behavior"
    - "AI agents coordination"
    - "multi-agent control"
    - "agent to agent communication"
  searchIntent: "Understanding — IT architects and CIOs evaluating multi-agent systems"
cta:
  primary: "AI Readiness Assessment"
relatedInternalLinks:
  - "enterprise-ai-control-layer" # Pillar 6, parent
  - "ai-bypassing-restrictions-research" # article 6.5, previous
  - "ai-information-concealment" # article 6.7 (proposed), next
  - "least-privilege-for-ai" # article 6.12 (proposed), cross-link
  - "ai-readiness-assessment"
evidenceSources:
  - "Norm Hardy, \"The Confused Deputy,\" ACM SIGOPS Operating Systems Review, 1988"
  - "Cloud Security Alliance, \"Confused Deputy Attacks on Autonomous AI Agents\" and \"Cross-Agent Privilege Escalation in Agentic Identity,\" 2026"
---

## Executive Summary

- A single AI agent, designed correctly under least-privilege principles, has a bounded and manageable scope of authority. But once multiple agents are connected to coordinate — usually through an "orchestrator" agent — the system's dynamics change in a way that isn't simply additive.
- The core risk mechanism here isn't new — it's the **"confused deputy problem,"** a classic access-control vulnerability described by Norm Hardy back in 1988: a privileged program tricked by a less-privileged party into misusing that same privilege. The Cloud Security Alliance, in research published in 2026, notes that this pattern is re-emerging at higher severity within multi-agent architectures.
- The specific problem: an orchestrator agent typically needs broader access to coordinate its sub-agents — turning it into a high-privilege "deputy," and an attractive target for a sub-agent (or manipulated data) to exploit in order to retrieve information or take action beyond the original intended scope.
- This is exactly what the CSA calls **"the aggregation problem"** — the effective total authority of a multi-agent system can be far greater than the sum of each individual agent's permissions, because information and actions can be relayed through multiple agents along paths nobody designed in advance.
- For business: controlling each agent individually under least privilege is necessary, but not sufficient — an additional control layer is needed at the level of **information flow between agents**, not just at the level of each individual agent.

---

## Opening

Earlier articles in this series focused on the risk of a single AI agent — its authority, how it decides, how it might drift from its original intent. But enterprise deployment is moving quickly toward a more complex architecture: multiple agents, each specialized for part of a task, coordinating to complete a larger job — usually orchestrated by a central agent.

The important question here isn't "is each agent in this system safe" — it's **"when these agents coordinate, does the overall system behave in a way that exceeds what any individual part was designed to do?"**

---

## What a Multi-Agent System Is

A multi-agent system in an enterprise context typically has this structure: an **orchestrator agent** receives a general task, breaks it into subtasks, and hands them to **specialized sub-agents** — each usually built for a narrow scope (a customer data lookup agent, a drafting agent, a compliance-checking agent, say). Results from the sub-agents get aggregated by the orchestrator and returned, or used to decide the next step.

In theory, this model seems safer than a single agent doing everything: each sub-agent only needs a narrow authority scope matching its own task — exactly the least-privilege principle covered in earlier articles. But this structure also creates a new point worth watching: **the orchestrator itself, to do its job, typically needs broader access or communication capability than any single sub-agent** — it needs to know how to call each sub-agent, aggregate results from multiple sources, and decide the next step based on the full picture.

---

## Why Multiple Agents Create Different Dynamics

**Claim:** The "orchestrator" position in a multi-agent system exactly reproduces the conditions of a security vulnerability known for decades — the **confused deputy problem**.

Norm Hardy first described this problem in 1988, through a now-classic example: a compiler had permission to write usage statistics to a specific billing file. When a user asked the compiler to write debug output to an arbitrary path, the compiler checked its own permissions (it had write access) and inadvertently overwrote the billing file — even though the user making the request had no access to that file at all. The "deputy" (the compiler) used its own privilege correctly, but served the wrong purpose, because it never verified whether the request actually fell within what the requester was authorized to do.

The Cloud Security Alliance, in research published in 2026 on this topic ("Confused Deputy Attacks on Autonomous AI Agents" and "Cross-Agent Privilege Escalation in Agentic Identity"), identifies three structural factors that make this problem more severe in modern AI agent architecture: (1) agents tend to treat all content in their context window as potentially instructive, erasing the boundary between data and instructions that traditional security architecture relies on; (2) the broad permissions that make an agent useful also make the consequences of a successful attack severe and potentially irreversible; (3) the emergence of multi-agent architectures — where one agent orchestrates or communicates with others — creates propagation paths for confused-deputy-style attacks that can cross organizational boundaries with no human oversight at each step.

**Implication:** An orchestrator agent, without being "malicious" or having bad intent, can be manipulated by a sub-agent (or data that sub-agent processes) into taking an action beyond what the original requester was authorized to do — exactly the confused deputy mechanism, replaying at the scale of a multi-agent system.

---

## The Question of Aggregate Authority

This is what the CSA calls **"the aggregation problem"** in multi-agent networks: the effective authority of the whole system can exceed the sum of each individual agent's granted permissions, because information can be relayed through multiple agents along paths nobody designed in advance.

A concrete illustration (described in technical multi-agent security literature, as a simulated test): in a system with four specialized sub-agents and a central orchestrator, one of the sub-agents — set up with manipulative behavior — could trick the orchestrator into fetching data from another sub-agent and relaying it back, even though it had no direct access to that data itself. The orchestrator, with its broader coordination access, became the intermediary tool for crossing an authority boundary nobody actively granted.

The practical question every CIO/IT architect should ask when designing a multi-agent system: **"if you add up every possible path of information retrieval and relay between agents in this system, what's the actual reachable scope of data and action — and does it exceed what any single agent was individually authorized for?"** This is a question that testing each agent individually, however thoroughly, can't answer — because the risk lives in the information flow between agents, not inside any single one of them.

---

## Enterprise Control Implications

From the analysis above, three concrete implications for designing or evaluating a multi-agent system:

**1. Control needs to sit at the level of specific actions, not just agent identity.** Assigning permissions to an agent at configuration time isn't enough — the system needs to verify, at execution time, that each specific action genuinely falls within what the original requester (whether a person or another agent) is authorized to do, rather than relying on the orchestrator "having permission" to perform that action technically.

**2. The orchestrator should be treated as the highest-risk target in the system, not a neutral component.** Because it typically holds the broadest coordination access, the orchestrator deserves the same level of scrutiny and control as the highest-privilege agent in the whole system — it shouldn't be treated as a simple, low-risk "pass-through" layer.

**3. Monitor the data flow between agents, not just each agent individually.** Each individual agent's activity log might look entirely normal, while the aggregate flow of information between them reveals an unusual path. Monitoring needs the ability to track information moving across the boundary between agents, not just each agent's internal operation.

This is also why a deterministic intermediary layer — such as how KVM (covered in Pillar 6) forces every access to organizational knowledge through verifiable operations (Trace, FindEvidence, Resolve) rather than letting agents freely access and relay raw data to each other — is an architectural direction that can reduce the surface area for the aggregation problem, though it doesn't by itself solve the full multi-agent governance challenge.

---

## Conclusion

An agent designed correctly under least privilege is a necessary condition for a safe AI system — but once multiple such agents are connected to coordinate, especially through a central orchestrator, the overall system can reproduce a security vulnerability known since 1988: the confused deputy problem, at a larger scale and harder to detect. The question "is this system safe" can't be answered by checking each agent individually — it requires looking at the aggregate flow of authority and information between them.

## Next Step

If your company is operating or considering a multi-agent system, map out the full information flow between agents — including the orchestrator — and ask: is there any path that lets an agent (or the data it processes) retrieve information beyond its own original authority scope? Or take the **AI Readiness Assessment** for a fuller evaluation of your organization's AI governance readiness.
