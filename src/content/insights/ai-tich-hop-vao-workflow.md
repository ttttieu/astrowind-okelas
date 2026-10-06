---
title: "AI làm gì trong workflow — và làm ở giai đoạn nào"
description: "AI không tham gia workflow theo cùng một cách ở mọi bước. Bài phân tích giai đoạn nào AI xử lý thông tin, giai đoạn nào thuộc về rule và con người — và tại sao ranh giới đó quan trọng."
publishDate: 2026-09-23T00:00:00Z
translationId: article-5-10-where-ai-fits-workflow
lang: vi
category: workflow
contentType: Analysis
funnelStage:
  - Understanding
audience:
  - COO
  - CIO
  - Operations Director
primaryKeyword: "AI trong workflow"
secondaryKeywords:
  - "ứng dụng AI vào quy trình doanh nghiệp"
  - "nhận biết ý định trong workflow"
  - "AI phân loại yêu cầu"
  - "AI diễn giải dữ liệu quy trình"
  - "human-in-the-loop workflow"
assessmentHref: /readiness/ai
coverImage: '~/assets/images/insights/ai-tich-hop-vao-workflow/wfi-00-og-cover-vi.png'
ogImage: '~/assets/images/insights/ai-tich-hop-vao-workflow/wfi-00-og-cover-vi.png'
coverImageAlt: "Bốn giai đoạn xử lý thông tin của một workflow. AI tham gia ở giai đoạn 1 và 2 (thu thập, phân tích); rule và con người đảm nhận giai đoạn 3 và 4 (quyết định, thực thi)."
draft: false
---

---

> **Tóm tắt cho CEO/COO**
>
> - Câu hỏi "có nên đưa AI vào workflow không" thường được trả lời quá sớm. Câu hỏi đúng hơn: **AI nên tham gia vào giai đoạn nào của một chuỗi xử lý thông tin?**
> - Khung Parasuraman, Sheridan và Wickens (2000) chia chuỗi xử lý thành bốn giai đoạn: thu thập thông tin, phân tích thông tin, lựa chọn quyết định, và thực thi hành động.
> - **AI tham gia ở giai đoạn 1-2:** nhận biết ý định, trích xuất thông tin, phân loại có kiểm soát, diễn giải kết quả kèm evidence. Đây là phần xử lý thông tin phi cấu trúc mà rule không làm được.
> - **Giai đoạn 3 (quyết định) và 4 (thực thi) không phải nơi AI hành động độc lập.** Quyết định thuộc về rule đã duyệt hoặc con người; thực thi thuộc về hệ thống workflow — với thẩm quyền được xác định rõ, tách biệt với AI.
> - Mọi đầu ra của AI phải đi kèm evidence có thể trace — để người quyết định kiểm chứng, không tin vào "kết luận" của AI.

---

Nhiều cuộc thảo luận về "AI trong workflow" ở cấp COO/CIO thường bắt đầu và kết thúc ở một câu hỏi khá mơ hồ: "chúng ta có nên thêm AI vào quy trình X không?" Câu hỏi này khó trả lời vì nó gộp chung nhiều thứ rất khác nhau vào một khái niệm.

Một workflow thực tế không phải một khối đồng nhất. Nó gồm nhiều giai đoạn: thu thập dữ liệu, hiểu dữ liệu đó có ý nghĩa gì, quyết định nên làm gì, và thực hiện hành động đó. AI có thể tham gia ở một số giai đoạn — nhưng không phải tất cả, và không phải theo cùng một cách. Ranh giới đó cần rõ, không phải để hạn chế AI mà để giữ thẩm quyền ở đúng chỗ.

→ *Xem thêm: [Rule hay con người: quyết định nào nên tự động hóa trong quy trình](/insights/workflow/rule-hay-con-nguoi-quyet-dinh-trong-workflow)*

---

## Bốn giai đoạn của một chuỗi xử lý thông tin

![Mô hình bốn giai đoạn xử lý thông tin: thu thập, phân tích, lựa chọn quyết định và thực thi, tương ứng với ghi nhận sự kiện, phân loại, quyết định và hành động; mức kiểm soát có thể khác nhau ở từng giai đoạn.](~/assets/images/insights/ai-tich-hop-vao-workflow/wfi-01-four-stages-vi-dark.svg)

