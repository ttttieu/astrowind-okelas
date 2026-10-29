---
title: "Giao việc cho AI theo từng bước workflow: nhìn ở cấp hoạt động, quản trị như một participant"
description: "Thay vì hỏi AI có thay được một vị trí không, hãy hỏi bước nào trong workflow của vị trí đó có thể giao cho AI, với nhiệm vụ, quyền hạn và dấu vết rõ ràng. Bài này gộp hai cách nhìn thành một khung: giao bước chứ không giao quyết định."
publishDate: 2026-10-06T00:00:00Z
translationId: article-5-18-delegating-steps-workflow
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
primaryKeyword: "giao việc cho AI theo bước workflow"
secondaryKeywords:
  - "AI participant workflow"
  - "task-level automation AI"
  - "non-human identity workflow"
  - "giao việc AI quản trị"
  - "AI employee workflow"
assessmentHref: /readiness/workflow
coverImage: '~/assets/images/insights/giao-viec-cho-ai-theo-buoc-workflow/wfl-00-og-cover-vi.png'
ogImage: '~/assets/images/insights/giao-viec-cho-ai-theo-buoc-workflow/wfl-00-og-cover-vi.png'
coverImageAlt: "Câu hỏi thường gặp 'AI thay được ai' so với câu hỏi hữu ích 'bước nào nên giao cho AI'."
ctaPrimaryText: 'Workflow Readiness Assessment'
ctaSubtitle: 'Workflow của bạn đang vận hành như thế nào?'
draft: false
---

---

> **Tóm tắt cho COO/CIO**
>
> - Câu hỏi "AI có thay được vị trí này không" thường dẫn tới hai phản ứng cực đoan: lo sợ quá mức hoặc kỳ vọng phi thực tế. Câu hỏi hữu ích hơn: **bước nào trong workflow của vị trí này có thể giao cho AI, và bước nào nên ở lại với con người?**
> - Nghiên cứu của McKinsey Global Institute (2017) phân tích hoạt động cấu thành của hàng trăm nghề và kết luận rằng rất ít nghề có thể tự động hóa hoàn toàn, trong khi phần lớn nghề có một phần đáng kể hoạt động có tiềm năng tự động hóa về mặt kỹ thuật. Tự động hóa và AI nên được nhìn ở **cấp hoạt động (task), không phải cấp công việc (job)**.
> - "Giao việc cho AI" nên hiểu là **giao một bước**: diễn giải đầu vào hoặc chuẩn bị evidence cho bước đó. Nó không phải giao quyền quyết định. Quyết định vẫn thuộc về rule do người có thẩm quyền ban hành hoặc con người.
> - Một AI làm việc trong workflow nên được quản trị như một **participant**: có định danh riêng, phạm vi quyền hạn gắn với nhiệm vụ, dấu vết truy vết được và vòng đời quản lý được. Không phải bước nào cũng cần mức quản trị đầy đủ; nên áp dụng chọn lọc theo rủi ro.

---

## Mở đầu

Một doanh nghiệp sản xuất vừa và nhỏ đang thiếu người ở bộ phận công nợ. Tuyển dụng chậm và tốn kém. Giám đốc tài chính hỏi: "Có thể để AI làm thay vị trí kế toán công nợ không?"

Câu hỏi này gộp nhiều việc khác nhau vào một. Một kế toán công nợ không làm một việc; họ làm nhiều: đối chiếu hóa đơn, theo dõi công nợ quá hạn, nhắc khách hàng thanh toán, xử lý tranh chấp, lập báo cáo định kỳ. Mỗi việc có mức phù hợp với AI rất khác nhau. Đối chiếu hóa đơn là việc lặp lại, có chuẩn đúng sai. Xử lý một tranh chấp với khách hàng lâu năm là việc cần phán đoán và quan hệ.

(Đây là tình huống minh họa, không phải case của khách hàng cụ thể.)

---

## Hỏi ở cấp hoạt động, không ở cấp vị trí

Báo cáo *A Future That Works* của McKinsey Global Institute (2017) phân tích hơn hai nghìn hoạt động cấu thành trong hơn tám trăm nghề. Kết quả thường được trích: rất ít nghề, dưới 5%, có thể tự động hóa hoàn toàn bằng công nghệ khi đó đã được chứng minh; trong khi khoảng 60% nghề có ít nhất 30% hoạt động cấu thành có thể tự động hóa về mặt kỹ thuật. Cần đọc con số này đúng cách: đây là ước tính **tiềm năng kỹ thuật** của năm 2017, không phải dự báo về việc làm sẽ mất, và không nói gì về việc việc áp dụng có hợp lý về kinh tế hay tổ chức hay không.

