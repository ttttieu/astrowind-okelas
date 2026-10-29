---
title: "Xử lý ngoại lệ trong workflow: khi quyết định không có rule sẵn"
description: "Ngoại lệ không phải bất thường cần che đi, mà là nơi tri thức vận hành được tạo ra. Bài này phân tích cách doanh nghiệp thường xử lý ngoại lệ, cái giá phải trả, và một đường ngoại lệ được thiết kế: chuyển đúng người, kèm evidence, ghi lại quyết định, rồi mới thành tiền lệ."
publishDate: 2026-10-06T00:00:00Z
translationId: article-5-11-exception-handling-workflow
lang: vi
category: workflow
contentType: Analysis
funnelStage:
  - Understanding
audience:
  - COO
  - CIO
  - Operations Director
primaryKeyword: "xử lý ngoại lệ trong workflow"
secondaryKeywords:
  - "exception workflow design"
  - "xử lý ngoại lệ quy trình"
  - "tiền lệ workflow"
  - "evidence trong workflow"
  - "workflow ngoại lệ"
assessmentHref: /readiness/workflow
coverImage: '~/assets/images/insights/xu-ly-ngoai-le-trong-workflow/wfx-00-og-cover-vi.png'
ogImage: '~/assets/images/insights/xu-ly-ngoai-le-trong-workflow/wfx-00-og-cover-vi.png'
coverImageAlt: "Ngoại lệ xử lý tắt qua Zalo hoặc email không để lại evidence; đường ngoại lệ được thiết kế chuyển ca tới người có thẩm quyền kèm evidence, ghi lại quyết định và tích lũy thành tiền lệ."
ctaPrimaryText: 'Workflow Readiness Assessment'
ctaSubtitle: 'Workflow của bạn đang vận hành như thế nào?'
draft: false
---

---

> **Tóm tắt cho COO/CIO**
>
> - Mọi bộ rule đều có phần nó không phủ tới. Ca nằm ngoài rule là **ngoại lệ**, và nó xảy ra thường xuyên hơn người ta thừa nhận. Câu hỏi quan trọng không phải "làm sao để không có ngoại lệ" mà là **ngoại lệ đi đâu khi nó xảy ra**.
> - Cách xử lý phổ biến là xử lý tắt qua Zalo, email, điện thoại, hoặc cho qua. Quyết định vẫn được đưa ra, nhưng **không để lại evidence**, nên không ai học được gì từ nó.
> - Một đường ngoại lệ được thiết kế gồm năm việc: nhận diện, chuyển đúng người có thẩm quyền, chuẩn bị evidence, con người quyết định và ghi lý do, rồi tích lũy thành tiền lệ.
> - AI hỗ trợ ở khâu chuẩn bị (diễn giải đầu vào, tìm ca tương tự). **Phán đoán ngoại lệ thuộc về con người.** Ngoại lệ chỉ thành rule khi người có thẩm quyền xem xét và ban hành.

---

## Mở đầu

Một khách hàng lâu năm đặt gấp một đơn với thay đổi nhỏ về thông số. Quy trình không có đường cho trường hợp này. Trưởng bộ phận kế hoạch nhắn Zalo hỏi trưởng QC. QC trả lời "được, lô này cho qua". Đơn được giao đúng hạn. Sáu tháng sau, khách hàng khiếu nại hoặc đoàn đánh giá hỏi vì sao lô đó được chấp nhận. Zalo đã trôi, người quyết định đã chuyển bộ phận, không ai nhớ lý do.

(Đây là tình huống minh họa, không phải case của khách hàng cụ thể.)

Quyết định lúc đó có thể hoàn toàn đúng. Vấn đề nằm ở chỗ nó **không thuộc về tổ chức**. Nó chỉ nằm trong một đoạn chat và trí nhớ của hai người. Bài này phân tích vì sao ngoại lệ là nơi tri thức vận hành dễ mất nhất, và cách thiết kế một đường xử lý để nó trở thành tài sản thay vì rủi ro.

---

## Ngoại lệ là một phần của vận hành, không phải sai sót