Mô hình của Parasuraman, Sheridan và Wickens (2000), công bố trên IEEE Transactions on Systems, Man, and Cybernetics, là một trong những khung lý thuyết được trích dẫn nhiều nhất trong lĩnh vực tương tác người-máy và tự động hóa. Mô hình chia một chuỗi xử lý thành bốn giai đoạn:

1. **Thu thập thông tin** (information acquisition) — cảm nhận, ghi nhận dữ liệu đầu vào từ nhiều nguồn.
2. **Phân tích thông tin** (information analysis) — tổng hợp, diễn giải dữ liệu đã thu thập để hiểu ý nghĩa của nó.
3. **Lựa chọn quyết định/hành động** (decision and action selection) — cân nhắc các phương án và chọn ra hành động phù hợp.
4. **Thực thi hành động** (action implementation) — thực hiện hành động đã chọn.

Điểm quan trọng nhất trong mô hình này: **mức kiểm soát cần thiết không cần và không nên giống nhau ở cả bốn giai đoạn.** Một hệ thống có thể để AI xử lý hoàn toàn việc phân tích thông tin đầu vào, nhưng giữ con người ở bước quyết định — hoặc dùng rule ở bước quyết định, và workflow system ở bước thực thi. Không có công thức đồng nhất.

---

## AI làm gì ở giai đoạn 1 và 2

Giai đoạn thu thập và phân tích thông tin là nơi AI tạo ra giá trị rõ nhất trong workflow doanh nghiệp — vì đây là phần xử lý đầu vào phi cấu trúc mà rule thuần túy không làm được.

Bốn việc cụ thể AI làm ở hai giai đoạn này:

**Nhận biết ý định (intent recognition).** Một yêu cầu viết bằng ngôn ngữ tự nhiên — email, chat, biểu mẫu điền tự do — không có cấu trúc định sẵn. AI đọc và xác định yêu cầu đó đang hỏi gì, cần gì, thuộc nhóm vấn đề nào. Đây là điều kiện tiên quyết để workflow có thể xử lý tiếp.

**Trích xuất thông tin có cấu trúc (extraction).** Từ tài liệu phi cấu trúc — hóa đơn, hợp đồng, biên bản, email khiếu nại — AI rút ra các trường dữ liệu cụ thể (số tiền, ngày, tên sản phẩm, mã đơn hàng) để đưa vào workflow ở dạng có thể kiểm chứng. Không phải AI "hiểu" tài liệu — mà AI trích xuất để rule và con người có thể làm việc với dữ liệu đó.

**Phân loại có kiểm soát (controlled classification).** AI gán đầu vào vào một danh mục đã được định nghĩa rõ từ trước — loại yêu cầu, mức ưu tiên, phòng ban liên quan, loại sự kiện. "Có kiểm soát" có nghĩa: danh mục do người có thẩm quyền định nghĩa, AI không tự tạo danh mục mới; kết quả phân loại dưới ngưỡng tin cậy được chuyển sang con người.

**Diễn giải kết quả kèm evidence (interpretation with evidence).** Khi dữ liệu đã được trích xuất và phân loại, AI tổng hợp và diễn giải ý nghĩa của chúng — trường hợp này tương tự những trường hợp nào đã xảy ra trước? Có cờ rủi ro nào theo rule không? Thông tin nào còn thiếu? Mỗi diễn giải phải đi kèm evidence có thể trace — nguồn từ đâu, dữ liệu gốc là gì.

Đây là ranh giới của AI trong chuỗi xử lý: **diễn giải của AI không trở thành thẩm quyền.** AI chuẩn bị thông tin để bước tiếp theo — dù là rule hay con người — có thể hành động với căn cứ đầy đủ.

**Điều AI không làm ở đây:** AI không quyết định hành động, không thực thi bất kỳ hành động nào, và không gợi ý hành động theo cách để hệ thống tự chạy theo. Mọi đầu ra của AI là thông tin kèm evidence — để rule đã được ban hành hoặc con người có thẩm quyền xử lý tiếp.

---

## Bảng ranh giới bốn lớp

Để rõ hơn về ai đảm nhận gì trong một workflow tích hợp AI:

