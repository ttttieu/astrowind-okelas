---
title: "Automation và AI hỗ trợ trong workflow: hai việc khác nhau, không phải hai nấc thang"
description: "Automation thực thi theo rule do người có thẩm quyền ban hành. AI hỗ trợ đọc đầu vào mà rule không đọc được và chuẩn bị evidence cho con người. Bài này giúp COO/CIO tránh hai sai lầm đầu tư: thêm AI vào quy trình chưa có rule, và kỳ vọng AI tự xử lý ngoại lệ."
publishDate: 2026-10-06T00:00:00Z
translationId: article-5-12-automation-ai-workflow
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
primaryKeyword: "automation và AI trong workflow"
secondaryKeywords:
  - "RPA workflow"
  - "hyperautomation"
  - "AI hỗ trợ workflow"
  - "automation vs AI"
  - "workflow automation rule"
assessmentHref: /readiness/digitalization
coverImage: '~/assets/images/insights/automation-va-ai-ho-tro-workflow/wfa-00-og-cover-vi.png'
ogImage: '~/assets/images/insights/automation-va-ai-ho-tro-workflow/wfa-00-og-cover-vi.png'
coverImageAlt: "Automation và AI hỗ trợ là hai việc khác nhau: automation thực thi theo rule, AI đọc đầu vào phi cấu trúc và chuẩn bị evidence — quyền quyết định ở lại với rule hoặc con người."
draft: false
---

---

> **Tóm tắt cho COO/CIO**
>
> - Câu hỏi "đã có automation, có nên thêm AI không" thường bị hiểu như hai nấc thang: automation ở dưới, AI ở trên, và AI "thông minh hơn". Cách hiểu này dẫn đến đầu tư sai chỗ.
> - **Automation và AI hỗ trợ làm hai việc khác nhau.** Automation thực thi hành động theo rule do người có thẩm quyền ban hành. AI hỗ trợ đọc đầu vào phi cấu trúc để rule chạy được, và chuẩn bị evidence để con người phán đoán.
> - Quyền quyết định không nằm ở AI. Nó nằm ở rule (do người ban hành) hoặc ở con người. Vì vậy AI không "xử lý ngoại lệ" thay con người; nó giúp ngoại lệ đến đúng người với hồ sơ đủ.
> - Thứ tự đầu tư hợp lý theo sự phụ thuộc: chuẩn hóa quy trình và viết rule, automation phần lặp lại, đường xử lý ngoại lệ, rồi AI hỗ trợ ở những chỗ đầu vào hoặc hồ sơ thực sự là điểm nghẽn.

---

## Mở đầu

Một doanh nghiệp đã đưa robot (RPA) vào bộ phận mua hàng. Robot chạy ổn với đơn chuẩn. Nhưng mỗi ngày vẫn có một nhóm đơn robot dừng lại: nhà cung cấp gửi đơn xác nhận bằng email tự do, một mã hàng viết khác thường, một yêu cầu thay đổi nằm trong ảnh chụp. Người phụ trách thấy giải pháp rõ ràng: "thêm AI để robot tự hiểu và tự xử lý".

Đề xuất này nghe hợp lý, nhưng gộp hai việc khác nhau vào một. Đọc được email là một việc. Quyết định cách xử lý khi thông tin trong email khác với rule là một việc khác, và việc thứ hai có người phải chịu trách nhiệm. Bài này tách hai việc đó ra để chọn đúng chỗ đầu tư.

(Đây là tình huống minh họa, không phải case của khách hàng cụ thể.)

---

## Automation làm tốt điều gì

![Ba vai trong workflow: automation thực thi theo rule, AI hỗ trợ đọc đầu vào và chuẩn bị evidence, con người phán đoán và ban hành rule — không phải ba nấc thang từ thấp lên cao.](~/assets/images/insights/automation-va-ai-ho-tro-workflow/wfa-01-three-roles-vi-dark.svg)

Automation, bao gồm RPA (Robotic Process Automation), thực hiện thao tác lặp lại theo rule viết rõ: nếu điều kiện A thì làm B. Nó phù hợp khi ba điều kiện cùng đúng:

- tiêu chí rõ và đã được viết ra;
- đầu vào có cấu trúc (trường biểu mẫu, cột bảng tính);
- hậu quả nếu rule chạy sai ở mức chấp nhận được, hoặc sai thì sửa lại được.

Giá trị của nó là chạy ổn định, không phụ thuộc người rảnh hay bận, và bớt lỗi nhập liệu. Điểm cần nhớ: automation **không tự quyết định**. Mỗi rule là một quyết định đã được người có thẩm quyền đưa ra từ trước, như bài [Từ Request → Approval sang Event → Action](/insights/workflow/tu-request-approval-sang-event-action) mô tả. Automation tốt là automation có người đứng tên rule.

