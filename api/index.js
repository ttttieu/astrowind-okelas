/**
 * Assessment API — Vercel Serverless Function
 * Scoring logic follows ERP Readiness Assessment PRD v2.0 exactly.
 */

import CONFIG_VI from './config-vi.js';
import CONFIG_EN from './config-en.js';

const CONFIGS = {
  erp_readiness: { vi: CONFIG_VI, en: CONFIG_EN }
};

// ─── Scoring helpers ──────────────────────────────────────────────────────────

/** Map question ID → PRD score (0–3). Returns null if uncertain/unanswered. */
function getPrdScore(questionId, answers, questions) {
  const answer = answers.find(a => a.question_id === questionId);
  if (!answer?.selected_key) return null;
  const question = questions.find(q => q.id === questionId);
  if (!question) return null;
  const option = question.options.find(o => o.key === answer.selected_key);
  if (!option || option.flag === 'uncertain' || option.score == null) return null;
  return option.score - 1; // JSON uses 1–4; PRD uses 0–3
}

/** Calculate a single dimension from its question IDs. Returns score, level, metadata. */
function calcDimension(questionIds, answers, questions) {
  let total = 0;
  let scored = 0;
  let blindSpots = 0;

  for (const qId of questionIds) {
    const question = questions.find(q => q.id === qId);
    if (!question || question.scored === false) continue;
    const answer = answers.find(a => a.question_id === qId);
    if (!answer?.selected_key) continue;
    const option = question.options.find(o => o.key === answer.selected_key);
    if (!option) continue;
    if (option.flag === 'uncertain' || option.score == null) {
      blindSpots++;
    } else {
      total += option.score - 1; // convert 1–4 → 0–3
      scored++;
    }
  }

  if (scored === 0 && blindSpots > 0) {
    return { score: null, level: null, estimated: false, undetermined: true, blindSpots };
  }
  const score = scored > 0 ? total / scored : null;
  return {
    score,
    level: dimLevel(score),
    estimated: blindSpots > 0 && scored > 0,
    undetermined: score === null,
    blindSpots,
  };
}

/** Dimension level thresholds (PRD §5.1): < 1.00 → 1, 1.00–1.74 → 2, 1.75–2.49 → 3, ≥ 2.50 → 4 */
function dimLevel(score) {
  if (score === null) return null;
  if (score < 1.00) return 1;
  if (score < 1.75) return 2;
  if (score < 2.50) return 3;
  return 4;
}

/** Critical flags F1–F5 (PRD §5.2) */
function getFlags(answers, questions) {
  const s = (qId) => getPrdScore(qId, answers, questions);
  const flags = [];
  const q2 = s('Q2-PROCESS-ENFORCEMENT');
  const q3 = s('Q3-DATA-MASTER');
  const q4 = s('Q4-DATA-ALIGNMENT');
  const q5 = s('Q5-BOM-ROUTING');
  const q7 = s('Q7-OBJECTIVES');
  const q8 = s('Q8-SCOPE');
  const q9 = s('Q9-LEADERSHIP');
  if (q2 === 0 || q5 === 0) flags.push('F1');
  if (q3 === 0 || q4 === 0) flags.push('F2');
  if (q9 === 0) flags.push('F3');
  if (q8 === 0 || q8 === 1) flags.push('F4');
  if (q7 === 0) flags.push('F5');
  return flags;
}

/** Overall level with all caps applied (PRD §6) */
function getOverallLevel(dims, flags) {
  const { D1, D2, D3, D4, D5, D6 } = dims;
  const definedDims = [D1, D2, D3, D4, D5, D6].filter(d => d.score !== null);
  if (definedDims.length === 0) return null;

  // Step 1: base level from average of dimension scores (PRD §6 step 1)
  // Thresholds: < 1.00 → L1, 1.00–1.74 → L2, 1.75–2.39 → L3, ≥ 2.40 → L4
  const avg = definedDims.reduce((s, d) => s + d.score, 0) / definedDims.length;
  let level;
  if (avg < 1.00) level = 1;
  else if (avg < 1.75) level = 2;
  else if (avg < 2.40) level = 3;
  else level = 4;

  // Step 2: foundation ceiling — if D1, D2, or D5 is level 1 → max L2
  const foundationLevels = [D1.level, D2.level, D5.level].filter(l => l !== null);
  if (foundationLevels.some(l => l === 1)) level = Math.min(level, 2);

  // Step 3: flag ceiling — if any flag → max L3
  if (flags.length > 0) level = Math.min(level, 3);

  // Step 4: risk floor — ≥ 2 foundation dims at L1, or ≥ 3 flags → L1
  const foundL1 = [D1.level, D2.level, D5.level].filter(l => l === 1).length;
  if (foundL1 >= 2 || flags.length >= 3) level = 1;

  return level;
}

