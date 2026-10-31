# 04 · OKELAS Image Production Standard

Áp dụng khi tạo hình cho bài insights (website). Đọc cùng `01`–`03`. Mục tiêu: hình giải thích cơ chế/framework cho C-level, không phải ảnh trang trí.

## 1. Quy trình bắt buộc

1. **Đọc đủ cả bài VI và EN** (WebFetch có thể chỉ trả bản tóm lược: nếu vậy, nói rõ và dùng bản VI làm gốc).
2. **Đề xuất trước, tạo sau khi duyệt.** Bảng: `# | file | nội dung | đặt ở mục` + cover. 4–6 hình/bài, mỗi hình một thông điệp.
3. **Báo kèm đề xuất**: chỗ VI/EN lệch nhau, số liệu không nguồn, thuật ngữ không nhất quán, lỗi tính toán trong bài. Không tự sửa bài.
4. **Tạo → render PNG → xem từng file VI và EN** → sửa tràn chữ/chồng lấp/chữ mồ côi → mới gửi.
5. **Giao**: SVG từng hình + cover SVG và PNG, kèm frontmatter, alt VI/EN, vị trí đặt, lưu ý.

## 2. Loại hình nên dùng

| Loại | Dùng khi |
|---|---|
| Hai cột so sánh | Cách cũ vs cách đúng; giấy vs PDF; thấy vs ẩn |
| Chuỗi/vòng lặp | Quy trình, vòng cải tiến, các bước tự đánh giá |
| 3–4 thẻ | Rủi ro, bẫy, điều kiện, câu hỏi framework |
| Bậc thang/xếp chồng | Cấp độ, lộ trình mở rộng theo thời gian |
| Cổng quyết định | Điều kiện trước khi mở rộng |
| Thanh khoảng giá trị | Chỉ khi có số liệu minh họa, luôn gắn nhãn |
| Cover 1200×630 | Mỗi bài một ảnh, một ý hình học đơn giản + tiêu đề |

Không dùng ảnh stock, mockup giao diện, logo hãng, người/máy móc giả.

## 3. Quy tắc nội dung (không thương lượng)

- Không bịa số liệu, case, tên khách hàng, ROI, năng lực sản phẩm.
- Số trong tình huống giả định: gắn nhãn trên hình ("Số liệu minh họa giả định, không phải thống kê") ở đầu hình **và** chân trang.
- Số trong bài không nguồn (thời gian, %, "X tuần") **không đưa lên hình**, trừ khi nằm trong phần minh họa đã gắn nhãn.
- Thuật ngữ do OKELAS đặt (Progressive eQMS, Knowledge OS…): chân trang "là cách gọi của OKELAS, không phải thuật ngữ chuẩn ngành".
- Chủ đề ISO/GMP/compliance: chân trang "Phân tích từ góc độ quản trị, không phải tư vấn tuân thủ hay pháp lý"; không logo ISO/FDA, không chữ "certified".
- Framework/công cụ của OKELAS: chân trang "công cụ thảo luận định hướng, không phải phương pháp luận được chứng nhận".
- Dùng "cấp độ / level" cho 5 cấp số hóa (Vận hành bằng giấy; Tài liệu số nhưng rải rác; Workflow qua hệ thống; Tích hợp và dữ liệu phân tích được; AI hỗ trợ vận hành). "Giai đoạn / stage" chỉ cho các bước lộ trình hoặc dự án. Không đổi tên.
- Cuối hình có thể có một câu kết (thanh `need`); không đưa lời kêu gọi bán hàng lên hình.

## 4. Song ngữ

- VI và EN là hai bản chữ riêng, cùng bố cục và cùng ý; EN không dịch từng chữ.
- Đơn vị tiền theo bài (VND ở VI, USD ở EN). Giữ đúng số liệu của từng bài.
- Thư mục ảnh theo từng ngôn ngữ: `~/assets/images/insights/<slug-VI>/` và `~/assets/images/insights/<slug-EN>/` (slug VI và EN thường khác nhau). Ảnh nằm trong `src/assets/` để Astro tối ưu; không đặt trong `public/`.

