---
title: "Least Privilege cho AI Agent: nguyên tắc thiết kế quyền hạn AI"
description: "AI agent chỉ nên được cấp quyền tối thiểu cần thiết cho task cụ thể — không hơn. Bài viết phân tích nguyên tắc least privilege trong ngữ cảnh AI và cách áp dụng trong enterprise."
publishDate: 2026-09-23T00:00:00Z
coverImage: '~/assets/images/insights/least-privilege-cho-ai/alp-00-og-cover-vi.png'
ogImage: '~/assets/images/insights/least-privilege-cho-ai/alp-00-og-cover-vi.png'
coverImageAlt: "Bốn bậc thang tăng dần, nhãn Read, Request, Recommend, Execute; bậc cao nhất được tô nổi bật."
translationId: article-6-12-least-privilege
lang: vi
category: ai
contentType: Analysis
funnelStage:
  - Consideration
audience:
  - CIO
  - IT Architect
  - Security
primaryKeyword: "least privilege AI agent"
secondaryKeywords:
  - "AI agent permissions"
  - "giới hạn quyền hạn AI"
  - "AI access control"
  - "AI privilege management"
assessmentHref: /readiness/ai
ctaPrimaryText: 'Assess your AI readiness'
ctaSubtitle: 'Xác định mức độ sẵn sàng AI của doanh nghiệp bạn'
draft: false
---

---

> **Tóm tắt cho CIO/IT Architect/Security**
>
> - Least privilege là một trong những nguyên tắc thiết kế bảo mật lâu đời và được kiểm chứng nhiều nhất trong khoa học máy tính — được Jerome Saltzer và Michael Schroeder trình bày chính thức từ năm 1975. Nguyên tắc gốc: mỗi chương trình và mỗi người dùng nên hoạt động với **lượng đặc quyền tối thiểu cần thiết để hoàn thành công việc** — không hơn.
> - Áp dụng vào AI agent, nguyên tắc này cần một lớp cụ thể hóa mới: một mô hình phân cấp quyền theo nhiều tầng — không phải một công tắc bật/tắt duy nhất.
> - Một mô hình phân cấp thực tế gồm bốn tầng: **Read** (chỉ đọc) → **Request** (soạn đề xuất, chưa gửi) → **Recommend** (gợi ý kèm căn cứ, cần xác nhận) → **Execute** (tự thực thi trong ngưỡng đã duyệt trước). Mỗi tầng tương ứng với một mức độ rủi ro và cần một mức độ giám sát khác nhau.
> - Việc không áp dụng nguyên tắc này chính là gốc rễ của rủi ro **Excessive Agency** — đã leo từ vị trí LLM06 lên LLM03 trong OWASP Top 10 for LLM Applications 2026 chỉ trong một năm.
> - Thiết kế một permission model cho AI agent cần được thực thi ở cấp độ kỹ thuật — không phải chỉ là một tài liệu chính sách.

---

Sau khi đã thiết lập ở bài 6.11 rằng authority cần được trao một cách tường minh, tách biệt khỏi năng lực của mô hình, câu hỏi tiếp theo là câu hỏi thực hành: **authority đó nên được thiết kế cụ thể như thế nào?**

Câu trả lời không cần phát minh mới — nó đã tồn tại trong khoa học máy tính từ nửa thế kỷ trước, dưới tên gọi **least privilege**. Bài này áp dụng nguyên tắc đó một cách cụ thể vào bối cảnh AI agent doanh nghiệp.

---

## Least privilege là gì

![Hai thanh ngang: thanh quyền rộng ở trên, dài toàn bộ; thanh least privilege ở dưới, ngắn hơn nhiều.](~/assets/images/insights/least-privilege-cho-ai/alp-01-broad-vs-minimal-vi.svg)

**Claim:** Nguyên tắc least privilege quy định rằng một thực thể chỉ nên được cấp đúng lượng quyền hạn cần thiết để hoàn thành nhiệm vụ được giao, không hơn.

Nguyên tắc này được trình bày chính thức trong "The Protection of Information in Computer Systems" (Saltzer & Schroeder, Proceedings of the IEEE, 1975) — một trong những công trình nền tảng nhất của lĩnh vực an ninh thông tin. Phát biểu gốc, dựa trên ghi chú trước đó của Saltzer năm 1970: **"mỗi chương trình và mỗi người dùng có đặc quyền của hệ thống nên hoạt động với lượng đặc quyền tối thiểu cần thiết để hoàn thành công việc."**

Lý do nền tảng của nguyên tắc này không phải để ngăn hành vi cố ý xấu — mà để **giới hạn thiệt hại có thể xảy ra do tai nạn hoặc sai sót**. Least privilege không giả định thực thể được cấp quyền có ý đồ xấu — nó thừa nhận rằng sai sót luôn có thể xảy ra, và thiết kế hệ thống sao cho một sai sót không thể lan rộng vượt quá phạm vi cần thiết.

Saltzer và Schroeder cũng đề xuất nguyên tắc bổ trợ quan trọng: **"complete mediation"** — mọi lần truy cập đều cần được kiểm tra quyền hạn, không có ngoại lệ dựa trên việc "đã kiểm tra một lần trước đó." Áp dụng vào AI agent: quyền hạn cần được xác thực tại từng hành động cụ thể, không chỉ một lần khi agent được khởi tạo.

---

## Tại sao áp dụng cho AI agent

![Ba thẻ đánh số: quyền rộng, nhiều bước liên tiếp, và dữ liệu lẫn hành động.](~/assets/images/insights/least-privilege-cho-ai/alp-02-three-traits-vi.svg)

