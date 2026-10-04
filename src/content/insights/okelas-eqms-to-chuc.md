---
title: "Cách OKELAS tổ chức eQMS — từ document đến evidence đến audit trail"
description: "OKELAS không chỉ số hóa hồ sơ ISO. Mỗi hành động trong quy trình chất lượng được gắn với evidence, workflow và audit trail — tạo ra một hệ thống eQMS có thể kiểm chứng và truy vết."
publishDate: 2026-10-04T00:00:00Z
image: '~/assets/images/insights/okelas-eqms-to-chuc.png'
category: 'compliance'
tags: ['OKELAS', 'eQMS', 'Evidence', 'Audit Trail', 'Progressive eQMS']
translationId: 'okelas-eqms-approach'
lang: 'vi'
contentType: 'Analysis'
funnelStage:
  - Consideration
  - Solution
audience: ['CEO', 'Quality Director', 'CIO']
primaryKeyword: 'OKELAS eQMS tổ chức'
secondaryKeywords:
  - "eQMS document evidence audit trail"
  - "hệ thống QMS có audit trail"
  - "eQMS OKELAS"
  - "quality management knowledge"
assessmentHref: '/lien-he'
draft: false
---

> **Tóm tắt cho CEO, Quality Director và CIO**
>
> - Phần lớn eQMS tổ chức dữ liệu quanh **tài liệu**: tài liệu được lưu, duyệt, phát hành. Cách này giải quyết tốt bài toán kiểm soát phiên bản, nhưng để lại một khoảng trống: tài liệu không cho biết điều gì đã **thực sự xảy ra**.
> - OKELAS tiếp cận theo chuỗi **Process → Workflow → Event → Evidence**: quy trình định nghĩa việc cần làm, workflow chạy nó, mỗi hành động là một sự kiện, và sự kiện để lại bằng chứng gắn với bối cảnh.
> - Khi hành động được ghi như sự kiện ngay từ đầu, dấu vết kiểm toán (audit trail) là **hệ quả của cách thiết kế**, không phải thứ dựng lại trước mỗi kỳ audit.
> - Cách tiếp cận này không phải lúc nào cũng cần thiết. Với doanh nghiệp nhỏ, quy trình ổn định hoặc chỉ cần kiểm soát tài liệu, một DMS hoặc eQMS đơn giản có thể là đủ.
> - Bài này mô tả cách tiếp cận và định hướng thiết kế. Phạm vi cụ thể cho từng doanh nghiệp được xác định theo mức trưởng thành và nhu cầu thực tế.

---

## Bài toán eQMS truyền thống chưa giải quyết

Các bài trước trong chuyên đề này đã đi qua từng thành phần của hệ thống chất lượng: [kiểm soát tài liệu](/insights/compliance/document-control-iso-9001), [sự không phù hợp](/insights/compliance/nonconformance-iso-9001), [hành động khắc phục](/insights/compliance/capa-iso-9001-hieu-qua), [đánh giá nội bộ](/insights/compliance/internal-audit-iso-9001-hieu-qua) và các phần còn lại. Mỗi bài đều kết thúc ở cùng một chỗ: eQMS giúp việc kiểm soát ít phụ thuộc vào kỷ luật của con người, nhưng không giải quyết mọi thứ.

Có một giới hạn nằm sâu hơn, ở **cách dữ liệu được tổ chức**.

Trong một eQMS lấy tài liệu làm trung tâm, đơn vị cơ bản là tài liệu: quy trình, biểu mẫu, hồ sơ. Chúng được lưu, được duyệt, được phát hành, có phiên bản. Đó là những gì hệ thống làm tốt.

Nhưng khi một đánh giá viên hỏi *"cho tôi xem sự không phù hợp này đã được xử lý thế nào, theo bản quy trình nào, ai đã được đào tạo lại"*, câu trả lời không nằm trong một tài liệu. Nó nằm trong **chuỗi sự việc** nối nhiều tài liệu, nhiều người và nhiều thời điểm. Với hệ thống lấy tài liệu làm trung tâm, chuỗi đó thường phải dựng lại bằng tay.

Đây là khoảng cách giống với điều đã được phân tích trong bài về [DMS và knowledge management](/insights/knowledge-management/dms-va-knowledge-management): DMS quản lý tài liệu như những đơn vị độc lập, nhưng tri thức vận hành là một mạng lưới kết nối. Câu hỏi của đánh giá viên, và của chính lãnh đạo, thường là câu hỏi về mạng lưới đó.

---

## Cách OKELAS nhìn về document control

