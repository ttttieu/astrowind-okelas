---
title: "Workflow vẫn phụ thuộc quá nhiều vào con người"
slug: "workflow-phu-thuoc-con-nguoi"
language: "vi"
translationKey: "article-5-4-human-bottleneck"
type: "analysis"
cluster: "workflow"
parentPillar: "pillar-5-next-gen-workflow"
funnelStage: ["understanding"]
audience: ["COO", "Operations Director", "CEO"]
date: 2026-09-23
draft: true
seo:
  title: "Workflow vẫn phụ thuộc quá nhiều vào con người — và đây là cái giá phải trả"
  description: "Khi workflow bị dừng vì chờ một người phê duyệt, đó không phải vấn đề cá nhân — đó là vấn đề thiết kế. Bài viết phân tích tại sao human dependency là điểm yếu của workflow truyền thống."
  primaryKeyword: "workflow phụ thuộc con người"
  secondaryKeywords:
    - "bottleneck workflow"
    - "chờ phê duyệt"
    - "workflow bị chặn"
    - "human bottleneck"
  searchIntent: "Understanding — Operations thấy workflow hay bị dừng vì chờ người"
cta:
  primary: "Workflow Readiness Assessment"
relatedInternalLinks:
  - "workflow-thong-minh-the-he-moi" # Pillar 5, parent
  - "approval-workflow-den-end-to-end" # bài 5.3, trước
  - "excel-email-he-thong-van-hanh-ngam" # bài 5.5 (đề xuất), liên quan
  - "event-driven-workflow-la-gi" # bài 5.8 (đề xuất), giải pháp hướng tới
  - "workflow-readiness-assessment"
evidenceSources:
  - "McKinsey & Company, \"Decision making in the age of urgency\", 2019 (khảo sát hơn 1.200 lãnh đạo)"
---

## Tóm tắt cho CEO/COO

- Khi một workflow "bị kẹt", nguyên nhân phổ biến nhất không phải ai đó lười hay vô trách nhiệm — mà là **thiết kế quy trình đặt quá nhiều điểm quyết định vào tay quá ít người**.
- Khảo sát của McKinsey với hơn 1.200 lãnh đạo doanh nghiệp toàn cầu cho thấy: chỉ 37% tổ chức cho biết quyết định của họ vừa nhanh vừa có chất lượng tốt; các nhà quản lý dành khoảng một phần ba thời gian làm việc cho việc ra quyết định, và tự đánh giá hơn một nửa thời gian đó là không hiệu quả.
- Có ba dạng phụ thuộc con người phổ biến trong workflow: **phụ thuộc vào một người duy nhất, phụ thuộc vào trí nhớ, và phụ thuộc vào việc "nhắc lại".**
- Chi phí thực sự của việc chờ đợi không chỉ là thời gian — nó còn là hành vi phòng thủ: nhân sự bắt đầu xin thêm xác nhận, gửi email "để có bằng chứng", thay vì tự chịu trách nhiệm quyết định.
- Giảm phụ thuộc con người không có nghĩa là bỏ con người ra khỏi quy trình — nó có nghĩa là **thiết kế lại vị trí và số lượng điểm quyết định cần con người.**

---

## Mở đầu

Có một câu quen thuộc trong hầu hết các cuộc họp vận hành: "cái đó đang chờ anh A duyệt". Nếu anh A đang họp, đang công tác, hoặc đơn giản là quên — toàn bộ chuỗi công việc phía sau dừng lại, dù không có gì thực sự phức tạp cần xử lý.

Phản ứng thường thấy của tổ chức là đổ lỗi cho cá nhân: "anh A duyệt chậm quá", hoặc tìm cách nhắc nhở nhiều hơn. Nhưng đây là cách nhìn sai vấn đề. Khi một quy trình liên tục bị chặn vì chờ người, đó không phải là vấn đề về thái độ làm việc — đó là **dấu hiệu của một lỗi thiết kế quy trình**, lặp đi lặp lại có hệ thống.

---

## Human bottleneck là gì

