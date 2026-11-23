---
title: "Nếu hàng không Mỹ quản trị tri thức tốt hơn, bao nhiêu tỷ USD có thể được tiết kiệm?"
description: "Sự cố NOTAM, Newark và ngày 13/11/2026 cho thấy hệ thống cũ chứa tri thức mà tổ chức không còn nắm. Nợ tri thức là gì, và quản trị tri thức phòng ngừa làm gì?"
publishDate: 2026-11-23T00:30:00Z
image: '~/assets/images/insights/hang-khong-my-no-tri-thuc/tr-11-og-cover-vi.png'
coverImage: '~/assets/images/insights/hang-khong-my-no-tri-thuc/tr-11-og-cover-vi.png'
ogImage: '~/assets/images/insights/hang-khong-my-no-tri-thuc/tr-11-og-cover-vi.png'
coverImageAlt: "Ba lớp từ chuyến bay bị đình trệ xuống hệ thống cũ và tri thức không còn được nắm, câu hỏi là nợ tri thức đã tích tụ bao nhiêu."
translationId: aviation-knowledge-debt
lang: vi
category: trending
contentType: Analysis
funnelStage: [Understanding]
audience: [CEO, COO, CIO]
primaryKeyword: "nợ tri thức"
secondaryKeywords: [knowledge debt, hệ thống legacy, rủi ro gián đoạn vận hành, tri thức nghiệp vụ trong phần mềm, bản đồ phụ thuộc hệ thống, kiểm thử phục hồi, sự cố NOTAM FAA, quản trị tri thức phòng ngừa]
ctaPrimaryText: "Làm Knowledge Management Maturity Assessment"
ctaSubtitle: "Xác định mức độ trưởng thành và điểm cần cải thiện đầu tiên"
assessmentHref: /readiness/knowledge
draft: false
---

Tiêu đề bài này đặt một câu hỏi về số tiền. Câu trả lời trung thực cần nói ngay từ đầu: **không có nguồn công khai nào định lượng được phần chi phí gián đoạn của hàng không Mỹ có thể tránh được nhờ quản trị tri thức tốt hơn.** Ai đưa ra một con số "tiết kiệm được X tỷ USD" là đang đưa ra con số không có căn cứ.

Điều có căn cứ thì khác, và đáng để người điều hành một doanh nghiệp bất kỳ đọc kỹ: trong vài năm gần đây, các hệ thống cũ của ngành hàng không Mỹ nhiều lần ngừng hoạt động, mỗi lần kéo theo hàng nghìn chuyến bay. Phía sau các sự cố đó là một dạng rủi ro mà ít bảng cân đối kế toán nào ghi lại: **tổ chức dựa vào những hệ thống mà chính mình không còn hiểu đầy đủ.**

Cần nói rõ phạm vi. Bài này **không kết luận** rằng các sự cố dưới đây do quản trị tri thức kém. Nguyên nhân gốc của sự cố gần nhất vẫn đang được điều tra. Chúng tôi dùng các sự cố công khai như tình huống để đặt câu hỏi cho các tổ chức khác, kể cả nhà máy và doanh nghiệp sản xuất không liên quan gì đến hàng không.

> **Tóm tắt cho CEO**
> - Chi phí gián đoạn có thể đo được ở một vài sự cố (ví dụ Delta ước tính khoảng 500 triệu USD trong năm ngày năm 2024). Phần chi phí *do thiếu tri thức* thì chưa ai đo, và bài này không bịa ra con số đó.
> - Phần mềm không chỉ chứa code. Nó còn chứa quy tắc nghiệp vụ, kinh nghiệm xử lý ngoại lệ và các mối quan hệ phụ thuộc, vốn thường nằm trong đầu một vài người.
> - **Nợ tri thức** (knowledge debt) là khoảng cách giữa điều hệ thống đang làm và phụ thuộc vào, với điều tổ chức còn giải thích, truy vết và dựng lại được. Đây là khung thảo luận do OKELAS đề xuất.
> - Thay phần mềm cũ bằng phần mềm mới không tự xóa khoản nợ này. Nếu không chuyển giao tri thức nghiệp vụ, không hiểu dependency và không giữ được năng lực vận hành độc lập, doanh nghiệp chỉ chuyển nợ từ hệ thống cũ sang hệ thống mới.
> - Quản trị tri thức phòng ngừa gồm năm việc: lập bản đồ phụ thuộc, giữ tri thức chuyên gia, có phương án dự phòng, kiểm thử phục hồi và để lại bằng chứng sau mỗi thay đổi.

