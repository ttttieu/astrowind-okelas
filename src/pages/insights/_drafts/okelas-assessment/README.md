# OKELAS Assessment — Website Widget + OKELAS of OKELAS Intake

Code cho bước "tiến hành assessment trên website okelas.com, đồng thời chuyển
thành đầu vào cho OKELAS of OKELAS (nội bộ)". Đây là bản triển khai tham
chiếu, đã chạy test thật (xem `docs/TEST_LOG.md`), sẵn sàng để tích hợp — với
một số điểm **bắt buộc xác nhận lại** trước khi đưa vào production (liệt kê ở
mục 5).

---

## 1. Nguyên tắc kiến trúc bắt buộc (đến từ yêu cầu của bạn)

> "Sau khi nhận câu trả lời, đồng thời phải chuyển thành đầu vào cho OKELAS
> of OKELAS (nội bộ) — trên OKELAS of OKELAS không chạy thêm các phân tích,
> vì nó phải đồng nhất với môi trường của khách hàng on-prem, nên chỉ tiến
> hành theo process/workflow được xây dựng cho phục vụ khách hàng."

Cách hiện thực hoá nguyên tắc này trong code:

* **Toàn bộ logic tính điểm/level/flag chỉ tồn tại ở MỘT nơi**:
  [`workflow-definitions/assessment_intake_workflow.json`](workflow-definitions/assessment_intake_workflow.json)
  — một đặc tả khai báo (declarative), không phải code riêng của website.
