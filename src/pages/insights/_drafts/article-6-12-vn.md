---
title: "Least Privilege cho AI Agent: nguyên tắc thiết kế quyền hạn AI"
slug: "least-privilege-ai-agent"
language: "vi"
translationKey: "article-6-12-least-privilege"
type: "analysis"
cluster: "ai-control"
parentPillar: "pillar-6-ai-control-layer"
funnelStage: ["consideration"]
audience: ["CIO", "IT Architect", "Security"]
date: 2026-09-23
draft: true
seo:
  title: "Least Privilege cho AI Agent — nguyên tắc thiết kế quyền hạn AI trong doanh nghiệp"
  description: "AI agent chỉ nên được cấp quyền tối thiểu cần thiết cho task cụ thể — không hơn. Bài viết phân tích nguyên tắc least privilege trong ngữ cảnh AI và cách áp dụng trong enterprise."
  primaryKeyword: "least privilege AI agent"
  secondaryKeywords:
    - "AI agent permissions"
    - "giới hạn quyền hạn AI"
    - "AI access control"
    - "AI privilege management"
  searchIntent: "Consideration — IT Architect/CIO muốn thiết kế permission model cho AI agent"
cta:
  primary: "AI Readiness Assessment"
  secondary: "Liên hệ OKELAS"
relatedInternalLinks:
  - "kiem-soat-ai-doanh-nghiep" # Pillar 6, parent
  - "ai-authority-vs-intelligence" # bài 6.11, trước
  - "ai-control-layer-solution" # bài 6.13 (đề xuất), sau
  - "ai-quyet-dinh-workflow-thuc-thi" # bài 5.14, cross-cluster
  - "ai-readiness-assessment"
evidenceSources:
  - "Jerome Saltzer & Michael Schroeder, \"The Protection of Information in Computer Systems\", Proceedings of the IEEE, 1975"
  - "OWASP GenAI Security Project, \"OWASP Top 10 for LLM Applications 2026\" — Excessive Agency"
---

## Tóm tắt cho CIO/IT Architect/Security

- Least privilege là một trong những nguyên tắc thiết kế bảo mật lâu đời và được kiểm chứng nhiều nhất trong khoa học máy tính — được Jerome Saltzer và Michael Schroeder trình bày chính thức từ năm 1975, trong một trong những công trình nền tảng của an ninh thông tin. Nguyên tắc gốc: mỗi chương trình và mỗi người dùng có đặc quyền của hệ thống nên hoạt động với **lượng đặc quyền tối thiểu cần thiết để hoàn thành công việc** — không hơn.
- Áp dụng vào AI agent, nguyên tắc này cần một lớp cụ thể hóa mới, vì "công việc" của một agent không phải một tác vụ tĩnh — nó có thể bao gồm nhiều loại hành động khác nhau, từ chỉ đọc dữ liệu tới tự thực thi giao dịch. Đây chính là lý do một mô hình phân cấp quyền theo nhiều tầng — không phải một công tắc bật/tắt duy nhất — là cách tiếp cận phù hợp.
- Một mô hình phân cấp thực tế gồm bốn tầng: **Read** (chỉ đọc) → **Request** (soạn đề xuất, chưa gửi) → **Recommend** (gợi ý kèm căn cứ, cần xác nhận) → **Execute** (tự thực thi trong ngưỡng đã duyệt trước). Mỗi tầng tương ứng với một mức độ rủi ro và cần một mức độ giám sát khác nhau.
- Việc không áp dụng nguyên tắc này một cách có hệ thống chính là gốc rễ của rủi ro **Excessive Agency** — đã leo từ vị trí LLM06 lên LLM03 trong OWASP Top 10 for LLM Applications 2026 chỉ trong một năm.
- Thiết kế một permission model cho AI agent không phải một tài liệu chính sách — nó cần được thực thi ở cấp độ kỹ thuật, gắn với một cơ chế xác định rõ agent nào, quyền gì, cho nhiệm vụ nào, còn hiệu lực tới khi nào.

---

## Mở đầu

Sau khi đã thiết lập ở bài 6.11 rằng authority cần được trao một cách tường minh, tách biệt khỏi năng lực của mô hình, câu hỏi tiếp theo là câu hỏi thực hành: **authority đó nên được thiết kế cụ thể như thế nào?**

Câu trả lời không cần phát minh mới — nó đã tồn tại trong khoa học máy tính từ nửa thế kỷ trước, dưới tên gọi **least privilege**. Bài này áp dụng nguyên tắc đó một cách cụ thể vào bối cảnh AI agent doanh nghiệp.

---

## Least privilege là gì

**Claim:** Nguyên tắc least privilege quy định rằng một thực thể (chương trình, người dùng, hoặc — trong bối cảnh hiện nay — một AI agent) chỉ nên được cấp đúng lượng quyền hạn cần thiết để hoàn thành nhiệm vụ được giao, không hơn.

