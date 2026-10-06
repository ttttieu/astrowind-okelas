---
title: "Workflow có cần AI agent không? Năm mức dùng AI và bốn câu hỏi để chọn mức vừa đủ"
description: "Không phải workflow nào cũng cần AI agent, và phần lớn chỉ cần rule cùng AI diễn giải đầu vào hoặc chuẩn bị evidence. Bài này đưa ra thang năm mức và bốn câu hỏi giúp COO/CIO chọn mức vừa đủ, mà quyền quyết định vẫn ở rule hoặc con người."
publishDate: 2026-10-07T00:00:00Z
translationId: article-5-19-ai-agent-workflow
lang: vi
category: workflow
contentType: Analysis
funnelStage:
  - Understanding
  - Consideration
audience:
  - COO
  - CIO
  - Operations Director
primaryKeyword: "workflow có cần AI agent"
secondaryKeywords:
  - "agentic workflow doanh nghiệp"
  - "năm mức AI workflow"
  - "AI agent vs workflow rule"
  - "chọn mức AI workflow"
  - "AI agent manufacturing SME"
assessmentHref: /readiness/digitalization
coverImage: '~/assets/images/insights/workflow-co-can-ai-agent/wfg-00-og-cover-vi.png'
ogImage: '~/assets/images/insights/workflow-co-can-ai-agent/wfg-00-og-cover-vi.png'
coverImageAlt: "Câu hỏi thường gặp 'workflow có nên thay bằng AI agent không' so với câu hỏi hữu ích 'mức AI nào vừa đủ cho quy trình này'."
draft: false
---

---

> **Tóm tắt cho COO/CIO**
>
> - "Workflow" và "agent" là hai cách tổ chức công việc khác nhau. Trong workflow, các bước và đường đi được định sẵn. Trong agent, mô hình AI tự quyết bước tiếp theo và công cụ nào sẽ dùng. Agent linh hoạt hơn, đổi lại khó dự đoán, khó kiểm thử và tốn kém hơn.
> - Trong cách tiếp cận của OKELAS, AI chỉ làm hai việc: **diễn giải đầu vào không cấu trúc để rule có thể chạy**, và **chuẩn bị evidence để con người phán đoán**. Câu hỏi "có cần agent không" vì thế không phải câu hỏi về việc ai quyết định. Quyền quyết định vẫn ở rule do người có thẩm quyền ban hành hoặc ở con người, dù có dùng agent hay không.
> - Có thể nhìn việc dùng AI trong workflow theo **năm mức**, từ chỉ dùng rule đến agent tự hành. Nên chọn **mức thấp nhất giải quyết được vấn đề**, và chỉ lên mức cao hơn khi có lý do cụ thể.
> - Bốn câu hỏi giúp chọn mức: đường đi có viết trước được không; chỗ nào đang kẹt vì đầu vào không cấu trúc; việc chuẩn bị evidence có phải đi qua những nguồn thay đổi theo từng ca không; và sai thì hậu quả ra sao, có truy vết và đảo ngược được không.
> - Với phần lớn workflow của doanh nghiệp sản xuất vừa và nhỏ, mức 1 và 2 là đủ. Mức 3, một agent hẹp chuẩn bị evidence, chỉ đáng dùng cho một số ít việc, và cần được giới hạn chặt.

---

## Mở đầu

Một giám đốc vận hành của doanh nghiệp sản xuất vừa nghe nhiều về "agentic AI" trong các hội thảo. Ông hỏi đội IT: "Quy trình xử lý đơn hàng của mình có nên thay bằng một AI agent không?"

Câu hỏi nghe hợp lý, nhưng nó gộp ba vấn đề khác nhau vào một. Quy trình nhận đơn có bước kiểm tra tồn kho, bước duyệt hạn mức công nợ, bước xác nhận với khách. Các bước này đã rõ và lặp lại hằng ngày. Cái đang gây chậm trễ là một chỗ khác: đơn hàng đến dưới dạng email, bản scan và tin nhắn, và có người phải đọc, nhập lại từng đơn. Thêm nữa, khi một đơn bị giữ vì vượt hạn mức, người duyệt mất thời gian gom lịch sử thanh toán và các đơn trước đó trước khi quyết định.

