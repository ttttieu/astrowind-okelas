// Digitalization Level Assessment — Vietnamese
export default {
  "assessment_id": "digitalization_level",
  "title": "Digital Transformation Maturity Assessment",
  "intro": "Doanh nghiệp của anh/chị có bao nhiêu phần mềm — và bao nhiêu câu hỏi vận hành trả lời được trong vài phút? 12 câu hỏi · khoảng 7 phút · dành cho CEO, Tổng giám đốc, thành viên Ban điều hành. Không có đáp án đúng hay sai, và không có cấp độ nào 'đáng xấu hổ'. Hãy chọn phương án gần nhất với thực tế hôm nay. Kết quả: cấp số hóa (1–5), bản đồ số hóa theo từng mảng vận hành, và một bước tiếp theo có nghĩa kinh tế.",
  "questions": [
    {
      "id": "Q0-SYSTEMS",
      "type": "multi_select",
      "scored": false,
      "text": "Doanh nghiệp hiện đang dùng những hệ thống nào trong vận hành? (chọn tất cả đang dùng)",
      "options": [
        { "key": "A", "text": "Phần mềm kế toán" },
        { "key": "B", "text": "ERP (kể cả khi mới dùng một phần module)", "flag": "has_erp" },
        { "key": "C", "text": "Phần mềm quản lý kho" },
        { "key": "D", "text": "Phần mềm bán hàng / CRM" },
        { "key": "E", "text": "Phần mềm quản lý tài liệu (DMS) hoặc QMS/ISO", "flag": "has_dms" },
        { "key": "F", "text": "Phần mềm sản xuất / MES / kết nối máy móc" },
        { "key": "G", "text": "Phần mềm nhân sự – chấm công" },
        { "key": "H", "text": "Chủ yếu Excel, email, Zalo — chưa có phần mềm chuyên dụng", "exclusive": true }
      ]
    },
    {
      "id": "Q1-AREA-MAP",
      "type": "matrix",
      "scored": false,
      "text": "Với từng mảng dưới đây, thông tin vận hành hằng ngày hiện được ghi nhận và sử dụng như thế nào?",
      "rows": [
        { "key": "QC", "label": "Chất lượng (QC/QA)" },
        { "key": "MFG", "label": "Sản xuất & kế hoạch" },
        { "key": "WH", "label": "Kho & nguyên liệu" },
        { "key": "PS", "label": "Mua hàng & bán hàng" },
        { "key": "FA", "label": "Tài chính – kế toán" }
      ],
      "options": [
        { "key": "A", "score": 1, "text": "Giấy, sổ tay, form in" },
        { "key": "B", "score": 2, "text": "File Word/Excel/PDF, lưu rải rác (máy cá nhân, thư mục, email)" },
        { "key": "C", "score": 3, "text": "Qua phần mềm có quy trình, nhưng khi cần phân tích vẫn phải tổng hợp thủ công" },
        { "key": "D", "score": 4, "text": "Qua hệ thống; số liệu liên kết với mảng khác, có báo cáo tự động" },
        { "key": "U", "score": null, "flag": "uncertain", "text": "Chưa nắm rõ" }
      ]
    },
    {
      "id": "Q2-DOC-ACCESS",
      "dimension": "documents_records",
      "scored": true,
      "text": "Khi cần biết tài liệu nào (SOP, hướng dẫn, biểu mẫu) đang có hiệu lực, nhân viên làm thế nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Hỏi người phụ trách; tài liệu có nhiều bản, không rõ bản nào đúng" },
        { "key": "B", "score": 2, "text": "Tìm trong thư mục chung; thường thấy nhiều bản và phải xác nhận lại" },
        { "key": "C", "score": 3, "text": "Có hệ thống kiểm soát phiên bản; tìm được, nhưng mất công" },
        { "key": "D", "score": 4, "text": "Tra ngay được; rõ phiên bản, người duyệt, ngày hiệu lực" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q3-RECORD-FORMAT",
      "dimension": "documents_records",
      "scored": true,
      "text": "Hồ sơ vận hành quan trọng nhất (ví dụ kết quả kiểm tra chất lượng) đang được ghi nhận dưới dạng nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Ghi tay trên giấy" },
        { "key": "B", "score": 2, "text": "Ghi tay rồi scan/chụp thành PDF hoặc ảnh" },
        { "key": "C", "score": 3, "text": "File Excel/Word theo mẫu, nhưng mỗi người, mỗi ca ghi một kiểu" },
        { "key": "D", "score": 4, "text": "Biểu mẫu số có các trường cố định (sản phẩm, lô, thông số, kết quả, người làm, thời gian), truy vấn được" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q4-APPROVAL-FLOW",
      "dimension": "workflow_evidence",
      "scored": true,
      "text": "Một đề xuất cần phê duyệt (mua hàng, thay đổi quy trình, xử lý hàng lỗi) thường đi qua những bước nào?",
      "options": [
        { "key": "A", "score": 1, "text": "In ra, trình ký tay, lưu giấy" },
        { "key": "B", "score": 2, "text": "Gửi qua email hoặc Zalo, người duyệt trả lời 'OK'; không ai theo dõi trạng thái" },
        { "key": "C", "score": 3, "text": "Qua phần mềm ở một vài loại việc; phần còn lại vẫn qua email/giấy" },
        { "key": "D", "score": 4, "text": "Qua hệ thống cho các loại việc chính: xem được trạng thái, có nhắc hạn, có lịch sử ai duyệt khi nào" }
      ]
    },
    {
      "id": "Q5-NC-TRACKING",
      "dimension": "workflow_evidence",
      "scored": true,
      "text": "Khi phát hiện một sự không phù hợp (lỗi chất lượng, sai quy trình), việc xử lý được theo dõi đến khi hoàn tất như thế nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Xử lý xong là thôi; không ghi lại" },
        { "key": "B", "score": 2, "text": "Ghi vào sổ hoặc Excel; không ai theo dõi hành động khắc phục có hiệu quả không" },
        { "key": "C", "score": 3, "text": "Có biểu mẫu NC/CAPA và người theo dõi, nhưng thủ công; khó biết vấn đề đã từng xảy ra chưa" },
        { "key": "D", "score": 4, "text": "Qua hệ thống: ghi nhận, phân tích nguyên nhân, hành động khắc phục, kiểm tra hiệu quả; tra được lịch sử" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q6-RE-ENTRY",
      "dimension": "data_connectivity",
      "scored": true,
      "text": "Theo dòng một đơn hàng — từ nhận đơn, lên kế hoạch, xuất nguyên liệu, sản xuất, kiểm tra, đến giao hàng — thông tin về đơn đó bị nhập lại hoặc chép tay qua bao nhiêu lần?",
      "options": [
        { "key": "A", "score": 1, "text": "Gần như mỗi khâu nhập lại một lần; nhiều chỗ chép tay" },
        { "key": "B", "score": 2, "text": "Nhập lại ở 3–4 khâu, giữa các phần mềm hoặc file khác nhau" },
        { "key": "C", "score": 3, "text": "Nhập lại ở 1–2 khâu; phần còn lại tự chuyển giữa các hệ thống" },
        { "key": "D", "score": 4, "text": "Nhập một lần; các khâu sau dùng lại dữ liệu đó" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q7-QUERY-SPEED",
      "dimension": "data_connectivity",
      "scored": true,
      "text": "Nghĩ về 5 câu hỏi vận hành anh/chị cần trả lời thường xuyên nhất (ví dụ: tỷ lệ lỗi theo sản phẩm tháng này, tồn nguyên liệu đủ cho mấy tuần, đơn hàng của khách A đang ở đâu). Có bao nhiêu câu trả lời được từ hệ thống trong vài phút?",
      "options": [
        { "key": "A", "score": 1, "text": "Không câu nào; đều phải chờ người tổng hợp một đến vài ngày" },
        { "key": "B", "score": 2, "text": "1–2 câu" },
        { "key": "C", "score": 3, "text": "3–4 câu" },
        { "key": "D", "score": 4, "text": "Cả 5 câu" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q8-CHANGE-CONTEXT",
      "dimension": "knowledge_context",
      "scored": true,
      "text": "Khi cần thay đổi một thông số, nguyên liệu hay quy trình, doanh nghiệp tìm ra những gì bị ảnh hưởng — và vì sao cách làm hiện tại được chọn — bằng cách nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Dựa vào trí nhớ của người làm lâu năm" },
        { "key": "B", "score": 2, "text": "Hỏi nhiều người, đọc nhiều tài liệu rời rạc rồi tự ghép lại" },
        { "key": "C", "score": 3, "text": "Có hồ sơ thay đổi, nhưng không liên kết với sản phẩm và quy trình liên quan" },
        { "key": "D", "score": 4, "text": "Quan hệ giữa quy trình, sản phẩm, nguyên liệu, nhà cung cấp và lịch sử quyết định được ghi nhận và tra cứu được" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    },
    {
      "id": "Q9-IMPL-APPROACH",
      "dimension": "digitalization_approach",
      "scored": true,
      "text": "Lần gần nhất doanh nghiệp triển khai một hệ thống hoặc phần mềm đáng kể, việc triển khai diễn ra thế nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Triển khai nhiều thứ cùng lúc; kéo dài, vượt ngân sách, một phần bị bỏ dở" },
        { "key": "B", "score": 2, "text": "Triển khai một lần cho mọi phòng ban; chạy được nhưng nhiều người vẫn dùng cách cũ" },
        { "key": "C", "score": 3, "text": "Có chia giai đoạn, nhưng giai đoạn sau bắt đầu trước khi giai đoạn trước chạy ổn" },
        { "key": "D", "score": 4, "text": "Bắt đầu từ phạm vi nhỏ, chạy ổn và đo được kết quả rồi mới mở rộng — hoặc chưa từng triển khai, và dự định làm theo cách này" }
      ]
    },
    {
      "id": "Q10-INVEST-BASIS",
      "dimension": "digitalization_approach",
      "scored": true,
      "text": "Khi quyết định đầu tư vào một hệ thống hoặc phần mềm mới, doanh nghiệp thường dựa vào đâu?",
      "options": [
        { "key": "A", "score": 1, "text": "Đề xuất và demo của nhà cung cấp; hoặc vì doanh nghiệp khác đang dùng" },
        { "key": "B", "score": 2, "text": "Nhu cầu của một phòng ban; ít xét tới liên thông với hệ thống khác" },
        { "key": "C", "score": 3, "text": "Một vấn đề vận hành cụ thể, nhưng chưa xác định chỉ số đo kết quả" },
        { "key": "D", "score": 4, "text": "Một vấn đề cụ thể, đã kiểm tra điều kiện nền (quy trình, dữ liệu, người phụ trách) và có chỉ số đo trong 6–12 tháng" }
      ]
    },
    {
      "id": "Q11-SYSTEM-USAGE",
      "dimension": "digitalization_approach",
      "scored": true,
      "text": "Các phần mềm doanh nghiệp đã đầu tư đang được dùng đến mức nào?",
      "options": [
        { "key": "A", "score": 1, "text": "Nhiều phần mềm chủ yếu để 'có'; công việc thật chạy trên Excel, email, Zalo" },
        { "key": "B", "score": 2, "text": "Được dùng để nhập liệu, nhưng nhiều bộ phận vẫn duy trì Excel song song" },
        { "key": "C", "score": 3, "text": "Dùng khá đầy đủ cho nghiệp vụ; báo cáo quản trị vẫn phải xuất ra Excel để làm lại" },
        { "key": "D", "score": 4, "text": "Là nơi công việc thật diễn ra; báo cáo lấy trực tiếp từ hệ thống" },
        { "key": "E", "score": null, "flag": "uncertain", "text": "Tôi chưa nắm rõ" }
      ]
    }
  ]
};
