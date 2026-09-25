# 📄 BẢN ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)

## CHIẾC NÓN KỲ DIỆU — GIẢI MÃ TỪ KHÓA
**Minigame Học Tập Môn Tư Tưởng Hồ Chí Minh (HCM202)**

---

| Thông tin dự án | Chi tiết |
|---|---|
| **Môn học** | HCM202 — Tư tưởng Hồ Chí Minh |
| **Lớp** | IB1804 |
| **Nền tảng** | Web Application (React + Tailwind CSS) |
| **Phiên bản tài liệu** | 1.0.0 |
| **Ngày lập** | 25/09/2026 |

---

## 1. Giới thiệu tổng quan (Introduction)

### 1.1 Mục đích
Tài liệu Đặc tả Yêu cầu Phần mềm (Software Requirements Specification - SRS) này quy định chi tiết toàn bộ các yêu cầu chức năng, phi chức năng, kiến trúc công nghệ và quy chuẩn giao diện người dùng cho ứng dụng web minigame tương tác **"Chiếc Nón Kỳ Diệu — Giải Mã Từ Khóa"** phục vụ công tác thuyết trình, thảo luận và ôn tập kiến thức môn học Tư tưởng Hồ Chí Minh (HCM202).

### 1.2 Phạm vi sản phẩm
Ứng dụng được thiết kế tối ưu cho máy chiếu trường học và màn hình tương tác lớp học:
- **Người điều khiển (Host/MC/Giảng viên):** Khởi tạo phòng chơi, điều chỉnh danh sách đội, chọn vòng chơi, giám sát luật chơi.
- **Các đội thi (Sinh viên):** Tham gia theo nhóm, lần lượt quay vòng quay, giải câu đố trắc nghiệm và tìm ra các chữ cái trong từ khóa bí mật.

---

## 2. Kiến trúc & Công nghệ (Tech Stack)

| Thành phần | Công nghệ lựa chọn | Lý do sử dụng |
|---|---|---|
| **Core Framework** | React 19 + Vite | Khởi động nhanh, cập nhật State real-time mượt mà |
| **Styling** | Tailwind CSS v4 | Linh hoạt tối đa, tùy biến design system theo theme cổ điển hiện đại |
| **Vòng quay đồ họa** | HTML5 Canvas 2D API | Vật lý quay trượt mượt mà (60fps), giảm tốc cubic-bezier chân thực |
| **Âm thanh** | Web Audio API (Native Synthesizer) | Không phụ thuộc file mp3 ngoài, phát tức thời không trễ |
| **Hiệu ứng vinh danh** | Canvas Confetti | Pháo hoa ăn mừng đội chiến thắng rực rỡ |

---

## 3. Hệ thống Design System & Visual Identity

### 3.1 Design Read & Philosophy
- **Chủ đề:** *Di Sản & Sân Khấu Hiện Đại (Contemporary Heritage Stage)*
- **Vibe:** Trang trọng, chuẩn mực học thuật nhưng sống động, kịch tính theo mô hình Game Show truyền hình.
- **Tiêu chuẩn tương phản:** WCAG AA (đọc rõ từ cự ly 3–5m trên máy chiếu).

### 3.2 Bảng màu quy chuẩn (Color Palette Tokens)
- **Nền chính (Warm Canvas):** `#F9F6F0` (Trắng ngà dịu mắt)
- **Nền thẻ (Surface):** `#FFFFFF`
- **Sắc đỏ son chủ đạo (Imperial Lacquer Red):** `#8E1C24`
- **Sắc vàng kim điểm xuyết (Aged Gold):** `#C29B38`
- **Màu chữ chính:** `#1C1917` (Đen than ấm)
- **Màu chức năng vòng quay:**
  - Ô Điểm +100: `#2B527E` (Xanh dương thẫm)
  - Ô Điểm +200: `#226543` (Xanh ngọc lục bảo)
  - Ô Điểm +500: `#8A5416` (Nâu hổ phách)
  - Ô Điểm +1000: `#C29B38` (Vàng kim)
  - Ô Mất lượt: `#1C1917` (Đen than)
  - Ô Chia đôi điểm: `#B8541D` (Cam gạch)
  - Ô Nhân đôi điểm: `#8E1C24` (Đỏ thẫm)
  - Ô Swap đổi điểm: `#1E6864` (Xanh ngọc)

---

## 4. Đặc tả Yêu cầu Chức năng (Functional Requirements)

### 4.1 Quản lý Vòng quay 21 Nan Quạt (FR-01)
- Vòng quay chia làm đúng 21 ô theo thể lệ:
  - 05 ô `+100 điểm` (Xác suất 23.8%)
  - 03 ô `+200 điểm` (Xác suất 14.3%)
  - 03 ô `+500 điểm` (Xác suất 14.3%)
  - 02 ô `+1000 điểm` (Xác suất 9.5%)
  - 02 ô `Mất lượt` (Xác suất 9.5%)
  - 02 ô `Chia đôi điểm` (Xác suất 9.5%)
  - 02 ô `Nhân đôi điểm` (Xác suất 9.5%)
  - 02 ô `Swap điểm` (Xác suất 9.5%)
- Kim chỉ đỉnh 12h có âm thanh tích tắc khi quay lướt qua từng chốt.
- Sau khi quay xong, kết quả ô tự động kích hoạt logic tương ứng.

