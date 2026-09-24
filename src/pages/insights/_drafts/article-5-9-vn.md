---
title: "Từ Request → Approval sang Event → Action: workflow thế hệ mới"
slug: "tu-request-approval-sang-event-action"
language: "vi"
translationKey: "article-5-9-request-approval-to-event-action"
type: "analysis"
cluster: "workflow"
parentPillar: "pillar-5-next-gen-workflow"
funnelStage: ["understanding"]
audience: ["COO", "CIO", "Operations Director"]
date: 2026-09-23
draft: true
seo:
  title: "Từ Request → Approval sang Event → Action: mô hình workflow thế hệ mới"
  description: "Mô hình workflow truyền thống yêu cầu ai đó gửi request rồi chờ approval. Mô hình mới bắt đầu từ event và dẫn thẳng đến action — nhanh hơn và ít điểm chờ hơn."
  primaryKeyword: "workflow từ request approval sang event action"
  secondaryKeywords:
    - "event-driven workflow"
    - "approval workflow thay thế"
    - "workflow mô hình mới"
    - "next gen workflow"
  searchIntent: "Understanding — Operations muốn hiểu mô hình workflow mới hơn"
cta:
  primary: "Workflow Readiness Assessment"
relatedInternalLinks:
  - "workflow-thong-minh-the-he-moi" # Pillar 5, parent
  - "event-driven-workflow" # bài 5.8, trước
  - "ai-trong-workflow" # bài 5.10 (đề xuất), sau
  - "workflow-readiness-assessment"
evidenceSources:
  - "Lean Six Sigma — chỉ số Process Cycle Efficiency (PCE) / Manufacturing Cycle Effectiveness (MCE)"
---

## Tóm tắt cho COO/CIO

- Mô hình workflow phổ biến nhất hiện nay là **Request → Approval**: ai đó gửi yêu cầu, chờ một chuỗi người ký duyệt, rồi hành động mới diễn ra. Mô hình này đưa "chờ duyệt" vào giữa mọi quy trình, kể cả những trường hợp không thực sự cần phán đoán của con người.
- Trong lĩnh vực Lean Six Sigma, một chỉ số được dùng phổ biến để đo hiệu quả quy trình — Process Cycle Efficiency (PCE) — thường cho thấy: phần lớn quy trình thông thường chỉ có 5-10% tổng thời gian là thời gian thực sự tạo giá trị, phần còn lại là thời gian chờ và hàng đợi; một quy trình được coi là "lean" khi tỷ lệ này vượt 25%. Approval là một trong những dạng hàng đợi phổ biến nhất trong quy trình văn phòng.
- Mô hình **Event → Action** không xóa bỏ approval — nó định vị lại approval: chỉ giữ bước duyệt cho những trường hợp thực sự cần phán đoán, còn lại để hành động diễn ra trực tiếp khi sự kiện đủ điều kiện, với evidence được ghi nhận đầy đủ để kiểm chứng sau.
- Đây không phải việc "bỏ kiểm soát" — mà là tách bạch rõ giữa **kiểm soát thực chất** (cần con người phán đoán) và **kiểm soát hình thức** (chỉ vì thói quen luôn cần một chữ ký).

---

## Mở đầu

Ở bài trước, chúng ta đã nói về event-driven workflow — khả năng hệ thống tự nhận biết sự kiện để khởi động một quy trình, thay vì chờ người tạo yêu cầu. Bài này đi xa hơn một bước: nếu hệ thống đã tự nhận biết được sự kiện, tại sao vẫn phải giữ nguyên chuỗi phê duyệt phía sau cho mọi trường hợp?

Đây chính là sự khác biệt giữa hai mô hình workflow. Mô hình cũ: **Request → Approval → Action** — luôn có một khoảng chờ duyệt ở giữa. Mô hình mới: **Event → Action**, với approval chỉ xuất hiện khi thực sự cần, không phải như một bước mặc định.

---

## Tại sao request/approval tạo độ trễ

**Claim:** Mô hình request/approval đưa một điểm chờ vào giữa mọi quy trình, bất kể trường hợp đó có thực sự cần phán đoán của con người hay không.

