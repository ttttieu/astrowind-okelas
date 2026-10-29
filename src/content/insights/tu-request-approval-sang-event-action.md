---
title: "Từ Request → Approval sang Event → Action: khi nào hành động không cần chờ duyệt"
description: "Phần lớn độ trễ chờ duyệt đến từ những quyết định đơn giản, lặp lại phải đi qua quy trình dành cho quyết định phức tạp. Event → Action chuyển phê duyệt từ từng ca sang cấp rule: người có thẩm quyền quyết định trước, sự kiện chỉ kích hoạt rule đã được duyệt."
publishDate: 2026-09-23T00:00:00Z
updatedDate: 2026-10-06T00:00:00Z
translationId: article-5-9-request-approval-to-event-action
lang: vi
category: workflow
contentType: Analysis
funnelStage:
  - Understanding
audience:
  - COO
  - CIO
  - Operations Director
primaryKeyword: "event-driven workflow phê duyệt"
secondaryKeywords:
  - "request approval workflow"
  - "phê duyệt theo ngưỡng"
  - "event-driven workflow"
  - "rule workflow"
  - "tự động hóa quy trình phê duyệt"
assessmentHref: /readiness/workflow
coverImage: '~/assets/images/insights/tu-request-approval-sang-event-action/wfr-00-og-cover-vi.png'
ogImage: '~/assets/images/insights/tu-request-approval-sang-event-action/wfr-00-og-cover-vi.png'
coverImageAlt: "Request → Approval có bước chờ duyệt ở giữa mỗi ca; Event → Action dùng rule do người có thẩm quyền ban hành trước để hành động đúng lúc, và chuyển ca ngoài rule cho con người phán đoán."
ctaPrimaryText: 'Workflow Readiness Assessment'
ctaSubtitle: 'Workflow của bạn đang vận hành như thế nào?'
draft: false
---

---

## Tóm tắt cho COO/CIO

- Mô hình phổ biến hiện nay là **Request → Approval**: ai đó gửi yêu cầu, chờ một chuỗi người ký duyệt, rồi hành động mới diễn ra. Độ trễ của nó thường không đến từ những quyết định khó, mà từ việc **quyết định đơn giản, lặp lại vẫn đi qua đường dành cho quyết định phức tạp**.
- **Event → Action không bỏ phê duyệt.** Nó chuyển phê duyệt lên trước và lên cấp cao hơn: người có thẩm quyền quyết định **một lần, ở cấp rule**, cho cả nhóm ca có tiêu chí rõ. Sự kiện chỉ kích hoạt rule đã được duyệt. Hệ thống không tự quyết định.
- Ca nằm ngoài phạm vi rule vẫn chuyển tới người có thẩm quyền, kèm đầy đủ ngữ cảnh và evidence. Phán đoán vẫn thuộc về con người.
- Điều kiện để chuyển: đủ tiền lệ, rule do người có thẩm quyền ban hành và có chủ sở hữu, mỗi lần chạy đều để lại evidence, và có rà soát sau.

---

## Mở đầu

Một đơn đặt nguyên liệu lặp lại hàng tháng, đúng nhà cung cấp quen, trong hạn mức đã duyệt. Nó vẫn nằm trong hộp thư của trưởng bộ phận ba ngày vì ông ấy đi công tác. Không ai nghi ngờ đơn hàng này. Nó chờ vì quy trình yêu cầu một chữ ký.

Nếu tình huống này quen thuộc, vấn đề có thể không nằm ở người duyệt hay ở phần mềm, mà ở thiết kế: phê duyệt được đặt như bước mặc định cho mọi trường hợp. Bài này phân tích vì sao điều đó tạo độ trễ, mô hình Event → Action thay đổi điều gì, và những điều kiện để chuyển mà không đánh mất kiểm soát.

---

## Vì sao Request → Approval tạo độ trễ

Có ba lý do thường gặp.

