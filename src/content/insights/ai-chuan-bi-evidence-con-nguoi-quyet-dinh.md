---
title: "AI chuẩn bị evidence, con người quyết định: thế nào là một bộ hồ sơ tốt"
description: "Thời gian của người ra quyết định thường tốn ở việc gom và đối chiếu thông tin, không ở việc quyết định. AI có thể chuẩn bị hồ sơ, nhưng hồ sơ kém có thể dẫn người quyết định đi sai. Bài này mô tả một bộ evidence tốt gồm những gì, tiêu chí chất lượng, và cách giảm rủi ro người quyết định tin theo máy."
publishDate: 2026-10-06T00:00:00Z
translationId: article-5-15-ai-evidence-human-decision
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
primaryKeyword: "AI chuẩn bị evidence quyết định"
secondaryKeywords:
  - "evidence workflow quyết định"
  - "automation bias"
  - "human-in-the-loop workflow"
  - "hồ sơ quyết định AI"
  - "AI hỗ trợ ra quyết định"
assessmentHref: /readiness/digitalization
coverImage: '~/assets/images/insights/ai-chuan-bi-evidence-con-nguoi-quyet-dinh/wfp-00-og-cover-vi.png'
ogImage: '~/assets/images/insights/ai-chuan-bi-evidence-con-nguoi-quyet-dinh/wfp-00-og-cover-vi.png'
coverImageAlt: "Hồ sơ kém dẫn người quyết định đi sai; hồ sơ tốt truy vết được, cân bằng và không thay người quyết định kết luận."
draft: false
---

---

> **Tóm tắt cho COO/CIO**
>
> - Với một quyết định cần phán đoán, phần lớn thời gian của người có thẩm quyền thường dành cho việc gom thông tin: tìm quy định liên quan, lục các ca trước, đối chiếu số liệu. Đây là phần AI có thể làm thay, nếu giữ ranh giới: **AI chuẩn bị hồ sơ, con người quyết định**.
> - Một bộ evidence tốt không phải là bản tóm tắt dễ đọc. Nó có sáu thành phần: câu hỏi cần quyết định, rule hoặc chính sách liên quan, dữ kiện của ca kèm nguồn, các ca tương tự và kết quả, các phương án kèm hệ quả, và những gì chưa biết hoặc đi ngược chiều.
> - Rủi ro lớn nhất không phải AI thiếu thông tin, mà là người quyết định **tin theo hồ sơ mà không còn phán đoán**. Nghiên cứu về automation bias cho thấy hiện tượng này xảy ra khi người dùng dựa vào gợi ý tự động thay vì tự kiểm tra. Cách giảm rủi ro nằm ở thiết kế hồ sơ và quy trình, không ở lời nhắc "hãy cẩn thận".
> - Thước đo của hồ sơ tốt: người quyết định ra quyết định **nhanh hơn mà vẫn có thể giải thích lý do bằng lời của mình**.

---

## Mở đầu

Giám đốc kinh doanh nhận một đề nghị giảm giá vượt mức rule cho phép từ một khách hàng lớn. Việc cần quyết định chỉ là "đồng ý hay không, và đồng ý ở mức nào". Nhưng để quyết định, ông phải biết khách hàng này mua gì trong 12 tháng qua, ba lần giảm giá tương tự gần nhất đã kết thúc ra sao, biên lợi nhuận còn lại là bao nhiêu, hợp đồng hiện hành nói gì. Việc gom những thứ đó mất hơn một buổi chiều, và phần lớn chỉ là tìm và ghép thông tin.

Câu hỏi quen thuộc là: giao phần gom cho AI được không? Được, và đây là một trong những chỗ AI hữu ích nhất. Nhưng câu hỏi cần hỏi tiếp là: bộ hồ sơ thế nào thì đáng để một người dựa vào khi ra quyết định?

(Đây là tình huống minh họa, không phải case của khách hàng cụ thể.)

---

## Quyết định gồm ba phần, AI hỗ trợ hai phần đầu

![Intelligence, design, choice theo Simon (1960); AI hỗ trợ hai phần đầu, phần chọn phương án và chịu trách nhiệm ở lại với con người.](~/assets/images/insights/ai-chuan-bi-evidence-con-nguoi-quyet-dinh/wfp-01-three-activities-vi-dark.svg)

