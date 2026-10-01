/**
 * Assessment API - Vercel Serverless Function
 * Uses the proper Vercel fetch handler format
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadQuestions(assessmentId, language = 'vi') {
  const filename = language === 'en'
    ? `questions_${assessmentId}_en.json`
    : `questions_${assessmentId}.json`;

  const filepath = path.join(__dirname, 'config', filename);
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
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const searchParams = url.searchParams;

    // Health check
    if (pathname === '/api/health' || pathname === '/api/health/') {
      return new Response(
        JSON.stringify({ status: 'ok', message: 'Assessment API is running' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Get questions: /api/assessment/erp_readiness/questions
    if (pathname.match(/^\/api\/assessment\/[^/]+\/questions\/?$/)) {
      const match = pathname.match(/\/api\/assessment\/([^/]+)\/questions/);
      const assessmentId = match ? match[1] : null;
      const language = searchParams.get('language') || 'vi';

      if (!assessmentId) {
        return new Response(
          JSON.stringify({ error: 'Assessment ID required' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      try {
        const config = loadQuestions(assessmentId, language);
        return new Response(
          JSON.stringify(config),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({ error: `Assessment ${assessmentId} not found` }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({ error: 'Not found', path: pathname }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[GET] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const searchParams = url.searchParams;

    if (pathname === '/api/assessment/submit' || pathname === '/api/assessment/submit/') {
      const language = searchParams.get('language') || 'vi';
      const body = await request.json();

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

      return new Response(
        JSON.stringify({
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
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Not found', path: pathname }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[POST] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
