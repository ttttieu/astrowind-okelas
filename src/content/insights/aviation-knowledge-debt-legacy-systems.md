---
title: "If US Aviation Managed Knowledge Better, How Many Billions Could It Save?"
description: "NOTAM, Newark and the November 2026 ground stop show how knowledge debt hides inside legacy systems. What it is, what it costs, and how preventive KM helps."
publishDate: 2026-11-23T00:30:00Z
image: '~/assets/images/insights/aviation-knowledge-debt-legacy-systems/tr-11-og-cover-en.png'
coverImage: '~/assets/images/insights/aviation-knowledge-debt-legacy-systems/tr-11-og-cover-en.png'
ogImage: '~/assets/images/insights/aviation-knowledge-debt-legacy-systems/tr-11-og-cover-en.png'
coverImageAlt: "Layers running from grounded flights down to a legacy system and knowledge the organization no longer holds; the question is how much knowledge debt has built up."
translationId: aviation-knowledge-debt
lang: en
category: trending
contentType: Analysis
funnelStage: [Understanding]
audience: [CEO, COO, CIO]
primaryKeyword: "knowledge debt"
secondaryKeywords: [legacy system risk, legacy system modernization, system dependency mapping, FAA NOTAM outage, institutional knowledge loss, disaster recovery testing, preventive knowledge management]
ctaPrimaryText: "Take the Knowledge Management Maturity Assessment"
ctaSubtitle: "Identify your maturity level and the first improvement to make"
assessmentHref: /en/readiness/knowledge
draft: false
---

The headline asks about money, so the honest answer comes first: **no public source quantifies how much of US aviation's disruption cost better knowledge management could have avoided.** Anyone offering a "saves X billion dollars" figure is offering one with no basis.

What does have a basis is worth a close read by any executive. In recent years, aging US aviation systems have repeatedly gone down, each time stranding thousands of flights. Behind those outages sits a risk that few balance sheets record: **an organization depends on systems it no longer fully understands.**

A note on scope. This article does **not** conclude that the incidents below were caused by poor knowledge management. The root cause of the most recent one is still under investigation. We use public incidents as situations for asking questions of other organizations, including factories and manufacturers with no connection to aviation.

> **Executive summary**
> - Disruption cost can be measured for some incidents (Delta estimated about $500 million over five days in 2024). The share caused by *missing knowledge* has not been measured by anyone, and this article does not invent it.
> - Software holds more than code. It also holds business rules, exception-handling experience and dependencies, often in a few people's heads.
> - **Knowledge debt** is the gap between what a system does and depends on, and what the organization can still explain, trace and rebuild. This is a discussion framework proposed by OKELAS.
> - Replacing old software with new does not clear the debt by itself. Without transferring business knowledge, understanding dependencies and keeping independent operating capability, a company only moves the debt from the old system to the new one.
> - Preventive knowledge management means five things: map dependencies, retain expert knowledge, keep a fallback, test recovery, and leave evidence after every change.

## Grounded flights: three incidents, one shared question

Here is what has been publicly recorded, separating what is confirmed from what is not.

![Three cards: the NOTAM outage of January 11, 2023, the Newark incident of April 28, 2025, and the nationwide ground stop of November 13, 2026 whose root cause is not yet published.](~/assets/images/insights/aviation-knowledge-debt-legacy-systems/tr11-01-three-incidents-en.svg)

*Figure 1. Three public incidents and what has been recorded about each.*

**January 11, 2023, the FAA's NOTAM system.** NOTAM delivers safety notices to pilots and flight planners. According to the Government Accountability Office, the system was over 30 years old, and the outage caused more than 1,300 cancellations and delayed almost 10,000 other flights. A preliminary FAA review found that contract personnel unintentionally deleted files while correcting synchronization between the primary and backup databases. The FAA said it had found no evidence of a cyber attack.

**April 28, 2025, Newark.** Controllers lost radar and radio contact with aircraft for roughly 60 to 90 seconds. Reports tied the failure to an older copper wire in a telecommunications line, and CNN reported more than a thousand canceled flights afterward.

