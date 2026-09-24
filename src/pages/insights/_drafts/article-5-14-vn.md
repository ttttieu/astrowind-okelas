---
title: "AI Agent và Workflow: ai quyết định, ai thực thi?"
slug: "ai-agent-quyet-dinh-workflow-thuc-thi"
language: "vi"
translationKey: "article-5-14-decide-vs-execute"
type: "analysis"
cluster: "workflow"
parentPillar: "pillar-5-next-gen-workflow"
funnelStage: ["understanding"]
audience: ["CIO", "COO"]
date: 2026-09-23
draft: true
seo:
  title: "AI Agent và Workflow: ai quyết định, ai thực thi?"
  description: "Khi AI agent và workflow cùng tham gia vận hành, cần xác định rõ: ai có quyền quyết định và ai có nhiệm vụ thực thi. Bài viết phân tích cách phân chia trách nhiệm đúng đắn."
  primaryKeyword: "AI agent quyết định workflow thực thi"
  secondaryKeywords:
    - "phân chia trách nhiệm AI workflow"
    - "decision making AI"
    - "workflow execution AI"
    - "AI authority workflow"
  searchIntent: "Understanding — CIO/COO muốn thiết kế đúng quan hệ giữa AI và workflow"
cta:
  primary: "Workflow Readiness Assessment"
relatedInternalLinks:
  - "workflow-thong-minh-the-he-moi" # Pillar 5, parent
  - "ai-agent-va-workflow" # bài 5.13, trước
  - "quy-tac-vs-reasoning" # bài 5.15 (đề xuất), sau
  - "least-privilege-cho-ai" # bài 6.12 (đề xuất), cross-cluster
  - "workflow-readiness-assessment"
evidenceSources:
  - "COSO Internal Control – Integrated Framework — nguyên tắc Segregation of Duties (phân tách trách nhiệm)"
---

## Tóm tắt cho CIO/COO

- Bài trước đã xác lập nguyên tắc chung: workflow cung cấp cấu trúc, agent đảm nhận phần lập luận. Bài này đi sâu vào một câu hỏi cụ thể hơn: trong cấu trúc đó, **ai thực sự có quyền quyết định, và ai chỉ có nhiệm vụ thực thi?**
- Một nguyên tắc quản trị nội bộ đã tồn tại từ lâu trong lĩnh vực kiểm toán và tài chính — **Segregation of Duties (phân tách trách nhiệm)**, một cấu phần cốt lõi của khung COSO Internal Control — Integrated Framework — quy định rằng không một cá nhân nào nên đồng thời nắm quyền khởi tạo, phê duyệt, thực hiện và ghi nhận một giao dịch. Nguyên tắc này áp dụng gần như nguyên vẹn vào việc thiết kế quan hệ giữa AI agent và workflow.
- Vai trò của workflow không phải "thực thi mọi thứ", mà là **xác định ranh giới quyền hạn**: hành động nào cần quyết định, ai (hoặc điều kiện nào) được coi là đã "quyết định" hợp lệ, và ai chịu trách nhiệm thực thi sau đó.
- Vai trò của agent là **lập luận và đề xuất** trong ranh giới đó — nhưng việc agent đưa ra một đề xuất không tự động đồng nghĩa với việc đề xuất đó đã được "quyết định" theo đúng nghĩa quản trị.
- Một mô hình phân chia trách nhiệm rõ ràng — ai đề xuất, ai xác nhận thẩm quyền, ai thực thi, ai ghi nhận evidence — là điều kiện tiên quyết để đưa agent vào bất kỳ workflow nào có rủi ro thực sự.

---

## Mở đầu

Một câu hỏi tưởng như đơn giản nhưng thường bị bỏ qua khi thiết kế hệ thống có AI agent tham gia: khi agent đưa ra một đề xuất và sau đó có một hành động được thực hiện, **ai là người đã thực sự quyết định?**

Câu trả lời tưởng nhiên là "con người, vì agent chỉ đề xuất". Nhưng trong thực tế triển khai, ranh giới này thường mờ đi rất nhanh: nếu agent tự động thực thi khi không có phản hồi trong một khoảng thời gian, nếu "xác nhận" chỉ là một cú click không thực sự xem xét nội dung, hoặc nếu agent được cấp quyền truy cập trực tiếp vào hệ thống thực thi — thì trên giấy tờ có vẻ như "con người quyết định", nhưng trên thực tế, quyết định đã được đưa ra bởi agent từ trước đó.

