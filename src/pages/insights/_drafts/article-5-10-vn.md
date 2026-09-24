---
title: "AI có thể tham gia vào workflow ở đâu — và làm gì cụ thể?"
slug: "ai-tich-hop-vao-workflow"
language: "vi"
translationKey: "article-5-10-where-ai-fits-workflow"
type: "analysis"
cluster: "workflow"
parentPillar: "pillar-5-next-gen-workflow"
funnelStage: ["understanding"]
audience: ["COO", "CIO", "Operations Director"]
date: 2026-09-23
draft: true
seo:
  title: "AI có thể tham gia vào workflow ở đâu — và làm gì cụ thể?"
  description: "AI không tham gia workflow theo cùng một cách ở mọi bước. Bài viết phân tích các điểm cụ thể trong workflow mà AI có thể thêm giá trị — và những điểm cần giữ human control."
  primaryKeyword: "AI tích hợp vào workflow"
  secondaryKeywords:
    - "AI trong quy trình"
    - "AI workflow integration"
    - "where AI fits workflow"
    - "AI automation workflow"
  searchIntent: "Understanding — Operations/IT muốn biết AI có thể làm gì cụ thể trong workflow"
cta:
  primary: "Workflow Readiness Assessment"
relatedInternalLinks:
  - "workflow-thong-minh-the-he-moi" # Pillar 5, parent
  - "tu-request-approval-sang-event-action" # bài 5.9, trước
  - "workflow-tu-phan-loai" # bài 5.11 (đề xuất), sau
  - "ai-agent-trong-doanh-nghiep" # bài 2.6, cross-cluster
  - "ai-agent-va-workflow" # bài 6.13 (đề xuất), cross-cluster
  - "workflow-readiness-assessment"
evidenceSources:
  - "Parasuraman, Sheridan & Wickens, \"A Model for Types and Levels of Human Interaction with Automation\", IEEE Transactions on Systems, Man, and Cybernetics, 2000"
  - "Sheridan & Verplank, thang đo mức độ tự động hóa human-machine interaction, 1978"
---

## Tóm tắt cho COO/CIO

- Câu hỏi "có nên đưa AI vào workflow không" thường được trả lời quá sớm bằng một sản phẩm cụ thể. Câu hỏi đúng hơn là: **AI nên tham gia vào giai đoạn nào của một chuỗi xử lý thông tin, và ở mức độ tự động nào?**
- Một khung lý thuyết được trích dẫn rộng rãi trong ngành kỹ thuật hệ thống người-máy — mô hình của Parasuraman, Sheridan và Wickens (2000) — chia một chuỗi xử lý thành bốn giai đoạn: **thu thập thông tin, phân tích thông tin, lựa chọn quyết định/hành động, và thực thi hành động** — và chỉ ra rằng mức độ tự động hóa hợp lý có thể khác nhau ở từng giai đoạn, không nhất thiết đồng đều.
- Bốn dạng tham gia cụ thể của AI trong workflow — phân loại (classify), định tuyến (route), gợi ý (recommend), và thực thi (execute) — tương ứng với bốn giai đoạn trên, mỗi dạng có mức rủi ro và yêu cầu kiểm soát khác nhau.
- Nguyên tắc chung: mức độ tự động hóa nên tăng dần theo mức độ có thể đảo ngược của hành động (reversibility) và mức độ chắc chắn của dữ liệu đầu vào — không nên áp dụng cùng một mức tự động hóa cho mọi bước.

---

## Mở đầu

Nhiều cuộc thảo luận về "AI trong workflow" ở cấp COO/CIO thường bắt đầu và kết thúc ở một câu hỏi khá mơ hồ: "chúng ta có nên thêm AI vào quy trình X không?" Câu hỏi này khó trả lời vì nó gộp chung nhiều loại quyết định rất khác nhau vào một khái niệm duy nhất.

Một workflow thực tế không phải một khối đồng nhất — nó gồm nhiều giai đoạn nhỏ: thu thập dữ liệu, hiểu dữ liệu đó có ý nghĩa gì, quyết định nên làm gì, và cuối cùng thực hiện hành động đó. AI có thể tham gia vào từng giai đoạn theo những cách rất khác nhau, với mức độ rủi ro khác nhau. Bài này dùng một khung phân tích có nguồn gốc học thuật để làm rõ điều đó.

---

## Mapping các điểm AI có thể tham gia