Nguyên tắc này được trình bày chính thức trong "The Protection of Information in Computer Systems" (Saltzer & Schroeder, Proceedings of the IEEE, 1975) — một trong những công trình nền tảng nhất của lĩnh vực an ninh thông tin, được xuất bản trước cả tiêu chuẩn bảo mật máy tính đầu tiên của Bộ Quốc phòng Mỹ (Orange Book, 1985) tới một thập kỷ. Phát biểu gốc, dựa trên ghi chú trước đó của Saltzer năm 1970: **"mỗi chương trình và mỗi người dùng có đặc quyền của hệ thống nên hoạt động với lượng đặc quyền tối thiểu cần thiết để hoàn thành công việc."**

Lý do nền tảng của nguyên tắc này không phải để ngăn hành vi cố ý xấu — mà chính xác hơn, để **giới hạn thiệt hại có thể xảy ra do tai nạn hoặc sai sót**. Đây là một điểm quan trọng cần nhấn mạnh: least privilege không giả định thực thể được cấp quyền có ý đồ xấu — nó đơn giản thừa nhận rằng sai sót luôn có thể xảy ra, và thiết kế hệ thống sao cho một sai sót không thể lan rộng vượt quá phạm vi cần thiết.

Saltzer và Schroeder cũng đề xuất một nguyên tắc bổ trợ quan trọng: **"complete mediation"** — mọi lần truy cập vào mọi đối tượng đều cần được kiểm tra quyền hạn, không có ngoại lệ dựa trên việc "đã kiểm tra một lần trước đó." Áp dụng vào AI agent, điều này có nghĩa: quyền hạn cần được xác thực tại từng hành động cụ thể, không chỉ một lần khi agent được khởi tạo.

---

## Tại sao áp dụng cho AI agent

Nguyên tắc least privilege ra đời cho các hệ thống máy tính truyền thống, nhưng ba đặc điểm của AI agent khiến việc áp dụng nó trở nên cấp thiết hơn, không kém phần quan trọng:

**1. AI agent thường được cấp quyền rộng "để linh hoạt xử lý mọi tình huống"** — chính xác ngược lại với tinh thần least privilege. Vì agent cần xử lý những tình huống không thể liệt kê hết trước (như đã bàn ở các bài về agentic workflow), có một xu hướng tự nhiên là cấp quyền rộng thay vì hẹp, để tránh agent "bị kẹt" vì thiếu quyền. Đây chính xác là cơ chế dẫn tới rủi ro Excessive Agency.

**2. Hậu quả của việc vi phạm nguyên tắc này với AI agent nghiêm trọng hơn với phần mềm truyền thống**, vì agent có khả năng tự thực thi nhiều bước liên tiếp (như đã bàn ở bài 6.3 về vòng lặp Thought-Action-Observation) — một sai sót ở quyền hạn có thể bị khai thác qua nhiều bước trước khi bị phát hiện, không chỉ một lần.

**3. Ranh giới giữa "dữ liệu cần đọc" và "hành động được phép thực hiện" dễ bị xóa nhòa hơn với AI agent**, vì agent xử lý ngôn ngữ tự nhiên và có xu hướng coi nội dung trong ngữ cảnh của nó là có thể mang tính chỉ dẫn (đã bàn ở bài 6.6 và 6.8) — khiến việc phân định rõ ràng các tầng quyền hạn trở nên quan trọng hơn, không kém phần khó khăn hơn.

Xu hướng thực tế đã được ghi nhận: rủi ro **Excessive Agency** leo từ vị trí LLM06 lên LLM03 trong "OWASP Top 10 for LLM Applications 2026" chỉ trong một năm — phản ánh đúng việc thiếu áp dụng nguyên tắc least privilege một cách có hệ thống khi tốc độ triển khai AI agent tăng nhanh.

---

## Ví dụ phân chia quyền: Read / Request / Recommend / Execute

Một cách áp dụng thực tế nguyên tắc least privilege cho AI agent là thiết kế một mô hình phân cấp bốn tầng, thay vì một quyết định nhị phân "có quyền" hay "không có quyền":

**Tầng 1 — Read (Chỉ đọc).** Agent có thể truy vấn và đọc dữ liệu để phục vụ phân tích hoặc trả lời câu hỏi, nhưng không có khả năng thay đổi bất cứ điều gì. Đây là tầng rủi ro thấp nhất, phù hợp với phần lớn các tác vụ tổng hợp thông tin, tra cứu, hoặc phân loại đã bàn ở Pillar 5 (bài 5.10, 5.11).

