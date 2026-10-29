// KM Maturity Assessment — Vietnamese
export default {
  "assessment_id": "km_maturity",
  "title": "KM Maturity Assessment",
  "intro": "Nếu 2–3 người quan trọng nhất của doanh nghiệp nghỉ việc vào tháng tới, điều gì sẽ đi theo họ? 12 câu hỏi · khoảng 6 phút · dành cho CEO, Tổng giám đốc, thành viên Ban điều hành. Không có đáp án đúng hay sai. Hãy chọn phương án gần nhất với thực tế hôm nay. Nếu chưa nắm rõ, hãy chọn 'Tôi chưa nắm rõ' — đó cũng là một thông tin quan trọng. Kết quả: cấp trưởng thành về quản lý tri thức (1–5), mức rủi ro mất tri thức, và những việc làm được ngay.",
  "questions": [
    {
      "id": "Q0-TOOL",
      "type": "context",
      "scored": false,
      "text": "Tài liệu vận hành (SOP, hướng dẫn, biểu mẫu, hồ sơ) hiện được lưu và quản lý chủ yếu ở đâu?",
      "options": [
        { "key": "A", "text": "Giấy, sổ sách, hoặc máy tính cá nhân của từng người" },
        { "key": "B", "text": "Thư mục dùng chung (ổ mạng, Google Drive, OneDrive…)" },
        { "key": "C", "text": "Phần mềm quản lý tài liệu (DMS) hoặc phần mềm QMS/ISO có kiểm soát phiên bản, phê duyệt" },
        { "key": "D", "text": "Hệ thống gắn tài liệu với quy trình, workflow, hồ sơ vận hành (tài liệu 'biết' mình áp dụng cho việc gì)" }
      ]
    },
    {
      "id": "Q1-PERSON-DEPENDENCY",
      "dimension": "personal_dependency",
      "scored": true,
      "text": "Nếu 2–3 người quan trọng nhất trong vận hành (trưởng ca, QA, kỹ thuật, thủ kho…) cùng nghỉ việc trong tháng tới, điều gì sẽ xảy ra?",
      "options": [
        { "key": "A", "score": 1, "text": "Một số khâu sẽ đình trệ — cách làm chủ yếu nằm trong đầu họ" },
        { "key": "B", "score": 2, "text": "Vẫn chạy, nhưng chất lượng và tốc độ giảm rõ trong nhiều tháng" },
        { "key": "C", "score": 3, "text": "Ảnh hưởng vài tuần; có tài liệu và có người dự phòng một phần" },
        { "key": "D", "score": 4, "text": "Ảnh hưởng nhỏ; tri thức chính đã được ghi lại và mỗi vị trí có người thứ hai nắm được việc" }
      ]
    },
    {
      "id": "Q2-ONBOARDING-SPEED",
      "dimension": "personal_dependency",
      "scored": true,
      "text": "Một nhân viên mới ở vị trí vận hành hoặc QC thường mất bao lâu để làm việc độc lập — và họ học chủ yếu từ đâu?",
      "options": [
        { "key": "A", "score": 1, "text": "Nhiều tháng; học hoàn toàn bằng cách kèm cặp và hỏi người cũ" },
        { "key": "B", "score": 2, "text": "Nhiều tháng; có tài liệu, nhưng chủ yếu vẫn học từ người cũ" },
        { "key": "C", "score": 3, "text": "Vài tuần; có tài liệu và kèm cặp theo kế hoạch" },
        { "key": "D", "score": 4, "text": "Vài tuần; có lộ trình rõ, tài liệu, tình huống mẫu và đánh giá năng lực trước khi làm độc lập" }
      ]
    },
    {
      "id": "Q3-INCIDENT-LEARNING",
      "dimension": "tacit_capture",
      "scored": true,
      "text": "Khi một nhân sự chủ chốt xử lý thành công một tình huống bất thường, kinh nghiệm đó đi đâu?",
      "options": [
        { "key": "A", "score": 1, "text": "Chỉ nằm trong đầu người đó" },
        { "key": "B", "score": 2, "text": "Truyền miệng trong nhóm; đôi khi nằm trong Zalo hoặc email" },
        { "key": "C", "score": 3, "text": "Được ghi trong báo cáo sự cố, nhưng khó tìm lại và không gắn với quy trình liên quan" },
        { "key": "D", "score": 4, "text": "Được ghi lại, phân tích nguyên nhân, và cập nhật vào quy trình/hướng dẫn liên quan" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q4-KNOWLEDGE-HANDOVER",
      "dimension": "tacit_capture",
      "scored": true,
      "text": "Khi một nhân sự chủ chốt thông báo nghỉ việc, việc bàn giao thường diễn ra thế nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Bàn giao công việc đang làm và tài khoản; không có gì về kinh nghiệm hay lý do các quyết định" },
        { "key": "B", "score": 2, "text": "Người đó tự viết tài liệu bàn giao theo cách của mình" },
        { "key": "C", "score": 3, "text": "Có danh mục bàn giao; người kế nhiệm làm cùng một thời gian" },
        { "key": "D", "score": 4, "text": "Có quy trình chuyển giao tri thức: phỏng vấn về tình huống phi chuẩn, lý do quyết định, các mối quan hệ; kết quả được đưa vào quy trình và tài liệu" }
      ]
    },
    {
      "id": "Q5-SOP-QUALITY",
      "dimension": "sop_execution",
      "scored": true,
      "text": "SOP của doanh nghiệp được viết và cập nhật như thế nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Phần lớn quy trình chưa có SOP, hoặc SOP chủ yếu viết để đáp ứng audit" },
        { "key": "B", "score": 2, "text": "Do quản lý hoặc QA viết; mô tả điều kiện lý tưởng; ít khi cập nhật" },
        { "key": "C", "score": 3, "text": "Có góp ý của người thực thi, cập nhật khi có thay đổi lớn; nhưng thiếu hướng dẫn cho tình huống bất thường" },
        { "key": "D", "score": 4, "text": "Người thực thi tham gia viết; có hướng dẫn cho tình huống bất thường; có kênh phản hồi và lịch rà soát" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q6-SOP-CONSISTENCY",
      "dimension": "sop_execution",
      "scored": true,
      "text": "Nếu quan sát cùng một quy trình ở hai ca khác nhau — hoặc trước và sau một đợt audit — mức độ giống nhau thế nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Khác nhau rõ; mỗi ca có cách làm riêng" },
        { "key": "B", "score": 2, "text": "Giống ở các bước chính, khác ở cách xử lý ngoại lệ; mức tuân thủ tăng rõ trước audit" },
        { "key": "C", "score": 3, "text": "Khá nhất quán; sai lệch được phát hiện khi audit hoặc kiểm tra định kỳ" },
        { "key": "D", "score": 4, "text": "Nhất quán; sai lệch được phát hiện sớm qua hồ sơ và kiểm tra trong vận hành hằng ngày" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q7-DOC-ACCESS",
      "dimension": "knowledge_control",
      "scored": true,
      "text": "Nếu cần biết SOP nào đang có hiệu lực cho một công việc cụ thể, câu trả lời đến từ đâu và mất bao lâu?",
      "options": [
        { "key": "A", "score": 1, "text": "Phải hỏi người phụ trách; tài liệu có nhiều bản, không rõ bản nào đúng" },
        { "key": "B", "score": 2, "text": "Tìm trong thư mục chung; thường thấy nhiều bản và phải xác nhận lại" },
        { "key": "C", "score": 3, "text": "Có kiểm soát phiên bản; tìm được, nhưng mất công" },
        { "key": "D", "score": 4, "text": "Tra được ngay: rõ phiên bản, người duyệt, ngày hiệu lực" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q8-FRONTLINE-ACCESS",
      "dimension": "knowledge_control",
      "scored": true,
      "text": "Người đang đứng tại dây chuyền, kho hoặc phòng QC tiếp cận hướng dẫn công việc như thế nào khi cần?",
      "options": [
        { "key": "A", "score": 1, "text": "Không tiếp cận được; làm theo trí nhớ hoặc hỏi người bên cạnh" },
        { "key": "B", "score": 2, "text": "Có bản giấy dán tại chỗ hoặc trong tủ hồ sơ, nhưng không chắc là bản mới nhất" },
        { "key": "C", "score": 3, "text": "Có bản được kiểm soát tại chỗ, nhưng khi có thay đổi, người dùng không được thông báo chủ động" },
        { "key": "D", "score": 4, "text": "Hướng dẫn/checklist có sẵn tại điểm thực hiện, luôn là bản hiệu lực; thay đổi được thông báo và xác nhận đã đọc" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q9-CHANGE-CONTEXT",
      "dimension": "knowledge_connectivity",
      "scored": true,
      "text": "Khi cần thay đổi một thông số, nguyên liệu hay quy trình, doanh nghiệp biết điều gì sẽ bị ảnh hưởng — và vì sao cách làm hiện tại được chọn — bằng cách nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Dựa vào trí nhớ của người làm lâu năm" },
        { "key": "B", "score": 2, "text": "Hỏi nhiều người, đọc nhiều tài liệu rời rạc rồi tự ghép lại" },
        { "key": "C", "score": 3, "text": "Có hồ sơ thay đổi, nhưng không liên kết với sản phẩm và quy trình liên quan" },
        { "key": "D", "score": 4, "text": "Quan hệ giữa quy trình, sản phẩm, nguyên liệu, nhà cung cấp và lịch sử quyết định được ghi nhận và tra cứu được" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q10-SHADOW-SYSTEMS",
      "dimension": "knowledge_connectivity",
      "scored": true,
      "text": "Các file Excel, nhóm Zalo và chuỗi email đang đóng vai trò gì trong vận hành hằng ngày?",
      "options": [
        { "key": "A", "score": 1, "text": "Là hệ thống vận hành chính; nhiều file quan trọng nằm trên máy cá nhân" },
        { "key": "B", "score": 2, "text": "Nhiều thông tin quan trọng chỉ có ở đó; không ai kiểm soát ai đang giữ bản nào" },
        { "key": "C", "score": 3, "text": "Vẫn dùng nhiều, nhưng các file quan trọng đã được xác định, lưu chung và có người phụ trách" },
        { "key": "D", "score": 4, "text": "Chỉ là công cụ hỗ trợ; thông tin vận hành chính nằm trong hệ thống có kiểm soát" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q11-AUDIT-READINESS",
      "dimension": "knowledge_evidence",
      "scored": true,
      "text": "Để chuẩn bị một cuộc audit (ISO, GMP, hoặc đánh giá của khách hàng), doanh nghiệp làm gì và mất bao lâu?",
      "options": [
        { "key": "A", "score": 1, "text": "Nhiều tuần; cả đội chạy đua gom và 'tái tạo' hồ sơ từ nhiều người" },
        { "key": "B", "score": 2, "text": "Một đến hai tuần; hồ sơ rải rác, kết quả phụ thuộc người chuẩn bị" },
        { "key": "C", "score": 3, "text": "Vài ngày; hồ sơ phần lớn có sẵn, nhưng phải rà soát và bổ sung" },
        { "key": "D", "score": 4, "text": "Gần như không cần chuẩn bị riêng; bằng chứng đã được ghi nhận trong vận hành hằng ngày" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    }
  ]
};
