// Workflow Readiness Assessment — Vietnamese
export default {
  "assessment_id": "workflow_readiness",
  "title": "Đánh giá mức sẵn sàng workflow",
  "intro": "Chọn một quy trình đang gây khó chịu, rồi trả lời 10 câu về cách nó thực sự chạy. Khoảng 4–5 phút. Dành cho CEO, COO, Giám đốc vận hành. Không có đáp án đúng hay sai — hãy chọn phương án gần nhất với thực tế hôm nay.",
  "questions": [
    {
      "id": "Q0-WORKFLOW",
      "type": "workflow_select",
      "scored": false,
      "text": "Chọn một quy trình mà bạn thấy khó chịu nhất gần đây. Ví dụ: tuần trước, tháng trước bạn phải hỏi \"sao việc này chưa xong?\"",
      "hint": "Hãy chọn quy trình gây khó chịu, không phải quy trình đang chạy tốt nhất. Nếu chọn quy trình tốt, kết quả sẽ đánh giá cao hơn thực tế vận hành toàn doanh nghiệp.",
      "options": [
        { "key": "A", "text": "Báo giá / nhận đơn hàng" },
        { "key": "B", "text": "Mua hàng / duyệt mua" },
        { "key": "C", "text": "Kế hoạch & lệnh sản xuất" },
        { "key": "D", "text": "Khiếu nại khách hàng" },
        { "key": "E", "text": "Sai lệch chất lượng / CAPA" },
        { "key": "F", "text": "Đánh giá nhà cung cấp" },
        { "key": "G", "text": "Bảo trì thiết bị" },
        { "key": "H", "text": "Tuyển dụng / onboarding" },
        { "key": "I", "text": "Duyệt chi / phê duyệt nội bộ" },
        { "key": "J", "text": "Khác (nhập tên quy trình)" }
      ]
    },
    {
      "id": "Q0b-ROLE",
      "type": "context",
      "scored": false,
      "text": "Vai trò của bạn trong doanh nghiệp?",
      "options": [
        { "key": "A", "text": "CEO / Chủ doanh nghiệp" },
        { "key": "B", "text": "COO / Giám đốc sản xuất / Vận hành" },
        { "key": "C", "text": "Giám đốc chất lượng / QA Manager" },
        { "key": "D", "text": "IT / Chuyển đổi số" },
        { "key": "E", "text": "CFO / Tài chính – kế toán" },
        { "key": "F", "text": "Khác" }
      ]
    },
    {
      "id": "Q0c-SYSTEM",
      "type": "context",
      "scored": false,
      "text": "Hệ thống đang dùng cho quy trình này là gì?",
      "options": [
        { "key": "A", "text": "Giấy / sổ sách" },
        { "key": "B", "text": "Excel / Word / Google Sheets" },
        { "key": "C", "text": "Zalo / Email / nhắn tin" },
        { "key": "D", "text": "Phần mềm chuyên ngành" },
        { "key": "E", "text": "ERP" }
      ]
    },
    {
      "id": "Q0d-CONSULTED",
      "type": "context",
      "scored": false,
      "text": "Trước khi làm bài này, bạn đã hỏi người trực tiếp thực hiện quy trình chưa?",
      "options": [
        { "key": "A", "text": "Rồi, đã hỏi người làm trực tiếp" },
        { "key": "B", "text": "Chưa, đang trả lời dựa trên nhận định của tôi" }
      ]
    },
    {
      "id": "Q1-PROCESS-CLARITY",
      "dimension": "process",
      "scored": true,
      "text": "Nếu một nhân viên mới được giao {workflow} vào ngày đầu tiên, họ làm theo cái gì?",
      "options": [
        { "key": "A", "score": 1, "text": "Không có gì cụ thể; mỗi người làm một kiểu" },
        { "key": "B", "score": 2, "text": "Hỏi đồng nghiệp lâu năm; quy trình nằm trong đầu họ" },
        { "key": "C", "score": 3, "text": "Có SOP/văn bản, nhưng thực tế mọi người làm hơi khác" },
        { "key": "D", "score": 4, "text": "Có quy trình rõ bước và vai trò; đa số làm đúng và có kiểm tra" },
        { "key": "E", "score": 5, "text": "Quy trình được cấu hình trong hệ thống; nhân viên được dẫn qua từng bước" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "Tôi không chắc" }
      ]
    },
    {
      "id": "Q2-TRIBAL-KNOWLEDGE",
      "dimension": "process",
      "scored": true,
      "text": "Trong {workflow}, có bước nào chỉ chạy được vì \"có người biết phải làm gì\"?",
      "options": [
        { "key": "A", "score": 1, "text": "Rất nhiều; vài người vắng là việc khựng lại" },
        { "key": "B", "score": 2, "text": "Một vài bước quan trọng" },
        { "key": "C", "score": 3, "text": "Vài bước nhỏ; chúng tôi biết nhưng chưa xử lý" },
        { "key": "D", "score": 4, "text": "Hiếm; đã ghi lại hướng dẫn và có người dự phòng" },
        { "key": "E", "score": 5, "text": "Không; mọi bước đều được xác định và người khác thực hiện được" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "Tôi không chắc" }
      ]
    },
    {
      "id": "Q3-TRIGGER",
      "dimension": "event",
      "scored": true,
      "text": "Điều gì làm {workflow} bắt đầu?",
      "options": [
        { "key": "A", "score": 1, "text": "Không ai biết chính xác lúc nào việc bắt đầu; thường phát hiện khi đã trễ" },
        { "key": "B", "score": 2, "text": "Có người nhớ, hoặc được nhắc miệng (điện thoại, Zalo)" },
        { "key": "C", "score": 3, "text": "Email/Zalo/Excel; người nhận phải tự đọc và nhận ra việc cần làm" },
        { "key": "D", "score": 4, "text": "Có phiếu/biểu mẫu yêu cầu và người nhận cố định" },
        { "key": "E", "score": 5, "text": "Một sự kiện (đơn hàng, kết quả kiểm, ngày hết hạn…) tự tạo ra công việc" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "Tôi không chắc" }
      ]
    },
    {
      "id": "Q4-DETECTION",
      "dimension": "event",
      "scored": true,
      "text": "Lần gần nhất {workflow} bị quên hoặc trễ vì không ai biết một sự kiện đã xảy ra — bạn biết qua đâu?",
      "options": [
        { "key": "A", "score": 1, "text": "Khách hàng, đối tác hoặc đoàn đánh giá phản ánh" },
        { "key": "B", "score": 2, "text": "Tôi hoặc quản lý tình cờ phát hiện" },
        { "key": "C", "score": 3, "text": "Đến lúc rà Excel/báo cáo cuối tuần/cuối tháng mới thấy" },
        { "key": "D", "score": 4, "text": "Có danh sách theo dõi; người phụ trách nhận ra trước hạn" },
        { "key": "E", "score": 5, "text": "Hệ thống cảnh báo trước khi trễ" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "Tôi không nhớ / chưa từng nghe có trường hợp như vậy" }
      ]
    },
    {
      "id": "Q5-HANDOFF-SIGNAL",
      "dimension": "handoff",
      "scored": true,
      "text": "Khi một bộ phận hoàn thành phần việc của mình trong {workflow}, bộ phận tiếp theo biết cần tiếp tục bằng cách nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Bộ phận trước phải nhớ báo, hoặc bộ phận sau tự hỏi" },
        { "key": "B", "score": 2, "text": "Gọi điện / nhắn Zalo / nói trực tiếp" },
        { "key": "C", "score": 3, "text": "Gửi email hoặc gửi file" },
        { "key": "D", "score": 4, "text": "Cập nhật vào bảng chung/Excel/hệ thống; bộ phận sau phải vào xem" },
        { "key": "E", "score": 5, "text": "Hệ thống tự giao việc cho bộ phận tiếp theo và có hạn xử lý" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "Tôi không chắc" }
      ]
    },
    {
      "id": "Q6-ABSENCE-TEST",
      "dimension": "handoff",
      "scored": true,
      "text": "Nếu người đang giữ {workflow} nghỉ phép một tuần mà không báo trước, điều gì xảy ra?",
      "options": [
        { "key": "A", "score": 1, "text": "Việc dừng cho đến khi họ quay lại" },
        { "key": "B", "score": 2, "text": "Mọi người phải lục tin nhắn/file của họ để biết việc đang ở đâu" },
        { "key": "C", "score": 3, "text": "Có người thay, nhưng phải bàn giao thủ công" },
        { "key": "D", "score": 4, "text": "Việc và trạng thái nằm trên sổ theo dõi chung; người khác nhận tiếp được" },
        { "key": "E", "score": 5, "text": "Việc tự chuyển cho người dự phòng; không mất ngữ cảnh" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "Tôi không chắc" }
      ]
    },
    {
      "id": "Q7-DECISION-TRACE",
      "dimension": "decision",
      "scored": true,
      "text": "Khi {workflow} cần phê duyệt, người duyệt dựa vào gì — và quyết định được ghi lại thế nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Nghe báo cáo miệng, đồng ý miệng" },
        { "key": "B", "score": 2, "text": "Đọc email/chat rồi trả lời \"OK\"" },
        { "key": "C", "score": 3, "text": "Xem file hoặc bản giấy; ký hoặc phản hồi" },
        { "key": "D", "score": 4, "text": "Xem hồ sơ đầy đủ; ghi nhận người duyệt và thời điểm" },
        { "key": "E", "score": 5, "text": "Hệ thống hiển thị đủ evidence liên quan; quyết định và lý do được ghi thành sự kiện truy vết được" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "Tôi không chắc" }
      ]
    },
    {
      "id": "Q8-EVIDENCE-STORAGE",
      "dimension": "evidence",
      "scored": true,
      "text": "Khi {workflow} xong, kết quả nằm ở đâu?",
      "options": [
        { "key": "A", "score": 1, "text": "Không lưu lại một cách có hệ thống" },
        { "key": "B", "score": 2, "text": "Email, chat, file cá nhân" },
        { "key": "C", "score": 3, "text": "Thư mục chung; mỗi người đặt tên/sắp xếp một kiểu" },
        { "key": "D", "score": 4, "text": "Hồ sơ/hệ thống chung có cấu trúc; tìm được theo mã, ngày" },
        { "key": "E", "score": 5, "text": "Dữ liệu có cấu trúc, liên kết với đơn hàng/lô/khách hàng/người thực hiện" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "Tôi không chắc" }
      ]
    },
    {
      "id": "Q9-TRACE-TEST",
      "dimension": "evidence",
      "scored": true,
      "text": "Một năm sau, khách hàng hoặc đoàn đánh giá hỏi về {workflow}: \"Vì sao lúc đó quyết định như vậy, ai làm, dựa trên gì?\" Doanh nghiệp trả lời mất bao lâu?",
      "options": [
        { "key": "A", "score": 1, "text": "Không trả lời được" },
        { "key": "B", "score": 2, "text": "Phải hỏi quanh nhiều người, mất nhiều ngày, có khi vẫn không đủ" },
        { "key": "C", "score": 3, "text": "Tìm được hồ sơ nhưng phải ghép từ nhiều nơi, mất một đến hai ngày" },
        { "key": "D", "score": 4, "text": "Truy được trong ngày từ hồ sơ" },
        { "key": "E", "score": 5, "text": "Truy ngược trong vài phút: kết quả → quyết định → evidence → người thực hiện → sự kiện ban đầu" },
        { "key": "U", "score": 2, "flag": "uncertain", "text": "Tôi không chắc" }
      ]
    },
    {
      "id": "Q10-MANUAL-LOAD",
      "dimension": "manual_load",
      "scored": true,
      "text": "Trong {workflow}, bao nhiêu công sức của con người dành cho những việc không cần phán đoán: chuyển dữ liệu giữa các file, nhắc việc, tổng hợp báo cáo, cập nhật trạng thái?",
      "options": [
        { "key": "A", "score": 1, "text": "Gần như không có" },
        { "key": "B", "score": 2, "text": "Một phần nhỏ" },
        { "key": "C", "score": 3, "text": "Đáng kể" },
        { "key": "D", "score": 4, "text": "Phần lớn thời gian của người làm" },
        { "key": "E", "score": 5, "text": "Gần như toàn bộ; con người đóng vai trò \"bộ chuyển dữ liệu\"" },
        { "key": "U", "score": 3, "flag": "uncertain", "text": "Tôi chưa từng nhìn theo cách này" }
      ]
    }
  ]
};