## Những chuyến bay bị đình trệ: ba sự cố, một câu hỏi chung

Dưới đây là những gì đã được ghi nhận công khai. Chúng tôi tách rõ điều đã xác nhận và điều chưa.

![Ba thẻ: sự cố NOTAM ngày 11/01/2023, sự cố Newark ngày 28/04/2025 và lệnh dừng cất cánh toàn quốc ngày 13/11/2026 với nguyên nhân gốc chưa công bố.](~/assets/images/insights/hang-khong-my-no-tri-thuc/tr11-01-three-incidents-vi.svg)

*Hình 1. Ba sự cố công khai và điều đã được ghi nhận về từng sự cố.*

**Ngày 11/01/2023, hệ thống NOTAM của FAA.** NOTAM là hệ thống gửi thông báo an toàn cho phi công và bộ phận điều phối bay. Theo cơ quan kiểm toán GAO, hệ thống này đã hơn 30 năm tuổi, và sự cố làm hủy hơn 1.300 chuyến bay, làm chậm gần 10.000 chuyến khác. Theo đánh giá sơ bộ của FAA, nhân sự của nhà thầu đã vô tình xóa các tệp khi đang xử lý việc đồng bộ giữa cơ sở dữ liệu chính và cơ sở dữ liệu dự phòng. FAA cho biết chưa thấy bằng chứng của một cuộc tấn công mạng.

**Ngày 28/04/2025, Newark.** Kiểm soát viên mất hình ảnh radar và liên lạc vô tuyến với máy bay trong khoảng 60 đến 90 giây. Các bản tin ghi nhận nguyên nhân liên quan đến một sợi cáp đồng cũ trong đường truyền viễn thông, và hơn một nghìn chuyến bay bị hủy sau đó theo CNN.

**Ngày 13/11/2026, lệnh dừng cất cánh trên toàn quốc.** Theo các bản tin, FAA ban hành lệnh dừng cất cánh sau khi mất ổn định ở 17 trong số 22 trung tâm kiểm soát đường dài. Công việc viễn thông đang diễn ra tại một cơ sở ở El Dorado, bang Arkansas, trong khuôn khổ việc chuyển đường truyền từ cáp đồng sang cáp quang. Bộ trưởng Giao thông Sean Duffy nói rằng các thiết bị chuyển mạch và định tuyến cũ đã quá tải dữ liệu. FAA đã tạm dừng lắp đặt một loại router mới trong khi điều tra vì sao một chức năng mạng lẽ ra phải tắt lại hoạt động. **Nguyên nhân gốc chưa được công bố.** Chúng tôi không dùng các giả thuyết chưa xác nhận, chẳng hạn các tin nói về lỗi của một nhà thầu cụ thể.

Ngoài ra, ngày 22/11/2026, một hệ thống của riêng Delta, ALIS (Automated Load Instruction System), dùng để tính khối lượng và cân bằng tải trước khi cất cánh, ngừng hoạt động. Delta cho biết đội ngũ dùng quy trình thủ công để tiếp tục khởi hành, rồi báo đã khôi phục trong cùng ngày. Nguyên nhân chưa được nêu. Đây là sự cố của một hãng bay, không phải của FAA.

Mỗi sự cố có nguyên nhân kỹ thuật khác nhau. Câu hỏi chung thì giống nhau: **khi một hệ thống cũ gặp sự cố hoặc được thay đổi, tổ chức có biết nó đang nối với những gì, có ai còn hiểu nó, và có cách vận hành tạm thời đã được thử hay không?**

