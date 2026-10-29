# Bộ hình bài RAG / chatbot không trả lời được câu hỏi vận hành (Cluster 2, bài 2.3)

Prefix: `rag` · Bài VI: `/insights/ai/rag-la-gi-han-che-ai` · Bài EN: `/en/insights/ai/rag-limitations-enterprise-ai`

Thư mục ảnh:
- VI: `/images/insights/rag-la-gi-han-che-ai/`
- EN: `/images/insights/rag-limitations-enterprise-ai/`

## Frontmatter

VI
```yaml
cover_image: /images/insights/rag-la-gi-han-che-ai/rag-00-og-cover-vi.png
og_image: /images/insights/rag-la-gi-han-che-ai/rag-00-og-cover-vi.png
cover_alt: "Bên trái là ba tài liệu chatbot đọc được; bên phải là ba hệ thống dữ liệu vận hành (ERP, QMS, Excel) nằm ngoài kho tài liệu, ngăn cách bằng vạch đứt."
```
EN
```yaml
cover_image: /images/insights/rag-limitations-enterprise-ai/rag-00-og-cover-en.png
og_image: /images/insights/rag-limitations-enterprise-ai/rag-00-og-cover-en.png
cover_alt: "On the left, three documents a chatbot can read; on the right, three operational data systems (ERP, QMS, Excel) outside the document repository, separated by a dashed line."
```

## Vị trí đặt

| # | File ({lang} = vi/en) | Đặt ở mục (VI / EN) |
|---|---|---|
| 1 | rag-01-three-steps-{lang}.svg | "RAG hoạt động như thế nào — giải thích không kỹ thuật" / "How RAG works — a non-technical explanation" |
| 2 | rag-02-four-question-types-{lang}.svg | "Những gì RAG không làm được — và tại sao" (sau 4 H3) / "Where RAG breaks down — and why" |
| 3 | rag-03-snapshot-timeline-{lang}.svg | "Câu hỏi về trạng thái hiện tại" / "Questions about current state" |
| 4 | rag-04-five-layers-{lang}.svg | "Câu hỏi vận hành cần gì hơn RAG" / "What operational AI actually requires" |

## Alt VI
1. Ba bước của RAG: lập chỉ mục tài liệu, truy xuất đoạn liên quan, tổng hợp câu trả lời; mọi bước chỉ làm việc với kho tài liệu đã nạp.
2. Bốn loại câu hỏi RAG không trả lời được: dữ liệu vận hành cụ thể, trạng thái hiện tại, lịch sử quyết định và bằng chứng, truy xuất nguồn gốc.
3. Dòng thời gian: tài liệu được lập chỉ mục ở phiên bản cũ, sau đó được sửa đổi; chatbot vẫn trả lời theo bản cũ trong khi thực tế đã khác.
4. Sáu tầng xếp chồng: tầng nền là kho tài liệu RAG đã có; năm tầng trên là phần cần bổ sung gồm dữ liệu vận hành, phiên bản và trạng thái, tri thức gắn bối cảnh, workflow và evidence, governance.

## Alt EN
1. The three RAG steps: index documents, retrieve relevant chunks, generate an answer; every step works only with the loaded document repository.
2. Four question types RAG cannot answer: specific operational data, current state, decision history and evidence, traceability.
3. Timeline: a document is indexed at version 1, then revised; the chatbot keeps answering from the old version while operations have moved on.
4. Six stacked layers: the base is the document repository RAG already has; the five layers above are what must be added: operational data, version and state, knowledge tied to context, workflow and evidence, governance.

## Lưu ý
- Không có số liệu nào trên hình. Các mã như B2024-08, "kho lạnh số 2", "30 ngày", NCR xuất hiện trong bài dưới dạng câu hỏi minh họa; hình 2 chỉ dùng hai câu hỏi có tính minh họa, không đưa con số thống kê.
- Hình 2 gắn nhãn "Câu hỏi minh họa lấy từ bài viết (tình huống tổng hợp)". Hình 4 có chân trang công cụ thảo luận định hướng, không phải phương pháp luận được chứng nhận.
- Hình 4 xếp "Governance" ở trên cùng và "Kho tài liệu" ở nền. Đây là cách biểu diễn của tôi về quan hệ tầng, không phải thứ tự đánh số trong bài.
- SVG chỉ có dark mode và Inter khi nhúng inline hoặc khi trang đã nạp Inter; dùng `<img>` thì dùng PNG (hiện chỉ cover có PNG).
- Trùng ý với hình aip-06 (câu hỏi chẩn đoán) và aiop-04 (năm nền tảng) ở mức khái niệm nhưng bố cục khác; nên tránh đặt cạnh nhau trên cùng trang.

## Chưa sửa trong bài (thuộc bài viết)
1. **Khẳng định không có nguồn:** bài nói RAG "là kiến trúc phổ biến nhất" để xây chatbot doanh nghiệp, không trích nguồn. Theo chuẩn bài phân tích nên bổ sung nguồn.
2. **Chú thích cuối bài:** bản EN nêu hybrid search, agentic RAG, graph-augmented retrieval là các hướng có thể giảm một số giới hạn; bản VI không có nguyên ý này. Nên đồng bộ.
3. **Tiêu đề:** tiêu đề EN "RAG: Why a Chatbot That Knows Your Documents…" và VI "RAG Là Gì — Và Tại Sao Chatbot 'Biết Nhiều' Vẫn Không Đủ" khác nhau về cấu trúc. Tôi giữ nguyên tiêu đề trên hình theo từng bản.
4. **Link bài liên quan:** bản VI trỏ bài tiếp theo `du-lieu-khong-co-context-ai`, bản EN `data-without-context-ai-problem`; cần xác nhận cùng một bài. Bản EN trỏ knowledge graph `knowledge-graph-for-business`, VI `knowledge-graph-doanh-nghiep`, cần xác nhận slug.
5. `og:locale` của trang EN vẫn là `vi` (như các bài trước).