**November 13, 2026, nationwide ground stop.** According to news reports, the FAA halted departures after instability at 17 of its 22 en route centers. Telecommunications work was under way at a facility in El Dorado, Arkansas, as part of moving lines from copper to fiber. Transportation Secretary Sean Duffy said old switches and routers had become overloaded with data. The FAA has paused installation of a type of new router while investigators work out why a network function that should have been disabled became active. **The root cause has not been published.** We do not rely on unconfirmed theories, including reports about a specific contractor.

Separately, on November 22, 2026, Delta's own ALIS (Automated Load Instruction System), used to calculate aircraft weight and balance before departure, went down. Delta said teams used manual workarounds to keep flights departing, then reported it restored the same day. No cause has been stated. This was an airline system, not an FAA one.

Each incident had a different technical cause. The shared question is the same: **when an old system fails or is changed, does the organization know what it is connected to, does anyone still understand it, and is there a tested way to operate in the meantime?**

The wider picture matters too. GAO found that of the FAA's 138 air traffic control systems, 51 (37 percent) were unsustainable and 54 (39 percent) potentially unsustainable. The FAA attributes the challenges to unavailable parts and the retirement of technicians with expertise in those systems. The second cause is a knowledge problem, although GAO does not use that label.

### Which numbers can be stated, and which cannot

| Figure | Source and period | What it tells you | What it does not tell you |
| --- | --- | --- | --- |
| $10.9 billion | IATA, July 2026, delay cost caused by FAA air traffic control, 2015 to 2025, in 2025 prices | Cumulative cost to airlines and passengers | Does not isolate any knowledge-related share |
| About 5% of that | Same IATA report, the "equipment" cause | Equipment and outages are a small share; 57% is volume exceeding capacity and 38% is "other," which includes staffing | The roughly $0.5 billion figure is our rounded arithmetic, not an IATA number |
| About $500 million | Delta CEO, July 2024, over five days after the CrowdStrike outage | Cost of a single disruption at one airline | Not a benchmark for other carriers; the trigger was a third-party software update |

The honest reading: most delay cost in the IATA analysis comes from capacity and staffing, not broken equipment. System outages are a small part of total cost but cause concentrated, sudden paralysis. The portion "avoidable through knowledge management" appears in no table.

For your own company, skip the external benchmark and run a simple calculation on your own data: **the hourly cost when a critical system is down, multiplied by the hours that diagnosis and recovery took beyond what was necessary because nobody held enough information.** That second term, the extra hours, is what knowledge debt looks like in practice.

## Software holds more than code: it holds knowledge

In 1985, computer scientist Peter Naur argued that a program is not just source code and documentation. The core is a "theory" of the program held in the minds of the people who build and maintain it. He wrote that a program "dies" when the team holding that theory is dissolved, even though it keeps running. The death shows only when a requested modification cannot be answered intelligently. (Naur, 1985, paraphrased.)

Applied to a company, a running software system, whether ERP, MES, warehouse software or a custom tool, usually holds four kinds of knowledge that code does not fully show:

- **Business rules.** Why the system calculates this way, rounds this way, blocks an order under this condition.
- **Exception-handling experience.** Cases that have happened and how they were resolved, often only in the memory of whoever was on duty.
- **Dependencies.** Where it gets data, who it feeds, which network path it runs on, and what happens when one link changes.
- **Recovery.** When the system stops, who does what first, in which order, by which manual method.

![Four cards: business rules, exception-handling experience, dependencies and recovery, the four kinds of knowledge that source code does not fully show.](~/assets/images/insights/aviation-knowledge-debt-legacy-systems/tr11-02-four-kinds-of-knowledge-en.svg)

*Figure 2. Four kinds of knowledge that source code does not fully show.*

*An illustrative example, not a specific client:* a plant runs a production-planning module written specially by a former vendor. The person who configured it has moved on, and the documentation describes only the screens. When an input data source changes format, the plan comes out wrong and nobody knows which rule is affected.

This is the territory we call the operational layer in [three layers of organizational knowledge](/en/insights/knowledge-management/three-layers-of-organizational-knowledge): knowledge embedded in how a system really runs, hard to see because it works well *until it doesn't*.

## Knowledge debt: why do companies depend on systems they no longer fully understand?

In 1992, Ward Cunningham used the image of debt to explain to management why a team had to restructure code that already worked: moving fast by borrowing is fine if you repay, otherwise the interest eats into later speed. Technical debt became a shared language between engineers and leaders.