Bức tranh rộng hơn cũng đáng chú ý. GAO ghi nhận trong 138 hệ thống kiểm soát không lưu của FAA, 51 hệ thống (37%) được xếp loại không bền vững và 54 hệ thống (39%) có khả năng không bền vững. FAA cho biết các thách thức xuất phát từ việc thiếu linh kiện và việc nghỉ hưu của các kỹ thuật viên có chuyên môn về những hệ thống đó. Phần thứ hai là một vấn đề tri thức, dù GAO không dùng cách gọi này.

### Con số nào nói được, con số nào không

| Con số | Nguồn và kỳ | Điều nó cho biết | Điều nó không cho biết |
| --- | --- | --- | --- |
| 10,9 tỷ USD | IATA, 07/2026, chi phí chậm chuyến do FAA gây ra, 2015 đến 2025, tính theo giá 2025 | Tổng chi phí tích lũy cho hãng bay và hành khách | Không tách phần do thiếu tri thức |
| Khoảng 5% của số trên | Cũng IATA, nhóm nguyên nhân "thiết bị" | Phần do thiết bị và sự cố chiếm tỷ lệ nhỏ, 57% là lưu lượng vượt năng lực, 38% là nhóm "khác" gồm nhân sự | Con số khoảng 0,5 tỷ USD là phép tính làm tròn của chúng tôi, không phải số IATA công bố |
| Khoảng 500 triệu USD | Lời CEO Delta, 07/2024, trong năm ngày sau sự cố CrowdStrike | Chi phí của một sự cố gián đoạn đơn lẻ ở một hãng bay | Không phải mức chuẩn cho hãng khác, và nguyên nhân là lỗi cập nhật phần mềm của bên thứ ba |

Cách đọc trung thực: phần lớn chi phí chậm chuyến theo IATA đến từ lưu lượng vượt năng lực và nhân sự, không phải từ thiết bị hỏng. Sự cố hệ thống là phần nhỏ về tổng chi phí nhưng gây đình trệ tập trung và đột ngột. Còn phần "tránh được nhờ quản trị tri thức" thì không nằm trong bất kỳ bảng nào.

Với doanh nghiệp của bạn, thay vì tìm một con số chuẩn bên ngoài, hãy tính một phép đơn giản từ dữ liệu của chính mình: **chi phí mỗi giờ khi hệ thống trọng yếu ngừng chạy, nhân với số giờ mà việc chẩn đoán và khôi phục mất nhiều hơn mức cần thiết vì không ai nắm đủ thông tin.** Phần sau của phép tính, số giờ thêm, chính là biểu hiện của nợ tri thức.

## Phần mềm không chỉ chứa code: nó chứa cả tri thức

Năm 1985, nhà khoa học máy tính Peter Naur lập luận rằng một chương trình không chỉ là mã nguồn và tài liệu. Cái cốt lõi là "lý thuyết" về chương trình nằm trong đầu những người xây dựng và duy trì nó. Ông viết rằng một chương trình "chết" khi nhóm người nắm lý thuyết đó giải tán, dù nó vẫn chạy. Cái chết ấy chỉ lộ ra khi có yêu cầu sửa đổi mà không ai trả lời được một cách có hiểu biết. (Naur, 1985, diễn đạt lại.)

Áp vào doanh nghiệp, một hệ thống phần mềm đang vận hành, từ ERP, MES, hệ thống kho đến phần mềm thiết kế riêng, thường chứa bốn lớp tri thức mà code không thể hiện đầy đủ:

- **Quy tắc nghiệp vụ.** Vì sao hệ thống tính như vậy, làm tròn như vậy, chặn đơn hàng ở điều kiện này.
- **Kinh nghiệm xử lý ngoại lệ.** Những trường hợp đã từng xảy ra và cách xử lý, thường chỉ nằm trong trí nhớ của người trực.
- **Các mối quan hệ phụ thuộc.** Hệ thống nhận dữ liệu từ đâu, cấp dữ liệu cho ai, chạy trên đường truyền nào, và điều gì xảy ra khi một mắt xích đổi.
- **Cách phục hồi.** Khi hệ thống dừng, ai làm gì trước, theo thứ tự nào, bằng cách thủ công nào.

