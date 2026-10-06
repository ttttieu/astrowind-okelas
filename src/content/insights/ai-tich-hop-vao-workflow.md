---
title: "AI làm hai việc trong workflow: diễn giải đầu vào và chuẩn bị evidence"
description: "AI không phải một lớp phán đoán mới trong workflow. Bài này dùng khung bốn giai đoạn của Parasuraman, Sheridan và Wickens (2000) để chỉ ra AI nên hỗ trợ ở đâu, và quyền quyết định thuộc về rule hay con người."
publishDate: 2026-09-23T00:00:00Z
updatedDate: 2026-10-06T00:00:00Z
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
  - "AI trong workflow"
  - "workflow"
  - "ra quyết định trong workflow"
  - "human-in-the-loop workflow"
assessmentHref: /readiness/ai
coverImage: '~/assets/images/insights/ai-tich-hop-vao-workflow/wfi-00-og-cover-vi.png'
ogImage: '~/assets/images/insights/ai-tich-hop-vao-workflow/wfi-00-og-cover-vi.png'
coverImageAlt: "Bốn giai đoạn xử lý thông tin của một workflow; AI diễn giải đầu vào và chuẩn bị evidence, còn quyền quyết định thuộc về rule hoặc con người."
draft: false
---

---

## Tóm tắt cho COO/CIO

- Câu hỏi "có nên đưa AI vào workflow không" thường được trả lời quá sớm bằng một sản phẩm cụ thể. Câu hỏi đúng hơn là: **ở mỗi giai đoạn của chuỗi xử lý thông tin, ai nắm quyền quyết định: rule, AI hay con người?**
- Parasuraman, Sheridan và Wickens (2000) chia một chuỗi xử lý thành bốn giai đoạn: thu thập thông tin, phân tích thông tin, lựa chọn quyết định, thực thi hành động. Mỗi giai đoạn có thể được hỗ trợ ở mức khác nhau.
- Trong workflow doanh nghiệp, **AI làm hai việc**: diễn giải đầu vào phi cấu trúc để rule chạy được, và chuẩn bị evidence để con người phán đoán nhanh hơn, có căn cứ hơn. AI không tạo ra một lớp phán đoán thứ ba.
- Quyền quyết định thuộc về rule (do người có thẩm quyền ban hành) hoặc con người. Hai tiêu chí giúp xác định bước nào giao cho rule, bước nào giữ con người: **khả năng đảo ngược của hành động** và **độ chắc chắn của dữ liệu đầu vào**.

---

## Mở đầu

Nhiều cuộc thảo luận về "AI trong workflow" ở cấp COO/CIO bắt đầu và kết thúc ở một câu hỏi mơ hồ: "chúng ta có nên thêm AI vào quy trình X không?" Câu hỏi này khó trả lời vì nó gộp nhiều việc rất khác nhau vào một khái niệm.

Một quy trình thật không phải một khối. Nó gồm nhiều bước nhỏ: nhận thông tin, hiểu thông tin đó nói gì, quyết định làm gì, rồi thực hiện. Ở bước nào AI nên tham gia, và tham gia để làm gì, là hai câu hỏi cần trả lời tách nhau. Bài này dùng một khung có nguồn học thuật để trả lời chúng, và đặt ranh giới rõ giữa ba bên: rule, AI và con người.

---

## Bốn giai đoạn của một chuỗi xử lý thông tin

![Mô hình bốn giai đoạn xử lý thông tin của Parasuraman, Sheridan và Wickens: thu thập, phân tích, lựa chọn quyết định và thực thi hành động.](~/assets/images/insights/ai-tich-hop-vao-workflow/wfi-01-four-stages-vi-dark.svg)

Mô hình của Parasuraman, Sheridan và Wickens (2000), công bố trên *IEEE Transactions on Systems, Man, and Cybernetics – Part A*, là một trong những khung được trích dẫn nhiều nhất về tương tác người–máy và tự động hóa. Mô hình chia một chuỗi xử lý thành bốn giai đoạn:

1. **Thu thập thông tin** (information acquisition): ghi nhận dữ liệu đầu vào từ nhiều nguồn.
2. **Phân tích thông tin** (information analysis): tổng hợp, diễn giải dữ liệu để hiểu ý nghĩa của nó.
3. **Lựa chọn quyết định** (decision and action selection): cân nhắc phương án và chọn hành động.
4. **Thực thi hành động** (action implementation): thực hiện hành động đã chọn.