We propose borrowing that way of thinking for a different gap: **knowledge debt.** It is the gap between what a system does and depends on, and what the organization can still explain, trace and rebuild. *This is a discussion framework proposed by OKELAS, not a certified methodology, and not an accounting measure.*

The debt builds through a familiar mechanism:

1. The system runs fine, so nobody sees a reason to record why it runs that way.
2. The people who understood it leave, move or retire. The remaining documents go stale.
3. The system is patched, extended, moved to new infrastructure. Each change adds a dependency nobody writes down.
4. An incident or an ordinary change touches that dependency. Diagnosis drags because the team must rediscover what should already be known.

![A chain of four steps: the system runs fine, experts leave, it is patched and moved, then an incident hits an unrecorded dependency and diagnosis drags.](~/assets/images/insights/aviation-knowledge-debt-legacy-systems/tr11-03-debt-buildup-en.svg)

*Figure 3. How knowledge debt builds up (a qualitative discussion framework, no data).*

The "interest" does not show on a balance sheet. It shows in diagnosis hours, reliance on a few individuals, and reluctance to change anything because no one is sure what will break. GAO's findings on retiring technicians and parts shortages are a national-scale instance of the same mechanism, though GAO does not measure "knowledge debt" in these terms.

### Replacing old software with new is not the answer by itself

The natural reaction to an outage is to replace the system. Replacement is necessary but not sufficient. The FAA moved NOTAM to a cloud platform in April 2026 and planned to retire the remaining legacy service later that year. Yet in November 2026, officials described the nationwide ground stop as an interaction between newly installed equipment and older infrastructure. The investigation has not concluded, so we do not say the new equipment was the cause. What the situation suggests is a more general principle:

**Replacing old software with new does not by itself solve the problem. Without transferring business knowledge, understanding dependencies and keeping independent operating capability, a company only moves its knowledge debt from the old system to the new one.**

![Two boxes joined by an arrow: knowledge debt sits in the old system and moves to the new one unless knowledge is transferred, dependencies understood and independent operating capability kept.](~/assets/images/insights/aviation-knowledge-debt-legacy-systems/tr11-04-debt-moves-en.svg)

*Figure 4. Knowledge debt follows the organization, not the software.*

In practice, a replacement project should be able to answer three questions before cutover:

- Which business rules and exceptions of the old system are in daily use but unrecorded, and have they been carried into the new one?
- What is the old system connected to, including links missing from diagrams? Which does the new system keep, replace or break?
- If the new system stops on day one, can the operations team run another way, and has that way been tried?

This is also why [standardizing processes before an ERP rollout](/en/insights/erp/process-standardization-before-erp) matters more than choosing software: new software only encodes what the organization already understands.

## Preventive KM: managing system knowledge before the incident

Preventive knowledge management does not start with a large document repository. It starts by choosing one critical system and doing five things.

![Five cards: map dependencies, retain expert knowledge, keep a fallback, test recovery and leave evidence after each change.](~/assets/images/insights/aviation-knowledge-debt-legacy-systems/tr11-05-preventive-km-en.svg)

*Figure 5. Five practices of preventive knowledge management.*

**1. Map dependencies.** For one system, record what it receives from where, who it serves, which infrastructure and network path it runs on, and who owns each link. The goal is to answer in minutes, "if this point changes or fails, what is affected?" Where the map must connect many kinds of objects, a [knowledge graph for business](/en/insights/knowledge-management/knowledge-graph-for-business) helps trace chains of impact.

**2. Retain expert knowledge.** Identify who is the only person who understands a system and turn what they know into something the organization can use: exceptions, design reasons, past cases. See [knowledge loss when employees leave](/en/insights/knowledge-management/knowledge-loss-when-employees-leave). New staff need to learn from real cases, not only from procedures.

**3. Keep a fallback that actually exists.** Delta said it used manual workarounds to keep flights departing when ALIS went down. That shows the value of another way to operate when the main system stops. The question is whether yours exists beyond paper: who performs it, with what tools, at what reduced capacity.

**4. Test recovery.** NIST's contingency planning guide (SP 800-34) stresses testing, training and exercising plans, because gaps appear only when the plan is tried. A recovery plan never rehearsed is still an assumption.

**5. Leave evidence after every change.** For each equipment swap, infrastructure move or update, record what changed, why, who approved it and the test result. When an incident occurs, this chain lets a team *explain, check evidence and trace*, instead of rediscovering from scratch.