Các nghiên cứu về công việc văn phòng từ rất sớm đã chỉ ra rằng quy trình viết sẵn là một nguồn tham chiếu, không phải bản mô tả đầy đủ về cách công việc được làm. Suchman (1983) mô tả quy trình như một nguồn lực mà người làm việc diễn giải theo tình huống. Strong và Miller (1995) phân tích ngoại lệ trong các quy trình thông tin có máy tính hỗ trợ, và cho thấy ngoại lệ là hiện tượng thường trực, cần được quản lý có chủ đích.

Nhìn qua khung của Herbert Simon (1960), ngoại lệ chính là **quyết định không thể lập trình** xuất hiện giữa một quy trình được thiết kế cho quyết định có thể lập trình: mới, chưa có tiêu chí rõ, cần phán đoán. Chi tiết về dải liên tục này xem bài [Rule hay con người: quyết định nào nên tự động hóa trong quy trình](/insights/workflow/rule-hay-con-nguoi-quyet-dinh-trong-workflow).

Hệ quả: một workflow trưởng thành không phải workflow không có ngoại lệ. Đó là workflow **biết ngoại lệ đi đâu**.

---

## Ba cách ngoại lệ thường được xử lý, và cái giá

![Ba cách ngoại lệ thường được xử lý: xử lý tắt qua Zalo/email, cho qua, hoặc đẩy hết lên trên — và cái giá của mỗi cách.](~/assets/images/insights/xu-ly-ngoai-le-trong-workflow/wfx-01-three-ways-vi-dark.svg)

Bảng dưới đây là phân tích của OKELAS dựa trên các mô hình vận hành thường gặp, không phải số liệu khảo sát.

| Cách xử lý | Biểu hiện | Cái giá |
|---|---|---|
| **Xử lý tắt** | Hỏi qua Zalo, email, điện thoại; người có thẩm quyền trả lời miệng hoặc nhắn tin | Quyết định không để lại evidence có thể truy vết; người sau không biết lý do |
| **Cho qua** | Người làm tự quyết để việc không bị dừng, không báo ai | Tiêu chuẩn lệch dần giữa các ca và giữa các người; rủi ro dồn về người làm |
| **Đẩy hết lên trên** | Mọi thứ không khớp rule đều chuyển lên cấp cao nhất | Người có thẩm quyền thành nút thắt; ca đơn giản và ca khó chờ như nhau |

Ba cách này có chung một điểm: **quyết định vẫn được đưa ra, nhưng tổ chức không học được gì từ nó**. Cùng một tình huống xuất hiện lần sau, người xử lý bắt đầu lại từ đầu, và có thể quyết định khác lần trước.

---

## Một đường ngoại lệ được thiết kế

![Đường ngoại lệ được thiết kế: nhận diện, chuyển đúng người, chuẩn bị evidence, con người quyết định và ghi lý do, tích lũy thành tiền lệ.](~/assets/images/insights/xu-ly-ngoai-le-trong-workflow/wfx-02-exception-path-vi-dark.svg)

Thay vì để ngoại lệ tự tìm đường, workflow có thể có một đường riêng với năm việc.

**1. Nhận diện.** Hệ thống phát hiện ca không khớp rule nào: vượt ngưỡng, ngoài tiền lệ đã xác nhận, hoặc thiếu thông tin để áp rule. Việc nhận diện dựa trên điều kiện viết rõ, không dựa vào việc ai đó nhớ ra.

**2. Chuyển đúng người có thẩm quyền.** Mỗi loại ngoại lệ có người chịu trách nhiệm quyết định được chỉ định sẵn, kèm người thay thế khi vắng. Không phải mọi ngoại lệ đều lên cấp cao nhất.

**3. Chuẩn bị evidence.** Người quyết định nhận một hồ sơ gọn: ca này khác rule ở đâu, dữ liệu liên quan, các ca tương tự trong quá khứ và kết quả của chúng. Mục đích là để phán đoán nhanh hơn, có căn cứ hơn.

