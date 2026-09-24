---
title: "Workflow tháº¿ há»‡ má»›i: khi AI vÃ  organizational knowledge thay Ä‘á»•i cÃ¡ch cÃ´ng viá»‡c váº­n hÃ nh"
description: "Workflow khÃ´ng pháº£i khÃ¡i niá»‡m má»›i. NhÆ°ng AI, event-driven architecture vÃ  organizational knowledge Ä‘ang má»Ÿ ra má»™t tháº¿ há»‡ workflow má»›i â€” nhanh hÆ¡n, linh hoáº¡t hÆ¡n vÃ  thÃ´ng minh hÆ¡n."
publishDate: 2026-09-24T00:00:00Z
translationId: biz-ops-pillar-workflow
lang: vi
category: business-operations
contentType: Pillar
funnelStage:
  - Awareness
  - Understanding
  - Consideration
audience:
  - CEO
  - COO
  - Operations Director
  - CIO
primaryKeyword: "workflow thÃ´ng minh doanh nghiá»‡p"
secondaryKeywords:
  - "intelligent workflow"
  - "workflow automation"
  - "AI workflow"
  - "tá»‘i Æ°u workflow"
  - "workflow doanh nghiá»‡p sáº£n xuáº¥t"
assessmentHref: /readiness/digitalization
draft: false
---
## Tóm tắt cho CEO

- Phần lớn doanh nghiệp đã có "workflow số" — nhưng phần lớn trong số đó vẫn chỉ là quy trình giấy được chuyển thành form điện tử và một chuỗi email approval. Đó chưa phải workflow thế hệ mới.
- Workflow thế hệ mới không được định nghĩa bởi việc có phần mềm workflow, mà bởi ba năng lực: **phản ứng theo sự kiện (event-driven)**, **có ngữ cảnh tổ chức (organizational context)**, và **có khả năng để AI tham gia xử lý một phần công việc, có kiểm soát**.
- Nghiên cứu của McKinsey (2025) chỉ ra rằng việc thiết kế lại workflow — không phải việc "gắn thêm AI" vào quy trình cũ — mới là yếu tố quyết định doanh nghiệp có thu được giá trị thực từ AI hay không.
- Gartner dự báo agentic AI sẽ tham gia ngày càng sâu vào việc ra quyết định vận hành trong vài năm tới — nhưng đây là dự báo xu hướng, không phải hiện trạng đã xảy ra ở mọi doanh nghiệp.
- Với manufacturing SME, câu hỏi không phải "có nên dùng AI trong workflow không", mà là: **workflow hiện tại có đủ chuẩn hóa và có đủ evidence để AI tham gia một cách an toàn chưa?**

---

## Mở đầu: vì sao một COO nên đọc bài này

Nếu doanh nghiệp của bạn đã triển khai một hệ thống approval điện tử, một vài quy trình workflow trên phần mềm quản lý, hoặc tích hợp một số bước tự động hóa — nhưng vẫn còn tình trạng: một yêu cầu mua hàng mất ba ngày để đi qua bốn người ký duyệt, một sự cố chất lượng phải chờ họp mới biết ai chịu trách nhiệm xử lý, hoặc nhân sự vẫn phải "nhắc nhau" hoàn thành bước tiếp theo — thì vấn đề không nằm ở việc bạn thiếu phần mềm workflow.

Vấn đề là workflow của bạn đang dừng lại ở thế hệ cũ: **số hóa hành động của con người**, chứ chưa phải một hệ thống có khả năng tự nhận biết sự kiện, tự huy động đúng người, đúng thông tin, đúng thời điểm — và trong một số trường hợp, tự xử lý phần việc lặp lại mà không cần con người khởi động.

Bài này không nói về một công cụ workflow cụ thể. Nó nói về **một sự dịch chuyển kiến trúc** — từ workflow như một chuỗi bước cố định, sang workflow như một hệ thần kinh vận hành của tổ chức, nơi sự kiện, tri thức và AI cùng tham gia.