Đây không phải một vấn đề lý thuyết. Nó là vấn đề quản trị cụ thể, và ngành kiểm toán tài chính đã có một nguyên tắc để xử lý đúng loại vấn đề này từ nhiều thập kỷ trước.

---

## Decision vs execution — hai vai trò khác nhau

**Claim:** Quyết định và thực thi là hai vai trò khác nhau về bản chất, và việc gộp chung hai vai trò này vào một thực thể duy nhất (dù là con người hay AI) làm suy yếu khả năng kiểm soát của toàn bộ hệ thống.

Nguyên tắc **Segregation of Duties (phân tách trách nhiệm)**, một trong những cấu phần trọng tâm của khung COSO Internal Control — Integrated Framework, được xây dựng chính xác để xử lý vấn đề này trong bối cảnh tài chính - kế toán. Nguyên tắc quy định: không một cá nhân nào nên đồng thời nắm giữ nhiều hơn một trong các vai trò — khởi tạo giao dịch, phê duyệt giao dịch, có quyền truy cập trực tiếp tài sản liên quan, và ghi nhận/đối chiếu giao dịch đó. Lý do nền tảng: khi một người (hoặc một hệ thống) nắm toàn bộ các vai trò này, khả năng phát hiện sai sót hoặc gian lận giảm mạnh, vì không còn ai đóng vai trò kiểm tra độc lập.

Áp dụng nguyên tắc này vào bối cảnh AI agent và workflow, có thể nhận diện rõ hai vai trò cần được tách bạch:

- **Decision (quyết định):** hành động xác nhận rằng một đề xuất cụ thể được chấp thuận để thực hiện, dựa trên việc đã cân nhắc đầy đủ ngữ cảnh và rủi ro liên quan.
- **Execution (thực thi):** hành động thực sự thực hiện những gì đã được quyết định — gửi tiền, cập nhật hồ sơ, gửi thông báo ra ngoài tổ chức.

**Ý nghĩa:** Nếu agent vừa là bên đề xuất, vừa là bên có khả năng kỹ thuật để tự thực thi mà không qua một điểm xác nhận độc lập, hệ thống đã vô tình gộp hai vai trò lẽ ra cần tách biệt — bất kể tài liệu thiết kế có ghi "con người vẫn quyết định" hay không.

---

## Workflow xác định boundary

Vai trò cốt lõi của workflow trong mối quan hệ với agent không phải là "chứa" agent về mặt kỹ thuật, mà là **xác định ranh giới quyền hạn một cách tường minh, trước khi bất kỳ đề xuất nào của agent được đưa ra.**

Ranh giới này cần trả lời rõ ba câu hỏi cho mỗi loại hành động trong quy trình:

1. **Hành động này có cần một quyết định độc lập hay không?** Một số hành động (ví dụ gửi một email nội bộ nhắc nhở) có thể không cần, vì hậu quả thấp và dễ đảo ngược. Một số hành động khác (chuyển tiền, gửi phản hồi chính thức ra ngoài) luôn cần.
2. **Điều kiện nào được coi là một quyết định hợp lệ?** Đây là điểm dễ bị làm mờ nhất trong thực tế — cần định nghĩa rõ: một cú click xác nhận không kèm xem xét nội dung có được tính là quyết định hợp lệ không? Một khoảng thời gian chờ không phản hồi rồi tự động tiến hành có được tính là quyết định hợp lệ không?
3. **Ai hoặc hệ thống nào chịu trách nhiệm thực thi sau khi có quyết định?** Thực thi nên là một bước tách biệt, được kích hoạt bởi một quyết định hợp lệ đã ghi nhận — không phải một phần tự động nối tiếp ngay sau đề xuất.

Workflow là nơi ba câu hỏi này được trả lời một cách tường minh và nhất quán, thay vì để mặc định hình thành một cách ngẫu nhiên qua cách agent được cấu hình kỹ thuật.

---

## AI agent reasoning trong boundary

Trong ranh giới đã được workflow xác định, vai trò của agent là **lập luận và đưa ra đề xuất có căn cứ** — nhưng đề xuất đó, dù chất lượng cao đến đâu, không tự động trở thành một quyết định hợp lệ theo đúng nghĩa quản trị.