**4. Con người quyết định và ghi lý do.** Người có thẩm quyền quyết định. Hệ thống ghi lại quyết định, lý do và người quyết định như một phần của hồ sơ ca.

**5. Tích lũy thành tiền lệ.** Quyết định được lưu như evidence có thể truy vết, để ca tương tự sau này có chỗ dựa.

Điểm then chốt: bước 4 không bị bỏ qua và không bị tự động hóa. Đường ngoại lệ giảm công sức cho người quyết định, không thay thế họ.

---

## Ghi gì khi xử lý một ngoại lệ

![Bộ tối thiểu để ghi lại một ngoại lệ: tình huống, điểm không khớp, evidence đã xem, quyết định, người quyết định, lý do, và khả năng đảo ngược.](~/assets/images/insights/xu-ly-ngoai-le-trong-workflow/wfx-03-minimum-record-vi-dark.svg)

Hồ sơ ngoại lệ không cần dài. Bộ tối thiểu sau đủ để một người khác, sáu tháng sau, hiểu được điều đã xảy ra.

| Ghi lại | Câu hỏi nó trả lời |
|---|---|
| Tình huống | Ca này là gì, xảy ra khi nào |
| Điểm không khớp | Rule hoặc tiêu chí nào không áp dụng được, và vì sao |
| Evidence đã xem | Người quyết định căn cứ vào dữ liệu và ca tương tự nào |
| Quyết định | Đã chọn làm gì |
| Người quyết định | Ai có thẩm quyền, tại thời điểm nào |
| Lý do | Vì sao chọn như vậy thay vì phương án khác |
| Khả năng đảo ngược | Quyết định này sửa lại được không, nếu sai |

Trong ví dụ mở đầu, nếu quyết định "cho lô này qua" đi qua đường này, sáu tháng sau câu hỏi của đoàn đánh giá có câu trả lời trong hồ sơ, không phải trong trí nhớ.

---

## Từ ngoại lệ đến rule: khi nào và bằng cách nào

![Từ ngoại lệ đến rule: ngoại lệ lặp lại → nhận diện mẫu hình → con người duyệt và ban hành → rule mới vào workflow.](~/assets/images/insights/xu-ly-ngoai-le-trong-workflow/wfx-04-exception-to-rule-vi-dark.svg)

Ngoại lệ lặp lại với cách xử lý nhất quán là tín hiệu rằng một quyết định đang dịch dần về phía có thể lập trình. Cơ chế đúng, như bài 10 mô tả, gồm bốn bước: ghi nhận ngoại lệ, nhận diện mẫu hình, **con người duyệt và ban hành**, rồi rule mới vào workflow.

Hai lưu ý quan trọng:

- Đề xuất "có thể thành rule" không tự trở thành rule. Người có thẩm quyền xem xét, chỉnh sửa và ban hành. Phạm vi xử lý bằng rule mở rộng nhờ tiền lệ được xác nhận, không nhờ giao thêm quyền cho hệ thống.
- Bản thân số lượng ngoại lệ là một tín hiệu. Khi ngoại lệ của một loại tăng bất thường, rule hiện hành có thể đã lỗi thời. Đây là việc của chủ sở hữu rule (rule owner) khi rà soát định kỳ.

Chiều ngược lại cũng đúng: nếu ngoại lệ không được ghi lại, tổ chức không có dữ liệu để biết rule nào cần sửa. Rule cũ cứ tích lũy trong khi thực tế đã đổi.

---

## Vai trò của AI trong đường ngoại lệ

AI có ích ở hai chỗ, đúng như hai việc đã nêu trong bài [AI làm hai việc trong workflow](/insights/workflow/ai-tich-hop-vao-workflow).

- **Diễn giải đầu vào.** Ngoại lệ thường đến dưới dạng không cấu trúc: một email khiếu nại, một tin nhắn, một ảnh chứng từ. AI đọc và chuyển thành thông tin có cấu trúc để hệ thống nhận diện ca và chuyển đúng người.
- **Chuẩn bị evidence.** AI tìm các ca tương tự, tổng hợp điều khoản và dữ liệu liên quan, và chỉ rõ nguồn để người quyết định kiểm chứng.