Ba vấn đề này cần ba mức dùng AI khác nhau, và không vấn đề nào trong số đó thật sự cần một agent tự quyết định đường đi. (Đây là tình huống minh họa, không phải case của một khách hàng cụ thể.)

---

## Workflow và agent khác nhau ở đâu

Cách phân biệt hữu ích nhất hiện nay đến từ cộng đồng xây dựng hệ thống AI. Anthropic, trong bài *Building effective agents* (2024), chia các hệ thống dùng mô hình ngôn ngữ thành hai nhóm: **workflow**, nơi mô hình và công cụ được điều phối theo đường đi định sẵn bằng mã; và **agent**, nơi mô hình tự định hướng quy trình và cách dùng công cụ của mình. Lời khuyên đi kèm đáng chú ý: nên bắt đầu từ giải pháp đơn giản nhất, và chỉ tăng độ phức tạp khi thật sự cần.

Với doanh nghiệp, khác biệt đó có hệ quả cụ thể:

- Trong workflow định sẵn, bạn **biết trước** các bước sẽ chạy. Kiểm thử, kiểm toán và giải trình đều dễ hơn.
- Trong agent, số bước, thứ tự bước và nguồn dữ liệu được chọn **tại thời điểm chạy**. Hai lần chạy cùng một đầu vào có thể đi hai đường khác nhau.
- Linh hoạt này có giá trị khi chưa biết trước phải làm gì. Nhưng nó cũng có nghĩa là mỗi lần chạy cần được ghi lại đầy đủ hơn mới giải trình được.

Cần nói rõ: "workflow" ở đây là cách gọi của người xây hệ thống AI. Trong bài này, workflow là chuỗi bước vận hành của doanh nghiệp, và câu hỏi là AI nên tham gia vào chuỗi đó ở mức nào.

---

## Dù dùng mức nào, quyền quyết định không đổi

Trước khi bàn các mức, cần giữ lại một nguyên tắc nền: AI trong workflow làm hai việc, và chỉ hai việc.

1. **Diễn giải đầu vào không cấu trúc** (email, bản scan, ghi chú, ảnh) thành dạng rule có thể đọc.
2. **Chuẩn bị evidence** để người có thẩm quyền xem và phán đoán.

Quyết định thuộc về rule do người có thẩm quyền ban hành, hoặc thuộc về con người. Hành động chỉ tự chạy khi một rule cho phép. Rule chỉ thay đổi khi người có thẩm quyền ban hành từ tiền lệ đã được xác nhận. Nguyên tắc này đã được trình bày ở các bài [AI làm hai việc trong workflow](/insights/workflow/ai-tich-hop-vao-workflow) và [phân tách trách nhiệm cho AI trong workflow](/insights/workflow/phan-tach-trach-nhiem-ai-trong-workflow).

Hệ quả cho bài này: **agent, nếu có dùng, cũng chỉ là một cách tổ chức công việc diễn giải và chuẩn bị evidence.** Nó không được cấp thêm quyền quyết định chỉ vì nó "tự chủ" hơn. Điều agent thay đổi là mức biến thiên trong cách việc được làm, không phải ai chịu trách nhiệm về kết quả.

---

## Năm mức dùng AI trong một workflow

![Thang năm mức dùng AI trong workflow: từ chỉ dùng rule đến agent tự hành; nên chọn mức thấp nhất giải quyết được vấn đề.](~/assets/images/insights/workflow-co-can-ai-agent/wfg-01-five-levels-vi-dark.svg)

| Mức | Cách dùng AI | Đường đi | Ví dụ |
|---|---|---|---|
| 0 | Không dùng AI, chỉ rule | Định sẵn | Đơn dưới hạn mức và đủ thông tin thì chuyển bước tiếp |
| 1 | AI diễn giải đầu vào ở một bước, rule chạy tiếp | Định sẵn | Đọc email đặt hàng, điền các trường đơn hàng, rule kiểm tra |
| 2 | AI chuẩn bị evidence theo một quy trình cố định | Định sẵn | Với đơn bị giữ, luôn lấy lịch sử thanh toán và đơn tương tự, rồi trình người duyệt |
| 3 | Agent hẹp: tự chọn nguồn và thứ tự tra cứu để chuẩn bị evidence | Do AI chọn trong phạm vi cho phép | Hồ sơ khiếu nại chất lượng cần gom dữ liệu từ nhiều nguồn khác nhau tùy ca |
| 4 | Agent tự hành thực thi hành động | Do AI chọn | Không khuyến nghị trong workflow vận hành có rủi ro |