**Claim:** Human bottleneck xảy ra khi một quy trình được thiết kế sao cho tiến độ của nó phụ thuộc vào sự sẵn sàng của một cá nhân cụ thể, tại một thời điểm cụ thể — thay vì phụ thuộc vào việc thông tin và điều kiện quyết định đã sẵn sàng hay chưa.

Điểm khác biệt quan trọng: một bước cần con người quyết định không tự động là vấn đề. Vấn đề xuất hiện khi **chỉ một người duy nhất** có thể đưa ra quyết định đó, và không có cơ chế nào cho việc người đó vắng mặt, quá tải, hoặc đơn giản là quên.

Khảo sát của McKinsey với hơn 1.200 lãnh đạo doanh nghiệp toàn cầu (công bố trong báo cáo "Decision making in the age of urgency", 2019) cho một con số đáng chú ý: chỉ 37% tổ chức được khảo sát cho biết các quyết định của họ vừa nhanh vừa có chất lượng tốt. Các nhà quản lý cho biết họ dành khoảng một phần ba thời gian làm việc cho việc ra quyết định — và tự đánh giá hơn một nửa lượng thời gian đó là không hiệu quả. Nghiên cứu cũng ghi nhận mối tương quan giữa tốc độ và chất lượng quyết định: những tổ chức ra quyết định nhanh hơn có xu hướng báo cáo chất lượng quyết định tốt hơn, chứ không phải đánh đổi tốc độ lấy chất lượng như nhiều người vẫn giả định.

Đây là bằng chứng cho một điểm quan trọng: **chậm không đồng nghĩa với thận trọng hơn, và nhanh không đồng nghĩa với ẩu.** Vấn đề nằm ở kiến trúc ra quyết định, không nằm ở việc "cẩn thận" hay "vội vàng".

---

## Ba dạng phụ thuộc phổ biến

**1. Phụ thuộc vào một người duy nhất (single point of approval).** Một bước quan trọng trong quy trình chỉ có đúng một người có quyền hoặc có đủ thông tin để quyết định. Khi người đó nghỉ phép, đi công tác, hoặc chuyển việc, toàn bộ quy trình đứng lại — không phải vì thiếu quy trình, mà vì quy trình chưa từng tính đến khả năng người đó vắng mặt.

**2. Phụ thuộc vào trí nhớ (tacit tracking).** Không có ai chính thức "sở hữu" việc theo dõi tiến độ của một quy trình — thay vào đó, một vài người trong tổ chức tự nhớ trong đầu "việc này đang ở đâu, cần nhắc ai". Khi người đó bận việc khác, hoặc rời tổ chức, thông tin theo dõi cũng biến mất theo.

**3. Phụ thuộc vào việc nhắc lại (chase-driven progress).** Quy trình chỉ tiến lên khi có người chủ động nhắn tin, gọi điện, hoặc đi tìm để nhắc bước tiếp theo. Nếu không ai nhắc, quy trình không tự chuyển động — bất kể đã đủ thời gian hay đủ điều kiện để tiến hành hay chưa.

Ba dạng này thường tồn tại đồng thời trong cùng một quy trình, và chúng có xu hướng tự củng cố lẫn nhau: vì phải nhớ và phải nhắc, tổ chức càng phụ thuộc vào một vài cá nhân quen việc — và càng phụ thuộc vào họ, workflow càng mong manh khi họ vắng mặt.

---

## Chi phí của việc chờ đợi

Chi phí dễ thấy nhất là thời gian — một yêu cầu mất ba ngày thay vì ba giờ. Nhưng có hai loại chi phí ít được nhắc tới hơn, và thường lớn hơn:

**Chi phí hành vi phòng thủ.** Khi việc ra quyết định chậm và không rõ ràng, nhân sự có xu hướng tự bảo vệ mình: xin thêm xác nhận qua email "để có bằng chứng", đẩy quyết định lên cấp cao hơn dù bản thân đủ thẩm quyền, hoặc trì hoãn hành động cho tới khi thực sự chắc chắn không ai có thể quy trách nhiệm cho họ. Hành vi này không xuất phát từ sự thiếu năng lực — nó là phản ứng hợp lý của một cá nhân trong một hệ thống mà trách nhiệm không được phân định rõ và tốc độ ra quyết định không đáng tin cậy.

