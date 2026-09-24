---
title: "Từ Approval Workflow đến End-to-End Workflow"
slug: "approval-workflow-den-end-to-end"
language: "vi"
translationKey: "article-5-3-approval-to-e2e"
type: "analysis"
cluster: "workflow"
parentPillar: "pillar-5-next-gen-workflow"
funnelStage: ["understanding"]
audience: ["COO", "Operations Director"]
date: 2026-09-23
draft: true
seo:
  title: "Từ approval workflow đến end-to-end workflow — tại sao sự khác biệt quan trọng"
  description: "Hầu hết doanh nghiệp bắt đầu với approval workflow — quy trình phê duyệt. Nhưng end-to-end workflow bao phủ toàn bộ luồng công việc từ sự kiện đầu tiên đến kết quả cuối cùng."
  primaryKeyword: "end-to-end workflow doanh nghiệp"
  secondaryKeywords:
    - "approval workflow"
    - "quy trình phê duyệt"
    - "workflow toàn trình"
    - "process workflow"
  searchIntent: "Understanding — Operations muốn mở rộng workflow ra ngoài phạm vi approval"
cta:
  primary: "Workflow Readiness Assessment"
relatedInternalLinks:
  - "workflow-thong-minh-the-he-moi" # Pillar 5, parent
  - "so-hoa-workflow-vs-toi-uu-workflow" # bài 5.2, trước
  - "phu-thuoc-con-nguoi-trong-workflow" # bài 5.4, sau (đề xuất)
  - "event-driven-workflow-la-gi" # bài 5.8 (đề xuất), liên quan
  - "workflow-readiness-assessment"
evidenceSources:
  - "Maddern, Smart, Maull & Childe, \"End-to-end process management: implications for theory and practice\", University of Exeter, 2013"
  - "Sandy Kemsley, phân tích về process handoffs, Trisotech / PEX Network"
---

## Tóm tắt cho Operations

- Approval workflow là điểm khởi đầu hợp lý nhưng có phạm vi rất hẹp: nó chỉ quản lý **ai ký, khi nào ký** — không quản lý toàn bộ vòng đời của một sự việc nghiệp vụ.
- Nghiên cứu học thuật về end-to-end process management (Đại học Exeter, 2013) chỉ ra rằng điểm phân biệt cốt lõi của một quy trình "end-to-end" thực sự là **phạm vi (scope)** — quản lý toàn bộ ranh giới mở rộng, từ lúc phát sinh yêu cầu của khách hàng đến khi được đáp ứng đầy đủ — chứ không phải chỉ một vài bước bên trong.
- Phần lớn thất bại trong vận hành không xảy ra bên trong một phòng ban, mà xảy ra ở **điểm chuyển giao (handoff)** giữa các phòng ban — đây là quan sát được nhiều chuyên gia BPM nhấn mạnh nhiều năm qua.
- Doanh nghiệp có hàng chục approval workflow vẫn có thể chưa có nổi một end-to-end workflow nào cho quy trình cốt lõi của mình.
- Mở rộng từ approval sang end-to-end không phải việc thêm bước, mà là việc **định nghĩa lại ranh giới của quy trình.**

---

## Mở đầu

Nếu hỏi một Operations Director: "công ty bạn có bao nhiêu workflow?", câu trả lời thường là một con số khá lớn — mười, hai mươi, có khi hơn ba mươi. Nhưng nếu hỏi tiếp: "trong số đó, có bao nhiêu workflow theo dõi trọn vẹn một sự việc từ lúc phát sinh đến lúc thực sự được giải quyết xong, xuyên qua nhiều phòng ban?" — câu trả lời thường ít hơn hẳn, đôi khi là con số không.

Đây không phải nghịch lý ngẫu nhiên. Nó phản ánh cách hầu hết doanh nghiệp xây dựng workflow: bắt đầu từ **approval** — thứ dễ chuẩn hóa nhất, dễ đo lường nhất, và thường là thứ đầu tiên được số hóa. Nhưng approval chỉ là một lát cắt rất mỏng trong toàn bộ những gì thực sự cần được quản lý.

---

## Approval workflow là gì và làm được gì

