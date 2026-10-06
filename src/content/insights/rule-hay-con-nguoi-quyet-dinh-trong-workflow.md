---
title: "Rule hay con người: quyết định nào nên tự động hóa trong quy trình"
description: "Không phải mọi quyết định đều cần con người phán đoán, không phải mọi thứ đủ ổn định để encode thành rule. Khung của Herbert Simon (1960) vẫn là công cụ thực tế nhất để phân định ranh giới này."
publishDate: 2026-09-23T00:00:00Z
translationId: workflow-rule-human-decision
lang: vi
category: workflow
contentType: Analysis
funnelStage:
  - Understanding
audience:
  - COO
  - CIO
  - Operations Director
primaryKeyword: "quyết định nào nên tự động hóa trong quy trình"
secondaryKeywords:
  - "quyết định có thể lập trình"
  - "rule-based workflow"
  - "phán đoán của con người trong quy trình"
  - "ngoại lệ workflow"
  - "Herbert Simon quản trị quyết định"
assessmentHref: /readiness/digitalization
coverImage: '~/assets/images/insights/rule-hay-con-nguoi-quyet-dinh-trong-workflow/wfd-00-og-cover-vi.png'
ogImage: '~/assets/images/insights/rule-hay-con-nguoi-quyet-dinh-trong-workflow/wfd-00-og-cover-vi.png'
coverImageAlt: "Dải liên tục từ quyết định lặp lại (encode thành rule) tới quyết định phức tạp (cần con người phán đoán); AI hỗ trợ đầu vào ở cả hai đầu."
draft: false
---

---

> **Tóm tắt cho CEO/COO**
>
> - Khi thiết kế workflow có AI tham gia, câu hỏi thực tế xuất hiện sớm nhất không phải "dùng AI nào" mà là: **bước này nên là rule cứng, hay cần con người phán đoán?**
> - Herbert Simon — nhà kinh tế học đoạt giải Nobel năm 1978 — đã phân biệt rõ hai loại quyết định từ năm 1960: **quyết định có thể lập trình** (lặp lại, tiêu chí rõ) và **quyết định không thể lập trình** (mới, phức tạp, cần phán đoán). Phân biệt này vẫn nguyên giá trị.
> - Thứ đứng ở đầu "cần phán đoán" thuộc về con người — hệ thống có thể chuẩn bị đầu vào (diễn giải dữ liệu phi cấu trúc, tổng hợp evidence), nhưng thẩm quyền phán đoán không chuyển sang AI.
> - Khi đủ tiền lệ tích lũy, phán đoán của con người có thể trở thành **đề xuất rule** → con người duyệt → mới thành rule. Phạm vi phán đoán thu hẹp theo thời gian vì nhiều rule hơn được ban hành — không phải vì giao thêm quyền cho AI.

---

Khi bắt đầu thiết kế một workflow có AI tham gia, câu hỏi thường gặp nhất ở đội ngũ IT và vận hành không phải "nên chọn AI nào" — mà là: "bước này nên encode thành rule trong hệ thống, hay nên để con người phán đoán từng trường hợp?" Câu hỏi nghe có vẻ kỹ thuật, nhưng thực chất là câu hỏi quản trị đã được nghiên cứu từ hơn sáu thập kỷ trước.

Năm 1960, Herbert Simon — người sau này nhận giải Nobel Kinh tế năm 1978 — xuất bản "The New Science of Management Decision," trong đó ông đưa ra phân biệt vẫn còn nguyên giá trị: sự khác biệt giữa quyết định có thể lập trình và quyết định không thể lập trình.

→ *Xem thêm: [Từ Request → Approval sang Event → Action](/insights/workflow/tu-request-approval-sang-event-action)*

---

## Hai loại quyết định của Herbert Simon

Trong "The New Science of Management Decision" (1960), Simon phân biệt:

**Quyết định có thể lập trình (programmed decisions):** lặp lại, có cấu trúc rõ ràng, được xử lý thông qua quy trình hoặc hệ thống đã thiết lập. Khi tiêu chí ổn định và có thể viết ra được, loại này phù hợp để encode thành rule trong workflow — không cần, và không nên, giao thêm cho con người phán đoán từng trường hợp.

