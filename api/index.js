/**
 * Assessment API — Vercel Serverless Function
 * Scoring logic follows ERP Readiness Assessment PRD v2.0 exactly.
 */

import CONFIG_VI from './config-vi.js';
import CONFIG_EN from './config-en.js';
import CONFIG_AI_VI from './config-ai-vi.js';
import CONFIG_AI_EN from './config-ai-en.js';
import CONFIG_DIG_VI from './config-dig-vi.js';
import CONFIG_DIG_EN from './config-dig-en.js';

const CONFIGS = {
  erp_readiness:       { vi: CONFIG_VI,     en: CONFIG_EN },
  ai_readiness:        { vi: CONFIG_AI_VI,  en: CONFIG_AI_EN },
  digitalization_level: { vi: CONFIG_DIG_VI, en: CONFIG_DIG_EN },
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

// ─── AI Readiness static content ─────────────────────────────────────────────

const AI_ARCHETYPES_VI = [
  {
    code: 'ai_ahead_of_foundation',
    label: 'AI đang chạy trước nền',
    description: 'AI đang được dùng ở mức mà nền tổ chức chưa đỡ được. Kết quả có thể trông tốt, nhưng khó kiểm chứng và khó giải thích khi có sự cố.',
    risk: 'Câu trả lời sai không ai phát hiện; dữ liệu nhạy cảm ra ngoài; hồ sơ không lưu vết'
  },
  {
    code: 'personal_productivity_org_bottleneck',
    label: 'Năng suất cá nhân, nút thắt tổ chức',
    description: 'Nhân viên làm nhanh hơn, nhưng quyết định vẫn chờ vài người. Năng suất AI bị giữ lại ở khâu duyệt.',
    risk: 'AI tăng tốc đầu vào nhưng tắc nghẽn ở đầu ra quyết định'
  },
  {
    code: 'foundation_ready_underutilized',
    label: 'Nền sẵn sàng, AI chưa khai thác',
    description: 'Doanh nghiệp đã có quy trình và tri thức đủ tốt để AI làm được nhiều hơn cách đang dùng.',
    risk: 'Cơ hội rõ, rủi ro thấp — nhưng cần bài toán cụ thể để bắt đầu'
  },
  {
    code: 'data_without_context',
    label: 'Có dữ liệu, thiếu bối cảnh',
    description: 'Dữ liệu có và khá đầy đủ, nhưng thiếu định nghĩa, liên kết, lịch sử quyết định để AI hiểu dữ liệu đó nghĩa là gì.',
    risk: 'AI đưa ra phân tích nhưng không giải thích được tại sao — và đề xuất lại điều đã thử và bị loại'
  },
  {
    code: 'knowledge_in_peoples_heads',
    label: 'Tri thức nằm trong đầu người',
    description: 'Doanh nghiệp vận hành tốt nhờ một vài người nắm việc. AI chưa thể học được thứ chưa được viết ra.',
    risk: 'Chatbot trả lời đúng tài liệu nhưng sai thực tế; mất người chủ chốt = mất tri thức'
  },
  {
    code: 'build_foundation_first',
    label: 'Xây nền trước khi mở rộng AI',
    description: 'Nhiều thành phần cùng cần cải thiện. AI cá nhân có kiểm soát là đủ lúc này; đầu tư nên đi vào quy trình, dữ liệu, tri thức.',
    risk: 'Đầu tư AI khi nền chưa vững sẽ khuếch đại vấn đề thay vì giải quyết'
  }
];

const AI_ARCHETYPES_EN = [
  {
    code: 'ai_ahead_of_foundation',
    label: 'AI Running Ahead of Foundation',
    description: 'AI is being used at a level the organizational foundation cannot yet support. Results may look good, but are hard to verify and explain when issues arise.',
    risk: 'Wrong answers go undetected; sensitive data leaks externally; records lack audit trails'
  },
  {
    code: 'personal_productivity_org_bottleneck',
    label: 'Personal Productivity, Org Bottleneck',
    description: 'Employees work faster, but decisions still wait for a few people. AI productivity gains are absorbed by approval bottlenecks.',
    risk: 'AI accelerates inputs but is blocked at decision outputs'
  },
  {
    code: 'foundation_ready_underutilized',
    label: 'Foundation Ready, AI Under-utilized',
    description: 'The organization already has process and knowledge quality sufficient for AI to do much more than it currently does.',
    risk: 'Clear opportunity, low risk — but a specific problem statement is needed to start'
  },
  {
    code: 'data_without_context',
    label: 'Data Available, Context Missing',
    description: 'Data is available and fairly complete, but lacks definitions, linkages, and decision history for AI to understand what that data means.',
    risk: 'AI produces analysis but cannot explain why — and may re-suggest things already tried and rejected'
  },
  {
    code: 'knowledge_in_peoples_heads',
    label: 'Knowledge in People\'s Heads',
    description: 'The organization runs well because a few people know how. AI cannot learn what has not been written down.',
    risk: 'Chatbot answers correctly per documents but incorrectly per reality; losing a key person means losing knowledge'
  },
  {
    code: 'build_foundation_first',
    label: 'Build Foundation Before Scaling AI',
    description: 'Multiple components need improvement simultaneously. Governed individual AI use is sufficient for now; investment should go into process, data, and knowledge.',
    risk: 'Investing in AI on a weak foundation amplifies problems rather than solving them'
  }
];

const AI_DIM_NAMES_VI = {
  D1: 'Dữ liệu & liên thông',
  D2: 'Quy trình & quyết định',
  D3: 'Tri thức tổ chức',
  D4: 'Bằng chứng & bối cảnh quyết định',
  D5: 'Quản trị AI',
  D6: 'Bài toán & định hướng',
};
const AI_DIM_NAMES_EN = {
  D1: 'Data & Connectivity',
  D2: 'Process & Decision Flow',
  D3: 'Organizational Knowledge',
  D4: 'Evidence & Decision Context',
  D5: 'AI Governance',
  D6: 'Problem & Direction',
};

const AI_LEVEL_LABELS_VI = {
  1: 'AI năng suất cá nhân',
  2: 'AI tra cứu tri thức',
  3: 'AI trên dữ liệu vận hành',
  4: 'AI trong workflow',
};
const AI_LEVEL_LABELS_EN = {
  1: 'Individual AI Productivity',
  2: 'AI for Knowledge Retrieval',
  3: 'AI on Operational Data',
  4: 'AI in Workflow',
};

const AI_FLAG_LABELS = {
  vi: {
    F1: { label: 'Tri thức nằm trong đầu người', explanation: 'AI không học được thứ chưa ai viết ra; chatbot trả lời từ tài liệu không phản ánh cách làm thật.' },
    F2: { label: 'Dữ liệu không hỏi được', explanation: 'AI không thể phân tích dữ liệu không tồn tại ở dạng số hoặc không liên kết được.' },
    F3: { label: 'AI ngoài tầm kiểm soát', explanation: 'Dữ liệu nhạy cảm (công thức, khách hàng) có thể đã đi vào công cụ AI bên ngoài mà không ai biết.' },
    F4: { label: 'Nút thắt quyết định', explanation: 'Năng suất AI cá nhân bị "nuốt" ở khâu chờ duyệt; AI tăng tốc đầu vào nhưng tắc nghẽn ở đầu ra.' },
    F5: { label: 'Chưa có bài toán', explanation: 'Đầu tư AI không có đích; không thể biết AI có tạo giá trị hay không.' },
    F6: { label: 'AI chạm hồ sơ chất lượng mà không lưu vết', explanation: 'AI đang tham gia soạn tài liệu/hồ sơ nhưng chưa có bước duyệt và ghi nhận — khoảng trống tuân thủ thật sự khi audit.' },
  },
  en: {
    F1: { label: 'Knowledge lives in people\'s heads', explanation: 'AI cannot learn what has not been written down; chatbots answer correctly per documents but incorrectly per actual practice.' },
    F2: { label: 'Data not queryable', explanation: 'AI cannot analyze data that does not exist in structured, linked form.' },
    F3: { label: 'AI out of governance', explanation: 'Sensitive data (formulas, customers) may already be entering external AI tools without anyone\'s knowledge.' },
    F4: { label: 'Decision bottleneck', explanation: 'Individual AI productivity gains are absorbed at approval queues; AI speeds up inputs but is blocked at decision outputs.' },
    F5: { label: 'No problem statement', explanation: 'AI investment has no target; it is impossible to know whether AI is creating value.' },
    F6: { label: 'AI touching quality records without audit trail', explanation: 'AI is already involved in drafting documents or records but without a review and trace step — a real compliance gap when audited.' },
  }
};

const AI_RECS_VI = {
  D1: {
    low: 'Chọn một loại dữ liệu vận hành quan trọng nhất (thường là kết quả QC) và thống nhất một mẫu ghi chép cho mọi người, mọi ca.',
    high: 'Liên kết dữ liệu QC với lô sản xuất và nguyên liệu; thử truy xuất một lô từ đầu đến cuối.',
  },
  D2: {
    low: 'Viết lại 5 quy trình quan trọng nhất đến mức nhân viên mới làm được. Liệt kê quyết định nào đang chờ 1–2 người và phân quyền lại với tiêu chí rõ.',
    high: 'Bổ sung vào quy trình: bước nào cần bằng chứng, điều kiện chuyển bước.',
  },
  D3: {
    low: 'Ghi lại cách xử lý các tình huống bất thường của 2–3 người nắm việc nhất. Dọn thư mục tài liệu: mỗi tài liệu một bản hiệu lực.',
    high: 'Gắn tài liệu với sản phẩm, dây chuyền, quy trình áp dụng.',
  },
  D4: {
    low: 'Thử trả lời câu hỏi "vì sao lô X được duyệt xuất" cho một lô gần đây; ghi lại chỗ đứt chuỗi.',
    high: 'Áp dụng phiếu kiểm soát thay đổi cho đổi nhà cung cấp, công thức, thông số.',
  },
  D5: {
    low: 'Ban hành quy định sử dụng AI một trang. Quy định: tài liệu có AI tham gia phải qua người duyệt trước khi thành chính thức.',
    high: 'Phân loại ứng dụng AI theo 3 vùng rủi ro; quyết định vùng nào cần lưu vết.',
  },
  D6: {
    low: 'Trả lời câu hỏi: vấn đề vận hành cụ thể là gì — thông tin, hay quy trình, con người, quản trị?',
    high: 'Đặt 1–2 chỉ số đo cho bài toán đã chọn, có người chịu trách nhiệm.',
  },
};

const AI_RECS_EN = {
  D1: {
    low: 'Choose the single most important type of operational data (usually QC results) and standardize one recording format for all staff on all shifts.',
    high: 'Link QC data to production batches and raw materials; try tracing one batch end-to-end.',
  },
  D2: {
    low: 'Rewrite the 5 most important processes to a level a new employee can follow. List decisions currently waiting on 1–2 people and re-delegate with clear criteria.',
    high: 'Add to each process: which steps require evidence and what conditions trigger a step transition.',
  },
  D3: {
    low: 'Document how the 2–3 most knowledgeable people handle unusual situations. Clean up the document folder: one effective version per document.',
    high: 'Link documents to the products, lines, and processes where they apply.',
  },
  D4: {
    low: 'Try to answer "why was batch X approved for shipment" for a recent batch; record where the evidence chain breaks.',
    high: 'Apply a change control form to supplier changes, formula changes, and parameter adjustments.',
  },
  D5: {
    low: 'Issue a one-page AI use policy. Rule: any document where AI was involved must go through an authorized reviewer before becoming official.',
    high: 'Classify AI applications by 3 risk zones; decide which zones require audit trail logging.',
  },
  D6: {
    low: 'Answer the question: what specific operational problem needs solving — is it information, process, people, or governance?',
    high: 'Set 1–2 measurable metrics for the chosen problem, with an accountable owner.',
  },
};

// ─── AI Readiness scoring functions ──────────────────────────────────────────

function getAIFlags(answers, questions, q0Answer) {
  const s = (qId) => getPrdScore(qId, answers, questions);
  const flags = [];
  const q1 = s('Q1-DATA-QUERY');
  const q2 = s('Q2-TRACEABILITY');
  const q3 = s('Q3-PROCESS-CLARITY');
  const q4 = s('Q4-DECISION-FLOW');
  const q5 = s('Q5-TACIT-KNOWLEDGE');
  const q9 = s('Q9-AI-GOVERNANCE');
  const q10 = s('Q10-AI-REVIEW');
  const q11 = s('Q11-AI-PROBLEM');

  if (q3 === 0 || q5 === 0) flags.push('F1');
  if (q1 === 0 || q2 === 0) flags.push('F2');
  if (q9 === 0) flags.push('F3');
  if (q4 === 0) flags.push('F4');
  if (q11 === 0) flags.push('F5');
  // F6: AI touching quality records without review/trace — triggered if Q10 score ≤ 1 AND already using AI officially (Q0 = C or D)
  if (q10 !== null && q10 <= 1 && (q0Answer === 'C' || q0Answer === 'D')) flags.push('F6');
  return flags;
}

function getAIOverallLevel(dims, flags, q11PrdScore) {
  const { D1, D2, D3, D4, D5, D6 } = dims;
  const ge = (dim, threshold) => dim.score !== null && dim.score >= threshold;

  // Gate-based level: highest gate fully satisfied
  const noF1F3 = !flags.includes('F1') && !flags.includes('F3');
  const noF2F6 = !flags.includes('F2') && !flags.includes('F6');
  const noFlags = flags.length === 0;

  const l2ok = ge(D2, 1.00) && ge(D3, 1.00) && noF1F3;
  const l3ok = ge(D1, 1.75) && ge(D4, 1.00) && ge(D5, 1.50) && noF2F6;
  const l4ok = ge(D2, 1.75) && ge(D3, 1.75) && ge(D4, 1.75) && ge(D5, 2.00)
               && q11PrdScore !== null && q11PrdScore >= 2 && noFlags;

  let gateLevel = 1;
  if (l2ok) gateLevel = 2;
  if (l2ok && l3ok) gateLevel = 3;
  if (l2ok && l3ok && l4ok) gateLevel = 4;

  // Average ceiling
  const definedDims = [D1, D2, D3, D4, D5, D6].filter(d => d.score !== null);
  if (definedDims.length === 0) return 1;
  const avg = definedDims.reduce((s, d) => s + d.score, 0) / definedDims.length;
  let ceiling;
  if (avg < 1.00) ceiling = 1;
  else if (avg < 1.75) ceiling = 2;
  else if (avg < 2.40) ceiling = 3;
  else ceiling = 4;

  return Math.min(gateLevel, ceiling);
}

function getAIGap(q0Answer, level) {
  // Stage: A=0, B=1, C=2, D=3; Level: L1=1…L4=4
  const stageMap = { A: 0, B: 1, C: 2, D: 3 };
  const stage = stageMap[q0Answer];
  if (stage === undefined || level === null) return null;
  return stage - level;
}

function getAIArchetype(dims, flags, gap, q0Answer, q4PrdScore, lang) {
  const { D1, D3, D4 } = dims;
  const level = getAIOverallLevel(dims, flags, null);
  const archetypes = lang === 'en' ? AI_ARCHETYPES_EN : AI_ARCHETYPES_VI;

  // 1. AI running ahead of foundation
  if (gap !== null && gap >= 1) return archetypes[0];
  // 2. Personal productivity, org bottleneck
  if (q4PrdScore !== null && q4PrdScore <= 1 && ['B', 'C', 'D'].includes(q0Answer)) return archetypes[1];
  // 3. Foundation ready, underutilized
  if (gap !== null && gap <= -1 && level >= 2) return archetypes[2];
  // 4. Data available, context missing
  if (D1.score !== null && D1.score >= 1.50
      && ((D3.score !== null && D3.score < 1.50) || (D4.score !== null && D4.score < 1.50))) {
    return archetypes[3];
  }
  // 5. Knowledge in people's heads
  if ((D3.score !== null && D3.score < 1.25) || flags.includes('F1')) return archetypes[4];
  // 6. Default
  return archetypes[5];
}

function getAIMessage(dims, flags, gap, q0Answer, lang) {
  const { D1, D2, D3, D4, D5, D6 } = dims;
  const dimNames = lang === 'en' ? AI_DIM_NAMES_EN : AI_DIM_NAMES_VI;

  // Special case: not using AI yet and L1 — ready to start
  if (q0Answer === 'A' && gap !== null && gap <= -1) {
    return lang === 'en'
      ? 'Your foundation is ready to begin with governed individual AI use. The next step is establishing clear rules before expanding further.'
      : 'Nền tổ chức của anh/chị đã sẵn sàng để bắt đầu với AI năng suất cá nhân có kiểm soát. Bước tiếp theo là đặt quy tắc rõ trước khi mở rộng.';
  }

  if (flags.includes('F6')) {
    return lang === 'en'
      ? 'AI can help your employees draft faster right now. Before going further, address the compliance gap: AI is already touching quality records without a review and trace step.'
      : 'AI có thể giúp nhân viên của anh/chị soạn thảo nhanh hơn ngay hôm nay. Trước khi mở rộng, cần xử lý khoảng trống tuân thủ: AI đang chạm hồ sơ chất lượng mà chưa có bước duyệt và lưu vết.';
  }
  if (flags.includes('F3')) {
    return lang === 'en'
      ? 'AI can help your employees work faster right now. To go further safely, establish a clear AI use policy first — sensitive data may already be entering external tools without governance.'
      : 'AI có thể giúp nhân viên của anh/chị làm nhanh hơn ngay hôm nay. Để mở rộng an toàn, cần ban hành quy định sử dụng AI trước — dữ liệu nhạy cảm có thể đã đi vào công cụ bên ngoài mà không ai kiểm soát.';
  }

  const all = [
    { key: 'D1', ...D1 }, { key: 'D2', ...D2 }, { key: 'D3', ...D3 },
    { key: 'D4', ...D4 }, { key: 'D5', ...D5 }, { key: 'D6', ...D6 },
  ].filter(d => d.score !== null);

  if (all.length === 0) {
    return lang === 'en'
      ? 'Insufficient data to identify the primary bottleneck for AI.'
      : 'Chưa đủ dữ liệu để xác định điểm cần xây trước cho AI.';
  }

  const weakest = all.sort((a, b) => a.score - b.score)[0];
  const weakName = dimNames[weakest.key];
  return lang === 'en'
    ? 'AI can help your employees work faster right now. To enable AI to do more for the organization, the key area to build first is ' + weakName + '.'
    : 'AI có thể giúp nhân viên của anh/chị làm nhanh hơn ngay hôm nay. Để AI giúp doanh nghiệp làm được nhiều hơn, điểm cần xây trước là ' + weakName + '.';
}

function getAI90DayRecs(dims, flags, lang) {
  const recs = lang === 'en' ? AI_RECS_EN : AI_RECS_VI;
  const dimOrder = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'];
  const foundationDims = ['D1', 'D2', 'D3'];

  const sorted = dimOrder
    .filter(k => dims[k].score !== null)
    .sort((a, b) => {
      const sa = dims[a].score, sb = dims[b].score;
      const fa = foundationDims.includes(a), fb = foundationDims.includes(b);
      if (Math.abs(sa - sb) < 0.01) return fa && !fb ? -1 : !fa && fb ? 1 : 0;
      return sa - sb;
    });

  const actions = [];

  // F6 is highest priority (ongoing compliance risk)
  if (flags.includes('F6') && actions.length < 3) {
    actions.push(lang === 'en'
      ? 'Establish a review rule: any document or record where AI was involved must be reviewed by an authorized person and AI involvement noted. Audit recent quality records that may have had AI input.'
      : 'Quy định: tài liệu hoặc hồ sơ có AI tham gia phải qua người có thẩm quyền duyệt và ghi nhận; rà lại các hồ sơ chất lượng gần đây đã có AI tham gia.');
  }
  // F3 — data leakage risk
  if (flags.includes('F3') && actions.length < 3) {
    actions.push(lang === 'en'
      ? 'Issue a one-page AI use policy covering permitted tools, prohibited data (formulas, customer data, quality records), and usage scope. Communicate to all staff within 30 days.'
      : 'Ban hành quy định sử dụng AI một trang: công cụ được phép, dữ liệu cấm (công thức, thông tin khách hàng, hồ sơ chất lượng), phạm vi sử dụng. Phổ biến toàn bộ nhân viên trong 30 ngày.');
  }

  // Fill from weakest dimensions (level 1–2)
  for (const key of sorted) {
    if (actions.length >= 3) break;
    if (dims[key].level !== null && dims[key].level <= 2) {
      actions.push(recs[key].low);
    }
  }

  // Fill remaining with high-level recs
  for (const key of sorted) {
    if (actions.length >= 3) break;
    actions.push(recs[key].high);
  }

  return actions.slice(0, 3);
}

// ─── End AI Readiness scoring ─────────────────────────────────────────────────

// ─── Digitalization Level static content ─────────────────────────────────────

const DIG_LEVEL_LABELS_VI = {
  1: 'Vận hành bằng giấy',
  2: 'Tài liệu số nhưng rải rác',
  3: 'Workflow qua hệ thống',
  4: 'Tích hợp, dữ liệu phân tích được',
  5: 'AI hỗ trợ vận hành',
};
const DIG_LEVEL_LABELS_EN = {
  1: 'Paper-based Operations',
  2: 'Digital Files, Scattered',
  3: 'Workflow Through Systems',
  4: 'Integrated, Analyzable Data',
  5: 'AI-Supported Operations',
};

const DIG_DIM_LABELS_VI = { 1: 'Nền tảng chưa có', 2: 'Cần chuẩn bị', 3: 'Có cơ chế', 4: 'Vững' };
const DIG_DIM_LABELS_EN = { 1: 'Foundation Not Yet in Place', 2: 'Needs Preparation', 3: 'Mechanism in Place', 4: 'Solid' };

const DIG_DIM_NAMES_VI = {
  D1: 'Tài liệu & hồ sơ',
  D2: 'Workflow & bằng chứng',
  D3: 'Dữ liệu & liên thông',
  D4: 'Tri thức & bối cảnh',
  D5: 'Cách số hóa & khai thác',
};
const DIG_DIM_NAMES_EN = {
  D1: 'Documents & Records',
  D2: 'Workflow & Evidence',
  D3: 'Data & Connectivity',
  D4: 'Knowledge & Context',
  D5: 'Digitalization Approach',
};

const DIG_AREA_NAMES_VI = {
  QC: 'Chất lượng (QC/QA)',
  MFG: 'Sản xuất & kế hoạch',
  WH: 'Kho & nguyên liệu',
  PS: 'Mua hàng & bán hàng',
  FA: 'Tài chính – kế toán',
};
const DIG_AREA_NAMES_EN = {
  QC: 'Quality (QC/QA)',
  MFG: 'Production & Planning',
  WH: 'Warehouse & Materials',
  PS: 'Purchasing & Sales',
  FA: 'Finance & Accounting',
};

const DIG_ARCHETYPES_VI = [
  {
    code: 'many_software_low_integration',
    label: 'Nhiều phần mềm, ít liên thông',
    description: 'Doanh nghiệp đã đầu tư nhiều công cụ, nhưng mỗi công cụ là một silo; báo cáo tổng hợp vẫn mất nhiều ngày.',
    risk: 'Bước tiếp theo không phải thêm phần mềm — mà là nối những gì đang có'
  },
  {
    code: 'system_running_ops_elsewhere',
    label: 'Hệ thống chạy, vận hành ở chỗ khác',
    description: 'Phần mềm có và chạy, nhưng công việc thật diễn ra trên Excel, email, Zalo.',
    risk: 'Đã chi tiền cho phần mềm nhưng chưa thu được giá trị — vòng lặp này sẽ lặp lại nếu không xử lý nguyên nhân gốc'
  },
  {
    code: 'paperless_not_digital',
    label: 'Paperless nhưng chưa digital',
    description: 'Đã bỏ giấy ở tài liệu, nhưng hồ sơ vận hành vẫn là ảnh và file tĩnh — không hỏi được.',
    risk: 'Scan không phải số hóa; dữ liệu không phân tích được và không đạt chuẩn eQMS/ISO thật sự'
  },
  {
    code: 'area_gap',
    label: 'Lệch theo mảng',
    description: 'Có mảng đã chạy trên hệ thống, có mảng vẫn trên giấy; luồng thông tin đứt ở chỗ tiếp giáp.',
    risk: 'Mảng mạnh nhất không tạo được giá trị đầy đủ vì thông tin từ mảng yếu không đến được'
  },
  {
    code: 'next_step_risk',
    label: 'Rủi ro ở bước tiếp theo',
    description: 'Trạng thái hiện tại không phải vấn đề lớn nhất; cách doanh nghiệp đang ra quyết định đầu tư mới là rủi ro.',
    risk: 'Dự án tiếp theo có thể lặp lại bẫy "big bang" hoặc đầu tư theo nhà cung cấp'
  },
  {
    code: 'foundation_ready',
    label: 'Nền vững, sẵn sàng kết nối tri thức',
    description: 'Hệ thống và dữ liệu đã chạy; bước tiếp theo là gắn tri thức và bối cảnh để khai thác sâu hơn, và chuẩn bị cho AI.',
    risk: 'Cơ hội rõ — nhưng cần bài toán cụ thể để bắt đầu lớp tri thức'
  },
  {
    code: 'build_step_by_step',
    label: 'Xây nền theo từng bước',
    description: 'Nhiều mảng còn ở cấp 1–2. Bước đúng là số hóa có cấu trúc 1–2 quy trình quan trọng nhất, không phải một dự án lớn.',
    risk: 'Một dự án lớn trên nền chưa vững sẽ mất nhiều năm mà không tạo ra giá trị vận hành rõ ràng'
  },
];

const DIG_ARCHETYPES_EN = [
  {
    code: 'many_software_low_integration',
    label: 'Many Software, Few Connections',
    description: 'The organization has invested in many tools, but each is a silo; consolidated reports still take days.',
    risk: 'The next step is not adding software — it is connecting what already exists'
  },
  {
    code: 'system_running_ops_elsewhere',
    label: 'System Running, Operations Elsewhere',
    description: 'Software exists and is running, but actual work happens on spreadsheets, email, and messaging apps.',
    risk: 'Money has been spent on software but value has not been captured — this cycle will repeat if the root cause is not addressed'
  },
  {
    code: 'paperless_not_digital',
    label: 'Paperless But Not Digital',
    description: 'Paper has been eliminated for documents, but operational records are still images and static files — not queryable.',
    risk: 'Scanning is not digitalization; data cannot be analyzed and does not meet true eQMS/ISO standards'
  },
  {
    code: 'area_gap',
    label: 'Uneven Across Areas',
    description: 'Some areas run through systems, others still on paper; information flow breaks at the boundary between them.',
    risk: 'The strongest area cannot deliver full value because information from the weakest area never arrives'
  },
  {
    code: 'next_step_risk',
    label: 'Risk in the Next Step',
    description: 'The current state is not the biggest problem; how the organization makes its next investment decision is the risk.',
    risk: 'The next project may repeat the "big bang" trap or vendor-driven investment pattern'
  },
  {
    code: 'foundation_ready',
    label: 'Solid Foundation, Ready for Knowledge Layer',
    description: 'Systems and data are running; the next step is adding knowledge and context for deeper use, and preparing for AI.',
    risk: 'Clear opportunity — but a specific problem statement is needed to begin the knowledge layer'
  },
  {
    code: 'build_step_by_step',
    label: 'Build Foundation Step by Step',
    description: 'Many areas are still at level 1–2. The right move is structured digitalization of 1–2 critical processes, not a large project.',
    risk: 'A large project on an unstable foundation takes years without delivering clear operational value'
  },
];

const DIG_FLAG_LABELS = {
  vi: {
    F1: { label: 'Scan không phải số hóa', explanation: 'Hồ sơ là ảnh hoặc giấy; không phân tích được, không truy vấn được — chặn cổng lên cấp 3.' },
    F2: { label: 'Nhập lại ở mọi khâu', explanation: 'Mỗi lần nhập lại là một điểm có thể sai, trễ, mất — chặn cổng lên cấp 4.' },
    F3: { label: 'Câu hỏi phút, câu trả lời ngày', explanation: 'Quyết định chậm; chi phí cơ hội lớn nhất trong 4 loại chi phí — chặn cổng lên cấp 4.' },
    F4: { label: 'Tiền lệ big bang', explanation: 'Lịch sử cho thấy doanh nghiệp dễ lặp lại bẫy dự án lớn; rủi ro cao nhất trước một khoản đầu tư mới.' },
    F5: { label: 'Đầu tư theo nhà cung cấp', explanation: 'Bước tiếp theo đang được quyết định bởi danh mục tính năng, không bởi vấn đề vận hành cụ thể.' },
    F6: { label: 'Hệ thống song song', explanation: 'Đã chi tiền cho phần mềm, nhưng vận hành thật diễn ra ở nơi khác — cấp vận hành thực tế thấp hơn cấp khai báo.' },
  },
  en: {
    F1: { label: 'Scan Is Not Digitalization', explanation: 'Records are images or paper; not analyzable, not queryable — blocks the gate to Level 3.' },
    F2: { label: 'Re-entry at Every Stage', explanation: 'Each re-entry is a point of potential error, delay, and loss — blocks the gate to Level 4.' },
    F3: { label: 'Questions Take Minutes, Answers Take Days', explanation: 'Slow decisions; the highest opportunity cost of the four cost types — blocks the gate to Level 4.' },
    F4: { label: 'Big Bang Precedent', explanation: 'History shows the organization is likely to repeat the large-project trap; highest risk before a new investment.' },
    F5: { label: 'Vendor-Driven Investment', explanation: 'The next step is being decided by a feature list, not by a specific operational problem.' },
    F6: { label: 'Parallel Systems', explanation: 'Money has been spent on software, but actual work happens elsewhere — the operational level is lower than the declared level.' },
  }
};

const DIG_RECS_VI = {
  D1: {
    low: 'Mỗi tài liệu cốt lõi một bản hiệu lực, có người duyệt; chuyển hồ sơ quan trọng nhất sang biểu mẫu số có trường cố định. Hỏi: hồ sơ nào đang là ảnh/PDF? Tài liệu nào có nhiều bản?',
    high: 'Rà hồ sơ theo yêu cầu kiểm soát của ISO/GMP: nhận diện, truy xuất, toàn vẹn, phân quyền.',
  },
  D2: {
    low: 'Chọn 1 luồng phê duyệt hay tắc nhất; đưa vào một công cụ có trạng thái và lịch sử. Hỏi: phê duyệt nào chờ lâu nhất?',
    high: 'Theo dõi NC/CAPA đến khi đóng và kiểm tra hiệu quả — điểm bắt đầu phổ biến của progressive eQMS.',
  },
  D3: {
    low: 'Vẽ luồng một đơn hàng từ nhận đơn đến giao hàng; đánh dấu mọi chỗ nhập lại. Hỏi: thông tin bị nhập lại ở đâu? Báo cáo nào đang làm tay?',
    high: 'Nối hai hệ thống có nhiều lần nhập lại nhất; xây 5 báo cáo cho 5 câu hỏi CEO hay hỏi.',
  },
  D4: {
    low: 'Ghi lại lý do của các thay đổi quan trọng (nhà cung cấp, công thức, thông số) ngay khi quyết định. Hỏi: thay đổi gần nhất ảnh hưởng tới đâu, ai biết?',
    high: 'Lập bảng quan hệ sản phẩm – nguyên liệu – nhà cung cấp – quy trình.',
  },
  D5: {
    low: 'Trước khoản đầu tư số hóa kế tiếp, trả lời 4 câu hỏi của bài 4.9 bằng văn bản; giới hạn giai đoạn đầu trong 3–6 tháng.',
    high: 'Đo mức sử dụng thực tế của từng hệ thống đang có; tắt dần Excel song song ở một bộ phận.',
  },
};

const DIG_RECS_EN = {
  D1: {
    low: 'One effective version per core document with a designated approver; convert the most important records to digital forms with fixed fields. Ask: which records are images/PDFs? Which documents have multiple versions?',
    high: 'Audit records against ISO/GMP control requirements: identification, retrievability, integrity, access control.',
  },
  D2: {
    low: 'Choose the most bottlenecked approval flow; move it to a tool that tracks status and history. Ask: which approval takes the longest to complete?',
    high: 'Track NC/CAPA through to closure and verify effectiveness — the most common starting point for progressive eQMS.',
  },
  D3: {
    low: 'Map one order from receipt to delivery; mark every point of re-entry. Ask: where is information re-entered? Which reports are produced manually?',
    high: 'Connect the two systems with the most re-entry points; build 5 reports for the 5 questions the CEO asks most often.',
  },
  D4: {
    low: 'Record the reasoning behind important changes (suppliers, formulas, parameters) at the moment of decision. Ask: who knows what the last change affected?',
    high: 'Build a relationship table: products – materials – suppliers – processes.',
  },
  D5: {
    low: 'Before the next digitalization investment, answer the 4 questions from article 4.9 in writing; limit the first phase to 3–6 months.',
    high: 'Measure actual usage of each existing system; gradually phase out parallel spreadsheets in one department.',
  },
};

const DIG_NEXT_STEPS_VI = {
  1: 'Chọn 1–2 hồ sơ quan trọng nhất của mảng; chuyển từ giấy sang biểu mẫu số có trường cố định (có thể chỉ là bảng tính có cấu trúc hoặc form trực tuyến). Không nhất thiết cần phần mềm mới.',
  2: 'Thống nhất một mẫu ghi nhận cho mảng; một nơi lưu, một người phụ trách; kiểm soát phiên bản tài liệu cốt lõi. Không nhất thiết cần phần mềm mới — có thể là DMS đơn giản.',
  3: 'Nối dữ liệu của mảng này với mảng liền kề (ví dụ: QC với lô sản xuất); hoặc một module eQMS cho vấn đề tuân thủ cụ thể. Ưu tiên dùng tốt hệ thống hiện có trước khi mua mới.',
  4: 'Gắn tri thức và bối cảnh vào dữ liệu (lý do quyết định, quan hệ sản phẩm – quy trình – nhà cung cấp). Xem KM Maturity và AI Readiness trước khi quyết định đầu tư.',
};

const DIG_NEXT_STEPS_EN = {
  1: 'Choose the 1–2 most important records for this area; convert from paper to digital forms with fixed fields (a structured spreadsheet or online form is sufficient). New software is not necessarily required.',
  2: 'Standardize one recording template for the area; one storage location, one responsible person; version control for core documents. New software is not necessarily required — a simple DMS may be enough.',
  3: 'Connect this area\'s data with the adjacent area (e.g., QC with production batches); or add an eQMS module for a specific compliance issue. Prioritize getting more from existing systems before buying new ones.',
  4: 'Add knowledge and context to data (decision rationale, product–process–supplier relationships). Review KM Maturity and AI Readiness before deciding on investment.',
};

// ─── Digitalization Level scoring functions ───────────────────────────────────

function getDIGSysInfo(answers) {
  const q0 = answers.find(a => a.question_id === 'Q0-SYSTEMS');
  const selected = q0?.selected_keys || [];
  if (selected.includes('H')) return { systemCount: 0, hasERP: false, hasDMS: false, noSoftware: true };
  const systemCount = selected.filter(k => ['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(k)).length;
  return { systemCount, hasERP: selected.includes('B'), hasDMS: selected.includes('E'), noSoftware: false };
}

function getDIGAreaLevels(answers) {
  const q1 = answers.find(a => a.question_id === 'Q1-AREA-MAP');
  const areaAnswers = q1?.area_answers || {};
  const colToLevel = { A: 1, B: 2, C: 3, D: 4 };
  const areas = {};
  for (const k of ['QC', 'MFG', 'WH', 'PS', 'FA']) {
    const col = areaAnswers[k];
    areas[k] = (!col || col === 'U') ? null : (colToLevel[col] ?? null);
  }
  return areas;
}

function getDIGAreaSummary(areaLevels, lang) {
  const areaNames = lang === 'en' ? DIG_AREA_NAMES_EN : DIG_AREA_NAMES_VI;
  const defined = Object.entries(areaLevels).filter(([, l]) => l !== null);
  if (defined.length === 0) return { weakestKey: null, weakestLevel: null, weakestName: null, strongestKey: null, strongestLevel: null, strongestName: null, gap: 0 };

  // Priority order for tie-breaking weakest: MFG, QC, WH, PS, FA
  const priority = { MFG: 0, QC: 1, WH: 2, PS: 3, FA: 4 };
  const sorted = [...defined].sort((a, b) => a[1] - b[1] || (priority[a[0]] ?? 99) - (priority[b[0]] ?? 99));
  const [weakestKey, weakestLevel] = sorted[0];
  const [strongestKey, strongestLevel] = sorted[sorted.length - 1];

  return {
    weakestKey,
    weakestLevel,
    weakestName: areaNames[weakestKey],
    strongestKey,
    strongestLevel,
    strongestName: areaNames[strongestKey],
    gap: strongestLevel - weakestLevel,
  };
}

function getDIGFlags(answers, questions, noSoftware) {
  const s = (qId) => getPrdScore(qId, answers, questions);
  const flags = [];
  const q3 = s('Q3-RECORD-FORMAT');
  const q6 = s('Q6-RE-ENTRY');
  const q7 = s('Q7-QUERY-SPEED');
  const q9 = s('Q9-IMPL-APPROACH');
  const q10 = s('Q10-INVEST-BASIS');
  const q11 = s('Q11-SYSTEM-USAGE');
  if (q3 !== null && q3 <= 1) flags.push('F1');
  if (q6 === 0) flags.push('F2');
  if (q7 === 0) flags.push('F3');
  if (q9 === 0) flags.push('F4');
  if (q10 === 0) flags.push('F5');
  if (!noSoftware && q11 === 0) flags.push('F6');
  return flags;
}

function getDIGDims(answers, questions, noSoftware) {
  const d5Qs = noSoftware
    ? ['Q9-IMPL-APPROACH', 'Q10-INVEST-BASIS']
    : ['Q9-IMPL-APPROACH', 'Q10-INVEST-BASIS', 'Q11-SYSTEM-USAGE'];
  return {
    D1: calcDimension(['Q2-DOC-ACCESS', 'Q3-RECORD-FORMAT'], answers, questions),
    D2: calcDimension(['Q4-APPROVAL-FLOW', 'Q5-NC-TRACKING'], answers, questions),
    D3: calcDimension(['Q6-RE-ENTRY', 'Q7-QUERY-SPEED'], answers, questions),
    D4: calcDimension(['Q8-CHANGE-CONTEXT'], answers, questions),
    D5: calcDimension(d5Qs, answers, questions),
  };
}

function getDIGOverallLevel(dims, flags, areaLevels) {
  const { D1, D2, D3, D4 } = dims;
  const ge = (dim, thr) => dim.score !== null && dim.score >= thr;
  const definedAreas = Object.values(areaLevels).filter(l => l !== null);
  const areasAtL3Plus = definedAreas.filter(l => l >= 3).length;

  const l2ok = ge(D1, 1.00);
  const l3ok = l2ok && ge(D1, 1.75) && ge(D2, 1.50) && !flags.includes('F1');
  const l4ok = l3ok && ge(D2, 1.75) && ge(D3, 1.75) && !flags.includes('F2') && !flags.includes('F3') && areasAtL3Plus >= 3;
  const l5ok = l4ok && ge(D3, 2.50) && ge(D4, 2.00) && ge(D1, 2.00) && ge(D2, 2.00) && !flags.includes('F6');

  let gateLevel = 1;
  if (l2ok) gateLevel = 2;
  if (l3ok) gateLevel = 3;
  if (l4ok) gateLevel = 4;
  if (l5ok) gateLevel = 5;

  // Ceiling from D1-D4 average (D5 excluded per PRD)
  const d14 = [D1, D2, D3, D4].filter(d => d.score !== null);
  if (d14.length === 0) return 1;
  const avg = d14.reduce((s, d) => s + d.score, 0) / d14.length;
  let ceiling;
  if (avg < 0.75) ceiling = 1;
  else if (avg < 1.50) ceiling = 2;
  else if (avg < 2.00) ceiling = 3;
  else if (avg < 2.50) ceiling = 4;
  else ceiling = 5;

  return Math.min(gateLevel, ceiling);
}

function getDIGActualLevel(level, flags, q11PrdScore) {
  if (flags.includes('F6')) return Math.max(1, level - 1);
  return level;
}

function getDIGSoftwareGapMessage(systemCount, d3Score, lang) {
  if (systemCount >= 3 && d3Score !== null && d3Score < 1.50) {
    return lang === 'en'
      ? `${systemCount} systems are creating ${systemCount} silos. The next step is not adding software, but connecting what already exists.`
      : `${systemCount} hệ thống đang tạo ra ${systemCount} silo. Bước tiếp theo không phải thêm phần mềm, mà là nối những gì đang có.`;
  }
  if (systemCount <= 2 && d3Score !== null && d3Score >= 1.75) {
    return lang === 'en'
      ? 'Few tools, but information flows well — can expand without creating new silos.'
      : 'Ít công cụ nhưng thông tin chạy được; có thể mở rộng mà không tạo silo mới.';
  }
  return null;
}

function getDIGArchetype(dims, flags, sysInfo, areaGap, level, q11PrdScore, lang) {
  const { D3, D5 } = dims;
  const archetypes = lang === 'en' ? DIG_ARCHETYPES_EN : DIG_ARCHETYPES_VI;
  const { systemCount, hasERP, noSoftware } = sysInfo;

  if (!noSoftware && systemCount >= 3 && D3.score !== null && D3.score < 1.50) return archetypes[0];
  if (!noSoftware && (flags.includes('F6') || (q11PrdScore === 1 && hasERP))) return archetypes[1];
  if (flags.includes('F1') && dims.D1.score !== null && dims.D1.score >= 1.00) return archetypes[2];
  if (areaGap >= 2) return archetypes[3];
  if (flags.includes('F4') || flags.includes('F5') || (D5.score !== null && D5.score < 1.25)) return archetypes[4];
  if (level >= 4) return archetypes[5];
  return archetypes[6];
}

function getDIGDescription(level, label, weakestAreaName, lang) {
  if (!weakestAreaName) {
    return lang === 'en'
      ? `Your organization is at Level ${level} — ${label}.`
      : `Doanh nghiệp của anh/chị đang ở cấp ${level} — ${label}.`;
  }
  return lang === 'en'
    ? `Your organization is at Level ${level} — ${label}. The area to strengthen first is ${weakestAreaName}.`
    : `Doanh nghiệp của anh/chị đang ở cấp ${level} — ${label}. Mảng cần được nâng trước là ${weakestAreaName}.`;
}

function getDIG90DayRecs(dims, flags, lang) {
  const recs = lang === 'en' ? DIG_RECS_EN : DIG_RECS_VI;
  const dimOrder = ['D1', 'D2', 'D3', 'D4', 'D5'];
  const foundationDims = ['D1', 'D2', 'D3'];

  const sorted = dimOrder
    .filter(k => dims[k].score !== null)
    .sort((a, b) => {
      const sa = dims[a].score, sb = dims[b].score;
      const fa = foundationDims.includes(a), fb = foundationDims.includes(b);
      if (Math.abs(sa - sb) < 0.01) return fa && !fb ? -1 : !fa && fb ? 1 : 0;
      return sa - sb;
    });

  const actions = [];
  const covered = new Set();

  if (flags.includes('F2') && actions.length < 3) {
    actions.push(lang === 'en'
      ? 'Map one complete order flow from receipt to delivery; mark every re-entry point and estimate how much time it costs per month.'
      : 'Vẽ luồng một đơn hàng từ nhận đơn đến giao hàng; đánh dấu mọi chỗ nhập lại và ước tính mỗi chỗ tốn bao nhiêu giờ mỗi tháng.');
    covered.add('D3');
  }
  if (flags.includes('F1') && actions.length < 3) {
    actions.push(lang === 'en'
      ? 'Convert the most important quality or operational record from scan/paper to a structured digital form with fixed fields.'
      : 'Chuyển hồ sơ chất lượng hoặc vận hành quan trọng nhất từ scan/giấy sang biểu mẫu số có trường cố định.');
    covered.add('D1');
  }
  for (const key of sorted) {
    if (actions.length >= 3) break;
    if (!covered.has(key) && dims[key].level !== null && dims[key].level <= 2) {
      actions.push(recs[key].low);
      covered.add(key);
    }
  }
  for (const key of sorted) {
    if (actions.length >= 3) break;
    if (!covered.has(key)) {
      actions.push(recs[key].high);
      covered.add(key);
    }
  }
  // If still under 3, use high recs from already-covered dims
  for (const key of sorted) {
    if (actions.length >= 3) break;
    actions.push(recs[key].high);
  }
  return actions.slice(0, 3);
}

// ─── End Digitalization Level scoring ────────────────────────────────────────

// ─── Database helpers (Supabase REST — no npm dependency) ────────────────────

async function dbInsertLead(lead) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    console.warn('[db] Supabase not configured — lead not persisted');
    return null;
  }
  const res = await fetch(`${url}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`DB insert ${res.status}: ${msg}`);
  }
  const rows = await res.json();
  return Array.isArray(rows) ? rows[0] : rows;
}

async function dbGetLeads(status = 'PENDING', limit = 50) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Supabase not configured');
  const res = await fetch(
    `${url}/rest/v1/leads?status=eq.${encodeURIComponent(status)}&order=created_at.asc&limit=${limit}`,
    { headers: { apikey: key, Authorization: `Bearer ${key}` } }
  );
  if (!res.ok) throw new Error(`DB query ${res.status}`);
  return await res.json();
}

async function dbAckLeads(leadIds) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Supabase not configured');
  const res = await fetch(`${url}/rest/v1/leads?id=in.(${leadIds.join(',')})`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ status: 'PROCESSED', processed_at: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`DB ack ${res.status}`);
  return await res.json();
}

// ─── Telegram notification (awaited — must complete before Vercel terminates) ──

async function sendTelegramAlert(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn('[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping');
    return;
  }

  const h = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const isAI = lead.assessment_id === 'ai_readiness';
  const typeName = lead.assessment_id === 'erp_readiness' ? 'ERP Readiness'
                 : lead.assessment_id === 'ai_readiness' ? 'AI Readiness'
                 : lead.assessment_id === 'digitalization_level' ? 'Digitalization Level'
                 : lead.assessment_id;
  const source = lead.utm_source
    ? `${h(lead.utm_source)}${lead.utm_medium ? '/' + h(lead.utm_medium) : ''}`
    : 'direct';
  const time = new Date(lead.created_at || new Date()).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  // Level line — append readiness index if available
  let levelLine = lead.assessment_level
    ? `L${lead.assessment_level} — ${h(lead.assessment_label || '—')}`
    : '—';
  if (lead.assessment_readiness_index != null) {
    levelLine += ` (${lead.assessment_readiness_index}%)`;
  }

  // Archetype — prefer human-readable label over code
  const archetypeDisplay = lead.assessment_archetype_label || lead.assessment_archetype || '—';

  // AI gap label (e.g., "AI đang chạy trước nền")
  const gapLine = isAI && lead.assessment_gap_label
    ? `↕ ${h(lead.assessment_gap_label)}\n`
    : '';

  // Critical flags (e.g., "F1, F3")
  const flags = Array.isArray(lead.assessment_critical_flags) ? lead.assessment_critical_flags : [];
  const flagsLine = flags.length > 0
    ? `⚑ ${flags.join(', ')}\n`
    : '';

  const text =
    `🔔 <b>Lead mới — ${h(typeName)}</b>\n\n` +
    `👤 ${h(lead.fullname || '—')}\n` +
    `🏢 ${h(lead.org_name || '—')} · ${h(lead.role || '—')}\n` +
    `📞 <code>${h(lead.contact || '—')}</code>\n\n` +
    `📊 ${h(levelLine)}\n` +
    gapLine +
    `🔑 ${h(archetypeDisplay)}\n` +
    flagsLine +
    `\n🌐 ${lead.language === 'en' ? 'EN' : 'VI'} · 📍 ${h(source)}\n` +
    `🕐 ${h(time)} · ⏳ PENDING`;

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
  if (!tgRes.ok) {
    const errBody = await tgRes.text().catch(() => '');
    console.error(`[telegram] Failed ${tgRes.status}: ${errBody}`);
  }
}

// ─── Internal API auth ────────────────────────────────────────────────────────

function isInternalAuthorized(req) {
  const secret = process.env.INTERNAL_SECRET_TOKEN;
  if (!secret) return false;
  const auth = (req.headers['authorization'] || '').trim();
  return auth === `Bearer ${secret}`;
}

// ─────────────────────────────────────────────────────────────────────────────

function loadQuestions(assessmentId, language) {
  const lang = language === 'en' ? 'en' : 'vi';
  const config = CONFIGS[assessmentId]?.[lang];
  if (!config) throw new Error(`Assessment ${assessmentId} not found`);
  return {
    assessment_id: config.assessment_id,
    title: config.title,
    intro: config.intro,
    questions: config.questions.map(q => {
      const base = {
        id: q.id,
        text: q.text,
        type: q.type || 'single_select',
        options: (q.options || []).map(o => {
          const opt = { key: o.key, text: o.text };
          if (o.exclusive) opt.exclusive = true;
          return opt;
        }),
      };
      if (q.rows) base.rows = q.rows; // matrix row definitions
      return base;
    })
  };
}

// Full config (with scores) for scoring — separate from display config
function getRawConfig(assessmentId, language) {
  const lang = language === 'en' ? 'en' : 'vi';
  return CONFIGS[assessmentId]?.[lang];
}

// ─── HTTP handler ─────────────────────────────────────────────────────────────

export default async function handler(req, res) {
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
        const q0Answer = answers.find(a => a.question_id === 'Q0-CONTEXT')?.selected_key || null;

        // ── AI Readiness scoring path ───────────────────────────────────────
        if (assessment_id === 'ai_readiness') {
          const dims = {
            D1: calcDimension(['Q1-DATA-QUERY', 'Q2-TRACEABILITY'], answers, questions),
            D2: calcDimension(['Q3-PROCESS-CLARITY', 'Q4-DECISION-FLOW'], answers, questions),
            D3: calcDimension(['Q5-TACIT-KNOWLEDGE', 'Q6-DOCUMENT-CONTROL'], answers, questions),
            D4: calcDimension(['Q7-EVIDENCE-TRAIL', 'Q8-DECISION-CONTEXT'], answers, questions),
            D5: calcDimension(['Q9-AI-GOVERNANCE', 'Q10-AI-REVIEW'], answers, questions),
            D6: calcDimension(['Q11-AI-PROBLEM'], answers, questions),
          };

          const totalBlindSpots = Object.values(dims).reduce((s, d) => s + d.blindSpots, 0);
          const provisional = totalBlindSpots >= 3;

          const flags = getAIFlags(answers, questions, q0Answer);
          const q11PrdScore = getPrdScore('Q11-AI-PROBLEM', answers, questions);
          const q4PrdScore = getPrdScore('Q4-DECISION-FLOW', answers, questions);
          const level = getAIOverallLevel(dims, flags, q11PrdScore);
          const gap = getAIGap(q0Answer, level);

          const aiLevelLabels = lang === 'en' ? AI_LEVEL_LABELS_EN : AI_LEVEL_LABELS_VI;
          const label = level ? aiLevelLabels[level] : (lang === 'en' ? 'Insufficient data' : 'Chưa đủ dữ liệu');

          const description = getAIMessage(dims, flags, gap, q0Answer, lang);
          const archetype = getAIArchetype(dims, flags, gap, q0Answer, q4PrdScore, lang);
          const recommendations = getAI90DayRecs(dims, flags, lang);

          const dimLabels = lang === 'en' ? DIM_LABELS_EN : DIM_LABELS_VI;
          const dimNames = lang === 'en' ? AI_DIM_NAMES_EN : AI_DIM_NAMES_VI;
          const dimensionScores = {};
          for (const [key, val] of Object.entries(dims)) {
            const baseLabel = val.undetermined
              ? (lang === 'en' ? 'Undetermined — needs detailed assessment' : 'Chưa xác định — cần đánh giá chi tiết')
              : dimLabels[val.level] || '';
            dimensionScores[key] = {
              name: dimNames[key],
              score: val.score !== null ? Math.round(val.score * 100) / 100 : null,
              level: val.level,
              label: val.estimated ? baseLabel + ' (' + (lang === 'en' ? 'estimated' : 'ước tính') + ')' : baseLabel,
              estimated: val.estimated,
              undetermined: val.undetermined,
            };
          }

          const flagDetails = flags.map(f => ({ code: f, ...AI_FLAG_LABELS[lang][f] }));

          const definedDimsAI = Object.values(dims).filter(d => d.score !== null);
          const avgAI = definedDimsAI.length > 0
            ? definedDimsAI.reduce((s, d) => s + d.score, 0) / definedDimsAI.length : 0;
          const readinessIndex = Math.round(avgAI * 100 / 3);

          // Gap label
          let gapLabel = null;
          if (gap !== null) {
            if (gap >= 1) {
              gapLabel = lang === 'en' ? 'AI ahead of foundation' : 'AI đang chạy trước nền';
            } else if (gap === 0) {
              gapLabel = lang === 'en' ? 'Aligned' : 'Tương xứng';
            } else if (q0Answer === 'A' && level === 1) {
              gapLabel = lang === 'en'
                ? 'Ready to start with governed individual AI'
                : 'Sẵn sàng bắt đầu với AI cá nhân có kiểm soát';
            } else {
              gapLabel = lang === 'en' ? 'Foundation ready, under-utilized' : 'Có nền, chưa khai thác';
            }
          }

          return res.status(200).json({
            submission_id: 'sub_' + Date.now(),
            assessment_id,
            level,
            label,
            description,
            provisional,
            gap,
            gap_label: gapLabel,
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
        }

        // ── Digitalization Level scoring path ──────────────────────────────
        if (assessment_id === 'digitalization_level') {
          const sysInfo = getDIGSysInfo(answers);
          const areaLevels = getDIGAreaLevels(answers);
          const dims = getDIGDims(answers, questions, sysInfo.noSoftware);

          const totalBlindSpots = Object.values(dims).reduce((s, d) => s + d.blindSpots, 0);
          const provisional = totalBlindSpots >= 3;

          const flags = getDIGFlags(answers, questions, sysInfo.noSoftware);
          const q11PrdScore = getPrdScore('Q11-SYSTEM-USAGE', answers, questions);
          const level = getDIGOverallLevel(dims, flags, areaLevels);
          const actualLevel = getDIGActualLevel(level, flags, q11PrdScore);

          const digLevelLabels = lang === 'en' ? DIG_LEVEL_LABELS_EN : DIG_LEVEL_LABELS_VI;
          const label = level ? digLevelLabels[level] : (lang === 'en' ? 'Insufficient data' : 'Chưa đủ dữ liệu');
          const actualLabel = actualLevel && actualLevel !== level ? digLevelLabels[actualLevel] : null;

          const areaSummary = getDIGAreaSummary(areaLevels, lang);
          const areaNames = lang === 'en' ? DIG_AREA_NAMES_EN : DIG_AREA_NAMES_VI;
          const softwareGapMessage = getDIGSoftwareGapMessage(sysInfo.systemCount, dims.D3.score, lang);
          const archetype = getDIGArchetype(dims, flags, sysInfo, areaSummary.gap, level, q11PrdScore, lang);
          const description = getDIGDescription(level, label, areaSummary.weakestName, lang);
          const recommendations = getDIG90DayRecs(dims, flags, lang);

          const nextSteps = lang === 'en' ? DIG_NEXT_STEPS_EN : DIG_NEXT_STEPS_VI;
          const nextStep = areaSummary.weakestLevel ? nextSteps[areaSummary.weakestLevel] : null;

          const digDimLabels = lang === 'en' ? DIG_DIM_LABELS_EN : DIG_DIM_LABELS_VI;
          const digDimNames = lang === 'en' ? DIG_DIM_NAMES_EN : DIG_DIM_NAMES_VI;
          const dimensionScores = {};
          for (const [key, val] of Object.entries(dims)) {
            const baseLabel = val.undetermined
              ? (lang === 'en' ? 'Undetermined — needs detailed assessment' : 'Chưa xác định — cần đánh giá chi tiết')
              : digDimLabels[val.level] || '';
            dimensionScores[key] = {
              name: digDimNames[key],
              score: val.score !== null ? Math.round(val.score * 100) / 100 : null,
              level: val.level,
              label: val.estimated ? baseLabel + ' (' + (lang === 'en' ? 'estimated' : 'ước tính') + ')' : baseLabel,
              estimated: val.estimated,
              undetermined: val.undetermined,
            };
          }

          const flagDetails = flags.map(f => ({ code: f, ...DIG_FLAG_LABELS[lang][f] }));

          // Readiness index from D1-D4 only (D5 excluded per PRD)
          const d14 = [dims.D1, dims.D2, dims.D3, dims.D4].filter(d => d.score !== null);
          const avgD14 = d14.length > 0 ? d14.reduce((s, d) => s + d.score, 0) / d14.length : 0;
          const readinessIndex = Math.round(avgD14 * 100 / 3);

          // Area map with names for display
          const areaMap = {};
          for (const k of ['QC', 'MFG', 'WH', 'PS', 'FA']) {
            areaMap[k] = { level: areaLevels[k], name: areaNames[k] };
          }

          return res.status(200).json({
            submission_id: 'sub_' + Date.now(),
            assessment_id,
            level,
            label,
            description,
            provisional,
            actual_level: actualLevel !== level ? actualLevel : null,
            actual_level_label: actualLabel,
            area_map: areaMap,
            weakest_area: areaSummary.weakestKey ? { key: areaSummary.weakestKey, name: areaSummary.weakestName, level: areaSummary.weakestLevel } : null,
            strongest_area: areaSummary.strongestKey ? { key: areaSummary.strongestKey, name: areaSummary.strongestName, level: areaSummary.strongestLevel } : null,
            area_gap: areaSummary.gap,
            software_gap_message: softwareGapMessage,
            archetype: archetype.code,
            archetype_label: archetype.label,
            archetype_description: archetype.description,
            archetype_risk: archetype.risk,
            flags: flagDetails,
            critical_flags: flags,
            dimension_scores: dimensionScores,
            next_step: nextStep,
            recommendations,
            related_links: [],
            insufficient_data_message: level === null
              ? (lang === 'en' ? 'Insufficient data for a complete assessment.' : 'Chưa đủ dữ liệu để đánh giá đầy đủ.')
              : null,
            readiness_index: readinessIndex,
            system_count: sysInfo.systemCount,
          });
        }

        // ── ERP Readiness scoring path ──────────────────────────────────────
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

    // Contact submission → lead queue
    if (pathname === '/api/assessment/contact' && req.method === 'POST') {
      const body = req.body || {};
      const {
        submission_id, assessment_id, org_name, role, fullname, contact,
        language: bodyLang,
        assessment_level, assessment_label, assessment_archetype,
        assessment_archetype_label, assessment_critical_flags,
        assessment_gap_label, assessment_readiness_index,
        utm_source, utm_medium, utm_campaign,
      } = body;

      if (!assessment_id) return res.status(400).json({ error: 'assessment_id required' });

      // Only columns that exist in the leads table schema
      const lead = {
        submission_id: submission_id || null,
        assessment_id,
        org_name: org_name || null,
        role: role || null,
        fullname: fullname || null,
        contact: contact || null,
        language: bodyLang || language || 'vi',
        assessment_level: assessment_level != null ? Number(assessment_level) : null,
        assessment_label: assessment_label || null,
        assessment_archetype: assessment_archetype || null,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
      };

      // Extra context for Telegram only (not in DB schema)
      const telegramContext = {
        assessment_archetype_label: assessment_archetype_label || null,
        assessment_critical_flags: Array.isArray(assessment_critical_flags) ? assessment_critical_flags : [],
        assessment_gap_label: assessment_gap_label || null,
        assessment_readiness_index: assessment_readiness_index != null ? Number(assessment_readiness_index) : null,
      };

      // Save to Supabase — failure is logged but does NOT block Telegram
      let saved = null;
      try {
        saved = await dbInsertLead(lead);
      } catch (dbErr) {
        console.error('[contact] DB error (non-fatal):', dbErr.message);
      }

      // Telegram is awaited so Vercel does not terminate before the request completes
      try {
        await sendTelegramAlert({
          ...lead,
          ...telegramContext,
          created_at: new Date().toISOString(),
          ...(saved || {}),
        });
      } catch (tgErr) {
        console.error('[contact] Telegram error (non-fatal):', tgErr.message);
      }

      return res.status(200).json({
        status: 'success',
        message: language === 'en' ? 'Contact information received' : 'Đã nhận thông tin liên hệ',
        lead_id: saved?.id || null,
      });
    }

    // Internal: get pending leads (polled by internal server during business hours)
    if (pathname === '/api/internal/leads' && req.method === 'GET') {
      if (!isInternalAuthorized(req)) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const status = url.searchParams.get('status') || 'PENDING';
        const limit = Math.min(parseInt(url.searchParams.get('limit') || '50', 10), 200);
        const leads = await dbGetLeads(status, limit);
        return res.status(200).json({ leads, count: leads.length });
      } catch (error) {
        console.error('[internal/leads] Error:', error);
        return res.status(500).json({ error: error.message });
      }
    }

    // Internal: acknowledge (mark as PROCESSED) a batch of leads
    if (pathname === '/api/internal/leads/ack' && req.method === 'POST') {
      if (!isInternalAuthorized(req)) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const { lead_ids } = req.body || {};
        if (!Array.isArray(lead_ids) || lead_ids.length === 0) {
          return res.status(400).json({ error: 'lead_ids array required' });
        }
        const updated = await dbAckLeads(lead_ids);
        return res.status(200).json({
          status: 'success',
          updated: Array.isArray(updated) ? updated.length : lead_ids.length,
          processed_at: new Date().toISOString(),
        });
      } catch (error) {
        console.error('[internal/leads/ack] Error:', error);
        return res.status(500).json({ error: error.message });
      }
    }

    return res.status(404).json({ error: 'Not found', path: pathname });
  } catch (error) {
    console.error('[handler] Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
