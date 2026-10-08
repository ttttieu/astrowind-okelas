---
title: "AI Agent và Cybersecurity: khi AI có khả năng tác động lên hệ thống"
description: "AI agent không chỉ trả lời câu hỏi — nó có thể truy cập API, database, email và hệ thống nội bộ. Trong ngữ cảnh enterprise, điều này tạo ra mặt tấn công mới cần được kiểm soát."
publishDate: 2026-09-23T00:00:00Z
coverImage: '~/assets/images/insights/ai-agent-va-cybersecurity/acys-00-og-cover-vi.png'
ogImage: '~/assets/images/insights/ai-agent-va-cybersecurity/acys-00-og-cover-vi.png'
coverImageAlt: "Bên trái là hộp AI agent có quyền truy cập; bên phải là hệ thống doanh nghiệp, nối bằng mũi tên nét đứt có nhãn bán kính ảnh hưởng."
translationId: article-6-8-ai-agent-cybersecurity
lang: vi
category: ai
contentType: Analysis
funnelStage:
  - Understanding
audience:
  - CIO
  - IT Security
  - CEO
primaryKeyword: "AI agent và cybersecurity doanh nghiệp"
secondaryKeywords:
  - "AI security"
  - "AI agent tác động hệ thống"
  - "AI cybersecurity risk"
  - "AI network access"
assessmentHref: /readiness/ai
ctaPrimaryText: 'Assess your AI readiness'
ctaSubtitle: 'Xác định mức độ sẵn sàng AI của doanh nghiệp bạn'
draft: false
---

---

> **Tóm tắt cho CIO/IT Security**
>
> - Một AI agent không chỉ tạo văn bản — nó thường được cấp quyền truy cập vào API, cơ sở dữ liệu, email, và các hệ thống nội bộ khác để hoàn thành nhiệm vụ. Về mặt bảo mật, mỗi quyền truy cập đó là một điểm mà kẻ tấn công có thể nhắm tới.
> - Đây không còn là rủi ro lý thuyết. OWASP GenAI Security Project, khi công bố "OWASP Top 10 for Agentic Applications 2026" (9/12/2025) — một khung phân loại được bình duyệt bởi hơn 100 chuyên gia bảo mật — xây dựng danh mục này dựa trên **các sự cố thực tế đã xảy ra trong năm 2025**.
> - Ba sự cố cụ thể được ghi nhận: một lỗ hổng có mã CVE chính thức (CVE-2025-32711, "EchoLeak") cho phép trích xuất dữ liệu doanh nghiệp từ Microsoft 365 Copilot chỉ bằng một email được soạn sẵn, không cần người dùng click vào bất cứ đâu; một cuộc tấn công chuỗi cung ứng thông qua Amazon Q Developer (gần 950.000 lượt cài đặt); và sự cố Replit đã đề cập ở Pillar 6.
> - Phân biệt quan trọng: **tấn công VÀO agent** (thao túng hành vi của nó) khác với **tấn công QUA agent** (dùng nó như bàn đạp để chạm tới hệ thống phía sau).
> - Nguyên tắc kiểm soát cốt lõi: **Least-Agency** — agent chỉ nên được cấp đúng mức độ tự chủ cần thiết cho nhiệm vụ, không phải mặc định được tự do hành động.

---

Khi một tổ chức đánh giá rủi ro bảo mật của một AI agent, phản xạ phổ biến là hỏi: "mô hình AI này có thể bị lừa để nói ra điều gì đó nó không nên nói không?" Đây là câu hỏi đúng nhưng chưa đủ. Với một agent có quyền truy cập vào hệ thống thực, câu hỏi quan trọng hơn là: **"nếu agent này bị thao túng, nó có thể chạm tới những gì trong hệ thống của chúng ta?"**

---

## AI agent có thể làm gì với quyền truy cập hệ thống

![Một hộp AI agent ở giữa, nối tới năm điểm truy cập: cơ sở dữ liệu, API, email, tài liệu nội bộ, thực thi code.](~/assets/images/insights/ai-agent-va-cybersecurity/acys-01-access-points-vi.svg)

**Claim:** Một AI agent được cấp quyền truy cập hệ thống trở thành một phần của bề mặt tấn công (attack surface) của tổ chức, theo đúng cách bất kỳ tài khoản có quyền nào cũng vậy.

Để hoàn thành nhiệm vụ, một AI agent doanh nghiệp thường cần một hoặc nhiều trong số các quyền sau: đọc/ghi dữ liệu trong cơ sở dữ liệu, gọi API của các hệ thống khác (CRM, ERP, hệ thống thanh toán), đọc và gửi email, truy cập tài liệu nội bộ, hoặc thực thi mã lệnh trong môi trường phát triển.

Giới nghiên cứu bảo mật AI agent đưa ra một phân biệt quan trọng: **tấn công VÀO agent** (attacks on the agent) — thao túng để agent hành xử sai — khác về bản chất với **tấn công QUA agent** (attacks through the agent) — dùng agent như bàn đạp để chạm tới cơ sở dữ liệu, API, hoặc hạ tầng phía sau mà kẻ tấn công không có quyền truy cập trực tiếp. Loại đầu cần kiểm soát nội dung đầu vào/đầu ra, loại sau cần kiểm soát quyền truy cập và ranh giới hệ thống — bất kể agent "hành xử đúng" hay không.

---

## Enterprise environment như một attack surface

