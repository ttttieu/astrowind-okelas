# Test Log — bằng chứng đã chạy thật trước khi bàn giao

Toàn bộ output dưới đây là nguyên văn từ các lệnh đã chạy trong quá trình xây
dựng, không phải mô tả lại.

## 1. Validate JSON syntax toàn bộ config + workflow definition

```
$ for f in config/*.json workflow-definitions/*.json; do python3 -c "import json,sys; json.load(open('$f')); print('$f OK')"; done
config/questions_ai.json OK
config/questions_dig.json OK
config/questions_erp.json OK
config/questions_km.json OK
workflow-definitions/assessment_intake_workflow.json OK
```

## 2. Smoke test `LocalWorkflowEngine` — 4 kịch bản

```
=== TEST 1: ERP readiness - trả lời hỗn hợp thực tế ===
{
  "submission_id": "sub_2a280b4aab57",
  "level": 2,
  "label": "Đang hình thành",
  "description": "Đã có một số nền tảng nhưng còn thiếu tính nhất quán. Rủi ro lớn nhất nếu triển khai ERP ngay là scope creep và dữ liệu không sạch.",
  "insufficient_data_message": null,
  "flags": [],
  "dimension_scores": {
    "process_existence": 2,
    "process_enforcement": 1,
    "data": 3,
    "people": 2,
    "scope": 1,
    "governance": 2,
    "accounting_manufacturing": 3
  },
  "overall_average": 2,
  "reflection_text_raw": [
    "Không ngờ quy trình xuất kho lại khác nhau nhiều giữa các ca."
  ]
}

=== TEST 2: AI readiness - straight-lining (chọn D hết) ===
{
  "submission_id": "sub_4db2aff4c2d6",
  "level": 4,
  "label": "Sẵn sàng",
  "description": "Doanh nghiệp có nền tảng đủ tốt để triển khai AI ở cấp tổ chức, với evidence và governance rõ ràng.",
  "insufficient_data_message": null,
  "flags": [
    "straight_lining_high"
  ],
  "dimension_scores": {
    "data_readiness": 4,
    "process_clarity": 4,
    "knowledge_structure": 4,
    "governance": 4,
    "integration": 4,
    "workflow_readiness": 4
  },
  "overall_average": 4,
  "reflection_text_raw": [
    "Có lẽ vậy."
  ]
}

=== TEST 3: KM maturity - quá nhiều 'Không chắc' ===
{
  "submission_id": "sub_c5bff005872e",
  "level": null,
  "label": null,
  "description": null,
  "insufficient_data_message": "Chưa đủ dữ liệu để đánh giá đầy đủ — khuyến nghị người phụ trách vận hành trực tiếp cùng thực hiện.",
  "flags": [
    "uncertain_dimensions:2"
  ],
  "dimension_scores": {
    "process_documentation": 2,
    "knowledge_accessibility": 3,
    "retention_risk": 2
  },
  "overall_average": 2.33,
  "reflection_text_raw": []
}

=== TEST 4: thiếu câu trả lời bắt buộc -> phải raise ValidationError ===
ValidationError raised as expected: Thiếu câu trả lời bắt buộc: ['DIG-2', 'DIG-3', 'DIG-4', 'DIG-5']
```

Nhận xét dựa trên bằng chứng trên: engine tính đúng dimension score trung
bình, phân loại đúng level theo ngưỡng trong config, phát hiện đúng
straight-lining khi toàn bộ câu trả lời đều là "D", và đúng ngưỡng "≥2 câu
Không chắc → không tính level" theo `05_Question_Sets §6.2`.

## 3. Test 2 endpoint FastAPI qua `TestClient`

```
=== GET /api/assessment/ai_readiness/questions ===
status: 200
(trả về đúng title, intro, 7 câu hỏi AI-1..AI-7, KHÔNG có trường 'levels' —
đúng thiết kế ẩn ngưỡng điểm khỏi người trả lời)

=== GET /api/assessment/khong_ton_tai/questions (phải 404) ===
status: 404
{'detail': 'assessment_id không hợp lệ: khong_ton_tai'}

=== POST /api/assessment/submit (hợp lệ) ===
status: 200
{'assessment_id': 'digitalization_level', 'level': 1, 'label': 'Mức 1 — Giấy tờ/thủ công',
 'description': 'Phần lớn quy trình vẫn vận hành thủ công. Bước hợp lý tiếp theo là số hoá tài liệu và quy trình cốt lõi.',
 'insufficient_data_message': None,
 'related_links': [
   {'title': 'Doanh nghiệp của bạn đang ở giai đoạn số hóa nào?', 'url': '/knowledge/doanh-nghiep-dang-o-giai-doan-so-hoa-nao'},
   {'title': 'Paperless không phải chuyển đổi số — đây là sự khác biệt', 'url': '/knowledge/paperless-khong-phai-chuyen-doi-so'}],
 'submission_id': 'sub_a464d88acaa3'}

=== POST /api/assessment/submit (honeypot bị điền -> phải 400) ===
status: 400
{'detail': 'Invalid submission'}

=== GET /health ===
status: 200 {'status': 'ok'}
```

## 4. Chạy server thật (`uvicorn`) và gọi qua HTTP thật (không phải TestClient)

```
$ python3 -m uvicorn backend.main:app --host 127.0.0.1 --port 8123
INFO:     Started server process [235]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8123 (Press CTRL+C to quit)

$ curl -s -X POST http://127.0.0.1:8123/api/assessment/submit \
  -H "Content-Type: application/json" \
  -d '{"assessment_id":"km_maturity","answers":[...]}'
{"assessment_id":"km_maturity","level":4,"label":"Tổ chức hoá",
 "description":"Tri thức đã trở thành tài sản tổ chức, ít phụ thuộc cá nhân, có thể truy xuất và tái sử dụng tốt.",
 "insufficient_data_message":null,
 "related_links":[
   {"title":"Khi nhân sự chủ chốt nghỉ việc, họ mang đi thứ gì?","url":"/knowledge/nhan-su-nghi-viec-mang-di-tri-thuc"},
   {"title":"SOP có nhưng không được thực thi — tại sao?","url":"/knowledge/sop-khong-duoc-thuc-thi"}],
 "submission_id":"sub_25a15bd8e5dd"}
```

Server được dừng ngay sau test, xác nhận bằng `ps aux | grep uvicorn` (không
còn tiến trình) và `curl` tới cổng đó trả về `000` (không kết nối được).

## 5. Kiểm tra cú pháp JavaScript trong widget

```
$ node --check /tmp/widget_extracted.js
(không có output = hợp lệ, exit code 0)
```

## 6. Việc CHƯA test được trong phiên này

* Chưa test `HttpOkelasCoreClient` với instance OKELAS Core thật — vì chưa
  có endpoint/credentials thật (xem README §5). Phần này chỉ được review code,
  chưa chạy.
* Chưa test hiển thị trực quan của `assessment-widget.html` trên trình duyệt
  thật (chỉ kiểm tra cú pháp JS + đọc lại code) — nên click-test thủ công một
  lượt trước khi đưa lên production.
