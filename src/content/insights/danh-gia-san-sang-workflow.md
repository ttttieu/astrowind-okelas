---
title: "Đánh giá mức độ sẵn sàng Workflow"
description: "Trả lời 10 câu hỏi để xác định workflow maturity level hiện tại và bước tiếp theo có ý nghĩa nhất."
publishDate: 2026-09-23T00:00:00Z
translationId: workflow-readiness-assessment
lang: vi
category: workflow
contentType: Analysis
funnelStage:
  - Consideration
audience:
  - COO
  - CIO
  - Operations Director
primaryKeyword: "đánh giá mức độ sẵn sàng workflow"
secondaryKeywords:
  - "workflow maturity assessment"
  - "workflow maturity model"
  - "đánh giá workflow"
draft: false
---

---

> Phần lớn doanh nghiệp đã có workflow. Câu hỏi không phải "có hay không" — mà là workflow đó đang ở đâu trên một hành trình dài hơn, và bước tiếp theo nào thực sự đáng đầu tư.
>
> 10 câu hỏi dưới đây giúp bạn xác định vị trí hiện tại của tổ chức trên 6 mức độ trưởng thành workflow — từ vận hành thủ công đến workflow có AI tham gia như một participant được quản trị đầy đủ. Không có câu trả lời "đúng" hay "sai" — chỉ có câu trả lời phản ánh đúng thực tế vận hành của bạn.
>
> Thời gian hoàn thành: khoảng 4–5 phút.

---

→ *Xem thêm: [Từ Workflow Automation đến Agentic Workflow](/insights/workflow/tu-automation-den-agentic-workflow)*

---

## Thang đo 6 mức độ

| Mức | Tên gọi | Đặc điểm cốt lõi | Bài viết liên quan |
|---|---|---|---|
| 1 | **Manual** | Vận hành qua giấy, email, hoặc trí nhớ cá nhân. Không có hệ thống theo dõi chính thức. | 5.1, 5.5 |
| 2 | **Digital** | Quy trình đã số hóa (form điện tử, chữ ký số) nhưng vẫn giữ nguyên logic tuần tự cũ. | 5.1, 5.2, 5.3 |
| 3 | **Automated** | Có automation theo rule, một số quy trình phản ứng theo sự kiện, ngoại lệ có đường xử lý xác định. | 5.6, 5.8, 5.9 |
| 4 | **Context-aware** | Workflow tham chiếu tri thức tổ chức (quan hệ, ưu tiên, tiền lệ) để linh hoạt áp dụng quy tắc, có evidence đầy đủ. | 5.12 |
| 5 | **Intelligent** | AI tham gia phân loại, định tuyến, gợi ý dựa trên tiền lệ; ranh giới quyết định/thực thi và rule/reasoning đã rõ. | 5.10, 5.11, 5.14, 5.15, 5.17 |
| 6 | **Agentic** | AI agent (AI employee) tự lập kế hoạch và thực hiện một phần nhiệm vụ trong workflow, có định danh, quyền hạn giới hạn, guardrail và giám sát runtime. | 5.13, 5.16, 5.18 |

---

## 10 câu hỏi

Mỗi câu hỏi có 6 lựa chọn tương ứng với 6 mức độ (A = Manual, ..., F = Agentic). Người dùng chọn mô tả gần nhất với thực tế — không cần chọn theo thứ tự, vì các quy trình khác nhau trong cùng tổ chức có thể ở các mức khác nhau.

**Câu 1 — Theo dõi tiến độ**
Khi một yêu cầu quan trọng (đơn hàng, khiếu nại, phê duyệt...) đang xử lý, làm sao bạn biết nó đang ở đâu?
- A. Phải hỏi trực tiếp người phụ trách hoặc lục lại email.
- B. Tra trong phần mềm, nhưng phải mở từng yêu cầu để xem trạng thái.
- C. Hệ thống hiển thị trạng thái tổng hợp, cập nhật theo quy tắc đã định.
- D. Hệ thống hiển thị trạng thái kèm ngữ cảnh (ai đang bận, mức độ ưu tiên hiện tại).
- E. Hệ thống tự gợi ý bước tiếp theo dựa trên các trường hợp tương tự trước đó.
- F. Một phần việc theo dõi/tổng hợp được một AI agent tự thực hiện và báo cáo.