**Chi phí cơ hội tích lũy.** Một sự chậm trễ hai ngày ở một bước duyệt hiếm khi gây hậu quả nghiêm trọng ngay lập tức. Nhưng khi hàng chục quy trình trong tổ chức đều có vài điểm chờ tương tự, tổng thời gian "chết" trong toàn bộ vận hành cộng dồn thành một khoản chi phí lớn — chỉ là nó không xuất hiện trên bất kỳ báo cáo tài chính nào, nên hiếm khi được nhìn nhận đúng mức.

Điều đáng lưu ý: những chi phí này tăng theo quy mô tổ chức. Doanh nghiệp càng lớn, càng nhiều tầng nấc, điểm chờ càng nhiều — và phụ thuộc con người ở giai đoạn đầu (khi đội ngũ nhỏ, mọi quyết định qua tay một vài người vẫn còn nhanh) sẽ trở thành gánh nặng thực sự khi doanh nghiệp mở rộng, nếu không được thiết kế lại kịp thời.

---

## Cách giảm human dependency hợp lý

Giảm phụ thuộc con người không có nghĩa là loại bỏ con người khỏi quy trình — với nhiều quyết định, sự phán đoán của con người vẫn cần thiết và không nên bị thay thế. Vấn đề là thiết kế lại **cách** con người tham gia, theo bốn hướng:

**1. Phân quyền theo ngưỡng, không theo cấp bậc.** Thay vì mọi yêu cầu đều phải qua đúng một người vì họ giữ chức vụ đó, xác định rõ ngưỡng nào (giá trị, mức rủi ro, loại giao dịch) thực sự cần quyết định của người đó, và ngưỡng nào có thể được xử lý bởi người khác hoặc theo quy tắc đã định trước.

**2. Có người dự phòng chính thức, không phải dự phòng ngầm.** Nếu một quyết định thực sự chỉ có một người có thể đưa ra, đó là một rủi ro vận hành cần được ghi nhận và có kế hoạch — không nên để tổ chức ngầm hiểu "hy vọng người đó luôn có mặt".

**3. Để hệ thống theo dõi thay vì để con người nhớ.** Tiến độ của một quy trình nên được ghi nhận và hiển thị bởi hệ thống, để bất kỳ ai cũng có thể biết "việc này đang ở đâu" mà không cần hỏi đúng người phụ trách.

**4. Để hệ thống nhắc thay vì chờ người nhắc.** Nếu một bước đã đủ điều kiện tiến hành nhưng chưa có ai xử lý, hệ thống nên tự động thông báo — đây chính là điểm giao thoa giữa việc giảm phụ thuộc con người và việc chuyển sang workflow phản ứng theo sự kiện.

Bốn hướng này không đòi hỏi công nghệ phức tạp để bắt đầu. Bước đầu tiên chỉ là: liệt kê những quy trình quan trọng nhất, và với mỗi quy trình, hỏi "nếu người phụ trách bước này nghỉ một tuần, chuyện gì sẽ xảy ra?" Nếu câu trả lời là "mọi thứ sẽ đứng lại", đó chính là điểm cần thiết kế lại trước tiên.

---

## Kết luận

Một workflow phụ thuộc quá nhiều vào con người không phải vì con người trong tổ chức thiếu trách nhiệm — mà vì quy trình được thiết kế theo cách đặt cược vào sự sẵn sàng liên tục của một vài cá nhân. Đây là một rủi ro thiết kế, có thể được nhận diện và giảm bớt một cách có hệ thống, không cần chờ tới lúc nó gây ra hậu quả rõ ràng mới xử lý.

## Bước tiếp theo

Áp dụng câu hỏi "nếu người này vắng một tuần, chuyện gì xảy ra?" cho ba quy trình quan trọng nhất của doanh nghiệp bạn. Hoặc làm **Workflow Readiness Assessment** để có bức tranh đầy đủ hơn về mức độ phụ thuộc con người trong toàn bộ vận hành.