**Quyết định không thể lập trình (nonprogrammed decisions):** mới, phức tạp, đòi hỏi phán đoán, cân nhắc nhiều yếu tố cùng lúc, không thể liệt kê hết biến thể từ trước. Loại này cần con người đảm nhận — hệ thống có thể chuẩn bị đầu vào (bao gồm diễn giải dữ liệu phi cấu trúc, tổng hợp evidence từ trường hợp tương tự), nhưng thẩm quyền phán đoán ở con người.

Simon cũng nhấn mạnh: đây là hai đầu của một **dải liên tục**, không phải hai phạm trù tách biệt hoàn toàn. Phần lớn quyết định trong doanh nghiệp thực tế nằm ở đâu đó giữa hai đầu — và vị trí đó **không cố định**, có thể dịch chuyển theo thời gian.

Điều AI thêm vào bức tranh này không phải một lớp phán đoán thứ ba nằm giữa rule và con người. AI xuất hiện ở hai vai trò hỗ trợ: diễn giải đầu vào phi cấu trúc để rule có thể chạy được, và chuẩn bị evidence để con người phán đoán nhanh hơn và có căn cứ hơn.

---

## Bốn tiêu chí phân định thực tế

![Dải liên tục programmed–nonprogrammed của Simon với bốn tiêu chí nhận diện bên dưới: tần suất, độ ổn định tiêu chí, liệt kê được biến thể, hậu quả áp dụng sai.](~/assets/images/insights/rule-hay-con-nguoi-quyet-dinh-trong-workflow/wfd-01-simon-continuum-vi-dark.svg)

Để xác định một quyết định cụ thể nằm ở đâu trên dải liên tục — và từ đó chọn giữa encode thành rule hay giữ cho con người — có bốn câu hỏi thực tế:

**1. Tần suất.** Loại tình huống này xảy ra hàng ngày, hàng tuần, hay chỉ vài lần một năm? Tần suất cao làm tăng lợi ích của việc viết rule — một rule dùng được nhiều lần sẽ tiết kiệm thời gian đáng kể so với xử lý từng trường hợp.

**2. Độ ổn định của tiêu chí.** Điều kiện quyết định có thay đổi theo mùa, chính sách mới, hay biến động thị trường không? Tiêu chí càng ổn định, rule càng có tuổi thọ dài và ít tốn chi phí bảo trì. Tiêu chí thay đổi thường xuyên làm rule nhanh hỏng.

**3. Mức độ có thể liệt kê trước các biến thể.** Có thể viết ra hầu hết các trường hợp có thể xảy ra không, hay luôn xuất hiện biến thể mới ngoài dự kiến? Nếu không liệt kê được, rule cứng sẽ bỏ sót — và phần bỏ sót đó thường là trường hợp quan trọng nhất.

**4. Hậu quả của việc áp dụng sai.** Nếu rule chạy sai cho một trường hợp ngoại lệ, hậu quả có nghiêm trọng không? Hậu quả cao đòi hỏi giữ con người ở bước xác nhận, hoặc ít nhất ở bước phê duyệt ngoại lệ.

Bốn tiêu chí này không cho ra câu trả lời nhị phân — chúng giúp xác định vị trí trên dải liên tục và từ đó chọn cơ chế phù hợp.

---

## Bảng phân loại: loại quyết định → ai đảm nhận

![Bảng phân loại bốn loại quyết định theo đặc điểm, ánh xạ sang ba cột: rule trong workflow, AI hỗ trợ đầu vào, con người phán đoán.](~/assets/images/insights/rule-hay-con-nguoi-quyet-dinh-trong-workflow/wfd-02-decision-table-vi-dark.svg)