Điều đáng giữ lại là kết luận về cách nhìn: **tự động hóa hiếm khi thay một công việc, nó thường thay đổi một phần của công việc đó.** Vì vậy phân tích nên đi từ công việc xuống các bước.

---

## Phân rã một vị trí thành các bước

![Vị trí kế toán công nợ tách thành các bước hoạt động; mỗi bước có mức phù hợp với AI rất khác nhau.](~/assets/images/insights/giao-viec-cho-ai-theo-buoc-workflow/wfl-01-role-to-steps-vi-dark.svg)

Lấy ví dụ minh họa vị trí kế toán công nợ. Bảng dưới là khung thảo luận, không phải đánh giá của một doanh nghiệp cụ thể.

| Hoạt động | Đặc điểm | AI có thể giúp ở mức | Người giữ |
|---|---|---|---|
| Đối chiếu hóa đơn với đơn hàng | Lặp lại, khối lượng lớn, đúng sai rõ | Diễn giải chứng từ, đối chiếu để rule chạy; ca lệch chuyển đi theo đường ngoại lệ | Xử lý ca lệch ngoài rule |
| Theo dõi công nợ quá hạn | Lặp lại, theo ngưỡng đã ban hành | Gom và tổng hợp, rule kích hoạt nhắc theo ngưỡng | Đặt ngưỡng, xử lý khách hàng đặc biệt |
| Nhắc khách hàng thanh toán | Theo mẫu, nhưng nhạy quan hệ | Soạn nháp theo bối cảnh | Duyệt và gửi với khách quan trọng |
| Xử lý tranh chấp | Cần phán đoán và quan hệ | Chuẩn bị hồ sơ, các ca tương tự | Quyết định và đàm phán |
| Báo cáo định kỳ | Lặp lại, tổng hợp | Tổng hợp số liệu có nguồn | Rà soát và ký |

Hàng nào cũng có phần AI giúp được, nhưng phần đó là **diễn giải đầu vào và chuẩn bị evidence**, không phải quyết định. Đó cũng là hai việc nêu ở bài [AI làm hai việc trong workflow](/insights/workflow/ai-tich-hop-vao-workflow).

---

## Ba đặc điểm của một bước phù hợp để giao

![Ba đặc điểm của bước phù hợp để giao cho AI: lặp lại nhiều, cần chuẩn bị thông tin trước khi quyết định, đúng sai kiểm chứng được.](~/assets/images/insights/giao-viec-cho-ai-theo-buoc-workflow/wfl-02-three-traits-vi-dark.svg)

**1. Lặp lại nhiều, khối lượng lớn.** Những bước xảy ra thường xuyên và tốn thời gian tích lũy, dù mỗi lần không phức tạp, là ứng viên tốt.

**2. Cần chuẩn bị hoặc tổng hợp thông tin trước khi con người quyết định.** AI chuẩn bị bối cảnh và dữ liệu liên quan, người tập trung vào phần cần phán đoán. Đây là phần giá trị rõ nhất, như bài [AI chuẩn bị evidence, con người quyết định](/insights/workflow/ai-chuan-bi-evidence-con-nguoi-quyet-dinh) phân tích.

**3. Đúng sai có thể định nghĩa và kiểm chứng.** Nếu có thể nói rõ bước đã làm đúng hay chưa, việc giao và kiểm tra dễ hơn nhiều so với bước mà "đúng" phụ thuộc vào quan hệ hoặc phán đoán tình huống.

Ngược lại, bước xây dựng quan hệ, đàm phán, hoặc phán đoán trong tình huống mơ hồ chưa có tiền lệ nên tiếp tục do con người đảm nhận. Đây là đánh giá hiện tại, có thể thay đổi, và việc thay đổi nên đi qua rà soát có chủ đích.

---

## "Giao việc" nghĩa là giao một bước, kèm một thẻ nhiệm vụ

![Thẻ nhiệm vụ bảy mục: mục tiêu, đầu vào, đầu ra, ai nhận, quyền hạn, khi nào dừng, ai chịu trách nhiệm.](~/assets/images/insights/giao-viec-cho-ai-theo-buoc-workflow/wfl-03-task-card-vi-dark.svg)

Để giao một bước cho AI mà không mất kiểm soát, mỗi bước nên có một **thẻ nhiệm vụ** ngắn, trả lời:

- **Mục tiêu của bước:** AI làm việc gì, trong phạm vi nào.
- **Đầu vào:** AI được đọc những gì.
- **Đầu ra:** dạng và nơi AI trả kết quả, kèm nguồn và độ chắc chắn.
- **Ai nhận đầu ra:** rule nào đọc, hoặc người nào xem.
- **Quyền hạn:** AI được và không được làm gì (xem bài [phân tách trách nhiệm cho AI trong workflow](/insights/workflow/phan-tach-trach-nhiem-ai-trong-workflow)).
- **Khi nào dừng và chuyển cho người:** ca không chắc chắn, thiếu thông tin, hay ngoài phạm vi.
- **Ai chịu trách nhiệm** về bước này và kiểm tra nó định kỳ.