---

## 1. Workflow truyền thống còn những giới hạn nào

**Claim:** Phần lớn workflow trong doanh nghiệp sản xuất vừa và nhỏ hiện nay vẫn được thiết kế theo mô hình "chuỗi bước tuyến tính do con người khởi động" — dù đã được số hóa.

**Biểu hiện thực tế:**

- Workflow chỉ chạy khi có người bấm nút "gửi yêu cầu". Nó không tự phát hiện một sự kiện cần xử lý (ví dụ: tồn kho xuống dưới ngưỡng, một lô hàng lệch thông số chất lượng, một hợp đồng sắp hết hạn).
- Workflow là một chuỗi phê duyệt tuần tự (A duyệt xong mới tới B), không phải một mạng lưới các bước có thể chạy song song khi hợp lý.
- Workflow không "nhớ" ngữ cảnh. Người duyệt bước 3 không biết vì sao bước 1 và 2 lại quyết định như vậy — họ chỉ thấy một form đã điền.
- Khi có ngoại lệ (một trường hợp không khớp quy trình chuẩn), hệ thống không xử lý được — mọi thứ rơi về email, Zalo, hoặc cuộc gọi trực tiếp.

**Vì sao xảy ra:** Hầu hết công cụ workflow, kể cả trong ERP hay eQMS, được thiết kế để mô hình hóa **quy trình đã biết trước**, không phải để phản ứng với **sự kiện chưa biết trước**. Đây là giới hạn kiến trúc, không phải lỗi vận hành của một cá nhân.

**Hệ quả:** Doanh nghiệp vẫn cần rất nhiều người "theo dõi", "nhắc việc", "tổng hợp trạng thái" — chính là công việc mà một workflow tốt lẽ ra phải tự làm. Đây là lý do vì sao nhiều doanh nghiệp "đã có workflow" nhưng vẫn cảm thấy vận hành chậm và phụ thuộc vào con người.

---

## 2. Từ approval workflow đến end-to-end workflow

Phần lớn workflow đầu tiên mà doanh nghiệp triển khai là **approval workflow**: xin nghỉ phép, đề nghị thanh toán, phê duyệt mua hàng. Đây là điểm khởi đầu hợp lý, vì dễ chuẩn hóa và dễ đo lường.

Nhưng approval workflow chỉ giải quyết một lát cắt rất mỏng của vận hành: **ai ký, khi nào ký**. Nó không trả lời được câu hỏi lớn hơn: **toàn bộ một quy trình nghiệp vụ, từ sự kiện phát sinh đến kết quả cuối cùng, đang vận hành như thế nào?**

**End-to-end workflow** là bước tiếp theo: một quy trình được mô hình hóa từ đầu đến cuối, xuyên qua nhiều phòng ban, nhiều hệ thống, nhiều loại evidence — ví dụ: từ lúc khách hàng khiếu nại chất lượng, đến điều tra nguyên nhân, đến hành động khắc phục, đến việc đóng hồ sơ và cập nhật SOP liên quan.

Sự khác biệt quan trọng:

| Approval workflow | End-to-end workflow |
|---|---|
| Tập trung vào chữ ký, trạng thái duyệt/không duyệt | Tập trung vào toàn bộ vòng đời của một sự kiện nghiệp vụ |
| Một biểu mẫu, một chuỗi người ký | Nhiều biểu mẫu, nhiều evidence, nhiều hệ thống liên quan |
| Kết thúc khi được duyệt | Kết thúc khi vấn đề gốc được giải quyết và có bằng chứng |
| Dễ triển khai, giá trị giới hạn | Khó triển khai hơn, nhưng phản ánh đúng cách doanh nghiệp thực sự vận hành |

Một doanh nghiệp có thể có hàng chục approval workflow nhưng vẫn không có nổi một end-to-end workflow hoàn chỉnh cho quy trình cốt lõi của mình — ví dụ xử lý khiếu nại chất lượng hoặc quản lý thay đổi kỹ thuật (change control). Đây thường là khoảng trống lớn nhất mà các doanh nghiệp ISO/GMP gặp phải.