Ý quan trọng nhất của mô hình: mức độ hỗ trợ bằng máy **không cần và không nên giống nhau ở cả bốn giai đoạn**. Một chuỗi có thể hỗ trợ mạnh ở khâu thu thập, hỗ trợ vừa ở khâu phân tích, và giữ khâu lựa chọn cho con người.

Trong workflow doanh nghiệp, bốn giai đoạn này đọc như sau: hệ thống ghi nhận một yêu cầu hoặc sự kiện, hệ thống hiểu yêu cầu đó, rule hoặc con người quyết định hành động, hành động được thực hiện.

---

## AI làm hai việc: diễn giải đầu vào và chuẩn bị evidence

![Hai vai trò của AI trong workflow: diễn giải đầu vào phi cấu trúc để rule chạy được, và chuẩn bị evidence cho con người phán đoán — kèm phần "Điều AI không làm".](~/assets/images/insights/ai-tich-hop-vao-workflow/wfi-02-two-ai-roles-vi-dark.svg)

Đặt AI lên bốn giai đoạn trên, vai trò của nó thu về hai việc.

### 1. Diễn giải đầu vào phi cấu trúc để rule chạy được

Rule cần đầu vào có cấu trúc: loại yêu cầu, mức ưu tiên, giá trị so với ngưỡng. Nhưng công việc thật đến dưới dạng email, tin nhắn, biểu mẫu viết tay, ảnh chứng từ. AI đọc những đầu vào này và chuyển chúng thành dạng rule hiểu được: gán loại yêu cầu, trích số liệu, nhận ra phòng ban liên quan. Việc phân loại và chuyển tiếp theo kết quả phân loại thuộc nhóm này. Khi đầu vào đã có cấu trúc, **rule** quyết định yêu cầu đi đâu, không phải AI.

Giai đoạn tương ứng: thu thập và phân tích thông tin. Rủi ro chủ yếu là diễn giải sai. Sai ở đây thường gây chậm trễ, vì người xem kết quả có thể sửa lại.

### 2. Chuẩn bị evidence để con người phán đoán

Với quyết định mới hoặc có hậu quả lớn, con người phải phán đoán. AI không thay con người ở đó. Nó làm việc đứng trước phán đoán: tìm các trường hợp tương tự trong tiền lệ, tổng hợp điều khoản và dữ liệu liên quan, nêu những điểm khác biệt đáng chú ý của ca này. Người phán đoán nhận một hồ sơ gọn thay vì phải tự lục lại từ đầu.

Hồ sơ này phải **kiểm chứng được**: mỗi ý chỉ về nguồn cụ thể để người ra quyết định mở ra đối chiếu. Hồ sơ không kèm kết luận "nên làm gì" như một mệnh lệnh.

### Điều AI không làm

- AI không quyết định thay con người ở bước lựa chọn.
- AI không tự thực hiện hành động mà không có rule được ban hành hoặc xác nhận của con người.
- AI không tự thêm hay sửa rule. Rule chỉ thay đổi qua quy trình ban hành bởi người có thẩm quyền (xem bài [Rule hay con người: quyết định nào nên tự động hóa trong quy trình](/insights/workflow/rule-hay-con-nguoi-quyet-dinh-trong-workflow)).

Một lưu ý về nhãn "AI gợi ý hành động". Nếu hệ thống chỉ ra một hành động cụ thể mà không kèm evidence để người đọc đối chiếu, trên thực tế nó đang đẩy con người về phía chấp nhận. Vì vậy, thiết kế nên cho người đọc thấy căn cứ trước khi thấy kết luận.

---

## Ranh giới: rule, AI và con người ở từng giai đoạn

![Bảng ranh giới bốn giai đoạn × ba cột: rule trong workflow, AI hỗ trợ đầu vào, con người — cho thấy AI không có quyền quyết định ở bất kỳ giai đoạn nào.](~/assets/images/insights/ai-tich-hop-vao-workflow/wfi-06-boundary-table-vi-dark.svg)