### 4.2 Xử lý logic từng loại ô (FR-02)
1. **Ô Điểm số (+100, +200, +500, +1000):** Tạm ghi nhận `pendingPoints` -> Hiển thị câu hỏi trắc nghiệm -> Trả lời đúng được vào màn hình đoán -> Điểm chỉ chính thức được cộng khi đoán trúng chữ cái hoặc từ khóa (theo Mục 7). Nếu đoán sai chữ cái hoặc trả lời sai câu hỏi: `pendingPoints` bị hủy về 0.
2. **Ô Mất lượt:** Thông báo mất lượt, không hiển thị câu hỏi, tự động chuyển sang đội kế tiếp sau 2 giây.
3. **Ô Chia đôi:** Giảm 50% tổng điểm hiện có của đội -> Hiển thị câu hỏi trắc nghiệm.
4. **Ô Nhân đôi:** Cơ hội nhận +1000 điểm thưởng nếu trả lời đúng câu hỏi và đoán trúng chữ cái/từ khóa.
5. **Ô Swap điểm:** Chọn đội muốn đổi điểm -> Hiển thị câu hỏi trắc nghiệm. Chỉ khi trả lời ĐÚNG thì lệnh hoán đổi mới có hiệu lực; nếu trả lời SAI thì hủy lệnh hoán đổi và mất lượt.

### 4.3 Câu hỏi trắc nghiệm & Thời gian (FR-03)
- Tách riêng file dữ liệu độc lập `src/data/roundsData.js` với tối thiểu 10 câu hỏi chất lượng cao cho mỗi vòng.
- 4 đáp án A - B - C - D xếp dạng 2x2.
- Đồng hồ đếm ngược 30 giây dạng vòng tròn SVG chuyển sang màu đỏ khi còn <= 5 giây.
- Hiển thị giải thích chi tiết ý nghĩa lịch sử sau khi trả lời.

### 4.4 Cơ chế Đoán chữ & Đoán từ khóa (FR-04)
- **Phương án A (Đoán chữ cái):**
  - Bàn phím ký tự tiếng Việt đầy đủ (A, Ă, Â, B, C, D, Đ, E, Ê, ...).
  - Chuẩn hóa ký tự bảo toàn nét đặc trưng nguyên âm có mũ/móc: Đoán `Ă` chỉ mở `Ă`, đoán `A` chỉ mở `A`.
  - Vô hiệu hóa các chữ cái đã được chọn trước đó trong vòng.
  - Đoán đúng: Lật mở toàn bộ các vị trí chứa chữ cái đó với animation 3D flip card, chính thức ghi nhận điểm thưởng và **được tiếp tục lượt quay**.
  - Đoán sai: Hủy điểm lượt quay, mất lượt, chuyển đội tiếp theo.
- **Phương án B (Đoán từ khóa trực tiếp):**
  - Giới hạn: Mỗi đội chỉ được đoán trực tiếp **tối đa 01 lần trong mỗi vòng chơi**.
  - Đoán đúng: Nhận ngay điểm vòng quay + **+1000 điểm thưởng giải mã**, mở toàn bộ từ khóa, kích hoạt màn hình vinh danh thắng cuộc!
  - Đoán sai: Hủy điểm lượt quay, bị **LOẠI KHỎI VÒNG CHƠI HIỆN TẠI** (không được quay, không được đoán chữ trong vòng này nữa).

### 4.5 Xử lý tình huống toàn bộ đội bị loại (FR-05)
- Khi toàn bộ các đội tham gia đều đoán sai từ khóa và bị loại:
  - Hệ thống tự động kích hoạt Modal `AllEliminatedModal` thông báo vòng chơi kết thúc không có đội thắng.
  - Tự động hiển thị và giải mã từ khóa bí mật cho cả lớp cùng xem.
  - Cho phép Host lựa chọn: **Chuyển sang vòng tiếp theo** hoặc **Mở lại lượt cho vòng hiện tại**.

### 4.6 Bảng điểm & Điều khiển Host (FR-06)
- Hiển thị danh sách các đội tham gia kèm tổng điểm thời gian thực.
- Cờ hiệu badge "Đang lượt" và "Bị loại khỏi vòng".
- Bảng cấu hình Host: Thêm/sửa/xóa tên đội, đổi chủ đề vòng chơi, reset trò chơi.

---

## 5. Danh mục Kiểm thử Chính (Test Cases)

| Mã kiểm thử | Tình huống | Kết quả kỳ vọng |
|---|---|---|
| **TC-01** | Quay vào ô Mất lượt | Không hiện câu hỏi, phát âm báo sai, chuyển lượt sau 2s |
| **TC-02** | Quay vào +500 điểm, trả lời trắc nghiệm đúng, đoán đúng chữ cái | Điểm đội tăng +500, mở ô chữ, đội được tiếp tục lượt quay |
| **TC-03** | Trả lời trắc nghiệm đúng, nhưng đoán sai chữ cái | Hủy điểm lượt quay (+0 điểm), chuyển lượt sang đội kế tiếp |
| **TC-04** | Trả lời trắc nghiệm sai | Điểm quay bị hủy, chuyển lượt sang đội kế tiếp |
| **TC-05** | Quay vào Swap điểm nhưng trả lời sai trắc nghiệm | Hủy lệnh swap điểm, giữ nguyên điểm số cũ của cả 2 đội |
| **TC-06** | Chọn đoán từ khóa và nhập đúng | Cộng +1000 điểm thưởng, mở toàn bộ ô chữ, bắn pháo hoa vinh danh |
| **TC-07** | Chọn đoán từ khóa và nhập sai | Đội chuyển sang trạng thái bị loại khỏi vòng |
| **TC-08** | Tất cả các đội đều bị loại do đoán sai từ khóa | Hiển thị màn hình Tất cả bị loại, giải mã đáp án bí mật, cho phép sang vòng mới |
| **TC-09** | Hết 30 giây trả lời câu hỏi | Tự động tính là trả lời sai, hủy điểm và chuyển lượt |
| **TC-10** | Mở hết toàn bộ chữ cái trên bảng | Hệ thống tự động kích hoạt chiến thắng vòng |