---

## 3. Event-driven workflow là gì

**Event-driven workflow** là mô hình trong đó workflow được **kích hoạt bởi một sự kiện xảy ra trong hệ thống hoặc trong thực tế vận hành**, thay vì chỉ được kích hoạt bởi hành động thủ công của con người.

Ví dụ về sự kiện: một cảm biến ghi nhận nhiệt độ vượt ngưỡng; một đơn hàng bị trả lại; một chứng chỉ ISO sắp hết hạn; một nhân sự chủ chốt nộp đơn nghỉ việc; một biến động tỷ giá vượt mức cho phép trong hợp đồng.

Điểm khác biệt cốt lõi so với workflow truyền thống:

- **Workflow truyền thống hỏi:** "Ai cần làm bước tiếp theo?"
- **Event-driven workflow hỏi:** "Sự kiện gì vừa xảy ra, nó có ý nghĩa gì trong bối cảnh tổ chức, và ai/hệ thống nào cần phản ứng?"

Điều kiện để event-driven workflow hoạt động đúng không nằm ở công nghệ trước tiên, mà nằm ở **khả năng tổ chức nhận diện và mô tả sự kiện một cách nhất quán**. Nếu doanh nghiệp chưa có định nghĩa rõ ràng về "thế nào là một sự kiện chất lượng cần xử lý" hay "ngưỡng nào là bất thường", thì việc triển khai công nghệ event-driven sẽ chỉ tạo ra nhiễu — quá nhiều cảnh báo, không ai biết cái nào thực sự quan trọng.

Đây là lý do vì sao event-driven workflow không phải điểm bắt đầu — nó là điểm đến sau khi doanh nghiệp đã có process readiness và data readiness ở mức đủ tốt (xem thêm về process readiness ở Cluster 1 — ERP).

---

## 4. AI có thể tham gia vào workflow ở đâu

Đây là câu hỏi mà nhiều C-level SME đang đặt ra, nhưng thường được trả lời quá sớm bằng một sản phẩm cụ thể ("mua chatbot", "tích hợp AI vào ERP") thay vì trả lời bằng **vị trí trong workflow**.

Có bốn vị trí AI có thể tham gia, theo mức độ rủi ro tăng dần:

1. **Tổng hợp và tóm tắt thông tin trong một bước workflow** — ví dụ tóm tắt lịch sử một nhà cung cấp trước khi người duyệt xem xét. AI không quyết định, chỉ chuẩn bị context. Rủi ro thấp.
2. **Gợi ý hành động dựa trên dữ liệu và tiền lệ** — ví dụ đề xuất mức chiết khấu dựa trên các trường hợp tương tự trước đó. Con người vẫn quyết định cuối cùng. Rủi ro trung bình, cần evidence để giải thích được gợi ý.
3. **Tự động xử lý các trường hợp lặp lại, có quy tắc rõ ràng, rủi ro thấp** — ví dụ tự động phân loại và định tuyến một yêu cầu hỗ trợ đơn giản. Đây là nơi automation truyền thống và AI giao thoa.
4. **Chủ động khởi tạo hành động khi phát hiện sự kiện** — ví dụ AI agent tự tạo một phiếu yêu cầu kiểm tra chất lượng khi phát hiện một chỉ số bất thường. Đây là mức độ tự động cao nhất, đòi hỏi governance chặt và khả năng truy vết.

Gartner, trong báo cáo *Top Strategic Technology Trends for 2025: Agentic AI*, đưa ra một dự báo đáng chú ý: đến năm 2028, khoảng 33% ứng dụng phần mềm doanh nghiệp sẽ tích hợp agentic AI, và ít nhất 15% quyết định công việc hằng ngày sẽ được thực hiện tự động thông qua agentic AI — tăng từ gần như 0% vào năm 2024 (Gartner, 2025). Đây là một dự báo xu hướng công nghệ của một hãng nghiên cứu, không phải số liệu đo lường thực tế đã xảy ra tại phần lớn doanh nghiệp — nhưng nó cho thấy hướng đi mà các nhà cung cấp phần mềm doanh nghiệp đang đầu tư vào.