Trong lĩnh vực Lean Six Sigma, khái niệm Process Cycle Efficiency (PCE) — tỷ lệ giữa thời gian tạo giá trị thực và tổng thời gian một quy trình cần để hoàn thành — thường cho một con số gây bất ngờ với nhiều nhà quản lý: phần lớn quy trình thông thường chỉ đạt PCE ở mức 5-10%. Nói cách khác, 90-95% thời gian của một quy trình không dành cho việc thực sự xử lý công việc, mà là thời gian chờ — chờ tới lượt, chờ ai đó rảnh để xem, chờ trong hàng đợi phê duyệt. Một quy trình được xem là "lean" khi tỷ lệ này vượt 25%.

Approval là một trong những dạng hàng đợi phổ biến nhất trong các quy trình văn phòng và vận hành, vì ba lý do:

1. **Approval được thiết kế như một bước mặc định, không phải bước có điều kiện.** Nhiều quy trình yêu cầu duyệt cho mọi trường hợp, kể cả những trường hợp lặp lại, giá trị thấp, hoặc đã có tiền lệ rõ ràng — không phải vì cần phán đoán, mà vì "quy trình luôn có bước đó".
2. **Approval phụ thuộc vào lịch làm việc của người duyệt**, không phải vào mức độ khẩn cấp của yêu cầu. Một yêu cầu quan trọng có thể chờ y hệt thời gian với một yêu cầu không quan trọng, nếu cả hai đều nằm trong cùng hàng đợi của một người.
3. **Approval thường không phân biệt mức độ rủi ro.** Một yêu cầu 500.000 đồng và một yêu cầu 500 triệu đồng có thể đi qua cùng một chuỗi duyệt như nhau, dù mức độ cần phán đoán khác nhau rất nhiều.

**Ý nghĩa:** Vấn đề không phải là approval "xấu" — approval thực sự cần thiết cho những quyết định có rủi ro hoặc cần phán đoán. Vấn đề là khi approval được áp dụng như một bước mặc định cho mọi trường hợp, nó biến thành một dạng hàng đợi không phân biệt, kéo dài thời gian xử lý mà không tạo thêm giá trị kiểm soát tương ứng.

---

## Event → Action hoạt động khác thế nào

Mô hình Event → Action không loại bỏ approval — nó **định vị lại** approval theo mức độ rủi ro và mức độ ngoại lệ của từng trường hợp, thay vì áp dụng đồng loạt.

Cấu trúc cơ bản:

1. **Sự kiện xảy ra** (một điều kiện được đáp ứng, một ngưỡng bị vượt, một trạng thái thay đổi).
2. **Hệ thống đánh giá sự kiện đó dựa trên các quy tắc và ngưỡng đã định nghĩa trước** — mức độ rủi ro, giá trị, mức độ khớp với tiền lệ đã có.
3. **Phân luồng theo kết quả đánh giá:**
   - Nếu sự kiện nằm trong ngưỡng an toàn và khớp với tiền lệ rõ ràng → **hành động diễn ra trực tiếp**, không cần chờ duyệt, nhưng vẫn được ghi nhận đầy đủ evidence để kiểm chứng sau.
   - Nếu sự kiện vượt ngưỡng, không khớp tiền lệ, hoặc có mức rủi ro cao → **chuyển tới người có thẩm quyền phán đoán**, kèm đầy đủ ngữ cảnh để quyết định nhanh hơn.

Điểm khác biệt quan trọng nhất so với mô hình cũ: **approval không còn là một bước cố định trong chuỗi, mà là một nhánh có điều kiện.** Phần lớn trường hợp (thường là những trường hợp lặp lại, giá trị thấp, rủi ro thấp) đi thẳng tới hành động. Chỉ phần thiểu số thực sự cần phán đoán mới đi qua approval.

---

## Ví dụ thực tế trong vận hành

**Mua hàng định kỳ.** Một đơn đặt hàng nguyên liệu lặp lại, đúng nhà cung cấp thường dùng, trong hạn mức đã phê duyệt trước — có thể được xử lý và gửi đi ngay khi sự kiện "tồn kho xuống ngưỡng" xảy ra, không cần một người duyệt lại từ đầu mỗi lần. Ngược lại, một đơn hàng với nhà cung cấp mới, hoặc vượt hạn mức thông thường, vẫn cần được chuyển tới người có thẩm quyền.