Herbert Simon (1960) mô tả quá trình ra quyết định gồm ba hoạt động: **intelligence** (nhận ra tình huống và thu thập thông tin), **design** (hình thành các phương án) và **choice** (chọn một phương án). Cách chia này giúp đặt ranh giới rõ cho AI.

| Hoạt động | Nội dung | AI có thể giúp | Quyền quyết định |
|---|---|---|---|
| Intelligence | Nhận diện ca, thu thập dữ kiện, tìm quy định và tiền lệ | Có: tìm, gom, đối chiếu, nêu nguồn | Không |
| Design | Nêu các phương án khả thi và hệ quả của từng phương án | Có, ở mức liệt kê và nêu hệ quả đã biết | Không |
| Choice | Chọn một phương án và chịu trách nhiệm | Không | Con người, hoặc rule do người có thẩm quyền ban hành |

Đây cũng là hai việc nêu ở bài [AI làm hai việc trong workflow](/insights/workflow/ai-tich-hop-vao-workflow). Bài này đi sâu vào việc thứ hai: chuẩn bị evidence cho đúng.

---

## Một bộ evidence tốt gồm những gì

![Sáu thành phần của một bộ evidence tốt: câu hỏi cần quyết định, rule liên quan, dữ kiện kèm nguồn, ca tương tự và kết quả, các phương án và hệ quả, những gì chưa biết và đi ngược chiều.](~/assets/images/insights/ai-chuan-bi-evidence-con-nguoi-quyet-dinh/wfp-02-six-parts-vi-dark.svg)

Một bộ hồ sơ giúp người quyết định, thay vì thay họ nghĩ, thường có sáu thành phần.

**1. Câu hỏi cần quyết định.** Nêu rõ: quyết định gì, trong phạm vi nào, thời hạn nào. Hồ sơ thiếu câu hỏi rất dễ trở thành một đống thông tin.

**2. Rule hoặc chính sách liên quan.** Rule nào đang áp dụng, vì sao ca này nằm ngoài rule, và ai ban hành rule đó. Người quyết định cần biết mình đang quyết định *ngoài* cái gì.

**3. Dữ kiện của ca, kèm nguồn.** Mỗi dữ kiện đi kèm nơi lấy: hợp đồng, hệ thống, email nào. Dữ kiện không có nguồn không phải evidence.

**4. Các ca tương tự và kết quả.** Không chỉ "đã xử lý thế nào" mà còn "kết quả ra sao sau đó". Nêu rõ mức độ tương tự và điểm khác biệt, vì ca "giống" ở một chiều có thể khác ở chiều quan trọng nhất.

**5. Các phương án và hệ quả đã biết.** Liệt kê các hướng khả thi, mỗi hướng kèm hệ quả có căn cứ. Đây là chỗ dễ trượt thành khuyến nghị; phần sau bàn cách tránh.

**6. Những gì chưa biết và dữ kiện đi ngược chiều.** Thông tin thiếu, nguồn mâu thuẫn, ca tương tự có kết quả xấu. Đây là thành phần quan trọng nhất và cũng dễ bị bỏ nhất.

---

## Năm tiêu chí để đánh giá một bộ hồ sơ

![Năm tiêu chí đánh giá bộ hồ sơ: truy vết được, đủ và cân bằng, nêu rõ độ chắc chắn, vừa đủ đọc, không thay người quyết định kết luận.](~/assets/images/insights/ai-chuan-bi-evidence-con-nguoi-quyet-dinh/wfp-03-five-criteria-vi-dark.svg)

- **Truy vết được.** Từng dữ kiện dẫn được về nguồn gốc. Người quyết định mở được nguồn trong vài giây.
- **Đủ và cân bằng.** Có cả dữ kiện ủng hộ và phản đối mỗi phương án. Hồ sơ chỉ chứa bằng chứng cho một hướng là một lập luận, không phải hồ sơ.
- **Nêu rõ độ chắc chắn.** Phân biệt điều đã xác nhận, điều suy ra, và điều chưa biết.
- **Vừa đủ đọc.** Người quyết định đọc được trong thời gian hợp lý. Hồ sơ quá dài khiến người ta đọc lướt; quá ngắn khiến người ta không kiểm chứng được.
- **Không thay người quyết định kết luận.** Hồ sơ nêu phương án và hệ quả, không nêu "nên chọn phương án nào" như một đáp án.

