---
title: "Workflow xác định quy tắc; AI xử lý phần cần reasoning"
slug: "workflow-rule-ai-reasoning"
language: "vi"
translationKey: "article-5-15-rules-vs-reasoning"
type: "analysis"
cluster: "workflow"
parentPillar: "pillar-5-next-gen-workflow"
funnelStage: ["understanding"]
audience: ["CIO", "COO", "Operations Director"]
date: 2026-09-23
draft: true
seo:
  title: "Workflow xác định quy tắc — AI xử lý phần cần reasoning"
  description: "Không phải mọi thứ đều nên encode thành workflow rule. Và không phải mọi thứ đều nên để AI tự quyết định. Bài viết phân tích ranh giới hợp lý giữa hai phần này."
  primaryKeyword: "workflow rule AI reasoning"
  secondaryKeywords:
    - "workflow rules vs AI"
    - "phân chia workflow và AI"
    - "AI reasoning trong quy trình"
    - "workflow design AI"
  searchIntent: "Understanding — architect/operations muốn thiết kế đúng ranh giới giữa workflow rule và AI"
cta:
  primary: "Workflow Readiness Assessment"
relatedInternalLinks:
  - "workflow-thong-minh-the-he-moi" # Pillar 5, parent
  - "ai-agent-quyet-dinh-workflow-thuc-thi" # bài 5.14, trước
  - "agentic-workflow" # bài 5.16 (đề xuất), sau
  - "least-privilege-cho-ai" # bài 6.12 (đề xuất), cross-cluster
  - "workflow-readiness-assessment"
evidenceSources:
  - "Herbert A. Simon, \"The New Science of Management Decision\", 1960 — phân biệt programmed và nonprogrammed decisions"
---

## Tóm tắt cho CIO/COO/Operations

- Một câu hỏi cụ thể mà các bài trước trong series chưa trả lời trực tiếp: khi thiết kế một quy trình, **làm sao biết phần nào nên viết thành rule cứng trong workflow, và phần nào nên để AI xử lý bằng reasoning?**
- Câu trả lời không mới, và không phải phát minh của kỷ nguyên AI. Herbert Simon — nhà kinh tế học đoạt giải Nobel năm 1978 — đã đưa ra phân biệt này từ năm 1960, trong "The New Science of Management Decision": **quyết định có thể lập trình (programmed)** là loại lặp lại, có cấu trúc rõ, xử lý được bằng quy trình hoặc hệ thống tự động; **quyết định không thể lập trình (nonprogrammed)** là loại mới, phức tạp, đòi hỏi phán đoán, sáng tạo và phân tích sâu hơn.
- Simon cũng nhấn mạnh: đây là một **continuum (dải liên tục)**, không phải hai phạm trù tách biệt hoàn toàn. Phần lớn quyết định thực tế nằm ở đâu đó giữa hai đầu.
- Ứng dụng vào thiết kế workflow + AI: những gì rơi gần đầu "programmed" nên được encode thành rule trong workflow; những gì rơi gần đầu "nonprogrammed" nên được giao cho reasoning (của AI hoặc con người).
- Một điểm quan trọng thường bị bỏ sót: vị trí của một loại quyết định trên dải liên tục **không cố định** — nó có thể dịch chuyển về phía "programmed" theo thời gian, khi đủ tiền lệ tích lũy để biến một phán đoán từng cần reasoning thành một quy tắc có thể viết ra.

---

## Mở đầu

Đây là câu hỏi thực tế mà nhiều đội ngũ IT/Operations gặp phải khi bắt đầu thiết kế một workflow có AI tham gia: "cái này nên là một rule trong hệ thống, hay nên để AI tự phán đoán?" Câu hỏi tưởng như thuộc về công nghệ, nhưng thực chất là một câu hỏi quản trị đã được nghiên cứu từ rất lâu trước khi AI hiện đại xuất hiện.

Năm 1960, Herbert Simon — người sau này nhận giải Nobel Kinh tế năm 1978 — xuất bản "The New Science of Management Decision", trong đó ông đưa ra một phân biệt vẫn còn nguyên giá trị cho tới hôm nay: sự khác biệt giữa quyết định có thể lập trình và quyết định không thể lập trình.