Thẻ nhiệm vụ làm việc "giao" trở nên cụ thể và kiểm tra được. Nó cũng buộc tổ chức nói rõ bước đó có thật sự tách bạch khỏi các bước khác hay chưa.

---

## Quản trị AI như một participant, không chỉ như một công cụ

![AI participant khác công cụ ở bốn điểm: danh tính riêng, quyền gắn với nhiệm vụ, trách nhiệm truy vết được, vòng đời quản lý được.](~/assets/images/insights/giao-viec-cho-ai-theo-buoc-workflow/wfl-04-participant-vs-tool-vi-dark.svg)

Nhiều tổ chức dùng AI như một công cụ được gọi khi cần: gửi yêu cầu, nhận kết quả, xong. Với việc tóm tắt tài liệu để tham khảo, cách này đủ. Nhưng khi AI làm một bước trong quy trình, câu hỏi như "AI này đã làm gì, ở đâu, với quyền nào, trong ba tháng qua" cần có câu trả lời.

Ngành quản trị danh tính và quyền truy cập (IAM) đang hình thành khái niệm **danh tính phi con người** (non-human identity): coi agent là một danh tính có chủ sở hữu, mục đích và phạm vi quyền, được rà soát và thu hồi khi không còn cần, thay vì một khóa API dùng chung. Từ đó, bốn đặc điểm phân biệt một AI participant với một công cụ:

1. **Danh tính riêng, không dùng chung.** Gắn với một mục đích và phạm vi công việc cụ thể.
2. **Phạm vi quyền gắn với nhiệm vụ**, không rộng "phòng khi cần".
3. **Trách nhiệm truy vết được** tới danh tính đó: kết quả nào do participant nào tạo, với dữ liệu và quyền nào.
4. **Vòng đời quản lý được:** cấp quyền khi tham gia, giám sát, thu hồi khi vai trò kết thúc.

Ví dụ minh họa trong quy trình QC: một AI participant được giao rà soát dữ liệu đo từ một công đoạn để phát hiện xu hướng bất thường. Nó chỉ có quyền đọc dữ liệu công đoạn đó, không sửa được dữ liệu gốc, và không tự dừng sản xuất. Mỗi lần rà soát được ghi lại: dữ liệu nào, ngưỡng hoặc mẫu hình nào, vì sao cảnh báo. Quyết định dừng thuộc về người có thẩm quyền hoặc một rule do họ ban hành. Khi công đoạn đó ngừng, quyền của participant bị thu hồi.

Khác biệt ở đây không phải AI "thông minh hơn", mà là cả hoạt động được quản trị và kiểm chứng được, phù hợp với yêu cầu của hệ thống ISO/GMP.

---

## Ba điều kiện để một bước giao cho AI chạy được

**1. Bước đó tách bạch rõ khỏi các bước khác.** Phải biết AI chuẩn bị gì, ai quyết định, ai thực thi, để ranh giới trách nhiệm không nhòe.

**2. Có đủ dữ liệu lịch sử hoặc quy tắc rõ ràng** để AI làm việc đáng tin. Nếu bước còn nằm ở vùng "cần phán đoán nhiều", nên giám sát chặt hơn hoặc chưa triển khai.

**3. Có quản trị danh tính và quyền** như mô tả ở trên, ở mức tương xứng với rủi ro.

Thiếu một trong ba, việc giao thường tạo thêm rủi ro vận hành hơn là giá trị, dù về kỹ thuật mô hình AI có thể làm việc đó.

Khi nào không cần mức quản trị đầy đủ? Với tác vụ rủi ro thấp, không ảnh hưởng quyết định vận hành, như tóm tắt tài liệu để tham khảo, mô hình công cụ đơn giản vẫn hợp lý. Mức quản trị đầy đủ nên dành cho các vai AI chạy liên tục, có ảnh hưởng đến quyết định thực tế, hoặc cần giải trình với tổ chức đánh giá (ISO, GMP). Xây hạ tầng quản trị như vậy tốn đầu tư hơn nhiều so với việc gọi API đơn giản, nên cần chọn lọc.

---

## Hỗ trợ và thay thế: ranh giới phải được thiết kế

Câu hỏi nhiều lãnh đạo quan tâm: cuối cùng việc này có làm mất việc của nhân viên không?

