# Lessons Learned — Assessment Implementation (Session 2)

**Ngày:** 2026-10-03  
**Áp dụng cho:** mọi assessment mới — AI Readiness, Digitalization, Knowledge Management  
**Files liên quan:**
- `api/index.js` — API handler chính (Node.js, Vercel serverless)
- `api/assessment.py` — fallback handler (Python, không được gọi trực tiếp)
- `src/components/widgets/AssessmentForm.astro` — contact form sau kết quả
- `vercel.json` — routing config

---

## 1. Vercel Serverless — Async Operations phải được `await` trước khi return

### Triệu chứng
Telegram không nhận được tin nhắn sau khi khách hàng submit contact form, dù bot token và chat ID đều đúng (đã test thành công ngoài website).

### Root cause
```js
// ❌ SAI — fire-and-forget: Vercel terminate function ngay sau return
function sendTelegramAlert(lead) {
  fetch(`https://api.telegram.org/...`, { ... })
    .catch(err => console.error(err));  // promise này không bao giờ chạy xong
}

// Trong handler:
sendTelegramAlert(lead);          // gọi không await
return res.status(200).json(...); // Vercel đóng function tại đây
```

Vercel serverless function **chấm dứt tiến trình ngay sau khi `res.json()` được gọi**. Mọi async operation chưa được `await` sẽ bị kill mid-flight — không có error, không có log, không có dấu hiệu gì.

### Fix
```js
// ✅ ĐÚNG — async + await + proper error handling
async function sendTelegramAlert(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn('[telegram] env vars not set — skipping');
    return;
  }
  // ... build text ...
  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
  if (!tgRes.ok) {
    console.error(`[telegram] Failed ${tgRes.status}: ${await tgRes.text().catch(() => '')}`);
  }
}

// Trong handler: await trước khi return
await sendTelegramAlert(lead);
return res.status(200).json(...);
```

### Quy tắc áp dụng cho tất cả assessment
**Bất kỳ side effect nào sau contact form submit** (Telegram, webhook nội bộ, email, Supabase insert) đều phải được `await` trước `return res.json()`. Không có ngoại lệ.

---

## 2. Tách error handling — Supabase failure không được chặn Telegram

### Triệu chứng
Nếu Supabase bị lỗi (timeout, cấu hình sai, quota), Telegram cũng không được gửi vì cả hai nằm trong cùng một `try-catch`.

### Root cause
```js
// ❌ SAI — một try-catch cho tất cả
try {
  const saved = await dbInsertLead(lead);   // nếu throw ở đây...
  await sendTelegramAlert(lead);             // ...dòng này không bao giờ chạy
  return res.status(200).json({ ... });
} catch (error) {
  return res.status(500).json({ error });   // khách nhận lỗi 500
}
```

### Fix
```js
// ✅ ĐÚNG — tách biệt, mỗi bên fail độc lập
let saved = null;
try {
  saved = await dbInsertLead(lead);
} catch (dbErr) {
  console.error('[contact] DB error (non-fatal):', dbErr.message);
  // không throw — Telegram vẫn phải chạy
}

try {
  await sendTelegramAlert({ ...lead, created_at: new Date().toISOString(), ...(saved || {}) });
} catch (tgErr) {
  console.error('[contact] Telegram error (non-fatal):', tgErr.message);
}

return res.status(200).json({ status: 'success', lead_id: saved?.id || null });
```

### Nguyên tắc
Telegram alert là **early warning** quan trọng nhất — phải đến được dù database có vấn đề. Luôn đặt Telegram trong `try-catch` riêng và đặt **trước** `return`.

---

## 3. Contact form — field là số điện thoại, không phải email

### Triệu chứng
Khách hàng submit form với số điện thoại nhưng API trả 422 (Unprocessable Entity).

### Root cause
Python handler `api/assessment.py` còn sót validation từ thiết kế cũ (khi form chỉ nhận email):
```python
# ❌ SAI — validation này sai với thiết kế hiện tại
if not contact or "@" not in contact:
    raise HTTPException(status_code=422, detail="Invalid email address")
```

Form đã được thiết kế lại: field `contact` là **số điện thoại** (`type="tel"`), không phải email.

### Fix
```python
# ✅ ĐÚNG — không validate định dạng contact
# Tất cả fields là optional, không cần format cụ thể
if not assessment_id:
    raise HTTPException(status_code=400, detail="assessment_id required")
