---
title: "Khi các AI Agent bắt đầu phối hợp: multi-agent behavior và những điều cần lưu ý"
description: "Một agent có giới hạn quyền hạn. Nhiều agent phối hợp có thể tạo ra hành vi và tác động lớn hơn tổng quyền được cấp. Đây là lý do multi-agent system cần một lớp kiểm soát riêng."
publishDate: 2026-09-23T00:00:00Z
coverImage: '~/assets/images/insights/multi-agent-ai-phoi-hop/amas-00-og-cover-vi.png'
ogImage: '~/assets/images/insights/multi-agent-ai-phoi-hop/amas-00-og-cover-vi.png'
coverImageAlt: "Bên trái là ba agent có quyền riêng hẹp; bên phải là một khối quyền hiệu dụng lớn hơn, nối bằng mũi tên nét đứt có nhãn có thể vượt tổng."
translationId: article-6-6-multi-agent-systems
lang: vi
category: ai
contentType: Analysis
funnelStage:
  - Understanding
audience:
  - CIO
  - IT Architect
primaryKeyword: "multi-agent AI phối hợp"
secondaryKeywords:
  - "multi-agent system"
  - "AI agents phối hợp"
  - "multi-agent behavior"
  - "AI agent communication"
assessmentHref: /readiness/ai
ctaPrimaryText: 'Assess your AI readiness'
ctaSubtitle: 'Xác định mức độ sẵn sàng AI của doanh nghiệp bạn'
draft: false
---

---

> **Tóm tắt cho CIO/IT Architect**
>
> - Một AI agent đơn lẻ, được thiết kế đúng nguyên tắc least privilege, có phạm vi quyền hạn giới hạn và dễ kiểm soát. Nhưng khi nhiều agent được kết nối để phối hợp với nhau — thường qua một agent "điều phối" (orchestrator) — động lực học của hệ thống thay đổi theo cách không đơn giản là cộng dồn.
> - Cơ chế rủi ro cốt lõi ở đây không mới — nó là **"confused deputy problem"**, một lỗ hổng kiểm soát truy cập kinh điển được Norm Hardy mô tả từ năm 1988: một chương trình có đặc quyền bị một bên ít đặc quyền hơn lừa để lạm dụng chính đặc quyền đó. Cloud Security Alliance, trong các nghiên cứu công bố năm 2026, ghi nhận mẫu hình này đang tái xuất hiện ở mức độ nghiêm trọng cao hơn trong kiến trúc multi-agent.
> - Vấn đề cụ thể: một agent điều phối (orchestrator) thường cần quyền truy cập rộng hơn để phối hợp các agent con — biến chính nó thành một "deputy" có đặc quyền cao, và là mục tiêu hấp dẫn để một agent con (hoặc dữ liệu bị thao túng) lợi dụng.
> - Đây chính là điều CSA gọi là **"the aggregation problem"** — tổng quyền hạn hiệu quả của một hệ thống multi-agent có thể lớn hơn nhiều so với quyền hạn riêng lẻ của từng agent cộng lại.
> - Với doanh nghiệp: kiểm soát từng agent riêng lẻ theo least privilege là điều kiện cần, nhưng không đủ — cần thêm một lớp kiểm soát ở cấp độ **luồng thông tin giữa các agent**.

---

Các bài trước trong series đã tập trung vào rủi ro của một AI agent đơn lẻ — quyền hạn của nó, cách nó ra quyết định, cách nó có thể lệch khỏi ý định ban đầu. Nhưng thực tế triển khai doanh nghiệp đang tiến nhanh tới một kiến trúc phức tạp hơn: nhiều agent, mỗi agent chuyên trách một phần việc, phối hợp với nhau để hoàn thành một nhiệm vụ lớn hơn — thường được điều phối bởi một agent trung tâm.

Câu hỏi quan trọng ở đây không phải "mỗi agent trong hệ thống này có an toàn không" — mà là **"khi các agent này phối hợp, hệ thống tổng thể có hành xử theo cách vượt quá những gì từng phần riêng lẻ được thiết kế để làm hay không?"**