**Xử lý hoàn tiền/đổi trả khách hàng.** Một yêu cầu đổi trả trong chính sách đã công bố, giá trị thấp, không có lịch sử bất thường từ khách hàng đó — có thể được xử lý ngay khi yêu cầu được ghi nhận. Một yêu cầu giá trị cao, hoặc có mẫu hình bất thường (cùng khách hàng đổi trả nhiều lần trong thời gian ngắn), sẽ được chuyển lên để con người xem xét.

**Điều chỉnh lịch sản xuất do thiếu nguyên liệu.** Khi hệ thống phát hiện một nguyên liệu sẽ thiếu hụt trước một đơn hàng cụ thể, và có phương án thay thế đã được phê duyệt trước cho tình huống tương tự, hệ thống có thể tự điều chỉnh lịch và thông báo — thay vì phải chờ một cuộc họp để quyết định.

Trong cả ba ví dụ, nguyên tắc chung là: **quy tắc và ngưỡng được quyết định trước, một lần, bởi người có thẩm quyền** — sau đó hệ thống áp dụng quy tắc đó cho từng trường hợp cụ thể, chỉ escalate lên con người khi trường hợp nằm ngoài những gì đã được quyết định trước.

---

## Điều kiện chuyển đổi

Chuyển từ Request/Approval sang Event/Action không phải việc bật một công tắc — nó đòi hỏi ba điều kiện:

**1. Có đủ lịch sử để xác định "tiền lệ rõ ràng" là gì.** Việc phân biệt trường hợp nào có thể đi thẳng tới hành động cần dựa trên dữ liệu lịch sử đủ lớn để xác định ngưỡng an toàn một cách có căn cứ — không phải phỏng đoán.

**2. Người có thẩm quyền sẵn sàng quyết định trước, thay vì quyết định từng lần.** Đây thường là rào cản lớn nhất về mặt tổ chức: nhiều người quản lý cảm thấy an toàn hơn khi duyệt từng trường hợp, thay vì đặt ra một quy tắc áp dụng chung — dù về mặt logic, quy tắc đó chính là tổng hợp của rất nhiều quyết định tương tự họ đã từng đưa ra.

**3. Có cơ chế giám sát sau (post-hoc review), không chỉ kiểm soát trước (pre-approval).** Khi hành động được phép diễn ra trực tiếp cho các trường hợp trong ngưỡng, tổ chức cần một cơ chế định kỳ xem lại các trường hợp đã tự động xử lý — để phát hiện sớm nếu ngưỡng đang được đặt sai, hoặc có mẫu hình bất thường đang bị bỏ sót.

Một lộ trình thận trọng là bắt đầu với những loại quyết định có giá trị thấp, tần suất cao, và đã có tiền lệ rõ ràng nhất — nơi rủi ro của việc chuyển sang Event → Action là thấp nhất, còn lợi ích về tốc độ lại rõ ràng nhất.

---

## Kết luận

Sự khác biệt giữa Request/Approval và Event/Action không nằm ở việc có hay không có kiểm soát — cả hai mô hình đều có kiểm soát. Khác biệt nằm ở việc kiểm soát đó được đặt ở đâu: áp dụng đồng loạt cho mọi trường hợp, hay chỉ áp dụng đúng nơi thực sự cần phán đoán của con người. Với phần lớn manufacturing SME, phần lớn "độ trễ do chờ duyệt" không đến từ những quyết định phức tạp — mà đến từ việc những quyết định đơn giản, lặp lại vẫn đang đi qua đúng quy trình dành cho quyết định phức tạp.

## Bước tiếp theo

Chọn một quy trình approval hiện có, và ước tính tỷ lệ phần trăm các trường hợp trong ba tháng qua thực sự có tiền lệ rõ ràng, giá trị thấp, không có gì bất thường. Nếu tỷ lệ đó cao, đây là quy trình đáng để cân nhắc chuyển sang mô hình Event → Action trước. Hoặc làm **Workflow Readiness Assessment** để có đánh giá toàn diện hơn.