/** Archetype (PRD §7) — check in order, first match wins */
function getArchetype(dims, answers, questions, lang) {
  const { D1, D2, D3, D5, D6 } = dims;
  const foundation = [D1, D2, D3]
    .filter(d => d.score !== null)
    .reduce((s, d, _, a) => s + d.score / a.length, 0);

  const q2prd = getPrdScore('Q2-PROCESS-ENFORCEMENT', answers, questions);
  const q4prd = getPrdScore('Q4-DATA-ALIGNMENT', answers, questions);

  const archetypes = lang === 'en' ? ARCHETYPES_EN : ARCHETYPES_VI;

  if ([dims.D1, dims.D2, dims.D3, dims.D4, dims.D5, dims.D6].every(d => d.level !== null && d.level >= 3)
      && getFlags(answers, questions).length === 0) {
    return archetypes[0];
  }
  if (D5.score !== null && D5.score >= 2.00 && foundation < 1.50) return archetypes[1];
  if (q2prd !== null && q2prd <= 1 && D1.score !== null && D1.score < 1.75) return archetypes[2];
  if (D2.score !== null && D2.score < 1.50
      && (D3.score !== null && D3.score < 1.75 || q4prd !== null && q4prd <= 1)) {
    return archetypes[3];
  }
  if (foundation >= 1.75 && ((D5.score !== null && D5.score < 1.75) || (D6.score !== null && D6.score < 1.75))) {
    return archetypes[4];
  }
  return archetypes[5];
}

// ─── Static content ───────────────────────────────────────────────────────────

const ARCHETYPES_VI = [
  {
    code: 'ready_to_launch',
    label: 'Sẵn sàng khởi động có kiểm soát',
    description: 'Doanh nghiệp có nền tương đối vững. Việc còn lại là giữ phạm vi nhỏ và thiết lập governance từ đầu.',
    risk: 'Chủ quan, mở rộng phạm vi quá sớm'
  },
  {
    code: 'high_commitment_weak_foundation',
    label: 'Quyết tâm cao, nền móng chưa có',
    description: 'Lãnh đạo sẵn sàng cầm lái, nhưng quy trình, dữ liệu, định mức chưa đủ rõ để ERP chạy.',
    risk: 'Nôn nóng khởi động; dự án biến thành việc chuẩn hóa quy trình với chi phí của dự án ERP'
  },
  {
    code: 'running_on_key_people',
    label: 'Vận hành bằng người giỏi',
    description: 'Doanh nghiệp chạy tốt nhờ một số người nắm việc. Đó là tài sản, nhưng cũng là giới hạn: ERP đòi tri thức đó phải thành quy trình.',
    risk: 'Người chủ chốt trở thành nút thắt của dự án; mất người = mất cấu hình'
  },
  {
    code: 'multiple_versions_of_truth',
    label: 'Nhiều phiên bản sự thật',
    description: 'Mỗi phòng có số liệu riêng; con số cuối cùng phụ thuộc người tổng hợp.',
    risk: 'ERP chứa dữ liệu không ai tin; Excel tiếp tục là hệ thống thật'
  },
  {
    code: 'good_foundation_missing_driver',
    label: 'Nền khá, thiếu người cầm lái',
    description: 'Nền vận hành tương đối tốt, nhưng chưa rõ ai quyết định và ai sở hữu hệ thống.',
    risk: 'Dự án trôi, quyết định bị treo; hệ thống xuống cấp sau go-live'
  },
  {
    code: 'needs_comprehensive_foundation',
    label: 'Cần xây nền toàn diện',
    description: 'Nhiều thành phần cùng cần cải thiện. Chưa nên bàn chọn phần mềm; nên bắt đầu từ vài quy trình cốt lõi.',
    risk: 'Chọn ERP để "giải quyết mọi thứ"'
  }
];