OKELAS không bắt đầu từ câu hỏi "tài liệu được lưu ở đâu", mà từ câu hỏi "tài liệu này đóng vai trò gì trong cách doanh nghiệp vận hành".

Trong cách tiếp cận này, một tài liệu không đứng một mình. Nó là một nút trong mạng lưới gắn với:

- **quy trình** mà nó điều chỉnh;
- **vai trò** phải tuân theo nó;
- **đào tạo** cần có để áp dụng nó;
- **sự kiện** đã tham chiếu đến nó (sự không phù hợp, đánh giá, thay đổi);
- **lịch sử** các phiên bản và lý do thay đổi.

Một ý quan trọng: OKELAS không phải là một DMS thay thế, và không nhằm thay thế các công cụ lưu trữ tài liệu. Kiểm soát phiên bản, phê duyệt và phân phối vẫn là nền tảng, theo đúng yêu cầu của [điều khoản 7.5 ISO 9001:2015](/insights/compliance/iso-9001-co-can-phan-mem-qms). Điều khác là tài liệu được đặt vào bối cảnh vận hành của nó.

Hệ quả thực tế là ba loại câu hỏi mà một kho tài liệu thường không trả lời được trở nên có thể trả lời:

- **Ngữ cảnh:** quy trình này áp dụng thế nào cho sản phẩm hay điều kiện cụ thể?
- **Lịch sử và nguyên nhân:** vì sao quy trình được thiết lập như vậy, đã từng thử cách khác chưa?
- **Quan hệ:** nếu thay đổi quy trình này, những gì khác bị ảnh hưởng?

---

## Process → Workflow → Event → Evidence trong eQMS

Đây là phần cốt lõi của cách tiếp cận. Chuỗi bốn khái niệm có thể được hiểu như sau.

**Process (quy trình).** Định nghĩa việc cần làm: các bước, vai trò, yêu cầu.

**Workflow.** Cách quy trình **thực sự chạy**: ai làm gì, theo thứ tự nào, với phê duyệt và hạn ra sao.

**Event (sự kiện).** Mỗi hành động diễn ra trong workflow là một sự kiện: tài liệu được soạn, được duyệt, được phát hành, một người xác nhận đã đọc, một sự không phù hợp được ghi nhận, một phát hiện đánh giá được mở.

**Evidence (bằng chứng).** Sự kiện để lại bằng chứng: **ai làm, khi nào, trên bản nào, với thẩm quyền gì và trong bối cảnh nào.**

Điểm khác biệt nằm ở chỗ **bằng chứng được tạo ra như một phần của công việc**, không phải được lập sau công việc.

*Ví dụ minh họa (một kịch bản thiết kế, không phải case của khách hàng):* một hướng dẫn công việc được cập nhật. Theo cách tiếp cận sự kiện, chuỗi sau được ghi nhận khi nó diễn ra: bản nháp được tạo, người xem xét và người phê duyệt xác nhận, bản mới có hiệu lực, bản cũ chuyển trạng thái, những người liên quan nhận thông báo, yêu cầu đào tạo được giao, từng người xác nhận hoàn thành. Nếu sau đó một sự không phù hợp xảy ra ở công đoạn này, nó được nối vào chính chuỗi đó. Câu hỏi "ai đã được đào tạo theo bản nào" trở thành một truy vấn, không phải một cuộc tìm kiếm.

Cách nhìn này gắn với một chuỗi rộng hơn mà OKELAS dùng để mô tả doanh nghiệp vận hành: Process → Workflow → Event → Evidence → Knowledge → Decision → Action. eQMS là nơi bốn khái niệm đầu được áp dụng vào bài toán chất lượng, và các khái niệm sau (tri thức, quyết định, hành động) là phần mở rộng tự nhiên, được nói ở [bài cuối chuyên đề](/insights/compliance/tu-eqms-den-knowledge-os).

---

## Audit trail như hệ quả của thiết kế

Trong nhiều hệ thống, audit trail là một chức năng thêm vào: hệ thống ghi nhật ký ai đã làm gì. Hữu ích, nhưng nhật ký tách rời từng sự kiện thường khó đọc như một câu chuyện.

Với cách tiếp cận lấy sự kiện làm đơn vị ghi nhận, audit trail là **hệ quả của cách thiết kế**. Vì mọi hành động được ghi như một sự kiện có bối cảnh, việc dựng lại câu chuyện không còn là việc phải làm trước mỗi kỳ audit.

Điều này liên quan đến một nguyên tắc OKELAS dùng xuyên suốt: một câu trả lời tốt không chỉ đúng, mà phải có khả năng **giải thích, chỉ ra bằng chứng và truy vết** (Explain → Evidence → Trace).

