// AI Readiness Assessment — Vietnamese
export default {
  "assessment_id": "ai_readiness",
  "title": "AI Readiness Assessment",
  "intro": "AI đang giúp nhân viên làm nhanh hơn. Nhưng doanh nghiệp của anh/chị đã sẵn sàng để AI giúp tổ chức làm tốt hơn chưa? 12 câu hỏi · khoảng 6 phút · dành cho CEO, Tổng giám đốc, thành viên Ban điều hành. Không cần kiến thức kỹ thuật. Hãy chọn phương án gần nhất với thực tế hôm nay.",
  "questions": [
    {
      "id": "Q0-CONTEXT",
      "type": "context",
      "scored": false,
      "text": "Hiện nay AI đang được sử dụng trong doanh nghiệp ở mức nào?",
      "options": [
        { "key": "A", "text": "Gần như chưa dùng AI trong công việc" },
        { "key": "B", "text": "Nhân viên tự dùng AI (ChatGPT, Gemini…) cho việc cá nhân; chưa triển khai chính thức" },
        { "key": "C", "text": "Đã triển khai chính thức công cụ AI cho nhân viên, hoặc chatbot tra cứu tài liệu nội bộ" },
        { "key": "D", "text": "Đã kết nối AI với dữ liệu vận hành, hoặc đưa AI vào một số bước quy trình" }
      ]
    },
    {
      "id": "Q1-DATA-QUERY",
      "dimension": "data_connectivity",
      "scored": true,
      "text": "Nếu anh/chị muốn biết \"6 tháng qua, lỗi nào xuất hiện nhiều nhất, ở dây chuyền nào, ca nào\", cần bao lâu để có câu trả lời đáng tin?",
      "options": [
        { "key": "A", "score": 1, "text": "Không trả lời được — dữ liệu chủ yếu trên giấy, hoặc không được ghi lại" },
        { "key": "B", "score": 2, "text": "Vài ngày đến vài tuần tổng hợp thủ công từ nhiều file Excel khác định dạng" },
        { "key": "C", "score": 3, "text": "Một đến hai ngày; dữ liệu có, nhưng phải làm sạch và ghép file" },
        { "key": "D", "score": 4, "text": "Vài phút đến vài giờ; dữ liệu được ghi theo cấu trúc thống nhất và truy vấn được" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q2-TRACEABILITY",
      "dimension": "data_connectivity",
      "scored": true,
      "text": "Để truy xuất toàn bộ lịch sử một lô thành phẩm — từ nguyên liệu đầu vào đến lúc giao khách — nhân viên cần làm gì?",
      "options": [
        { "key": "A", "score": 1, "text": "Gọi điện, hỏi nhiều người, lục hồ sơ giấy; có khi không truy được đầy đủ" },
        { "key": "B", "score": 2, "text": "Mở nhiều file và phần mềm rời rạc (kế toán, Excel QC, sổ kho…) rồi tự ghép lại" },
        { "key": "C", "score": 3, "text": "Phần lớn nằm trong 1–2 hệ thống, nhưng liên kết giữa các bước vẫn phải tự đối chiếu" },
        { "key": "D", "score": 4, "text": "Truy xuất được từ một điểm; các bước đã được liên kết sẵn" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q3-PROCESS-CLARITY",
      "dimension": "process_decision",
      "scored": true,
      "text": "Trong 5 quy trình vận hành quan trọng nhất, có bao nhiêu quy trình mà nhân viên mới làm đúng được chỉ nhờ tài liệu viết, không cần hỏi người cũ?",
      "options": [
        { "key": "A", "score": 1, "text": "Gần như không có" },
        { "key": "B", "score": 2, "text": "1–2 quy trình" },
        { "key": "C", "score": 3, "text": "3–4 quy trình, nhưng tài liệu chưa nói rõ ai duyệt, bước nào cần bằng chứng" },
        { "key": "D", "score": 4, "text": "Cả 5; tài liệu nêu rõ ai làm, ai duyệt, điều kiện chuyển bước và bằng chứng cần lưu" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q4-DECISION-FLOW",
      "dimension": "process_decision",
      "scored": true,
      "text": "Khi cần ra một quyết định vận hành — duyệt báo giá, xử lý hàng không phù hợp, thay đổi thông số — thực tế diễn ra thế nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Hầu hết dồn về 1–2 lãnh đạo; họ vắng thì việc dừng" },
        { "key": "B", "score": 2, "text": "Có phân cấp trên giấy, nhưng thực tế vẫn chờ một vài người" },
        { "key": "C", "score": 3, "text": "Phân cấp rõ cho việc thường xuyên; việc ngoại lệ vẫn dồn lên trên" },
        { "key": "D", "score": 4, "text": "Phân quyền rõ, có tiêu chí và đủ thông tin để cấp dưới quyết định; lãnh đạo chỉ xử lý ngoại lệ thật sự" }
      ]
    },
    {
      "id": "Q5-TACIT-KNOWLEDGE",
      "dimension": "org_knowledge",
      "scored": true,
      "text": "Khi một nhân sự chủ chốt (trưởng ca, QA, kỹ thuật) xử lý thành công một tình huống bất thường, kinh nghiệm đó đi đâu?",
      "options": [
        { "key": "A", "score": 1, "text": "Chỉ nằm trong đầu người đó" },
        { "key": "B", "score": 2, "text": "Truyền miệng trong nhóm; đôi khi nằm trong Zalo hoặc email" },
        { "key": "C", "score": 3, "text": "Được ghi trong báo cáo sự cố, nhưng khó tìm lại và không gắn với quy trình liên quan" },
        { "key": "D", "score": 4, "text": "Được ghi lại, phân tích nguyên nhân, và cập nhật vào quy trình/hướng dẫn liên quan" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q6-DOCUMENT-CONTROL",
      "dimension": "org_knowledge",
      "scored": true,
      "text": "Nếu hỏi \"phiên bản SOP/tiêu chuẩn nào đang có hiệu lực cho sản phẩm X trên dây chuyền Y\", câu trả lời đến từ đâu?",
      "options": [
        { "key": "A", "score": 1, "text": "Phải hỏi người phụ trách; tài liệu có nhiều bản, không rõ bản nào đúng" },
        { "key": "B", "score": 2, "text": "Tìm trong thư mục chung; thường thấy nhiều bản và phải xác nhận lại" },
        { "key": "C", "score": 3, "text": "Có kiểm soát tài liệu, nhưng tài liệu không liên kết với sản phẩm/dây chuyền áp dụng" },
        { "key": "D", "score": 4, "text": "Tra được ngay: có phiên bản, người duyệt, ngày hiệu lực, và gắn với sản phẩm/quy trình áp dụng" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q7-EVIDENCE-TRAIL",
      "dimension": "evidence_context",
      "scored": true,
      "text": "Khi auditor hoặc khách hàng hỏi \"vì sao lô hàng này được duyệt xuất — dựa trên kết quả nào, ai duyệt, theo phiên bản tiêu chuẩn nào\", doanh nghiệp mất bao lâu để trả lời kèm bằng chứng?",
      "options": [
        { "key": "A", "score": 1, "text": "Nhiều ngày, phải lục hồ sơ và hỏi nhiều người; có khi thiếu bằng chứng" },
        { "key": "B", "score": 2, "text": "Một đến vài ngày; bằng chứng có nhưng nằm rải rác" },
        { "key": "C", "score": 3, "text": "Vài giờ; hồ sơ đầy đủ nhưng phải tự ghép chuỗi" },
        { "key": "D", "score": 4, "text": "Vài phút; kết quả, người duyệt, phiên bản tiêu chuẩn đã được lưu vết và liên kết" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q8-DECISION-CONTEXT",
      "dimension": "evidence_context",
      "scored": true,
      "text": "Lý do đằng sau các quyết định vận hành quan trọng (đổi nhà cung cấp, đổi công thức, thay đổi thông số) được lưu ở đâu?",
      "options": [
        { "key": "A", "score": 1, "text": "Không được lưu; chỉ người trong cuộc nhớ" },
        { "key": "B", "score": 2, "text": "Rải rác trong email, Zalo, biên bản họp" },
        { "key": "C", "score": 3, "text": "Có phiếu/biên bản thay đổi, nhưng khó tìm lại và không liên kết với sản phẩm, quy trình bị ảnh hưởng" },
        { "key": "D", "score": 4, "text": "Qua quy trình kiểm soát thay đổi: có đề xuất, bằng chứng, người duyệt, và liên kết với đối tượng bị ảnh hưởng" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q9-AI-GOVERNANCE",
      "dimension": "ai_governance",
      "scored": true,
      "text": "Hiện nay, việc nhân viên dùng các công cụ AI (ChatGPT, Gemini, Copilot…) trong công việc được quản lý thế nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Không rõ ai đang dùng, dùng cho việc gì; chưa có quy định nào" },
        { "key": "B", "score": 2, "text": "Biết là có dùng, nhưng chưa quy định dữ liệu nào không được đưa vào công cụ AI bên ngoài" },
        { "key": "C", "score": 3, "text": "Có quy định cơ bản về công cụ và dữ liệu được phép, nhưng chưa kiểm tra việc thực hiện" },
        { "key": "D", "score": 4, "text": "Có chính sách: công cụ được phép, dữ liệu cấm (công thức, khách hàng…), phạm vi sử dụng; được phổ biến và kiểm tra" }
      ]
    },
    {
      "id": "Q10-AI-REVIEW",
      "dimension": "ai_governance",
      "scored": true,
      "text": "Khi một tài liệu do AI hỗ trợ soạn (SOP, báo cáo kiểm tra, phản hồi khách hàng) hoặc một gợi ý của AI được đưa vào sử dụng chính thức, nó đi qua bước kiểm soát nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Không có bước riêng; người dùng tự quyết" },
        { "key": "B", "score": 2, "text": "Quản lý xem qua nếu có thời gian; không ghi nhận" },
        { "key": "C", "score": 3, "text": "Đi qua quy trình duyệt tài liệu thông thường, nhưng không ghi nhận việc AI đã tham gia" },
        { "key": "D", "score": 4, "text": "Có quy định: người có thẩm quyền rà soát, phê duyệt, và lưu vết việc AI tham gia — nhất là với hồ sơ chất lượng" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q11-AI-PROBLEM",
      "dimension": "ai_problem",
      "scored": true,
      "text": "Doanh nghiệp đang kỳ vọng AI giải quyết vấn đề gì — và sẽ đo kết quả thế nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Chưa rõ; chủ yếu vì thấy doanh nghiệp khác đang làm" },
        { "key": "B", "score": 2, "text": "Giúp nhân viên làm nhanh hơn (soạn thảo, tóm tắt…); đánh giá bằng cảm nhận" },
        { "key": "C", "score": 3, "text": "Có một vài bài toán vận hành cụ thể (chuẩn bị audit, kiểm soát chất lượng…), nhưng chưa có chỉ số đo" },
        { "key": "D", "score": 4, "text": "Có bài toán vận hành cụ thể, chỉ số đo và người chịu trách nhiệm" }
      ]
    }
  ]
};
