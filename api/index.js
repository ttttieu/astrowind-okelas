/**
 * Assessment API - Node.js implementation for Vercel
 * Replaces the Python FastAPI implementation with Node.js/Express
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware
app.use(cors({
  origin: ['https://okelas.com', 'https://www.okelas.com', '*'],
  methods: ['GET', 'POST'],
}));
app.use(express.json());

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

// Routes
app.get('/api/assessment/:assessmentId/questions', (req, res) => {
  try {
    const { assessmentId } = req.params;
    const { language = 'vi' } = req.query;

    const config = loadQuestions(assessmentId, language);
    res.json(config);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.post('/api/assessment/submit', (req, res) => {
  try {
    const { assessment_id } = req.body;
    const language = req.query.language || 'vi';

    // Mock response for now - in production would call actual assessment logic
    const labels = {
      en: ['Early Stage', 'Developing', 'Fairly Ready', 'Ready'],
      vi: ['Mới bắt đầu', 'Đang hình thành', 'Khá sẵn sàng', 'Sẵn sàng']
    };

    const descriptions = {
      en: ['Your organization lacks the process and data foundation...', 'Some foundation exists...', 'Most conditions are met...', 'Your organization has a solid foundation...'],
      vi: ['Doanh nghiệp chưa có nền tảng...', 'Đã có một số nền tảng...', 'Phần lớn điều kiện đã có...', 'Doanh nghiệp có nền tảng tốt...']
    };

    const lang = language === 'en' ? 'en' : 'vi';
    const levelIndex = Math.floor(Math.random() * 4);

    res.json({
      assessment_id,
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Assessment API is running' });
});

export default app;
