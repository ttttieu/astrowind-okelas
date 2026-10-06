---
title: "Phân loại và định tuyến trong workflow: AI hiểu nội dung, rule quyết định tuyến"
description: "Rule từ khóa định tuyến sai khi người viết diễn đạt khác dự đoán. AI có thể đọc nội dung để đề xuất loại yêu cầu, nhưng tuyến đi vẫn do rule của người có thẩm quyền quyết định, và ca không chắc chắn phải đến người phân loại. Bài này phân tích cách thiết kế để giảm số lần chuyển tay mà không chuyển quyền quyết định cho AI."
publishDate: 2026-10-06T00:00:00Z
translationId: article-5-14-classification-routing-workflow
lang: vi
category: workflow
contentType: Analysis
funnelStage:
  - Understanding
audience:
  - COO
  - CIO
  - Operations Director
primaryKeyword: "phân loại và định tuyến trong workflow"
secondaryKeywords:
  - "content-based router workflow"
  - "AI định tuyến yêu cầu"
  - "phân loại yêu cầu workflow"
  - "workflow AI classification"
  - "routing rule workflow"
assessmentHref: /readiness/digitalization
coverImage: '~/assets/images/insights/workflow-tu-phan-loai-dinh-tuyen/wfc-00-og-cover-vi.png'
ogImage: '~/assets/images/insights/workflow-tu-phan-loai-dinh-tuyen/wfc-00-og-cover-vi.png'
coverImageAlt: "Rule từ khóa định tuyến sai khi ngôn ngữ không khớp; AI đọc ý định và đề xuất loại yêu cầu, bảng tuyến do người có thẩm quyền ban hành quyết định tuyến đi."
draft: false
---

---

> **Tóm tắt cho COO/CIO**
>
> - Phần lớn hệ thống định tuyến hiện nay dùng rule từ khóa: tiêu đề có "hoàn tiền" thì chuyển phòng chăm sóc khách hàng. Mẫu thiết kế này, Content-Based Router, đã được Hohpe và Woolf mô tả từ năm 2003 trong *Enterprise Integration Patterns*. Nó nhanh và dễ kiểm tra, nhưng chỉ đúng khi người viết diễn đạt đúng như rule dự đoán.
> - **Phân loại và định tuyến là hai việc khác nhau.** Phân loại là hiểu nội dung: đây là yêu cầu loại gì. Định tuyến là một quyết định: loại này đi tới ai. AI giúp được ở việc thứ nhất. Việc thứ hai vẫn là rule do người có thẩm quyền ban hành, hoặc con người.
> - Thiết kế hợp lý: AI đề xuất loại kèm mức độ chắc chắn và đoạn nội dung làm căn cứ; **bảng tuyến** do người có thẩm quyền ban hành quyết định đi đâu; ca không chắc chắn hoặc nhiều vấn đề đi tới người phân loại, không bị ép vào một danh mục.
> - Giá trị lớn nhất không phải phân loại nhanh hơn, mà là **giảm số lần một yêu cầu bị đọc và chuyển tay** trước khi tới đúng người, trong khi vẫn biết ai chịu trách nhiệm về mỗi tuyến.

---

## Mở đầu

Một khách hàng viết: "Tôi thanh toán xong mà vẫn không vào được tài khoản." Rule định tuyến đang tìm từ "hoàn tiền" và "hóa đơn", không thấy từ nào, nên yêu cầu rơi vào hộp thư chung. Một nhân viên đọc, nhận ra đây là lỗi kích hoạt sau thanh toán, chuyển cho kỹ thuật. Kỹ thuật đọc lại, thấy cần kiểm tra giao dịch, chuyển sang kế toán. Ba lần đọc, ba lần chuyển tay, và không ai trong chuỗi đó sai.

Đề xuất quen thuộc là để AI "tự phân loại và định tuyến". Đề xuất này đúng một nửa. AI đọc được câu viết tự do. Nhưng việc chọn tuyến là một quyết định có hậu quả, và câu hỏi "ai chịu trách nhiệm khi tuyến sai" cần có câu trả lời trước khi chọn công nghệ. Bài này tách hai việc đó.

(Đây là tình huống minh họa, không phải case của khách hàng cụ thể.)

---

## Rule từ khóa: ưu điểm và giới hạn