const ARCHETYPES_EN = [
  {
    code: 'ready_to_launch',
    label: 'Ready to Launch — Controlled',
    description: 'Organization has a relatively solid foundation. The remaining work is keeping scope narrow and establishing governance from the start.',
    risk: 'Overconfidence, scope expansion too early'
  },
  {
    code: 'high_commitment_weak_foundation',
    label: 'High Commitment, Weak Foundation',
    description: 'Leadership is ready to drive the project, but processes, data, and specifications are not yet clear enough for ERP to run.',
    risk: 'Rushing to start; project becomes process standardization at the cost of an ERP project'
  },
  {
    code: 'running_on_key_people',
    label: 'Running on Key People',
    description: 'The organization runs well thanks to a few people who know the work. That is an asset, but also a limit: ERP requires that knowledge to become process.',
    risk: 'Key people become bottlenecks; losing them means losing the configuration'
  },
  {
    code: 'multiple_versions_of_truth',
    label: 'Multiple Versions of Truth',
    description: 'Each department has its own numbers; the final figure depends on whoever consolidates.',
    risk: 'ERP contains data no one trusts; Excel continues as the real system'
  },
  {
    code: 'good_foundation_missing_driver',
    label: 'Good Foundation, Missing Driver',
    description: 'Operational foundation is reasonably solid, but it is unclear who decides and who owns the system.',
    risk: 'Project drifts, decisions stall; system degrades after go-live'
  },
  {
    code: 'needs_comprehensive_foundation',
    label: 'Needs Comprehensive Foundation',
    description: 'Multiple components need improvement simultaneously. Do not discuss software selection yet — start with a few core processes.',
    risk: 'Choosing ERP to "solve everything"'
  }
];

const DIM_LABELS_VI = {
  1: 'Nền tảng chưa có',
  2: 'Cần chuẩn bị',
  3: 'Sẵn sàng có điều kiện',
  4: 'Vững',
};
const DIM_LABELS_EN = {
  1: 'Foundation not yet in place',
  2: 'Needs preparation',
  3: 'Conditionally ready',
  4: 'Solid',
};

const DIM_NAMES_VI = {
  D1: 'Quy trình & tri thức vận hành',
  D2: 'Dữ liệu nền',
  D3: 'Nền tảng sản xuất & giá thành',
  D4: 'Mục tiêu & phạm vi',
  D5: 'Lãnh đạo & con người',
  D6: 'Quản trị & sở hữu hệ thống',
};
const DIM_NAMES_EN = {
  D1: 'Process & Operational Knowledge',
  D2: 'Master Data',
  D3: 'Manufacturing & Costing Foundation',
  D4: 'Objectives & Scope',
  D5: 'Leadership & People',
  D6: 'Governance & System Ownership',
};

// Context-aware level labels by Q0 answer (PRD §6 table)
const LEVEL_LABELS = {
  vi: {
    pre:  ['Chưa nên khởi động ERP — cần xây nền trước', 'Cần một giai đoạn chuẩn bị có cấu trúc', 'Sẵn sàng có điều kiện — khởi động với phạm vi hẹp', 'Sẵn sàng — tập trung vào chọn giải pháp và governance'],
    mid:  ['Dự án đang có rủi ro cao — cần rà soát ngay', 'Cần xử lý các khoảng trống trước go-live', 'Có thể go-live nếu kiểm soát các điểm nghẽn', 'Nền tốt — tập trung vào adoption sau go-live'],
    post: ['ERP đang chạy trên nền chưa vững', 'Khoảng cách áp dụng lớn', 'Đã áp dụng một phần, còn khoảng trống rõ', 'Sẵn sàng khai thác sâu dữ liệu và tri thức ERP'],
  },
  en: {
    pre:  ['Not ready to start ERP — build foundation first', 'A structured preparation phase is needed', 'Conditionally ready — start with a narrow scope', 'Ready — focus on solution selection and governance'],
    mid:  ['Project is at high risk — immediate review needed', 'Address gaps before go-live', 'Can go-live if critical flags are controlled', 'Solid foundation — focus on adoption after go-live'],
    post: ['ERP is running on an unstable foundation', 'Large adoption gap', 'Partially adopted, clear gaps remain', 'Ready to exploit ERP data and knowledge deeply'],
  }
};