Bảng dưới đây là công cụ thảo luận để xác định ai chịu trách nhiệm ở mỗi giai đoạn. Đây là khung định hướng, không phải số liệu đo lường.

| Giai đoạn | Rule trong workflow | AI hỗ trợ đầu vào | Con người |
|---|---|---|---|
| Thu thập thông tin | Ghi nhận theo trường và quy tắc đã định | Trích xuất, diễn giải từ email, biểu mẫu, ảnh chứng từ | Chỉ khi dữ liệu mơ hồ |
| Phân tích thông tin | Áp tiêu chí và ngưỡng đã viết | Phân loại, tổng hợp evidence từ ca tương tự | Xác nhận khi rủi ro cao |
| Lựa chọn quyết định | Chỉ khi tiêu chí rõ và hậu quả sai thấp (đường mặc định) | Chuẩn bị evidence, không quyết định | Phán đoán; xác nhận bắt buộc khi hậu quả sai cao |
| Thực thi hành động | Thực hiện hành động mà rule đã cho phép | Không thực thi | Thực hiện hoặc phê duyệt hành động khó đảo ngược |

Hai điểm đáng chú ý khi đọc bảng:

- **Cột AI không có quyền quyết định ở bất kỳ hàng nào.** AI hiện diện ở hai hàng đầu để rule chạy được, và ở hàng ba để con người phán đoán có căn cứ.
- **Hành động chỉ được thực hiện tự động khi một rule cho phép.** Rule đó do người có thẩm quyền ban hành, có người chịu trách nhiệm rà soát. Không có rule cho phép thì hành động chờ con người.

---

## Hai tiêu chí xác định bước nào giao cho rule, bước nào giữ con người

![Hai tiêu chí xác định ai chịu trách nhiệm ở mỗi bước: khả năng đảo ngược của hành động và độ chắc chắn của dữ liệu đầu vào.](~/assets/images/insights/ai-tich-hop-vao-workflow/wfi-03-two-criteria-vi-dark.svg)

Không có đáp án chung cho mọi workflow. Hai tiêu chí giúp xác định từng bước.

### Khả năng đảo ngược của hành động (reversibility)

Hành động dễ đảo ngược, như gửi một thông báo nhắc việc hay tạo một bản nháp chưa gửi, có thể giao cho rule thực hiện trực tiếp, miễn là rule đã được người có thẩm quyền duyệt. AI chỉ chuẩn bị đầu vào cho rule đó.

Hành động khó hoặc không thể đảo ngược, như chuyển tiền, xác nhận hợp đồng hay từ chối yêu cầu của khách hàng, nên có con người xác nhận trước khi thực hiện.

### Độ chắc chắn của dữ liệu đầu vào

Với dữ liệu có cấu trúc, ít mơ hồ (một con số vượt ngưỡng đã định), AI diễn giải đáng tin hơn và rule chạy ổn định. Với dữ liệu phi cấu trúc hoặc cần hiểu theo ngữ cảnh (một email khiếu nại viết cảm tính), kết quả diễn giải cần được con người kiểm tra thường xuyên hơn. Quyết định vẫn thuộc về rule hoặc con người, không thuộc về AI.

### Một cảnh báo từ chính mô hình gốc

![Tự động hóa không chỉ thay thế con người mà còn thay đổi bản chất công việc của họ; automation complacency và suy giảm kỹ năng là hệ quả cần tính đến.](~/assets/images/insights/ai-tich-hop-vao-workflow/wfi-05-beyond-can-ai-do-it-vi-dark.svg)

Parasuraman và cộng sự chỉ ra rằng tự động hóa không chỉ thay thế con người mà còn thay đổi bản chất công việc của họ. Hệ quả có thể gồm ỷ lại vào tự động hóa (automation complacency) và suy giảm kỹ năng khi con người ít khi phải tự ra quyết định. Vì vậy, việc chọn mức hỗ trợ không nên chỉ dựa trên câu hỏi "AI làm được không", mà phải tính cả tác động lâu dài lên năng lực phán đoán của đội ngũ.

---

## Framework: đưa AI vào workflow theo từng bước

![Bốn bước đưa AI vào workflow: chia quy trình theo bốn giai đoạn, đánh giá khả năng đảo ngược và độ chắc chắn dữ liệu, triển khai từng giai đoạn một, rà soát định kỳ.](~/assets/images/insights/ai-tich-hop-vao-workflow/wfi-04-four-step-framework-vi-dark.svg)

