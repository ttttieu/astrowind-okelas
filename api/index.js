/**
 * Assessment API - Vercel Serverless Function
 * Handler format (working format from test-node.js)
 */

// Assessment configurations embedded for Vercel deployment
// (File system access not available in Vercel functions)
import CONFIG_VI from './config-vi.js';
import CONFIG_EN from './config-en.js';

const CONFIGS = {
  erp_readiness: {
    vi: CONFIG_VI,
    en: CONFIG_EN
  }
};

function loadQuestions(assessmentId, language = 'vi') {
  const lang = language === 'en' ? 'en' : 'vi';
  const config = CONFIGS[assessmentId]?.[lang];

  if (!config) {
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

    // Submit assessment - with simple scoring
    if (pathname === '/api/assessment/submit' && req.method === 'POST') {
      try {
        const submission = req.body || {};
        const answers = submission.answers || [];

        // Simple scoring: average of scored questions
        let totalScore = 0;
        let scoredCount = 0;

        for (const answer of answers) {
          const config = loadQuestions(submission.assessment_id, language);
          const question = config.questions.find(q => q.id === answer.question_id);

          if (question && answer.selected_key) {
            const option = question.options.find(o => o.key === answer.selected_key);
            if (option && option.score) {
              totalScore += option.score;
              scoredCount++;
            }
          }
        }

        const avgScore = scoredCount > 0 ? totalScore / scoredCount : 0;

        // Map to levels (1-4 scale)
        let levelIndex = 0;
        if (avgScore < 1.8) levelIndex = 0;       // 1.0-1.7: Early Stage
        else if (avgScore < 2.6) levelIndex = 1;  // 1.8-2.5: Developing
        else if (avgScore < 3.4) levelIndex = 2;  // 2.6-3.3: Fairly Ready
        else levelIndex = 3;                        // 3.4-4.0: Ready

        const labels = {
          en: ['Early Stage', 'Developing', 'Fairly Ready', 'Ready'],
          vi: ['Mới bắt đầu', 'Đang hình thành', 'Khá sẵn sàng', 'Sẵn sàng']
        };

        const descriptions = {
          en: [
            'Your organization lacks the process and data foundation to make ERP valuable immediately. Next logical step: standardize processes before evaluating software.',
            'Some foundation exists but consistency is lacking. Biggest risk if you implement ERP now: scope creep and messy data.',
            'Most conditions are met. Before finalizing scope, carefully address remaining gaps.',
            'Your organization has a solid foundation for successful ERP implementation. Now focus on right scope and timeline.'
          ],
          vi: [
            'Doanh nghiệp chưa có nền tảng quy trình/dữ liệu đủ ổn định để ERP tạo ra giá trị ngay. Bước hợp lý tiếp theo là chuẩn hoá quy trình trước khi nghĩ tới phần mềm.',
            'Đã có một số nền tảng nhưng còn thiếu tính nhất quán. Rủi ro lớn nhất nếu triển khai ERP ngay là scope creep và dữ liệu không sạch.',
            'Phần lớn điều kiện đã có. Cần rà soát kỹ các điểm còn yếu trước khi chốt phạm vi triển khai.',
            'Doanh nghiệp có nền tảng tốt để ERP implementation đạt hiệu quả cao. Trọng tâm lúc này là chọn đúng phạm vi và lộ trình.'
          ]
        };

        const lang = language === 'en' ? 'en' : 'vi';

        return res.status(200).json({
          assessment_id: submission.assessment_id,
          level: levelIndex + 1,
          label: labels[lang][levelIndex],
          description: descriptions[lang][levelIndex],
          insufficient_data_message: lang === 'en' ? 'Insufficient data for complete assessment.' : 'Chưa đủ dữ liệu để đánh giá đầy đủ.',
          related_links: [],
          submission_id: `sub_${Date.now()}`,
          critical_flags: [],
          dimension_scores: {},
          flags: []
        });
      } catch (error) {
        console.error('[submit] Error:', error);
        return res.status(500).json({ error: 'Failed to process submission' });
      }
    }

    // Contact submission - for detailed report request
    if (pathname === '/api/assessment/contact' && req.method === 'POST') {
      try {
        const contactData = req.body || {};

        // TODO: Store contact request or send email
        console.log('[contact] Received contact request:', contactData);

        return res.status(200).json({
          status: 'success',
          message: language === 'en' ? 'Contact information received' : 'Đã nhận thông tin liên hệ'
        });
      } catch (error) {
        console.error('[contact] Error:', error);
        return res.status(500).json({ error: 'Failed to process contact request' });
      }
    }

    // 404
    res.status(404).json({ error: 'Not found', path: pathname });
  } catch (error) {
    console.error('[handler] Error:', error);
    res.status(500).json({ error: error.message });
  }
}