| Đặc điểm quyết định | Rule trong workflow | AI hỗ trợ đầu vào | Con người phán đoán |
|---|:---:|:---:|:---:|
| Lặp lại, tiêu chí rõ, dữ liệu có cấu trúc | Có | Không cần | Không cần |
| Lặp lại, nhưng đầu vào phi cấu trúc (văn bản, email) | Có — sau khi AI diễn giải | Diễn giải đầu vào | Xác nhận nếu rủi ro cao |
| Hiếm gặp, tiêu chí chưa ổn định | Chưa — cần tiền lệ | Tổng hợp evidence | Phán đoán |
| Hậu quả sai cao, bất kể tần suất | Chỉ làm đường mặc định | Chuẩn bị hồ sơ evidence | Xác nhận bắt buộc |

Điểm quan trọng: AI không xuất hiện ở cột "phán đoán" — AI xuất hiện ở cột "hỗ trợ đầu vào". Thẩm quyền phán đoán ở con người; AI diễn giải và chuẩn bị để con người phán đoán nhanh hơn, không thay thế phán đoán.

*Xem thêm về vai trò AI cụ thể trong từng bước workflow: [AI làm hai việc trong workflow: diễn giải và chuẩn bị evidence](/insights/workflow/ai-tich-hop-vao-workflow)*

---

## Khi tiền lệ tích lũy — con đường từ phán đoán thành rule

![Dòng chảy năm bước từ ghi nhận ngoại lệ tới rule mới vào workflow: ghi nhận → nhận diện mẫu → đề xuất rule → con người duyệt → rule mới.](~/assets/images/insights/rule-hay-con-nguoi-quyet-dinh-trong-workflow/wfd-03-precedent-to-rule-vi-dark.svg)

Một trong những điểm Simon nhấn mạnh nhưng dễ bị bỏ qua trong bối cảnh thiết kế hệ thống: **vị trí trên dải liên tục không cố định**. Khi đủ tiền lệ tích lũy — khi một loại quyết định đã được con người xử lý nhiều lần với kết quả nhất quán và mẫu hình rõ — nó có thể dần trở thành programmable.

Cơ chế đúng cho việc chuyển đổi này:

**Bước 1 — Ghi nhận ngoại lệ.** Mỗi lần con người xử lý một trường hợp nằm ngoài rule hiện tại, hệ thống ghi nhận lý do và quyết định như một phần của evidence — không phải để AI học tự quyết định, mà để tích lũy tiền lệ có thể kiểm chứng.

**Bước 2 — Nhận diện mẫu hình.** Khi cùng một loại tình huống xuất hiện đủ nhiều lần với cách xử lý nhất quán, dữ liệu đủ để đề xuất: "đây có thể trở thành rule." Đề xuất này có thể do AI tổng hợp hoặc do người vận hành nhận ra.

**Bước 3 — Con người duyệt và ban hành.** Đề xuất không tự động trở thành rule. Người có thẩm quyền — thường là rule owner của quy trình đó — xem xét, chỉnh sửa nếu cần, và ban hành chính thức với điều kiện rõ ràng.

**Bước 4 — Rule mới vào workflow.** Từ lần này, trường hợp thuộc nhóm đó được rule xử lý, không cần leo thang. Phạm vi cần phán đoán của con người thu hẹp lại.

Cơ chế này là lý do phạm vi phán đoán thu hẹp theo thời gian — **không phải vì giao thêm cho AI**, mà vì nhiều rule hơn được ban hành dựa trên kinh nghiệm thực tế đã được xác nhận bởi con người.

→ *Xem thêm về cách xử lý khi ngoại lệ chưa có rule: [Xử lý ngoại lệ trong workflow](/insights/workflow/xu-ly-ngoai-le-trong-workflow)*

---

## Vòng đời của rule

Rule không phải là thứ viết một lần rồi bỏ. Một workflow trưởng thành cần quản lý vòng đời rule chủ động:

**Rule owner:** mỗi rule cần người chịu trách nhiệm rà soát định kỳ. Không nhất thiết là bộ phận IT — thường là người vận hành hiểu nhất bối cảnh và biết khi nào điều kiện thay đổi.

**Quy trình sửa rule:** khi môi trường thay đổi (chính sách mới, sản phẩm mới, yêu cầu khách hàng mới), rule cần sửa theo quy trình chính thức — không sửa trực tiếp vào hệ thống mà không có ghi nhận, vì điều đó làm mất khả năng truy vết tại sao rule thay đổi.

