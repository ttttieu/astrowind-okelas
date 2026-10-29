# 05 · OKELAS Workflow Readiness Assessment — Thiết kế v0.1

*Tài liệu thiết kế: câu hỏi, scoring, diễn giải kết quả, và cầu nối sang consultant. Chưa phải bản copy cuối cho website. Đọc cùng `01`–`04`.*

---

## 0. Định vị

**Tên:** Workflow Readiness Assessment
**VI (tên hiển thị):** Đánh giá mức sẵn sàng workflow
**Câu hỏi lớn:** *Doanh nghiệp bạn có biến được sự kiện kinh doanh thành hành động phối hợp, có truy vết không?*
**Câu hỏi VI cho CEO:** "Việc đến được tay đúng người, đúng lúc, và một năm sau còn giải thích được vì sao — hay chỉ chạy được nhờ vài người giỏi?"

**Insight nền (không đổi):**
> Workflow maturity không phải là có thêm nhiều màn hình workflow. Là làm cho sự kiện kinh doanh trở thành hành động.

**Thông điệp mà CEO phải rút ra sau khi làm xong (aha chính):**
> "Chúng tôi không có vấn đề về workflow. Chúng tôi có vấn đề biến sự kiện kinh doanh thành hành động phối hợp, có truy vết."

**Assessment này không bán phần mềm workflow.** Kết quả phải có giá trị ngay cả khi CEO không liên hệ OKELAS.

### Vai trò trong hệ thống assessment

Đây là assessment thứ 5, nằm cạnh 4 assessment trong Pillar Map (ERP Readiness, AI Readiness, KM Maturity, Digitalization Level). Nó không thay thế cái nào: workflow là **lớp trung gian** mà cả ERP, KM và AI đều phụ thuộc.

| Liên hệ | Ý nghĩa |
|---|---|
| Workflow → ERP Readiness | Quy trình chưa có trigger, handoff rõ thì ERP chỉ số hóa sự mơ hồ |
| Workflow → KM Maturity | Evidence và truy vết là nơi tri thức tổ chức được sinh ra |
| Workflow → AI Readiness | AI/agent cần event, quyền hạn, evidence để hành động; không có thì chỉ trả lời câu hỏi |
| Workflow ↔ Digitalization Level | Hai thang riêng. Không dùng chung tên cấp (xem mục 8.2) |

Gợi ý bài dẫn vào (theo Pillar Map): 1.2, 3.2, 3.5, 4.3. Nên có thêm 1–2 bài gợi mở riêng (đề xuất ở mục 9).

---

## 1. Nguyên tắc thiết kế

Vì CEO chưa chắc trả lời đúng thực tế vận hành, thiết kế dựa trên 6 nguyên tắc:

1. **Neo vào một workflow cụ thể, không hỏi chung chung.** Hỏi "doanh nghiệp có workflow không?" luôn cho kết quả đẹp. Hỏi "nếu người giữ việc này nghỉ phép một tuần thì sao?" thì không.
2. **Hỏi hành vi, không hỏi tự đánh giá.** Mỗi đáp án là một tình huống cụ thể, không phải "kém / khá / tốt".
3. **Không kèm lời khen/chê ở từng đáp án.** Thứ tự đáp án được xáo ngẫu nhiên khi hiển thị để giảm thiên vị chọn đáp án "đẹp".
4. **Dùng mâu thuẫn giữa các câu trả lời làm tín hiệu.** Câu trả lời lạc quan ở câu này nhưng yếu ở câu kia thường cho thấy khoảng cách giữa "chúng tôi có" và "thực tế vận hành".
5. **"Không chắc" là một câu trả lời hợp lệ và có giá trị.** Không biết workflow của mình chạy thế nào cũng là một phát hiện (điểm mù).
6. **Kết quả là giả thuyết để kiểm chứng, không phải phán quyết.** Điều này nói rõ trên trang kết quả và là cầu nối tự nhiên sang consultant.

### Cấu trúc 3 lớp

| Lớp | Ai làm | Thời lượng đề xuất | Mục đích |
|---|---|---|---|
| **L1 — Screening (web)** | CEO / BOD tự làm | ~4–5 phút | Aha moment, tạo nhu cầu |
| **L2 — Workflow Stress Test** | Consultant + 1–2 người làm trực tiếp | 60–90 phút (đề xuất, chỉnh theo thực tế) | Kiểm chứng giả thuyết trên một ca thật |
| **L3 — Discovery sâu** | Consultant | Theo dự án | Automation Opportunity Map, kết nối ERP/QMS/AI |

Phiên bản 24 câu (6 nhóm × 4 câu) trong tài liệu gốc **không bỏ**: dùng làm ngân hàng câu hỏi cho L2/L3 của consultant. Bản web giữ ≤ 10 câu theo Assessment Architecture (Pillar Map, Phần 5).

---

## 2. Layer 1 — Screening trên website

### 2.1. Bước 0 — Chọn một workflow

> **Chọn một quy trình mà bạn thấy khó chịu nhất gần đây.** Ví dụ: tuần trước, tháng trước bạn phải hỏi "sao việc này chưa xong?"

Danh sách chọn:
- Báo giá / nhận đơn hàng
- Mua hàng / duyệt mua
- Kế hoạch & lệnh sản xuất
- Khiếu nại khách hàng
- Sai lệch chất lượng / CAPA
- Đánh giá nhà cung cấp
- Bảo trì thiết bị
- Tuyển dụng / onboarding
- Duyệt chi / phê duyệt nội bộ
- Khác (nhập tay)

**Lưu ý UX:** chọn quy trình *gây khó chịu*, không phải quy trình *tốt nhất*. Nếu CEO chọn quy trình đang chạy tốt, kết quả sẽ đánh giá cao hơn thực tế toàn doanh nghiệp. Cần nói rõ ở màn hình này.