AI không quyết định ngoại lệ, không tự đánh dấu một ca là "được chấp nhận", và không tự biến một ngoại lệ thành rule. Lý do không chỉ là nguyên tắc: ngoại lệ là loại quyết định mà tiêu chí chưa rõ, nên cần người có thẩm quyền chịu trách nhiệm về kết quả.

---

## Những sai lầm thường gặp khi thiết kế đường ngoại lệ

- **Coi ngoại lệ là lỗi cần giảm về không.** Mục tiêu hợp lý là ngoại lệ được xử lý có kiểm soát, không phải không có ngoại lệ.
- **Không chỉ định người quyết định theo loại ca.** Mọi thứ rơi vào một hộp thư chung và thành nút thắt.
- **Ghi quá nhiều.** Biểu mẫu dài khiến người làm bỏ qua và quay lại xử lý tắt. Bộ tối thiểu ở trên đủ để bắt đầu.
- **Bỏ bước con người ban hành rule.** Tự động hóa việc biến ngoại lệ thành rule làm mất chính điều khiến rule đáng tin: có người đứng tên.

---

## Tự kiểm tra: ngoại lệ trong doanh nghiệp bạn đang đi đâu?

Chọn một quy trình quan trọng và trả lời:

1. Khi một ca không khớp rule, người làm biết chính xác phải chuyển cho ai không?
2. Trong 5 ngoại lệ gần nhất, bạn có tìm lại được quyết định, người quyết định và lý do không, hay phải hỏi miệng?
3. Có quyết định nào đang nằm chủ yếu trong Zalo, email cá nhân hoặc trí nhớ của một người?
4. Cùng một loại tình huống, hai người khác nhau có đưa ra hai quyết định khác nhau không?
5. Khi người phụ trách nghỉ một tuần, ngoại lệ đang đi đâu?
6. Có ai chịu trách nhiệm xem xét ngoại lệ lặp lại để đề xuất rule mới không?

Nếu từ ba câu trở lên khiến bạn do dự, tri thức xử lý ngoại lệ đang nằm ngoài tổ chức. Knowledge Management Maturity Assessment của OKELAS giúp xác định mức độ ghi nhận tri thức vận hành trong doanh nghiệp bạn.

---

## Kết luận

Ngoại lệ không phải thứ cần giấu hay giảm về không. Đó là nơi doanh nghiệp gặp tình huống mà rule chưa nghĩ tới, và nơi tri thức vận hành thực sự được tạo ra. Doanh nghiệp xử lý ngoại lệ qua Zalo vẫn ra quyết định tốt, nhưng tri thức đó ra đi cùng người quyết định.

Một đường ngoại lệ được thiết kế làm ba việc: chuyển đúng người, giúp họ quyết định có căn cứ, và giữ lại quyết định như evidence. Con người vẫn phán đoán. Điều thay đổi là phán đoán đó không còn biến mất.

---

## Nguồn

- Suchman, L. (1983). Office procedure as practical action: models of work and system design. *ACM Transactions on Office Information Systems*, 1(4), 320–328.
- Strong, D. M., & Miller, S. M. (1995). Exceptions and exception handling in computerized information processes. *ACM Transactions on Information Systems*, 13(2), 206–233.
- Simon, H. A. (1960). *The New Science of Management Decision*. Harper & Brothers.

## Bài liên quan

- [Rule hay con người: quyết định nào nên tự động hóa trong quy trình](/insights/workflow/rule-hay-con-nguoi-quyet-dinh-trong-workflow)
- [Từ Request → Approval sang Event → Action: khi nào hành động không cần chờ duyệt](/insights/workflow/tu-request-approval-sang-event-action)
- [AI làm hai việc trong workflow: diễn giải đầu vào và chuẩn bị evidence](/insights/workflow/ai-tich-hop-vao-workflow)
- [Phân tách trách nhiệm khi dùng AI trong workflow](/insights/workflow/phan-tach-trach-nhiem-ai-trong-workflow)
