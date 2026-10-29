# Lessons Learned — Assessment Implementation (Session 1)

**Áp dụng cho:** mọi assessment mới trên stack này (ERP, AI Readiness, v.v.)  
**Files tham khảo chính:**
- `api/index.js` — scoring engine ERP (template cho assessment mới)
- `api/config-vi.js` / `api/config-en.js` — config câu hỏi (format chuẩn)
- `src/components/widgets/AssessmentForm.astro` — frontend form (tái sử dụng)
- `vercel.json` — routing config (không đổi)
- `docs/prd/assessments/erp-readiness.md` — PRD gốc (tham chiếu khi implement scoring)

---

## 1. Vercel Deployment

### Node.js bắt buộc — Python không hoạt động trên project này
Python functions được deploy (xuất hiện trong Functions tab, 27 MB) nhưng nhận 0 requests. Không có log, không có error — chỉ 404. Nguyên nhân: project-level config không tương thích Python runtime.

**Quy tắc:** Chỉ dùng Node.js. Handler format bắt buộc:
```js
export default function handler(req, res) { ... }
```
Không dùng `python@3.12`, không dùng `functions` config trong `vercel.json`.

### Config files phải là ES modules import trực tiếp
Vercel bundler chỉ bundle file function và các `import` trực tiếp của nó. Subdirectory `api/config/` **không được bundle** tự động.

**Sai:** `fs.readFileSync('./config/erp-vi.json')`  
**Đúng:** `import CONFIG_VI from './config-vi.js'` (file ngang hàng với `index.js`)

### Routing trong `vercel.json`
```json
{
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/index" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```
Không thêm `"functions"` block. Một file `api/index.js` xử lý tất cả routes.

### Parse URL query string
`new URL(req.url, 'http://localhost')` trả về object — dùng `.searchParams.get('language')`, **không** dùng `.query.language`.

---

## 2. Scoring Engine — Mapping PRD sang Code

### Scale offset: JSON dùng 1–4, PRD dùng 0–3
Config files (`config-vi.js`, `config-en.js`) lưu `score: 1..4` cho các lựa chọn A–D.  
PRD tính trên scale 0–3.

**Bắt buộc convert khi tính điểm:**
```js
prdScore = option.score - 1  // 1→0, 2→1, 3→2, 4→3
```
Nếu quên offset này, mọi score sẽ sai 1 đơn vị, kéo theo level sai.

### Dimension level thresholds (PRD §5.1)
```
< 1.00  → L1
1.00–1.74 → L2
1.75–2.49 → L3
≥ 2.50  → L4
```

### Overall level thresholds (PRD §6) — **khác** với dimension
```
< 1.00  → L1
1.00–1.74 → L2
1.75–2.39 → L3  ← boundary khác (2.39 thay vì 2.49)
≥ 2.40  → L4
```

### Overall level — 4 bước áp dụng theo thứ tự
1. Base level từ average của tất cả dimension scores
2. Foundation ceiling: nếu D1, D2, hoặc D5 ở L1 → max L2
3. Flag ceiling: nếu có bất kỳ flag nào → max L3
4. Risk floor: ≥ 2 foundation dims ở L1, hoặc ≥ 3 flags → L1 (override)

### Critical flags F1–F5 — trigger conditions cụ thể
```
F1: Q2 = 0  OR  Q5 = 0   (process breakdown / BOM missing)
F2: Q3 = 0  OR  Q4 = 0   (master data chaos)
F3: Q9 = 0               (leadership absent)
F4: Q8 = 0  OR  Q8 = 1   (scope/big-bang risk)
F5: Q7 = 0               (no success definition)
```
Scores ở đây là PRD scores (0–3), tức là đã trừ 1.

### Option E — "Uncertain" / blind spot
Option E có `score: null, flag: "uncertain"`. Không tính vào score nhưng đếm vào `blindSpots`.  
Nếu một dimension có cả scored và uncertain: dimension vẫn có score, nhưng đánh dấu `estimated: true`.  
Nếu dimension chỉ có uncertain: `undetermined: true`, score = null.