**Claim:** Approval workflow giải quyết tốt một loại vấn đề cụ thể: kiểm soát quyền quyết định tại một hoặc vài điểm trong quy trình.

Đặc điểm của approval workflow:

- Có một yêu cầu (xin nghỉ phép, đề nghị mua hàng, đề nghị thanh toán).
- Có một chuỗi người cần ký duyệt, theo thứ tự hoặc theo cấp bậc.
- Workflow kết thúc khi đã đủ chữ ký — không quan tâm điều gì xảy ra sau đó.

**Vì sao doanh nghiệp thường bắt đầu ở đây:** Approval dễ mô hình hóa vì nó có ranh giới rõ ràng, ít ngoại lệ, và giá trị nhìn thấy ngay (không còn thất lạc, không còn chờ ký tay). Đây là lý do hợp lý để bắt đầu — không phải một sai lầm.

**Giới hạn:** Approval workflow trả lời được câu hỏi "yêu cầu này có được chấp thuận không", nhưng không trả lời được câu hỏi lớn hơn: "toàn bộ sự việc này rồi sẽ đi đến đâu, và ai chịu trách nhiệm cho tới khi nó thực sự kết thúc?"

---

## Những gì nằm ngoài approval

Đây là phần thường bị bỏ sót nhất khi doanh nghiệp đánh giá mức độ trưởng thành workflow của mình.

Lấy một ví dụ cụ thể: xử lý khiếu nại chất lượng từ khách hàng. Bước "phê duyệt hành động khắc phục" — nếu có — chỉ là một khoảnh khắc rất nhỏ trong toàn bộ sự việc. Những gì nằm ngoài phạm vi approval bao gồm:

1. **Giai đoạn trước approval:** ai tiếp nhận khiếu nại, khiếu nại được phân loại thế nào, ai điều tra nguyên nhân, dựa trên bằng chứng gì.
2. **Giai đoạn sau approval:** hành động khắc phục được thực hiện ra sao, ai xác nhận đã thực hiện, kết quả có được kiểm tra lại không.
3. **Việc đóng vòng lặp:** hồ sơ có được lưu đầy đủ để phục vụ audit không, SOP liên quan có được cập nhật nếu nguyên nhân gốc liên quan tới quy trình không.
4. **Trách nhiệm xuyên phòng ban:** khiếu nại thường đi qua sales (tiếp nhận) → QA (điều tra) → sản xuất (khắc phục) → sales (phản hồi khách hàng). Approval workflow thường chỉ số hóa một mắt xích trong chuỗi này.

Nghiên cứu của Maddern, Smart, Maull và Childe (Đại học Exeter, 2013) về quản trị quy trình end-to-end đưa ra một quan sát quan trọng: yếu tố phân biệt cốt lõi của một "end-to-end process" thực sự không phải là số lượng bước, mà là **phạm vi (scope)** — khả năng quản lý một ranh giới mở rộng, từ thời điểm yêu cầu của khách hàng phát sinh cho đến khi khách hàng thực sự được đáp ứng đầy đủ. Nói cách khác, một quy trình có thể có rất nhiều bước phê duyệt được số hóa kỹ lưỡng, nhưng vẫn không phải là end-to-end nếu nó chỉ bao phủ một đoạn ngắn ở giữa toàn bộ hành trình.

Nghiên cứu này cũng lưu ý rằng việc chuyển từ quản lý theo chức năng (functional) sang quản lý end-to-end thường khó hơn kỳ vọng — không chỉ vì kỹ thuật, mà vì nó đòi hỏi một cách nhìn hệ thống về quy trình, chứ không chỉ vẽ lại sơ đồ các bước.

---

## End-to-end workflow trông như thế nào

Một cách nhìn thực tế khác đến từ giới phân tích BPM (business process management): phần lớn thất bại trong vận hành không xảy ra *bên trong* một phòng ban, mà xảy ra tại **điểm chuyển giao (handoff)** giữa các phòng ban — nơi chi phí, độ trễ và việc phải làm lại tích tụ nhiều nhất. Đáng chú ý, các nỗ lực tối ưu hóa cục bộ trong một phòng ban đơn lẻ đôi khi còn làm cho các điểm chuyển giao này tệ hơn, vì phòng ban đó tối ưu cho chỉ số riêng của mình mà không tính đến việc nó khớp thế nào với phần còn lại của chuỗi.

