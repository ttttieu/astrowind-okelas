# 05 · OKELAS Article Editing Guard (v3)

Mục đích: Claude Code CLI **không được viết lại/cắt bớt bài đã duyệt**; chỉ được chèn link, ảnh và điền các khối EDITABLE theo khuôn cố định. Hai script kiểm tra trước khi commit. Căn cứ: repo `ttttieu/astrowind-okelas` (schema `src/content.config.ts`) và site okelas.com, đối chiếu 31/10/2026.

## 1. Cấu trúc 2 khối

| Khối | Marker | Quyền của CLI |
|---|---|---|
| BODY (`main`, `tail`) | `<!-- BODY:START id=… -->` … `<!-- BODY:END -->` | Giữ nguyên văn 100%. Chỉ được chèn `[cụm từ](url)` vào cụm từ có sẵn và ảnh `![alt](…)` + caption ngắn. |
| EDITABLE (`cta`, `links`, `notes`) | `<!-- EDITABLE:x START -->` … `<!-- EDITABLE:x END -->` | Điền theo khuôn của template; không đổi cấu trúc. `notes` xóa trước khi publish. |

Frontmatter: CLI chỉ điền field còn trống trong brief; không đổi `title`, `description` đã duyệt trừ khi mode = WRITE.

## 2. Mode

- `MODE: WRITE` (chưa có bài gốc): CLI được viết nội dung theo content brief.
- `MODE: FINALIZE` (mặc định khi có bài gốc): dán nguyên văn vào BODY, thêm link/ảnh, điền EDITABLE + frontmatter.
- `MODE: REVISE`: chỉ sửa đúng đoạn người duyệt chỉ định, ghi lại trong `notes`.

## 3. Bảng field frontmatter (theo schema đang chạy)

| Field | Ai quyết định | Quy tắc |
|---|---|---|
| title | Brief | Không thêm " — OKELAS" (site tự thêm). Layout render H1 từ title ⇒ thân bài **không có `# …`**. |
| description | Brief | ≤ 180 ký tự (cảnh báo > 200). |
| publishDate | Người duyệt | ISO, ví dụ `2026-01-01T00:00:00Z`. |
| category | Brief | `business-operations`, `knowledge-management`, `erp`, `ai`, `compliance`, `workflow`, `trending`. |
| translationId | Brief | Chung cho VI/EN, khác slug của cả hai. |
| lang | Cố định | `vi` / `en`. |
| contentType | Brief | `Opening`, `Analysis`, `Case & Evidence`, `Pillar` (không có "Case"). |
| funnelStage | Brief | Chỉ `Awareness`, `Understanding`, `Consideration`. Mặc định `Understanding`. |
| audience, primaryKeyword, secondaryKeywords | Brief | EN keyword không dịch từ VI. |
| assessmentHref | Brief; mặc định KM | `/readiness/{knowledge,ai,erp,digitalization,workflow}`; bài EN thêm tiền tố `/en`. |
| ctaPrimaryText, ctaSubtitle | Preset KM | Xem §4. Có thể đổi nhẹ theo chủ đề. |
| coverImage, ogImage, coverImageAlt | Người duyệt | camelCase, `~/assets/images/insights/<thư mục>/…`. Xem §9. |
| draft | Người duyệt | `true` khi CLI giao; người duyệt đổi `false`. |
| tags, seo_title, slug | — | Không nằm trong schema, bị Zod bỏ. Không dùng cho bài mới. |

## 4. CTA (hai lớp)

**Lớp 1 – Layout (bắt buộc):** khối "Next step" cuối trang do `InsightArticleLayout.astro` render từ `assessmentHref` + `ctaPrimaryText` + `ctaSubtitle`. CLI không viết lại khối này trong thân bài.

**Lớp 2 – CTA trong bài (tùy chọn, khối EDITABLE:cta):** 2–3 dòng: câu hỏi in đậm kết thúc bằng "?", dòng link assessment (đúng `assessmentHref`), dòng liên hệ chỉ khi `funnelStage` có `Consideration`.

### 4.2 Preset KM

| | ctaPrimaryText | ctaSubtitle |
|---|---|---|
| VI | Làm Knowledge Management Maturity Assessment | Xác định mức độ trưởng thành và điểm cần cải thiện đầu tiên |
| EN | Take the Knowledge Management Maturity Assessment | Identify your maturity level and the first improvement to make |

Bài thuộc cụm khác (AI, ERP, workflow, digitalization) dùng assessment tương ứng, nhưng CTA text phải cùng ngôn ngữ với bài.

## 5. Link nội bộ

- Dạng: VI `/insights/<category>/<tên-file>`; EN `/en/insights/<category>/<tên-file>`.
- Chỉ dùng URL đang chạy (`check_meta.py --repo` đối chiếu với `src/content/insights/*.md`). Không dùng slug trong content brief.
- Nhãn chuẩn: VI `(bài trước) (bài tiếp theo) (bài liên quan) (pillar)`; EN `(previous) (next) (related) (pillar)`. Bài không phải pillar phải có `(pillar)`.

## 6. Ảnh

Trong thân bài: `![alt](~/assets/images/insights/<thư mục>/<file>)` hoặc `/assets/...` nếu file tồn tại trong `public/`. Mỗi ảnh có alt; caption ngắn. Đặt tên theo `04_OKELAS_Image_Production_Standard.md` (xem §9 về chênh lệch).

## 7. Prompt mẫu cho CLI

