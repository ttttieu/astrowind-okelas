---
title: "The Tiger Tally Problem: Why a Valid Signature Doesn't Explain a Decision"
description: "A digital signature proves who signed and that nothing changed. It doesn't show why. What an ancient tiger tally teaches manufacturers about decision audit trails."
publishDate: 2026-10-24T03:00:00Z
translationId: ho-phu-quyet-dinh-chi-dau
lang: en
category: trending
contentType: Analysis
funnelStage: [Understanding]
audience: [CEO, COO, Quality Director]
primaryKeyword: "decision audit trail"
secondaryKeywords: [audit trail vs digital signature, decision traceability, approval audit trail, organizational memory]
ctaPrimaryText: "Assess Your Knowledge Readiness"
ctaSubtitle: "Evaluate your organization's knowledge infrastructure."
assessmentHref: /en/readiness/knowledge
draft: false
---

When two records "tally", they match. The word comes from a very physical practice. For centuries, the English Exchequer recorded debts on wooden sticks that were notched and then split lengthwise. One half went to each party. When the debt was settled, the halves were put back together: if they fitted, they tallied.

Halfway across the world, and much earlier, Chinese rulers used the same idea to control armies. Their version was a bronze tiger split in two.

Both are early answers to a question every organization still faces: *how do we know an instruction is genuine?* Today the answer is usually a digital signature. But in a manufacturing business, especially one that is audited, a second question matters just as much, and it is the one signatures were never designed to answer: *why was this decision made?*

> **Executive summary**
>
> - Tiger tallies and digital signatures share a principle — verification through two matching parts — but not a technology.
> - A digital signature tells you who signed and whether the document changed afterwards. It does not tell you why they signed or what evidence they relied on.
> - A famous story from China's Warring States period shows a perfectly matching tally carrying an order the ruler never gave.
> - Organizations need a third layer: a traceable history of how decisions are formed. That is organizational memory, not just a system log.
> - A seven-question self-check at the end helps you see how much your company actually remembers about its own decisions.

## How a tiger tally worked

A tiger tally (*hufu*, 虎符) was a small bronze tiger cut lengthwise into two halves, with interlocking pins and notches on the inner faces. The ruler kept one half. A garrison commander kept the other. An order to mobilize troops was carried by an envoy along with the ruler's half; the commander fitted it against his own. If the halves interlocked, he obeyed.

One surviving example, the **Du tiger tally** from the state of Qin, was found near Xi'an in 1975 and is among the earliest military tallies known. Its 40-character gold-inlaid inscription reads, roughly:

> Tally for armoured troops: the right half is with the ruler, the left half at Du. Whenever soldiers are raised in armour and more than fifty men are deployed, the ruler's tally must be matched before acting. In the event of a beacon-fire alarm, one may act even without matching the tally.

Read it as a manager would, and it is a **delegation-of-authority policy**. Below fifty soldiers, the local commander decides. Above fifty, central authorization is required. In an emergency, act first and verify later. Thresholds, approval levels and exceptions — the same elements that appear in a modern approval matrix.

## From two halves of a tiger to a key pair

A digital signature also relies on a matched pair. As NIST's Digital Signature Standard (FIPS 186-5) describes it, only the holder of the private key can generate a signature, while anyone with the corresponding public key can verify it.

The parallel with the tiger tally is tempting: one part to issue, one part to check, and the two only work together. But the analogy breaks in three important places:

| | Tiger tally | Digital signature |
|---|---|---|
| The issuing part | The ruler's half **travelled** with the envoy | The private key **stays** with the signer; only the signature travels |
| The checking part | The commander's half was also **secret** | The public key is **published** so anyone can verify |
| Link to the content | None. The tally proved the envoy carried authority, not what the order said | Direct. The signature is computed from the document; change one word and it fails |

So the accurate claim is this: **the tiger tally and the digital signature share a principle of verification by corresponding parts, not an algorithm.** A digital signature fixes weaknesses the tally had. The first of them — the ruler's half had to travel — is exactly where history left a revealing story.

## When the tally matches but the decision is wrong

In 257 BCE, Qin forces besieged Handan, capital of the state of Zhao. According to Sima Qian's *Records of the Grand Historian*, King Anxi of Wei sent his general Jin Bi with 100,000 troops to help — then, under threat from Qin, ordered him to halt at Ye and wait.

The king's half-brother, Lord Xinling, wanted to save Zhao. On the advice of his retainer Hou Ying, he had the king's favourite consort steal the royal half of the tally. Hou Ying also insisted he bring Zhu Hai, a butcher of great strength, in case the general refused.

At Ye, Jin Bi fitted the halves together. **They matched perfectly.** Yet he hesitated: why would the king send a nobleman with a small retinue to take over a large army at the frontier? Zhu Hai killed him on the spot, and Lord Xinling took command and broke the siege.