| Lớp | Đảm nhận |
|---|---|
| **Workflow / rule** | Điều kiện phải xảy ra, điều được phép, tính toán, kiểm tra, trạng thái, thực thi theo thẩm quyền đã được ban hành |
| **KVM / evidence** | Truy xuất, resolve và trace tri thức tổ chức — tiền lệ, tài liệu chuẩn, lịch sử quyết định |
| **AI** | Nhận biết ý định, trích xuất, phân loại có kiểm soát, diễn giải kết quả và evidence cho người đọc |
| **Con người** | Phán đoán ngoại lệ, duyệt hành động rủi ro cao, ban hành và sửa rule, xác nhận evidence trước khi hành động có hậu quả cao |

Ba nguyên tắc đi kèm bảng này:

- **Diễn giải của AI không trở thành thẩm quyền.** AI có thể diễn giải thông tin tổ chức, nhưng diễn giải đó không thay thế thẩm quyền của rule hay con người.
- **Tiền lệ là evidence, không phải thẩm quyền.** AI có thể tổng hợp tiền lệ tương tự như một phần của evidence — nhưng tiền lệ chỉ là thông tin tham khảo; quyết định có theo hay không là của con người.
- **Agentic là capability tùy chọn, không phải mức trưởng thành.** Workflow có AI tham gia ở giai đoạn 1-2 là workflow trưởng thành — không cần agent để "trưởng thành hơn."

→ *Xem thêm: [Automation và AI hỗ trợ workflow — hai vai trò khác nhau](/insights/workflow/automation-va-ai-ho-tro-workflow)*

---

## Giai đoạn 3 và 4: quyết định và thực thi không phải của AI

Một lỗi phổ biến khi thiết kế workflow có AI là để AI "gợi ý hành động" rồi hệ thống tự chạy theo gợi ý đó. Điều này vô hình chung chuyển thẩm quyền quyết định sang AI mà không có cơ chế kiểm soát rõ ràng.

**Giai đoạn 3 — lựa chọn quyết định:** thuộc về hai chủ thể:
- **Rule đã duyệt** nếu điều kiện rơi vào nhóm đã được encode (lặp lại, tiêu chí rõ, hậu quả sai chấp nhận được theo xem xét của người có thẩm quyền).
- **Con người** nếu tình huống nằm ngoài rule, hậu quả cao, hoặc tiêu chí chưa đủ ổn định để encode.

AI ở giai đoạn này làm một việc duy nhất: **chuẩn bị hồ sơ evidence** — dữ kiện đã trace, trường hợp tương tự, cờ rủi ro theo rule — để người quyết định có căn cứ thực chứ không phải bấm xác nhận phản xạ. AI không chọn; AI chuẩn bị để người có thẩm quyền chọn.

**Giai đoạn 4 — thực thi hành động:** thuộc về hệ thống workflow với quyền kỹ thuật được cấp theo thẩm quyền đã xác định — không phải AI tự thực thi. Sự tách bạch giữa AI (diễn giải) và hệ thống (thực thi) là một trong những nguyên tắc kiểm soát quan trọng nhất khi thiết kế workflow có AI tham gia.

→ *Xem thêm: [Phân tách trách nhiệm khi dùng AI trong workflow](/insights/workflow/phan-tach-trach-nhiem-ai-trong-workflow)*

---

## Ranh giới: rule, AI và con người

| Giai đoạn | Rule trong workflow | AI hỗ trợ đầu vào | Con người |
|---|---|---|---|
| Thu thập thông tin | Ghi nhận theo trường và quy tắc đã định | Trích xuất, diễn giải từ email, biểu mẫu, ảnh chứng từ | Không cần, trừ khi dữ liệu mơ hồ |
| Phân tích thông tin | Áp tiêu chí, ngưỡng đã viết | Phân loại; tổng hợp evidence từ ca tương tự | Xác nhận nếu rủi ro cao |
| Lựa chọn quyết định | Chỉ khi tiêu chí rõ và hậu quả sai thấp (đường mặc định) | Gợi ý kèm evidence, không quyết định | Phán đoán; xác nhận bắt buộc nếu hậu quả sai cao |
| Thực thi hành động | Thực hiện hành động mà rule đã cho phép | Không thực thi | Thực hiện hoặc phê duyệt hành động khó đảo ngược |