Điều này có một số hệ quả thiết kế cụ thể:

- **Đề xuất của agent cần được trình bày rõ ràng là đề xuất**, không phải hành động đã hoàn tất — kèm căn cứ (dữ liệu nào, tiền lệ nào) để người xem xét có thể thực sự đánh giá, không chỉ xác nhận theo phản xạ.
- **Agent không nên có quyền truy cập kỹ thuật để tự thực thi** những hành động đã được xác định là cần quyết định độc lập, ngay cả khi agent "tự tin" vào đề xuất của mình. Khả năng kỹ thuật để thực thi nên tách biệt khỏi khả năng lập luận để đề xuất.
- **Việc agent xử lý một trường hợp nhanh hơn không có nghĩa là ranh giới quyết định/thực thi được phép mờ đi.** Tốc độ là lợi ích của agent trong việc chuẩn bị và lập luận — không phải lý do để bỏ qua bước quyết định độc lập ở những hành động thực sự cần nó.

Đây chính là điểm nối với bài trước trong series: agent giỏi ở phần cần lập luận linh hoạt, nhưng năng lực lập luận tốt không đồng nghĩa với việc nên trao luôn quyền quyết định và thực thi cho cùng một thực thể.

---

## Mô hình phân chia trách nhiệm

Kết hợp các phần trên thành một mô hình bốn vai trò có thể áp dụng cho một hành động cụ thể trong workflow:

| Vai trò | Ai/cái gì đảm nhận | Trách nhiệm |
|---|---|---|
| **Đề xuất (Propose)** | AI agent | Lập luận dựa trên dữ liệu và tiền lệ, đưa ra đề xuất kèm căn cứ rõ ràng |
| **Xác nhận thẩm quyền (Authorize)** | Người hoặc quy tắc đã định trước trong workflow | Xác nhận đề xuất có nằm trong ngưỡng được phép tự động hay cần chuyển lên người có thẩm quyền cao hơn |
| **Thực thi (Execute)** | Hệ thống thực thi, tách biệt về mặt kỹ thuật khỏi agent đề xuất | Thực hiện hành động sau khi có xác nhận thẩm quyền hợp lệ |
| **Ghi nhận (Record)** | Hệ thống workflow | Lưu lại toàn bộ evidence: ai đề xuất, dựa trên gì, ai xác nhận, khi nào thực thi |

Bốn vai trò này không nhất thiết cần bốn con người hay bốn hệ thống hoàn toàn tách biệt trong mọi trường hợp — với những hành động rủi ro thấp, vai trò "xác nhận thẩm quyền" có thể là một quy tắc tự động đã được con người phê duyệt trước (nhắc lại nguyên tắc Event → Action đã bàn ở bài 5.9). Nhưng với những hành động có rủi ro hoặc hậu quả đáng kể, bốn vai trò này nên được tách biệt rõ ràng, đúng tinh thần của nguyên tắc segregation of duties.

---

## Kết luận

Câu hỏi "ai quyết định, ai thực thi" không phải một chi tiết kỹ thuật phụ — nó là câu hỏi quản trị cốt lõi khi đưa AI agent vào bất kỳ workflow nào có rủi ro thực sự. Một nguyên tắc đã tồn tại hàng thập kỷ trong lĩnh vực kiểm soát nội bộ — không gộp chung vai trò khởi tạo, phê duyệt và thực thi vào một thực thể duy nhất — áp dụng gần như nguyên vẹn vào bối cảnh này. Agent có thể lập luận và đề xuất xuất sắc; điều đó không thay đổi việc quyết định và thực thi vẫn cần được tách bạch và ghi nhận rõ ràng.

## Bước tiếp theo

Với một quy trình cụ thể đang cân nhắc đưa agent vào, thử điền bảng bốn vai trò ở trên: ai đề xuất, ai xác nhận thẩm quyền, ai thực thi, ai ghi nhận evidence. Nếu không thể điền rõ ràng cả bốn ô, đó là dấu hiệu ranh giới quyết định/thực thi chưa được thiết kế đủ chặt chẽ trước khi triển khai. Hoặc làm **Workflow Readiness Assessment** để đánh giá mức độ sẵn sàng của tổ chức.