For manufacturers, OKELAS approaches this with the *smallest sufficient system*: start from one critical process or system, keep its knowledge and evidence in a form that people and, later, AI tools can use, then widen. No large system is needed on day one. This is a governance perspective, not security, compliance or legal advice.

## Is your organization facing a similar risk?

Six self-check questions for the executive team, for any one critical system:

1. If this system stopped, could you list within minutes what depends on it?
2. Who understands it best, and if they left next month, what would leave with them?
3. Where are its business rules and exceptions recorded, and when were they last updated?
4. Is there an alternative way to operate, and when was it last rehearsed?
5. What evidence did the last major change leave: who approved, what was checked, what was the result?
6. If you replaced this system, which knowledge would be transferred, and who confirms it?

If most answers are "not sure" or "we'd have to ask one particular person," that is not a verdict on your team's competence. It is a sign of knowledge debt, and it can be addressed.

A company can lose millions of dollars because a system stops for a few hours. But the deeper cause may have built up over years: knowledge not recorded, procedures not updated, dependencies not identified, and recovery capability not verified.

Investing in knowledge management is not only about helping staff find documents faster. It is also an investment in keeping the company from being paralyzed when a person, a piece of software or a critical system stops working.

<!-- EDITABLE:cta START -->

---

**How much knowledge does your most critical system hold that the organization no longer controls?**

→ [Take the Knowledge Management Maturity Assessment](/en/readiness/knowledge) to find your maturity level and the first area to improve.

<!-- EDITABLE:cta END -->

<!-- EDITABLE:links START -->

**Further reading:**

- (pillar) [From Personal Knowledge to Organizational Knowledge: The Manufacturing Challenge](/en/insights/knowledge-management/knowledge-management-manufacturing)
- (related) [Three layers of organizational knowledge](/en/insights/knowledge-management/three-layers-of-organizational-knowledge)
- (related) [Knowledge graph for business](/en/insights/knowledge-management/knowledge-graph-for-business)
- (related) [Knowledge loss when employees leave](/en/insights/knowledge-management/knowledge-loss-when-employees-leave)
- (related) [Process standardization before ERP](/en/insights/erp/process-standardization-before-erp)

<!-- EDITABLE:links END -->

## Sources

- FAA, NOTAM statement, updates of January 11 and January 19, 2023: damaged database file; contract personnel unintentionally deleted files while correcting synchronization; no evidence of a cyber attack.
- GAO, GAO-25-107917 (December 2024): NOTAM system over 30 years old; more than 1,300 cancellations and almost 10,000 delays on January 11, 2023; 51 of 138 systems (37%) unsustainable and 54 (39%) potentially unsustainable; the FAA cites unavailable parts and retirement of technicians with expertise.
- IATA, report on US air traffic control delay costs (July 2026): $10.9 billion cumulative 2015 to 2025 in 2025 prices; cause split 57% volume, 38% other, 5% equipment. The roughly $0.5 billion figure is OKELAS arithmetic.
- CNN, May 7 and May 10, 2025, on the April 28, 2025 Newark incident (60 to 90 seconds without communication, copper cable, more than a thousand canceled flights).
- News coverage of the November 13, 2026 ground stop: CNN (November 14 and 17, 2026), CBS News (November 16, 2026), GeekWire and Wikipedia (updated to November 14, 2026). Information as of November 23, 2026; the root cause has not been published.
- Delta ALIS incident of November 22, 2026: CNN (November 22, 2026). Delta's roughly $500 million cost over five days after the CrowdStrike outage: Delta's CEO, reported by CNBC and NPR, July 31, 2024.
- US Department of Transportation and FAA releases on NOTAM modernization (2025 to 2026): move to a cloud platform in April 2026; the remaining FNS service to be retired later.
- Naur, P. (1985). "Programming as Theory Building," *Microprocessing and Microprogramming* 15: 253-261. Cunningham, W. (1992). "The WyCash Portfolio Management System," OOPSLA. NIST SP 800-34 Rev. 1, *Contingency Planning Guide for Federal Information Systems*.
- "Knowledge debt," the four kinds of knowledge in software, the four-step build-up and the five preventive practices are discussion frameworks proposed by OKELAS, not certified methodologies. This is a governance perspective, not compliance or legal advice.