## 5. Thương hiệu và kỹ thuật

- Font Inter. Màu: primary `rgb(1 97 239)`, secondary `rgb(1 84 207)`, accent tím `rgb(109 40 217)`. Dark: nền `rgb(8 9 10)`, chữ `rgb(229 236 246)`, tiêu đề `rgb(247 248 248)`, tím sáng `rgb(167 139 250)`.
- Xanh = trạng thái tốt/thấy rõ/thực hiện; tím = rủi ro/ẩn/không chắc/bước tiếp theo; xám = trung tính/chưa tới; đen đặc = kết luận.
- SVG viết tay: `viewBox` 1200×H (H 540–780), `role="img"` + `aria-label`, CSS variables (`--p --s --a --bg --tx --mut --line`) và `@media (prefers-color-scheme: dark)`. Không font/ảnh ngoài.
- PNG xuất từ phiên bản light cố định (cairosvg không hỗ trợ `var()`): thay biến bằng giá trị cố định, bỏ khối `@media`.
- Chữ ≥ 12 px ở khổ 1200. Tiêu đề ≤ ~60 ký tự (VI) / ~62 (EN) ở cỡ 32 px, nếu dài hơn thì rút gọn, không thu nhỏ chữ.
- Đường nối đi xuyên chữ/hộp bán trong suốt: đặt hình chữ nhật nền đặc dưới nhãn.
- SVG chỉ có dark mode và Inter khi **inline** hoặc trang đã nạp Inter; dùng `<img>` thì dùng PNG.

## 6. Checklist trước khi gửi (xem từng PNG, cả hai ngôn ngữ)

- [ ] Không chữ tràn mép hình/hộp; không chữ chạm đường viền.
- [ ] Không chữ mồ côi (một từ trơ dòng cuối); ngắt dòng ở ranh giới cụm từ.
- [ ] Thanh cuối không đè chân trang; không còn khoảng trống thừa lớn trong thẻ.
- [ ] Số liệu minh họa đã gắn nhãn; không số liệu không nguồn.
- [ ] Chân trang đúng loại (thuật ngữ OKELAS / quản trị / công cụ định hướng).
- [ ] Thuật ngữ cấp độ/giai đoạn nhất quán; tên cấp độ đúng bộ chuẩn.
- [ ] Cover PNG 1200×630.

## 7. Mẫu giao kèm

Tên file: `<tiền tố cụm>-NN-<slug-hình>-{vi,en}.svg`; cover: `…-og-cover-{vi,en}.png`.

```yaml
coverImage: '~/assets/images/insights/<slug>/<prefix>-00-og-cover-<lang>.png'
ogImage: '~/assets/images/insights/<slug>/<prefix>-00-og-cover-<lang>.png'
coverImageAlt: "<mô tả ý chính, không lặp tiêu đề>"
```
Mỗi hình: alt VI + alt EN, mục đặt trong bài. Alt mô tả điều hình nói, không mô tả màu sắc.

Hình trong thân bài: `![alt](~/assets/images/insights/<slug>/<file>)` kèm caption ngắn; bản tối đặt tên `<file>-dark.<ext>` (cơ chế đổi sáng/tối đang chờ sửa, xem 05 §9).

## 8. Lỗi hay gặp (đã gặp)

Tiêu đề dài tràn mép; chữ trong chip tràn hộp; hộp bán trong suốt làm lộ đường nối; tên class CSS sai làm vùng đen; thanh cuối/ghi chú đè chân trang; hộp thẻ thừa chỗ trống; ngắt dòng giữa cụm ("lao / động"); thay thế hàng loạt làm lệch thuật ngữ; số tính sai trong bài (báo, không lặp lại trên hình).