Mức 4 nằm trong bảng để làm rõ ranh giới, không phải để khuyến nghị. Một agent tự tạo hành động vi phạm nguyên tắc rằng hành động chỉ chạy khi rule cho phép. Nếu cần tự động hóa hành động, hãy đưa nó vào rule do người có thẩm quyền ban hành, và để AI ở mức diễn giải hoặc chuẩn bị evidence.

Đây là khung định hướng để thảo luận, không phải phân loại chuẩn của ngành. Điều quan trọng là mỗi mức **bỏ thêm một phần kiểm soát được định sẵn**, nên cần có lý do cụ thể để lên mức.

---

## Bốn câu hỏi để chọn mức vừa đủ

![Bốn câu hỏi chọn mức AI; điều kiện để xét mức 3: trả lời không cho câu 1, có cho câu 3, và câu 4 chấp nhận được.](~/assets/images/insights/workflow-co-can-ai-agent/wfg-02-four-questions-vi-dark.svg)

**1. Các bước có thể viết trước được không?**
Nếu bạn viết được "gặp tình huống X thì làm A, rồi B, rồi C", đó là việc của workflow định sẵn. Chỉ khi các bước **thực sự phụ thuộc vào những gì tìm thấy ở bước trước**, theo cách không liệt kê trước được, mới có chỗ cho agent. Nhiều quy trình tưởng là "quá đa dạng" khi chưa được mô tả, nhưng sau khi viết ra thì thấy chỉ có vài nhánh.

**2. Chỗ kẹt nằm ở đầu vào không cấu trúc không?**
Nếu việc bị chậm vì phải đọc và nhập lại thông tin từ email, bản scan, phiếu viết tay, thì AI diễn giải (mức 1) thường đã giải quyết được phần lớn. Đầu vào sau khi được diễn giải đi vào rule như bình thường. Không cần agent.

**3. Việc chuẩn bị evidence có phải đi qua những nguồn thay đổi theo từng ca không?**
Nếu với mọi ca bạn đều lấy cùng một nhóm thông tin (mức 2), cố định hóa quy trình chuẩn bị là đủ và dễ kiểm tra. Nếu với mỗi ca, nguồn nào cần tra lại phụ thuộc vào những gì vừa tìm thấy, ví dụ hồ sơ khiếu nại chất lượng có thể cần tra lô nguyên liệu, rồi nhà cung cấp, rồi các lô tương tự, thì mới đáng cân nhắc agent hẹp (mức 3).

**4. Sai thì hậu quả ra sao, có truy vết và đảo ngược được không?**
Agent đổi sự dự đoán được lấy sự linh hoạt. Điều này chấp nhận được khi kết quả của agent là một bộ hồ sơ để người xem lại, và sai thì người sẽ phát hiện. Nó không chấp nhận được khi kết quả đi thẳng vào hành động có hậu quả mà không qua rà soát. Cũng cần hỏi: mỗi lần chạy có để lại dấu vết đủ để giải trình với đánh giá viên ISO/GMP không?

Quy tắc ngắn gọn: **trả lời "không" cho câu 1 và "có" cho câu 3, mà câu 4 chấp nhận được, thì mới đáng xem xét mức 3.** Các trường hợp còn lại, mức thấp hơn thường đủ.

---

## Cái giá của việc lên mức cao hơn

Agent không miễn phí về mặt vận hành. Những chi phí thường bị bỏ qua:

- **Khó kiểm thử.** Với đường đi định sẵn, bạn thử từng nhánh. Với agent, số đường đi có thể xảy ra lớn hơn nhiều, nên cần bộ ca thử rộng hơn và giám sát liên tục.
- **Khó giải trình.** Phải ghi lại không chỉ kết quả mà cả các bước agent đã chọn, nguồn nào đã tra, vì sao dừng.
- **Chi phí biến thiên.** Số lần gọi mô hình thay đổi theo từng ca, khiến chi phí và độ trễ khó dự toán. Với SME, điều này quan trọng vì bài toán price/performance.
- **Rủi ro quyền hạn.** Agent càng được dùng nhiều công cụ, quyền cấp cho nó càng rộng, bề mặt rủi ro càng lớn.