function getContextGroup(q0Answer) {
  if (q0Answer === 'C') return 'mid';
  if (q0Answer === 'D' || q0Answer === 'E') return 'post';
  return 'pre';
}

// Amplifier message for the one-sentence opener (PRD §6)
function getAmplifierMessage(dims, flags, lang) {
  // Find weakest dimension
  const all = [
    { key: 'D1', ...dims.D1 }, { key: 'D2', ...dims.D2 }, { key: 'D3', ...dims.D3 },
    { key: 'D4', ...dims.D4 }, { key: 'D5', ...dims.D5 }, { key: 'D6', ...dims.D6 },
  ].filter(d => d.score !== null);

  if (all.length === 0) {
    return lang === 'en'
      ? 'Insufficient data to assess amplification risk.'
      : 'Chưa đủ dữ liệu để đánh giá rủi ro khuếch đại.';
  }

  const allVững = all.every(d => d.level >= 3) && flags.length === 0;
  if (allVững) {
    return lang === 'en'
      ? 'If ERP is an amplifier, it will primarily amplify the strengths you have already built.'
      : 'Nếu ERP là bộ khuếch đại, nó sẽ khuếch đại chủ yếu những điểm mạnh mà anh/chị đã xây dựng.';
  }

  const weakest = all.sort((a, b) => a.score - b.score)[0];
  const dimNames = lang === 'en' ? DIM_NAMES_EN : DIM_NAMES_VI;
  const weakName = dimNames[weakest.key];

  // Flag-specific messages
  if (flags.includes('F1')) {
    return lang === 'en'
      ? 'If ERP is an amplifier, right now it will mostly amplify your organization\'s dependence on the knowledge of a few key people.'
      : 'Nếu ERP là bộ khuếch đại, lúc này nó sẽ khuếch đại nhiều nhất sự phụ thuộc của doanh nghiệp vào kinh nghiệm của một vài người chủ chốt.';
  }
  if (flags.includes('F2')) {
    return lang === 'en'
      ? `If ERP is an amplifier, right now it will mostly amplify the data inconsistency across your departments.`
      : 'Nếu ERP là bộ khuếch đại, lúc này nó sẽ khuếch đại nhiều nhất sự không thống nhất số liệu giữa các phòng ban.';
  }

  return lang === 'en'
    ? `If ERP is an amplifier, right now it will mostly amplify the gaps in ${weakName}.`
    : `Nếu ERP là bộ khuếch đại, lúc này nó sẽ khuếch đại nhiều nhất những khoảng trống trong ${weakName} của doanh nghiệp.`;
}

// Flag explanation (PRD §5.2)
const FLAG_LABELS = {
  vi: {
    F1: { label: 'Tri thức nằm trong đầu người', explanation: 'Không thể cấu hình ERP cho cách làm chưa ai viết ra; người nắm tri thức trở thành nút thắt của cả dự án.' },
    F2: { label: 'Không có một phiên bản số liệu', explanation: 'Đưa dữ liệu mâu thuẫn vào ERP tạo ra báo cáo không ai tin.' },
    F3: { label: 'ERP bị xem là dự án IT', explanation: 'Không ai đủ thẩm quyền quyết định khi các phòng ban bất đồng.' },
    F4: { label: 'Phạm vi mở, sửa phần mềm theo thói quen', explanation: 'Dẫn tới scope creep và customization không kiểm soát.' },
    F5: { label: 'Chưa có định nghĩa thành công', explanation: 'Dự án sẽ luôn được coi là "xong" về kỹ thuật dù không tạo giá trị.' },
  },
  en: {
    F1: { label: 'Knowledge lives in people\'s heads', explanation: 'You cannot configure ERP for a process no one has written down; the knowledge holder becomes the bottleneck of the entire project.' },
    F2: { label: 'No single version of the truth', explanation: 'Loading conflicting data into ERP produces reports no one trusts.' },
    F3: { label: 'ERP seen as an IT project', explanation: 'No one has the authority to decide when departments disagree.' },
    F4: { label: 'Open scope, customizing by habit', explanation: 'Leads to uncontrolled scope creep and customization.' },
    F5: { label: 'No definition of success', explanation: 'The project will always be considered "done" technically even if it creates no value.' },
  }
};