![Bốn thẻ: quy tắc nghiệp vụ, kinh nghiệm xử lý ngoại lệ, quan hệ phụ thuộc và cách phục hồi, là bốn loại tri thức mà mã nguồn không thể hiện đầy đủ.](~/assets/images/insights/hang-khong-my-no-tri-thuc/tr11-02-four-kinds-of-knowledge-vi.svg)

*Hình 2. Bốn loại tri thức mà mã nguồn không thể hiện đầy đủ.*

*Ví dụ minh họa, không phải một khách hàng cụ thể:* một nhà máy dùng một module tính kế hoạch sản xuất do một nhà cung cấp cũ viết riêng. Người cấu hình nó đã chuyển công tác. Tài liệu chỉ mô tả giao diện. Đến ngày một nguồn dữ liệu đầu vào đổi định dạng, kế hoạch tính sai mà không ai biết quy tắc nào bị ảnh hưởng.

Đây là vùng mà chúng tôi gọi là tầng tri thức vận hành trong [ba lớp tri thức của tổ chức](/insights/knowledge-management/ba-lop-tri-thuc-doanh-nghiep): tri thức nằm trong cách hệ thống thực sự chạy, khó thấy vì nó *đang hoạt động tốt* cho tới khi không còn.

## Knowledge Debt: vì sao doanh nghiệp ngày càng phụ thuộc vào hệ thống mà mình không còn hiểu đầy đủ?

Năm 1992, Ward Cunningham dùng hình ảnh "nợ" để giải thích cho cấp quản lý vì sao đội phát triển phải tái cấu trúc code đã chạy được: đi nhanh nhờ vay mượn thì được, miễn là có trả, nếu không "lãi" sẽ ăn vào tốc độ về sau. Khái niệm nợ kỹ thuật (technical debt) từ đó trở thành ngôn ngữ chung giữa kỹ sư và lãnh đạo.

Chúng tôi đề xuất mượn cách nghĩ đó cho một khoảng trống khác: **nợ tri thức**. Đó là khoảng cách giữa điều hệ thống đang làm và đang phụ thuộc vào, với điều tổ chức còn giải thích được, truy vết được và dựng lại được. *Đây là khung thảo luận do OKELAS đề xuất, không phải phương pháp luận được chứng nhận và cũng không phải một chỉ số kế toán.*

Khoản nợ này tích tụ theo một cơ chế khá quen thuộc:

1. Hệ thống chạy ổn, nên không ai thấy lý do ghi lại vì sao nó chạy như vậy.
2. Người hiểu nó nghỉ việc, chuyển bộ phận hoặc nghỉ hưu. Tài liệu còn lại lỗi thời dần.
3. Hệ thống được vá, nối thêm, chuyển hạ tầng. Mỗi lần thay đổi thêm một phụ thuộc mà không ai ghi.
4. Một sự cố hoặc một thay đổi bình thường chạm vào phụ thuộc đó. Chẩn đoán kéo dài vì phải khám phá lại điều lẽ ra đã biết.

![Chuỗi bốn bước: hệ thống chạy ổn, người hiểu rời đi, hệ thống được vá và chuyển hạ tầng, rồi sự cố chạm vào phụ thuộc chưa ghi, khiến chẩn đoán kéo dài.](~/assets/images/insights/hang-khong-my-no-tri-thuc/tr11-03-debt-buildup-vi.svg)

*Hình 3. Cơ chế tích tụ nợ tri thức (khung thảo luận định tính, không có số liệu).*

"Lãi" của khoản nợ không nằm ở bảng cân đối mà ở giờ chẩn đoán, sự phụ thuộc vào vài cá nhân, và nỗi ngại thay đổi vì không ai chắc điều gì sẽ vỡ. Dữ liệu của GAO về kỹ thuật viên nghỉ hưu và hệ thống thiếu linh kiện là một ví dụ ở quy mô quốc gia của cùng một cơ chế, tuy GAO không đo "nợ tri thức" như thế.