---

## Rủi ro lớn nhất: người quyết định tin theo máy

![Chuỗi rủi ro automation bias và năm biện pháp thiết kế để giảm rủi ro người quyết định tin theo hồ sơ mà không còn phán đoán.](~/assets/images/insights/ai-chuan-bi-evidence-con-nguoi-quyet-dinh/wfp-04-automation-bias-safeguards-vi-dark.svg)

Tài liệu nghiên cứu về tương tác giữa người và tự động hóa mô tả hiện tượng **automation bias**: người dùng có xu hướng dựa vào gợi ý của hệ thống tự động và giảm việc tự tìm hoặc tự kiểm tra thông tin (Skitka và cộng sự, 1999; Parasuraman & Manzey, 2010). Tổng quan của Parasuraman và Manzey cho thấy hiện tượng này có thể xảy ra với cả người có kinh nghiệm, và không dễ tránh chỉ bằng đào tạo.

Với hồ sơ do AI chuẩn bị, điều này có nghĩa là: một hồ sơ gọn, mạch lạc, trình bày tự tin chính là loại dễ khiến người ta ngừng phán đoán. Các biện pháp thiết kế thường gặp:

- **Đặt dữ kiện đi ngược chiều ngay trong hồ sơ**, không để ở phụ lục, để người quyết định gặp chúng trước khi hình thành kết luận.
- **Không đặt một phương án làm mặc định** hoặc làm nổi bật hơn các phương án khác khi chưa có căn cứ.
- **Yêu cầu ghi lý do bằng lời của người quyết định**, không chỉ bấm "đồng ý". Việc phải viết lý do buộc người ta nghĩ.
- **Lấy mẫu kiểm tra định kỳ**: so hồ sơ với nguồn gốc để phát hiện chỗ AI bỏ sót hoặc diễn giải sai, và theo dõi tỷ lệ người quyết định đi khác với phương án "dễ nhất".
- **Quy định rõ ai chịu trách nhiệm.** Người ký quyết định chịu trách nhiệm, không phải hồ sơ.

Các biện pháp trên là hướng thiết kế dựa trên nghiên cứu về automation bias, không phải công thức có hiệu quả định lượng đã được kiểm chứng cho từng doanh nghiệp. Nên thử trong một quy trình và đo kết quả của chính bạn.

---

## AI không nên làm gì trong bước này

- **Không tự chọn phương án rồi trình như đáp án.** Dù AI "đúng" hầu hết thời gian, thiết kế đó biến người quyết định thành người phê duyệt hình thức.
- **Không dùng nguồn không truy vết được**, hoặc trích dẫn không kiểm chứng được. Hồ sơ có dữ kiện bịa là loại hồ sơ nguy hiểm nhất, vì nó trông giống hồ sơ tốt.
- **Không lược bỏ ca bất lợi** để hồ sơ gọn hơn.
- **Không sửa rule.** Thấy rule không còn phù hợp thì ghi nhận như một tín hiệu; việc sửa rule thuộc người có thẩm quyền ban hành, như bài [xử lý ngoại lệ trong workflow](/insights/workflow/xu-ly-ngoai-le-trong-workflow) đã mô tả.

---

## Hồ sơ nằm ở đâu trong workflow

Hồ sơ không phải sản phẩm độc lập. Nó là điểm nối giữa hai đoạn của workflow: phần chạy theo rule, và phần cần người. Ca nào ngoài rule được chuyển tới người có thẩm quyền, kèm hồ sơ. Người đó quyết định, quyết định và lý do được ghi lại, và ghi nhận đó trở thành tiền lệ cho hồ sơ lần sau.