**Câu 2 — Phạm vi quy trình**
Quy trình quan trọng nhất của bạn (ví dụ xử lý khiếu nại) được mô hình hóa tới đâu?
- A. Không có mô hình chính thức, xử lý tùy từng lần.
- B. Có các bước phê duyệt số hóa, nhưng chỉ một đoạn ngắn của toàn bộ sự việc.
- C. Có luồng end-to-end cơ bản, xuyên một vài phòng ban.
- D. Luồng end-to-end đầy đủ, có process owner chịu trách nhiệm toàn bộ.
- E. Luồng end-to-end có điểm AI hỗ trợ phân loại/tổng hợp ở giữa quy trình.
- F. Một phần quy trình được agent tự động xử lý từ phát hiện tới hành động, có điểm kiểm tra con người.

**Câu 3 — Phụ thuộc con người**
Nếu người phụ trách một bước quan trọng nghỉ một tuần, điều gì xảy ra?
- A. Quy trình gần như dừng lại, không ai biết xử lý tiếp thế nào.
- B. Có người khác xử lý được, nhưng mất thời gian tìm hiểu lại từ đầu.
- C. Có quy tắc dự phòng rõ ràng, người khác tiếp tục theo đúng quy trình.
- D. Hệ thống cung cấp đủ ngữ cảnh để người thay thế quyết định nhanh.
- E. Phần lớn công việc thường nhật vẫn chạy nhờ AI hỗ trợ, chỉ ngoại lệ cần người.
- F. Một AI employee đảm nhận phần việc lặp lại của vị trí đó, giảm đáng kể phụ thuộc cá nhân.

**Câu 4 — Phát hiện sự kiện**
Khi có một điều kiện bất thường (tồn kho thấp, chỉ số chất lượng lệch chuẩn...), điều gì xảy ra trước tiên?
- A. Ai đó tình cờ nhận ra, thường là khi đã muộn.
- B. Có báo cáo định kỳ, nhưng chỉ phát hiện được sau một khoảng trễ.
- C. Hệ thống tự động cảnh báo dựa trên ngưỡng đã định.
- D. Cảnh báo kèm ngữ cảnh (mức độ nghiêm trọng, ưu tiên xử lý).
- E. Hệ thống gợi ý luôn hướng xử lý dựa trên các trường hợp tương tự.
- F. Hệ thống/agent tự khởi tạo hành động xử lý ban đầu, chờ xác nhận của người có thẩm quyền.

**Câu 5 — Xử lý ngoại lệ**
Khi có một trường hợp không khớp quy trình chuẩn, nó được xử lý thế nào?
- A. Rơi ra ngoài hệ thống — gọi điện, nhắn tin cá nhân.
- B. Có người xử lý thủ công nhưng không có cơ chế ghi nhận lại trong hệ thống.
- C. Có một nhánh quy trình riêng cho ngoại lệ, có ghi nhận.
- D. Ngoại lệ được đánh giá dựa trên bối cảnh cụ thể (quan hệ, ưu tiên) trước khi quyết định.
- E. AI hỗ trợ phân loại mức độ nghiêm trọng của ngoại lệ trước khi chuyển người xử lý.
- F. Agent tự xử lý ngoại lệ rủi ro thấp theo tiền lệ, chỉ escalate ngoại lệ thực sự mới.

**Câu 6 — Ứng dụng AI hiện tại**
Doanh nghiệp bạn đã dùng AI ở đâu trong vận hành (nếu có)?
- A. Chưa dùng AI trong vận hành.
- B. Có dùng công cụ AI đơn lẻ (viết nội dung, dịch...) nhưng không gắn với workflow nào.
- C. Có dùng automation/rule-based cho một vài bước lặp lại.
- D. AI được dùng để tổng hợp/chuẩn bị thông tin, gắn với một workflow cụ thể.
- E. AI tham gia phân loại, định tuyến, hoặc gợi ý hành động trong workflow, có giám sát.
- F. Có AI agent tham gia workflow như một participant có định danh, quyền hạn, evidence trail riêng.

**Câu 7 — Ranh giới quyết định**
Khi có một đề xuất (từ AI hoặc con người) và một hành động xảy ra sau đó, tổ chức bạn có thể trả lời rõ: ai đề xuất, ai xác nhận thẩm quyền, ai thực thi không?
- A. Không, mọi thứ diễn ra khá lẫn lộn.
- B. Có thể trả lời với sự trợ giúp, nhưng không có tài liệu ghi rõ.
- C. Có quy trình phê duyệt rõ ràng cho phần lớn quyết định quan trọng.
- D. Có, và ranh giới này được điều chỉnh theo bối cảnh cụ thể khi cần.
- E. Có, kể cả khi AI tham gia đề xuất — AI không có quyền tự thực thi các hành động rủi ro cao.
- F. Có mô hình phân vai rõ ràng (đề xuất/xác nhận/thực thi/ghi nhận) áp dụng cho cả agent tự chủ.

