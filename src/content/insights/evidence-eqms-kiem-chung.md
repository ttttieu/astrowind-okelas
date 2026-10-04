---
title: "Evidence trong eQMS: khi mỗi hành động cần có thể kiểm chứng được"
description: "Lưu tài liệu không phải evidence. Evidence trong eQMS là bằng chứng rằng một hành động cụ thể đã xảy ra, ai thực hiện, khi nào và trong context nào — và có thể được truy vết và kiểm chứng."
publishDate: 2026-10-04T00:00:00Z
image: '~/assets/images/insights/evidence-eqms-kiem-chung.png'
category: 'compliance'
tags: ['Evidence', 'eQMS', 'Audit Trail', 'Traceability', 'ISO 9001']
translationId: 'eqms-evidence-traceability'
lang: 'vi'
contentType: 'Analysis'
funnelStage:
  - Consideration
audience: ['Quality Director', 'Compliance Officer', 'CEO']
primaryKeyword: 'evidence eQMS kiểm chứng'
secondaryKeywords:
  - "audit trail eQMS"
  - "traceability ISO 9001"
  - "bằng chứng chất lượng"
  - "evidence-based QMS"
assessmentHref: '/lien-he'
draft: false
---

> **Tóm tắt cho CEO và Quality Director**
>
> - **Tài liệu** cho biết việc cần làm. **Evidence** cho biết việc đã được làm: ai làm, khi nào, trên bản nào, với thẩm quyền gì, trong bối cảnh nào, và có thể kiểm chứng được. Hai thứ khác nhau và đánh giá viên hỏi cả hai.
> - ISO 9001:2015 dùng khái niệm "lưu giữ thông tin dạng văn bản làm bằng chứng" ở nhiều điều khoản, và yêu cầu bảo vệ thông tin lưu giữ khỏi thay đổi ngoài ý muốn.
> - Evidence yếu thường rơi vào vài dạng quen thuộc: ghi bù sau sự việc, chữ ký không kèm bối cảnh, bằng chứng chứng minh ý định thay vì kết quả, và hồ sơ có thể sửa mà không để lại dấu vết.
> - Mỗi thành phần của eQMS tạo ra một loại evidence riêng. Biết loại nào cần, ở mức chi tiết nào, giúp tránh cả hai thái cực: quá ít để chứng minh và quá nhiều để quản lý.
> - Cách tiếp cận "evidence-by-design" tạo bằng chứng tại thời điểm hành động xảy ra, như một phần của workflow. Nó giúp chứng minh dễ hơn, nhưng không làm một hành động kém trở thành tốt.

---

## "Chúng tôi có quy trình" và "Cho tôi xem"

Đánh giá viên hỏi: *"Công ty xử lý sự không phù hợp như thế nào?"*

Trưởng phòng chất lượng trả lời, rất rõ ràng, theo đúng quy trình đã ban hành. Đánh giá viên gật đầu, rồi nói câu mà ai làm chất lượng cũng nhận ra: *"Cho tôi xem một trường hợp gần đây."*

Từ lúc đó, câu hỏi thay đổi. Nó không còn là "quy trình nói gì" mà là "việc đã được làm theo quy trình chưa, và bạn chứng minh bằng gì".

Khoảng cách giữa hai câu hỏi đó là khoảng cách giữa **tài liệu** và **evidence**. Bài này nói về evidence: nó là gì, vì sao đánh giá viên cần nó, nó trông như thế nào ở từng thành phần của eQMS, và làm sao thiết kế để nó tồn tại ngay từ đầu.

---

## Document và evidence: sự khác biệt

Bài [Cách OKELAS tổ chức eQMS](/insights/compliance/okelas-eqms-to-chuc) đã giới thiệu ý tưởng chung. Ở đây đi vào cụ thể hơn.

**Tài liệu** (quy trình, hướng dẫn, chính sách) mô tả **điều cần làm**. Nó cần được cập nhật khi quy trình đổi, và vấn đề chính của nó là *phiên bản hiện hành*.