Chu trình này làm hồ sơ tốt dần lên theo thời gian: mỗi quyết định được ghi cho AI thêm một ca tương tự có kết quả đã biết. Nhưng nó chỉ đúng khi quyết định được ghi lại đầy đủ, nên bài [xử lý ngoại lệ trong workflow](/insights/workflow/xu-ly-ngoai-le-trong-workflow) đặt bộ ghi tối thiểu làm điều kiện.

---

## Nên bắt đầu từ đâu

1. **Chọn một loại quyết định lặp lại**, nơi người có thẩm quyền đang tốn nhiều thời gian gom thông tin. Ví dụ đề nghị ngoại lệ về giá, duyệt đặt hàng khẩn, xử lý hàng trả về.
2. **Cùng người ra quyết định liệt kê** họ thực sự cần xem gì để quyết định. Đây là mẫu hồ sơ của quy trình đó.
3. **Chạy song song**: AI chuẩn bị hồ sơ, người vẫn gom theo cách cũ trong vài chu kỳ. So sánh để biết hồ sơ thiếu hoặc sai ở đâu.
4. **Đo ba điều** trong chính quy trình của bạn: thời gian từ khi ca tới người quyết định đến khi có quyết định, tỷ lệ hồ sơ phải bổ sung, và tỷ lệ quyết định được ghi đủ lý do.
5. **Mới thay đổi cách làm** sau khi có số liệu của bạn.

---

## Tự kiểm tra

1. Với quyết định ngoại lệ gần nhất của bạn, người quyết định tốn bao nhiêu thời gian cho việc gom thông tin so với việc cân nhắc?
2. Hồ sơ hiện tại có nêu dữ kiện đi ngược chiều không, hay chỉ có thông tin ủng hộ một hướng?
3. Mỗi dữ kiện trong hồ sơ có truy về nguồn được không?
4. Người quyết định có phải ghi lý do bằng lời của mình, hay chỉ bấm đồng ý?
5. Bạn có cách phát hiện AI bỏ sót hoặc diễn giải sai không, hay chỉ biết khi sự cố xảy ra?
6. Khi quyết định sai, ai chịu trách nhiệm và có đủ dấu vết để học không?

Nếu từ ba câu trở lên khiến bạn do dự, nên làm rõ mẫu hồ sơ và bộ ghi quyết định trước khi đưa AI vào chuẩn bị evidence.

---

## Kết luận

AI chuẩn bị evidence là một trong những việc tạo giá trị rõ nhất cho người ra quyết định, vì nó rút ngắn phần gom và ghép thông tin mà không đụng đến phần cần phán đoán. Nhưng giá trị chỉ có khi hồ sơ truy vết được, cân bằng, nêu rõ điều chưa biết, và không thay người quyết định kết luận.

Một bộ hồ sơ tốt không làm người quyết định ít suy nghĩ hơn. Nó giúp họ dành thời gian suy nghĩ vào chỗ cần suy nghĩ.

---

## Nguồn

- Simon, H. A. (1960). *The New Science of Management Decision*. Harper & Brothers. (intelligence, design, choice)
- Parasuraman, R., & Manzey, D. H. (2010). Complacency and bias in human use of automation: An attentional integration. *Human Factors*, 52(3), 381–410.
- Skitka, L. J., Mosier, K. L., & Burdick, M. (1999). Does automation bias decision-making? *International Journal of Human-Computer Studies*, 51(5), 991–1006.
- Parasuraman, R., Sheridan, T. B., & Wickens, C. D. (2000). A model for types and levels of human interaction with automation. *IEEE Transactions on Systems, Man, and Cybernetics – Part A*, 30(3), 286–297.

## Bài liên quan

- [AI làm hai việc trong workflow: diễn giải đầu vào và chuẩn bị evidence](/insights/workflow/ai-tich-hop-vao-workflow)
- [Xử lý ngoại lệ trong workflow: khi quyết định không có rule sẵn](/insights/workflow/xu-ly-ngoai-le-trong-workflow)
- [Rule hay con người: quyết định nào nên tự động hóa trong quy trình](/insights/workflow/rule-hay-con-nguoi-quyet-dinh-trong-workflow)
- [Phân loại và định tuyến trong workflow: AI hiểu nội dung, rule quyết định tuyến](/insights/workflow/workflow-tu-phan-loai-dinh-tuyen)