// Recommendations per dimension (PRD §8)
const RECS_VI = {
  D1: {
    low: 'Chọn 3–5 quy trình cốt lõi trong phạm vi ERP dự kiến; mỗi quy trình có một người sở hữu và một bản mô tả đủ để nhân viên mới làm theo. Lập danh sách vị trí mà nếu nghỉ việc sẽ làm đình trệ hoạt động.',
    high: 'Đối chiếu văn bản với cách làm thực tế ở 1–2 quy trình; cập nhật chỗ lệch.',
  },
  D2: {
    low: 'Chỉ định một người chịu trách nhiệm danh mục mã hàng, nhà cung cấp, khách hàng. Kiểm kê và đối chiếu tồn kho trước mọi quyết định về ERP.',
    high: 'Đặt quy tắc tạo/sửa/ngừng dùng mã; rà mã trùng định kỳ.',
  },
  D3: {
    low: 'Viết định mức cho các sản phẩm chủ lực, có người phê duyệt và số phiên bản. Kế toán trưởng thống nhất phương pháp phân bổ chi phí sản xuất.',
    high: 'Kiểm tra định mức với sản xuất thực tế; rà khả năng truy xuất lô nếu có chứng nhận ISO/GMP/HACCP.',
  },
  D4: {
    low: 'Viết ra 2–3 mục tiêu kinh doanh đo được cho ERP, mỗi mục tiêu có người chịu trách nhiệm. Xác định phạm vi giai đoạn 1 nhỏ nhất đủ để vận hành.',
    high: 'Thiết lập quy trình xử lý yêu cầu phát sinh (đề xuất – đánh giá tác động – quyết định) trước kick-off.',
  },
  D5: {
    low: 'Chỉ định một lãnh đạo có thẩm quyền, với thời gian cố định mỗi tuần cho dự án. Nhìn lại lần thay đổi gần nhất: vì sao đội ngũ quay về cách cũ?',
    high: 'Chọn key user cho mỗi phòng ban; lên kế hoạch truyền thông "vì sao thay đổi" trước khi đào tạo phần mềm.',
  },
  D6: {
    low: 'Chỉ định người sở hữu cho từng hệ thống đang có; mọi thay đổi phải có người duyệt và được ghi lại.',
    high: 'Viết vai trò System Owner, Master Data Manager trước khi chọn ERP.',
  },
};

const RECS_EN = {
  D1: {
    low: 'Select 3–5 core processes in the planned ERP scope; each process should have an owner and a description clear enough for a new employee to follow. List the roles whose departure would halt operations.',
    high: 'Cross-check documentation against actual practice in 1–2 processes; update where they diverge.',
  },
  D2: {
    low: 'Assign one person responsible for product code, supplier, and customer master data. Conduct a physical inventory reconciliation before any ERP decisions.',
    high: 'Establish rules for creating/modifying/retiring codes; periodically audit for duplicates.',
  },
  D3: {
    low: 'Document specifications for key products with an approver and version number. Have the chief accountant align on a cost allocation method for production.',
    high: 'Verify specifications against actual production; check lot traceability capability if ISO/GMP/HACCP certified.',
  },
  D4: {
    low: 'Write 2–3 measurable business objectives for ERP, each with an owner. Define the smallest Phase 1 scope sufficient to operate.',
    high: 'Establish a change-request process (propose–impact assess–decide) before kick-off.',
  },
  D5: {
    low: 'Appoint an authorized leader with fixed weekly time for the project. Revisit the last major change: why did the team revert?',
    high: 'Select key users for each department; plan "why we are changing" communication before software training.',
  },
  D6: {
    low: 'Assign a system owner for each existing system; all changes must have an approver and be recorded.',
    high: 'Define System Owner and Master Data Manager roles before selecting ERP.',
  },
};