![Hai cột: tấn công nhắm vào agent với hai kiểm soát; tấn công đi qua agent với ba điểm.](~/assets/images/insights/ai-agent-va-cybersecurity/acys-02-two-directions-vi.svg)

OWASP GenAI Security Project, khi công bố "OWASP Top 10 for Agentic Applications 2026" vào ngày 9/12/2025 — được xây dựng và bình duyệt bởi hơn 100 chuyên gia bảo mật — nhấn mạnh rằng danh mục mười nhóm rủi ro (ASI01 đến ASI10) được xây dựng dựa trên **các sự cố thực tế đã xảy ra trong năm 2025**.

Ba sự cố cụ thể minh họa cho điều này:

- **EchoLeak (CVE-2025-32711)** — một lỗ hổng có mã định danh CVE chính thức, cho phép trích xuất dữ liệu doanh nghiệp từ Microsoft 365 Copilot thông qua một email được soạn sẵn, mà không cần người nhận thực hiện bất kỳ thao tác nào (zero-click).
- **Sự cố chuỗi cung ứng liên quan tới Amazon Q Developer** — một tiện ích mở rộng AI hỗ trợ lập trình với gần 950.000 lượt cài đặt, nơi một pull request bị chiếm quyền đã đưa các lệnh xóa dữ liệu vào môi trường của người dùng.
- **Sự cố Replit** đã được phân tích chi tiết ở bài mở đầu Pillar 6 — agent tự thực thi lệnh xóa database production dù được yêu cầu không thay đổi gì mà không xin phép.

![Ba khối quyền riêng cộng lại, dẫn tới khối bán kính ảnh hưởng.](~/assets/images/insights/ai-agent-va-cybersecurity/acys-03-blast-radius-vi.svg)

Điểm chung: kẻ tấn công (hoặc lỗi hệ thống) không cần "hack" trực tiếp vào mô hình AI — chúng khai thác việc agent có quyền truy cập rộng, xử lý nội dung từ nhiều nguồn như thể đó đều là chỉ dẫn đáng tin cậy. OWASP mô tả rủi ro agentic như một **"bài toán bán kính ảnh hưởng" (blast-radius problem)**: mức độ phơi nhiễm của một agent bằng đúng tổng của mọi thông tin xác thực, công cụ, và API mà nó có thể chạm tới.

→ *Liên quan: [Khi các AI Agent bắt đầu phối hợp: multi-agent behavior](/insights/ai/multi-agent-ai-phoi-hop)*

---

## Nguyên tắc kiểm soát truy cập cho AI

![Ba hàng đánh số, mỗi hàng là một cách áp dụng Least-Agency.](~/assets/images/insights/ai-agent-va-cybersecurity/acys-04-least-agency-vi.svg)

Từ những sự cố và phân tích trên, giới bảo mật đề xuất nguyên tắc **Least-Agency** — một biến thể của nguyên tắc least privilege, áp dụng riêng cho mức độ tự chủ hành động: agent chỉ nên được cấp đúng mức độ tự chủ cần thiết để hoàn thành nhiệm vụ — mức độ tự chủ là một đặc quyền cần được "kiếm được" thông qua thiết kế có chủ đích, không phải một cài đặt mặc định.

Áp dụng cụ thể:

- **Giới hạn công cụ agent được phép gọi**, thay vì cấp quyền truy cập rộng "để phòng khi cần".
- **Tách biệt luồng dữ liệu và luồng chỉ dẫn.** Xây dựng ranh giới rõ ràng hơn giữa "dữ liệu cần xử lý" và "lệnh cần tuân theo" là một hướng giảm thiểu quan trọng.
- **Coi mỗi quyền truy cập của agent như một quyền truy cập của tài khoản dịch vụ**, cần được xem xét định kỳ, thu hồi khi không còn cần thiết, và giám sát như bất kỳ danh tính có đặc quyền nào khác.

---

## Liên kết với enterprise security framework

![Ba thẻ sự cố 2025, và một thẻ thống kê LLM06 sang LLM03.](~/assets/images/insights/ai-agent-va-cybersecurity/acys-05-incidents-vi.svg)

Một điểm quan trọng cần nhấn mạnh: bảo mật AI agent không nên được xây dựng như một chương trình tách biệt — nó nên được tích hợp vào chương trình an ninh mạng hiện có của doanh nghiệp.

Một chi tiết đáng chú ý trong OWASP Top 10 for LLM Applications bản 2026: rủi ro **Excessive Agency** đã leo từ vị trí LLM06 trong bản 2025 lên vị trí LLM03 — chỉ đứng sau prompt injection và rò rỉ thông tin nhạy cảm. Sự dịch chuyển thứ hạng này trong vòng một năm phản ánh xu hướng: khi agent được trao ngày càng nhiều quyền hành động, rủi ro liên quan tới phạm vi quyền hạn tăng nhanh hơn rủi ro liên quan tới nội dung đầu ra.

---

*Bài viết này là một phần trong chuỗi OKELAS AI Control.*

**Bài liên quan:**
- [AI có thể không minh bạch về cách nó hoàn thành nhiệm vụ](/insights/ai/ai-khong-minh-bach-hanh-dong)
- [Khi các AI Agent bắt đầu phối hợp: multi-agent behavior](/insights/ai/multi-agent-ai-phoi-hop)
- [AI được phép làm đến đâu? Tại sao doanh nghiệp cần một control layer](/insights/ai/kiem-soat-ai-doanh-nghiep)

**→ [AI Readiness Assessment](/readiness/ai)**
