---
title: "Từ Workflow Automation đến Agentic Workflow"
slug: "tu-automation-den-agentic-workflow"
language: "vi"
translationKey: "article-5-16-agentic-workflow"
type: "analysis"
cluster: "workflow"
parentPillar: "pillar-5-next-gen-workflow"
funnelStage: ["consideration"]
audience: ["CIO", "COO"]
date: 2026-09-23
draft: true
seo:
  title: "Từ Workflow Automation đến Agentic Workflow — tầng tiếp theo của quy trình thông minh"
  description: "Automation giúp workflow chạy tự động theo rule. Agentic workflow tiến thêm một bước: AI agent có thể tự lập kế hoạch, chọn công cụ và thực hiện nhiệm vụ trong phạm vi được phép."
  primaryKeyword: "agentic workflow"
  secondaryKeywords:
    - "agentic workflow là gì"
    - "từ automation đến agentic"
    - "AI agentic process"
    - "workflow AI tự chủ"
  searchIntent: "Consideration — CIO/COO muốn hiểu agentic workflow"
cta:
  primary: "Workflow Readiness Assessment"
  secondary: "Liên hệ OKELAS"
relatedInternalLinks:
  - "workflow-thong-minh-the-he-moi" # Pillar 5, parent
  - "workflow-rule-ai-reasoning" # bài 5.15, trước
  - "ai-participant-trong-workflow" # bài 5.17 (đề xuất), sau
  - "agentic-workflow-control-layer" # bài 6.16 (đề xuất, Cluster 6), cross-cluster
  - "workflow-readiness-assessment"
evidenceSources:
  - "Anthropic, \"Building Effective Agents\", 2024 — các mẫu thiết kế workflow và agent"
  - "OWASP GenAI Security Project, \"OWASP Top 10 for Agentic Applications\", 2026"
  - "NIST AI Risk Management Framework"
---

## Tóm tắt cho CIO/COO

- Bài này tổng hợp lại toàn bộ mạch lý luận từ các bài trước (5.13–5.15) thành một bức tranh hoàn chỉnh: **agentic workflow là gì, khác automation ở đâu, và cần điều kiện gì để vận hành an toàn.**
- Automation truyền thống (kể cả automation "nâng cao") thực thi đúng một kịch bản đã lập trình. Agentic workflow thêm khả năng: agent có thể tự lập kế hoạch nhiều bước, tự chọn công cụ để dùng, và điều chỉnh hành động dựa trên kết quả trung gian — nhưng vẫn trong phạm vi cấu trúc và quyền hạn do workflow xác định.
- Anthropic, trong tài liệu "Building Effective Agents", liệt kê một dải các mẫu thiết kế trước khi tới agent hoàn toàn tự chủ: từ prompt chaining, routing, parallelization, đến orchestrator-workers và evaluator-optimizer — cho thấy "agentic" là một dải khả năng, không phải một công tắc bật/tắt.
- Ba điều kiện để agentic workflow hoạt động an toàn — kế thừa trực tiếp từ các bài trước: ranh giới quyết định/thực thi rõ ràng (5.14), phân định đúng phần nào là rule và phần nào cần reasoning (5.15), và dữ liệu/sự kiện đủ tin cậy để agent dựa vào (5.8).
- Rủi ro cần kiểm soát không còn là rủi ro lý thuyết: OWASP Top 10 for Agentic Applications (2026) và NIST AI Risk Management Framework đều xác định rõ các nhóm rủi ro đặc thù của hệ thống agentic — và một khảo sát ngành gần đây cho thấy phần lớn tổ chức đã từng ghi nhận agent AI hành động vượt phạm vi dự định.

---

## Mở đầu

Xuyên suốt series này, chúng ta đã đi từ workflow số hóa, qua event-driven, qua automation, tới các nguyên tắc thiết kế quan hệ giữa AI agent và workflow. Bài này là điểm tổng hợp: đặt tất cả những mảnh ghép đó vào đúng vị trí của chúng trong một khái niệm đã được nhắc tới từ đầu series — **agentic workflow**.

Nhiều tài liệu marketing mô tả agentic workflow như một bước nhảy vọt — từ "quy trình cứng nhắc" sang "AI tự vận hành mọi thứ". Cách mô tả này không chính xác và có thể gây hiểu lầm nguy hiểm, như đã phân tích ở bài 5.13. Bức tranh chính xác hơn nhiều là một dải các mức độ, không phải một cú nhảy.