Từ hai quan sát trên, một end-to-end workflow cần có:

- **Một sự kiện khởi đầu rõ ràng** (khiếu nại được ghi nhận, đơn hàng được tạo, hợp đồng được ký) — không phải "khi có người bấm nút bắt đầu quy trình phê duyệt".
- **Một kết quả cuối rõ ràng** được định nghĩa từ góc nhìn của người thụ hưởng quy trình (khách hàng, bộ phận liên quan) — không phải "khi được duyệt".
- **Khả năng theo dõi xuyên phòng ban**, với evidence được giữ lại tại mỗi điểm chuyển giao, không chỉ tại điểm ký duyệt.
- **Một người hoặc vai trò chịu trách nhiệm cho toàn bộ luồng** (process owner) — không phải mỗi phòng ban chỉ chịu trách nhiệm cho phần việc của mình.

Điểm cuối cùng này thường là rào cản lớn nhất trong thực tế: giao trách nhiệm cho một người về một kết quả mà họ không kiểm soát hoàn toàn (vì phụ thuộc vào các phòng ban khác) là điều nhiều tổ chức ngần ngại làm — không phải vì không hiểu tầm quan trọng, mà vì nó đụng chạm tới cách đánh giá hiệu suất hiện có của từng phòng ban.

---

## Lộ trình mở rộng

Không cần và không nên cố gắng biến mọi approval workflow thành end-to-end workflow cùng lúc. Một lộ trình hợp lý:

**Bước 1 — Chọn đúng quy trình để bắt đầu.** Ưu tiên những quy trình có tính lặp lại cao, xuyên nhiều phòng ban, và có ảnh hưởng trực tiếp tới khách hàng hoặc compliance — ví dụ xử lý khiếu nại chất lượng, quản lý thay đổi kỹ thuật (change control), hoặc xử lý sự cố.

**Bước 2 — Vẽ lại ranh giới, không chỉ vẽ lại các bước.** Xác định rõ: sự kiện nào khởi đầu quy trình này, kết quả nào đánh dấu nó thực sự kết thúc (theo góc nhìn người thụ hưởng, không phải theo góc nhìn nội bộ).

**Bước 3 — Xác định các điểm chuyển giao và ai chịu trách nhiệm tại đó.** Đây là nơi cần thiết kế evidence: mỗi lần chuyển giao giữa các phòng ban cần được ghi nhận, không chỉ truyền miệng hay qua email.

**Bước 4 — Chỉ định process owner.** Một vai trò (không nhất thiết là một chức danh mới) chịu trách nhiệm theo dõi toàn bộ luồng, có quyền yêu cầu thông tin từ mọi phòng ban liên quan.

**Bước 5 — Mới tính đến công nghệ.** Chỉ sau khi ranh giới, điểm chuyển giao và trách nhiệm đã rõ, việc chọn công cụ để vận hành end-to-end workflow mới thực sự có ý nghĩa.

---

## Kết luận

Approval workflow không sai — nó chỉ trả lời một câu hỏi rất hẹp. Vấn đề xảy ra khi doanh nghiệp nhầm việc số hóa xong các điểm ký duyệt với việc đã quản lý được toàn bộ quy trình. End-to-end workflow không phải một tính năng nâng cấp của approval workflow — nó là một cách nhìn khác về **ranh giới của quy trình**: từ một khoảnh khắc ký duyệt, mở rộng ra thành toàn bộ hành trình từ sự kiện đầu tiên đến kết quả cuối cùng.

## Bước tiếp theo

Chọn một quy trình quan trọng nhất của doanh nghiệp bạn — ví dụ xử lý khiếu nại hoặc thay đổi kỹ thuật — và thử áp dụng 5 bước mở rộng ở trên. Hoặc bắt đầu với **Workflow Readiness Assessment** để xác định quy trình nào nên được ưu tiên trước.
