/**
 * Assessment API - Vercel serverless handler
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load question configs
function loadQuestions(assessmentId, language = 'vi') {
  const filename = language === 'en'
    ? `questions_${assessmentId}_en.json`
    : `questions_${assessmentId}.json`;

  const filepath = path.join(__dirname, 'config', filename);

  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    const config = JSON.parse(data);

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
  } catch (error) {
    console.error(`[assessment] Failed to load ${filename}:`, error);
    throw error;
  }
}

function setHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
}

export default function handler(req, res) {
  try {
    setHeaders(res);

    // Handle OPTIONS for CORS
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const searchParams = url.searchParams;

    // Health check
    if (pathname === '/api/health' || pathname === '/api/health/') {
      if (req.method === 'GET') {
        res.status(200).json({ status: 'ok', message: 'Assessment API is running' });
        return;
      }
    }

    // Get questions
    if (pathname.match(/^\/api\/assessment\/[^/]+\/questions\/?$/)) {
      if (req.method === 'GET') {
        const match = pathname.match(/\/api\/assessment\/([^/]+)\/questions/);
        const assessmentId = match ? match[1] : null;
        const language = searchParams.get('language') || 'vi';

        if (!assessmentId) {
          res.status(400).json({ error: 'Assessment ID required' });
          return;
        }

        try {
          const config = loadQuestions(assessmentId, language);
          res.status(200).json(config);
          return;
        } catch (error) {
          res.status(404).json({ error: `Assessment ${assessmentId} not found` });
          return;
        }
      }
    }

    // Submit assessment
    if (pathname === '/api/assessment/submit' || pathname === '/api/assessment/submit/') {
      if (req.method === 'POST') {
        const language = searchParams.get('language') || 'vi';

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

        const body = req.body;
        const lang = language === 'en' ? 'en' : 'vi';
        const levelIndex = Math.floor(Math.random() * 4);

        res.status(200).json({
          assessment_id: body?.assessment_id || 'unknown',
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
        return;
      }
    }

    // 404
    res.status(404).json({ error: 'Not found', path: pathname });
  } catch (error) {
    console.error('[handler] Error:', error);
    res.status(500).json({ error: error.message });
  }
}