---

## Automation dừng ở đâu

![Ba chỗ automation dừng: đầu vào phi cấu trúc, ca ngoài rule, quyết định cần phán đoán — và lời giải của từng chỗ.](~/assets/images/insights/automation-va-ai-ho-tro-workflow/wfa-02-three-stopping-points-vi-dark.svg)

Automation dừng ở ba chỗ, và cả ba đều có tên gọi khác nhau.

**1. Đầu vào phi cấu trúc.** Email, tin nhắn, ảnh chứng từ, ghi chú viết tay không có trường để rule đọc. Đây là phần lớn thông tin trong nhiều quy trình thực tế, và là chỗ robot thường dừng đầu tiên.

**2. Ca ngoài rule.** Khi tình huống không khớp bất kỳ rule nào, robot dừng và chờ người. Đó là hành vi đúng, không phải lỗi. Việc cần thiết kế là ca đó đi đâu sau khi robot dừng. Chi tiết xem bài [Xử lý ngoại lệ trong workflow](/insights/workflow/xu-ly-ngoai-le-trong-workflow).

**3. Quyết định cần phán đoán.** Khi nhiều yếu tố cần cân nhắc cùng lúc và tiêu chí chưa ổn định, đó là quyết định không thể lập trình theo nghĩa của Herbert Simon (1960). Rule chưa thể thay con người ở đây.

Thuật ngữ "hyperautomation" mà Gartner đưa vào danh sách xu hướng công nghệ chiến lược công bố năm 2019 phản ánh nhận định này của ngành: một công cụ tự động hóa đơn lẻ khó phủ hết một quy trình, nên cần kết hợp nhiều công nghệ. Điều Gartner không nói, và điều bài này nhấn mạnh, là việc kết hợp thêm công nghệ không chuyển quyền quyết định cho công nghệ.

---

## AI hỗ trợ bổ sung điều gì, và không bổ sung điều gì

![Khung định hướng để thảo luận: automation (rule), AI hỗ trợ và con người — việc chính, điều kiện chạy, quyền quyết định, và điều xảy ra khi sai.](~/assets/images/insights/automation-va-ai-ho-tro-workflow/wfa-03-who-does-what-vi-dark.svg)

Ba chỗ dừng ở trên không có cùng lời giải. AI hỗ trợ giải quyết chỗ thứ nhất và giúp ích cho chỗ thứ hai và thứ ba, theo đúng hai việc nêu trong bài [AI làm hai việc trong workflow](/insights/workflow/ai-tich-hop-vao-workflow):

- **Diễn giải đầu vào phi cấu trúc** để rule chạy được: đọc email, trích số liệu, gán loại yêu cầu.
- **Chuẩn bị evidence** để con người phán đoán nhanh hơn: tìm ca tương tự, tổng hợp điều khoản và dữ liệu liên quan, chỉ rõ nguồn.

Bảng dưới đây là khung thảo luận định hướng, không phải số liệu đo lường.

| | Automation (rule) | AI hỗ trợ | Con người |
|---|---|---|---|
| Việc chính | Thực thi hành động đã cho phép | Đọc đầu vào, chuẩn bị evidence | Phán đoán ngoại lệ; ban hành rule |
| Cần gì để chạy | Rule viết rõ, đầu vào có cấu trúc | Đầu vào để đọc, nguồn evidence để tra | Thẩm quyền và thông tin đủ |
| Quyền quyết định | Có, theo phạm vi rule đã ban hành | Không | Có |
| Khi sai | Lỗi lặp lại nhanh và đều | Diễn giải sai, người xem kết quả có thể sửa | Sai có người chịu trách nhiệm và truy vết được |

Điểm đáng chú ý nhất của bảng: cột AI hỗ trợ **không có quyền quyết định ở hàng nào**. Đó là lý do "AI tự xử lý ngoại lệ" là cách nói dễ gây hiểu nhầm. Thứ tự đúng là: AI đọc, rule chạy hoặc con người quyết định.

---

## Ba sai lầm đầu tư thường gặp

**Thêm AI khi vấn đề là rule chưa viết.** Nếu tiêu chí xử lý còn nằm trong đầu một vài người, AI đọc email nhanh đến đâu thì quyết định phía sau vẫn mỗi người một kiểu. Việc cần làm trước là viết ra tiêu chí và chuẩn hóa quy trình.

**Dựng automation cho quy trình ngoại lệ nhiều mà chưa có đường ngoại lệ.** Robot dừng liên tục, người xử lý tắt qua Zalo hoặc email, và automation trở thành lớp mỏng phủ lên cách làm cũ.