**Evidence** (hồ sơ, kết quả, bản ghi sự kiện) chứng minh **điều đã xảy ra**. Nó cần được giữ nguyên và bảo vệ, và vấn đề chính của nó là *tính toàn vẹn và truy vết*.

ISO 9001:2015 phản ánh sự khác biệt này qua cách dùng từ: thông tin dạng văn bản mà tổ chức phải **duy trì** (thường là tài liệu) khác với thông tin phải **lưu giữ** (thường là bằng chứng), như phụ lục A của tiêu chuẩn giải thích. Điều khoản 7.5.3 yêu cầu thông tin lưu giữ làm bằng chứng về sự phù hợp được bảo vệ khỏi những thay đổi ngoài ý muốn.

Một bản ghi chỉ có giá trị như evidence khi nó trả lời được các câu hỏi sau:

- **Ai** thực hiện hoặc xác nhận?
- **Khi nào**, vào thời điểm nào thực sự?
- **Làm gì**, cụ thể?
- Trên **phiên bản** tài liệu nào, với **thẩm quyền** gì?
- Trong **bối cảnh** nào (lô hàng, thiết bị, nhà cung cấp, sự việc liên quan)?
- Nó **có bị thay đổi** sau đó không, và nếu có thì ai, khi nào?

Một chữ ký trên biểu mẫu trả lời được câu "ai". Nó thường không trả lời được các câu còn lại.

Trong các ngành dược và thiết bị y tế, các nguyên tắc toàn vẹn dữ liệu (thường gọi tắt là ALCOA: quy được cho một người, đọc được, ghi đồng thời với hành động, là bản gốc, chính xác) mô tả điều này khá rõ. Đây là hướng dẫn tham khảo từ các ngành chịu quy định, không phải yêu cầu của ISO 9001, nhưng cách nghĩ của nó hữu ích cho mọi hệ thống chất lượng.

---

## Tại sao audit yêu cầu evidence, không chỉ document

Đánh giá hệ thống quản lý về bản chất là việc **thu thập bằng chứng đánh giá** và đối chiếu với tiêu chí. ISO 19011, hướng dẫn đánh giá hệ thống quản lý, mô tả bằng chứng đánh giá là hồ sơ, tuyên bố về sự việc hoặc thông tin khác liên quan đến tiêu chí đánh giá và có thể kiểm chứng. Đánh giá viên lấy mẫu, nên họ cần những thứ mà họ có thể kiểm tra lại.

Tài liệu cho họ biết hệ thống **được thiết kế** thế nào. Evidence cho họ biết hệ thống **đã chạy** thế nào. Cả hai đều cần, nhưng chỉ evidence mới trả lời câu hỏi "hệ thống có hiệu lực không" (điều tiêu chuẩn yêu cầu đánh giá ở 9.2).

Không chỉ đánh giá viên. Khách hàng hỏi về một lô hàng, cơ quan quản lý hỏi về một sự việc, lãnh đạo hỏi về một quyết định: tất cả đều cuối cùng quy về cùng một câu hỏi, *bằng chứng ở đâu*.

Theo quan sát tại nhiều doanh nghiệp sản xuất, evidence yếu thường rơi vào vài dạng quen thuộc. (Đây là quan sát chung, không phải số liệu đo lường.)

**1. Ghi bù.** Hồ sơ được điền sau sự việc, đôi khi cả tuần, để "cho đủ". Dù có thiện chí, nó không còn là bằng chứng đồng thời, và khó biện hộ khi bị hỏi.

**2. Chữ ký không kèm bối cảnh.** Biểu mẫu có chữ ký và ngày nhưng không cho biết ký trên căn cứ gì hoặc xem xét điều gì.

**3. Chứng minh ý định, không chứng minh kết quả.** Biên bản tham dự đào tạo chứng minh lớp học diễn ra, không chứng minh người đó làm được việc. Phiếu hành động khắc phục "đã thực hiện" không chứng minh vấn đề đã hết.

**4. Hồ sơ sửa được mà không để lại dấu vết.** Một file Excel dùng chung ai cũng mở và sửa được.