### Thay phần mềm cũ bằng phần mềm mới chưa phải là lời giải

Phản ứng tự nhiên sau mỗi sự cố là thay hệ thống. Thay là cần, nhưng chưa đủ. FAA đã chuyển hệ thống NOTAM sang nền tảng đám mây vào tháng 4/2026 và dự kiến gỡ nốt hệ thống cũ còn lại trong năm đó. Nhưng cũng trong tháng 11/2026, các quan chức mô tả sự cố trên toàn quốc là sự tương tác giữa thiết bị mới được lắp và hạ tầng cũ. Điều tra chưa kết luận, nên chúng tôi không nói thiết bị mới là nguyên nhân. Điều tình huống này gợi ra là một nguyên tắc chung hơn:

**Không phải cứ thay phần mềm cũ bằng phần mềm mới là giải quyết được vấn đề. Nếu không chuyển giao tri thức nghiệp vụ, không hiểu các dependency và không duy trì năng lực vận hành độc lập, doanh nghiệp chỉ chuyển nợ tri thức từ hệ thống cũ sang hệ thống mới.**

![Hai ô nối bằng mũi tên: nợ tri thức nằm trong hệ thống cũ và chuyển sang hệ thống mới nếu không chuyển giao tri thức, hiểu dependency và giữ năng lực vận hành độc lập.](~/assets/images/insights/hang-khong-my-no-tri-thuc/tr11-04-debt-moves-vi.svg)

*Hình 4. Nợ tri thức đi theo tổ chức, không đi theo phần mềm.*

Cụ thể, một dự án thay hệ thống nên trả lời được ba câu hỏi trước khi cắt chuyển:

- Những quy tắc nghiệp vụ và ngoại lệ nào của hệ thống cũ đang vận hành mà chưa được ghi lại, và đã được chuyển sang hệ thống mới chưa?
- Hệ thống cũ đang nối với những gì, kể cả các kết nối không có trong sơ đồ? Hệ thống mới giữ, thay hoặc làm đứt kết nối nào?
- Nếu hệ thống mới dừng vào ngày đầu, đội vận hành có chạy được bằng cách khác không, và cách đó đã được thử chưa?

Đây cũng là lý do [chuẩn hóa quy trình trước khi triển khai ERP](/insights/erp/chuan-hoa-quy-trinh-truoc-erp) quan trọng hơn lựa chọn phần mềm: phần mềm mới chỉ mã hóa những gì tổ chức đã hiểu rõ.

## Preventive KM: quản trị tri thức hệ thống trước khi sự cố xảy ra

Quản trị tri thức phòng ngừa không bắt đầu bằng một kho tài liệu lớn. Nó bắt đầu bằng việc chọn một hệ thống trọng yếu và làm năm việc.

![Năm thẻ: lập bản đồ phụ thuộc, giữ tri thức chuyên gia, phương án dự phòng, kiểm thử phục hồi và để lại bằng chứng sau mỗi thay đổi.](~/assets/images/insights/hang-khong-my-no-tri-thuc/tr11-05-preventive-km-vi.svg)

*Hình 5. Năm việc của quản trị tri thức phòng ngừa.*

**1. Lập bản đồ phụ thuộc.** Với một hệ thống, ghi lại nó nhận gì từ đâu, cấp cho ai, chạy trên hạ tầng và đường truyền nào, ai sở hữu từng mắt xích. Mục tiêu là trả lời trong vài phút câu hỏi "nếu điểm này đổi hoặc hỏng thì cái gì bị ảnh hưởng". Khi bản đồ cần liên kết nhiều đối tượng, cách tiếp cận [knowledge graph cho doanh nghiệp](/insights/knowledge-management/knowledge-graph-doanh-nghiep) giúp truy vết chuỗi tác động.