### Archetype — 6 profiles, check theo thứ tự, first match wins
Xem `api/index.js` hàm `getArchetype()`. Thứ tự quan trọng: profile "ready_to_launch" check trước, "needs_comprehensive_foundation" check cuối.

### Verify với ví dụ PRD §12
```
Nếu D1=0.50, D2=1.00(estimated), avg≈1.08 → L2, F1 triggered
```
Kết quả đúng = L2 với flag F1. Dùng để sanity-check sau khi implement scoring mới.

---

## 3. Astro `<script define:vars>` — Các hạn chế quan trọng

### Template literal với `${}` trong JS logic có thể fail
Khi script dùng `define:vars`, Astro compiler xử lý script theo cách hybrid. Một số patterns gây `CompilerError`:

**Gây lỗi:**
```js
throw new Error(`HTTP ${response.status}`);
container.innerHTML = `<p>${message}</p>`;
```

**Fix:** Dùng string concatenation thay cho template literal trong các expressions JS thuần:
```js
throw new Error('HTTP ' + response.status);
container.innerHTML = '<p>' + message + '</p>';
```

**Lưu ý:** `html += \`...${this.language === 'vi' ? '...' : '...'}\`` vẫn hoạt động bình thường vì đây là HTML building pattern, không phải JS logic expression.

### HTML tags trong single-quoted strings bên trong `${...}` ternary
```js
// Gây lỗi "Unterminated string":
html += `<p>${ isVI ? 'text <strong>từ</strong> text' : 'text <strong>word</strong>' }</p>`;
```
Astro compiler nhìn thấy `</strong>` và bị nhầm parsing context.  
**Fix:** Không dùng HTML tags bên trong ternary strings. Dùng plain text hoặc tách thành 2 element riêng.

### Template literal phải được đóng đúng — nguy hiểm khi refactor
Khi `displayResults()` build HTML:
```js
let html = `
  ...content...       // ← mở backtick
  ...more content...
`;                    // ← đóng backtick phải khớp
container.innerHTML = html;
```
Nếu xoá một block HTML nằm ở cuối mà quên xoá closing backtick `` `; `` → `container.innerHTML = html;` bị nuốt vào string, không còn là JavaScript. Lỗi xuất hiện là `CompilerError: Unterminated string` ở một vị trí khó đoán trong file.

**Quy tắc:** Sau mỗi lần xoá block HTML trong `displayResults`, kiểm tra cân bằng backtick trước khi commit.

---

## 4. Frontend — AssessmentForm.astro

### API response shape — `dimension_scores` là object of objects
```js
// Sai (trước đây):
score.toFixed(1)  // TypeError: score là object, không phải number

// Đúng:
dim.score.toFixed(1)  // dim = { name, score, level, label, estimated, undetermined }
```

### Bar width — dùng score (0–3), không dùng level (1–4)
```js
// Sai: 4 giá trị rời rạc, mọi thứ hiện 25/50/75/100%
const barWidth = (dim.level / 4) * 100;