---

## Multi-agent system là gì

![Sơ đồ: một orchestrator quyền rộng nối xuống ba sub-agent quyền hẹp.](~/assets/images/insights/multi-agent-ai-phoi-hop/amas-01-orchestrator-vi.svg)

Một multi-agent system trong bối cảnh doanh nghiệp thường có cấu trúc: một **agent điều phối (orchestrator)** nhận một nhiệm vụ tổng quát, chia nhỏ thành các nhiệm vụ con, và giao cho các **agent chuyên trách (sub-agent)** — mỗi agent con thường được thiết kế cho một phạm vi hẹp. Kết quả từ các agent con được orchestrator tổng hợp lại và trả về, hoặc dùng để quyết định bước tiếp theo.

Về lý thuyết, mô hình này có vẻ an toàn hơn một agent duy nhất làm mọi việc: mỗi agent con chỉ cần quyền hạn hẹp, tương ứng đúng với nhiệm vụ của nó — đúng tinh thần least privilege. Nhưng cấu trúc này cũng tạo ra một điểm mới cần chú ý: **bản thân agent điều phối, để làm được việc của mình, thường cần quyền truy cập hoặc khả năng giao tiếp rộng hơn bất kỳ agent con nào.**

---

## Tại sao nhiều agent tạo ra dynamics khác

![Chuỗi ba khối: người dùng không có quyền, compiler dùng quyền của mình, file billing bị ghi đè; bên dưới là một ghi chú.](~/assets/images/insights/multi-agent-ai-phoi-hop/amas-02-confused-deputy-vi.svg)

**Claim:** Vị trí "điều phối" trong một hệ thống multi-agent tái tạo chính xác điều kiện của một lỗ hổng bảo mật đã được biết đến từ nhiều thập kỷ trước — **confused deputy problem**.

Norm Hardy mô tả vấn đề này lần đầu vào năm 1988, thông qua một ví dụ kinh điển: một trình biên dịch có quyền ghi file thống kê sử dụng vào một file billing cụ thể. Khi người dùng yêu cầu trình biên dịch ghi output gỡ lỗi vào một đường dẫn tùy ý, trình biên dịch kiểm tra quyền hạn của chính nó (nó có quyền ghi), và vô tình ghi đè lên file billing — dù người dùng gửi yêu cầu đó không hề có quyền truy cập file đó.

Cloud Security Alliance, trong các nghiên cứu công bố năm 2026 ("Confused Deputy Attacks on Autonomous AI Agents" và "Cross-Agent Privilege Escalation in Agentic Identity"), chỉ ra ba yếu tố cấu trúc khiến vấn đề này trở nên nghiêm trọng hơn trong kiến trúc AI agent hiện đại: (1) agent có xu hướng coi mọi nội dung trong ngữ cảnh là có thể mang tính chỉ dẫn, xóa nhòa ranh giới giữa dữ liệu và lệnh; (2) quyền hạn rộng giúp agent hữu ích cũng khiến hậu quả của một cuộc tấn công thành công trở nên nghiêm trọng; (3) kiến trúc multi-agent tạo ra đường lan truyền cho các cuộc tấn công, có thể vượt qua ranh giới tổ chức mà không có sự giám sát của con người ở từng bước.

Agent điều phối, dù không "xấu", có thể bị một agent con (hoặc dữ liệu mà agent con xử lý) thao túng để thực hiện một hành động vượt quá phạm vi mà người yêu cầu ban đầu được phép — chính xác là cơ chế confused deputy, tái hiện ở quy mô hệ thống multi-agent.

→ *Liên quan: [Least privilege cho AI agent: thiết kế quyền hạn khớp với nhiệm vụ](/insights/ai/least-privilege-cho-ai)*

---

## Câu hỏi về quyền hạn tổng hợp

