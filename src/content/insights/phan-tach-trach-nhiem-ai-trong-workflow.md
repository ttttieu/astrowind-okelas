---
title: "Phân tách trách nhiệm cho AI trong workflow: ai diễn giải, ai quyết định, ai thực thi, ai ghi nhận"
description: "Khi AI agent và workflow cùng vận hành, câu hỏi quản trị đầu tiên là ai quyết định và ai thực thi. Bài này áp nguyên tắc phân tách nhiệm vụ của kiểm soát nội bộ vào thiết kế workflow có AI: bốn vai tách biệt, ba câu hỏi cho mỗi loại hành động, và giới hạn kỹ thuật cần đặt cho agent."
publishDate: 2026-10-06T00:00:00Z
translationId: article-5-17-separation-of-duties-workflow
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
primaryKeyword: "phân tách trách nhiệm AI workflow"
secondaryKeywords:
  - "segregation of duties AI"
  - "kiểm soát nội bộ AI workflow"
  - "phân tách nhiệm vụ workflow"
  - "AI agent quản trị rủi ro"
  - "COSO workflow AI"
assessmentHref: /readiness/digitalization
coverImage: '~/assets/images/insights/phan-tach-trach-nhiem-ai-trong-workflow/wfm-00-og-cover-vi.png'
ogImage: '~/assets/images/insights/phan-tach-trach-nhiem-ai-trong-workflow/wfm-00-og-cover-vi.png'
coverImageAlt: "Gộp vai so với tách vai trong workflow có AI: khi một thực thể làm cả bốn vai, kiểm soát mất tác dụng."
draft: false
---

---

> **Tóm tắt cho COO/CIO**
>
> - Khi AI agent làm việc trong workflow, câu hỏi quản trị đầu tiên không phải "agent giỏi đến đâu" mà là **ai quyết định, ai thực thi, ai ghi nhận**. Nếu một thực thể, người hay AI, cùng làm cả ba, các kiểm soát của bạn mất tác dụng.
> - Nguyên tắc **phân tách nhiệm vụ** (segregation of duties) là một nguyên tắc nền của kiểm soát nội bộ, được khuôn khổ COSO về kiểm soát nội bộ mô tả. Nó áp dụng cho AI như áp dụng cho nhân viên: người khởi tạo, người phê duyệt, người thực hiện và người ghi sổ không nên là một.
> - Với workflow có AI, có thể tách thành bốn vai: **AI diễn giải đầu vào và chuẩn bị evidence; rule do người có thẩm quyền ban hành, hoặc con người, quyết định; hệ thống thực thi khi rule cho phép; workflow ghi nhận toàn bộ dấu vết**. Bên ngoài bốn vai này còn một vai: người có thẩm quyền ban hành và sửa rule.
> - Phân tách phải được thực thi bằng **quyền truy cập kỹ thuật**, không chỉ bằng lời dặn. Agent không nên có quyền tự thực hiện hành động cần quyết định độc lập, không tự phê duyệt đầu ra của mình, và không sửa được rule hay nhật ký.

---

## Mở đầu

Một doanh nghiệp cho AI agent đọc email nhà cung cấp. Một ngày, email báo đổi tài khoản ngân hàng. Agent đọc, thấy hợp lý, cập nhật dữ liệu chủ nhà cung cấp, rồi vì lệnh thanh toán đang chờ, nó cũng chuyển tiền theo tài khoản mới. Mọi bước diễn ra trong vài giây, mỗi bước đều có vẻ hợp lý khi nhìn riêng.

Không ai trong chuỗi này kiểm tra email có thật không. Không có ai độc lập xác nhận thay đổi dữ liệu chủ. Không có ai chặn thanh toán. Cùng một thực thể đã khởi tạo, phê duyệt, thực hiện và ghi nhận. Vấn đề không nằm ở việc agent "thông minh" hay không, mà ở việc quy trình đã bỏ một nguyên tắc kiểm soát cơ bản.

(Đây là tình huống minh họa, không phải case của khách hàng cụ thể.)

