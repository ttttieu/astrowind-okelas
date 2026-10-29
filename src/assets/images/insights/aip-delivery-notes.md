# Bộ hình bài AI Readiness (pillar Cluster 2)

Prefix: `aip` · Bài VI: `/insights/ai/ai-readiness-doanh-nghiep` · Bài EN: `/en/insights/ai/organizational-ai-readiness`

Thư mục ảnh:
- VI: `/images/insights/ai-readiness-doanh-nghiep/`
- EN: `/images/insights/organizational-ai-readiness/`

## Frontmatter

VI
```yaml
cover_image: /images/insights/ai-readiness-doanh-nghiep/aip-00-og-cover-vi.png
og_image: /images/insights/ai-readiness-doanh-nghiep/aip-00-og-cover-vi.png
cover_alt: "Một nút AI productivity đơn lẻ ở bên trái, sáu khối nền tảng nâng đỡ nút organizational intelligence ở bên phải."
```
EN
```yaml
cover_image: /images/insights/organizational-ai-readiness/aip-00-og-cover-en.png
og_image: /images/insights/organizational-ai-readiness/aip-00-og-cover-en.png
cover_alt: "A single isolated AI productivity node on the left, and six foundation blocks supporting an organizational intelligence node on the right."
```

## Vị trí đặt và alt

| # | File (thay {lang} bằng vi/en) | Đặt ở mục (VI / EN) |
|---|---|---|
| 1 | aip-01-productivity-vs-intelligence-{lang}.svg | "AI productivity và organizational intelligence — hai khái niệm khác nhau" / "AI productivity vs. organizational intelligence" (sau insight 50/500 hoặc cuối mục) |
| 2 | aip-02-rag-limits-{lang}.svg | "Tại sao chatbot “biết nhiều”…" / "Why a chatbot that “knows everything”…" |
| 3 | aip-03-six-conditions-{lang}.svg | Đầu mục "6 điều kiện…" / "6 conditions…" |
| 4 | aip-04-manufacturing-evidence-{lang}.svg | "Doanh nghiệp sản xuất cần chuẩn bị gì…" / "What manufacturing businesses need to prepare…" |
| 5 | aip-05-three-stage-roadmap-{lang}.svg | "Lộ trình AI readiness…" / "An AI readiness roadmap…" |
| 6 | aip-06-diagnostic-question-{lang}.svg | "Một câu hỏi cần đặt ra trước khi quyết định" / "The question to ask before making any AI decision" |

Alt VI
1. AI productivity là cá nhân làm việc nhanh hơn ở từng tác vụ; organizational intelligence là năng lực của tổ chức: quyết định đúng, thực thi nhất quán, học hỏi, phát hiện sớm và giải thích được quyết định.
2. RAG trả lời được câu hỏi về nội dung tài liệu như SOP; các câu hỏi về lô hàng cụ thể, phê duyệt và evidence, hay tuân thủ thực tế cần context vận hành, không nằm trong nội dung tài liệu.
3. Sáu điều kiện để AI có ích trong vận hành: dữ liệu có cấu trúc, quy trình rõ, tri thức tổ chức được cấu trúc hóa, governance và phân quyền, tích hợp hệ thống, organizational context.
4. Doanh nghiệp sản xuất có thêm ba yêu cầu với AI: truy xuất nguồn gốc, sẵn sàng cho audit và nhất quán giữa các ca; AI không thể tạo bằng chứng sau khi sự kiện đã xảy ra.
5. Ba giai đoạn AI readiness: AI productivity cho cá nhân, AI với context tổ chức, AI trong workflow vận hành; mỗi giai đoạn có điều kiện cần, giá trị và rủi ro riêng.
6. Câu hỏi chẩn đoán trước khi quyết định về AI rẽ ba nhánh: quy trình chưa chuẩn hóa, tri thức nằm trong đầu người, dữ liệu không có cấu trúc; AI không giải quyết được nếu thiếu nền tảng đó.

Alt EN
1. AI productivity is individuals working faster on single tasks; organizational intelligence is the organization’s capacity to decide well, execute consistently, learn, detect problems early and explain decisions.
2. RAG can answer questions about document content such as SOPs; questions about a specific batch, approvals and evidence, or actual compliance need operational context that documents do not hold.
3. Six conditions for AI to deliver operational value: structured data, clear processes, structured organizational knowledge, governance and authorization, system integration, organizational context.
4. Manufacturing adds three requirements for AI: traceability, audit readiness and consistency across shifts; AI cannot create evidence after the event has happened.
5. Three stages of AI readiness: individual AI productivity, AI with organizational context, AI within operational workflow; each stage has its own needs, value and risk.
6. A diagnostic question before any AI decision branches three ways: processes not standardized, knowledge in people’s heads, data without structure; AI cannot fix these without the foundation.

## Lưu ý
- SVG chỉ có dark mode và font Inter khi nhúng **inline** hoặc khi trang đã nạp Inter; nếu dùng thẻ `<img>` thì dùng PNG (cover đã có PNG; cần PNG cho hình 1–6 thì báo tôi xuất thêm).
- Không có số liệu nào lên hình. Các số trong bài (20→5 phút, 2 giờ→20 phút, 3 ngày audit, 80 nhân viên, 8–10 phút) đều không được dùng.
- Hình 1: thanh cuối là quan điểm OKELAS, đã ghi ở chân trang. Hình 3 và 5: chân trang ghi là khung của OKELAS, công cụ thảo luận định hướng. Hình 4: chân trang quản trị/không phải tư vấn tuân thủ. Hình 5 dùng "giai đoạn/stage", không dùng "cấp/level".
- Hình 5, thẻ giai đoạn 3: dòng "Ý nghĩa / Meaning" lấy từ câu "giai đoạn tạo ra khác biệt về cạnh tranh" trong bài.
- Chưa xử lý (thuộc bài viết, không sửa): VI/EN lệch ở ví dụ mở bài ("nửa thời gian" so với "một giờ → hai mươi phút"); `og:locale` trang EN đang là `vi`; chú thích cuối bài viện Gartner/McKinsey không có nguồn cụ thể.