Toàn bộ câu hỏi sau đó dùng `{workflow}` thay bằng tên quy trình đã chọn.

### 2.2. Bước 0b — Hồ sơ nhanh (không tính điểm, cho consultant)

| Trường | Lựa chọn |
|---|---|
| Vai trò người trả lời | CEO/Chủ DN · COO/Sản xuất · Chất lượng · IT · CFO · Khác |
| Ngành | Thực phẩm · Thủy sản · Trà · Sản xuất khác |
| Quy mô nhân sự | dải lựa chọn |
| Hệ thống đang dùng cho workflow này | Giấy · Excel/Word · Zalo/Email · Phần mềm chuyên ngành · ERP |
| Đang có ISO/GMP/QMS? | Có · Đang chuẩn bị · Không |
| Đang có kế hoạch ERP? | Đã có · Đang chọn · Chưa |
| **Bạn đã hỏi người trực tiếp làm việc này chưa?** | Rồi · Chưa |

Trường cuối dùng cho chỉ báo "độ tin cậy" ở mục 4.5.

### 2.3. Mười câu hỏi (Q1–Q10)

Mỗi câu có 5 đáp án cụ thể + "Tôi không chắc". Điểm 0–4 (hiển thị cho người dùng: không). "Không chắc" tính **1 điểm** và đếm riêng (xem mục 4.4).

> Thứ tự hiển thị đáp án nên xáo ngẫu nhiên, hoặc luôn xếp từ "yếu" đến "mạnh" nhưng ẩn nhãn điểm. Cần A/B test khi có dữ liệu.

---

#### Nhóm A — Process Clarity (Q1–Q2)

**Q1. Nếu một nhân viên mới được giao `{workflow}` vào ngày đầu tiên, họ làm theo cái gì?**

| Điểm | Đáp án |
|---:|---|
| 0 | Không có gì cụ thể; mỗi người làm một kiểu |
| 1 | Hỏi đồng nghiệp lâu năm; quy trình nằm trong đầu họ |
| 2 | Có SOP/văn bản, nhưng thực tế mọi người làm hơi khác |
| 3 | Có quy trình rõ bước và vai trò; đa số làm đúng và có kiểm tra |
| 4 | Quy trình được cấu hình trong hệ thống; nhân viên được dẫn qua từng bước |
| 1* | Tôi không chắc |

*Insight câu hỏi:* phân biệt "có tài liệu" với "được thực hiện theo tài liệu".

**Q2. Trong `{workflow}`, có bước nào chỉ chạy được vì "có người biết phải làm gì"?**

| Điểm | Đáp án |
|---:|---|
| 0 | Rất nhiều; vài người vắng là việc khựng lại |
| 1 | Một vài bước quan trọng |
| 2 | Vài bước nhỏ; chúng tôi biết nhưng chưa xử lý |
| 3 | Hiếm; đã ghi lại hướng dẫn và có người dự phòng |
| 4 | Không; mọi bước đều được xác định và người khác thực hiện được |
| 1* | Tôi không chắc |

*Insight câu hỏi:* phát hiện tri thức ngầm (tribal knowledge).

---

#### Nhóm B — Trigger & Event (Q3–Q4) — phần đặc trưng của OKELAS

**Q3. Điều gì làm `{workflow}` bắt đầu?**

| Điểm | Đáp án |
|---:|---|
| 0 | Không ai biết chính xác lúc nào việc bắt đầu; thường phát hiện khi đã trễ |
| 1 | Có người nhớ, hoặc được nhắc miệng (điện thoại, Zalo) |
| 2 | Email/Zalo/Excel; người nhận phải tự đọc và nhận ra việc cần làm |
| 3 | Có phiếu/biểu mẫu yêu cầu và người nhận cố định |
| 4 | Một sự kiện (đơn hàng, kết quả kiểm, ngày hết hạn…) tự tạo ra công việc |
| 1* | Tôi không chắc |

**Q4. Lần gần nhất `{workflow}` bị quên hoặc trễ vì không ai biết một sự kiện đã xảy ra: bạn biết qua đâu?**

| Điểm | Đáp án |
|---:|---|
| 0 | Khách hàng, đối tác hoặc đoàn đánh giá phản ánh |
| 1 | Tôi hoặc quản lý tình cờ phát hiện |
| 2 | Đến lúc rà Excel/báo cáo cuối tuần/cuối tháng mới thấy |
| 3 | Có danh sách theo dõi; người phụ trách nhận ra trước hạn |
| 4 | Hệ thống cảnh báo trước khi trễ |
| 1* | Tôi không nhớ / chưa từng nghe có trường hợp như vậy |

*Lưu ý:* "chưa từng nghe có" và "không chắc" gộp chung và tính 1 điểm. Đây không phải đáp án tốt: nếu không có cơ chế phát hiện, trường hợp bị quên thường không ai biết để báo.

---

#### Nhóm C — Handoff (Q5–Q6)

**Q5. Bộ phận A hoàn thành phần của mình. Bộ phận B biết cần tiếp tục bằng cách nào?**

| Điểm | Đáp án |
|---:|---|
| 0 | A phải nhớ báo, hoặc B tự hỏi |
| 1 | Gọi điện / nhắn Zalo / nói trực tiếp |
| 2 | Gửi email hoặc gửi file |
| 3 | A cập nhật vào bảng chung/Excel/hệ thống; B phải vào xem |
| 4 | Hệ thống tự giao việc cho B và có hạn xử lý |
| 1* | Tôi không chắc |

**Q6. Nếu người đang giữ `{workflow}` nghỉ phép một tuần mà không báo trước, điều gì xảy ra?**