(A note on sources: the episode comes from Sima Qian's account; some historians observe that it does not appear in the earlier *Strategies of the Warring States*, so it is best read as historical narrative rather than a precise record.)

Set the moral question aside and look at the mechanism:

- **The tally authenticated the token, not the ruler's intent.** The king never gave that order.
- **Jin Bi's doubt came from context, not from the token.** The order didn't fit the situation. But he had no way to check who had proposed it, what intelligence it rested on, or what the king had considered.
- **With authentication but no context, the person executing an order has to choose between trusting the token and trusting their instinct.** Jin Bi trusted his instinct and lost his life.

Now replace "tally" with "signing token". A digital signature proves that someone's private key was used to sign a specific document, and that the document has not changed since. It does not prove the person read the document, understood it, relied on correct data, or weighed the risks. If the token or smart card is handed to an assistant to "sign on my behalf", the signature is still technically valid.

A question worth asking in your own company: whose desk drawer is the signing token actually in?

## The third question every organization has to answer

The three layers can be compared by the questions each can and cannot answer:

| Layer | Answers | Cannot answer |
|---|---|---|
| Tiger tally | Does the messenger carry the authority's token? | Did the authority actually give this order? |
| Digital signature | Who signed? Has the document changed since? | Why did they sign? On what evidence? Who proposed and who reviewed? |
| Decision history | Where the decision started, what it relied on, who was involved, and what actions and results followed | — |

The third layer does not replace digital signatures. You still need them to authenticate signers and protect document integrity. The third layer **puts the signature in context**.

In regulated industries, part of this is already mandatory. FDA's 21 CFR Part 11, section 11.10(e), requires secure, computer-generated, time-stamped audit trails that independently record the date and time of operator entries and actions that create, modify or delete electronic records. Read closely, that requirement is about **how records changed**. The reasoning behind a decision usually sits in other processes — change control, deviation handling — and just as often in email threads, chat messages and meetings with no minutes.

### An illustrative scenario

*The scenario below is hypothetical, not a customer case.*

A seafood processing plant receives a batch of raw material with one parameter slightly above its internal specification. An export order is due. The plant director signs a conditional acceptance.

If the company keeps only **the signed acceptance form**, two years later it knows who signed, when, and that the form wasn't altered.

If it keeps **the decision history**, it also knows:

1. **Request** — QC flagged the deviation; who raised it and when.
2. **Evidence** — the initial test result, the retest, the supplier's certificate of analysis.
3. **Assessment** — QA's risk evaluation for the finished product and the conditions it proposed.
4. **Decision** — the director accepted the exception, conditional on increased finished-goods testing.
5. **Action** — the inspection plan was adjusted; the supplier was flagged.
6. **Result** — whether the finished batch passed, and whether any complaint followed.

When the same supplier has the same problem again, the new QA manager doesn't have to chase people for the backstory. When an auditor asks, the answer doesn't depend on who still works there.

The Du tally allowed action before verification when the beacon fires were lit. Modern operations need exceptions too — real work never follows procedure 100% of the time. The difference is that **an exception should leave a trace of its reasoning**. Otherwise it quietly becomes an unwritten procedure that nobody remembers starting.

## From system logs to organizational memory

Three terms are often used interchangeably:

| Term | What it records | Who it serves |
|---|---|---|
| System log | Technical events: logins, errors, access | IT |
| Record audit trail | Who created, changed or deleted which record, when, with before/after values | Quality and compliance |
| Decision history | Request → evidence → assessment → approval → action → result | Leadership, successors, auditors |

The third is what turns operational data into **organizational memory**. It matters in three situations every leadership team will face:

**When key people leave.** The company keeps their signatures but rarely their reasons. Successors inherit outcomes without the thinking behind them.

**When leadership changes hands.** In founder-led and family businesses, much of the operating logic lives in a few people's heads. Signatures are the most visible and smallest part of that logic.

**When AI enters the workflow.** If an AI assistant summarizes records, suggests approvals or drafts deviation reports, "what did the AI base this on?" becomes as important as "who signed?". AI doesn't reduce the need for traceability. It increases it.

## How OKELAS approaches this

OKELAS is built as an Organization Knowledge Operating System. Its approach starts from a chain: **Process → Workflow → Event → Evidence → Knowledge → Decision → Action**.

In that view, an approval is not just a signature on a file. It is an **organizational event**, linked to the process it belongs to, the evidence it relied on, the people involved, and the actions that followed. Digital signatures still do their job of authenticating the signer; OKELAS aims to keep the context that a signature cannot carry on its own.

Put simply:

> A tally authenticated the order. A digital signature authenticates the signer. A mature organization also needs to remember how the decision was made.

## Self-check: how much does your company remember about its own decisions?

Pick one significant decision from the last 12 months — a quality exception, a supplier switch, a process change — and ask:

1. Can you find who **proposed** it without asking someone?
2. Can you find the **evidence** (data, test results, quotes) the approver looked at?
3. Do you know which **alternatives** were considered, and why they were rejected?
4. If it was an **exception** to procedure, is the reason recorded?
5. Can you trace the **actions** taken afterwards and their results?
6. If the approver **left tomorrow**, would their successor understand the reasoning?
7. Are digital signatures in your company actually used **by the people who hold the authority**?

If several answers are "no" or "I'd have to ask a specific person", the gap may not be missing signatures or missing software. It may be that knowledge about decisions lives in people rather than in the organization.

## Conclusion

Most companies don't lack signatures. Their files are full of them. What they lack is **a memory of why they signed**.

Jin Bi held a perfectly matching tally and still couldn't tell whether the order was real. Two thousand years later, our verification tools are vastly better. The question of decision context is still wide open.