---

## Những gì nên là rule

**Claim:** Những quyết định có tính lặp lại cao, cấu trúc rõ ràng, và tiêu chí ổn định theo thời gian nên được encode thành rule trong workflow — không cần và không nên giao cho AI reasoning.

Theo Simon, **quyết định có thể lập trình (programmed decisions)** là loại quyết định lặp lại và thường lệ, được xử lý thông qua các quy trình đã thiết lập hoặc hệ thống tự động. Ví dụ ông đưa ra bao gồm những việc như hạn mức giao dịch hằng ngày hay các bước kiểm tra tuân thủ trong tổ chức tài chính — những việc mà tiêu chí quyết định đã rõ ràng và ổn định.

Đặc điểm nhận diện một quyết định phù hợp để trở thành rule:

- **Tần suất cao.** Loại tình huống này xảy ra thường xuyên, đủ để việc viết một quy tắc chung mang lại lợi ích rõ ràng so với xử lý từng lần.
- **Tiêu chí ổn định.** Điều kiện để đưa ra quyết định không thay đổi liên tục — một ngưỡng, một điều kiện logic có thể được viết ra và áp dụng nhất quán trong một khoảng thời gian dài.
- **Ít mơ hồ.** Dữ liệu đầu vào có cấu trúc rõ, việc áp dụng quy tắc không đòi hỏi diễn giải theo ngữ cảnh.

**Ý nghĩa:** Cố gắng dùng AI reasoning cho những quyết định thuộc loại này không tạo thêm giá trị tương xứng — nó chỉ làm tăng độ trễ, chi phí, và khó kiểm chứng hơn so với một rule đơn giản, minh bạch. Đây chính là điều đã được nhắc tới trong các bài trước của series: automation truyền thống vẫn là lựa chọn đúng cho phần lớn công việc lặp lại, có quy tắc rõ ràng.

---

## Những gì cần reasoning

**Claim:** Những quyết định mới, phức tạp, hoặc có tiêu chí chưa được xác định đầy đủ từ trước cần một hình thức xử lý khác — Simon gọi đây là "giải quyết vấn đề" (problem solving), không phải áp dụng quy tắc.

**Quyết định không thể lập trình (nonprogrammed decisions)**, theo Simon, là loại mới và phức tạp, đòi hỏi phán đoán, sáng tạo, và phân tích sâu — không thể được mã hóa thành một chương trình máy tính theo cách một quyết định lặp lại có thể. Đặc điểm nhận diện:

- **Tình huống chưa từng gặp, hoặc hiếm gặp tới mức chưa đủ tiền lệ để rút ra quy tắc chung.**
- **Cần cân nhắc nhiều yếu tố cùng lúc**, trong đó tầm quan trọng tương đối của từng yếu tố có thể thay đổi tùy tình huống cụ thể.
- **Dữ liệu đầu vào mơ hồ hoặc phi cấu trúc**, đòi hỏi diễn giải trước khi có thể áp dụng bất kỳ tiêu chí nào.

Đây chính là loại công việc mà AI reasoning — hoặc phán đoán của con người — phù hợp hơn nhiều so với một rule cứng. Cố gắng viết một quy tắc bao trùm hết mọi biến thể của loại quyết định này thường dẫn tới hai kết quả xấu: hoặc quy tắc trở nên quá phức tạp để duy trì, hoặc quy tắc bỏ sót những trường hợp quan trọng vì không thể liệt kê hết trước.

---

## Ranh giới thực tế

Simon nhấn mạnh một điểm dễ bị bỏ qua khi áp dụng phân biệt này: programmed và nonprogrammed không phải hai phạm trù tách biệt hoàn toàn, mà là **hai đầu của một dải liên tục**. Phần lớn quyết định thực tế trong doanh nghiệp không nằm ở một trong hai cực, mà ở đâu đó giữa dải này.

Bốn tiêu chí thực tế để xác định một quyết định cụ thể nằm ở đâu trên dải này:

1. **Tần suất.** Xảy ra hàng ngày, hàng tuần, hay chỉ vài lần một năm?
2. **Độ ổn định của tiêu chí.** Tiêu chí quyết định có thay đổi theo mùa, theo chính sách mới, theo tình hình thị trường không?
3. **Mức độ có thể liệt kê trước các biến thể.** Có thể viết ra tất cả (hoặc gần hết) các trường hợp có thể xảy ra không, hay luôn có những biến thể mới xuất hiện?
4. **Hậu quả của việc áp dụng sai.** Nếu một rule cứng áp dụng sai cho một trường hợp ngoại lệ, hậu quả có nghiêm trọng không?

Một điểm quan trọng, ít được nhắc tới khi áp dụng khung của Simon vào bối cảnh AI hiện đại: **vị trí của một loại quyết định trên dải liên tục không cố định — nó có thể dịch chuyển theo thời gian.** Một loại tình huống ban đầu cần reasoning (vì mới, chưa có tiền lệ) có thể dần trở thành programmable khi đủ số lượng trường hợp đã được xử lý và các mẫu hình lặp lại được nhận diện rõ — đây chính xác là cơ chế đã được nhắc tới ở bài về intelligent routing: gợi ý dựa trên tiền lệ, theo thời gian, có thể trở thành cơ sở cho một rule mới.

---

## Cách thiết kế workflow + AI hợp lý

Kết hợp các phần trên thành một quy trình thiết kế thực hành:

**Bước 1 — Liệt kê các loại quyết định trong một quy trình cụ thể**, thay vì coi cả quy trình là một khối đồng nhất.

**Bước 2 — Đánh giá từng loại quyết định theo 4 tiêu chí ở trên**, để xác định vị trí gần đầu "programmed" hay gần đầu "nonprogrammed" trên dải liên tục.

**Bước 3 — Encode phần gần "programmed" thành rule trong workflow.** Đây nên là lựa chọn mặc định cho phần lớn khối lượng công việc, vì rẻ hơn, nhanh hơn, và dễ kiểm chứng hơn.

**Bước 4 — Giao phần gần "nonprogrammed" cho reasoning** — có thể là AI với giám sát phù hợp (theo mô hình decision/execution đã bàn ở bài trước), hoặc con người, tùy mức độ rủi ro và độ trưởng thành của dữ liệu.

**Bước 5 — Thiết lập cơ chế theo dõi sự dịch chuyển.** Định kỳ xem lại những quyết định đang ở phần "cần reasoning" — nếu đã tích lũy đủ tiền lệ và mẫu hình rõ ràng, cân nhắc chuyển một phần trong đó thành rule mới, thu hẹp dần phạm vi cần reasoning theo thời gian.

Bước 5 là điểm dễ bị bỏ sót nhất, nhưng lại là nơi tạo ra giá trị tích lũy theo thời gian: một tổ chức làm tốt việc này sẽ thấy phạm vi cần AI reasoning ngày càng thu hẹp về đúng những trường hợp thực sự mới, trong khi phần lớn khối lượng công việc dần được xử lý bằng rule minh bạch, nhanh và rẻ.

---

## Kết luận

Ranh giới giữa "nên là rule" và "nên cần reasoning" không phải một câu hỏi công nghệ mới do AI tạo ra — nó là một câu hỏi quản trị đã được nghiên cứu từ hơn sáu thập kỷ trước. Điều thay đổi trong kỷ nguyên AI không phải bản chất của câu hỏi, mà là công cụ có sẵn để xử lý phần "nonprogrammed" — từ chỉ có con người, giờ có thêm AI reasoning như một lựa chọn. Nhưng nguyên tắc phân định vẫn giữ nguyên: quyết định lặp lại, có cấu trúc rõ nên là rule; quyết định mới, phức tạp, cần phán đoán mới cần tới reasoning.

## Bước tiếp theo

Chọn một quy trình cụ thể, liệt kê các loại quyết định trong đó, và áp dụng 4 tiêu chí ở trên cho từng loại. Kết quả sẽ cho một bản đồ rõ ràng: phần nào nên viết thành rule ngay, phần nào cần giao cho reasoning, và phần nào cần theo dõi để chuyển đổi trong tương lai. Hoặc làm **Workflow Readiness Assessment** để có đánh giá toàn diện hơn.
