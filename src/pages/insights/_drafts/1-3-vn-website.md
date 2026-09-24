---
draft: true
---

## 1.3 | Data readiness: tại sao dữ liệu "sạch" khó hơn doanh nghiệp nghĩ

### SEO — Tiếng Việt

| Trường | Nội dung |
|---|---|
| Primary keyword | data readiness triển khai ERP |
| Secondary keywords | dữ liệu sạch ERP, data migration ERP, chuẩn bị dữ liệu ERP, làm sạch dữ liệu trước ERP |
| URL slug | `/data-readiness-trien-khai-erp` |
| SEO title | Data Readiness trước ERP — tại sao dữ liệu "sạch" khó hơn bạn nghĩ |
| Meta description | Data migration là một trong những phần tốn kém và rủi ro nhất của dự án ERP. Bài viết phân tích tại sao dữ liệu doanh nghiệp hiếm khi sẵn sàng — và cần làm gì trước. |
| H1 | Data readiness: tại sao dữ liệu "sạch" khó hơn doanh nghiệp nghĩ |

---

# Data readiness: tại sao dữ liệu "sạch" khó hơn doanh nghiệp nghĩ

> **Tóm tắt cho CEO / CFO / IT Manager**
>
> - Data migration không phải bài toán kỹ thuật thuần túy — nó là bài toán kinh doanh.
> - Dữ liệu kém chất lượng không biến mất khi đưa vào ERP; nó trở thành nền tảng của mọi báo cáo và quyết định trong hệ thống.
> - Có bốn loại dữ liệu mà ERP cần, và mỗi loại có thách thức riêng.
> - Chi phí làm sạch dữ liệu sau go-live cao hơn nhiều so với làm sạch trước — nhưng đây là bước mà phần lớn dự án không chuẩn bị đủ thời gian và nguồn lực.

---

## Data migration là gì — và tại sao nó quan trọng đến vậy?

Trong một dự án ERP, data migration là quá trình chuyển dữ liệu từ các hệ thống cũ — Excel, phần mềm kế toán riêng lẻ, sổ tay, cơ sở dữ liệu nội bộ — vào ERP mới.

Nghe có vẻ đơn giản: xuất dữ liệu ra, làm sạch, nhập vào hệ thống mới.

Trên thực tế, data migration được coi rộng rãi là một trong những công việc rủi ro cao nhất của triển khai ERP, và thường bị đánh giá thấp nhất về thời gian và nguồn lực cần thiết. Nhiều dự án bị kéo dài hoặc vượt ngân sách không phải vì vấn đề kỹ thuật với phần mềm, mà vì dữ liệu của doanh nghiệp phức tạp và kém chất lượng hơn dự kiến.

Điều quan trọng hơn: dữ liệu không sạch không tự biến mất khi bạn chuyển vào ERP. Nó trở thành nền tảng của mọi báo cáo, mọi cảnh báo tồn kho, mọi đơn mua hàng được tạo ra từ hệ thống. Một con số sai trong master data có thể tạo ra sai sót dây chuyền trong vận hành nhiều tháng sau go-live.

---

## ERP cần loại dữ liệu nào?

Để hiểu tại sao data readiness khó, cần biết ERP thực sự yêu cầu gì.

Có hai nhóm dữ liệu chính:

### Master data — dữ liệu nền tảng

Đây là dữ liệu mô tả các thực thể trong doanh nghiệp — những thứ không thay đổi thường xuyên nhưng được dùng trong mọi giao dịch:

- **Danh mục sản phẩm / SKU:** mã, tên, đơn vị tính, nhóm hàng, thuộc tính kỹ thuật, giá, BOM (nếu là sản xuất).
- **Nhà cung cấp:** tên, mã số thuế, điều khoản thanh toán, tài khoản ngân hàng, thông tin liên hệ.
- **Khách hàng:** tên, mã số thuế, điều khoản thanh toán, địa chỉ giao hàng, hạn mức tín dụng.
- **Danh mục tài khoản kế toán (Chart of Accounts):** cấu trúc tài khoản, phương pháp phân bổ chi phí.
- **Cơ cấu tổ chức:** chi nhánh, kho, trung tâm chi phí, bộ phận.

