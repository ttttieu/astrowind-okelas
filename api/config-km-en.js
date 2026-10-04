// KM Maturity Assessment — English
export default {
  "assessment_id": "km_maturity",
  "title": "KM Maturity Assessment",
  "intro": "If 2–3 of your most important people left next month, what would leave with them? 12 questions · about 6 minutes · for CEOs, General Directors, and Executive Board members. There are no right or wrong answers. Choose the option closest to today's reality. If you're not sure, select 'I'm not sure' — that is also important information. Results: KM maturity level (1–5), knowledge loss risk, and actions you can take immediately.",
  "questions": [
    {
      "id": "Q0-TOOL",
      "type": "context",
      "scored": false,
      "text": "Where are operational documents (SOPs, guidelines, forms, records) currently stored and managed?",
      "options": [
        { "key": "A", "text": "Paper, notebooks, or individual personal computers" },
        { "key": "B", "text": "Shared folders (network drive, Google Drive, OneDrive…)" },
        { "key": "C", "text": "Document management software (DMS) or QMS/ISO software with version control and approval workflows" },
        { "key": "D", "text": "A system that links documents to processes, workflows, and operational records (documents 'know' what they apply to)" }
      ]
    },
    {
      "id": "Q1-PERSON-DEPENDENCY",
      "dimension": "personal_dependency",
      "scored": true,
      "text": "If 2–3 of your most important operational people (shift leaders, QA, technicians, warehouse staff…) all left next month, what would happen?",
      "options": [
        { "key": "A", "score": 1, "text": "Some operations would halt — the know-how mainly lives in their heads" },
        { "key": "B", "score": 2, "text": "Operations would continue, but quality and speed would visibly decline for several months" },
        { "key": "C", "score": 3, "text": "A few weeks of disruption; there are documents and partial backups" },
        { "key": "D", "score": 4, "text": "Minimal impact; core knowledge is documented and each key role has a second person who knows the work" }
      ]
    },
    {
      "id": "Q2-ONBOARDING-SPEED",
      "dimension": "personal_dependency",
      "scored": true,
      "text": "How long does it typically take for a new employee in an operations or QC role to work independently — and where do they primarily learn from?",
      "options": [
        { "key": "A", "score": 1, "text": "Many months; entirely through shadowing and asking experienced colleagues" },
        { "key": "B", "score": 2, "text": "Many months; there are documents, but learning is still primarily from experienced colleagues" },
        { "key": "C", "score": 3, "text": "A few weeks; there are documents and structured mentoring" },
        { "key": "D", "score": 4, "text": "A few weeks; there is a clear learning path, documents, example scenarios, and a competency assessment before working independently" }
      ]
    },
    {
      "id": "Q3-INCIDENT-LEARNING",
      "dimension": "tacit_capture",
      "scored": true,
      "text": "When a key person successfully handles an unusual situation, where does that experience go?",
      "options": [
        { "key": "A", "score": 1, "text": "It stays only in that person's head" },
        { "key": "B", "score": 2, "text": "It gets passed on verbally within the team; sometimes ends up in a chat message or email" },
        { "key": "C", "score": 3, "text": "It is recorded in an incident report, but is hard to find later and not linked to the relevant process" },
        { "key": "D", "score": 4, "text": "It is documented, the root cause is analyzed, and the relevant process or guideline is updated" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q4-KNOWLEDGE-HANDOVER",
      "dimension": "tacit_capture",
      "scored": true,
      "text": "When a key person announces they are leaving, how does the handover typically go?",
      "options": [
        { "key": "A", "score": 1, "text": "Handover of current tasks and account access; nothing about experience or the reasons behind decisions" },
        { "key": "B", "score": 2, "text": "The departing person writes their own handover document in their own way" },
        { "key": "C", "score": 3, "text": "There is a handover checklist; the successor works alongside for a period" },
        { "key": "D", "score": 4, "text": "There is a structured knowledge transfer: interviews covering non-standard situations, decision rationale, and key relationships; the output is captured into processes and documents" }
      ]
    },
    {
      "id": "Q5-SOP-QUALITY",
      "dimension": "sop_execution",
      "scored": true,
      "text": "How are your organization's SOPs written and maintained?",
      "options": [
        { "key": "A", "score": 1, "text": "Most processes have no SOP, or SOPs are written primarily to satisfy audits" },
        { "key": "B", "score": 2, "text": "Written by management or QA; describes ideal conditions; rarely updated" },
        { "key": "C", "score": 3, "text": "Practitioners provide input; updated when major changes occur; but missing guidance for unusual situations" },
        { "key": "D", "score": 4, "text": "Practitioners participate in writing; guidance for unusual situations is included; there is a feedback channel and a review schedule" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q6-SOP-CONSISTENCY",
      "dimension": "sop_execution",
      "scored": true,
      "text": "If you observed the same process on two different shifts — or before versus after an audit — how similar would they be?",
      "options": [
        { "key": "A", "score": 1, "text": "Clearly different; each shift has its own way of doing things" },
        { "key": "B", "score": 2, "text": "Similar on the main steps, different on how exceptions are handled; compliance visibly increases before audits" },
        { "key": "C", "score": 3, "text": "Fairly consistent; deviations are caught during audits or scheduled reviews" },
        { "key": "D", "score": 4, "text": "Consistent; deviations are caught early through records and day-to-day operational checks" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q7-DOC-ACCESS",
      "dimension": "knowledge_control",
      "scored": true,
      "text": "If you need to know which SOP is currently effective for a specific task, where does the answer come from and how long does it take?",
      "options": [
        { "key": "A", "score": 1, "text": "You have to ask the responsible person; multiple versions exist and it is unclear which is correct" },
        { "key": "B", "score": 2, "text": "Search a shared folder; often find multiple versions and need to re-confirm" },
        { "key": "C", "score": 3, "text": "Version control exists; findable, but takes effort" },
        { "key": "D", "score": 4, "text": "Can look it up immediately; version, approver, and effective date are clear" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q8-FRONTLINE-ACCESS",
      "dimension": "knowledge_control",
      "scored": true,
      "text": "How does someone standing at the production line, warehouse, or QC station access work instructions when they need them?",
      "options": [
        { "key": "A", "score": 1, "text": "No access; they work from memory or ask the person next to them" },
        { "key": "B", "score": 2, "text": "A paper copy is posted on-site or kept in a filing cabinet, but may not be the current version" },
        { "key": "C", "score": 3, "text": "A controlled copy is on-site, but users are not proactively notified when it changes" },
        { "key": "D", "score": 4, "text": "Instructions and checklists are available at the point of use, always the current version; changes are communicated and acknowledged" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q9-CHANGE-CONTEXT",
      "dimension": "knowledge_connectivity",
      "scored": true,
      "text": "When a parameter, material, or process needs to change, how does your organization determine what is affected — and why the current approach was chosen?",
      "options": [
        { "key": "A", "score": 1, "text": "Relies on the memory of long-tenured staff" },
        { "key": "B", "score": 2, "text": "Asks multiple people, reads scattered documents, and pieces it together" },
        { "key": "C", "score": 3, "text": "Change records exist, but are not linked to related products and processes" },
        { "key": "D", "score": 4, "text": "Relationships between processes, products, materials, suppliers, and decision history are recorded and searchable" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q10-SHADOW-SYSTEMS",
      "dimension": "knowledge_connectivity",
      "scored": true,
      "text": "What role do Excel files, group chats, and email chains play in day-to-day operations?",
      "options": [
        { "key": "A", "score": 1, "text": "They are the main operational system; many critical files live on individual personal computers" },
        { "key": "B", "score": 2, "text": "A lot of important information only exists there; no one controls who has which version" },
        { "key": "C", "score": 3, "text": "Still heavily used, but critical files have been identified, moved to shared storage, and assigned an owner" },
        { "key": "D", "score": 4, "text": "Just supporting tools; core operational information lives in a controlled system" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q11-AUDIT-READINESS",
      "dimension": "knowledge_evidence",
      "scored": true,
      "text": "To prepare for an audit (ISO, GMP, or a customer evaluation), what does your organization do and how long does it take?",
      "options": [
        { "key": "A", "score": 1, "text": "Many weeks; the whole team scrambles to gather and 'reconstruct' records from multiple sources" },
        { "key": "B", "score": 2, "text": "One to two weeks; records are scattered and the outcome depends on who prepares them" },
        { "key": "C", "score": 3, "text": "A few days; most records are available but need review and supplementing" },
        { "key": "D", "score": 4, "text": "Almost no special preparation; evidence is captured as part of daily operations" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    }
  ]
};