![Tình huống đổi tài khoản nhà cung cấp: một agent gộp vai làm cả chuỗi khởi tạo–phê duyệt–thực thi–ghi nhận so với mỗi vai một chủ thể độc lập.](~/assets/images/insights/phan-tach-trach-nhiem-ai-trong-workflow/wfm-01-merged-vs-separated-vi-dark.svg)

---

## Nguyên tắc phân tách nhiệm vụ

Trong kiểm soát nội bộ, phân tách nhiệm vụ là nguyên tắc chia các hoạt động quan trọng của một giao dịch cho những người khác nhau, để một sai sót hay gian lận khó xảy ra mà không bị người khác phát hiện. Khuôn khổ kiểm soát nội bộ COSO (2013) xếp nó trong các hoạt động kiểm soát, và nguyên tắc này đã quen thuộc trong kế toán, tài chính và mua hàng từ lâu.

Điểm cần nhớ: nguyên tắc không phụ thuộc vào việc thực thể làm việc là người hay máy. Một AI agent có thể khởi tạo, phê duyệt và thực hiện trong vài giây không làm nguyên tắc này lỗi thời. Nó làm nguyên tắc này quan trọng hơn, vì tốc độ khiến một sai sót lan đi trước khi ai kịp nhìn.

Hai quan niệm thường gặp cần tránh:

- **"Agent đủ tốt thì không cần tách."** Độ chính xác trung bình không thay thế được kiểm soát độc lập. Kiểm soát có mặt chính là để bắt những ca mà thực thể làm việc sai mà không biết mình sai.
- **"Có người bấm duyệt là đã tách."** Nếu người duyệt chỉ thấy một nút mà không thấy evidence, hoặc luôn duyệt theo đề xuất, sự tách biệt chỉ còn trên giấy.

---

## Bốn vai trong workflow có AI

![Bốn vai trong workflow có AI và người ban hành rule; cột "không được làm" của mỗi vai.](~/assets/images/insights/phan-tach-trach-nhiem-ai-trong-workflow/wfm-02-four-roles-vi-dark.svg)

| Vai | Ai hoặc cái gì đảm nhận | Việc làm | Không được làm |
|---|---|---|---|
| Diễn giải và chuẩn bị | AI | Đọc đầu vào phi cấu trúc, gán loại, tìm và gom evidence, nêu nguồn và độ chắc chắn | Phê duyệt; thực thi; tự coi đầu ra của mình là quyết định |
| Quyết định | Rule do người có thẩm quyền ban hành, hoặc con người | Xác nhận một hành động nằm trong thẩm quyền; phán đoán ca ngoài rule | Do chính thực thể thực thi tự đảm nhận |
| Thực thi | Hệ thống, theo quyền đã cấp | Thực hiện hành động đã được cho phép | Tự mở rộng quyền; thực hiện khi chưa có quyết định hợp lệ |
| Ghi nhận | Workflow | Lưu dấu vết: ai quyết định, thấy evidence nào, vì sao, khi nào | Do thực thể thực thi tự sửa hoặc xóa |

Bên ngoài bốn vai trên là **người ban hành rule**. Người này quyết định rule nào tồn tại, áp dụng đến đâu, và sửa khi nào. Việc sửa rule không thuộc về AI hay hệ thống thực thi, như bài [xử lý ngoại lệ trong workflow](/insights/workflow/xu-ly-ngoai-le-trong-workflow) đã mô tả.

Cách chia này khớp với hai việc AI làm được ở bài [AI làm hai việc trong workflow](/insights/workflow/ai-tich-hop-vao-workflow): diễn giải đầu vào và chuẩn bị evidence. Hai việc đó thuộc vai thứ nhất. Chúng không bao gồm quyết định hay thực thi.

---

## Ba câu hỏi workflow phải trả lời cho mỗi loại hành động

![Ba câu hỏi cho mỗi loại hành động: cần quyết định độc lập không, thế nào là quyết định hợp lệ, ai thực thi sau quyết định.](~/assets/images/insights/phan-tach-trach-nhiem-ai-trong-workflow/wfm-03-three-questions-vi-dark.svg)