**Claim:** Một chuỗi xử lý công việc, dù trong workflow doanh nghiệp hay trong hệ thống kỹ thuật, đều có thể chia thành các giai đoạn xử lý thông tin tương tự nhau — và mỗi giai đoạn có thể được tự động hóa ở mức độ khác nhau.

Mô hình của Parasuraman, Sheridan và Wickens (2000), công bố trên IEEE Transactions on Systems, Man, and Cybernetics, là một trong những khung lý thuyết được trích dẫn nhiều nhất trong lĩnh vực tương tác người-máy và tự động hóa. Mô hình này chia một chuỗi xử lý thành bốn giai đoạn:

1. **Thu thập thông tin** (information acquisition) — cảm nhận, ghi nhận dữ liệu đầu vào từ nhiều nguồn.
2. **Phân tích thông tin** (information analysis) — tổng hợp, diễn giải dữ liệu đã thu thập để hiểu ý nghĩa của nó.
3. **Lựa chọn quyết định/hành động** (decision and action selection) — cân nhắc các phương án và chọn ra hành động phù hợp.
4. **Thực thi hành động** (action implementation) — thực hiện hành động đã chọn.

Điểm quan trọng nhất trong mô hình này: mức độ tự động hóa (level of automation) không cần và không nên giống nhau ở cả bốn giai đoạn. Một hệ thống có thể tự động hóa hoàn toàn việc thu thập dữ liệu, nhưng chỉ hỗ trợ một phần ở giai đoạn quyết định, và giữ nguyên việc thực thi cho con người — hoặc ngược lại, tùy vào bản chất công việc.

Áp dụng vào workflow doanh nghiệp, bốn giai đoạn này tương ứng với: hệ thống ghi nhận một yêu cầu hoặc sự kiện → hệ thống hiểu/phân loại yêu cầu đó → hệ thống hoặc con người quyết định hành động → hành động được thực hiện.

---

## Phân loại: classify, route, recommend, execute

Từ bốn giai đoạn trên, có thể xác định bốn dạng tham gia cụ thể của AI trong workflow doanh nghiệp:

**1. Classify (phân loại).** AI đọc dữ liệu đầu vào — một email, một biểu mẫu, một hình ảnh chứng từ — và gán nó vào một danh mục đã định nghĩa trước (loại yêu cầu, mức độ ưu tiên, phòng ban liên quan). Đây tương ứng với giai đoạn phân tích thông tin. Rủi ro thấp vì AI không quyết định hành động, chỉ diễn giải dữ liệu.

**2. Route (định tuyến).** Dựa trên kết quả phân loại, AI xác định yêu cầu này nên đi tới đâu — người nào, phòng ban nào, hoặc quy trình con nào. Đây là bước chuyển tiếp giữa phân tích và quyết định. Rủi ro thấp đến trung bình, vì sai sót ở đây thường chỉ gây chậm trễ (định tuyến sai, phải chuyển lại), không gây hậu quả trực tiếp.

**3. Recommend (gợi ý).** AI đề xuất một hành động cụ thể dựa trên dữ liệu và tiền lệ, nhưng con người vẫn là người quyết định cuối cùng. Đây tương ứng với giai đoạn lựa chọn quyết định, ở mức độ tự động hóa thấp — theo thang của Sheridan và Verplank (1978), đây tương đương mức máy tính gợi ý một vài phương án, con người chọn. Rủi ro trung bình, phụ thuộc vào việc gợi ý có được giải thích rõ ràng để con người kiểm chứng hay không.

**4. Execute (thực thi).** AI trực tiếp thực hiện hành động — gửi một thông báo, tạo một đơn hàng, cập nhật một hồ sơ — mà không cần xác nhận trước của con người trong từng trường hợp. Đây tương ứng với mức tự động hóa cao ở giai đoạn thực thi. Rủi ro cao nhất trong bốn dạng, vì hậu quả xảy ra ngay khi AI hành động, trước khi con người có cơ hội can thiệp.

Bốn dạng này không loại trừ lẫn nhau — một workflow cụ thể có thể dùng AI để classify và route hầu hết trường hợp, nhưng chỉ recommend (không execute) ở bước quyết định cuối, tùy vào mức độ rủi ro của quy trình đó.

---

## Điểm nào nên giữ human control

Không có câu trả lời chung cho mọi workflow — nhưng có hai tiêu chí giúp xác định mức độ tự động hóa phù hợp cho từng giai đoạn:

**Mức độ có thể đảo ngược của hành động (reversibility).** Một hành động dễ đảo ngược (gửi một thông báo nhắc nhở, tạo một bản nháp chưa gửi) có thể chấp nhận mức tự động hóa cao hơn. Một hành động khó hoặc không thể đảo ngược (gửi tiền, xác nhận hợp đồng, từ chối một yêu cầu của khách hàng) nên giữ ở mức "recommend" hoặc thấp hơn, để con người xác nhận trước khi thực thi.

**Mức độ chắc chắn của dữ liệu đầu vào.** Với dữ liệu có cấu trúc rõ ràng và ít mơ hồ (một con số vượt ngưỡng đã định), AI có thể tự tin hơn ở giai đoạn phân tích và quyết định. Với dữ liệu phi cấu trúc, mơ hồ, hoặc đòi hỏi diễn giải theo ngữ cảnh (một email khiếu nại viết cảm tính), nên giữ mức tự động hóa thấp hơn ở giai đoạn phân tích, và chắc chắn giữ con người ở giai đoạn quyết định.

Một lưu ý quan trọng từ chính mô hình của Parasuraman và cộng sự: tự động hóa không chỉ thay thế con người — nó **thay đổi bản chất công việc của con người**, và có thể tạo ra những hệ quả không mong muốn như hiện tượng ỷ lại vào tự động hóa (automation complacency) hoặc suy giảm kỹ năng khi con người không còn thực hành việc ra quyết định thường xuyên. Đây là lý do việc chọn mức tự động hóa không nên chỉ dựa trên khả năng kỹ thuật (AI có làm được không), mà còn cần cân nhắc tác động dài hạn tới năng lực ra quyết định của đội ngũ.

---

## Framework tích hợp AI vào workflow

Kết hợp các phần trên thành một quy trình thực hành:

**Bước 1 — Chia nhỏ workflow theo 4 giai đoạn.** Với một quy trình cụ thể, xác định rõ đâu là giai đoạn thu thập, phân tích, quyết định, và thực thi — thay vì coi cả quy trình là một khối.

**Bước 2 — Đánh giá reversibility và độ chắc chắn dữ liệu cho từng giai đoạn.** Giai đoạn nào có hành động dễ đảo ngược và dữ liệu rõ ràng, có thể cân nhắc mức tự động hóa cao hơn (route, thậm chí execute). Giai đoạn nào liên quan tới hành động khó đảo ngược hoặc dữ liệu mơ hồ, nên dừng ở classify hoặc recommend.

**Bước 3 — Triển khai từng giai đoạn độc lập, không phải toàn bộ quy trình cùng lúc.** Ví dụ: bắt đầu bằng việc để AI classify và route các yêu cầu, giữ nguyên con người ở bước quyết định trong vài tháng đầu để kiểm chứng độ chính xác của việc phân loại, trước khi cân nhắc mở rộng sang recommend.

**Bước 4 — Thiết lập cơ chế xem lại định kỳ.** Vì mức độ tự động hóa phù hợp có thể thay đổi theo thời gian (khi dữ liệu tích lũy nhiều hơn, độ tin cậy của mô hình được kiểm chứng), cần có điểm xem lại định kỳ để điều chỉnh mức tự động hóa ở từng giai đoạn, thay vì cố định một lần.

---

## Kết luận

"AI trong workflow" không phải một quyết định nhị phân (có hoặc không) — nó là một tập hợp các quyết định nhỏ hơn về việc AI nên tham gia vào giai đoạn nào, ở mức độ nào. Dùng khung bốn giai đoạn (thu thập, phân tích, quyết định, thực thi) cùng hai tiêu chí đánh giá (reversibility và độ chắc chắn dữ liệu) giúp biến câu hỏi mơ hồ "có nên dùng AI không" thành một chuỗi quyết định cụ thể, có thể triển khai từng bước và kiểm chứng được.

## Bước tiếp theo

Chọn một quy trình cụ thể, chia nó thành 4 giai đoạn theo mô hình trên, và với mỗi giai đoạn, tự hỏi: hành động ở đây có dễ đảo ngược không, dữ liệu có đủ rõ ràng không? Câu trả lời sẽ cho biết giai đoạn nào sẵn sàng cho AI tham gia, và ở mức độ nào. Hoặc làm **Workflow Readiness Assessment** để đánh giá toàn diện hơn.