**Câu 8 — Phân định rule và reasoning**
Tổ chức bạn có từng phân loại một cách có chủ đích: hoạt động nào nên là rule cứng, hoạt động nào cần con người/AI phán đoán?
- A. Chưa từng nghĩ theo hướng này.
- B. Có phân biệt trực giác nhưng chưa hệ thống hóa.
- C. Có tài liệu hóa rõ những quy tắc cố định cho các quy trình chính.
- D. Có xem xét định kỳ, điều chỉnh rule khi điều kiện tổ chức thay đổi.
- E. Có phân định rõ phần nào giao AI reasoning, dựa trên tần suất/mức rủi ro/độ ổn định tiêu chí.
- F. Có cơ chế theo dõi: khi đủ tiền lệ, một hoạt động "cần reasoning" được chuyển thành rule mới.

**Câu 9 — Năng lực vận hành**
Khi khối lượng công việc tăng, doanh nghiệp bạn phản ứng chủ yếu bằng cách nào?
- A. Tuyển thêm người, tương ứng với khối lượng tăng thêm.
- B. Cố gắng làm nhanh hơn với cùng nguồn lực, dẫn tới quá tải.
- C. Tối ưu quy trình để giảm bớt việc dư thừa trước khi tuyển thêm.
- D. Xem lại việc phân bổ nguồn lực dựa trên ưu tiên và bối cảnh kinh doanh hiện tại.
- E. Giao một phần hoạt động lặp lại cho AI để nhân sự tập trung vào phần cần phán đoán.
- F. Có AI employee đảm nhận thường xuyên một phần hoạt động của một hoặc nhiều vị trí.

**Câu 10 — Bằng chứng và giải trình**
Nếu cần giải trình một quyết định vận hành đã xảy ra 3 tháng trước cho một cuộc kiểm toán/khách hàng, bạn có thể làm điều đó trong bao lâu?
- A. Không chắc có tìm lại được đầy đủ thông tin hay không.
- B. Có thể, nhưng mất nhiều thời gian lục lại email/hồ sơ giấy.
- C. Tra cứu được trong hệ thống trong vòng vài giờ.
- D. Tra cứu được trong vài phút, kèm đầy đủ ngữ cảnh liên quan.
- E. Tra cứu được, kể cả với các trường hợp có AI hỗ trợ đề xuất/phân loại.
- F. Tra cứu được đầy đủ, kể cả hành động do AI agent tự thực hiện, có log runtime chi tiết.

→ *Xem thêm: [Một workflow có thể có AI participant: ý nghĩa thực tế](/insights/workflow/ai-participant-trong-workflow)*

---

## Logic chấm điểm

- Mỗi lựa chọn A–F tương ứng giá trị số 1–6.
- Điểm tổng = trung bình cộng điểm của 10 câu, làm tròn xuống (không làm tròn lên, vì một điểm yếu nghiêm trọng ở một khía cạnh không nên bị che lấp bởi điểm cao ở khía cạnh khác).
- **Gợi ý bổ sung:** nếu có từ 3 câu trở lên ở mức A hoặc B, hiển thị cảnh báo "một số quy trình cốt lõi vẫn ở mức nền tảng" ngay cả khi điểm trung bình cao — tránh đưa ra kết quả gây hiểu lầm rằng tổ chức đã sẵn sàng cho Agentic trong khi vẫn có lỗ hổng ở tầng Manual/Digital.
- Điểm trung bình 1.0–1.9 → Level 1 (Manual); 2.0–2.9 → Level 2 (Digital); 3.0–3.9 → Level 3 (Automated); 4.0–4.9 → Level 4 (Context-aware); 5.0–5.9 → Level 5 (Intelligent); 6.0 → Level 6 (Agentic).

---

## Output theo từng Level

### Level 1 — Manual
**Bạn đang ở đâu:** Vận hành phần lớn dựa vào con người nhớ, nhắc, và xử lý thủ công. Đây là điểm khởi đầu bình thường — không phải vấn đề, miễn là bạn biết mình đang ở đây.
**Gap chính:** Thiếu một hệ thống theo dõi chính thức khiến tốc độ và độ chính xác phụ thuộc hoàn toàn vào một vài cá nhân.
**Bước tiếp theo:** Bắt đầu số hóa quy trình quan trọng nhất — không cần công nghệ phức tạp, chỉ cần một nơi để ghi nhận trạng thái chính thức.
**Đọc thêm:** Bài 5.1 — "Đã có workflow rồi, tại sao công việc vẫn chậm?"