![Chuỗi chuyển tay khi rule không nhận ra ý định — so với AI đề xuất loại yêu cầu, bảng tuyến đưa tới đúng người sau ít lần chuyển tay hơn.](~/assets/images/insights/workflow-tu-phan-loai-dinh-tuyen/wfc-01-from-handoffs-to-right-person-vi-dark.svg)

Content-Based Router, theo Hohpe và Woolf (2003), định tuyến thông điệp tới đích dựa trên nội dung của nó theo tiêu chí đặt trước. Ưu điểm rõ: nhanh, dễ hiểu, dễ kiểm tra, và mỗi rule có người đứng tên.

Giới hạn xuất phát từ chính bản chất của rule: nó chỉ đúng khi nội dung khớp với điều đã dự đoán. Trong thực tế:

- **Cùng một vấn đề, nhiều cách diễn đạt.** "Không vào được tài khoản sau khi thanh toán" và "tôi muốn lấy lại tiền" có thể cần cùng một xử lý, nhưng không có từ khóa chung.
- **Một yêu cầu chứa nhiều vấn đề.** Rule buộc phải chọn một tiêu chí, và việc chọn đó có phần tùy tiện.
- **Ngôn ngữ thay đổi theo thời gian.** Sản phẩm mới, thuật ngữ nội bộ mới làm rule lỗi thời, nếu không ai chủ động cập nhật.

Rule không sai ngẫu nhiên. Nó sai có hệ thống: đúng với kịch bản đã dự đoán, sai ở mọi biến thể khác. Duy trì bộ rule vì thế là công việc liên tục, luôn chạy sau thực tế.

---

## Tách hai việc: phân loại và định tuyến

![Luồng hai tầng: yêu cầu → AI đề xuất loại (tầng hiểu) → bảng tuyến và ngưỡng (tầng tuyến) → người nhận hoặc người phân loại.](~/assets/images/insights/workflow-tu-phan-loai-dinh-tuyen/wfc-02-classify-then-route-vi-dark.svg)

Cách sửa tự nhiên là để AI đọc nội dung thay cho việc khớp từ khóa. Điều này đúng, với điều kiện giữ ranh giới như bài [AI làm hai việc trong workflow](/insights/workflow/ai-tich-hop-vao-workflow) đã nêu: AI diễn giải đầu vào để rule chạy được, và chuẩn bị evidence để con người phán đoán.

Áp vào định tuyến, hai việc nằm ở hai tầng:

| Tầng | Việc | Ai làm | Có quyền quyết định không |
|---|---|---|---|
| Hiểu | Đọc nội dung, đề xuất loại yêu cầu, nêu mức độ chắc chắn và đoạn căn cứ | AI | Không |
| Tuyến | Với loại X, chuyển tới ai, trong thời hạn nào | Bảng tuyến do người có thẩm quyền ban hành | Có, trong phạm vi bảng tuyến |
| Ngoại lệ | Ca không chắc chắn, nhiều vấn đề, hoặc loại chưa có trong bảng | Người phân loại, kèm hồ sơ | Có |

Điểm khác biệt so với cách nói "AI tự định tuyến": AI không chọn người nhận. Nó cho ra một nhãn có thể kiểm chứng. Nhãn đó đi vào bảng tuyến, và bảng tuyến là thứ có chủ sở hữu, có phiên bản và có thể rà soát.

---

## AI đọc nội dung như thế nào, và nó trả về gì

Thay vì tìm từ khóa, AI đọc toàn bộ nội dung để nhận diện **ý định** (intent), bất kể ý định đó được diễn đạt bằng từ ngữ nào. Với yêu cầu ở phần mở đầu, nó có thể nhận ra rằng lỗi truy cập sau thanh toán thuộc cùng nhóm với yêu cầu hoàn tiền, dù hai câu không chia sẻ từ nào.

Kết quả hữu ích khi nó có bốn thành phần:

1. **Loại đề xuất**, lấy từ danh mục mà tổ chức đã định nghĩa, không phải nhãn AI tự sáng tạo.
2. **Mức độ chắc chắn**, để rule biết khi nào nên dừng.
3. **Đoạn nội dung làm căn cứ**, để người xem biết AI dựa vào đâu.
4. **Cờ nhiều vấn đề**, khi yêu cầu chứa nhiều hơn một việc, để tách thay vì chọn một.