Master data phải chính xác trước khi hệ thống go-live. Nếu không, mọi giao dịch sau đó đều bị ảnh hưởng.

### Transactional data — dữ liệu giao dịch lịch sử

Đây là dữ liệu về những gì đã xảy ra — đơn hàng, hóa đơn, tồn kho, số dư kế toán. Không phải tất cả transactional data đều cần được migrate; nhiều dự án chọn cutover date và chỉ mang số dư sang, không mang toàn bộ lịch sử giao dịch.

Quyết định migrate bao nhiêu transactional data là một quyết định kinh doanh, không phải kỹ thuật, và nó ảnh hưởng đáng kể đến khối lượng công việc của giai đoạn chuẩn bị.

---

## Vì sao dữ liệu hiện tại thường không đủ chuẩn

Dưới đây là những vấn đề phổ biến nhất mà các dự án ERP gặp phải khi kiểm tra dữ liệu hiện tại:

### Trùng lặp và không nhất quán

Cùng một nhà cung cấp nhưng có hai hoặc ba bản ghi khác nhau trong hệ thống — được tạo ra bởi các nhân viên khác nhau vào các thời điểm khác nhau. Cùng một sản phẩm nhưng được gọi bằng nhiều tên khác nhau ở các bộ phận khác nhau.

Đây không phải vấn đề hiếm gặp. Ở nhiều doanh nghiệp SME, danh mục nhà cung cấp có thể có tỷ lệ bản ghi trùng lặp hoặc lỗi thời ở mức đáng kể — phần lớn hình thành tự nhiên khi không có quy trình quản lý master data rõ ràng.

### Dữ liệu không đầy đủ

Bản ghi tồn tại nhưng thiếu các trường bắt buộc trong ERP. Ví dụ: sản phẩm có tên và giá nhưng không có đơn vị tính chuẩn hóa. Nhà cung cấp có tên nhưng không có mã số thuế hoặc điều khoản thanh toán. Khách hàng có thông tin liên hệ nhưng không có địa chỉ giao hàng được phân loại rõ ràng.

Những trường này trông như chi tiết nhỏ — cho đến khi ERP từ chối tạo giao dịch vì thiếu dữ liệu bắt buộc.

### Dữ liệu nằm ở nhiều nơi và không đồng nhất

Danh mục sản phẩm của bộ phận kinh doanh khác với danh mục của bộ phận kho. Số liệu tồn kho trên sổ sách kế toán khác với số liệu của phần mềm quản lý kho. Thông tin khách hàng vừa nằm trong CRM, vừa nằm trong file Excel của từng nhân viên kinh doanh, vừa nằm trong phần mềm kế toán.

Câu hỏi đơn giản nhưng thường không có câu trả lời ngay: *Phiên bản nào là đúng?*

### Định nghĩa không nhất quán

Đây là vấn đề tinh tế hơn. Ví dụ: "tồn kho" trong bộ phận kho có thể bao gồm hàng đang trên đường về, trong khi "tồn kho" trong kế toán chỉ tính hàng đã vào kho thực tế. "Khách hàng" trong hệ thống kinh doanh có thể bao gồm cả khách hàng tiềm năng, trong khi ERP chỉ muốn khách hàng đã có giao dịch.

Khi những định nghĩa này không được làm rõ trước khi migration, dữ liệu được chuyển vào ERP theo cách không ai thực sự hiểu rõ — và vấn đề chỉ được phát hiện khi báo cáo bắt đầu cho ra con số không ai tin.

### Tồn kho sổ sách không khớp thực tế

Đây là vấn đề đặc biệt nghiêm trọng với doanh nghiệp sản xuất. Nếu số tồn kho trên sổ sách không khớp với số tồn kho thực tế trên sàn nhà xưởng, đưa số liệu đó vào ERP là đưa sai lệch vào nền tảng của hệ thống vận hành.