1. **Phê duyệt là bước mặc định, không phải bước có điều kiện.** Nhiều quy trình yêu cầu duyệt cho mọi trường hợp, kể cả trường hợp lặp lại và giá trị thấp.
2. **Thời gian chờ phụ thuộc lịch của người duyệt, không phụ thuộc mức khẩn cấp của yêu cầu.**
3. **Phê duyệt thường không phân biệt rủi ro.** Một yêu cầu 500.000 đồng và một yêu cầu 500 triệu đồng có thể đi qua cùng một chuỗi duyệt.

![Ba lý do Request → Approval tạo độ trễ: phê duyệt là bước mặc định, thời gian chờ phụ thuộc lịch người duyệt, không phân biệt rủi ro.](~/assets/images/insights/tu-request-approval-sang-event-action/wfr-02-why-approval-creates-latency-vi-dark.svg)

Lean đo hiện tượng này bằng chỉ số **Process Cycle Efficiency (PCE)**: thời gian thực sự tạo giá trị chia cho tổng thời gian chạy của quy trình (George, 2002). Với quy trình nghiệp vụ có nhiều bước chờ, chỉ số này thường thấp. Mức cụ thể khác nhau rất nhiều giữa các doanh nghiệp và các quy trình, nên cách đáng tin nhất là đo chính quy trình của bạn: từ lúc yêu cầu phát sinh đến lúc hành động diễn ra, bao nhiêu thời gian là chờ duyệt?

---

## Gốc rễ: quyết định có thể lập trình đang đi trên đường của quyết định không thể lập trình

Herbert Simon (1960) phân biệt hai loại quyết định: **quyết định có thể lập trình** (lặp lại, tiêu chí rõ) và **quyết định không thể lập trình** (mới, phức tạp, cần phán đoán). Hai loại này nằm trên một dải liên tục. Chi tiết xem bài [Rule hay con người: quyết định nào nên tự động hóa trong quy trình](/insights/workflow/rule-hay-con-nguoi-quyet-dinh-trong-workflow).

Request → Approval đối xử với mọi quyết định như loại thứ hai. Mỗi ca, dù đã lặp lại hàng trăm lần với cùng một kết quả, vẫn đi qua một người phán đoán từ đầu. Đó là lý do phần lớn độ trễ chờ duyệt không đến từ quyết định phức tạp. Nó đến từ quyết định đơn giản đang dùng nhầm đường.

---

## Event → Action hoạt động thế nào

![So sánh hai mô hình: Request → Approval (phê duyệt từng ca) và Event → Action (rule do người có thẩm quyền ban hành trước, sự kiện kích hoạt rule).](~/assets/images/insights/tu-request-approval-sang-event-action/wfr-01-request-approval-vs-event-action-vi-dark.svg)

Cấu trúc cơ bản gồm ba bước.

1. **Sự kiện xảy ra:** một điều kiện được đáp ứng, một ngưỡng bị vượt, một trạng thái thay đổi.
2. **Rule đánh giá sự kiện.** Đây là rule do người có thẩm quyền đã ban hành từ trước, với điều kiện và ngưỡng viết rõ.
3. **Phân luồng theo kết quả:**
   - Sự kiện nằm trong phạm vi rule và khớp tiền lệ đã được xác nhận: **hành động diễn ra trực tiếp**, mỗi lần đều ghi evidence.
   - Sự kiện vượt ngưỡng, nằm ngoài tiền lệ hoặc có rủi ro cao: **chuyển tới người có thẩm quyền**, kèm ngữ cảnh và evidence để phán đoán nhanh hơn.

![Phân luồng trong Event → Action: sự kiện trong phạm vi rule → hành động trực tiếp có evidence; sự kiện ngoài phạm vi → chuyển người có thẩm quyền kèm ngữ cảnh.](~/assets/images/insights/tu-request-approval-sang-event-action/wfr-03-conditional-approval-branch-vi-dark.svg)

Điểm khác biệt cốt lõi không phải là "có phê duyệt hay không", mà là **phê duyệt xảy ra ở đâu**.