/** Pick the 3 actions for "90 days" (PRD §8 rules) */
function get90DayRecs(dims, flags, lang) {
  const recs = lang === 'en' ? RECS_EN : RECS_VI;
  const dimOrder = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'];
  const foundationDims = ['D1', 'D2', 'D5'];

  // Sort by score ascending (weakest first), foundation dims prioritized
  const sorted = dimOrder
    .filter(k => dims[k].score !== null)
    .sort((a, b) => {
      const sa = dims[a].score, sb = dims[b].score;
      const fa = foundationDims.includes(a), fb = foundationDims.includes(b);
      if (Math.abs(sa - sb) < 0.01) return fa && !fb ? -1 : !fa && fb ? 1 : 0;
      return sa - sb;
    });

  const actions = [];

  // If there are flags, the first action must address the highest-priority flag
  if (flags.includes('F1') && actions.length < 3) {
    actions.push(lang === 'en'
      ? 'List all roles whose departure would halt operations. Document core processes for those roles immediately.'
      : 'Lập danh sách vị trí mà nếu nghỉ việc sẽ làm đình trệ hoạt động. Tài liệu hóa quy trình ngay cho các vị trí đó.');
  }
  if (flags.includes('F3') && actions.length < 3) {
    actions.push(lang === 'en'
      ? 'Designate a single authorized leader for the ERP project with dedicated weekly time and clear decision rights.'
      : 'Chỉ định một lãnh đạo có thẩm quyền rõ ràng cho dự án ERP, với thời gian cố định mỗi tuần và quyền ra quyết định.');
  }

  // Fill remaining from weakest dimensions (levels 1–2)
  for (const key of sorted) {
    if (actions.length >= 3) break;
    if (dims[key].level <= 2) {
      actions.push(recs[key].low);
    }
  }

  // If still need more, use high-level recs for remaining dims
  for (const key of sorted) {
    if (actions.length >= 3) break;
    actions.push(recs[key].high);
  }

  return actions.slice(0, 3);
}

function loadQuestions(assessmentId, language) {
  const lang = language === 'en' ? 'en' : 'vi';
  const config = CONFIGS[assessmentId]?.[lang];
  if (!config) throw new Error(`Assessment ${assessmentId} not found`);
  return {
    assessment_id: config.assessment_id,
    title: config.title,
    intro: config.intro,
    questions: config.questions.map(q => ({
      id: q.id,
      text: q.text,
      type: q.type || 'single_select',
      options: (q.options || []).map(o => ({ key: o.key, text: o.text }))
    }))
  };
}

// Full config (with scores) for scoring — separate from display config
function getRawConfig(assessmentId, language) {
  const lang = language === 'en' ? 'en' : 'vi';
  return CONFIGS[assessmentId]?.[lang];
}

