/**
 * NGÂN HÀNG CÂU HỎI VÀ VÒNG CHƠI - MÔN TƯ TƯỞNG HỒ CHÍ MINH (HCM202)
 * Ô chữ chuẩn ký tự Latin A-Z (không dấu) phục vụ hiển thị chuẩn và trực quan.
 */

export const ROUNDS_DATA = [
  {
    id: 1,
    topic: "Chủ đề 1: Tư tưởng về Độc lập Dân tộc & Giải phóng Dân tộc",
    displayKeyword: "KHONG CO GI QUY HON DOC LAP TU DO",
    hint: "Chân lý thời đại được Chủ tịch Hồ Chí Minh khẳng định trong Lời kêu gọi đồng bào và chiến sĩ cả nước ngày 17/7/1966.",
    questions: [
      {
        id: 101,
        question: "Bác Hồ ra đi tìm đường cứu nước vào ngày, tháng, năm nào và từ bến cảng nào?",
        answers: [
          "05/06/1911 tại Bến cảng Nhà Rồng (Sài Gòn)",
          "19/05/1911 tại Cảng Hải Phòng",
          "02/09/1945 tại Quảng trường Ba Đình",
          "03/02/1930 tại Cảng Hương Cảng"
        ],
        correct: 0,
        explanation: "Ngày 5/6/1911, người thanh niên yêu nước Nguyễn Tất Thành lấy tên Văn Ba rời bến cảng Nhà Rồng ra đi tìm đường cứu nước."
      },
      {
        id: 102,
        question: "Luận cương nào của V.I.Lênin đã giúp Nguyễn Ái Quốc tìm thấy con đường giải phóng cho dân tộc Việt Nam?",
        answers: [
          "Tuyên ngôn của Đảng Cộng sản",
          "Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và thuộc địa",
          "Nhà nước và Cách mạng",
          "Bút ký triết học"
        ],
        correct: 1,
        explanation: "Tháng 7/1920, đọc Sơ thảo Luận cương của Lênin đăng trên báo L'Humanité, Nguyễn Ái Quốc khẳng định: 'Đây là con đường giải phóng chúng ta'."
      },
      {
        id: 103,
        question: "Tại Đại hội nào của Đảng Xã hội Pháp (tháng 12/1920), Nguyễn Ái Quốc đã bỏ phiếu gia nhập Quốc tế Cộng sản?",
        answers: [
          "Đại hội Tours",
          "Đại hội Paris",
          "Đại hội Marseille",
          "Đại hội Lyon"
        ],
        correct: 0,
        explanation: "Tại Đại hội Tours (12/1920), Người đã bỏ phiếu tán thành Quốc tế III và tham gia sáng lập Đảng Cộng sản Pháp."
      },
      {
        id: 104,
        question: "Tác phẩm nào của Nguyễn Ái Quốc xuất bản năm 1927 tại Quảng Châu, là cẩm nang lý luận chuẩn bị thành lập Đảng?",
        answers: [
          "Bản án chế độ thực dân Pháp",
          "Đường Kách mệnh",
          "Tuyên ngôn Độc lập",
          "Chính cương vắn tắt"
        ],
        correct: 1,
        explanation: "Tác phẩm 'Đường Kách mệnh' (1927) đã đặt nền tảng tư tưởng, lý luận và tổ chức cho sự ra đời của Đảng Cộng sản Việt Nam."
      },
      {
        id: 105,
        question: "Theo Hồ Chí Minh, con đường cứu nước duy nhất đúng đắn của dân tộc Việt Nam là gì?",
        answers: [
          "Con đường cách mạng tư sản kiểu Pháp, Mỹ",
          "Con đường cải lương ôn hòa",
          "Con đường cách mạng vô sản",
          "Con đường phục hồi chế độ phong kiến"
        ],
        correct: 2,
        explanation: "Người khẳng định: 'Muốn cứu nước và giải phóng dân tộc không có con đường nào khác con đường cách mạng vô sản'."
      },
      {
        id: 106,
        question: "Bản Tuyên ngôn Độc lập được Chủ tịch Hồ Chí Minh đọc tại Quảng trường Ba Đình vào ngày nào?",
        answers: [
          "19/08/1945",
          "02/09/1945",
          "23/09/1945",
          "19/12/1946"
        ],
        correct: 1,
        explanation: "Ngày 2/9/1945, bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa được Người đọc trước hàng vạn đồng bào tại Ba Đình."
      },
      {
        id: 107,
        question: "Lực lượng nòng cốt trong khối đại đoàn kết toàn dân tộc theo tư tưởng Hồ Chí Minh là:",
        answers: [
          "Liên minh công nhân - nông dân - trí thức",
          "Tầng lớp trí thức và học sinh sinh viên",
          "Giai cấp tư sản dân tộc và địa chủ yêu nước",
          "Lực lượng vũ trang nhân dân"
        ],
        correct: 0,
        explanation: "Liên minh công - nông - trí thức là nền tảng vững chắc của khối đại đoàn kết dân tộc dưới sự lãnh đạo của Đảng."
      }
    ]
  },
  {
    id: 2,
    topic: "Chủ đề 2: Tư tưởng về Nhà nước của Dân, do Dân, vì Dân",
    displayKeyword: "NHA NUOC CUA DAN DO DAN VI DAN",
    hint: "Bản chất cốt lõi của nhà nước pháp quyền kiểu mới do Chủ tịch Hồ Chí Minh sáng lập.",
    questions: [
      {
        id: 201,
        question: "Theo tư tưởng Hồ Chí Minh, quyền lực tối cao của nhà nước bắt nguồn từ đâu?",
        answers: [
          "Từ sự bảo trợ của các nước đồng minh lớn",
          "Từ nhân dân, nhân dân là chủ và làm chủ",
          "Từ bộ máy hành chính nhà nước",
          "Từ hiến pháp và các bộ luật"
        ],
        correct: 1,
        explanation: "Bác khẳng định: 'Nước ta là nước dân chủ, địa vị cao nhất là dân, vì dân là chủ'."
      },
      {
        id: 202,
        question: "Bản Hiến pháp đầu tiên của nước Việt Nam Dân chủ Cộng hòa được ban hành vào năm nào?",
        answers: [
          "Năm 1945",
          "Năm 1946",
          "Năm 1954",
          "Năm 1959"
        ],
        correct: 1,
        explanation: "Hiến pháp 1946 do Chủ tịch Hồ Chí Minh chỉ đạo soạn thảo là bản Hiến pháp dân chủ đầu tiên ở Đông Nam Á."
      },
      {
        id: 203,
        question: "Chủ tịch Hồ Chí Minh xác định mối quan hệ giữa cán bộ chính quyền và nhân dân là:",
        answers: [
          "Cán bộ là cha mẹ dân",
          "Cán bộ là người cai trị công minh",
          "Cán bộ là công bộc, là người đầy tớ trung thành của nhân dân",
          "Cán bộ đứng độc lập, không phụ thuộc vào ý muốn của dân"
        ],
        correct: 2,
        explanation: "Bác viết: 'Cán bộ từ trên xuống dưới đều là đầy tớ của dân, chứ không phải là quan nhân dân để đè đầu cưỡi cổ dân'."
      },
      {
        id: 204,
        question: "Chủ tịch Hồ Chí Minh gọi ba thứ tệ nạn nào là 'giặc nội xâm' nguy hiểm?",
        answers: [
          "Tham ô, lãng phí, quan liêu",
          "Thiếu quyết đoán, lười biếng, sợ việc",
          "Tự ti, kiêu ngạo, xu nịnh",
          "Nghiện ngập, cờ bạc, mê tín dị đoan"
        ],
        correct: 0,
        explanation: "Bác nhấn mạnh: 'Tham ô, lãng phí và bệnh quan liêu là kẻ thù của nhân dân, là thứ giặc ở trong lòng, nguy hiểm hơn giặc ngoại xâm'."
      },
      {
        id: 205,
        question: "Cuộc Tổng tuyển cử đầu tiên bầu Quốc hội nước Việt Nam Dân chủ Cộng hòa diễn ra vào ngày nào?",
        answers: [
          "06/01/1946",
          "19/08/1945",
          "02/09/1946",
          "19/12/1946"
        ],
        correct: 0,
        explanation: "Ngày 6/1/1946, cuộc Tổng tuyển cử phổ thông đầu phiếu đầu tiên được tổ chức thắng lợi trên phạm vi cả nước."
      }
    ]
  },
  {
    id: 3,
    topic: "Chủ đề 3: Đạo đức Cách mạng & Xây dựng Con người Mới",
    displayKeyword: "CAN KIEM LIEM CHINH CHI CONG VO TU",
    hint: "Bốn đức tính đạo đức cách mạng nền tảng của người cán bộ theo lời dạy của Bác.",
    questions: [
      {
        id: 301,
        question: "Bác Hồ so sánh người cách mạng không có đạo đức cách mạng cũng như:",
        answers: [
          "Cây không có gốc, sông không có nguồn",
          "Thuyền không có lái",
          "Đèn không có dầu",
          "Cả 3 phương án trên đều là hình tượng Bác từng ví von"
        ],
        correct: 3,
        explanation: "Bác ví: 'Cũng như sông thì có nguồn mới có nước... Người cách mạng phải có đạo đức, không có đạo đức thì tài giỏi mấy cũng không lãnh đạo được nhân dân'."
      },
      {
        id: 302,
        question: "Theo Hồ Chí Minh, chữ 'LIÊM' trong 'Cần, Kiệm, Liêm, Chính' có ý nghĩa là gì?",
        answers: [
          "Luôn trong sạch, không tham lam danh vị, tiền tài của cải",
          "Chỉ lo tiết kiệm tiền bạc cho bản thân",
          "Làm việc suốt ngày đêm không nghỉ",
          "Luôn giữ thái độ im lặng trước cấp trên"
        ],
        correct: 0,
        explanation: "Liêm là trong sạch, không tham địa vị, không tham tiền của, liêm khiết đối với của công."
      },
      {
        id: 303,
        question: "Theo Bác Hồ, phương pháp rèn luyện đạo đức nào được coi như 'rửa mặt mỗi ngày'?",
        answers: [
          "Tự phê bình và phê bình",
          "Thi đua khen thưởng",
          "Kỷ luật nghiêm khắc",
          "Học thuộc tài liệu"
        ],
        correct: 0,
        explanation: "Bác dạy: 'Tự phê bình và phê bình phải như rửa mặt hằng ngày, có như thế mặt mới sạch, người mới tiến bộ'."
      },
      {
        id: 304,
        question: "Câu nói: 'Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải...':",
        answers: [
          "Trồng người",
          "Xây nhà",
          "Giữ đất",
          "Lập nghiệp"
        ],
        correct: 0,
        explanation: "'Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người' - lời dạy bất hủ của Bác về giáo dục."
      }
    ]
  },
  {
    id: 4,
    topic: "Chủ đề 4: Tư tưởng về Đại đoàn kết Toàn dân tộc",
    displayKeyword: "DOAN KET DOAN KET DAI DOAN KET",
    hint: "Lời kết luận đúc kết chân lý chiến thắng của Chủ tịch Hồ Chí Minh: '...Thành công, thành công, đại thành công'.",
    questions: [
      {
        id: 401,
        question: "Hoàn thiện câu khẩu hiệu của Bác: 'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công,...':",
        answers: [
          "Đại thành công",
          "Toàn thắng lợi",
          "Mãi vinh quang",
          "Vững tương lai"
        ],
        correct: 0,
        explanation: "Khẩu hiệu đúc kết chân lý lịch sử của Bác Hồ: 'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công'."
      },
      {
        id: 402,
        question: "Hình thức tổ chức thực tiễn của khối đại đoàn kết dân tộc theo tư tưởng Hồ Chí Minh là:",
        answers: [
          "Mặt trận Dân tộc Thống nhất",
          "Các hội nhóm nghề nghiệp tự phát",
          "Tổ chức công đoàn của riêng công nhân",
          "Các câu lạc bộ thanh niên"
        ],
        correct: 0,
        explanation: "Mặt trận Dân tộc Thống nhất (Việt Minh, Mặt trận Tổ quốc) là nơi quy tụ, tập hợp toàn dân tộc dưới sự lãnh đạo của Đảng."
      }
    ]
  }
];
