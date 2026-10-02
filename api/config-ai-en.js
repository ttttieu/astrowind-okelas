// AI Readiness Assessment — English
export default {
  "assessment_id": "ai_readiness",
  "title": "AI Readiness Assessment",
  "intro": "AI is helping employees work faster. But is your organization ready for AI to help the organization perform better? 12 questions · about 6 minutes · for CEOs, General Directors, and Executive Board members. No technical knowledge required. Choose the option that best reflects your current reality.",
  "questions": [
    {
      "id": "Q0-CONTEXT",
      "type": "context",
      "scored": false,
      "text": "At what level is AI currently being used in your organization?",
      "options": [
        { "key": "A", "text": "Almost no AI use in work" },
        { "key": "B", "text": "Employees use AI personally (ChatGPT, Gemini…); no formal deployment" },
        { "key": "C", "text": "Formally deployed AI tools for employees, or an internal document search chatbot" },
        { "key": "D", "text": "AI connected to operational data, or integrated into some process steps" }
      ]
    },
    {
      "id": "Q1-DATA-QUERY",
      "dimension": "data_connectivity",
      "scored": true,
      "text": "If you wanted to know \"over the last 6 months, which defects occurred most frequently, on which line, on which shift\", how long would it take to get a reliable answer?",
      "options": [
        { "key": "A", "score": 1, "text": "Cannot answer — data is mostly on paper or not recorded at all" },
        { "key": "B", "score": 2, "text": "Days to weeks of manual aggregation from multiple Excel files in different formats" },
        { "key": "C", "score": 3, "text": "One to two days; data exists but needs cleaning and file merging" },
        { "key": "D", "score": 4, "text": "Minutes to hours; data is recorded in a unified structure and queryable" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q2-TRACEABILITY",
      "dimension": "data_connectivity",
      "scored": true,
      "text": "To trace the full history of a finished goods batch — from raw materials through to delivery — what does an employee need to do?",
      "options": [
        { "key": "A", "score": 1, "text": "Make calls, ask multiple people, search paper records; sometimes full traceability is not possible" },
        { "key": "B", "score": 2, "text": "Open multiple disconnected files and software (accounting, QC Excel, stock ledger…) and manually piece them together" },
        { "key": "C", "score": 3, "text": "Most data is in 1–2 systems, but the links between steps still require manual cross-referencing" },
        { "key": "D", "score": 4, "text": "Traceable from a single point; steps are already linked" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q3-PROCESS-CLARITY",
      "dimension": "process_decision",
      "scored": true,
      "text": "Of your 5 most important operational processes, how many can a new employee execute correctly using only written documentation — without asking anyone?",
      "options": [
        { "key": "A", "score": 1, "text": "Almost none" },
        { "key": "B", "score": 2, "text": "1–2 processes" },
        { "key": "C", "score": 3, "text": "3–4 processes, but documentation does not specify who approves or which steps require evidence" },
        { "key": "D", "score": 4, "text": "All 5; documentation clearly states who does what, who approves, step conditions, and required evidence" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q4-DECISION-FLOW",
      "dimension": "process_decision",
      "scored": true,
      "text": "When an operational decision is needed — approving a quote, handling non-conforming goods, changing a parameter — what actually happens?",
      "options": [
        { "key": "A", "score": 1, "text": "Most decisions funnel to 1–2 leaders; work stops when they are unavailable" },
        { "key": "B", "score": 2, "text": "Delegation exists on paper, but in practice things wait for a few specific people" },
        { "key": "C", "score": 3, "text": "Clear delegation for routine decisions; exceptions still escalate upward" },
        { "key": "D", "score": 4, "text": "Clear authority, criteria, and sufficient information for staff to decide; leaders handle only genuine exceptions" }
      ]
    },
    {
      "id": "Q5-TACIT-KNOWLEDGE",
      "dimension": "org_knowledge",
      "scored": true,
      "text": "When a key person (shift leader, QA, technician) successfully handles an unusual situation, where does that experience go?",
      "options": [
        { "key": "A", "score": 1, "text": "It stays in that person's head only" },
        { "key": "B", "score": 2, "text": "Shared verbally within the team; sometimes in Zalo or email" },
        { "key": "C", "score": 3, "text": "Recorded in an incident report, but hard to find and not linked to related processes" },
        { "key": "D", "score": 4, "text": "Recorded, root-cause analyzed, and updated into the relevant process or work instruction" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q6-DOCUMENT-CONTROL",
      "dimension": "org_knowledge",
      "scored": true,
      "text": "If asked \"which version of the SOP/standard is currently in effect for product X on line Y\", where does the answer come from?",
      "options": [
        { "key": "A", "score": 1, "text": "Must ask the person in charge; multiple versions exist and it is unclear which is correct" },
        { "key": "B", "score": 2, "text": "Search the shared folder; usually find multiple versions and need to confirm" },
        { "key": "C", "score": 3, "text": "Document control exists, but documents are not linked to the product/line where they apply" },
        { "key": "D", "score": 4, "text": "Instantly traceable: version, approver, effective date, and linked to applicable product/process" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q7-EVIDENCE-TRAIL",
      "dimension": "evidence_context",
      "scored": true,
      "text": "When an auditor or customer asks \"why was this batch approved for shipment — what results, who approved, which version of the standard?\", how long does it take to answer with evidence?",
      "options": [
        { "key": "A", "score": 1, "text": "Multiple days; must search records and ask many people; evidence may be incomplete" },
        { "key": "B", "score": 2, "text": "One to several days; evidence exists but is scattered" },
        { "key": "C", "score": 3, "text": "A few hours; records are complete but must be manually assembled" },
        { "key": "D", "score": 4, "text": "Minutes; results, approver, and standard version are already traced and linked" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q8-DECISION-CONTEXT",
      "dimension": "evidence_context",
      "scored": true,
      "text": "Where are the reasons behind important operational decisions stored (supplier change, formula change, parameter adjustment)?",
      "options": [
        { "key": "A", "score": 1, "text": "Not recorded; only those involved remember" },
        { "key": "B", "score": 2, "text": "Scattered across emails, Zalo, meeting minutes" },
        { "key": "C", "score": 3, "text": "Change requests or minutes exist, but hard to find and not linked to affected products or processes" },
        { "key": "D", "score": 4, "text": "Through a change control process: proposal, evidence, approver, and links to affected objects" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q9-AI-GOVERNANCE",
      "dimension": "ai_governance",
      "scored": true,
      "text": "How is employee use of AI tools (ChatGPT, Gemini, Copilot…) currently managed in the organization?",
      "options": [
        { "key": "A", "score": 1, "text": "No visibility on who uses what or for what purpose; no policies in place" },
        { "key": "B", "score": 2, "text": "We know it is being used, but no rules on which data must not be entered into external AI tools" },
        { "key": "C", "score": 3, "text": "Basic rules exist on permitted tools and data, but compliance is not monitored" },
        { "key": "D", "score": 4, "text": "Policy in place: permitted tools, prohibited data (formulas, customers…), usage scope; communicated and checked" }
      ]
    },
    {
      "id": "Q10-AI-REVIEW",
      "dimension": "ai_governance",
      "scored": true,
      "text": "When an AI-assisted document (SOP, inspection report, customer response) or an AI suggestion is put into official use, what control step does it go through?",
      "options": [
        { "key": "A", "score": 1, "text": "No dedicated step; the user decides on their own" },
        { "key": "B", "score": 2, "text": "A manager reviews if time permits; not recorded" },
        { "key": "C", "score": 3, "text": "Goes through the standard document approval process, but AI involvement is not recorded" },
        { "key": "D", "score": 4, "text": "Policy: authorized reviewer approves and traces AI involvement — especially for quality records" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q11-AI-PROBLEM",
      "dimension": "ai_problem",
      "scored": true,
      "text": "What problem is the organization expecting AI to solve — and how will results be measured?",
      "options": [
        { "key": "A", "score": 1, "text": "Not clear; mainly because other companies are doing it" },
        { "key": "B", "score": 2, "text": "Help employees work faster (drafting, summarizing…); assessed by feeling" },
        { "key": "C", "score": 3, "text": "A few specific operational problems (audit prep, quality control…), but no measurement metrics yet" },
        { "key": "D", "score": 4, "text": "A specific operational problem, measurable metrics, and an accountable owner" }
      ]
    }
  ]
};