```
MODE: FINALIZE
Đọc 05_OKELAS_Article_Editing_Guard.md và template tools/_template.vi.md (hoặc .en.md).
Bài gốc đã duyệt: <đường dẫn>. Bài đầu ra: src/content/insights/<file>.md

Quy tắc cứng:
1. Dán NGUYÊN VĂN bài gốc vào các khối BODY. Không viết lại, rút gọn, gộp/tách, đổi thứ tự, sửa số liệu hay thuật ngữ.
2. Chỉ được chèn link [cụm từ](url) vào cụm từ có sẵn và ảnh theo bảng ảnh đã duyệt.
3. Điền frontmatter theo brief; field thiếu để trống và ghi vào EDITABLE:notes.
4. Điền EDITABLE:cta và EDITABLE:links theo đúng khuôn; chỉ dùng URL có thật.
5. Thấy lỗi trong bài gốc: KHÔNG sửa, ghi vào EDITABLE:notes.
6. Xong chạy:
   python tools/check_coverage.py <bài gốc> <bài mới>
   python tools/check_meta.py <bài mới> --repo .
   Phải PASS cả hai; nếu FAIL thì sửa phần mình chèn, không sửa BODY. Dán nguyên văn output cuối cùng.
```

## 8. Script

**check_coverage.py** – bài mới phải *bao phủ* bài gốc (không so bằng nhau). So ở mức từ (casefold, NFC, bỏ markdown/link/ảnh/HTML/comment/URL) bằng `difflib.SequenceMatcher(autojunk=False)`.
- FAIL: thiếu/đổi chữ của bài gốc; mất link gốc; độ bao phủ < 100%.
- WARN: chèn > 25 từ một chỗ; đổi cấp heading.
- Lưu ý: ảnh và link thêm được phép; đây là lý do không dùng so sánh bằng.

**check_meta.py** – kiểm tra frontmatter, CTA, link, ảnh. Dùng `--repo .` để đọc enum/schema và danh sách URL thật từ repo (ưu tiên hơn `known-urls.txt`, vốn chỉ là snapshot). Cờ: `--publish` (không cho phép `draft: true`, `notes` còn sót), `--all` (in cả file sạch).

Mã lỗi chính (FAIL): FM-MISSING, ENUM-*, ASSESS-SLUG/LANG, BODY-H1, CTA-BODY-LINK, LINK-404/LINK-NOCAT/LINK-LANG, BODY-IMG-MISSING, PAIR-MISSING. Còn lại là WARN.

## 9. Phát hiện từ repo (chưa sửa, cần quyết định)

1. **Ảnh cover/OG không hoạt động.** `src/content.config.ts` (schema chạy) không khai báo `coverImage/ogImage/coverImageAlt`; route `[category]/[slug].astro` không truyền; layout chỉ nhận title/description. Site đang dùng og:image mặc định. (182/218 bài có field nhưng bị bỏ.)
2. **og:locale = vi trên trang EN, chưa có hreflang** (`Metadata.astro` lấy `I18N?.language`).
3. **Link nội bộ hỏng:** `LINK-NOCAT` ở 25 file (dạng `/insights/<slug>` thiếu category, hoặc `/en/insights/<slug>`).
4. **CTA không khớp:** 86 bài VI dùng `ctaPrimaryText` tiếng Anh; 26 bài KM lệch preset; 5 bài có câu hỏi CTA không kèm link; 21 bài link assessment trong thân khác `assessmentHref`; `rag-limitations-enterprise-ai.md` là EN nhưng `assessmentHref` không có `/en`.
5. **Decap CMS lệch schema** (`public/decapcms/config.yml`): tùy chọn category, thiếu field, `folder` i18n vs glob không đệ quy.
6. **Chuẩn ảnh 04 vs repo:** 04 dùng snake_case (`cover_image`) và `/images/insights/…`; repo dùng camelCase và `~/assets/images/insights/…`. Cần chọn một và cập nhật 04.
7. Khác: 20 file có BOM (script đã xử lý); field thừa `tags/seo_title/slug` (96 file); Sources bị layout đánh dấu deprecated nhưng 33 bài vẫn dùng; nhiều bài có `publishDate` 2025; danh sách prefix dark-mode trong `Layout.astro` lỗi thời.

Kết quả chạy trên 218 bài đã public: 14 file có FAIL (LINK-NOCAT 25 lỗi/ file, CTA-BODY-LINK 5, ASSESS-LANG 1), 200 chỉ có WARN, 4 sạch.

## 10. Khối chạy terminal (cho người duyệt)

```bash
# 1) Cài công cụ vào repo (chạy một lần)
cd astrowind-okelas
mkdir -p tools
cp /đường/dẫn/out3/check_meta.py /đường/dẫn/out3/check_coverage.py tools/
cp /đường/dẫn/out3/_template.vi.md /đường/dẫn/out3/_template.en.md tools/
cp /đường/dẫn/out3/05_OKELAS_Article_Editing_Guard.md .   # hoặc đặt vào docs project

# 2) Kiểm tra từng bài mới do CLI giao
python3 tools/check_coverage.py bai-goc.md src/content/insights/<file>.md
python3 tools/check_meta.py src/content/insights/<file>.md --repo .

# 3) Trước khi publish (chặn draft/notes còn sót)
python3 tools/check_meta.py src/content/insights/<file>.md --repo . --publish

# 4) Quét toàn bộ bài đã public để xem nợ kỹ thuật
python3 tools/check_meta.py src/content/insights/*.md --repo .

# 5) Build thử
npm run build
```

Mã thoát: 0 = PASS, 1 = FAIL (dùng được trong pre-commit hoặc CI).
