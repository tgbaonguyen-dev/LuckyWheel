# 📜 QUY TẮC HOẠT ĐỘNG DÀNH CHO AI (AI DEVELOPMENT RULES)

> **Dự án:** Chiếc Nón Kỳ Diệu — Giải Mã Từ Khóa (`LuckyWheel`)  
> **Thư mục làm việc hợp lệ:** `./LuckyWheel/`  
> **Hiệu lực:** Bắt buộc áp dụng đối với tất cả các mô hình AI / Trợ lý lập trình (AI Coding Assistants).

---

## 1. Ràng Buộc Phạm Vi Tuyệt Đối (Strict Workspace & Project Scope)

* **Phạm vi cho phép (In-Scope):**  
  AI chỉ được phép hoạt động, đọc, ghi, chỉnh sửa và tạo mới các tệp tin/thư mục **bên trong phạm vi dự án `LuckyWheel/`**.

* **Nghiêm cấm tuyệt đối (Out-of-Scope & Strictly Prohibited):**  
  * **KHÔNG** được chỉnh sửa, tạo mới, di chuyển hoặc xóa bất kỳ tệp tin/thư mục nào nằm ngoài thư mục `LuckyWheel/` (bao gồm thư mục cha `HCM203` hoặc bất kỳ dự án/thư mục ngang hàng nào khác).
  * **KHÔNG** đọc hoặc quét các dữ liệu cá nhân, thư mục hệ thống hoặc các repository khác ngoài phạm vi được chỉ định.
  * Mọi đường dẫn thao tác (CWD / Working Directory) phải luôn được định vị tại hoặc bên trong thư mục `LuckyWheel`.

---

## 2. Nguyên Tắc Can Thiệp Mã Nguồn (Code Modification Guidelines)

1. **Bám sát yêu cầu người dùng:**  
   * Chỉ sửa đổi hoặc thêm mới code đúng theo phạm vi tính năng/lỗi được yêu cầu cụ thể.  
   * Không tự ý thực hiện refactor diện rộng (mass refactoring) làm xáo trộn kiến trúc hoặc logic sẵn có.

2. **Tuân thủ Tech Stack hiện tại:**  
   * **Framework:** React 19 + Vite (`.jsx`, `.js`).
   * **Styling:** Tailwind CSS v4 (sử dụng `@tailwindcss/vite`).
   * **Đồ họa vòng quay:** HTML5 Canvas 2D API.
   * **Âm thanh:** Web Audio API (Native Synthesizer).
   * **Hiệu ứng:** `canvas-confetti`.
   * **Linter:** `oxlint`.

3. **Quản lý Dependencies & Cấu hình:**  
   * **KHÔNG** tự ý cài đặt thêm thư viện (npm packages) mới trừ khi có yêu cầu hoặc được sự đồng ý rõ ràng của người dùng.
   * Giữ nguyên các tệp cấu hình cốt lõi: `package.json`, `vite.config.js`, `.oxlintrc.json`, `.gitignore` trừ khi có tác vụ cấu hình liên quan trực tiếp.

---

## 3. Bảo Tồn Tài Liệu & Nghiệp Vụ (Documentation & Domain Integrity)

* **Bảo vệ tài liệu trong `docs/`:**  
  * `docs/SRS.md` và `docs/game-structure.md` là các tài liệu mô tả đặc tả yêu cầu và thể lệ minigame môn học HCM202. Không được xóa hoặc ghi đè làm mất nội dung nghiệp vụ.
  * Chỉ cập nhật tài liệu khi có yêu cầu đồng bộ tài liệu từ người dùng.
* **Bảo toàn comment & docstring:** Giữ nguyên các chú thích code hiện có trừ khi đoạn code tương ứng bị thay thế hoặc cập nhật.

---

## 4. An Toàn Git & Lệnh Hệ Thống (Git & Terminal Safety)

* **Thực thi lệnh:** Mọi câu lệnh terminal phải được chạy từ thư mục `LuckyWheel`.
* **An toàn Git:**  
  * Không chạy các lệnh có khả năng gây mất mát dữ liệu hoặc lịch sử commit (ví dụ: `git reset --hard`, `git push --force`, `git clean -fd`, v.v.).
  * Tuân thủ nhánh làm việc hiện tại (ví dụ: nhánh tính năng `feat/improve-features`). Không tự ý chuyển nhánh (checkout) hoặc gộp nhánh (merge) trừ khi được giao nhiệm vụ.

---

## 5. Quy Chuẩn Kiểm Tra & Báo Cáo (Verification & Reporting)

* Sau khi chỉnh sửa code, cần đảm bảo code không phát sinh lỗi cú pháp hay lint error (`npm run lint`).
* Báo cáo phản hồi phải súc tích, cung cấp đường dẫn tệp tin rõ ràng dạng link Markdown (`file:///...`) và chỉ rõ những gì đã được can thiệp bên trong `LuckyWheel`.