**5. Evidence mồ côi.** Có hồ sơ, nhưng không nối được với sự việc, tài liệu hay con người liên quan, nên khó dùng để dựng lại câu chuyện.

**6. Evidence nằm ở nơi không kiểm soát.** Trong hộp thư cá nhân, ảnh chụp màn hình, hay máy tính của một người.

---

## Evidence trong từng module eQMS

Mỗi thành phần của hệ thống chất lượng tạo ra một loại evidence riêng. Bảng dưới tóm tắt khác biệt giữa điều tài liệu nói và điều evidence cần cho thấy. Mức độ chi tiết cụ thể nên tương xứng với rủi ro, vì tiêu chuẩn yêu cầu thông tin lưu giữ ở mức phù hợp, không phải ở mức tối đa.

| Thành phần | Tài liệu nói | Evidence cần cho thấy |
|---|---|---|
| Kiểm soát tài liệu | Quy trình phê duyệt, phát hành | Ai soạn, xem xét, phê duyệt; ngày hiệu lực; ai đã nhận và xác nhận; bản cũ đã được thu hồi |
| Sự không phù hợp | Cách xử lý sản phẩm không phù hợp | Mô tả sự việc (lô, số lượng, yêu cầu không đạt); ai quyết định xử lý, căn cứ gì; chấp nhận có điều kiện nếu có |
| Hành động khắc phục | Vòng phát hiện - phân tích - khắc phục - kiểm tra | Nguyên nhân gốc cụ thể; hành động và người thực hiện; **kết quả** kiểm tra hiệu lực |
| Đánh giá nội bộ | Chương trình đánh giá | Phạm vi và tiêu chí; bằng chứng đã thu thập; phát hiện; hành động tiếp theo |
| Đào tạo và năng lực | Yêu cầu năng lực theo vị trí | Năng lực được xác nhận bởi ai và bằng cách nào; không chỉ biên bản tham dự |
| Nhà cung cấp | Tiêu chí đánh giá và lựa chọn | Căn cứ phê duyệt; dữ liệu hiệu suất; lần đánh giá lại gần nhất |
| Rủi ro | Phương pháp xác định rủi ro | Rủi ro gắn với quá trình; những lần xem lại; hành động và hiệu lực |
| Xem xét của lãnh đạo | Danh sách đầu vào và đầu ra | Đầu vào thực tế; quyết định cụ thể; người chịu trách nhiệm, hạn, tình trạng ở kỳ sau |

Cột bên phải là điều đánh giá viên, khách hàng và lãnh đạo thực sự muốn thấy. Phần lớn các bài trước trong chuyên đề đã nói về từng thành phần ở góc độ vận hành; bảng này gom chúng theo một câu hỏi duy nhất: *bằng chứng là gì*.

*Ví dụ minh họa (tình huống tổng hợp, không phải case khách hàng thật):* phiếu hành động khắc phục của một nhà máy được đóng với dòng kiểm tra hiệu lực: "không tái diễn". Khi đánh giá viên hỏi căn cứ, nhóm không chỉ ra được: không có khoảng thời gian theo dõi, không có truy vấn các sự không phù hợp cùng loại sau đó. Dòng chữ là một **tuyên bố**, không phải **bằng chứng**. Ở một phiên bản khác của cùng quy trình, bước kiểm tra hiệu lực được lập lịch từ đầu, và kết quả ghi rõ khoảng thời gian đã theo dõi và các sự không phù hợp cùng loại đã được kiểm tra, kèm tham chiếu tới chính dữ liệu đó. Khác biệt không nằm ở lượng giấy tờ mà ở việc câu trả lời có thể kiểm chứng.

---

## OKELAS và evidence-by-design

Cách tiếp cận mà OKELAS theo đuổi gói trong nguyên tắc **evidence-by-design**: bằng chứng được tạo ra tại thời điểm hành động xảy ra, như một phần của workflow, thay vì được lập sau đó. Đây là mô tả về định hướng thiết kế, như đã nói ở [bài trước](/insights/compliance/okelas-eqms-to-chuc), và nó có bốn ý chính.