**Kỳ vọng AI "tự xử lý ngoại lệ".** Đây là việc giao quyết định cho một bên không ai đứng tên, nên khi có sự cố không ai chịu trách nhiệm, và tổ chức không có evidence để học. Ngoại lệ cần người có thẩm quyền, với hồ sơ do AI hỗ trợ chuẩn bị.

---

## Nên bắt đầu từ đâu

![Năm bước theo thứ tự phụ thuộc: chuẩn hóa và viết rule, automation phần rõ, đường ngoại lệ, AI diễn giải đầu vào, AI chuẩn bị evidence — và ba chỉ số cần đo trước khi chọn bước 4 và 5.](~/assets/images/insights/automation-va-ai-ho-tro-workflow/wfa-04-investment-order-vi-dark.svg)

Đây không phải thang nấc từ thấp lên cao, mà là thứ tự phụ thuộc: bước sau chạy tốt khi bước trước đã có.

1. **Chuẩn hóa quy trình và viết rule** cho phần lặp lại, với người có thẩm quyền đứng tên.
2. **Automation phần có rule rõ và đầu vào có cấu trúc.**
3. **Đường xử lý ngoại lệ**: ca ngoài rule đi tới đúng người, kèm hồ sơ, và quyết định được ghi lại.
4. **AI diễn giải đầu vào** ở những chỗ đầu vào phi cấu trúc là điểm nghẽn thực sự.
5. **AI chuẩn bị evidence** khi số ca ngoại lệ đủ nhiều để việc tìm và tổng hợp hồ sơ tốn công đáng kể.

Trước khi quyết định bước 4 và 5, nên đo ba điều trong chính quy trình của bạn: tỷ lệ ca đi vào ngoại lệ, tỷ lệ đầu vào phi cấu trúc, và thời gian người dành để chuẩn bị hồ sơ cho ca ngoại lệ. Không có ngưỡng chung cho mọi doanh nghiệp. Con số của bạn mới là căn cứ.

---

## Tự kiểm tra: bạn đang đầu tư vào việc nào?

1. Rule của quy trình đang được viết ra và có người đứng tên, hay nằm trong đầu một vài người?
2. Khi robot dừng, bạn biết ca đó đi đâu và ai quyết định không?
3. Phần lớn đầu vào của quy trình là có cấu trúc hay là email, ảnh, ghi chú?
4. Có đề xuất nào đang kỳ vọng AI "tự quyết" ở bước mà bạn không chỉ ra được ai chịu trách nhiệm?
5. Bạn đã đo tỷ lệ ngoại lệ và thời gian chuẩn bị hồ sơ chưa, hay đang quyết định theo cảm tính?

Nếu từ ba câu trở lên khiến bạn do dự, nên làm rõ rule và đường ngoại lệ trước khi chọn công nghệ. Digitalization Level Assessment của OKELAS giúp đặt các quyết định này vào bức tranh số hóa chung của doanh nghiệp.

---

## Kết luận

Automation và AI hỗ trợ không phải hai nấc của một cái thang, càng không phải cuộc cạnh tranh. Automation thực thi điều rule cho phép. AI đọc những gì rule không đọc được và chuẩn bị hồ sơ để con người quyết định. Quyền quyết định ở lại với rule do người có thẩm quyền ban hành hoặc với chính con người.

Nhầm hai việc này thường dẫn đến một trong hai sai lầm: đầu tư AI vào chỗ cần rule, hoặc kỳ vọng automation làm việc của người phán đoán. Hỏi "phần nào cần ai" trước khi hỏi "dùng công nghệ nào" thường tiết kiệm hơn.

---

## Nguồn

- Gartner (2019). *Top 10 Strategic Technology Trends for 2020* (giới thiệu thuật ngữ hyperautomation).
- Parasuraman, R., Sheridan, T. B., & Wickens, C. D. (2000). A model for types and levels of human interaction with automation. *IEEE Transactions on Systems, Man, and Cybernetics – Part A*, 30(3), 286–297.
- Simon, H. A. (1960). *The New Science of Management Decision*. Harper & Brothers.

## Bài liên quan

- [AI làm hai việc trong workflow: diễn giải đầu vào và chuẩn bị evidence](/insights/workflow/ai-tich-hop-vao-workflow)
- [Xử lý ngoại lệ trong workflow: khi quyết định không có rule sẵn](/insights/workflow/xu-ly-ngoai-le-trong-workflow)
- [Rule hay con người: quyết định nào nên tự động hóa trong quy trình](/insights/workflow/rule-hay-con-nguoi-quyet-dinh-trong-workflow)
- [Từ Request → Approval sang Event → Action: khi nào hành động không cần chờ duyệt](/insights/workflow/tu-request-approval-sang-event-action)