| | Request → Approval | Event → Action |
|---|---|---|
| Phê duyệt xảy ra khi nào | Mỗi lần có yêu cầu | Một lần khi ban hành rule; và từng ca ngoại lệ |
| Ai quyết định | Người duyệt, từng ca | Người có thẩm quyền ban hành rule; con người phán đoán ca ngoại lệ |
| Kiểm soát đặt ở đâu | Trước mỗi hành động | Trước khi ban hành rule, và rà soát sau khi chạy |
| Evidence | Dễ nằm rải rác trong email, chữ ký | Ghi lại mỗi lần rule chạy |

### Vai trò của AI

Sự kiện không phải lúc nào cũng đến dưới dạng dữ liệu có cấu trúc. Khi nó đến dưới dạng email, tin nhắn hay ảnh chứng từ, AI có thể diễn giải thành dữ liệu có cấu trúc để rule chạy được, và chuẩn bị evidence cho ca ngoại lệ. AI không phải bên quyết định ở bất kỳ nhánh nào. Chi tiết xem bài [AI làm hai việc trong workflow](/insights/workflow/ai-tich-hop-vao-workflow).

---

## Ví dụ minh họa trong vận hành

![Ba ví dụ minh họa: mua hàng định kỳ, xử lý đổi trả, điều chỉnh lịch sản xuất — mỗi ví dụ đều có người ban hành rule từ trước và phân luồng rõ giữa ca trong rule và ca ngoại lệ.](~/assets/images/insights/tu-request-approval-sang-event-action/wfr-04-three-examples-vi-dark.svg)

Các ví dụ dưới đây là tình huống minh họa, không phải số liệu hay case thực tế của khách hàng.

**Mua hàng định kỳ.** Đơn nguyên liệu lặp lại, đúng nhà cung cấp quen, trong hạn mức đã được phê duyệt. Rule này được người phụ trách mua hàng ban hành trước. Khi sự kiện "tồn kho xuống ngưỡng" xảy ra, đơn được tạo theo rule. Nhà cung cấp mới hoặc vượt hạn mức thì chuyển người duyệt.

**Xử lý đổi trả.** Yêu cầu đổi trả nằm trong chính sách, giá trị thấp, không có lịch sử bất thường: xử lý ngay theo rule. Giá trị cao hoặc có dấu hiệu bất thường thì chuyển người có thẩm quyền kèm lịch sử khách hàng.

**Điều chỉnh lịch sản xuất.** Khi thiếu nguyên liệu và có phương án thay thế đã được phê duyệt trước, lịch được điều chỉnh theo phương án đó. Phương án chưa được duyệt thì chờ người có thẩm quyền.

Ở cả ba ví dụ, quyết định đã được đưa ra từ trước bởi một người cụ thể. Sự kiện chỉ khiến quyết định đó có hiệu lực đúng lúc.

---

## Điều kiện để chuyển đổi

![Bốn điều kiện để chuyển sang Event → Action: đủ tiền lệ, người có thẩm quyền quyết định trước và đứng tên rule, evidence mỗi lần rule chạy, rà soát sau.](~/assets/images/insights/tu-request-approval-sang-event-action/wfr-05-four-conditions-vi-dark.svg)

1. **Có đủ tiền lệ** để xác định "trường hợp rõ ràng" dựa trên dữ liệu thật: những ca nào đã lặp lại, với kết quả nhất quán.
2. **Người có thẩm quyền sẵn sàng quyết định trước** thay vì quyết định từng lần, và đứng tên rule. Mỗi rule có một chủ sở hữu (rule owner) chịu trách nhiệm rà soát.
3. **Mỗi lần rule chạy đều để lại evidence**, để kiểm chứng sau và truy vết khi cần.
4. **Có rà soát sau** (post-hoc review) để phát hiện sớm nếu ngưỡng đặt sai.

Lộ trình thận trọng là bắt đầu từ những quyết định giá trị thấp, tần suất cao và tiền lệ rõ nhất, rồi mở rộng bằng cách ban hành thêm rule theo quy trình có người duyệt. Phạm vi không mở rộng bằng cách giao thêm quyền cho hệ thống.