**2. Duy trì tri thức chuyên gia.** Xác định ai là người duy nhất hiểu một hệ thống và chuyển những gì họ biết thành thứ tổ chức dùng được: ghi lại ngoại lệ, lý do thiết kế, tình huống đã gặp. Xem thêm [khi nhân sự nghỉ việc mang đi tri thức](/insights/knowledge-management/nhan-su-nghi-viec-mang-di-tri-thuc). Người mới nên có chỗ học từ trường hợp thật, không chỉ từ tài liệu thủ tục.

**3. Có phương án dự phòng thật sự.** Delta cho biết họ dùng quy trình thủ công để tiếp tục khởi hành khi ALIS ngừng. Điều đó cho thấy giá trị của một cách vận hành khác khi hệ thống chính dừng. Câu hỏi là phương án dự phòng của bạn có tồn tại ngoài giấy hay không: ai thực hiện, công cụ nào, giới hạn năng suất ra sao.

**4. Kiểm thử phục hồi.** Hướng dẫn lập kế hoạch dự phòng của NIST (SP 800-34) nhấn mạnh việc kiểm thử, huấn luyện và diễn tập kế hoạch, vì chỉ khi thử mới lộ ra những chỗ trống. Một bản kế hoạch khôi phục chưa từng được diễn tập thì mới là giả định.

**5. Để lại bằng chứng sau mỗi thay đổi.** Mỗi lần thay thiết bị, chuyển hạ tầng hoặc cập nhật, ghi lại điều đã đổi, vì sao, ai duyệt và kết quả kiểm tra. Khi sự cố xảy ra, chuỗi này cho phép *giải thích, đối chiếu bằng chứng và truy vết*, thay vì khám phá lại từ đầu.

Với doanh nghiệp sản xuất, OKELAS tiếp cận theo hướng *hệ thống đủ nhỏ để làm được*: bắt đầu từ một quy trình hoặc hệ thống trọng yếu, giữ tri thức và bằng chứng của nó ở dạng mà con người và công cụ AI sau này dùng được, rồi mở rộng. Không cần một hệ thống lớn ngay từ đầu. Đây là phân tích từ góc độ quản trị, không phải tư vấn an ninh, tuân thủ hay pháp lý.

## Doanh nghiệp của bạn có đang đối mặt với rủi ro tương tự?

Sáu câu hỏi tự kiểm cho ban điều hành, với một hệ thống trọng yếu bất kỳ:

1. Nếu hệ thống này ngừng, trong vài phút bạn có liệt kê được những gì phụ thuộc vào nó không?
2. Người hiểu rõ nhất hệ thống là ai, và nếu họ nghỉ vào tháng sau thì điều gì mất theo?
3. Quy tắc nghiệp vụ và ngoại lệ của nó được ghi ở đâu, lần cập nhật gần nhất là khi nào?
4. Có phương án vận hành thay thế chưa, và lần diễn tập gần nhất là khi nào?
5. Lần thay đổi lớn gần nhất để lại bằng chứng gì: ai duyệt, đã kiểm tra gì, kết quả ra sao?
6. Nếu thay hệ thống này, phần tri thức nào sẽ được chuyển và ai chịu trách nhiệm xác nhận việc đó?

Nếu phần lớn câu trả lời là "không chắc" hoặc "phải hỏi một người cụ thể", đó không phải kết luận về năng lực của đội ngũ. Đó là dấu hiệu của nợ tri thức, và nó có thể xử lý được.

Một doanh nghiệp có thể mất hàng triệu USD vì một hệ thống ngừng hoạt động trong vài giờ. Nhưng nguyên nhân sâu xa có thể đã tích tụ trong nhiều năm: tri thức không được ghi nhận, quy trình không được cập nhật, sự phụ thuộc không được nhận diện và năng lực phục hồi không được kiểm chứng.

Đầu tư vào Knowledge Management không chỉ để nhân viên tìm tài liệu nhanh hơn. Đó còn là đầu tư để doanh nghiệp không bị tê liệt khi một con người, một phần mềm hoặc một hệ thống trọng yếu ngừng hoạt động.

<!-- EDITABLE:cta START -->

---

**Hệ thống trọng yếu nhất của bạn đang chứa bao nhiêu tri thức mà tổ chức không còn nắm?**