![Ba agent có quyền riêng đổ vào một khối quyền hiệu dụng của hệ thống, lớn hơn tổng các phần.](~/assets/images/insights/multi-agent-ai-phoi-hop/amas-03-aggregation-vi.svg)

Đây là điều CSA gọi là **"the aggregation problem"** trong mạng lưới multi-agent: quyền hạn hiệu quả của toàn hệ thống có thể lớn hơn tổng quyền hạn được cấp cho từng agent riêng lẻ, vì thông tin có thể được chuyển tiếp qua nhiều agent theo những đường đi không ai thiết kế trước.

Câu hỏi thực tế mà mọi CIO/IT Architect cần tự hỏi: **"nếu cộng tất cả các đường truy xuất và chuyển tiếp thông tin có thể xảy ra giữa các agent trong hệ thống này lại, phạm vi dữ liệu và hành động thực tế có thể đạt được là gì — và nó có vượt quá những gì bất kỳ cá nhân agent nào được cấp phép riêng lẻ hay không?"** Đây là câu hỏi mà việc kiểm tra từng agent riêng lẻ không trả lời được.

Đây cũng là lý do một lớp trung gian có tính xác định — như cách KVM (đã trình bày trong Pillar 6) buộc mọi truy cập tri thức tổ chức phải đi qua các thao tác được kiểm chứng (Trace, FindEvidence, Resolve) thay vì để agent tự do truy cập và chuyển tiếp dữ liệu thô cho nhau — là một hướng kiến trúc có thể giảm bớt bề mặt cho vấn đề tổng hợp quyền hạn.

![Ba agent đi vào khối KVM với ba chức năng Trace, FindEvidence, Resolve, rồi tới tri thức tổ chức.](~/assets/images/insights/multi-agent-ai-phoi-hop/amas-05-kvm-intermediary-vi.svg)

---

## Hàm ý cho enterprise control

![Ba hàng đánh số, mỗi hàng là một hàm ý cho doanh nghiệp.](~/assets/images/insights/multi-agent-ai-phoi-hop/amas-04-implications-vi.svg)

Từ phân tích trên, ba hàm ý cụ thể khi doanh nghiệp thiết kế hoặc đánh giá một hệ thống multi-agent:

**1. Kiểm soát cần đặt ở cấp độ hành động cụ thể, không chỉ ở cấp độ định danh agent.** Hệ thống cần xác thực rằng mỗi hành động cụ thể, tại thời điểm thực thi, thực sự nằm trong phạm vi mà người yêu cầu gốc được phép, không chỉ dựa vào việc agent điều phối "có quyền" thực hiện hành động đó về mặt kỹ thuật.

**2. Agent điều phối cần được coi là mục tiêu rủi ro cao nhất trong hệ thống, không phải một thành phần trung lập.** Vì nó thường nắm quyền truy cập rộng nhất để phối hợp, agent điều phối xứng đáng nhận mức độ giám sát và kiểm soát tương đương với agent có quyền hạn cao nhất trong toàn hệ thống.

**3. Giám sát luồng dữ liệu giữa các agent, không chỉ giám sát từng agent.** Nhật ký hoạt động của từng agent riêng lẻ có thể trông hoàn toàn bình thường, trong khi tổng hợp luồng thông tin giữa chúng lại cho thấy một đường đi bất thường.

---

*Bài viết này là một phần trong chuỗi OKELAS AI Control.*

**Bài liên quan:**
- [Khi AI tìm cách vượt qua giới hạn — những gì nghiên cứu đã ghi nhận](/insights/ai/ai-vuot-qua-gioi-han-nghien-cuu)
- [Least privilege cho AI agent: thiết kế quyền hạn khớp với nhiệm vụ](/insights/ai/least-privilege-cho-ai)
- [AI được phép làm đến đâu? Tại sao doanh nghiệp cần một control layer](/insights/ai/kiem-soat-ai-doanh-nghiep)

**→ [AI Readiness Assessment](/readiness/ai)**