Với eQMS, nguyên tắc đó có ý nghĩa cụ thể:

- Khi đánh giá viên hỏi về một sự không phù hợp, bạn đi theo chuỗi sự kiện: phát hiện, khắc phục, phân tích nguyên nhân, hành động, kiểm tra hiệu lực.
- Khi khách hàng hỏi về một lô hàng, bạn truy từ lô đến tài liệu, người thực hiện, đào tạo và nhà cung cấp liên quan.
- Khi lãnh đạo cần dữ liệu cho xem xét, nó đã nằm sẵn trong chuỗi, không cần tổng hợp riêng.

Về phía tiêu chuẩn, cách này hỗ trợ các yêu cầu về lưu giữ bằng chứng xuất hiện xuyên suốt ISO 9001:2015, như lưu giữ thông tin làm bằng chứng về kết quả đánh giá (9.2), xem xét lãnh đạo (9.3), sự không phù hợp và hành động khắc phục (10.2), và bảo vệ thông tin lưu giữ khỏi thay đổi ngoài ý muốn (7.5.3). Bài [Evidence trong eQMS](/insights/compliance/evidence-eqms-kiem-chung) đi sâu hơn vào sự khác biệt giữa tài liệu và bằng chứng.

Cần nói rõ: audit trail tốt không thay thế chất lượng của hành động đã ghi. Một phân tích nguyên nhân yếu vẫn yếu dù được ghi lại đầy đủ. Hệ thống làm cho việc chứng minh dễ hơn, không làm cho việc làm tốt hơn.

---

## So sánh hai cách tiếp cận

Bảng dưới đây so sánh hai cách tổ chức eQMS ở mức nguyên tắc, không so sánh với một sản phẩm cụ thể nào.

| | eQMS lấy tài liệu làm trung tâm | Cách tiếp cận Process-Event-Evidence |
|---|---|---|
| Đơn vị ghi nhận | Tài liệu và hồ sơ | Sự kiện gắn với bối cảnh |
| Quan hệ giữa các hồ sơ | Thường do người dùng tự nối | Là một phần của cấu trúc dữ liệu |
| Chuẩn bị audit | Tổng hợp từ nhiều hồ sơ | Truy theo chuỗi sự kiện |
| Tái sử dụng tri thức | Tìm tài liệu rồi tự suy luận | Truy vấn theo ngữ cảnh và quan hệ |
| Điều kiện để bắt đầu | Thấp hơn: có tài liệu là bắt đầu được | Cao hơn: cần làm rõ quy trình và vai trò |
| Độ phức tạp thiết kế | Thấp hơn | Cao hơn |
| Phù hợp khi | Vấn đề chính là kiểm soát và truy cập tài liệu | Vấn đề chính là truy vết, bằng chứng và kết nối tri thức |

Hai điều cần nhìn thẳng. **Cách tiếp cận thứ hai đòi hỏi nhiều hơn ở khâu chuẩn bị:** làm rõ quy trình và vai trò trước khi hệ thống có thể ghi sự kiện có ý nghĩa. Và **không phải doanh nghiệp nào cũng cần nó.**

---

## OKELAS phù hợp khi nào — và khi nào chưa

Nguyên tắc OKELAS theo đuổi là giải quyết vấn đề vận hành bằng **hệ thống nhỏ nhất đủ dùng**. Điều đó cũng áp dụng cho chính OKELAS.

**Có thể phù hợp khi:**

- Vấn đề chính là truy vết và bằng chứng: audit mất nhiều thời gian chuẩn bị, hoặc chuỗi hành động khó chứng minh.
- Hồ sơ chất lượng, quy trình và tri thức đang nằm rời nhau, và bài toán thật là kết nối chúng.
- Doanh nghiệp muốn mở đường cho AI hỗ trợ vận hành có ngữ cảnh và bằng chứng, thay vì AI chỉ tra cứu file.
- Doanh nghiệp sẵn sàng làm rõ quy trình như một phần của việc triển khai.

**Có thể chưa cần khi:**

- Doanh nghiệp nhỏ, quy trình ổn định, hệ thống giấy hoặc file hiện tại vẫn chạy tốt với chi phí hợp lý (xem [Từ QMS giấy đến eQMS](/insights/compliance/tu-qms-giay-sang-eqms)).
- Vấn đề chính chỉ là tìm tài liệu và kiểm soát phiên bản: một DMS hoặc eQMS đơn giản có thể là đủ.
- Quy trình chưa thống nhất và chưa có ý định làm rõ: bất kỳ hệ thống nào cũng sẽ chỉ ghi lại sự mơ hồ.
- Doanh nghiệp chịu yêu cầu đặc thù về hệ thống hồ sơ điện tử cần kiểm tra riêng trước khi chọn giải pháp.