Trả lời trung thực: tác động phụ thuộc vào **tỷ lệ hoạt động trong một vị trí được giao cho AI**, không phải một câu có hoặc không cho cả vị trí. Giả sử, ở mức minh họa, một vị trí có phần lớn hoạt động thuộc loại lặp lại và đúng sai rõ, và AI đảm nhận phần lớn đó. Khi ấy vai trò của người ở vị trí này đổi đáng kể, dồn vào phần cần phán đoán, quan hệ và xử lý ngoại lệ. Có thể gọi đó là tái cấu trúc vị trí quanh phần việc con người làm tốt nhất. Nó cũng có thể kéo theo thay đổi về số người cần cho khối lượng công việc đó; không nên trình bày điều này như thể không có tác động.

Điều quan trọng là ranh giới này được **thiết kế có chủ đích**: hoạt động nào giao, hoạt động nào giữ lại, vì sao, và nhân viên liên quan được tham gia vào quá trình. Nếu không, ranh giới sẽ hình thành ngẫu nhiên qua những lần triển khai công cụ AI rời rạc.

---

## Nên bắt đầu từ đâu

1. **Chọn một vị trí** có khối lượng lớn hoặc đang thiếu người, và liệt kê các hoạt động cấu thành cùng với người đang làm.
2. **Đánh giá từng hoạt động** theo ba đặc điểm: lặp lại, cần chuẩn bị thông tin, đúng sai kiểm chứng được.
3. **Chọn một bước** có điểm cao nhất và rủi ro vừa phải. Viết thẻ nhiệm vụ cho bước đó.
4. **Cấp quyền tối thiểu** và đặt người chịu trách nhiệm kiểm tra định kỳ.
5. **Chạy song song vài chu kỳ**, đo thời gian xử lý, tỷ lệ ca phải chuyển cho người và tỷ lệ kết quả bị sửa, rồi mới quyết định mở rộng.

---

## Tự kiểm tra

1. Bạn đang hỏi "AI thay vị trí nào" hay "bước nào của vị trí này nên giao cho AI"?
2. Với bước định giao, bạn có viết được thẻ nhiệm vụ gồm đầu vào, đầu ra, quyền hạn, điểm dừng và người chịu trách nhiệm không?
3. AI đang dùng danh tính riêng hay khóa dùng chung?
4. Quyền của AI có rộng hơn nhiệm vụ của nó không?
5. Bạn có trả lời được "AI này đã làm gì trong ba tháng qua" không?
6. Nhân viên đang làm các bước này có được tham gia vào quyết định giao việc không?

Nếu từ ba câu trở lên khiến bạn do dự, nên hoàn thiện thẻ nhiệm vụ và quản trị quyền trước khi mở rộng.

---

## Kết luận

Hỏi "bước nào trong workflow có thể giao cho AI" hữu ích hơn hỏi "AI thay được ai". Giao việc ở đây có nghĩa giao một bước — diễn giải đầu vào hoặc chuẩn bị evidence — chứ không giao quyền quyết định. Muốn giao có kiểm soát, bước phải tách bạch, AI phải được quản trị như một participant với danh tính, quyền và dấu vết riêng, và ranh giới giữa phần AI làm với phần người giữ phải được thiết kế có chủ đích.

Với nhiều doanh nghiệp sản xuất vừa và nhỏ thiếu nguồn lực, đây là cách thực tế để mở rộng năng lực xử lý công việc mà không đánh đổi bằng việc mất kiểm soát vận hành.

Digitalization Readiness Assessment của OKELAS giúp xác định quy trình nào của bạn đã đủ rõ ràng để bắt đầu giao từng bước.

---

## Nguồn

- McKinsey Global Institute (2017). *A Future That Works: Automation, Employment, and Productivity*.
- Parasuraman, R., Sheridan, T. B., & Wickens, C. D. (2000). A model for types and levels of human interaction with automation. *IEEE Transactions on Systems, Man, and Cybernetics – Part A*, 30(3), 286–297.
- Committee of Sponsoring Organizations of the Treadway Commission, COSO (2013). *Internal Control – Integrated Framework*.

## Bài liên quan

- [Phân tách trách nhiệm cho AI trong workflow: ai diễn giải, ai quyết định, ai thực thi, ai ghi nhận](/insights/workflow/phan-tach-trach-nhiem-ai-trong-workflow)
- [AI chuẩn bị evidence, con người quyết định: thế nào là một bộ hồ sơ tốt](/insights/workflow/ai-chuan-bi-evidence-con-nguoi-quyet-dinh)
- [Khi workflow biết context của tổ chức](/insights/workflow/workflow-biet-context-to-chuc)
- [AI làm hai việc trong workflow: diễn giải đầu vào và chuẩn bị evidence](/insights/workflow/ai-tich-hop-vao-workflow)