**Tầng 2 — Request (Soạn đề xuất).** Agent có thể soạn một hành động cụ thể — một email, một đơn hàng, một bản cập nhật hồ sơ — nhưng hành động đó ở trạng thái nháp, chưa được gửi đi hoặc thực thi. Con người xem lại toàn bộ nội dung trước khi quyết định.

**Tầng 3 — Recommend (Gợi ý kèm căn cứ).** Agent không chỉ soạn đề xuất mà còn đưa ra khuyến nghị cụ thể kèm lý do — dựa trên dữ liệu nào, tiền lệ nào (đúng chức năng "recommend" đã bàn ở bài 5.10) — nhưng quyền quyết định cuối cùng vẫn thuộc về một điểm xác nhận độc lập, đúng ranh giới decision/execution đã bàn ở bài 5.14.

**Tầng 4 — Execute (Tự thực thi trong ngưỡng).** Agent được phép tự thực hiện hành động mà không cần xác nhận từng lần, nhưng chỉ trong phạm vi ngưỡng đã được con người phê duyệt trước — đúng mô hình Event → Action đã bàn ở Pillar 5 (bài 5.9): phần lớn trường hợp lặp lại, giá trị thấp, có tiền lệ rõ ràng đi thẳng tới hành động; trường hợp vượt ngưỡng tự động chuyển về Tầng 3.

Bốn tầng này không cố định cho cả một agent — chúng nên được gán riêng cho **từng loại hành động** mà agent có thể thực hiện. Cùng một agent có thể ở Tầng 4 cho việc gửi email nhắc nhở nội bộ, nhưng chỉ ở Tầng 2 cho việc chỉnh sửa hồ sơ tài chính.

---

## Cách thiết kế permission model

Để chuyển từ nguyên tắc sang thực hành, bốn bước cụ thể:

**1. Liệt kê từng loại hành động agent có thể thực hiện**, không coi "quyền của agent" là một khối duy nhất — đúng cách tiếp cận đã bàn ở bài 5.15 về việc chia nhỏ quyết định trước khi phân loại.

**2. Gán mỗi hành động vào một trong bốn tầng**, dựa trên mức độ hậu quả và khả năng đảo ngược nếu hành động đó sai — đúng các câu hỏi authorization đã bàn ở bài 6.9, không dựa trên việc agent "có vẻ đủ tin cậy."

**3. Thực thi việc kiểm tra quyền tại từng hành động cụ thể** (đúng nguyên tắc "complete mediation" của Saltzer & Schroeder), không chỉ một lần khi agent được cấu hình — nghĩa là hệ thống cần xác thực lại phạm vi quyền mỗi khi agent cố gắng thực hiện một hành động, không giả định quyền đã được cấp trước đó vẫn còn phù hợp.

**4. Xem xét định kỳ và có khả năng thu hồi**, đúng như đã bàn ở bài 6.11 về việc tách biệt quy trình đánh giá authority khỏi quy trình đánh giá năng lực.

Đây cũng chính xác là lý do một cơ chế kiến trúc riêng biệt — như KVM đã trình bày ở đầu Pillar 6 — có giá trị cho tầng Read: buộc mọi truy cập tri thức tổ chức của agent phải đi qua các thao tác đã được xác định (Trace, FindEvidence, Resolve) thay vì để agent tự do truy cập dữ liệu thô, giúp việc thực thi "complete mediation" ở tầng đọc dữ liệu trở nên khả thi về mặt kỹ thuật, không chỉ là một chính sách trên giấy.

---

## Kết luận

Least privilege không phải một khái niệm mới cần phát minh cho AI — nó là một nguyên tắc thiết kế bảo mật đã được kiểm chứng suốt 50 năm, giờ cần được áp dụng một cách có chủ đích cho một loại thực thể mới. Mô hình bốn tầng — Read, Request, Recommend, Execute — là một cách cụ thể hóa nguyên tắc đó cho AI agent, giúp doanh nghiệp tránh rơi vào xu hướng phổ biến nhất hiện nay: cấp quyền rộng vì tiện lợi, rồi phát hiện ra phạm vi rủi ro thực sự chỉ sau khi có sự cố.

## Bước tiếp theo

Với một AI agent cụ thể doanh nghiệp bạn đang vận hành, liệt kê từng loại hành động nó có thể thực hiện và gán mỗi hành động vào một trong bốn tầng Read/Request/Recommend/Execute. Nếu phần lớn hành động đang ở Tầng 4 mà chưa qua đánh giá hậu quả/khả năng đảo ngược rõ ràng, đó là nơi cần ưu tiên xử lý trước. Làm **AI Readiness Assessment** để có đánh giá toàn diện hơn, hoặc liên hệ đội ngũ OKELAS để trao đổi cụ thể về cách thiết kế permission model phù hợp với hệ thống của doanh nghiệp bạn.