* File này chính là "process/workflow được xây dựng để phục vụ khách hàng" —
  cùng một workflow được nạp vào **cả hai nơi**: instance nội bộ ("OKELAS of
  OKELAS") và mọi instance on-prem của khách hàng. Không có bản sao logic
  nào khác.
* Backend của website (`backend/`) **không chứa phép tính điểm nào** — nó chỉ
  làm 3 việc: validate hình dạng dữ liệu, chống spam cơ bản, và **forward**
  submission tới OKELAS Core để OKELAS Core tự thực thi workflow đó.
* `backend/workflow_engine.py` (`LocalWorkflowEngine`) **không phải** một hệ
  thống phân tích thứ hai — nó là một bộ diễn giải (interpreter) trung thực
  của đúng file JSON trên, dùng làm **stand-in tạm thời** cho OKELAS Core
  thật trong lúc dev/demo (xem mục 4).

## 2. Luồng dữ liệu

```
[Người dùng trên okelas.com]
        |
        v
frontend/assessment-widget.html   (render câu hỏi từ config/questions_*.json,
        |                          không tính điểm ở client)
        | POST /api/assessment/submit
        v
backend/main.py                   (validate + chống spam — KHÔNG tính điểm)
        |
        v
backend/okelas_client.py          (adapter — chọn Http thật hoặc Local simulator)
        |
        v
=== ranh giới: bên trong đây là OKELAS Core, chạy đúng 1 workflow duy nhất ===
        |
workflow-definitions/assessment_intake_workflow.json
        |  (validate_submission -> compute_dimension_scores -> compute_overall_average
        |   -> classify_level -> detect_straight_lining_flag -> detect_contradiction_signal
        |   -> generate_public_output -> create_evidence_record -> create_task_if_flagged)
        v
   [Evidence record trong OKELAS Core] + [Task cho consultant nếu bị flag]
        |
        v
Kết quả (level/label/description) trả ngược về website để hiển thị NGAY cho người dùng
```

Vì workflow này **đồng nhất giữa nội bộ và on-prem khách hàng**, một submission
từ website được xử lý giống hệt cách một khách hàng chạy chính workflow đó
trên instance OKELAS riêng của họ — không có "phiên bản thông minh hơn" chỉ
tồn tại ở nội bộ.

## 3. Cấu trúc thư mục

```
okelas-assessment/
├── config/
│   ├── questions_erp.json         # 4 bộ câu hỏi — nguồn từ 05_Question_Sets.md
│   ├── questions_ai.json
│   ├── questions_km.json
│   └── questions_dig.json
├── workflow-definitions/
│   └── assessment_intake_workflow.json   # NGUỒN DUY NHẤT của logic scoring/level/flag
├── backend/
│   ├── main.py                    # FastAPI — orchestration mỏng, không tính điểm
│   ├── models.py                  # Pydantic schema (request/response)
│   ├── okelas_client.py           # Adapter gọi OKELAS Core (Http thật / Local simulator)
│   ├── workflow_engine.py         # Diễn giải workflow JSON — CHỈ dùng khi dev/demo
│   └── requirements.txt
├── frontend/
│   └── assessment-widget.html     # Widget tự chứa (HTML/CSS/JS thuần), nhúng iframe được
└── docs/
    └── TEST_LOG.md                # Bằng chứng đã chạy test thật trước khi bàn giao
```

## 4. Chạy thử local

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Mở `frontend/assessment-widget.html` bằng một static server bất kỳ (hoặc
`python3 -m http.server` trong thư mục `frontend/`), đổi `API_BASE` trong file
nếu backend không chạy ở `/api` cùng origin.

Ở chế độ này, `okelas_client.py` tự động dùng `LocalSimulatorClient` (không
cần biến môi trường nào) — nó thực thi đúng
`assessment_intake_workflow.json`, cho kết quả giống hệt những gì OKELAS Core
thật sẽ trả về, chỉ khác là chạy trong tiến trình của backend thay vì gọi
sang instance OKELAS Core riêng.

## 5. Việc BẮT BUỘC xác nhận trước khi deploy production

Phần này quan trọng — code hiện tại đưa ra giả định hợp lý nhưng **chưa được
xác nhận** vì tài liệu API thật của OKELAS Core chưa có trong phiên làm việc
này:

| Giả định hiện tại | Cần xác nhận |
|---|---|
| OKELAS Core có REST endpoint `POST /api/v1/workflows/trigger` nhận `{event_type, workflow_id, source, data}` | Endpoint/path/envelope thật của OKELAS Core (có thể theo kiểu Frappe/DocType nếu OKELAS Core build trên nền Frappe — path và payload sẽ khác) |
| Xác thực bằng Bearer token qua `OKELAS_CORE_API_KEY` | Cơ chế auth thật (API key, OAuth, mTLS...) |
| OKELAS Core xử lý và trả kết quả **đồng bộ** trong cùng response | Nếu OKELAS Core xử lý bất đồng bộ (queue/event-driven), cần đổi `HttpOkelasCoreClient` sang mô hình polling hoặc webhook callback thay vì chờ response trực tiếp |
| Workflow `assessment_intake` đã được nạp sẵn vào OKELAS Core dưới `workflow_id` này | Cách thật để đăng ký/nạp workflow definition vào OKELAS Core (qua UI, qua migration script, qua API riêng...) |
| Slug bài viết trong `RELATED_LINKS` (main.py) | Đường dẫn thật trên website khi các bài trong `03_Pillar_Map` được xuất bản |

Cho tới khi các điểm trên được xác nhận, hệ thống **vẫn chạy được đầy đủ và
đúng logic** ở chế độ `LocalSimulatorClient` — chỉ chưa thật sự ghi Evidence
vào OKELAS Core nội bộ. Khi có thông tin API thật, chỉ cần sửa
`HttpOkelasCoreClient` trong `okelas_client.py` — không cần đổi bất kỳ chỗ
nào khác (frontend, main.py, workflow JSON đều giữ nguyên).

## 6. Việc cần làm tiếp (theo đúng roadmap đã thống nhất trước đó)

* Pilot bộ câu hỏi với người dùng thật để hiệu chỉnh ngưỡng level trong từng
  `config/questions_*.json` (mục `levels`).
* Viết Interview Script cho consultant (việc còn thiếu đã nêu ở
  `04_Verification_Framework`), dùng làm input cho workflow
  `consultant_assessment_followup` — workflow này **chưa nằm trong phạm vi
  code hiện tại**, chỉ được `create_task_if_flagged` tham chiếu tới.
* Xây 4 Decision Tree đầy đủ (ERP, KM, Digitalization theo mẫu AI Readiness) —
  chạy như một workflow riêng, nhận input là Evidence record đã tạo ở bước
  này, không sửa lại `assessment_intake_workflow.json`.
