/**
 * Assessment API - Vercel Serverless Function
 * Handler format (working format from test-node.js)
 */

// Minimal test data - replace with file loading once deployment works
const TEST_CONFIG = {
  erp_readiness: {
    vi: {
      assessment_id: 'erp_readiness',
      title: 'Đánh giá sẵn sàng ERP',
      intro: 'Phiếu khảo sát này giúp bạn đánh giá khả năng sẵn sàng của tổ chức trước khi triển khai ERP.',
      questions: [
        {
          id: 'Q0-CONTEXT',
          text: 'Tổ chức của bạn ở giai đoạn nào với ERP?',
          type: 'context',
          options: [
            { key: 'A', text: 'Chưa có ERP, đang xem xét' },
            { key: 'B', text: 'Đã quyết định triển khai' }
          ]
        }
      ]
    },
    en: {
      assessment_id: 'erp_readiness',
      title: 'ERP Readiness Assessment',
      intro: 'This questionnaire helps you assess your organization\'s readiness before implementing ERP.',
      questions: [
        {
          id: 'Q0-CONTEXT',
          text: 'At which stage is your organization with ERP?',
          type: 'context',
          options: [
            { key: 'A', text: 'No ERP yet, considering whether to implement' },
            { key: 'B', text: 'Decided to implement, looking for solutions' }
          ]
        }
      ]
    }
  }
};

function loadQuestions(assessmentId, language = 'vi') {
  const lang = language === 'en' ? 'en' : 'vi';
  const config = TEST_CONFIG[assessmentId]?.[lang];

  if (!config) {
    console.error(`[loadQuestions] Config not found: ${assessmentId} (${lang})`);
    throw new Error(`Assessment ${assessmentId} not found`);
  }

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

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const language = url.searchParams.get('language') || 'vi';

    console.log(`[assessment] ${req.method} ${pathname}`);

    // Health check
    if (pathname === '/api/health') {
      return res.status(200).json({ status: 'ok', message: 'Assessment API is running' });
    }

    // Get questions
    const qMatch = pathname.match(/^\/api\/assessment\/([^/]+)\/questions\/?$/);
    if (qMatch && req.method === 'GET') {
      const assessmentId = qMatch[1];
      console.log(`[assessment] Loading ${assessmentId} in ${language}`);

      try {
        const config = loadQuestions(assessmentId, language);
        return res.status(200).json(config);
      } catch (error) {
        console.error(`[assessment] Failed to load ${assessmentId}:`, error);
        return res.status(404).json({ error: `Assessment ${assessmentId} not found` });
      }
    }

    // Submit assessment
    if (pathname === '/api/assessment/submit' && req.method === 'POST') {
      const labels = {
        en: ['Early Stage', 'Developing', 'Fairly Ready', 'Ready'],
        vi: ['Mới bắt đầu', 'Đang hình thành', 'Khá sẵn sàng', 'Sẵn sàng']
      };

      const descriptions = {
        en: [
          'Your organization lacks the process and data foundation to make ERP valuable immediately.',
          'Some foundation exists but consistency is lacking.',
          'Most conditions are met. Before finalizing scope, carefully address remaining gaps.',
          'Your organization has a solid foundation for successful ERP implementation.'
        ],
        vi: [
          'Doanh nghiệp chưa có nền tảng quy trình/dữ liệu đủ ổn định để ERP tạo ra giá trị ngay.',
          'Đã có một số nền tảng nhưng còn thiếu tính nhất quán.',
          'Phần lớn điều kiện đã có.',
          'Doanh nghiệp có nền tảng tốt để ERP implementation đạt hiệu quả cao.'
        ]
      };

      const lang = language === 'en' ? 'en' : 'vi';
      const levelIndex = Math.floor(Math.random() * 4);

      return res.status(200).json({
        assessment_id: 'erp_readiness',
        level: levelIndex + 1,
        label: labels[lang][levelIndex],
        description: descriptions[lang][levelIndex],
        insufficient_data_message: lang === 'en' ? 'Insufficient data.' : 'Chưa đủ dữ liệu.',
        related_links: [],
        submission_id: `sub_${Date.now()}`,
        critical_flags: [],
        dimension_scores: {},
        flags: []
      });
    }

    // 404
    res.status(404).json({ error: 'Not found', path: pathname });
  } catch (error) {
    console.error('[handler] Error:', error);
    res.status(500).json({ error: error.message });
  }
}