| Điểm | Đáp án |
|---:|---|
| 0 | Việc dừng cho đến khi họ quay lại |
| 1 | Mọi người phải lục tin nhắn/file của họ để biết việc đang ở đâu |
| 2 | Có người thay, nhưng phải bàn giao thủ công |
| 3 | Việc và trạng thái nằm trên sổ theo dõi chung; người khác nhận tiếp được |
| 4 | Việc tự chuyển cho người dự phòng; không mất ngữ cảnh |
| 1* | Tôi không chắc |

*Insight câu hỏi:* đo mức phụ thuộc vào cá nhân (organizational dependency). Dự kiến là câu gây aha mạnh nhất.

---

#### Nhóm D — Decision & Approval (Q7)

**Q7. Khi `{workflow}` cần phê duyệt, người duyệt dựa vào gì, và quyết định được ghi lại thế nào?**

| Điểm | Đáp án |
|---:|---|
| 0 | Nghe báo cáo miệng, đồng ý miệng |
| 1 | Đọc email/chat rồi trả lời "OK" |
| 2 | Xem file hoặc bản giấy; ký hoặc phản hồi |
| 3 | Xem hồ sơ đầy đủ; ghi nhận người duyệt và thời điểm |
| 4 | Hệ thống hiển thị đủ evidence liên quan; quyết định và lý do được ghi thành sự kiện truy vết được |
| 1* | Tôi không chắc |

*Ghi chú:* nhóm này chỉ có 1 câu ở bản web, nên chỉ coi là tín hiệu (xem mục 4.2).

---

#### Nhóm E — Evidence & Knowledge (Q8–Q9)

**Q8. Khi `{workflow}` xong, kết quả nằm ở đâu?**

| Điểm | Đáp án |
|---:|---|
| 0 | Không lưu lại một cách có hệ thống |
| 1 | Email, chat, file cá nhân |
| 2 | Thư mục chung; mỗi người đặt tên/sắp xếp một kiểu |
| 3 | Hồ sơ/hệ thống chung có cấu trúc; tìm được theo mã, ngày |
| 4 | Dữ liệu có cấu trúc, liên kết với đơn hàng/lô/khách hàng/người thực hiện |
| 1* | Tôi không chắc |

**Q9. Một năm sau, khách hàng hoặc đoàn đánh giá hỏi: "Vì sao lúc đó quyết định như vậy, ai làm, dựa trên gì?" Doanh nghiệp trả lời mất bao lâu?**

| Điểm | Đáp án |
|---:|---|
| 0 | Không trả lời được |
| 1 | Phải hỏi quanh nhiều người, mất nhiều ngày, có khi vẫn không đủ |
| 2 | Tìm được hồ sơ nhưng phải ghép từ nhiều nơi, mất một đến hai ngày |
| 3 | Truy được trong ngày từ hồ sơ |
| 4 | Truy ngược trong vài phút: kết quả → quyết định → evidence → người thực hiện → sự kiện ban đầu |
| 1* | Tôi không chắc |

*Insight câu hỏi:* câu "trace test". Khi CEO chọn 0–2, đây thường là lúc họ thấy rằng có workflow nhưng chưa có tri thức tổ chức.

*Lưu ý:* các mốc thời gian ở đây là thang trả lời, không phải thống kê và không đưa lên kết quả như một con số.

---

#### Nhóm F — Automation (Q10, không tính vào Maturity Index)

**Q10. Trong `{workflow}`, bao nhiêu công sức của con người dành cho những việc không cần phán đoán: chuyển dữ liệu giữa các file, nhắc việc, tổng hợp báo cáo, cập nhật trạng thái?**

| Điểm (Manual Load) | Đáp án |
|---:|---|
| 0 | Gần như không có |
| 1 | Một phần nhỏ |
| 2 | Đáng kể |
| 3 | Phần lớn thời gian của người làm |
| 4 | Gần như toàn bộ; con người đóng vai trò "bộ chuyển dữ liệu" |
| — | Tôi chưa từng nhìn theo cách này (đếm là "không chắc"; Manual Load tính 2) |

Q10 đo **cơ hội** (có bao nhiêu việc đáng tự động hóa), không đo **mức trưởng thành**. Vì vậy tách riêng khỏi Maturity Index.

---

## 3. Scoring

### 3.1. Điểm theo nhóm

| Nhóm | Câu | Điểm tối đa | Quy đổi 0–100 |
|---|---|---:|---|
| Process Clarity | Q1+Q2 | 8 | điểm ÷ 8 × 100 |
| Trigger & Event | Q3+Q4 | 8 | điểm ÷ 8 × 100 |
| Handoff | Q5+Q6 | 8 | điểm ÷ 8 × 100 |
| Decision & Approval | Q7 | 4 | điểm ÷ 4 × 100 *(tín hiệu)* |
| Evidence & Knowledge | Q8+Q9 | 8 | điểm ÷ 8 × 100 |
| **Automation Readiness** | *dẫn xuất* | — | trung bình của Event, Handoff, Evidence |

**Automation Readiness là kết quả phía sau**, không có câu hỏi riêng. Đây giữ nguyên nguyên tắc "không đưa AI lên đầu": tự động hóa chỉ sẵn sàng khi sự kiện, handoff và evidence đã sẵn sàng.

### 3.2. Maturity Index

```
Maturity Index = (Q1 + Q2 + … + Q9) ÷ 36 × 100
```

Q10 không tham gia.

### 3.3. Cấp độ workflow (5 mức)

| Index | Mức |
|---|---|
| 0–19 | 1 — Person-driven |
| 20–39 | 2 — Document-driven |
| 40–59 | 3 — Workflow-driven |
| 60–79 | 4 — Event-driven |
| 80–100 | 5 — Knowledge-driven |

### 3.4. Quy tắc giới hạn khâu yếu (gating)

Tổng điểm cao không có nghĩa là lên mức cao. Mức hiển thị bị giới hạn bởi các nhóm nền tảng:

| Để đạt | Điều kiện bổ sung | Nếu không đạt |
|---|---|---|
| Mức 4 — Event-driven | Event ≥ 60 **và** Handoff ≥ 60 | Hiển thị Mức 3 |
| Mức 5 — Knowledge-driven | Evidence ≥ 75 **và** Q9 ≥ 3 | Hiển thị Mức 4 |

Khi gating hoạt động, trang kết quả phải nói rõ:
> "Điểm tổng của bạn ở Mức 4, nhưng khâu [Event/Handoff/Evidence] đang kéo mức hiển thị xuống Mức 3."

Đây là một trong những khoảnh khắc aha: CEO thấy được **mắt xích yếu nhất** thay vì điểm trung bình.

**Ngưỡng (20/40/60/80, 60, 75) là ngưỡng khởi đầu, chưa được hiệu chỉnh bằng dữ liệu thực.** Cần hiệu chỉnh sau khi có các lượt làm đầu tiên và so với kết quả Stress Test (mục 8.3).

### 3.5. Dải trạng thái theo nhóm (cho biểu đồ radar)

| Điểm nhóm | Nhãn | Màu (theo Image Standard) |
|---|---|---|
| < 40 | Chưa thấy được / phụ thuộc người | tím |
| 40–69 | Có, nhưng còn thủ công | xám |
| ≥ 70 | Có cấu trúc và theo dõi được | xanh |

### 3.6. Điểm nghẽn chính (Primary Constraint)

Nhóm có điểm thấp nhất trong 5 nhóm (Process, Event, Handoff, Decision, Evidence). Nếu bằng nhau, ưu tiên nhóm **đứng trước** theo chuỗi nguyên nhân:

`Process → Event → Handoff → Decision → Evidence`

Mỗi nhóm có một câu insight tương ứng (mục 4.1).

### 3.7. Ví dụ tính toán (tình huống minh họa giả định, không phải dữ liệu thực)

Câu trả lời: Q1=3, Q2=2, Q3=1, Q4=1, Q5=2, Q6=2, Q7=3, Q8=3, Q9=2, Q10=3.

| Nhóm | Điểm | /100 |
|---|---:|---:|
| Process | 3+2 = 5 | 62,5 |
| Event | 1+1 = 2 | **25** |
| Handoff | 2+2 = 4 | 50 |
| Decision | 3 | 75 |
| Evidence | 3+2 = 5 | 62,5 |

- Tổng Q1–Q9 = 19 → Index = 19 ÷ 36 × 100 ≈ **53** → Mức 3 (Workflow-driven).
- Điểm nghẽn chính: **Event** (25).
- Automation Readiness = (25 + 50 + 62,5) ÷ 3 ≈ **46** (thấp, <50). Manual Load = 3 (cao).
- Quadrant: *cơ hội lớn, chưa sẵn sàng* (mục 5).
- Cờ: F4 (Q8=3 nhưng Q9=2) — lưu trữ có, truy vết chưa.

Headline: *"Quy trình của bạn đã được mô tả và có phê duyệt, nhưng việc vẫn di chuyển qua người chứ chưa di chuyển qua sự kiện."*

---

## 4. Diễn giải kết quả

Trang kết quả gồm 6 khối theo thứ tự:

1. **Headline insight** (một câu, theo điểm nghẽn chính)
2. **Mức workflow + Index**
3. **Radar 6 trục** + nhãn từng nhóm
4. **"Điều bạn có thể chưa thấy"** — các cờ mâu thuẫn và điểm mù
5. **Ma trận Automation** (Cơ hội × Sẵn sàng)
6. **Việc nên làm tuần này** + bước tiếp theo

### 4.1. Headline theo điểm nghẽn chính

| Điểm nghẽn | Headline (VI) |
|---|---|
| Process | "Quy trình của bạn nằm trong đầu người nhiều hơn là trên giấy." |
| Event | "Vấn đề không phải thiếu màn hình workflow. Là sự kiện kinh doanh chưa trở thành hành động." |
| Handoff | "Công việc đang di chuyển qua người, không phải qua hệ thống. Mỗi lần chuyển giao là một điểm có thể rơi mất." |
| Decision | "Quyết định được đưa ra và được ký, nhưng chưa giải thích được vì sao." |
| Evidence | "Công việc xong rồi, nhưng chưa trở thành tri thức mà người khác dùng lại được." |

Headline là **giả thuyết**, không phải kết luận. Dòng ghi chú cố định bên dưới: *"Đây là giả thuyết từ 10 câu trả lời của bạn về một quy trình. Cần kiểm chứng trên một ca thật."*

### 4.2. Diễn giải 5 mức

#### Mức 1 — Person-driven · *Workflow nằm chủ yếu trong đầu người*

- **Dấu hiệu:** việc chạy nhờ vài người biết; quên/trễ thường được phát hiện từ bên ngoài; bàn giao bằng miệng.
- **Rủi ro:** nghỉ việc hoặc nghỉ phép của một người làm đứt cả chuỗi; không có hồ sơ để giải thích.
- **Chưa nên làm vội:** mua phần mềm workflow hay triển khai AI. Chưa có gì rõ ràng để số hóa.
- **Bước tiếp theo hợp lý:** viết ra *một* quy trình này thành chuỗi: trigger → bước → người → quyết định → hồ sơ. Không cần đẹp, cần đủ để người khác đọc hiểu.
- **Consultant sẽ kiểm tra:** ai thực sự biết quy trình; những bước nào "chỉ người đó biết".

#### Mức 2 — Document-driven · *Có quy trình trên giấy, thực thi vẫn thủ công*

