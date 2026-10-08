# Bộ hình bài AI productivity paradox (Cluster 2, bài 2.1)

Prefix: `aipp` · Bài VI: `/insights/ai/ai-tang-nang-suat-doanh-nghiep` · Bài EN: `/en/insights/ai/ai-productivity-paradox`

Thư mục ảnh:
- VI: `/images/insights/ai-tang-nang-suat-doanh-nghiep/`
- EN: `/images/insights/ai-productivity-paradox/`

## Frontmatter

VI
```yaml
cover_image: /images/insights/ai-tang-nang-suat-doanh-nghiep/aipp-00-og-cover-vi.png
og_image: /images/insights/ai-tang-nang-suat-doanh-nghiep/aipp-00-og-cover-vi.png
cover_alt: "Ba mũi tên nhanh đi tới một khe hẹp; chỉ một đường mảnh đi qua, đại diện cho năng lực xử lý của tổ chức."
```
EN
```yaml
cover_image: /images/insights/ai-productivity-paradox/aipp-00-og-cover-en.png
og_image: /images/insights/ai-productivity-paradox/aipp-00-og-cover-en.png
cover_alt: "Three fast arrows run into a narrow gap; only one thin line passes through, representing the organization’s processing capacity."
```

## Vị trí đặt

| # | File ({lang} = vi/en) | Đặt ở mục (VI / EN) |
|---|---|---|
| 1 | aipp-01-drafting-vs-process-{lang}.svg | Cuối phần "Nghịch lý AI productivity" / "The AI productivity paradox" (hoặc ngay sau ví dụ đề xuất) |
| 2 | aipp-02-time-saved-vs-wait-{lang}.svg | Ngay sau ví dụ 20 phút/2 giờ và 3 ngày phê duyệt, cùng mục |
| 3 | aipp-03-four-bottlenecks-{lang}.svg | "Bottleneck thực sự ở đâu?" / "Where the real bottleneck is" |
| 4 | aipp-04-four-questions-{lang}.svg | "Câu hỏi CEO cần tự đặt ra" / "Questions worth asking" |
| 5 | aipp-05-foundation-for-value-{lang}.svg | "Điều này không có nghĩa AI không có giá trị" / "This isn't an argument against AI" |

## Alt VI
1. Chuỗi năm bước của một đề xuất kinh doanh: nhân viên soạn, trưởng phòng review, giám đốc phê duyệt, chờ khách hàng phản hồi, xử lý hợp đồng; AI chỉ rút ngắn bước soạn, các bước còn lại vẫn phải đi qua.
2. Thanh thời gian giả định cho một đề xuất: soạn thảo giảm từ 2 giờ còn 20 phút, tiết kiệm 100 phút, nhưng 3 ngày chờ phê duyệt chiếm gần hết thanh và không đổi.
3. Bốn điểm nghẽn hạn chế năng lực xử lý của tổ chức: phê duyệt tập trung, năng lực xử lý thông tin, quy trình chưa chuẩn hóa và thiếu organizational context.
4. Bốn câu hỏi để phân biệt giá trị thực với cảm giác năng suất: khối lượng công việc có tăng không, AI tiết kiệm ở bước nào, ai xử lý thêm văn bản, quy trình có thay đổi không.
5. AI cần nền tảng gồm quy trình rõ ràng, dữ liệu có cấu trúc, organizational context và tích hợp vào workflow; khi đó AI có thể hỗ trợ ra quyết định tốt hơn, phát hiện vấn đề sớm hơn và thực thi nhất quán hơn.

## Alt EN
1. A five-step chain for a sales proposal: employee drafts, manager reviews, director approves, client responds, contract processing; AI shortens only the drafting step and the other steps still apply.
2. A hypothetical timeline bar for one proposal: drafting drops from 2 hours to 20 minutes, saving 100 minutes, but the 3-day approval wait fills almost the whole bar and does not change.
3. Four bottlenecks that limit organizational capacity: concentrated approvals, information processing capacity, undefined processes and missing organizational context.
4. Four questions to tell real value from the feeling of productivity: is throughput rising, where is AI saving time, who processes the extra content, has the process changed.
5. AI needs a foundation of clear processes, structured data, organizational context and workflow integration; then it can support better decisions, earlier problem detection and more consistent execution.

## Lưu ý
- Hình 2 là hình duy nhất có số: 2 giờ, 20 phút, 100 phút, 3 ngày. Đây là ví dụ giả định trong bài; hình gắn nhãn "Số liệu minh họa giả định, không phải thống kê" ở phụ đề và chân trang, thanh vẽ đúng tỉ lệ. Các hình khác không có số liệu.
- Hình 4 chân trang: công cụ thảo luận định hướng, không phải phương pháp luận được chứng nhận. Không hình nào dùng chủ đề ISO/GMP nên không có chân trang tuân thủ.
- Bài là loại gợi mở (A), nên chỉ có 5 hình + cover.
- SVG chỉ có dark mode và Inter khi nhúng inline hoặc trang đã nạp Inter; dùng `<img>` thì dùng PNG (hiện chỉ cover có PNG).

## Chưa sửa trong bài (thuộc bài viết, tôi không tự sửa)
1. Link bạn gửi lặp hai lần cùng bản EN; tôi tìm bản VI tương ứng qua trang danh sách AI.
2. **Link nội bộ sai trong bài pillar VI** (`ai-readiness-doanh-nghiep`), mục "Đọc thêm": dòng "AI giúp nhân viên viết nhanh hơn, nhưng doanh nghiệp có xử lý được nhiều hơn không?" đang trỏ tới `/insights/ai/ai-nang-suat-va-tri-thuc-tong-the`, nhưng bài đó là "AI Productivity và Organizational Intelligence". Link đúng của bài này là `/insights/ai/ai-tang-nang-suat-doanh-nghiep`. Bản EN của pillar cũng trỏ tới `/en/insights/ai/ai-productivity-vs-organizational-intelligence`, khác với slug thật `ai-productivity-paradox`; cần xác nhận slug.
3. `og:locale` của trang EN vẫn là `vi`.
4. Số "20 phút / 2 giờ / 100 phút / 3 ngày" trong ví dụ đề xuất không gắn nhãn minh họa trong bài. Phép trừ đúng (120 − 20 = 100), nhưng nên ghi rõ đây là ví dụ giả định.
5. Điểm nghẽn 3: bản diễn giải VI có thể ghi "nhanh hơn, chứ không nhiều hơn", còn EN ghi "faster and in greater numbers". Tôi chỉ có bản diễn giải nên chưa chắc có lệch thật; hình dùng cách nói trung tính "tạo văn bản thiếu rõ ràng nhanh hơn". Bạn kiểm tra lại câu gốc.
6. Bản diễn giải VI gọi điểm nghẽn 1 là "Quy trình phê duyệt", EN gọi là "Approval concentration". Hình dùng "Phê duyệt tập trung / Concentrated approvals" theo nội dung mô tả.