// Đúng: continuous, proportional
const barWidth = dim.score !== null ? Math.round((dim.score / 3) * 100) : 0;
```

### Thứ tự section kết quả (đã thiết lập)
1. Overall score + archetype
2. 6 dimensions với progress bar
3. 90-day recommendations (màu xanh lá)
4. Critical flags / blockers (màu amber)
5. Contact form đặt lịch thực địa

### Contact form — tất cả fields là optional
Không có `required` validation. Tất cả fields (`org_name`, `role`, `fullname`, `contact`) là optional.  
Mục đích duy nhất: CEO muốn có đội OKELAS đến khảo sát thực địa → báo cáo chi tiết + roadmap 90 ngày.

---

## 5. Dark Mode — Patterns đã kiểm chứng

### Các classes cần thiết cho mọi thành phần UI trong script
```
Card container:    bg-white dark:bg-gray-800   border dark:border-gray-700
Option label:      border-gray-200 dark:border-gray-600   hover:bg-gray-50 dark:hover:bg-gray-700
Text nội dung:     text-gray-900 dark:text-gray-100
Text phụ/mô tả:    text-gray-700 dark:text-gray-300
Input field:       bg-white dark:bg-gray-700   text-gray-900 dark:text-gray-100   border-gray-300 dark:border-gray-600
Placeholder:       placeholder-gray-400 dark:placeholder-gray-500
Textarea:          bg-white dark:bg-gray-800   text-gray-900 dark:text-gray-100
Section bg xanh:   bg-blue-50 dark:bg-slate-800   border-blue-200 dark:border-blue-700
```

### Classes trong JavaScript string — Tailwind vẫn scan được
Tailwind scanner đọc `.astro` files bao gồm cả nội dung bên trong JS strings/template literals.  
Classes phải được viết đầy đủ (không split string), ví dụ `'dark:bg-gray-800'` — không phải `'dark:bg-gray-' + '800'`.

---

## 6. Config file format chuẩn

Xem `api/config-vi.js` / `api/config-en.js` cho structure đầy đủ. Điểm cốt lõi:

```js
export default {
  "assessment_id": "erp_readiness",  // ← ID phải khớp với API route param
  "questions": [
    {
      "id": "Q0-CONTEXT",   // Q0 = context, không scored
      "type": "context",
      "scored": false,
      "options": [{ "key": "A", "text": "..." }, ...]
    },
    {
      "id": "Q1-PROCESS-EXISTENCE",
      "dimension": "process_existence",   // ← map sang dimension key trong scoring engine
      "scored": true,
      "options": [
        { "key": "A", "score": 1, "text": "..." },  // score 1–4
        { "key": "E", "score": null, "flag": "uncertain", "text": "..." }
      ]
    },
    {
      "id": "Q12-REFLECTION",
      "type": "open_text",   // ← câu hỏi mở, không scored, không required
      "scored": false
    }
  ]
};
```

**Quan trọng:** `assessment_id` trong config phải khớp với key trong `CONFIGS` object ở `api/index.js`:
```js
const CONFIGS = {
  erp_readiness: { vi: CONFIG_VI, en: CONFIG_EN },
  ai_readiness:  { vi: CONFIG_AI_VI, en: CONFIG_AI_EN },  // ← thêm assessment mới ở đây
};
```

---

## 7. Quy trình thêm một assessment mới

1. Tạo PRD chi tiết trước (xem `docs/prd/assessments/erp-readiness.md` làm template)
2. Tạo `api/config-[slug]-vi.js` và `api/config-[slug]-en.js`
3. Import và đăng ký trong `api/index.js` → `CONFIGS` object
4. Implement hàm scoring riêng nếu PRD khác ERP (dimensions, flags, archetypes)
5. Tạo page Astro: `src/pages/readiness/[slug].astro` và `/en/readiness/[slug].astro`
6. Dùng `<AssessmentForm assessmentId="[slug]" language={lang} />` — component tái sử dụng được
7. Build local (`npm run build`) trước khi push — Vercel build lỗi mất nhiều thời gian debug hơn local

---

## 8. Gotchas tổng hợp

| Triệu chứng | Nguyên nhân | Fix |
|---|---|---|
| Vercel 404, không có log | Python runtime không hoạt động | Đổi sang Node.js handler |
| `Cannot read properties of undefined (reading 'language')` | `new URL(...).query` là URLSearchParams object | Dùng `.searchParams.get(...)` |
| Config file not found trên Vercel | Subdirectory không được bundle | Dùng ES module import ngang hàng |
| `toFixed is not a function` | `dimension_scores` là object, không phải number | Truy cập `dim.score` |
| Tất cả bars hiện 50% | Bar width từ `level/4` (4 giá trị rời rạc) | Dùng `score/3 * 100` |
| `CompilerError: Expected a semicolon` | Template literal `\`HTTP ${var}\`` trong define:vars script | Dùng `'HTTP ' + var` |
| `CompilerError: Unterminated string` | HTML tags trong ternary strings, hoặc thiếu closing backtick | Xoá HTML tags khỏi strings; kiểm tra cân bằng backtick |
| Dark mode text gần như vô hình | `text-gray-900` không có dark variant | Thêm `dark:text-gray-100` |