```

### Thiết kế contact form hiện tại (không thay đổi)
| Field | Type | Required | Mục đích |
|---|---|---|---|
| `org_name` | text | optional | Tên công ty |
| `role` | text | optional | Chức vụ |
| `fullname` | text | optional | Họ tên |
| `contact` | tel | optional | Số điện thoại |

**Không có email field.** Lý do: đây là bước đầu để OKELAS team gọi điện xác nhận lịch — không phải email marketing. Follow-up bằng email được thực hiện sau khi đã nói chuyện điện thoại.

---

## 4. `vercel.json` — Không dùng SPA catch-all route với Astro static site

### Triệu chứng
Sau một deployment mới, toàn bộ website mất style — render như HTML thuần không có CSS.

### Root cause
```json
// ❌ SAI — route này phá vỡ Astro static site
{
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/index" },
    { "src": "/(.*)", "dest": "/index.html" }   // ← thủ phạm
  ]
}
```

Route `/(.*) → /index.html` là pattern của **React/Vue SPA**. Nó intercept **tất cả** requests kể cả `/_astro/main.css`, `/_astro/app.js` — trả về `index.html` thay vì CSS/JS. Browser nhận HTML content type nhưng cố parse như CSS → không có style nào được áp dụng.

Astro là **MPA (Multi-Page Application)** với `output: 'static'` — mỗi route có file `.html` riêng trong `dist/`. Không cần và không được có SPA fallback.

### Fix
```json
// ✅ ĐÚNG — chỉ route API, để Vercel tự serve static files
{
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/index" }
  ]
}
```

### Quy tắc
Khi thêm assessment mới hoặc sửa `vercel.json`: **không bao giờ thêm `/(.*) → /index.html`**. Nếu cần SPA-style fallback cho một route cụ thể, dùng `cleanUrls: true` (đã có sẵn) kết hợp tạo file `.html` tương ứng trong Astro.

---

## 5. Cloudflare cache — quy trình debug và purge đúng cách

### Triệu chứng
- Vercel preview URL (`*.vercel.app`) render đúng
- `okelas.com` vẫn render sai sau khi đã fix `vercel.json`

### Root cause
**Cloudflare đã cache response sai** (HTML content cho CSS URL) từ lúc SPA route còn active. Sau khi fix `vercel.json` và redeploy, Vercel đã serve đúng — nhưng Cloudflare vẫn trả cached response cũ cho các request CSS.

### Quy trình debug staging vs production
```
Preview URL hoạt động + okelas.com không hoạt động
→ Build OK, Vercel OK
→ Vấn đề nằm ở lớp giữa: Cloudflare cache
```

```
okelas.com không hoạt động + www.okelas.com cũng không
→ Có thể là build fail hoặc Vercel config sai
→ Kiểm tra Vercel Dashboard → Deployments
```

### Cách purge Cloudflare cache
1. **Bật Development Mode** (test ngay, không cần purge):  
   Cloudflare Dashboard → `okelas.com` → **Caching → Configuration → Development Mode → On**  
   Bypass cache hoàn toàn trong 3 giờ. Nếu site hiển thị đúng → confirm Cloudflare cache là nguyên nhân.

2. **Purge Everything**:  
   Cloudflare Dashboard → `okelas.com` → **Caching → Configuration → Purge Cache → Purge Everything**

3. **Kiểm tra Cache Rules** có override không:  
   **Rules → Cache Rules** — nếu có rule `Cache Level: Cache Everything` cho HTML → xóa hoặc tắt.

4. **Xóa browser cache**: `Ctrl+Shift+R` hoặc test trong Incognito.

### Sau khi purge, verify bằng curl
```bash
# Kiểm tra CSS đang được serve đúng content-type và content
curl -s -o /dev/null -w "Status: %{http_code} | Type: %{content_type}\n" \
  "https://www.okelas.com/_astro/Layout.BAREz_2Z.css"

# Xem 200 bytes đầu để confirm là CSS thật (không phải HTML)
curl -s "https://www.okelas.com/_astro/Layout.BAREz_2Z.css" | head -c 200
# Kết quả đúng: "/*! tailwindcss v4..." hoặc CSS rules
# Kết quả sai:  "<!DOCTYPE html>..."
```

---

## 6. Gotchas tổng hợp — Session 2

| Triệu chứng | Root cause | Fix |
|---|---|---|
| Telegram không nhận tin nhắn, bot đã test OK | `sendTelegramAlert` là fire-and-forget, Vercel kill trước khi fetch hoàn thành | Đổi function thành `async`, `await` fetch, `await` khi gọi |
| Telegram không gửi khi Supabase lỗi | Cùng `try-catch` — DB exception nuốt cả Telegram call | Tách `try-catch` riêng cho DB và Telegram |
| Contact form trả 422 với số điện thoại | Python handler validate `"@" in contact` (email check cũ) | Xóa email validation trong `api/assessment.py` |
| Toàn bộ website mất style sau deployment | `/(.*) → /index.html` trong `vercel.json` serve HTML cho CSS requests | Xóa SPA catch-all, giữ chỉ API route |
| Vercel preview OK, `okelas.com` vẫn sai | Cloudflare đang serve cached response sai | Development Mode → confirm → Purge Everything |
| Purge Cloudflare xong vẫn sai | Browser còn cache cũ | `Ctrl+Shift+R` hoặc Incognito |

---

## 7. Checklist trước khi deploy assessment mới

- [ ] Tất cả side effects trong contact handler đều được `await` (Telegram, DB, webhook)
- [ ] DB và Telegram có `try-catch` **riêng biệt**
- [ ] Field `contact` trong form là `type="tel"`, không validate email format
- [ ] `vercel.json` không có route `/(.*) → /index.html`
- [ ] Build local thành công: `npm run build`
- [ ] Test trên Vercel preview URL trước khi check `okelas.com`
- [ ] Nếu preview OK nhưng `okelas.com` sai → purge Cloudflare, không debug code thêm