**Tạo bằng chứng đồng thời với hành động.** Khi một người phê duyệt, xác nhận hoặc xử lý, sự kiện được ghi lại ở chính lúc đó, kèm người thực hiện và thời điểm, thay vì phải điền sau.

**Gắn bằng chứng với bối cảnh.** Mỗi sự kiện nối với tài liệu, phiên bản, lô hàng, nhà cung cấp, con người liên quan, nên bằng chứng không mồ côi.

**Bảo vệ tính toàn vẹn.** Thay đổi sau đó không xóa mất dấu vết của bản gốc, đáp ứng tinh thần của yêu cầu bảo vệ thông tin lưu giữ.

**Truy vết được.** Từ một sự việc có thể đi theo chuỗi liên quan, nguyên tắc Explain → Evidence → Trace mà OKELAS dùng xuyên suốt.

Nguyên tắc này còn có một ý nghĩa rộng hơn trong bối cảnh AI. Một trợ lý AI trả lời câu hỏi về hệ thống chất lượng mà không chỉ ra được bằng chứng thì câu trả lời đó không thể được tin hoặc kiểm tra. Với tổ chức chịu yêu cầu ISO hay GMP, đây là một lý do cụ thể để bằng chứng có cấu trúc đi trước AI, không theo sau. Chủ đề này được phân tích riêng trong [Evidence-based AI](/insights/ai/evidence-based-ai-kiem-chung) và [AI reasoning và sự thật của tổ chức](/insights/ai/ai-ly-luan-vs-su-that-to-chuc).

Cần nói rõ các giới hạn, vì một bài về evidence mà không trung thực về giới hạn thì tự mâu thuẫn.

**Evidence-by-design không biến một hành động tồi thành tốt.** Một phân tích nguyên nhân yếu vẫn yếu dù được ghi đầy đủ và không thể sửa. Hệ thống chứng minh được điều đã xảy ra, không chứng minh được điều đó là đúng.

**Nó không ngăn được sai lệch tại nguồn.** Nếu người nhập dữ liệu ghi điều không đúng sự thật, hệ thống chỉ giữ lại điều đó một cách nguyên vẹn. Văn hóa trung thực và việc báo cáo an toàn vẫn là điều kiện nền.

**Nó phải tương xứng.** Không phải mọi hành động đều cần mức bằng chứng chặt như nhau. Tiêu chuẩn yêu cầu mức độ thông tin lưu giữ phù hợp với quy mô và độ phức tạp. Một hệ thống ghi mọi thứ ở mức chi tiết cao nhất có thể tạo ra gánh nặng mà không tạo ra giá trị.

**Nó đòi hỏi quy trình đủ rõ.** Không thể ghi một sự kiện có ý nghĩa nếu chưa rõ sự kiện đó là gì, ai làm, theo thẩm quyền nào.

Như đã nói ở bài trước, bài này mô tả cách tiếp cận và định hướng thiết kế, không phải kết quả của một khách hàng cụ thể hay một danh sách chức năng cố định.

---

## Tự kiểm tra: bài kiểm tra evidence

Chọn ngẫu nhiên một hành động gần đây trong hệ thống chất lượng, ví dụ một sự không phù hợp đã đóng, một tài liệu mới phát hành, một đánh giá nhà cung cấp, rồi hỏi:

1. Bạn có chỉ ra được **ai** thực hiện và **khi nào thực sự** không, không phải ngày điền biểu mẫu?
2. Bản ghi có cho biết hành động diễn ra trên **phiên bản tài liệu** nào và với **thẩm quyền** gì không?
3. Nó có nối được với **bối cảnh** (lô hàng, thiết bị, nhà cung cấp, sự việc liên quan) không?
4. Nó chứng minh **kết quả**, hay chỉ chứng minh rằng hành động đã được thực hiện?
5. Hồ sơ có bị **sửa sau đó** không, và bạn có thấy được lịch sử thay đổi không?
6. Bản ghi được tạo **ngay khi hành động xảy ra**, hay ghi bù sau đó?
7. Bạn có truy được **chuỗi sự việc liên quan** (trước và sau) trong vài phút không?
8. Hồ sơ có nằm ở **nơi được kiểm soát**, không phải trong hộp thư hay máy cá nhân không?
9. Mức độ chi tiết có **tương xứng với rủi ro** của hành động, không quá nhẹ cũng không quá nặng không?
10. Nếu đánh giá viên hỏi về hành động này **ngày mai**, bạn trả lời bằng cách **mở hồ sơ** hay **dựng lại câu chuyện**?

