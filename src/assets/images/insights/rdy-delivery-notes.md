# Bộ hình bài AI Readiness: 6 điều kiện (Cluster 2, bài 2.4)

Prefix: `rdy` · Bài VI: `/insights/ai/dieu-kien-trien-khai-ai-van-hanh` · Bài EN: `/en/insights/ai/ai-readiness-checklist`

Thư mục ảnh:
- VI: `/images/insights/dieu-kien-trien-khai-ai-van-hanh/`
- EN: `/images/insights/ai-readiness-checklist/`

## Frontmatter

VI
```yaml
cover_image: /images/insights/dieu-kien-trien-khai-ai-van-hanh/rdy-00-og-cover-vi.png
og_image: /images/insights/dieu-kien-trien-khai-ai-van-hanh/rdy-00-og-cover-vi.png
cover_alt: "Lưới sáu ô vuông, bốn ô có dấu tích, đặt cạnh một khối “giá trị vận hành” với mũi tên nối."
```
EN
```yaml
cover_image: /images/insights/ai-readiness-checklist/rdy-00-og-cover-en.png
og_image: /images/insights/ai-readiness-checklist/rdy-00-og-cover-en.png
cover_alt: "A grid of six squares, four with ticks, next to an “operational value” box connected by an arrow."
```

## Vị trí đặt

| # | File ({lang} = vi/en) | Đặt ở mục (VI / EN) |
|---|---|---|
| 1 | rdy-01-six-dimensions-checklist-{lang}.svg | "Tại sao cần framework đánh giá AI readiness" hoặc đầu "6 điều kiện…" / "Why a readiness framework matters" |
| 2 | rdy-02-static-vs-operational-{lang}.svg | "Điều kiện 1: Dữ liệu có cấu trúc và có thể truy vấn" / "Condition 1" |
| 3 | rdy-03-four-process-questions-{lang}.svg | "Điều kiện 2: Quy trình được định nghĩa đủ…" / "Condition 2" |
| 4 | rdy-04-governance-four-areas-{lang}.svg | "Điều kiện 4: Governance…" / "Condition 4" |
| 5 | rdy-05-imbalance-examples-{lang}.svg | "Đọc framework này như thế nào" / "How to read this framework" |

## Alt VI
1. Sáu ô kiểm tra xếp thành lưới, mỗi ô là một chiều đánh giá kèm một câu hỏi tự kiểm; các chiều song song, không theo thứ tự tuần tự.
2. So sánh hai cột: dữ liệu tĩnh như tài liệu và SOP đủ cho tra cứu; dữ liệu vận hành như kết quả kiểm tra và trạng thái đơn hàng cần có cấu trúc để AI trả lời câu hỏi vận hành.
3. Bốn câu hỏi kiểm tra một quy trình: ai làm bước nào, bước nào tạo bằng chứng, điều kiện chuyển bước, ai phê duyệt; mỗi câu có ô chọn “có văn bản” hoặc “chưa rõ”.
4. Bốn mảng governance, mỗi mảng một câu hỏi: phân quyền, xác minh, truy vết và leo thang khi AI không chắc chắn.
5. Ba cặp nhãn so sánh một chiều mạnh với một chiều yếu, kèm hệ quả: AI phân tích được lịch sử nhưng không hỗ trợ workflow; AI tham gia được nhưng thiếu trách nhiệm; AI hiểu quy trình nhưng không tiếp cận dữ liệu ở hệ thống khác.

## Alt EN
1. Six checkboxes in a grid, each a readiness dimension with one self-check question; the dimensions run in parallel, not in sequence.
2. Two columns compared: static data such as documents and SOPs is enough for lookup; operational data such as inspection results and order status needs structure for AI to answer operational questions.
3. Four questions to test a process: who performs which step, which steps create evidence, what conditions apply before the next step, who approves; each has checkboxes for written answer or unclear.
4. Four governance areas, each with one question: authorization, verification, traceability and escalation when AI is uncertain.
5. Three pairs of labels contrasting a strong dimension with a weak one, each with a consequence: AI can analyze history but not support the workflow; AI can take part but accountability is unaddressed; AI understands procedures but cannot reach data in other systems.

## Lưu ý
- Không có số liệu nào trên hình. Các ví dụ "6 tháng", "5 quy trình quan trọng nhất" trong bài chỉ xuất hiện như câu hỏi tự đánh giá; hình 1 chỉ giữ nguyên câu hỏi, không có số liệu.
- Hình 1 có chân trang công cụ thảo luận định hướng. Hình 4 có chân trang quản trị, không phải tư vấn tuân thủ hay pháp lý.
- Hình 5 dùng nhãn định tính, không có thanh độ dài hay điểm số.
- Hình 1 và hình 3 của pillar aip-03 đều nói về sáu điều kiện. Hình aip-03 là tổng quan 6 ô nội dung; hình rdy-01 là checklist có câu hỏi tự đánh giá. Hai hình khác mục đích nhưng nên đặt cách xa nhau trên cùng trang.
- SVG chỉ có dark mode và Inter khi nhúng inline hoặc khi trang đã nạp Inter; dùng `<img>` thì dùng PNG (hiện chỉ cover có PNG).

## Chưa sửa trong bài (thuộc bài viết)
1. **Số điều kiện trong bài này và bài trước:** bài "AI Productivity vs. Organizational Intelligence" nêu 5 điều kiện, bài này nêu 6. Nên có câu nối giải thích.
2. **Chiều "Tích hợp" và "Tri thức":** bài nói "không phải tuần tự" nhưng lại đánh số 1–6 kèm "Điều kiện 1…6"; số thứ tự dễ bị đọc như một quy trình.
3. **Nguồn:** bài viện dẫn Gartner, McKinsey và tổ chức nghiên cứu độc lập nhưng không trích cụ thể. Theo chuẩn bài phân tích cần bổ sung nguồn.
4. **Liên kết:** bản VI trỏ bài trước là `ai-nang-suat-va-tri-thuc-tong-the`, bản EN trỏ `ai-productivity-vs-organizational-intelligence` (cùng bài, nhưng cần đối chiếu slug). Bản EN trỏ bài RAG `rag-limitations-enterprise-ai`, bản VI `rag-la-gi-han-che-ai`.
5. `og:locale` trang EN vẫn là `vi` (như các bài trước).
6. Bản VI có "Tóm tắt cho CEO" là khối trích dẫn; bản EN gọi "Executive Summary". Không có tác động lên hình.