- **Dấu hiệu:** có SOP/biểu mẫu/Excel; việc di chuyển bằng email/Zalo/file; theo dõi dựa vào nhắc nhau.
- **Rủi ro:** khoảng cách giữa "quy trình viết" và "quy trình làm" lớn dần; tài liệu nhiều nhưng không ai biết việc đang ở đâu.
- **Chưa nên làm vội:** số hóa tài liệu thêm (scan, DMS) mà không đổi cách việc di chuyển.
- **Bước tiếp theo hợp lý:** chọn một sự kiện (ví dụ: đơn hàng được xác nhận) và xác định ai nhận việc, hạn xử lý, ai thấy trạng thái.
- **Consultant sẽ kiểm tra:** SOP khác thực tế ở đâu; bao nhiêu việc nằm ngoài hệ thống (Excel/Zalo).

#### Mức 3 — Workflow-driven · *Công việc, trách nhiệm, phê duyệt được phối hợp có hệ thống*

- **Dấu hiệu:** có phiếu/biểu mẫu/bảng theo dõi; người nhận rõ; duyệt có ghi nhận.
- **Rủi ro:** việc vẫn phải có người *vào xem* mới biết; sự kiện chưa tự sinh hành động; lưu trữ có nhưng truy vết chưa mạnh.
- **Chưa nên làm vội:** tự động hóa/agent trên một chuỗi mà trigger và handoff còn dựa vào người nhớ.
- **Bước tiếp theo hợp lý:** biến 2–3 điểm chuyển giao quan trọng nhất thành "tự giao việc có hạn"; thử trace test (Q9) trên 3 hồ sơ cũ.
- **Consultant sẽ kiểm tra:** việc nào đang chờ mà không ai biết; hồ sơ nào không truy ngược được.

#### Mức 4 — Event-driven · *Sự kiện kinh doanh tự kích hoạt hành động tiếp theo*

- **Dấu hiệu:** trigger rõ; handoff có hạn; cảnh báo trước khi trễ.
- **Rủi ro:** evidence và lý do quyết định chưa được giữ lại đủ để thành tri thức dùng lại; tự động hóa sớm có thể khuếch đại lỗi nếu quy tắc chưa chuẩn.
- **Bước tiếp theo hợp lý:** xác định bước nào chỉ là chuyển dữ liệu/kiểm điều kiện (ứng viên automation) và bước nào cần phán đoán con người.
- **Consultant sẽ kiểm tra:** chất lượng evidence; quy tắc nào là rule rõ, quy tắc nào là kinh nghiệm cá nhân.

#### Mức 5 — Knowledge-driven · *Mỗi workflow tạo ra tri thức có cấu trúc, truy vết được*

- **Dấu hiệu:** truy ngược kết quả → quyết định → evidence → người → sự kiện trong vài phút.
- **Rủi ro:** mở rộng sang quy trình khác mà không giữ chuẩn; AI/agent hoạt động mà quyền hạn chưa rõ.
- **Bước tiếp theo hợp lý:** mở rộng sang quy trình kế tiếp; đánh giá AI Readiness và quyền hạn/agent.
- **Consultant sẽ kiểm tra:** độ nhất quán giữa các workflow; governance; điều kiện cho AI.

*Ghi chú:* ít doanh nghiệp SME sẽ đạt Mức 5 ở bản web. **Mục tiêu không phải ép mọi doanh nghiệp lên mức cao nhất**, mà là biết "bước tiếp theo có ý nghĩa kinh tế".

### 4.3. Nhóm 3 vùng (để khớp quy ước "3–4 level" của Assessment Architecture)

| Vùng | Mức | Thông điệp |
|---|---|---|
| **Nền tảng** | 1–2 | Làm cho việc nhìn thấy được trước khi làm cho việc nhanh hơn |
| **Chuyển giao** | 3 | Từ "người đi xem" sang "việc tự đến" |
| **Mở rộng** | 4–5 | Từ tự động hóa sang tri thức và AI |

### 4.4. Cờ mâu thuẫn và điểm mù ("Điều bạn có thể chưa thấy")

| Cờ | Điều kiện | Thông điệp (VI) | Consultant hỏi |
|---|---|---|---|
| **F1 — Giấy khác thực tế** | Q1 ≥ 3 và (Q2 ≤ 1 hoặc Q6 ≤ 1) | "Quy trình được mô tả, nhưng vài người vẫn là mắt xích không thay thế được." | "Xin cho xem SOP, rồi cho tôi gặp người đang làm. Hai thứ này khác nhau ở đâu?" |
| **F2 — Có sổ, không có sự kiện** | Q5 ≥ 3 và Q4 ≤ 1 | "Có nơi ghi nhận việc, nhưng việc trễ vẫn được phát hiện muộn: sổ được cập nhật, nhưng không ai được báo." | "Lần gần nhất việc trễ, ai là người đầu tiên biết?" |
| **F3 — Ký duyệt, không giải thích** | Q7 ≥ 3 và Q9 ≤ 1 | "Có người duyệt và ngày duyệt, nhưng một năm sau không giải thích được vì sao." | "Lấy một quyết định cũ. Tại sao lúc đó được duyệt?" |
| **F4 — Lưu có, hiểu chưa** | Q8 ≥ 3 và Q9 ≤ 2 | "Kết quả được lưu, nhưng chưa nối được với người, quyết định và sự kiện ban đầu." | "Chọn ngẫu nhiên 3 hồ sơ. Truy ngược được mấy hồ sơ?" |
| **F5 — Điểm mù** | ≥ 3 câu trả lời "Không chắc" | "Bạn đang chưa nhìn thấy cách quy trình này thực sự chạy. Đó thường là dấu hiệu đầu tiên." | "Ai là người biết nhất? Chúng ta sẽ đi theo một ca thật." |

**Nguyên tắc diễn đạt:** cờ luôn nói dưới dạng *"có thể"*, không buộc tội. Tối đa hiển thị 2 cờ (ưu tiên F5, rồi theo thứ tự mạnh nhất) để tránh quá tải.

### 4.5. Chỉ báo độ tin cậy (Perception Gap)

Dựa vào trường hồ sơ "đã hỏi người trực tiếp làm chưa?" và vai trò người trả lời:

- Nếu người trả lời là CEO/BOD **và** chưa hỏi người làm trực tiếp: hiển thị ghi chú  
  > "Kết quả này phản ánh góc nhìn của lãnh đạo. Góc nhìn của người trực tiếp làm việc thường khác. Chênh lệch đó chính là thứ đáng đo."
- Khối **"Việc nên làm tuần này"** (xem mục 4.7) biến chênh lệch đó thành một bài tập 15 phút.

Đây là cách thiết kế xử lý sự thật rằng CEO chưa chắc trả lời đúng: **không giả vờ chính xác, mà biến sự không chính xác thành lý do cần kiểm chứng.**

### 4.6. Ma trận Automation

Trục X: **Automation Readiness** (<50 thấp / ≥50 cao).
Trục Y: **Manual Load** (Q10 ≤1 thấp / ≥2 cao).

| | Readiness thấp | Readiness cao |
|---|---|---|
| **Manual Load cao** | **Cơ hội lớn, chưa sẵn sàng.** *Tự động hóa lúc này sẽ tự động hóa sự hỗn loạn.* Chuẩn hóa sự kiện, handoff, evidence trước. | **Ứng viên automation rõ ràng.** Có việc lặp lại nhiều và nền đã đủ. Đây là nơi automation/agent có thể có giá trị sớm. |
| **Manual Load thấp** | **Ưu tiên thấp.** Chưa cần automation; tập trung làm rõ quy trình và sự kiện. | **Gọn và có nền.** Cân nhắc đầu tư vào evidence/knowledge để mở đường cho AI. |

Ngưỡng 50 và Q10 ≥2 là ngưỡng khởi đầu, cần hiệu chỉnh.

### 4.7. "Việc nên làm tuần này" (giá trị độc lập, không cần liên hệ)

Ba bài tập 15 phút, luôn hiển thị, chọn 1–2 theo điểm nghẽn:

1. **Kiểm tra góc nhìn:** hỏi người trực tiếp làm `{workflow}` đúng Q4 và Q6, không gợi ý. So với câu trả lời của bạn.
2. **Trace test:** chọn ngẫu nhiên 3 hồ sơ cũ của quy trình này. Đo xem truy ngược được mấy hồ sơ về sự kiện ban đầu và người quyết định.
3. **Vẽ chuỗi:** viết lên một trang `Sự kiện → Giao việc → Xử lý → Quyết định → Hồ sơ → Sự kiện tiếp theo`. Đánh dấu chỗ nào "chỉ một người biết".

### 4.8. CTA theo vùng

CTA không phải "đăng ký demo". Thứ tự ưu tiên như Production Standard: *assessment → bài liên quan → framework → liên hệ*.

| Vùng | CTA chính | CTA phụ |
|---|---|---|
| Nền tảng (1–2) | Đọc bài liên quan (quy trình/tri thức ngầm) | **Đặt Workflow Stress Test** (một ca thật, một quy trình) |
| Chuyển giao (3) | **Đặt Workflow Stress Test** | Làm ERP Readiness / KM Maturity |
| Mở rộng (4–5) | **Đặt Workflow Stress Test + Automation Opportunity Map** | Làm AI Readiness |

Copy CTA (gợi ý): *"Kết quả này là giả thuyết. Cùng đi qua một ca thật để kiểm chứng: mang theo một hồ sơ gần đây và một ca bị trễ."*

---

## 5. Aha moments và cơ chế tạo nhu cầu

| # | Aha | Từ đâu | Vì sao tạo nhu cầu tư vấn |
|---|---|---|---|
| 1 | "Tôi chọn một quy trình, và tôi không trả lời được vài câu cơ bản về nó" | Bước 0 + "Không chắc" | Cảm giác mất kiểm soát có thể sờ thấy |
| 2 | "Quy trình có, nhưng người nghỉ một tuần thì rối" | Q6 + F1 | Rủi ro cụ thể, dễ hình dung |
| 3 | "Việc trễ vì không ai biết sự kiện đã xảy ra" | Q3–Q4 + F2 | Đổi cách nhìn từ "thiếu workflow" sang "thiếu event" |
| 4 | "Một năm sau tôi không giải thích được quyết định" | Q9 + F3/F4 | Nối trực tiếp sang audit, ISO/GMP, KM |
| 5 | "Tự động hóa lúc này sẽ tự động hóa sự hỗn loạn" | Ma trận | Cảnh báo trung thực, tạo uy tín; kéo AI/ERP về đúng thứ tự |
| 6 | "Mắt xích yếu nhất quyết định mức của tôi" | Gating | Từ điểm trung bình sang điểm nghẽn |

Aha #1 và #4 tạo nhu cầu mạnh nhất vì dựa vào những câu CEO **không thể trả lời bằng ý kiến**.

---

## 6. Layer 2 — Workflow Stress Test (consultant)

Mục đích: kiểm chứng giả thuyết L1 trên **một ca thật**, cùng người làm trực tiếp.

### 6.1. Chuẩn bị

Yêu cầu CEO mang theo (không bắt buộc đầy đủ):
- 1 hồ sơ gần đây hoàn tất
- 1 ca bị trễ hoặc có sự cố
- 1 hồ sơ có phê duyệt
- Người trực tiếp làm (1–2 người) tham gia

### 6.2. Chuỗi workflow cần dựng

```
Trigger → Request → Assignment → Work → Decision → Approval → Action → Evidence → Next Event
```

Với mỗi mắt xích, consultant đánh dấu:

| Ký hiệu | Ý nghĩa |
|---|---|
| ● | Có cấu trúc, theo dõi được |
| ○ | Có nhưng thủ công |
| ⚠ | Thiếu / không có |
| ★ | Ứng viên automation |

### 6.3. Bảng ghi chép mỗi mắt xích