Không ít doanh nghiệp phát hiện sai lệch tồn kho lớn lần đầu tiên trong quá trình chuẩn bị data migration cho ERP — sau nhiều năm vận hành mà không ai kiểm đếm đối chiếu đầy đủ.

---

## Chi phí ẩn của data migration kém chuẩn bị

Vấn đề data migration thường không xuất hiện như một rủi ro rõ ràng trong kế hoạch dự án. Nó ẩn dưới dạng các chi phí và hậu quả khác:

**Kéo dài timeline.** Làm sạch dữ liệu mất nhiều thời gian hơn dự kiến là nguyên nhân phổ biến khiến go-live bị lùi so với kế hoạch. Mỗi tuần kéo dài là chi phí nhân sự, chi phí triển khai, và chi phí cơ hội.

**Quyết định kinh doanh dựa trên dữ liệu sai.** Sau go-live, nếu báo cáo tồn kho, công nợ hay chi phí không chính xác, ban lãnh đạo hoặc không dùng báo cáo ERP để ra quyết định — quay về cách làm cũ — hoặc ra quyết định dựa trên dữ liệu sai.

**Chi phí sửa chữa sau go-live cao hơn nhiều so với làm đúng từ đầu.** Sửa master data sau khi hệ thống đã chạy phức tạp hơn nhiều so với làm sạch trước migration, vì mỗi bản ghi lỗi có thể đã được dùng trong nhiều giao dịch thực tế.

**Mất niềm tin vào hệ thống.** Khi người dùng phát hiện báo cáo ERP không đáng tin cậy, họ dừng dùng hệ thống như công cụ ra quyết định. Đây là một trong những hậu quả khó phục hồi nhất sau go-live.

---

## Checklist data readiness — trước khi bắt đầu ERP

Đây là các câu hỏi để tự đánh giá mức độ sẵn sàng của dữ liệu:

**Danh mục sản phẩm / SKU:**
- Danh mục có được duy trì tập trung không, hay nằm rải rác ở nhiều nơi?
- Có bao nhiêu mã sản phẩm đã không còn được dùng nhưng vẫn tồn tại trong hệ thống?
- Mỗi sản phẩm có đủ thông tin: đơn vị tính, nhóm hàng, giá, và BOM (nếu có sản xuất)?

**Nhà cung cấp và khách hàng:**
- Có bản ghi trùng lặp không?
- Thông tin bắt buộc (mã số thuế, điều khoản thanh toán) có đầy đủ không?
- Ai chịu trách nhiệm duy trì và cập nhật những danh mục này?

**Tồn kho:**
- Số tồn kho trên sổ sách có được đối chiếu với thực tế định kỳ không?
- Sai lệch hiện tại ở mức nào?
- Khi nào lần cuối kiểm kê toàn bộ được thực hiện?

**Kế toán:**
- Chart of accounts có được thiết kế phù hợp với yêu cầu báo cáo của doanh nghiệp chưa?
- Số dư đầu kỳ đã sẵn sàng để migrate chưa?

**Quy trình quản lý dữ liệu:**
- Có quy trình rõ ràng để thêm, chỉnh sửa và vô hiệu hóa bản ghi master data không?
- Có một người hoặc một bộ phận chịu trách nhiệm chất lượng dữ liệu không?

Nếu nhiều câu trả lời là "không" hoặc "không chắc", đây là chỉ báo cần phân bổ thêm thời gian và nguồn lực cho giai đoạn chuẩn bị data — trước khi bắt đầu dự án ERP.

**Bước tiếp theo trong chuỗi: [Scope creep trong ERP — khi dự án ngày càng lớn hơn dự kiến]**

**→ [Làm ERP Readiness Assessment để đánh giá đầy đủ data readiness cùng các chiều sẵn sàng khác]**

---

*Bài viết này là một phần của chuỗi chuyên đề về ERP readiness cho doanh nghiệp sản xuất SME.*

**Bài liên quan:**
- [Tại sao dự án ERP không đạt mục tiêu — pillar]
- [Quy trình chưa chuẩn hóa — rủi ro lớn nhất trước khi triển khai ERP]
- [Scope creep trong ERP — khi dự án ngày càng lớn hơn dự kiến]