AI vẫn có thể phân loại sai, nhất là với yêu cầu thực sự mơ hồ hoặc chưa từng gặp. Khác biệt không nằm ở chỗ nó không sai, mà ở chỗ sai của nó bị kiểm soát: nhãn sai chỉ có tác động khi bảng tuyến cho phép, và bảng tuyến có thể được thiết kế để dừng ở những ca không chắc chắn.

---

## Bảng tuyến và ngưỡng: phần do con người ban hành

![Bốn thành phần AI trả về vs ba quyết định con người ban hành — khung định hướng để thiết kế tầng hiểu và tầng tuyến.](~/assets/images/insights/workflow-tu-phan-loai-dinh-tuyen/wfc-03-ai-returns-people-issue-vi-dark.svg)

Ba quyết định sau không thuộc về AI. Chúng thuộc về người có thẩm quyền, và cần được ghi lại như một rule:

- **Loại nào đi tới ai**, kèm người thay thế khi vắng và thời hạn xử lý.
- **Ngưỡng chắc chắn**: dưới mức nào thì ca đi tới người phân loại thay vì đi thẳng theo bảng tuyến. Không có ngưỡng chung cho mọi doanh nghiệp; ngưỡng phụ thuộc vào cái giá của việc chuyển sai trong quy trình cụ thể.
- **Loại nào không bao giờ tự động chuyển**, dù AI rất chắc chắn, vì hậu quả của việc chuyển sai là lớn hoặc khó đảo ngược.

Có thể thấy đây là cùng một logic với [xử lý ngoại lệ trong workflow](/insights/workflow/xu-ly-ngoai-le-trong-workflow): ca nằm ngoài những gì rule cho phép tự chạy phải đi tới một người cụ thể, kèm hồ sơ, và quyết định được ghi lại.

---

## Đề xuất bước tiếp theo: giữ ở mức hồ sơ, không ở mức quyết định

![Gợi ý ở mức hồ sơ (tiền lệ có thể tra cứu) vs ba dấu hiệu gợi ý đã thành quyết định ngầm.](~/assets/images/insights/workflow-tu-phan-loai-dinh-tuyen/wfc-04-suggestion-as-file-vi-dark.svg)

Sau phân loại, người ta thường muốn hệ thống gợi ý luôn cách xử lý. Ở mức hồ sơ, điều này hữu ích: khi yêu cầu mới tương đồng với các ca đã xử lý, hệ thống có thể trình ra **các ca tương tự, cách chúng được xử lý và kết quả**, kèm đường dẫn tới ca gốc. Người xử lý bắt đầu từ bối cảnh thay vì từ đầu, đúng với việc "chuẩn bị evidence".

Điều cần tránh là biến gợi ý thành quyết định ngầm. Có ba dấu hiệu của việc này:

- gợi ý được trình bày như một đáp án thay vì như một tiền lệ để tham khảo;
- người xử lý chấp nhận gợi ý mặc định, không còn xem hồ sơ;
- không ai theo dõi tỷ lệ gợi ý bị sửa.

Một nguyên tắc đơn giản: mọi gợi ý đều đi kèm nguồn, tức là ca nào đã xảy ra, và người cuối cùng ký xử lý vẫn là người xử lý.

---

## Bốn tình huống áp dụng

Các ví dụ sau là minh họa về cách phân tầng, không phải kết quả đo từ doanh nghiệp cụ thể.

**Khiếu nại khách hàng.** AI đề xuất nhóm (chất lượng, giao hàng, thanh toán) và trích đoạn căn cứ. Bảng tuyến chuyển đến bộ phận tương ứng. Khiếu nại nhắc đến an toàn hoặc pháp lý luôn đi tới người được chỉ định, bất kể mức chắc chắn.

**Yêu cầu hỗ trợ nội bộ.** Một yêu cầu từ sản xuất có thể liên quan IT, bảo trì, hoặc cả hai. AI gắn cờ nhiều vấn đề, và người phân loại quyết định tách thành hai yêu cầu hay giữ một.

**Email từ nhà cung cấp.** Xác nhận đơn hàng, thông báo trễ giao, yêu cầu đổi giá là ba loại cần ba người. AI đọc email tự do để đề xuất loại; rule chuyển theo bảng tuyến; email đổi giá đi tới người có thẩm quyền về giá.