Tín hiệu từ thị trường cũng đáng lưu ý. Tháng 6 năm 2025, Gartner dự báo rằng hơn 40% dự án agentic AI sẽ bị hủy trước cuối năm 2027, với các lý do được nêu là chi phí tăng, giá trị kinh doanh chưa rõ và kiểm soát rủi ro chưa đủ. Đây là dự báo, không phải số đo, nhưng nó phù hợp với điều bài này muốn nói: giá trị đến từ việc chọn đúng mức, không phải từ việc có agent.

---

## Ba ví dụ minh họa

![Ba quy trình minh họa ứng với ba mức khác nhau: duyệt đơn hàng (mức 0), nhận đơn qua email (mức 1 + 2), khiếu nại chất lượng (mức 3 có giới hạn).](~/assets/images/insights/workflow-co-can-ai-agent/wfg-03-three-examples-vi-dark.svg)

Dưới đây là các tình huống minh họa, không phải case khách hàng.

**Duyệt đơn mua hàng theo hạn mức.** Các bước rõ, ngưỡng do người có thẩm quyền ban hành, thông tin đã có cấu trúc trong hệ thống. Chọn **mức 0**. Thêm AI vào chỉ làm quy trình khó kiểm tra hơn mà không thêm giá trị.

**Nhận đơn hàng qua email và bản scan.** Chỗ kẹt là đọc và nhập lại. Chọn **mức 1**: AI diễn giải email thành các trường đơn hàng, kèm độ chắc chắn. Trường nào AI không chắc thì chuyển cho người xác nhận. Rule kiểm tra và chạy tiếp như cũ. Nếu đơn bị giữ vì vượt hạn mức và luôn cần cùng một nhóm thông tin (lịch sử thanh toán, đơn mở, ghi chú từ kinh doanh), thêm **mức 2** để chuẩn bị sẵn bộ hồ sơ cho người duyệt.

**Khiếu nại chất lượng từ khách hàng.** Mỗi ca khác nhau: có ca phải tra lô nguyên liệu, có ca phải xem lịch bảo trì máy, có ca phải đối chiếu với khiếu nại cũ. Việc tra cứu tiếp theo phụ thuộc vào những gì vừa tìm thấy. Đây là chỗ **mức 3** có thể đáng cân nhắc. Agent chỉ có quyền đọc, có giới hạn số bước và nguồn được phép truy cập, ghi lại mọi tra cứu, và kết quả là bộ hồ sơ cho người phụ trách chất lượng quyết định. Agent không kết luận nguyên nhân gốc, không tự khởi tạo CAPA.

Trong ba tình huống, chỉ một có chỗ cho agent, và agent vẫn chỉ làm việc chuẩn bị evidence.

---

## Nếu dùng agent, giới hạn nó như thế nào

![Sáu giới hạn khi dùng agent hẹp: chỉ đọc, allowlist nguồn, số bước tối đa, điểm dừng, đầu ra có cấu trúc, dấu vết đầy đủ.](~/assets/images/insights/workflow-co-can-ai-agent/wfg-04-agent-limits-vi-dark.svg)

Khi một bước thật sự đáng dùng agent hẹp, có thể áp dụng các giới hạn sau, phù hợp với cách quản trị AI participant ở bài [giao việc cho AI theo từng bước workflow](/insights/workflow/giao-viec-cho-ai-theo-buoc-workflow):

- **Chỉ đọc** trong phạm vi nhiệm vụ. Không ghi, không gửi, không phê duyệt.
- **Danh sách nguồn được phép** và **số bước tối đa** cho mỗi ca.
- **Điểm dừng rõ ràng:** gặp ca không chắc chắn, thiếu thông tin hoặc ngoài phạm vi thì chuyển cho người.
- **Đầu ra có cấu trúc:** nguồn đã tra, điều tìm thấy, điều không tìm thấy, độ chắc chắn.
- **Dấu vết đầy đủ:** mỗi lần chạy ghi lại các bước đã đi, để giải trình được.
- **Người chịu trách nhiệm** rà soát định kỳ chất lượng hồ sơ do agent tạo ra.