**Bước 1. Chia quy trình theo bốn giai đoạn.** Xác định đâu là thu thập, phân tích, quyết định và thực thi, thay vì coi cả quy trình là một khối.

**Bước 2. Với mỗi giai đoạn, đánh giá khả năng đảo ngược và độ chắc chắn của dữ liệu để chọn ai chịu trách nhiệm.**
- Hành động dễ đảo ngược và dữ liệu rõ ràng: giao cho rule xử lý trực tiếp. AI chỉ diễn giải đầu vào nếu đầu vào phi cấu trúc.
- Hành động khó đảo ngược hoặc dữ liệu mơ hồ: AI dừng ở diễn giải hoặc chuẩn bị evidence, con người xác nhận hoặc quyết định.

**Bước 3. Triển khai từng giai đoạn một, không làm cả quy trình cùng lúc.** Ví dụ: bắt đầu bằng việc để AI diễn giải và phân loại yêu cầu đến, giữ người ở bước quyết định trong vài tháng đầu để kiểm chứng độ chính xác của việc diễn giải. Phạm vi sau đó chỉ thay đổi qua việc ban hành rule mới theo quy trình có người duyệt, không phải qua việc "nâng quyền" cho AI.

**Bước 4. Thiết lập rà soát định kỳ.** Phạm vi rule và phạm vi AI hỗ trợ cần được người phụ trách (rule owner) xem lại theo thời gian: khi ngoại lệ tăng bất thường, khi khiếu nại sau xử lý tăng, khi môi trường thay đổi. Mỗi lần thay đổi đều được ghi nhận để truy vết.

---

## Tự kiểm tra: workflow của bạn đang đặt AI ở đâu?

Nếu bạn trả lời "có" cho 3 câu trở lên, có thể ranh giới giữa rule, AI và con người trong quy trình chưa rõ.

1. Có bước nào mà kết quả của AI được dùng trực tiếp làm quyết định, không ai xem lại?
2. Có hành động khó đảo ngược nào được hệ thống thực hiện mà bạn không chỉ ra được rule nào cho phép?
3. Người xem kết quả của AI có thấy được căn cứ (nguồn, tiền lệ) trước khi thấy kết luận không? Nếu không, câu trả lời của câu này là "có".
4. Có rule nào được thay đổi mà không ghi lại ai duyệt, vì sao?
5. Nếu người phụ trách một bước nghỉ một tuần, bạn có biết quyết định ở bước đó đang đi đâu không?

---

## Kết luận

"AI trong workflow" không phải câu hỏi có hay không. Câu hỏi đúng là: ở từng giai đoạn, quyền quyết định thuộc về ai, và AI giúp được gì cho bên đó.

AI làm tốt hai việc: diễn giải đầu vào để rule chạy được, và chuẩn bị evidence để con người phán đoán nhanh hơn có căn cứ hơn. Quyền quyết định ở lại với rule do người có thẩm quyền ban hành, hoặc với chính con người. Doanh nghiệp trưởng thành không phải doanh nghiệp giao nhiều quyền cho AI, mà là doanh nghiệp biết rõ từng bước thuộc về bên nào.

---

## Nguồn

- Parasuraman, R., Sheridan, T. B., & Wickens, C. D. (2000). A model for types and levels of human interaction with automation. *IEEE Transactions on Systems, Man, and Cybernetics – Part A*, 30(3), 286–297.
- Simon, H. A. (1960). *The New Science of Management Decision*. Harper & Brothers.

## Bài liên quan

- [Rule hay con người: quyết định nào nên tự động hóa trong quy trình](/insights/workflow/rule-hay-con-nguoi-quyet-dinh-trong-workflow)
- [Từ Request → Approval sang Event → Action: khi nào hành động không cần chờ duyệt](/insights/workflow/tu-request-approval-sang-event-action)
- [Xử lý ngoại lệ trong workflow: khi quyết định không có rule sẵn](/insights/workflow/xu-ly-ngoai-le-trong-workflow)
- [Phân tách trách nhiệm khi dùng AI trong workflow](/insights/workflow/phan-tach-trach-nhiem-ai-trong-workflow)