**Báo cáo sự cố thiết bị.** Vận hành viên mô tả triệu chứng bằng ngôn ngữ tự do ("máy kêu lạ, chạy chậm hơn bình thường"). AI trình các sự cố tương tự trong lịch sử làm hồ sơ cho kỹ thuật viên. Kỹ thuật viên vẫn là người kết luận loại lỗi.

---

## Cách biết hệ thống đang hoạt động đúng

Chỉ tin vào độ chính xác trung bình là chưa đủ. Nên theo dõi ba điều, bằng cách lấy mẫu định kỳ trong chính quy trình của bạn:

- **Tỷ lệ chuyển sai tuyến**, tức ca phải chuyển lại sau khi đã tới người nhận.
- **Số lần một yêu cầu bị đọc và chuyển tay** trước khi tới đúng người, so với trước khi dùng AI.
- **Tỷ lệ ca bị dừng ở ngưỡng chắc chắn** và thời gian người phân loại xử lý chúng.

Con số nào là chấp nhận được phụ thuộc vào cái giá của việc chuyển sai trong từng quy trình. Nên đặt mốc từ dữ liệu của chính bạn, trước và sau khi đưa AI vào.

---

## Tự kiểm tra

1. Bảng tuyến của bạn có chủ sở hữu và phiên bản không, hay là tập hợp thói quen của người nhận thư?
2. Khi yêu cầu không khớp rule nào, ca đó đi đâu, và ai chịu trách nhiệm về nó?
3. Yêu cầu chứa nhiều vấn đề hiện được xử lý thế nào: bị ép vào một danh mục, hay tách ra?
4. Bạn có loại yêu cầu nào mà việc chuyển sai gây hậu quả lớn đến mức không nên để chuyển tự động?
5. Nếu AI phân loại sai, bạn có cách phát hiện sớm bằng lấy mẫu, hay chỉ biết khi khách hàng phàn nàn?
6. Gợi ý xử lý đang được trình như một tiền lệ để tham khảo, hay như một đáp án?

Nếu từ ba câu trở lên khiến bạn do dự, nên làm rõ bảng tuyến và đường ngoại lệ trước khi đưa AI vào phân loại.

---

## Kết luận

Rule từ khóa không sai; nó có giới hạn tự nhiên khi ngôn ngữ thực tế không khớp với điều đã dự đoán. AI nâng cấp phần "hiểu nội dung" phía trước định tuyến: từ khớp từ khóa sang nhận diện ý định. Nhưng chọn tuyến vẫn là một quyết định, và quyết định đó ở lại với bảng tuyến do người có thẩm quyền ban hành, hoặc với người phân loại khi ca không chắc chắn.

Phân loại và định tuyến là một trong những điểm khởi đầu có rủi ro thấp khi đưa AI vào workflow, chính vì ranh giới này rõ: AI đọc, rule chuyển, người xử lý quyết định. Giá trị đến từ việc yêu cầu đến đúng người sau ít lần chuyển tay hơn, không phải từ việc giao quyền cho AI.

Digitalization Readiness Assessment của OKELAS giúp xác định quy trình nào của bạn đã đủ rule và dữ liệu để bắt đầu từ đây.

---

## Nguồn

- Hohpe, G., & Woolf, B. (2003). *Enterprise Integration Patterns: Designing, Building, and Deploying Messaging Solutions*. Addison-Wesley. (Content-Based Router)
- Parasuraman, R., Sheridan, T. B., & Wickens, C. D. (2000). A model for types and levels of human interaction with automation. *IEEE Transactions on Systems, Man, and Cybernetics – Part A*, 30(3), 286–297.

## Bài liên quan

- [AI làm hai việc trong workflow: diễn giải đầu vào và chuẩn bị evidence](/insights/workflow/ai-tich-hop-vao-workflow)
- [Automation và AI hỗ trợ trong workflow: hai việc khác nhau](/insights/workflow/automation-va-ai-ho-tro-workflow)
- [Xử lý ngoại lệ trong workflow: khi quyết định không có rule sẵn](/insights/workflow/xu-ly-ngoai-le-trong-workflow)
- [Rule hay con người: quyết định nào nên tự động hóa trong quy trình](/insights/workflow/rule-hay-con-nguoi-quyet-dinh-trong-workflow)