Về cách triển khai, OKELAS đi theo hướng **progressive eQMS**: bắt đầu từ điểm đau lớn nhất, thường là kiểm soát tài liệu, rồi mở rộng theo mức trưởng thành, không triển khai cả bộ cùng lúc. Với doanh nghiệp có yêu cầu về dữ liệu nhạy cảm hoặc tuân thủ, phương án triển khai tại chỗ là một khả năng cần được cân nhắc tùy trường hợp, thay vì mặc định mọi thứ phải chạy trên đám mây.

OKELAS cũng không phải một ERP. Nếu doanh nghiệp có hoặc sắp có ERP, hai hệ thống đóng vai trò khác nhau: ERP quản lý giao dịch và dữ liệu vận hành có cấu trúc, còn OKELAS quản lý sự hiểu biết và bối cảnh quy trình xung quanh hoạt động đó.

---

## Một lưu ý về phạm vi của bài này

Bài này mô tả **cách tiếp cận và định hướng thiết kế** của OKELAS trong lĩnh vực eQMS. Nó không mô tả kết quả của một khách hàng cụ thể, không đưa ra con số cải thiện, và không cam kết một danh sách chức năng cố định. Phạm vi cụ thể áp dụng cho từng doanh nghiệp phụ thuộc vào mức trưởng thành về quy trình, yêu cầu của ngành và khách hàng, và nhu cầu thực tế, và được xác định trong quá trình trao đổi.

---

### Lưu ý về phiên bản ISO 9001

Các tham chiếu trong bài dựa trên ISO 9001:2015. Theo thông tin từ các tổ chức chứng nhận, bản sửa đổi ISO 9001:2026 đã được lên lịch xuất bản vào tháng 9/2026, với thời gian chuyển tiếp dự kiến khoảng ba năm và chứng nhận 2015 vẫn có giá trị trong thời gian đó. Cấu trúc và cách diễn đạt điều khoản có thể thay đổi; hãy đối chiếu với phiên bản tổ chức của bạn đang được chứng nhận.

---

**Hệ thống chất lượng của bạn đang ghi nhận tài liệu, hay đang ghi nhận những gì thực sự xảy ra?**

→ [Liên hệ OKELAS](/lien-he) để trao đổi về cách tổ chức eQMS phù hợp với mức trưởng thành và nhu cầu của doanh nghiệp sản xuất của bạn.

**Đọc thêm:**

- [Management review ISO 9001 — tại sao buổi họp này thường lãng phí](/insights/compliance/management-review-iso-9001) *(bài trước)*
- [Evidence trong eQMS: khi mỗi hành động cần có thể kiểm chứng được](/insights/compliance/evidence-eqms-kiem-chung) *(bài tiếp theo)*
- [Evidence-based AI: khi câu trả lời cần có khả năng kiểm chứng](/insights/ai-readiness/evidence-based-ai) *(bài liên quan)*
- [AI reasoning và sự thật của tổ chức](/insights/ai-readiness/ai-reasoning-va-su-that-to-chuc) *(bài liên quan)*
- [eQMS cho doanh nghiệp sản xuất — hướng dẫn thực hành](/insights/compliance/eqms-cho-doanh-nghiep-san-xuat) *(pillar)*

**Nguồn tham khảo:**

- ISO 9001:2015, điều khoản 7.5.3 (kiểm soát thông tin dạng văn bản), 9.2 (đánh giá nội bộ), 9.3 (xem xét của lãnh đạo), 10.2 (sự không phù hợp và hành động khắc phục): [iso.org/standard/62085.html](https://www.iso.org/standard/62085.html)
- LRQA, *ISO 9001 revision update: Publication date confirmed* (nguồn của tổ chức chứng nhận, nên đối chiếu với ISO): [lrqa.com](https://www.lrqa.com/en/latest-news/iso-9001-publication-date-confirmed/)

---

*Điều khoản ISO 9001:2015 được tóm lược bằng ngôn ngữ thực hành, không thay thế văn bản tiêu chuẩn. Ví dụ trong bài là một kịch bản minh họa cho cách tiếp cận, không phải case khách hàng cụ thể. Bảng so sánh ở mức nguyên tắc, không nhằm đánh giá một sản phẩm cụ thể nào. Nội dung về OKELAS mô tả cách tiếp cận và định hướng thiết kế, không phải cam kết về kết quả hay danh sách chức năng.*

---