---

## Automation làm được gì

Như đã phân tích chi tiết ở bài 5.6, automation truyền thống (kể cả RPA hay các hình thức tiên tiến hơn) thực thi đúng một kịch bản: nếu điều kiện A đúng, thực hiện hành động B. Nó nhanh, ổn định, dễ kiểm chứng — nhưng cứng, không tự điều chỉnh khi gặp tình huống ngoài kịch bản.

Anthropic, trong tài liệu kỹ thuật "Building Effective Agents", mô tả một dải các mẫu thiết kế nằm giữa automation thuần túy và agent hoàn toàn tự chủ, theo mức độ linh hoạt tăng dần:

- **Prompt chaining** — chia một nhiệm vụ thành các bước tuần tự cố định, mỗi bước một lệnh gọi AI tập trung.
- **Routing** — phân loại đầu vào và gửi tới đúng bộ xử lý chuyên biệt (đã bàn ở bài 5.11).
- **Parallelization** — chạy song song nhiều nhiệm vụ con rồi tổng hợp kết quả.
- **Orchestrator-workers** — một mô hình "chủ trì" phân công nhiệm vụ cho các mô hình "thực thi" con.
- **Evaluator-optimizer** — một mô hình tạo ra kết quả, một mô hình khác đánh giá và đề xuất cải thiện.

Tất cả các mẫu trên vẫn thuộc phạm trù **workflow**: đường đi xử lý được lập trình sẵn, người thiết kế kiểm soát toàn bộ luồng. Chúng linh hoạt hơn một rule đơn giản, nhưng chưa phải "agentic" theo đúng nghĩa.

---

## Agentic workflow thêm gì

**Claim:** Agentic workflow bắt đầu khi agent có khả năng tự quyết định bước tiếp theo dựa trên phản hồi từ môi trường, thay vì đi theo một đường đi đã lập trình sẵn — nhưng vẫn hoạt động trong ranh giới do workflow xác định trước.

Ba năng lực mới xuất hiện ở tầng agentic, không có ở automation hay các mẫu workflow linh hoạt kể trên:

1. **Tự lập kế hoạch nhiều bước.** Agent xác định số bước cần thiết và thứ tự thực hiện dựa trên tình huống cụ thể, không theo một chuỗi cố định đã viết sẵn.
2. **Tự chọn công cụ.** Trong một tập công cụ được cấp quyền sử dụng (tra cứu dữ liệu, gọi một hệ thống khác, thực hiện một phép tính), agent tự quyết định công cụ nào cần dùng, khi nào, và theo thứ tự nào.
3. **Điều chỉnh dựa trên kết quả trung gian.** Nếu một bước cho kết quả không như kỳ vọng, agent có thể thử cách tiếp cận khác, thay vì dừng lại hoặc báo lỗi như một automation cứng.

Điểm mấu chốt, đã được nhấn mạnh ở bài 5.13: những năng lực này không có nghĩa là workflow biến mất. Agentic workflow đúng nghĩa vẫn là **một workflow có cấu trúc, quyền hạn và evidence trail rõ ràng, trong đó một hoặc nhiều bước được giao cho agent xử lý bằng ba năng lực trên** — không phải một hệ thống hoàn toàn không có cấu trúc, để agent tự quyết định từ đầu đến cuối.

---

## Điều kiện để agentic workflow hoạt động an toàn

Ba điều kiện dưới đây kế thừa trực tiếp từ các bài trước trong series, và đều cần được đáp ứng trước khi mở rộng phạm vi tự chủ của agent:

**1. Ranh giới quyết định/thực thi đã được xác định rõ (như bài 5.14).** Agentic workflow không thay đổi nguyên tắc: agent đề xuất, một điểm xác nhận độc lập (con người hoặc quy tắc đã duyệt trước) xác nhận thẩm quyền, rồi mới tới thực thi. Càng nhiều bước agent tự chủ, ranh giới này càng cần rõ ràng hơn, không mờ đi.

**2. Phần rule và phần reasoning đã được phân định đúng (như bài 5.15).** Agentic workflow phù hợp nhất với những bước thuộc vùng "cần reasoning" trên dải liên tục của Simon — nơi số bước và đường đi không thể liệt kê trước. Cố áp dụng agentic workflow cho những việc lẽ ra chỉ cần một rule đơn giản sẽ chỉ làm tăng chi phí và độ trễ mà không tạo thêm giá trị.