Ba đặc điểm của AI agent khiến việc áp dụng nguyên tắc least privilege trở nên cấp thiết:

**1. AI agent thường được cấp quyền rộng "để linh hoạt xử lý mọi tình huống"** — chính xác ngược lại với tinh thần least privilege. Có một xu hướng tự nhiên là cấp quyền rộng thay vì hẹp, để tránh agent "bị kẹt" vì thiếu quyền. Đây chính xác là cơ chế dẫn tới rủi ro Excessive Agency.

**2. Hậu quả của việc vi phạm nguyên tắc này với AI agent nghiêm trọng hơn với phần mềm truyền thống**, vì agent có khả năng tự thực thi nhiều bước liên tiếp — một sai sót ở quyền hạn có thể bị khai thác qua nhiều bước trước khi bị phát hiện.

**3. Ranh giới giữa "dữ liệu cần đọc" và "hành động được phép thực hiện" dễ bị xóa nhòa hơn với AI agent**, vì agent xử lý ngôn ngữ tự nhiên và có xu hướng coi nội dung trong ngữ cảnh của nó là có thể mang tính chỉ dẫn.

Xu hướng thực tế đã được ghi nhận: rủi ro **Excessive Agency** leo từ vị trí LLM06 lên LLM03 trong "OWASP Top 10 for LLM Applications 2026" chỉ trong một năm.

---

## Mô hình phân cấp: Read / Request / Recommend / Execute

![Bốn cột bậc thang tăng dần: Read, Request, Recommend, Execute, mỗi cột có mô tả ngắn.](~/assets/images/insights/least-privilege-cho-ai/alp-03-four-tiers-vi.svg)

Một cách áp dụng thực tế nguyên tắc least privilege là thiết kế mô hình phân cấp bốn tầng:

**Tầng 1 — Read (Chỉ đọc).** Agent có thể truy vấn và đọc dữ liệu để phục vụ phân tích hoặc trả lời câu hỏi, nhưng không có khả năng thay đổi bất cứ điều gì. Đây là tầng rủi ro thấp nhất, phù hợp với phần lớn các tác vụ tổng hợp thông tin.

**Tầng 2 — Request (Soạn đề xuất).** Agent có thể soạn một hành động cụ thể — một email, một đơn hàng, một bản cập nhật hồ sơ — nhưng hành động đó ở trạng thái nháp, chưa được gửi đi hoặc thực thi. Con người xem lại toàn bộ nội dung trước khi quyết định.

**Tầng 3 — Recommend (Gợi ý kèm căn cứ).** Agent không chỉ soạn đề xuất mà còn đưa ra khuyến nghị cụ thể kèm lý do — dựa trên dữ liệu nào, tiền lệ nào — nhưng quyền quyết định cuối cùng vẫn thuộc về một điểm xác nhận độc lập.

**Tầng 4 — Execute (Tự thực thi trong ngưỡng).** Agent được phép tự thực hiện hành động mà không cần xác nhận từng lần, nhưng chỉ trong phạm vi ngưỡng đã được con người phê duyệt trước. Trường hợp vượt ngưỡng tự động chuyển về Tầng 3.

![Hai thẻ ví dụ: gửi email nhắc nhở nội bộ ở tầng Execute; sửa bản ghi tài chính ở tầng Request.](~/assets/images/insights/least-privilege-cho-ai/alp-04-one-agent-tiers-vi.svg)

Bốn tầng này không cố định cho cả một agent — chúng nên được gán riêng cho **từng loại hành động** mà agent có thể thực hiện. Cùng một agent có thể ở Tầng 4 cho việc gửi email nhắc nhở nội bộ, nhưng chỉ ở Tầng 2 cho việc chỉnh sửa hồ sơ tài chính.

→ *Liên quan: [AI cần một Control Layer: lớp nằm giữa agent và organizational knowledge](/insights/ai/ai-control-layer-doanh-nghiep)*

---

## Cách thiết kế permission model

![Bốn thẻ bước được đánh số theo thứ tự; bước kiểm tra ở mỗi hành động được tô nổi bật.](~/assets/images/insights/least-privilege-cho-ai/alp-05-four-steps-vi.svg)

Bốn bước cụ thể để chuyển từ nguyên tắc sang thực hành:

**1. Liệt kê từng loại hành động agent có thể thực hiện**, không coi "quyền của agent" là một khối duy nhất.

**2. Gán mỗi hành động vào một trong bốn tầng**, dựa trên mức độ hậu quả và khả năng đảo ngược nếu hành động đó sai.

**3. Thực thi việc kiểm tra quyền tại từng hành động cụ thể** (nguyên tắc "complete mediation" của Saltzer & Schroeder) — hệ thống cần xác thực lại phạm vi quyền mỗi khi agent cố gắng thực hiện một hành động.

**4. Xem xét định kỳ và có khả năng thu hồi**, đúng như đã bàn ở bài 6.11 về việc tách biệt quy trình đánh giá authority khỏi quy trình đánh giá năng lực.

---

*Bài viết này là một phần trong chuỗi OKELAS AI Control.*

**Bài liên quan:**
- [AI cần Authority, không chỉ Intelligence](/insights/ai/ai-authority-vs-intelligence-vi)
- [AI cần một Control Layer: lớp nằm giữa agent và organizational knowledge](/insights/ai/ai-control-layer-doanh-nghiep)
- [AI được phép làm đến đâu? Tại sao doanh nghiệp cần một control layer](/insights/ai/kiem-soat-ai-doanh-nghiep)

**→ [AI Readiness Assessment](/readiness/ai)**