→ [Làm Knowledge Management Maturity Assessment](/readiness/knowledge) để xác định mức độ trưởng thành và điểm cần cải thiện đầu tiên.

<!-- EDITABLE:cta END -->

<!-- EDITABLE:links START -->

**Đọc thêm:**

- (pillar) [Từ tri thức cá nhân đến tri thức tổ chức: bài toán doanh nghiệp sản xuất không thể né](/insights/knowledge-management/quan-ly-tri-thuc-doanh-nghiep-san-xuat)
- (liên quan) [Ba lớp tri thức của doanh nghiệp](/insights/knowledge-management/ba-lop-tri-thuc-doanh-nghiep)
- (liên quan) [Knowledge graph cho doanh nghiệp](/insights/knowledge-management/knowledge-graph-doanh-nghiep)
- (liên quan) [Nhân sự nghỉ việc mang đi tri thức](/insights/knowledge-management/nhan-su-nghi-viec-mang-di-tri-thuc)
- (liên quan) [Chuẩn hóa quy trình trước khi triển khai ERP](/insights/erp/chuan-hoa-quy-trinh-truoc-erp)

<!-- EDITABLE:links END -->

## Ghi chú nguồn

- FAA, thông cáo về sự cố NOTAM, các bản cập nhật 11/01/2023 và 19/01/2023: tệp cơ sở dữ liệu bị hỏng, nhân sự nhà thầu vô tình xóa tệp khi xử lý đồng bộ, chưa có bằng chứng tấn công mạng.
- GAO, GAO-25-107917 (12/2024): hệ thống NOTAM hơn 30 năm tuổi; hơn 1.300 chuyến hủy và gần 10.000 chuyến chậm ngày 11/01/2023; 51 trên 138 hệ thống (37%) không bền vững, 54 (39%) có khả năng không bền vững; FAA nêu nguyên nhân gồm thiếu linh kiện và kỹ thuật viên có chuyên môn nghỉ hưu.
- IATA, báo cáo về chi phí chậm chuyến do kiểm soát không lưu Mỹ (07/2026): 10,9 tỷ USD tích lũy 2015 đến 2025, giá 2025; cơ cấu nguyên nhân 57% lưu lượng, 38% khác, 5% thiết bị. Phép tính khoảng 0,5 tỷ USD là của OKELAS.
- CNN, 07/05/2025 và 10/05/2025, về sự cố Newark ngày 28/04/2025 (mất liên lạc khoảng 60 đến 90 giây, cáp đồng, hơn một nghìn chuyến hủy).
- Tổng hợp tin tức về lệnh dừng cất cánh ngày 13/11/2026: CNN (14/11 và 17/11/2026), CBS News (16/11/2026), GeekWire và Wikipedia (cập nhật đến 14/11/2026). Thông tin tính đến 23/11/2026; nguyên nhân gốc chưa được công bố.
- Sự cố ALIS của Delta ngày 22/11/2026: CNN (22/11/2026). Chi phí khoảng 500 triệu USD của Delta trong năm ngày sau sự cố CrowdStrike: lời CEO Delta, CNBC và NPR, 31/07/2024.
- Bộ Giao thông Mỹ và FAA, thông cáo về hiện đại hóa NOTAM (2025 đến 2026): chuyển sang nền tảng đám mây tháng 4/2026; hệ thống FNS dự kiến gỡ sau.
- Naur, P. (1985). "Programming as Theory Building", *Microprocessing and Microprogramming* 15: 253-261. Cunningham, W. (1992). "The WyCash Portfolio Management System", OOPSLA. NIST SP 800-34 Rev. 1, *Contingency Planning Guide for Federal Information Systems*.
- "Nợ tri thức", bốn lớp tri thức trong phần mềm, chuỗi bốn bước tích tụ và năm việc của quản trị tri thức phòng ngừa là khung thảo luận do OKELAS đề xuất, không phải phương pháp luận được chứng nhận. Đây là phân tích từ góc độ quản trị, không phải tư vấn tuân thủ hay pháp lý.