**3. Dữ liệu và sự kiện đủ tin cậy để agent dựa vào (như bài 5.8).** Nếu dữ liệu đầu vào không chính xác hoặc không đầy đủ, một agent có khả năng tự lập kế hoạch nhiều bước sẽ khuếch đại sai sót đó qua nhiều bước liên tiếp — nhanh hơn và khó phát hiện hơn so với một rule đơn giản chỉ sai một lần.

Ba điều kiện này giải thích vì sao agentic workflow không phải điểm khởi đầu hợp lý cho phần lớn manufacturing SME — nó là điểm đến sau khi các tầng nền tảng (event-driven, phân định rule/reasoning, ranh giới quyết định/thực thi) đã được thiết lập vững chắc.

---

## Rủi ro cần kiểm soát

Đây không còn là rủi ro lý thuyết. **OWASP Top 10 for Agentic Applications**, được OWASP GenAI Security Project công bố năm 2026 với sự đóng góp của hơn 100 chuyên gia trong ngành, dành hẳn một danh mục rủi ro riêng cho hệ thống agentic — trong đó có những nhóm rủi ro hoàn toàn mới so với các hệ thống AI truyền thống, như lạm dụng danh tính/quyền hạn của agent, và rủi ro "rogue agent" (agent hành động lệch khỏi ý định ban đầu như một mối đe dọa nội bộ tự động). Song song, **NIST AI Risk Management Framework** cung cấp khung quản trị để giám sát và kiểm soát hành vi của hệ thống agentic ở cấp tổ chức.

Một khảo sát ngành gần đây (SailPoint, "AI Agents: The New Attack Surface") được nhiều tổ chức an ninh dẫn lại cho một con số đáng chú ý: khoảng 80% tổ chức được khảo sát cho biết AI agent của họ từng thực hiện hành động vượt quá phạm vi dự định — bao gồm truy cập không được phép hoặc chia sẻ dữ liệu nhạy cảm. Đây là số liệu tự báo cáo từ một khảo sát của một công ty trong lĩnh vực bảo mật danh tính, không phải một nghiên cứu độc lập toàn ngành — nhưng nó phản ánh đúng hướng của ba rủi ro đã nêu ở bài 5.14: mất khả năng kiểm chứng, sai sót tích lũy, và quyền hạn không rõ ràng.

Nguyên tắc kiểm soát thực tế, phù hợp với cả ba nguồn trên: **guardrail cần được thực thi ở thời điểm vận hành (runtime), không chỉ tồn tại như một tài liệu chính sách.** Điều này bao gồm: giới hạn rõ những công cụ agent được phép gọi, giới hạn quyền truy cập theo đúng phạm vi cần thiết, điểm xác nhận bắt buộc trước những hành động có hậu quả lớn, và ghi log đầy đủ mọi hành động để có thể xem lại sau.

---

## Kết luận

Agentic workflow không phải một công nghệ tách biệt khỏi mọi thứ đã bàn trong series này — nó là điểm hội tụ của tất cả: event-driven để biết khi nào cần hành động, phân định rule/reasoning để biết phần nào giao cho agent, ranh giới quyết định/thực thi để kiểm soát agent trong phạm vi đó, và context-aware để agent hành động phù hợp với tình huống thực tế của tổ chức. Với phần lớn manufacturing SME, câu hỏi thực tế không phải "có nên triển khai agentic workflow ngay không", mà là "tổ chức đã xây đủ các tầng nền tảng để agentic workflow hoạt động an toàn chưa".

Đây cũng là cách OKELAS tiếp cận Copilot/Agent — không phải một chatbot độc lập, mà một participant trong workflow, hoạt động trong đúng ranh giới quyền hạn, evidence và organizational context mà nền tảng Core cung cấp.

## Bước tiếp theo

Làm **Workflow Readiness Assessment** để xác định tổ chức của bạn đã sẵn sàng ở mức nào trong hành trình tới agentic workflow. Nếu bạn muốn thảo luận sâu hơn về lộ trình cụ thể — từ event-driven, tới phân định rule/reasoning, tới agentic workflow có kiểm soát — đội ngũ OKELAS sẵn sàng trao đổi.