Các giới hạn này không phải để làm agent kém đi, mà để biến một thành phần biến thiên thành một thành phần quản trị được.

---

## Nên bắt đầu từ đâu

1. **Liệt kê những chỗ workflow đang chậm**, và với mỗi chỗ, ghi nguyên nhân: đọc lại đầu vào, gom thông tin, hay chờ phán đoán.
2. **Thử viết các bước ra giấy** cho một quy trình. Nhiều quy trình hóa ra chỉ cần rule.
3. **Bắt đầu ở mức 1 hoặc 2** cho chỗ có nhu cầu rõ nhất, và đo: thời gian xử lý, tỷ lệ ca phải chuyển cho người, tỷ lệ kết quả bị sửa.
4. **Chỉ cân nhắc mức 3** khi câu hỏi số 1 và 3 ở trên thực sự chỉ về hướng đó, và đã có đủ dấu vết để giải trình.
5. **Không cấp quyền thực thi** cho agent. Nếu muốn tự động hóa hành động, hãy đi qua rule do người có thẩm quyền ban hành.

---

## Tự kiểm tra

1. Quy trình này có viết trước được các bước không? Bạn đã thử viết chưa?
2. Cái làm chậm quy trình là đầu vào không cấu trúc, việc gom thông tin, hay chờ phán đoán?
3. Với mọi ca, nhóm thông tin cần gom có giống nhau không?
4. Nếu agent sai, ai sẽ phát hiện, ở bước nào?
5. Mỗi lần chạy có để lại dấu vết đủ để giải trình với đánh giá viên không?
6. Agent có đang được cấp quyền ghi hoặc thực thi không? Nếu có, vì sao?

Nếu có từ hai câu bạn khó trả lời, nên dừng ở mức thấp hơn cho đến khi các câu này rõ ràng.

---

## Kết luận

Câu hỏi "workflow có cần AI agent không" thường có câu trả lời là: **chưa chắc, và thường là chưa cần**. Phần lớn giá trị của AI trong workflow đến từ hai việc — diễn giải đầu vào để rule chạy được và chuẩn bị evidence để con người phán đoán — và hai việc đó thường làm được bằng các mức đơn giản và kiểm soát được. Agent có chỗ của nó khi việc chuẩn bị evidence thực sự phụ thuộc vào những gì tìm thấy từng bước, nhưng ngay cả khi đó, quyền quyết định vẫn không đổi.

Chọn mức vừa đủ là cách để có giá trị của AI mà không trả giá bằng khả năng kiểm thử, giải trình và kiểm soát chi phí.

Digitalization Readiness Assessment của OKELAS giúp xác định quy trình nào của bạn đã đủ rõ để bắt đầu từ mức đơn giản, trước khi nghĩ đến agent.

---

## Nguồn

- Anthropic (2024). *Building effective agents*. Phân biệt workflow (đường đi định sẵn) và agent (mô hình tự định hướng), khuyến nghị bắt đầu từ giải pháp đơn giản nhất.
- Gartner (2025, tháng 6). Dự báo hơn 40% dự án agentic AI sẽ bị hủy trước cuối năm 2027 (thông cáo báo chí). Đây là dự báo của Gartner, không phải số liệu đo.
- Parasuraman, R., Sheridan, T. B., & Wickens, C. D. (2000). A model for types and levels of human interaction with automation. *IEEE Transactions on Systems, Man, and Cybernetics – Part A*, 30(3), 286–297.

## Bài liên quan

- [Giao việc cho AI theo từng bước workflow: nhìn ở cấp hoạt động, quản trị như một participant](/insights/workflow/giao-viec-cho-ai-theo-buoc-workflow)
- [Phân tách trách nhiệm cho AI trong workflow: ai diễn giải, ai quyết định, ai thực thi, ai ghi nhận](/insights/workflow/phan-tach-trach-nhiem-ai-trong-workflow)
- [Automation và AI hỗ trợ workflow: hai việc khác nhau, không phải hai nấc thang](/insights/workflow/automation-va-ai-ho-tro-workflow)
- [AI làm hai việc trong workflow: diễn giải đầu vào và chuẩn bị evidence](/insights/workflow/ai-tich-hop-vao-workflow)