| Mắt xích | Ai | Công cụ | Thấy được ngay không? | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| Trigger | | | | ● ○ ⚠ ★ | |
| Request | | | | | |
| Assignment | | | | | |
| Work | | | | | |
| Decision | | | | | |
| Approval | | | | | |
| Action | | | | | |
| Evidence | | | | | |
| Next Event | | | | | |

### 6.4. Mười câu Stress Test (bám vào ca thật, không nói chung)

1. Ca này bắt đầu từ sự kiện nào? Ai biết đầu tiên và biết bằng cách nào?
2. Từ lúc bắt đầu đến lúc xong, việc đi qua mấy người? Chỗ nào chờ lâu nhất?
3. Ở mỗi lần chuyển giao, người nhận biết bằng cách nào?
4. Nếu người làm bước 3 vắng, ai làm tiếp? Dựa vào cái gì?
5. Phê duyệt: người duyệt đã xem những gì? Có xem được đủ evidence liên quan không?
6. Quyết định được ghi lại ở đâu, kèm lý do không?
7. Kết quả cuối cùng nằm ở đâu? Ai tìm được?
8. Chọn ca bị trễ: sự kiện nào đã không được ai thấy?
9. Bước nào chỉ là chuyển dữ liệu/nhắc việc/tổng hợp/cập nhật trạng thái (ứng viên automation)? Bước nào cần phán đoán?
10. Sau khi xong, có sự kiện tiếp theo nào được tạo ra không, hay phụ thuộc người nhớ?

### 6.5. Đầu ra Stress Test

- **Bản đồ workflow** có ký hiệu ● ○ ⚠ ★
- **So sánh giả thuyết L1 và thực tế** (khớp / lệch / lệch theo chiều nào)
- **Automation Opportunity Map** (danh sách ★, phân loại: rule rõ / cần phán đoán / chưa đủ dữ liệu)
- **Đề xuất bước tiếp theo** (ví dụ: mở rộng sang quy trình khác, ERP Readiness, KM Maturity, hoặc chưa triển khai)

---

## 7. Cầu nối sang consultant: Workflow Discovery Brief

Kết quả L1 tự động sinh một brief gửi consultant (và gửi CEO bản rút gọn). Brief là **một thành phần của hồ sơ khám phá khách hàng**, không phải bản sao của trang kết quả.

### 7.1. Template

```text
WORKFLOW DISCOVERY BRIEF — [Công ty] — [Ngày]

1. HỒ SƠ
- Ngành / quy mô:
- Vai trò người trả lời:
- Hệ thống đang dùng cho workflow:
- ISO/GMP/QMS:
- Kế hoạch ERP:
- Đã hỏi người làm trực tiếp chưa:

2. WORKFLOW ĐƯỢC CHỌN
- Tên:
- Lý do CEO chọn (nếu có):

3. KẾT QUẢ L1
- Maturity Index / Mức (điểm → mức hiển thị, có gating không):
- Điểm theo nhóm: Process / Event / Handoff / Decision / Evidence
- Automation Readiness / Manual Load → quadrant:
- Điểm nghẽn chính:
- Số câu "Không chắc" và ở câu nào:

4. CỜ
- F1–F5 đã kích hoạt:

5. GIẢ THUYẾT CẦN KIỂM CHỨNG (tối đa 3)
- H1:
- H2:
- H3:

6. CÂU HỎI GỢI Ý CHO CUỘC GỌI ĐẦU
- (lấy từ cột "Consultant hỏi" của các cờ)

7. LIÊN QUAN
- ERP Readiness / KM Maturity / AI Readiness / Digitalization Level:
  gợi ý nên làm tiếp cái nào, lý do:

8. LƯU Ý
- Kết quả là tự đánh giá của người trả lời, chưa kiểm chứng.
```

### 7.2. Quy tắc sinh giả thuyết tự động (gợi ý)

| Điều kiện | Giả thuyết |
|---|---|
| Event < 40 | Việc không có điểm kích hoạt rõ; trễ thường được phát hiện từ bên ngoài |
| Handoff < 40 hoặc Q6 ≤ 1 | Việc di chuyển qua người; nghỉ phép/nghỉ việc làm đứt chuỗi |
| Q9 ≤ 1 | Không truy vết được; rủi ro khi đánh giá/khiếu nại |
| F1 | SOP và thực tế khác nhau; có tri thức ngầm |
| Readiness < 50 và Manual Load ≥ 2 | Ứng viên automation nhưng chưa nên tự động hóa trước khi chuẩn hóa nền |
| ≥ 3 "Không chắc" | Lãnh đạo chưa nhìn thấy vận hành thực; cần đi cùng người làm |

### 7.3. Trình tự khám phá đề xuất sau khi đặt lịch

1. Xác nhận workflow và người tham gia
2. Đi theo một ca thật (Stress Test)
3. Đối chiếu giả thuyết L1
4. Dựng bản đồ ● ○ ⚠ ★
5. Lập Automation Opportunity Map
6. Quyết định bước tiếp theo: tiếp tục workflow khác / ERP Readiness / KM Maturity / AI Readiness / chưa triển khai

Hệ thống cần **dùng chung hồ sơ** (ngành, quy mô, hệ thống hiện có) giữa các assessment để CEO không phải nhập lại.

---

## 8. Điểm cần quyết định và lưu ý trước khi dựng

### 8.1. Số câu hỏi
- Bản web giữ **10 câu** (Q1–Q10) theo chuẩn "không quá 10 câu". Bản 24 câu của tài liệu gốc dùng cho consultant (L2/L3).
- Hệ quả: nhóm Decision chỉ có 1 câu, nên chỉ là "tín hiệu". Nếu muốn đủ 2 câu mỗi nhóm cần cân nhắc 12 câu, lệch chuẩn — cần anh/chị quyết.

