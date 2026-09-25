# ERP Article Translation Pairs

## Overview
All ERP articles (13 pairs) have been configured with `translationId` for bilingual navigation. Users can switch between English and Vietnamese versions using the language switcher button.

## Complete Translation Mapping

| Translation ID | English Article | Vietnamese Article |
|---|---|---|
| `accounting-readiness-erp` | Accounting Readiness for ERP | Kế Toán Sẵn Sàng Cho ERP |
| `erp-customization-risks` | ERP Customization: When Flexibility Becomes Long-Term Risk | Customization ERP: Khi Nào Linh Hoạt Trở Thành Rủi Ro |
| `erp-data-readiness` | ERP Data Readiness: Why 'Clean Data' Is Harder Than You Think | Data Readiness Trước ERP — Tại Sao Dữ Liệu 'Sạch' Khó Hơn |
| `erp-data-utilization-reporting` | How to Use ERP Data: From Reporting to Decision-Making | Khai Thác Dữ Liệu ERP — Từ Báo Cáo Đến Ra Quyết Định |
| `erp-excel-parallel-systems` | ERP and Excel: Why Spreadsheets Survive After Go-Live | Có ERP Vẫn Dùng Excel — Tại Sao Spreadsheet Sống Sót |
| `erp-governance-ownership` | ERP Governance: Who Is Responsible When Your ERP Stops Working? | ERP Governance: Ai Chịu Trách Nhiệm Khi ERP Không Hoạt Động |
| `erp-implementation-vs-adoption-gap` | ERP Implementation vs. Adoption: The Gap That Determines Success | Khoảng Cách Triển Khai và Áp Dụng ERP — Yếu Tố Quyết Định |
| `erp-manufacturing-readiness` | ERP for Manufacturing: Why Off-the-Shelf Software Often Fails | ERP cho Doanh Nghiệp Sản Xuất — Tại Sao Phần Mềm Chuẩn Thất Bại |
| `erp-opening-readiness-assessment` | Is Your Business Actually Ready for ERP? | Doanh nghiệp bạn đã thực sự sẵn sàng triển khai ERP chưa? |
| `erp-pillar-why-fail` | Why ERP Projects Fail — and What the Software Cannot Fix | Tại sao dự án ERP không đạt mục tiêu — và vấn đề không phải là phần mềm |
| `erp-scope-creep` | ERP Scope Creep: How Extra Requirements Destroy Timeline and Budget | Scope Creep Trong Dự Án ERP — Khi Dự Án Cứ Lớn Dần |
| `erp-user-adoption` | ERP User Adoption: Why People — Not Software — Determine Success | ERP và Con Người — Tại Sao User Adoption Quyết Định Thành Bại |
| `process-standardization-erp` | Process Standardization Before ERP: The Step Most Companies Skip | Quy trình chưa chuẩn hóa — rủi ro lớn nhất trước khi triển khai ERP |

## How It Works

1. Each article pair shares the same `translationId` in frontmatter:
   ```yaml
   translationId: erp-pillar-why-fail
   lang: en
   ```

2. LanguageSwitcher component detects `translationId` and `lang`

3. When user clicks language button:
   - On `/en/insights/erp/why-erp-projects-fail` (EN) → links to `/insights/erp/tai-sao-du-an-erp-that-bai` (VI)
   - On `/insights/erp/tai-sao-du-an-erp-that-bai` (VI) → links to `/en/insights/erp/why-erp-projects-fail` (EN)

## Verification

All 13 pairs are:
- ✅ Correctly matched with unique `translationId`
- ✅ Configured in frontmatter with `lang: en` or `lang: vi`
- ✅ Accessible at their respective routes
- ✅ Connected via LanguageSwitcher component

## File Locations

**English articles:** `src/content/insights/{slug}.md` with `lang: en`
**Vietnamese articles:** `src/content/insights/{slug}.md` with `lang: vi`

Both use the same `translationId` to enable cross-language navigation.