Bảng này không nói AI làm được bao nhiêu — mà nói AI dừng ở đâu. Ở giai đoạn 1 và 2, AI hỗ trợ đầu vào cho rule và con người. Ở giai đoạn 3 và 4, quyết định và thực thi thuộc về rule đã ban hành hoặc con người có thẩm quyền — không phải AI.

---

## Hai yếu tố quyết định mức kiểm soát cần thiết

Không có câu trả lời đồng nhất cho mọi workflow — nhưng hai yếu tố giúp xác định: bước này có thể để rule xử lý tự động không, hay cần con người xác nhận trước khi thực thi?

**Khả năng đảo ngược của hành động (reversibility).** Yếu tố này không xác định AI được tham gia bao nhiêu — mà xác định rule trong workflow có đủ điều kiện xử lý tự động không, hoặc cần con người xác nhận. Hành động dễ đảo ngược (tạo bản nháp, gửi thông báo nhắc nhở, gán nhãn nội bộ) có thể để rule xử lý và định tuyến tự động mà không cần xác nhận thêm. Hành động khó hoặc không thể đảo ngược (xác nhận hợp đồng, từ chối yêu cầu của khách hàng, cập nhật hồ sơ tài chính) cần con người xác nhận trước khi thực thi — dù giai đoạn phân tích trước đó đã có AI hỗ trợ.

**Mức độ rõ ràng của dữ liệu đầu vào.** Với dữ liệu có cấu trúc và ít mơ hồ (một con số vượt ngưỡng, một trạng thái thay đổi rõ ràng), kết quả phân loại và trích xuất của AI đáng tin cậy hơn — rule có thể dựa vào kết quả đó mà không cần xác nhận thêm. Với dữ liệu phi cấu trúc, mơ hồ, hoặc phụ thuộc ngữ cảnh (email khiếu nại viết cảm tính, mô tả sự cố không theo chuẩn), nên thu hẹp phạm vi AI hỗ trợ đầu vào ở giai đoạn phân tích, và đảm bảo evidence đi kèm kết quả AI đủ để người kiểm chứng.

![Hai yếu tố chọn mức kiểm soát: khả năng đảo ngược của hành động và mức độ rõ ràng của dữ liệu; hành động dễ đảo ngược và dữ liệu rõ ràng chấp nhận mức kiểm soát thấp hơn ở giai đoạn phân tích.](~/assets/images/insights/ai-tich-hop-vao-workflow/wfi-03-two-criteria-vi-dark.svg)

Hai yếu tố này không cho ra một con số cụ thể — chúng là câu hỏi cần trả lời trước khi quyết định AI tham gia đến đâu ở từng giai đoạn.

---

## Automation complacency — rủi ro ít được nhắc đến

![Chọn mức kiểm soát không chỉ hỏi AI có làm được không, mà còn cân nhắc tác động dài hạn như ỷ lại vào tự động hóa và suy giảm kỹ năng ra quyết định.](~/assets/images/insights/ai-tich-hop-vao-workflow/wfi-05-beyond-can-ai-do-it-vi-dark.svg)

Parasuraman và cộng sự cũng chỉ ra một hệ quả ít được nhắc đến khi tăng mức tự động hóa: **automation complacency** — hiện tượng con người giảm mức giám sát khi hệ thống hoạt động tốt trong thời gian dài, dẫn đến việc bỏ qua các dấu hiệu bất thường hoặc không phát hiện kịp khi AI mắc lỗi.

Đây là lý do hai nguyên tắc thiết kế quan trọng:

**Evidence bắt buộc ở mọi đầu ra AI.** Khi AI phân loại, trích xuất, hoặc diễn giải — đầu ra phải kèm nguồn dữ liệu gốc và lý do phân loại, không chỉ kết quả. Người xem lại phải có đủ thông tin để bác bỏ nếu cần, không phải chỉ có thể chấp nhận hay từ chối mà không biết lý do.

**Giữ con người thực hành phán đoán.** Nếu AI xử lý toàn bộ giai đoạn phân tích và con người chỉ bấm "duyệt" mà không thực sự xem xét, kỹ năng ra quyết định của đội ngũ suy giảm — và khi hệ thống gặp trường hợp ngoài phạm vi huấn luyện, không ai còn đủ kỹ năng để xử lý đúng. Đây là chi phí ẩn của tự động hóa quá mức không được đặt ra trong hầu hết các cuộc thảo luận về AI.