### 8.2. Tên cấp độ
- Trong Image Production Standard, "cấp độ/level" đã dành cho **5 cấp số hóa** (Vận hành bằng giấy … AI hỗ trợ vận hành), không đổi tên.
- 5 mức workflow ở đây là **thang khác**. Đề xuất dùng **"Mức"** (Mức 1–5) cho workflow, để tránh nhầm với Digitalization Level. Khi hiển thị trên hình/trang cần có chú thích rõ hai thang không phải một.
- Cách gọi *Person-driven / Document-driven / Workflow-driven / Event-driven / Knowledge-driven* là **cách gọi của OKELAS, không phải thuật ngữ chuẩn ngành**.

### 8.3. Hiệu chỉnh
- Mọi ngưỡng (20/40/60/80, gating 60/75, quadrant 50) và cờ F1–F5 là **thiết kế khởi đầu**.
- Đề xuất: sau các lượt đầu tiên, đối chiếu kết quả L1 với kết quả Stress Test và chỉnh ngưỡng. **Không công bố số liệu "x% doanh nghiệp ở Mức y" cho đến khi có dữ liệu thật và định nghĩa rõ.**

### 8.3b. Những điều không được nói trên trang kết quả
- Không nêu tỷ lệ "bao nhiêu % doanh nghiệp sản xuất ở mức này".
- Không hứa ROI, thời gian tiết kiệm, mức cải thiện.
- Không khẳng định "doanh nghiệp bạn sẽ thất bại nếu…".
- Không nhắc OKELAS như sản phẩm trên trang kết quả, ngoài CTA đặt lịch.

### 8.4. Câu cần chú ý khi viết lại
- **Q4:** tránh để CEO chọn "chưa từng xảy ra" như đáp án an toàn. Đã gộp vào "Không chắc/không nhớ".
- **Q6:** câu gây aha mạnh nhất; không đổi nhẹ giọng.
- **Q9:** giữ nguyên hình dung "một năm sau"; liên hệ ISO/GMP nhưng **không nêu logo/chữ "certified"**; chân trang bắt buộc: *"Phân tích từ góc độ quản trị, không phải tư vấn tuân thủ hay pháp lý."*

### 8.5. Chân trang bắt buộc trên trang kết quả
> *Đây là công cụ thảo luận định hướng, không phải phương pháp luận được chứng nhận. "Person-driven … Knowledge-driven" là cách gọi của OKELAS, không phải thuật ngữ chuẩn ngành. Kết quả là tự đánh giá và cần được kiểm chứng trên quy trình thực tế.*

### 8.6. Bảo mật dữ liệu
- Câu trả lời mô tả vận hành nội bộ. Cần thông báo rõ dữ liệu lưu ở đâu, ai xem, và chỉ gửi cho consultant khi người dùng đồng ý đặt lịch hoặc để lại liên hệ.

### 8.7. Về các assessment sẵn có
- Mình chỉ có mô tả kiến trúc assessment trong Pillar Map (≤10 câu, 3–4 level, output cụ thể, mỗi level có bước tiếp theo), **chưa thấy nội dung câu hỏi của 4 assessment đã dựng**. Thiết kế này bám theo các nguyên tắc đó. Nếu có bản câu hỏi/kết quả hiện có, cần rà lại giọng văn, nhãn mức và bố cục kết quả cho thống nhất.

---

## 9. Gợi ý nội dung đi kèm (chưa viết)

Theo Content Production Standard, assessment cần bài dẫn vào. Gợi ý, chờ duyệt trước khi lập content brief:

| Bài | Loại | Cluster | Ý chính |
|---|---|---|---|
| "Doanh nghiệp bạn không thiếu workflow. Thiếu sự kiện." | Gợi mở | 3/4 | Mở bằng Q6 và Q4; dẫn vào assessment |
| "Một năm sau, doanh nghiệp bạn có giải thích được quyết định này không?" | Gợi mở | 3 | Trace test; nối ISO/GMP, audit preparation (3.9) |
| "Vì sao tự động hóa trước khi chuẩn hóa sự kiện chỉ tự động hóa sự hỗn loạn" | Phân tích | 2/4 | Ma trận Cơ hội × Sẵn sàng; nối AI Readiness |
| "Handoff: nơi công việc rơi mất" | Phân tích | 1/3 | Phụ thuộc cá nhân; liên kết 1.2, 3.2 |

Các bài này dẫn vào Workflow Readiness Assessment, đi ra tới Stress Test và các assessment khác.

---

## 10. Phụ lục — Bảng tên thuật ngữ VI / EN (để chuẩn bị bản EN)

| VI | EN |
|---|---|
| Đánh giá mức sẵn sàng workflow | Workflow Readiness Assessment |
| Sự rõ ràng của quy trình | Process Clarity |
| Trigger & Sự kiện | Trigger & Event |
| Chuyển giao | Handoff |
| Quyết định & Phê duyệt | Decision & Approval |
| Evidence & Tri thức | Evidence & Knowledge |
| Sẵn sàng tự động hóa | Automation Readiness |
| Tải việc thủ công | Manual Load |
| Mức 1 — Dựa vào con người | Level 1 — Person-driven |
| Mức 2 — Dựa vào tài liệu | Level 2 — Document-driven |
| Mức 3 — Dựa vào workflow | Level 3 — Workflow-driven |
| Mức 4 — Dựa vào sự kiện | Level 4 — Event-driven |
| Mức 5 — Dựa vào tri thức | Level 5 — Knowledge-driven |
| Workflow Stress Test | Workflow Stress Test |
| Bản đồ cơ hội tự động hóa | Automation Opportunity Map |

*Bản EN không dịch từng chữ: câu hỏi cần viết lại theo cách người đọc quốc tế mô tả vận hành (ví dụ "sales quotation", "customer complaint", "CAPA"), đơn vị và ngữ cảnh ISO/GMP có thể khác. Sẽ làm sau khi bản VI được duyệt.*