Vấn đề với manufacturing SME không phải là "có nên đi đến mức 4 không", mà là: **doanh nghiệp đang thực sự ở mức nào, và bước tiếp theo có phù hợp với mức độ chuẩn hóa quy trình và evidence hiện có hay không?** Một doanh nghiệp chưa chuẩn hóa được mức 1 và 2 mà đã muốn triển khai mức 4 thường sẽ tạo ra rủi ro vận hành, không phải giá trị.

---

## 5. Từ workflow automation đến agentic workflow

Có một ranh giới quan trọng cần phân biệt rõ, vì nó thường bị gộp chung trong các bài viết marketing:

**Workflow automation truyền thống** hoạt động theo quy tắc cố định (rule-based): nếu điều kiện A đúng, thực hiện hành động B. Nó nhanh, dễ kiểm soát, nhưng cứng — không xử lý được ngoại lệ ngoài quy tắc đã lập trình.

**Agentic workflow** là workflow trong đó một hoặc nhiều AI agent có khả năng: quan sát trạng thái, lập kế hoạch nhiều bước, sử dụng công cụ (tra cứu dữ liệu, gọi hệ thống khác), và điều chỉnh hành động dựa trên kết quả trung gian — trong giới hạn quyền hạn và guardrail được thiết lập trước.

Sự khác biệt không chỉ về công nghệ, mà về **mức độ tin cậy tổ chức cần đặt vào hệ thống**. Một agentic workflow sai một bước có thể tạo ra chuỗi hành động sai tiếp theo — vì vậy nó đòi hỏi:

- **Ngữ cảnh tổ chức rõ ràng** (organizational context): agent cần biết nó đang hoạt động trong quy trình nào, với quyền hạn nào.
- **Evidence có thể kiểm chứng**: mọi hành động của agent cần có thể truy vết lại — ai/cái gì đã quyết định, dựa trên dữ liệu nào.
- **Điểm dừng con người (human-in-the-loop)** ở những quyết định có rủi ro cao hoặc có tác động tài chính/pháp lý/chất lượng đáng kể.

Nghiên cứu *State of AI 2025* của McKinsey đưa ra một quan sát quan trọng cho phần này: việc thiết kế lại toàn bộ workflow — chứ không phải chỉ gắn thêm mô hình AI vào quy trình sẵn có — là yếu tố mà những doanh nghiệp đạt hiệu quả cao ("high performers") thực hiện khác biệt so với phần còn lại, khi họ tái cấu trúc lại các quy trình, playbook và nền tảng tri thức để AI có thể hoạt động một cách đáng tin cậy (McKinsey, 2025). Nói cách khác: **giá trị không đến từ việc thêm AI, mà từ việc thiết kế lại workflow để AI có chỗ đứng hợp lý trong đó.**

Một khảo sát khác của Deloitte về mức độ ứng dụng generative AI trong doanh nghiệp cho thấy bức tranh phân hóa rõ: chỉ khoảng 34% tổ chức được khảo sát nói rằng họ thực sự đang tái hình dung lại cách vận hành, khoảng 30% đang thiết kế lại các quy trình trọng yếu xoay quanh AI, trong khi khoảng 37% vẫn chỉ dùng AI ở mức bề mặt mà gần như không thay đổi quy trình hiện có (Deloitte, State of Generative AI in the Enterprise). Ranh giới giữa ba nhóm này chính là ranh giới giữa "có AI" và "vận hành thông minh hơn nhờ AI".

---

## 6. Lộ trình workflow maturity

Không doanh nghiệp nào nên nhảy thẳng từ approval workflow lên agentic workflow. Có một lộ trình hợp lý:

**Level 1 — Digitized workflow.** Quy trình giấy được chuyển thành form điện tử và chuỗi phê duyệt cơ bản. Mục tiêu: có dữ liệu, giảm thất lạc giấy tờ.

**Level 2 — Structured workflow.** Quy trình được mô hình hóa rõ vai trò, điều kiện rẽ nhánh, SLA từng bước. Có thể đo được thời gian xử lý, điểm nghẽn.

**Level 3 — Connected / end-to-end workflow.** Quy trình xuyên phòng ban, xuyên hệ thống, gắn với evidence và có khả năng truy vết toàn bộ vòng đời.

**Level 4 — Event-driven workflow.** Quy trình phản ứng với sự kiện thực tế, không chỉ chờ hành động thủ công.

**Level 5 — Agentic workflow (có kiểm soát).** AI agent tham gia xử lý một phần công việc, có ngữ cảnh, có evidence, có human-in-the-loop tại các điểm quyết định quan trọng.

Với phần lớn manufacturing SME tại Việt Nam, vị trí thực tế thường nằm giữa Level 1 và Level 2 — điều này không phải điều đáng lo ngại, mà là điểm khởi đầu bình thường. Vấn đề không phải là "đang ở mức thấp", mà là **có biết mình đang ở mức nào, và bước tiếp theo có ý nghĩa kinh tế không**, thay vì cố nhảy thẳng lên Level 5 vì bị cuốn theo xu hướng agentic AI.

---

## Tự đánh giá nhanh

Nếu doanh nghiệp của bạn có từ **5/8 dấu hiệu** dưới đây, vấn đề nhiều khả năng không nằm ở việc thiếu công cụ workflow, mà ở kiến trúc và mức độ trưởng thành của workflow hiện tại:

1. Vẫn cần một người "nhắc việc" để quy trình không bị đứng lại.
2. Khi có ngoại lệ, mọi thứ quay về email hoặc tin nhắn cá nhân.
3. Người duyệt bước sau không có đủ ngữ cảnh của các bước trước.
4. Không thể trả lời ngay: "yêu cầu này đang ở đâu, tại sao chậm" mà không hỏi trực tiếp người phụ trách.
5. Workflow chỉ khởi động khi có người chủ động bấm nút, không tự phản ứng với sự kiện thực tế.
6. Một quy trình quan trọng (khiếu nại, thay đổi kỹ thuật, sự cố chất lượng) chưa từng được mô hình hóa end-to-end.
7. Doanh nghiệp đã thử dùng AI ở đâu đó, nhưng không gắn với một workflow cụ thể.
8. Không có cách nào để giải thích lại một quyết định vận hành đã xảy ra ba tháng trước, kèm evidence.

---

## Kết luận

Vấn đề thực sự không phải là "doanh nghiệp có workflow hay không". Phần lớn doanh nghiệp đã có. Vấn đề thực sự là: **workflow hiện tại có được thiết kế để phản ứng với sự kiện, mang theo ngữ cảnh tổ chức, và có chỗ đứng hợp lý cho AI hay không — hay nó vẫn chỉ là một chuỗi bước số hóa cần con người liên tục vận hành và nhắc nhở?**

Đây cũng là lý do OKELAS tiếp cận workflow không như một tính năng phần mềm đơn lẻ, mà như một phần của **Process → Workflow → Event → Evidence → Knowledge → Decision → Action** — nơi workflow chỉ thực sự "thông minh" khi nó được kết nối với tri thức và evidence của tổ chức, không phải khi nó chỉ chạy nhanh hơn.

## Bước tiếp theo

Nếu bạn muốn biết workflow của doanh nghiệp mình đang ở level nào trong lộ trình trưởng thành nói trên, và đâu là bước tiếp theo có ý nghĩa kinh tế — thay vì bước tiếp theo chỉ vì đang là xu hướng — hãy bắt đầu với **Workflow Readiness Assessment**.
