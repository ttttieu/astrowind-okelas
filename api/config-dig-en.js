// Digitalization Level Assessment — English
export default {
  "assessment_id": "digitalization_level",
  "title": "Digital Transformation Maturity Assessment",
  "intro": "How many software systems does your organization run — and how many operational questions can be answered in minutes? 12 questions · about 7 minutes · for CEOs, General Directors, and Executive Board members. There are no right or wrong answers, and no level is 'embarrassing'. Choose the option closest to today's reality. If you're not sure, select 'I'm not sure'.",
  "questions": [
    {
      "id": "Q0-SYSTEMS",
      "type": "multi_select",
      "scored": false,
      "text": "Which systems is your organization currently using in operations? (select all that apply)",
      "options": [
        { "key": "A", "text": "Accounting software" },
        { "key": "B", "text": "ERP (even if only some modules are in use)", "flag": "has_erp" },
        { "key": "C", "text": "Warehouse management software" },
        { "key": "D", "text": "Sales / CRM software" },
        { "key": "E", "text": "Document management software (DMS) or QMS/ISO", "flag": "has_dms" },
        { "key": "F", "text": "Manufacturing / MES / machine connectivity software" },
        { "key": "G", "text": "HR and attendance software" },
        { "key": "H", "text": "Primarily Excel, email, Zalo — no specialized software yet", "exclusive": true }
      ]
    },
    {
      "id": "Q1-AREA-MAP",
      "type": "matrix",
      "scored": false,
      "text": "For each area below, how is day-to-day operational information currently recorded and used?",
      "rows": [
        { "key": "QC", "label": "Quality (QC/QA)" },
        { "key": "MFG", "label": "Production & Planning" },
        { "key": "WH", "label": "Warehouse & Materials" },
        { "key": "PS", "label": "Purchasing & Sales" },
        { "key": "FA", "label": "Finance & Accounting" }
      ],
      "options": [
        { "key": "A", "score": 1, "text": "Paper, notebooks, printed forms" },
        { "key": "B", "score": 2, "text": "Word/Excel/PDF files, stored scattered (personal computers, folders, email)" },
        { "key": "C", "score": 3, "text": "Through software with a process, but analysis still requires manual consolidation" },
        { "key": "D", "score": 4, "text": "Through a system; data is linked with other areas and automated reports are available" },
        { "key": "U", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q2-DOC-ACCESS",
      "dimension": "documents_records",
      "scored": true,
      "text": "When an employee needs to find which document (SOP, guideline, form) is currently effective, what do they do?",
      "options": [
        { "key": "A", "score": 1, "text": "Ask the responsible person; multiple versions exist and it's unclear which is correct" },
        { "key": "B", "score": 2, "text": "Search a shared folder; often finds multiple versions and needs to re-confirm" },
        { "key": "C", "score": 3, "text": "A version control system exists; findable, but takes effort" },
        { "key": "D", "score": 4, "text": "Can look it up immediately; version, approver, and effective date are clear" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q3-RECORD-FORMAT",
      "dimension": "documents_records",
      "scored": true,
      "text": "How is the most important operational record (e.g., quality inspection results) currently captured?",
      "options": [
        { "key": "A", "score": 1, "text": "Handwritten on paper" },
        { "key": "B", "score": 2, "text": "Handwritten then scanned or photographed as PDF or image" },
        { "key": "C", "score": 3, "text": "Excel/Word templates, but each person and each shift records differently" },
        { "key": "D", "score": 4, "text": "A digital form with fixed fields (product, batch, parameters, results, person, time) that can be queried" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q4-APPROVAL-FLOW",
      "dimension": "workflow_evidence",
      "scored": true,
      "text": "How does a request requiring approval (purchase, process change, defect handling) typically move through the organization?",
      "options": [
        { "key": "A", "score": 1, "text": "Printed, signed by hand, filed as paper" },
        { "key": "B", "score": 2, "text": "Sent via email or messaging app; the approver replies 'OK'; no one tracks status" },
        { "key": "C", "score": 3, "text": "Through software for some types of requests; the rest still go through email or paper" },
        { "key": "D", "score": 4, "text": "Through the system for all major request types: status visible, deadline reminders, approval history recorded" }
      ]
    },
    {
      "id": "Q5-NC-TRACKING",
      "dimension": "workflow_evidence",
      "scored": true,
      "text": "When a non-conformance is found (quality defect, process deviation), how is the resolution tracked until completion?",
      "options": [
        { "key": "A", "score": 1, "text": "Handled and forgotten; nothing is recorded" },
        { "key": "B", "score": 2, "text": "Entered in a notebook or spreadsheet; no one tracks whether corrective actions were effective" },
        { "key": "C", "score": 3, "text": "NC/CAPA forms and a responsible person exist, but manually; hard to know if the issue has occurred before" },
        { "key": "D", "score": 4, "text": "Through a system: logged, root cause analyzed, corrective action tracked, effectiveness verified; history is searchable" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q6-RE-ENTRY",
      "dimension": "data_connectivity",
      "scored": true,
      "text": "Tracing one order — from receipt, planning, material release, production, inspection, to delivery — how many times is information re-entered or hand-copied?",
      "options": [
        { "key": "A", "score": 1, "text": "Almost every stage re-enters; many handwritten copies" },
        { "key": "B", "score": 2, "text": "Re-entered at 3–4 stages, across different software or files" },
        { "key": "C", "score": 3, "text": "Re-entered at 1–2 stages; the rest flows between systems automatically" },
        { "key": "D", "score": 4, "text": "Entered once; subsequent stages reuse the same data" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q7-QUERY-SPEED",
      "dimension": "data_connectivity",
      "scored": true,
      "text": "Think of the 5 operational questions you need answered most regularly (e.g., defect rate by product this month, raw material stock for how many weeks, where is customer A's order). How many can be answered from a system within minutes?",
      "options": [
        { "key": "A", "score": 1, "text": "None; all require waiting for someone to manually consolidate for a day or more" },
        { "key": "B", "score": 2, "text": "1–2 questions" },
        { "key": "C", "score": 3, "text": "3–4 questions" },
        { "key": "D", "score": 4, "text": "All 5 questions" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q8-CHANGE-CONTEXT",
      "dimension": "knowledge_context",
      "scored": true,
      "text": "When a parameter, material, or process needs to change, how does the organization determine what is affected — and why the current approach was chosen?",
      "options": [
        { "key": "A", "score": 1, "text": "Relies on the memory of long-tenured staff" },
        { "key": "B", "score": 2, "text": "Asks multiple people, reads scattered documents, and pieces it together" },
        { "key": "C", "score": 3, "text": "Change records exist, but are not linked to related products and processes" },
        { "key": "D", "score": 4, "text": "Relationships between processes, products, materials, suppliers, and decision history are recorded and searchable" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    },
    {
      "id": "Q9-IMPL-APPROACH",
      "dimension": "digitalization_approach",
      "scored": true,
      "text": "The last time your organization implemented a significant system or software, how did the rollout go?",
      "options": [
        { "key": "A", "score": 1, "text": "Implemented many things at once; ran long, over budget, partially abandoned" },
        { "key": "B", "score": 2, "text": "Rolled out to all departments at once; working, but many people still use the old way" },
        { "key": "C", "score": 3, "text": "Phased, but the next phase started before the previous one was stable" },
        { "key": "D", "score": 4, "text": "Started small, confirmed it was stable and results were measurable before expanding — or never implemented before, and this is the intended approach" }
      ]
    },
    {
      "id": "Q10-INVEST-BASIS",
      "dimension": "digitalization_approach",
      "scored": true,
      "text": "When deciding to invest in a new system or software, what does the organization typically base that decision on?",
      "options": [
        { "key": "A", "score": 1, "text": "Vendor proposal and demo; or because another company is using it" },
        { "key": "B", "score": 2, "text": "A department's need; integration with other systems is rarely considered" },
        { "key": "C", "score": 3, "text": "A specific operational problem, but success metrics are not defined" },
        { "key": "D", "score": 4, "text": "A specific problem, with verified prerequisites (process, data, owner) and measurable metrics within 6–12 months" }
      ]
    },
    {
      "id": "Q11-SYSTEM-USAGE",
      "dimension": "digitalization_approach",
      "scored": true,
      "text": "To what extent are the software systems your organization has invested in actually being used?",
      "options": [
        { "key": "A", "score": 1, "text": "Most software exists mainly to 'have it'; actual work runs on Excel, email, and messaging apps" },
        { "key": "B", "score": 2, "text": "Used for data entry, but many departments still maintain parallel spreadsheets" },
        { "key": "C", "score": 3, "text": "Used fairly fully for operations; management reports still need to be exported to Excel for rework" },
        { "key": "D", "score": 4, "text": "Where real work happens; reports are pulled directly from the system" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "I'm not sure" }
      ]
    }
  ]
};