---

## Những gì không nên chuyển

![Những gì không nên chuyển sang Event → Action: hành động khó đảo ngược, quyết định tiêu chí biến động, phê duyệt theo quy định bắt buộc.](~/assets/images/insights/tu-request-approval-sang-event-action/wfr-06-what-not-to-move-vi-dark.svg)

- **Hành động khó hoặc không thể đảo ngược**, như chuyển tiền lớn hay xác nhận hợp đồng. Giữ con người xác nhận trước khi thực hiện.
- **Quyết định có tiêu chí biến động**, hoặc luôn có biến thể mới mà rule không liệt kê hết.
- **Phê duyệt do quy định, tiêu chuẩn hoặc hợp đồng với khách hàng yêu cầu.** Cần xác định rõ phê duyệt nào thuộc loại này trước khi thay đổi, vì đây không phải kiểm soát hình thức.

### Rủi ro khi làm sai

Rule đặt sai ngưỡng sẽ lặp lại lỗi nhanh và đều. Vì vậy rà soát sau không phải thủ tục. Các tín hiệu nên theo dõi: số ngoại lệ tăng bất thường, khiếu nại tăng sau khi rule chạy, hành động phải đảo ngược. Khi có tín hiệu, sửa rule theo quy trình chính thức và ghi nhận lý do, thay vì chỉnh trực tiếp.

---

## Tự kiểm tra: bước duyệt của bạn đang kiểm soát gì?

Với từng bước duyệt trong quy trình, thử trả lời:

1. Trong 10 lần gần nhất, bao nhiêu lần người duyệt từ chối hoặc yêu cầu sửa? Nếu gần như luôn duyệt nguyên trạng, bước này có thể là kiểm soát hình thức. (Đây là quan sát của OKELAS, không phải ngưỡng chuẩn.)
2. Tiêu chí duyệt đã được viết ra, hay nằm trong đầu người duyệt?
3. Một yêu cầu giá trị thấp và một yêu cầu giá trị cao có đang đi qua cùng một chuỗi duyệt không?
4. Khi người duyệt vắng một tuần, yêu cầu đang đi đâu?
5. Mỗi lần duyệt có để lại evidence có thể truy vết, hay chỉ nằm trong email?

Nếu nhiều câu trả lời khiến bạn bất ngờ, đây có thể là nơi nên bắt đầu. Digitalization Level Assessment của OKELAS giúp đặt các bước này vào bức tranh số hóa chung của doanh nghiệp.

---

## Kết luận

Sự khác biệt không nằm ở việc có hay không có kiểm soát. Nó nằm ở chỗ kiểm soát được đặt ở đâu. Request → Approval dùng cùng một mức soi xét cho mọi ca. Event → Action dành sự phán đoán của con người cho những ca thực sự cần, và để những quyết định đã được người có thẩm quyền ban hành trước chạy đúng lúc, có evidence, có người chịu trách nhiệm.

Phần lớn độ trễ do chờ duyệt không đến từ những quyết định phức tạp, mà đến từ việc những quyết định đơn giản, lặp lại vẫn đang đi qua đúng quy trình dành cho quyết định phức tạp.

---

## Nguồn

- Simon, H. A. (1960). *The New Science of Management Decision*. Harper & Brothers.
- George, M. L. (2002). *Lean Six Sigma: Combining Six Sigma Quality with Lean Speed*. McGraw-Hill. (Định nghĩa Process Cycle Efficiency.)

## Bài liên quan

- [Rule hay con người: quyết định nào nên tự động hóa trong quy trình](/insights/workflow/rule-hay-con-nguoi-quyet-dinh-trong-workflow)
- [AI làm hai việc trong workflow: diễn giải đầu vào và chuẩn bị evidence](/insights/workflow/ai-tich-hop-vao-workflow)
- Event-Driven Workflow: khi workflow tự nhận biết sự kiện để bắt đầu công việc
- Từ Approval Workflow đến End-to-End Workflow