### Level 2 — Digital
**Bạn đang ở đâu:** Quy trình đã có form điện tử và phê duyệt số, nhưng về bản chất vẫn là quy trình giấy được chuyển đổi nguyên trạng.
**Gap chính:** Số hóa mới cải thiện việc lưu trữ, chưa cải thiện tốc độ ra quyết định hay khả năng xử lý ngoại lệ.
**Bước tiếp theo:** Xem lại chính logic quy trình — bước nào có thể gộp, bỏ, hoặc chạy song song — trước khi đầu tư thêm công nghệ.
**Đọc thêm:** Bài 5.2 — "Workflow được số hóa không có nghĩa là workflow đã được tối ưu"; Bài 5.3 — "Từ Approval Workflow đến End-to-End Workflow"

### Level 3 — Automated
**Bạn đang ở đâu:** Có automation cho các tác vụ lặp lại, một số quy trình đã phản ứng theo sự kiện, ngoại lệ có đường xử lý xác định thay vì rơi ra ngoài hệ thống.
**Gap chính:** Automation vẫn hoạt động theo rule cứng, chưa tham chiếu được tới bối cảnh tổ chức (quan hệ, ưu tiên, tiền lệ) khi áp dụng quy tắc.
**Bước tiếp theo:** Bắt đầu xây dựng lớp tri thức tổ chức (quan hệ, tiền lệ, ưu tiên) mà workflow có thể tham chiếu tới.
**Đọc thêm:** Bài 5.8 — "Event-Driven Workflow"; Bài 5.9 — "Từ Request/Approval sang Event/Action"

### Level 4 — Context-aware
**Bạn đang ở đâu:** Workflow của bạn không chỉ chạy đúng rule — nó biết khi nào một rule nên được áp dụng linh hoạt, dựa trên hiểu biết về tổ chức.
**Gap chính:** Phần lớn việc "hiểu context" vẫn cần con người diễn giải; AI chưa tham gia sâu vào việc phân loại, định tuyến hay gợi ý.
**Bước tiếp theo:** Xác định 1–2 quy trình có khối lượng cao, tần suất lặp lại lớn để thử nghiệm AI ở vai trò classify/route/recommend.
**Đọc thêm:** Bài 5.12 — "Khi workflow biết context của tổ chức"; Bài 5.10 — "AI có thể tham gia vào workflow ở đâu?"

### Level 5 — Intelligent
**Bạn đang ở đâu:** AI đã tham gia vào workflow một cách có cấu trúc — phân loại, định tuyến, gợi ý dựa trên tiền lệ — với ranh giới quyết định/thực thi và phân định rule/reasoning rõ ràng.
**Gap chính:** AI vẫn chủ yếu ở vai trò hỗ trợ (recommend), chưa tự chủ lập kế hoạch và thực hiện một chuỗi hành động trong ranh giới được kiểm soát.
**Bước tiếp theo:** Đánh giá 1 quy trình cụ thể để thử nghiệm agentic workflow có kiểm soát — với guardrail, ranh giới quyền hạn rõ, và giám sát runtime.
**Đọc thêm:** Bài 5.14 — "AI Agent và Workflow: ai quyết định, ai thực thi?"; Bài 5.16 — "Từ Workflow Automation đến Agentic Workflow"

### Level 6 — Agentic
**Bạn đang ở đâu:** Tổ chức bạn đã có ít nhất một AI agent hoạt động như một participant được quản trị đầy đủ — có định danh, quyền hạn giới hạn, guardrail, và evidence trail runtime.
**Gap chính:** Câu hỏi ở mức này không còn là "có nên triển khai agentic" mà là mở rộng mô hình đã chứng minh hiệu quả sang các quy trình/vị trí khác một cách có kiểm soát, tránh "agent sprawl" không có quản trị tập trung.
**Bước tiếp theo:** Xây dựng một khung quản trị chung cho toàn bộ AI participant/AI employee trong tổ chức, thay vì để mỗi bộ phận tự triển khai rời rạc.
**Đọc thêm:** Bài 5.17 — "Một workflow có thể có AI participant"; Bài 5.18 — "Khi mỗi bước trong workflow có thể có một AI employee hỗ trợ"

---

*Bài đánh giá này là một phần của chuỗi chuyên đề về workflow, ứng dụng AI và quản trị vận hành cho doanh nghiệp sản xuất SME.*

**Bài liên quan:**
- [Từ Workflow Automation đến Agentic Workflow](/insights/workflow/tu-automation-den-agentic-workflow)
- [Một workflow có thể có AI participant: ý nghĩa thực tế](/insights/workflow/ai-participant-trong-workflow)
- [Khi mỗi bước trong workflow có thể có một AI employee hỗ trợ](/insights/workflow/ai-employee-ho-tro-tung-buoc-workflow)

**→ [Liên hệ OKELAS để trao đổi về kết quả đánh giá](/lien-he)**
