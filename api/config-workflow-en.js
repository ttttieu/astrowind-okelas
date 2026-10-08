// Workflow Readiness Assessment — English
export default {
  "assessment_id": "workflow_readiness",
  "title": "Workflow Readiness Assessment",
  "intro": "Choose one process that has been causing you frustration, then answer 10 questions about how it actually runs. About 4–5 minutes. For CEOs, COOs, and Operations Directors. There are no right or wrong answers — choose the option closest to today's reality.",
  "questions": [
    {
      "id": "Q0-WORKFLOW",
      "type": "workflow_select",
      "scored": false,
      "text": "Choose a process that has caused you the most frustration recently. For example: last week or last month you had to ask \"why isn't this done yet?\"",
      "hint": "Choose a process that is causing friction, not your best-running process. Choosing a process that runs well will produce results that overestimate your actual operational maturity.",
      "options": [
        { "key": "A", "text": "Sales quotation / order intake" },
        { "key": "B", "text": "Purchasing / procurement approval" },
        { "key": "C", "text": "Production planning & work orders" },
        { "key": "D", "text": "Customer complaints" },
        { "key": "E", "text": "Quality deviation / CAPA" },
        { "key": "F", "text": "Supplier evaluation" },
        { "key": "G", "text": "Equipment maintenance" },
        { "key": "H", "text": "Recruitment / onboarding" },
        { "key": "I", "text": "Expense approval / internal approvals" },
        { "key": "J", "text": "Other (enter process name)" }
      ]
    },
    {
      "id": "Q0b-ROLE",
      "type": "context",
      "scored": false,
      "text": "What is your role in the organization?",
      "options": [
        { "key": "A", "text": "CEO / Business Owner" },
        { "key": "B", "text": "COO / Operations / Production Director" },
        { "key": "C", "text": "Quality Director / QA Manager" },
        { "key": "D", "text": "IT / Digital Transformation" },
        { "key": "E", "text": "CFO / Finance" },
        { "key": "F", "text": "Other" }
      ]
    },
    {
      "id": "Q0c-SYSTEM",
      "type": "context",
      "scored": false,
      "text": "What system is currently used for this process?",
      "options": [
        { "key": "A", "text": "Paper / notebooks" },
        { "key": "B", "text": "Excel / Word / Google Sheets" },
        { "key": "C", "text": "Messaging apps / Email" },
        { "key": "D", "text": "Specialized software" },
        { "key": "E", "text": "ERP" }
      ]
    },
    {
      "id": "Q0d-CONSULTED",
      "type": "context",
      "scored": false,
      "text": "Before taking this assessment, have you asked the people who directly perform this process?",
      "options": [
        { "key": "A", "text": "Yes, I have consulted the people who do the work" },
        { "key": "B", "text": "No, I am answering based on my own perception" }
      ]
    },
    {
      "id": "Q1-PROCESS-CLARITY",
      "dimension": "process",
      "scored": true,
      "text": "If a new employee was assigned {workflow} on their first day, what would they follow?",
      "options": [
        { "key": "A", "score": 1, "text": "Nothing specific; everyone does it differently" },
        { "key": "B", "score": 2, "text": "Ask a long-tenured colleague; the process lives in their heads" },
        { "key": "C", "score": 3, "text": "There is an SOP/document, but in practice people do it slightly differently" },
        { "key": "D", "score": 4, "text": "There is a clear process with steps and roles; most follow it and it is checked" },
        { "key": "E", "score": 5, "text": "The process is configured in the system; employees are guided step by step" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q2-TRIBAL-KNOWLEDGE",
      "dimension": "process",
      "scored": true,
      "text": "In {workflow}, are there steps that only work because \"someone knows what to do\"?",
      "options": [
        { "key": "A", "score": 1, "text": "Many; if a few people are absent, work stalls" },
        { "key": "B", "score": 2, "text": "A few critical steps" },
        { "key": "C", "score": 3, "text": "A few minor steps; we know but haven't addressed it" },
        { "key": "D", "score": 4, "text": "Rarely; guidance is documented and there is a backup person" },
        { "key": "E", "score": 5, "text": "No; every step is defined and can be performed by others" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q3-TRIGGER",
      "dimension": "event",
      "scored": true,
      "text": "What starts {workflow}?",
      "options": [
        { "key": "A", "score": 1, "text": "No one knows exactly when it should start; it is usually discovered when it is already late" },
        { "key": "B", "score": 2, "text": "Someone remembers, or is verbally reminded (phone call, message)" },
        { "key": "C", "score": 3, "text": "Email / message / spreadsheet; the recipient has to read it and realize action is needed" },
        { "key": "D", "score": 4, "text": "There is a request form and a designated recipient" },
        { "key": "E", "score": 5, "text": "An event (order, inspection result, expiration date…) automatically creates work" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q4-DETECTION",
      "dimension": "event",
      "scored": true,
      "text": "The last time {workflow} was forgotten or delayed because no one knew an event had occurred — how did you find out?",
      "options": [
        { "key": "A", "score": 1, "text": "A customer, partner, or auditor reported it" },
        { "key": "B", "score": 2, "text": "I or a manager happened to discover it" },
        { "key": "C", "score": 3, "text": "It was caught during a weekly/monthly spreadsheet or report review" },
        { "key": "D", "score": 4, "text": "There is a tracking list; the person responsible noticed it before the deadline" },
        { "key": "E", "score": 5, "text": "The system alerts before a deadline is missed" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "I don't recall / I've never heard of this happening" }
      ]
    },
    {
      "id": "Q5-HANDOFF-SIGNAL",
      "dimension": "handoff",
      "scored": true,
      "text": "When one team completes their part in {workflow}, how does the next team know to continue?",
      "options": [
        { "key": "A", "score": 1, "text": "The previous team must remember to notify, or the next team has to ask" },
        { "key": "B", "score": 2, "text": "Phone call / message / direct conversation" },
        { "key": "C", "score": 3, "text": "Email or file transfer" },
        { "key": "D", "score": 4, "text": "Update a shared spreadsheet/system; the next team must check it" },
        { "key": "E", "score": 5, "text": "The system automatically assigns work to the next team with a deadline" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q6-ABSENCE-TEST",
      "dimension": "handoff",
      "scored": true,
      "text": "If the person currently handling {workflow} took an unannounced week of leave, what would happen?",
      "options": [
        { "key": "A", "score": 1, "text": "Work stops until they return" },
        { "key": "B", "score": 2, "text": "People have to search through their messages and files to find where things stand" },
        { "key": "C", "score": 3, "text": "Someone else covers, but requires a manual handover" },
        { "key": "D", "score": 4, "text": "Work and status are in a shared tracking system; someone else can pick it up" },
        { "key": "E", "score": 5, "text": "Work automatically routes to a backup; no context is lost" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q7-DECISION-TRACE",
      "dimension": "decision",
      "scored": true,
      "text": "When {workflow} requires approval, what does the approver rely on — and how is the decision recorded?",
      "options": [
        { "key": "A", "score": 1, "text": "Verbal briefing, verbal approval" },
        { "key": "B", "score": 2, "text": "Reads an email or chat and replies \"OK\"" },
        { "key": "C", "score": 3, "text": "Reviews a file or paper document; signs or responds" },
        { "key": "D", "score": 4, "text": "Reviews a complete dossier; approver and timestamp are recorded" },
        { "key": "E", "score": 5, "text": "System displays all relevant evidence; decision and rationale are logged as a traceable event" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q8-EVIDENCE-STORAGE",
      "dimension": "evidence",
      "scored": true,
      "text": "When {workflow} is complete, where does the outcome reside?",
      "options": [
        { "key": "A", "score": 1, "text": "Not stored systematically" },
        { "key": "B", "score": 2, "text": "In email, chat, or personal files" },
        { "key": "C", "score": 3, "text": "In a shared folder; everyone names and organizes it differently" },
        { "key": "D", "score": 4, "text": "In a shared structured system; searchable by code or date" },
        { "key": "E", "score": 5, "text": "Structured data linked to orders, batches, customers, and the person who performed the work" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q9-TRACE-TEST",
      "dimension": "evidence",
      "scored": true,
      "text": "One year later, a customer or auditor asks about {workflow}: \"Why was that decision made, who did it, and based on what?\" How long does it take your organization to answer?",
      "options": [
        { "key": "A", "score": 1, "text": "We cannot answer" },
        { "key": "B", "score": 2, "text": "We have to ask many people, it takes days, and we may still not have enough" },
        { "key": "C", "score": 3, "text": "We find records but have to piece them together from multiple sources, taking one to two days" },
        { "key": "D", "score": 4, "text": "We can trace it within the same day from the records" },
        { "key": "E", "score": 5, "text": "We trace it back in minutes: outcome → decision → evidence → person → original event" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q10-MANUAL-LOAD",
      "dimension": "manual_load",
      "scored": true,
      "text": "In {workflow}, how much human effort is spent on work that requires no judgment: transferring data between files, sending reminders, compiling reports, updating status?",
      "options": [
        { "key": "A", "score": 1, "text": "Almost none" },
        { "key": "B", "score": 2, "text": "A small portion" },
        { "key": "C", "score": 3, "text": "A significant amount" },
        { "key": "D", "score": 4, "text": "Most of the person's time" },
        { "key": "E", "score": 5, "text": "Almost all of it; people act as \"data transfer agents\"" },
        { "key": "U", "score": 3, "flag": "uncertain", "text": "I've never thought about it this way" }
      ]
    }
  ]
};