**Log evidence:** mỗi lần rule được áp dụng nên để lại dấu vết — để kiểm chứng sau và phát hiện sớm khi rule bắt đầu không còn phù hợp.

**Dấu hiệu rule cần rà soát:** số lượng ngoại lệ tăng bất thường cho thấy rule đang không bao phủ đủ; số khiếu nại sau khi rule chạy cho thấy rule đang chạy theo hướng sai.

Nếu doanh nghiệp chưa có cơ chế quản lý vòng đời rule, các rule cũ tích lũy dần và trở thành nguồn gây ngoại lệ — vì môi trường đã đổi nhưng rule chưa theo kịp.

---

## Checklist kiểm kê quyết định

Trước khi thiết kế hoặc thiết kế lại một workflow, kiểm kê quyết định là bước thường bị bỏ qua nhưng tạo ra nhiều giá trị nhất.

**Cho từng bước trong quy trình, trả lời:**

- [ ] Bước này yêu cầu loại quyết định gì? (phê duyệt, phân loại, định tuyến, tính toán, xác nhận, leo thang?)
- [ ] Tiêu chí của quyết định đã được viết ra chưa, hay đang nằm trong đầu một người?
- [ ] Bao nhiêu phần trăm trường hợp thực tế được xử lý theo cùng một logic?
- [ ] Khi logic không áp dụng được, quyết định đó đang đi đâu? (leo thang đúng quy trình? bỏ qua? xử lý tắt qua Zalo/email?)
- [ ] Nếu người phụ trách nghỉ một tuần, bước này xử lý như thế nào?

Kết quả kiểm kê không phải danh sách "sẽ giao cho AI" — mà là:
- Quyết định nào encode thành rule ngay được (đủ tần suất, tiêu chí ổn định, hậu quả sai thấp);
- Quyết định nào cần tiền lệ thêm trước khi có thể viết rule;
- Quyết định nào phải giữ ở con người vì hậu quả sai cao hoặc tiêu chí quá biến động.

→ *Xem thêm về phân tách trách nhiệm khi AI tham gia: [Phân tách trách nhiệm khi dùng AI trong workflow](/insights/workflow/phan-tach-trach-nhiem-ai-trong-workflow)*

---

## Kết luận

Vấn đề thực sự không phải là "nên dùng AI không" — mà là "quyết định này đang ở đâu trên dải liên tục, và cơ chế nào phù hợp nhất với vị trí đó."

Khung của Simon từ năm 1960 vẫn là công cụ đúng để trả lời câu hỏi này. Điều AI thêm vào không phải một lớp phán đoán mới — mà là khả năng chuẩn bị đầu vào tốt hơn: diễn giải dữ liệu phi cấu trúc để rule có thể chạy được, và tổng hợp evidence để con người phán đoán nhanh hơn có căn cứ hơn.

Doanh nghiệp trưởng thành hơn không phải doanh nghiệp giao nhiều quyền hơn cho AI — mà là doanh nghiệp biết phần nào đủ điều kiện encode thành rule, phần nào cần con người, và có cơ chế chủ động chuyển dần từ phán đoán thành rule dựa trên kinh nghiệm thực tế được xác nhận bởi người có thẩm quyền.

---

*Bài viết này là một phần của chuỗi chuyên đề về workflow, ứng dụng AI và quản trị vận hành cho doanh nghiệp sản xuất SME.*

**Bài liên quan:**
- [Từ Request → Approval sang Event → Action: khi nào hành động không cần chờ duyệt](/insights/workflow/tu-request-approval-sang-event-action)
- [Xử lý ngoại lệ trong workflow: khi quyết định không có rule sẵn](/insights/workflow/xu-ly-ngoai-le-trong-workflow)
- [AI làm hai việc trong workflow: diễn giải và chuẩn bị evidence](/insights/workflow/ai-tich-hop-vao-workflow)
- [Phân tách trách nhiệm khi dùng AI trong workflow](/insights/workflow/phan-tach-trach-nhiem-ai-trong-workflow)

**→ [Làm Digitalization Readiness Assessment](/readiness/digitalization)**