Phân tách không áp một lần cho cả hệ thống. Nó được quyết định cho từng loại hành động, bằng ba câu hỏi:

**1. Hành động này có cần quyết định độc lập không?** Hành động có hậu quả lớn, khó đảo ngược, hoặc đụng đến tiền, dữ liệu chủ, tuân thủ thường cần. Hành động nhỏ, đảo ngược được, nằm trong phạm vi rule rõ ràng có thể chạy theo rule do người có thẩm quyền ban hành.

**2. Thế nào là một quyết định hợp lệ?** Một cú bấm "đồng ý" không kèm evidence có phải quyết định không? Im lặng sau một thời hạn có tính là chấp thuận không? Tối thiểu, một quyết định hợp lệ có người có thẩm quyền, evidence họ đã thấy, lý do, và thời điểm. Im lặng không phải chấp thuận.

**3. Ai thực thi sau khi quyết định?** Thực thể thực thi nên tách về kỹ thuật với thực thể đã chuẩn bị hồ sơ. Agent chuẩn bị evidence không nên là thực thể giữ thông tin xác thực để thực hiện hành động.

Hai câu hỏi đầu thuộc về thiết kế quy trình. Câu thứ ba thuộc về thiết kế quyền truy cập, và là chỗ nguyên tắc dễ bị bỏ qua nhất.

---

## Thực thi phân tách bằng quyền truy cập

![Những gì agent được và không được có quyền truy cập kỹ thuật để làm.](~/assets/images/insights/phan-tach-trach-nhiem-ai-trong-workflow/wfm-04-access-controls-vi-dark.svg)

Lời dặn "agent không được tự duyệt" không bảo vệ được gì nếu agent có quyền kỹ thuật để duyệt. Một số hướng thiết kế thường gặp:

- **Quyền tối thiểu.** Agent diễn giải và chuẩn bị evidence chỉ cần quyền đọc nguồn evidence và ghi kết quả vào hồ sơ, không có quyền ghi vào hệ thống nghiệp vụ.
- **Thông tin xác thực riêng cho từng vai.** Thực thể thực thi dùng thông tin xác thực khác với agent chuẩn bị hồ sơ.
- **Agent không tự phê duyệt đầu ra của mình.** Nếu agent là một phần của luồng phê duyệt, quyết định vẫn do rule hoặc người độc lập đưa ra.
- **Agent không sửa được rule và nhật ký.** Hai thứ này là nền của kiểm soát. Người ban hành rule và hệ thống ghi nhận phải nằm ngoài phạm vi quyền của agent.
- **Đầu ra của AI được gắn nhãn là chuẩn bị, không phải kết quả đã duyệt.** Người xem nhận ra ngay thứ họ đang xem là gì.

Những hướng trên là thực hành thiết kế quen thuộc trong kiểm soát nội bộ, được áp vào bối cảnh AI. Mức độ chặt cần tùy vào rủi ro của từng quy trình.

---

## Tốc độ không phải lý do để nhập các vai lại

Lập luận phổ biến để gộp vai là tốc độ: nếu tách, quy trình chậm đi. Có hai điều cần cân nhắc.

Thứ nhất, không phải mọi hành động đều cần tách như nhau. Phân tách chặt chỉ cần cho hành động rủi ro cao. Hành động rủi ro thấp, đảo ngược được, trong phạm vi rule rõ ràng có thể được chạy tự động mà vẫn đúng nguyên tắc, vì quyết định đã được người có thẩm quyền đưa ra từ trước, ở dạng rule.

Thứ hai, tách vai không đồng nghĩa với chậm. Khi evidence do AI chuẩn bị tốt, người quyết định tốn ít thời gian hơn, như bài [AI chuẩn bị evidence, con người quyết định](/insights/workflow/ai-chuan-bi-evidence-con-nguoi-quyet-dinh) mô tả. Phần tiết kiệm đến từ việc chuẩn bị, không từ việc bỏ kiểm soát.

---

## Những sai lầm thường gặp