→ *Xem thêm: [AI chuẩn bị evidence, con người quyết định](/insights/workflow/ai-chuan-bi-evidence-con-nguoi-quyet-dinh)*

---

## Khung tích hợp AI vào workflow thực tế

![Bốn bước: chia workflow theo bốn giai đoạn, đánh giá mức kiểm soát cần thiết, triển khai từng giai đoạn độc lập, và xem lại định kỳ.](~/assets/images/insights/ai-tich-hop-vao-workflow/wfi-04-four-step-framework-vi-dark.svg)

**Bước 1 — Chia nhỏ workflow theo bốn giai đoạn.** Với một quy trình cụ thể, xác định rõ đâu là giai đoạn thu thập, phân tích, quyết định, và thực thi — thay vì coi cả quy trình là một khối.

**Bước 2 — Đánh giá mức kiểm soát cần thiết cho từng giai đoạn.** Với giai đoạn 1-2: đầu vào có cấu trúc hay phi cấu trúc? AI có thể trích xuất và phân loại chính xác đủ mức không? Với giai đoạn 3-4: quyết định này thuộc rule hay con người? Hành động có thể đảo ngược không?

**Bước 3 — Triển khai từng giai đoạn độc lập, không phải toàn bộ quy trình cùng lúc.** Ví dụ — *tình huống minh họa*: bắt đầu bằng việc để AI nhận biết ý định và phân loại yêu cầu đầu vào, giữ con người ở bước quyết định trong vài tháng đầu để kiểm chứng độ chính xác của phân loại, trước khi cân nhắc mở rộng sang giai đoạn chuẩn bị evidence. Mở rộng AI có nghĩa là mở rộng phạm vi hỗ trợ đầu vào — không phải mở rộng sang quyết định tự chủ.

**Bước 4 — Thiết lập cơ chế xem lại định kỳ.** Phạm vi rule đảm nhận và phạm vi AI hỗ trợ đầu vào có thể mở rộng theo thời gian khi dữ liệu tích lũy và độ tin cậy của mô hình được kiểm chứng thực tế. Cần có điểm xem lại định kỳ — không phải cố định một lần rồi bỏ.

---

## Kết luận

Vấn đề thực sự không phải "AI có làm được bước này không" mà là "bước này thuộc giai đoạn nào, và mức kiểm soát nào phù hợp với tính chất của giai đoạn đó?"

Giai đoạn 1 và 2 (thu thập và phân tích) là nơi AI tạo ra giá trị rõ nhất — nhận biết ý định, trích xuất, phân loại có kiểm soát, diễn giải kèm evidence. Giai đoạn 3 (quyết định) thuộc về rule đã duyệt hoặc con người — AI chuẩn bị evidence, không chọn. Giai đoạn 4 (thực thi) thuộc về hệ thống workflow với thẩm quyền được xác định rõ.

Biết phần nào của AI, phần nào của rule, phần nào của con người — đó là năng lực cốt lõi của một tổ chức vận hành workflow có AI một cách có trách nhiệm.

---

*Bài viết này là một phần của chuỗi chuyên đề về workflow, ứng dụng AI và quản trị vận hành cho doanh nghiệp sản xuất SME.*

**Bài liên quan:**
- [Rule hay con người: quyết định nào nên tự động hóa trong quy trình](/insights/workflow/rule-hay-con-nguoi-quyet-dinh-trong-workflow)
- [Automation và AI hỗ trợ workflow — hai vai trò khác nhau](/insights/workflow/automation-va-ai-ho-tro-workflow)
- [Workflow tự phân loại và định tuyến theo nội dung](/insights/workflow/workflow-tu-phan-loai-dinh-tuyen)
- [AI chuẩn bị evidence, con người quyết định](/insights/workflow/ai-chuan-bi-evidence-con-nguoi-quyet-dinh)
- [Phân tách trách nhiệm khi dùng AI trong workflow](/insights/workflow/phan-tach-trach-nhiem-ai-trong-workflow)

**→ [Làm AI Readiness Assessment](/readiness/ai)**