// ─── HTTP handler ─────────────────────────────────────────────────────────────

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const language = url.searchParams.get('language') || 'vi';

    // Health check
    if (pathname === '/api/health') {
      return res.status(200).json({ status: 'ok', message: 'Assessment API is running' });
    }

    // Get questions
    const qMatch = pathname.match(/^\/api\/assessment\/([^/]+)\/questions\/?$/);
    if (qMatch && req.method === 'GET') {
      try {
        return res.status(200).json(loadQuestions(qMatch[1], language));
      } catch (e) {
        return res.status(404).json({ error: e.message });
      }
    }

    // Submit assessment
    if (pathname === '/api/assessment/submit' && req.method === 'POST') {
      try {
        const submission = req.body || {};
        const { assessment_id, answers = [] } = submission;
        const lang = language === 'en' ? 'en' : 'vi';
        const rawConfig = getRawConfig(assessment_id, lang);
        if (!rawConfig) return res.status(404).json({ error: `Assessment ${assessment_id} not found` });

        const questions = rawConfig.questions;

        // Q0 context
        const q0Answer = answers.find(a => a.question_id === 'Q0-CONTEXT')?.selected_key || null;
        const contextGroup = getContextGroup(q0Answer);

        // Dimension calculations (PRD §2 — D1–D6)
        const dims = {
          D1: calcDimension(['Q1-PROCESS-EXISTENCE', 'Q2-PROCESS-ENFORCEMENT'], answers, questions),
          D2: calcDimension(['Q3-DATA-MASTER', 'Q4-DATA-ALIGNMENT'], answers, questions),
          D3: calcDimension(['Q5-BOM-ROUTING', 'Q6-COSTING'], answers, questions),
          D4: calcDimension(['Q7-OBJECTIVES', 'Q8-SCOPE'], answers, questions),
          D5: calcDimension(['Q9-LEADERSHIP', 'Q10-CHANGE-HISTORY'], answers, questions),
          D6: calcDimension(['Q11-GOVERNANCE'], answers, questions),
        };

        // Blind spots (PRD §5.3)
        const totalBlindSpots = Object.values(dims).reduce((s, d) => s + d.blindSpots, 0);
        const provisional = totalBlindSpots >= 3;

        // Critical flags (PRD §5.2)
        const flags = getFlags(answers, questions);

        // Overall level (PRD §6)
        const level = getOverallLevel(dims, flags);

        // Label (PRD §6 context table)
        const levelLabels = LEVEL_LABELS[lang][contextGroup];
        const label = level ? levelLabels[level - 1] : (lang === 'en' ? 'Insufficient data' : 'Chưa đủ dữ liệu');

        // One-sentence amplifier message (PRD §6)
        const description = getAmplifierMessage(dims, flags, lang);

        // Archetype (PRD §7)
        const archetype = getArchetype(dims, answers, questions, lang);

        // 90-day recommendations (PRD §8)
        const recommendations = get90DayRecs(dims, flags, lang);

        // Format dimension_scores for response
        const dimLabels = lang === 'en' ? DIM_LABELS_EN : DIM_LABELS_VI;
        const dimNames = lang === 'en' ? DIM_NAMES_EN : DIM_NAMES_VI;
        const dimensionScores = {};
        for (const [key, val] of Object.entries(dims)) {
          const baseLabel = val.undetermined
            ? (lang === 'en' ? 'Undetermined — needs detailed assessment' : 'Chưa xác định — cần đánh giá chi tiết')
            : dimLabels[val.level] || '';
          dimensionScores[key] = {
            name: dimNames[key],
            score: val.score !== null ? Math.round(val.score * 100) / 100 : null,
            level: val.level,
            label: val.estimated ? `${baseLabel} (${lang === 'en' ? 'estimated' : 'ước tính'})` : baseLabel,
            estimated: val.estimated,
            undetermined: val.undetermined,
          };
        }

        // Flag details
        const flagDetails = flags.map(f => ({
          code: f,
          ...FLAG_LABELS[lang][f]
        }));

        // Readiness index (internal, PRD §6): avg_dimension_score × 100/3
        const definedDims = Object.values(dims).filter(d => d.score !== null);
        const avgDimScore = definedDims.length > 0
          ? definedDims.reduce((s, d) => s + d.score, 0) / definedDims.length : 0;
        const readinessIndex = Math.round(avgDimScore * 100 / 3);

        return res.status(200).json({
          submission_id: `sub_${Date.now()}`,
          assessment_id,
          level,
          label,
          description,
          provisional,
          archetype: archetype.code,
          archetype_label: archetype.label,
          archetype_description: archetype.description,
          archetype_risk: archetype.risk,
          flags: flagDetails,
          critical_flags: flags,
          dimension_scores: dimensionScores,
          recommendations,
          related_links: [],
          insufficient_data_message: level === null
            ? (lang === 'en' ? 'Insufficient data for a complete assessment.' : 'Chưa đủ dữ liệu để đánh giá đầy đủ.')
            : null,
          readiness_index: readinessIndex,
        });
      } catch (error) {
        console.error('[submit] Error:', error);
        return res.status(500).json({ error: 'Failed to process submission: ' + error.message });
      }
    }

    // Contact submission
    if (pathname === '/api/assessment/contact' && req.method === 'POST') {
      try {
        const contactData = req.body || {};
        console.log('[contact] Received:', contactData);
        return res.status(200).json({
          status: 'success',
          message: language === 'en' ? 'Contact information received' : 'Đã nhận thông tin liên hệ',
          submission_id: contactData.submission_id,
          org_name: contactData.org_name,
          role: contactData.role,
          contact: contactData.contact,
          assessment_id: contactData.assessment_id,
          submitted_at: contactData.submitted_at,
        });
      } catch (error) {
        return res.status(500).json({ error: 'Failed to process contact request' });
      }
    }

    return res.status(404).json({ error: 'Not found', path: pathname });
  } catch (error) {
    console.error('[handler] Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