- **Một "agent toàn năng".** Một agent đọc, quyết định, thực hiện và ghi cùng lúc là điểm hỏng duy nhất của cả quy trình.
- **Phê duyệt hình thức.** Người duyệt không thấy evidence, hoặc áp lực khiến họ luôn đồng ý.
- **Nhật ký do chính thực thể thực thi ghi và sửa được.** Dấu vết như vậy không đáng tin.
- **Rule bị sửa tự động.** Hệ thống thấy một rule "không phù hợp" và tự điều chỉnh. Đó là chuyển quyền ban hành rule cho hệ thống.
- **Coi bước kiểm tra của AI là kiểm soát độc lập.** AI kiểm tra đầu ra của một AI khác có thể hữu ích như một lớp lọc, nhưng nó không thay thế người hay rule có thẩm quyền.

---

## Nên bắt đầu từ đâu

1. **Lập danh sách hành động** trong quy trình có AI tham gia, ưu tiên những hành động đụng đến tiền, dữ liệu chủ, tuân thủ, hoặc khó đảo ngược.
2. **Lập ma trận hành động × vai**: với mỗi hành động, ai (hay cái gì) khởi tạo, quyết định, thực thi, ghi nhận. Nếu một ô trống hay một thực thể đảm nhận ba ô, đó là chỗ cần xem xét.
3. **Kiểm tra quyền truy cập thực tế** của agent so với ma trận. Quyền thực tế thường rộng hơn quyền dự định.
4. **Định nghĩa quyết định hợp lệ** cho từng loại hành động rủi ro cao.
5. **Kiểm tra định kỳ**: lấy mẫu để xem phân tách có còn được giữ trong vận hành thực tế không.

---

## Tự kiểm tra

1. Có hành động nào trong quy trình của bạn mà cùng một thực thể, người hay AI, khởi tạo, phê duyệt và thực hiện không?
2. Người duyệt có thấy evidence trước khi duyệt, hay chỉ thấy một nút?
3. Quyền kỹ thuật thực tế của agent có rộng hơn quyền bạn dự định không?
4. Nhật ký có được ghi và bảo vệ độc lập với thực thể thực thi không?
5. Ai được sửa rule, và agent có đường nào để sửa chúng không?
6. Im lặng sau một thời hạn có đang được tính là chấp thuận ở đâu đó không?

Nếu từ ba câu trở lên khiến bạn do dự, nên rà soát phân tách vai trước khi mở rộng phạm vi của agent.

---

## Kết luận

Đưa AI vào workflow không làm mất nhu cầu phân tách nhiệm vụ; nó làm nhu cầu đó rõ hơn, vì tốc độ của AI rút ngắn thời gian để một sai sót lan. Một thiết kế an toàn là thiết kế mà AI làm tốt phần việc của mình — diễn giải và chuẩn bị evidence — trong khi quyết định thuộc về rule do người có thẩm quyền ban hành hoặc con người, thực thi do hệ thống đảm nhận theo quyền đã cấp, và dấu vết do workflow ghi lại độc lập.

Câu hỏi để giữ trong đầu khi đánh giá bất kỳ đề xuất nào về AI agent: **ai quyết định, ai thực thi, ai ghi nhận, và có thể nào là cùng một thực thể không?**

---

## Nguồn

- Committee of Sponsoring Organizations of the Treadway Commission, COSO (2013). *Internal Control – Integrated Framework*.
- Parasuraman, R., Sheridan, T. B., & Wickens, C. D. (2000). A model for types and levels of human interaction with automation. *IEEE Transactions on Systems, Man, and Cybernetics – Part A*, 30(3), 286–297.

## Bài liên quan

- [AI chuẩn bị evidence, con người quyết định: thế nào là một bộ hồ sơ tốt](/insights/workflow/ai-chuan-bi-evidence-con-nguoi-quyet-dinh)
- [Khi workflow biết context của tổ chức](/insights/workflow/workflow-biet-context-to-chuc)
- [Xử lý ngoại lệ trong workflow: khi quyết định không có rule sẵn](/insights/workflow/xu-ly-ngoai-le-trong-workflow)
- [AI làm hai việc trong workflow: diễn giải đầu vào và chuẩn bị evidence](/insights/workflow/ai-tich-hop-vao-workflow)