Nếu từ ba câu trở lên trả lời "không" hoặc "chưa chắc", hệ thống có thể đang lưu tài liệu nhiều hơn evidence.

---

### Lưu ý về phiên bản ISO 9001

Các tham chiếu trong bài dựa trên ISO 9001:2015. Theo thông tin từ các tổ chức chứng nhận, bản sửa đổi ISO 9001:2026 đã được lên lịch xuất bản vào tháng 9/2026, với thời gian chuyển tiếp dự kiến khoảng ba năm và chứng nhận 2015 vẫn có giá trị trong thời gian đó. Cấu trúc và cách diễn đạt điều khoản có thể thay đổi; hãy đối chiếu với phiên bản tổ chức của bạn đang được chứng nhận.

---

**Hệ thống chất lượng của bạn đang lưu tài liệu, hay đang tạo ra evidence có thể kiểm chứng?**

→ [Liên hệ OKELAS](/lien-he) để trao đổi về cách tổ chức evidence trong eQMS phù hợp với mức trưởng thành và nhu cầu của doanh nghiệp sản xuất của bạn.

**Đọc thêm:**

- [Cách OKELAS tổ chức eQMS — từ document đến evidence đến audit trail](/insights/compliance/okelas-eqms-to-chuc) *(bài trước)*
- [Từ eQMS đến Knowledge OS — bước tiến tự nhiên tiếp theo](/insights/compliance/tu-eqms-den-knowledge-os) *(bài tiếp theo)*
- [Evidence-based AI: khi câu trả lời cần có khả năng kiểm chứng](/insights/ai/evidence-based-ai-kiem-chung) *(bài liên quan)*
- [AI reasoning và sự thật của tổ chức](/insights/ai/ai-ly-luan-vs-su-that-to-chuc) *(bài liên quan)*
- [Audit preparation: tại sao chuẩn bị mất nhiều tuần](/insights/knowledge-management/chuan-bi-audit-iso-mat-nhieu-thoi-gian) *(bài liên quan)*
- [eQMS cho doanh nghiệp sản xuất — hướng dẫn thực hành](/insights/compliance/eqms-cho-doanh-nghiep-san-xuat) *(pillar)*

**Nguồn tham khảo:**

- ISO 9001:2015, điều khoản 7.5.3 (kiểm soát thông tin dạng văn bản), 9.2, 9.3, 10.2 và phụ lục A (cách dùng "duy trì" và "lưu giữ"): [iso.org/standard/62085.html](https://www.iso.org/standard/62085.html)
- ISO 19011 (hướng dẫn đánh giá hệ thống quản lý), tài liệu tham khảo, không phải yêu cầu của ISO 9001: [iso.org/standard/70017.html](https://www.iso.org/standard/70017.html)
- LRQA, *ISO 9001 revision update: Publication date confirmed* (nguồn của tổ chức chứng nhận, nên đối chiếu với ISO): [lrqa.com](https://www.lrqa.com/en/latest-news/iso-9001-publication-date-confirmed/)

---

*Điều khoản ISO 9001:2015 được tóm lược bằng ngôn ngữ thực hành, không thay thế văn bản tiêu chuẩn. Ví dụ trong bài là tình huống minh họa tổng hợp từ đặc điểm phổ biến của doanh nghiệp sản xuất, không phải case khách hàng cụ thể. Các dạng evidence yếu nêu trong bài là quan sát chung, không phải số liệu đo lường. Nguyên tắc ALCOA là hướng dẫn tham khảo từ các ngành chịu quy định, không phải yêu cầu của ISO 9001. Nội dung về OKELAS mô tả cách tiếp cận và định hướng thiết kế, không phải cam kết về kết quả hay danh sách chức năng.*

---
