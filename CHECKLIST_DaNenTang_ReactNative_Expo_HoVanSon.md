# CHECKLIST THỰC HÀNH ĐA NỀN TẢNG
**Sinh viên:** Hồ Văn Sơn  
**Công nghệ sử dụng:** React Native + Expo + TypeScript  
**Môi trường code:** Visual Studio Code  
**Thiết bị chạy thử:** Android Emulator từ Android Studio  

---

## 0. Quy ước chung cho toàn bộ bài tập

- [ ] Mỗi Lab đặt trong một thư mục riêng: `Lab1`, `Lab2`, ..., `Lab9`.
- [ ] Tạo project bằng Expo với TypeScript.
- [ ] Code chính bằng Visual Studio Code.
- [ ] Android Studio chỉ dùng Android SDK và Android Emulator.
- [ ] Trước khi chạy bài, kiểm tra thiết bị bằng:
  ```bash
  adb devices
  ```
- [ ] Chạy project bằng:
  ```bash
  npx expo start
  ```
- [ ] Khi Metro chạy, nhấn `a` để mở trên Android Emulator.
- [ ] Giao diện phải chạy ổn, không có lỗi đỏ.
- [ ] Code rõ ràng, dễ đọc, đặt tên biến/hàm hợp lý.
- [ ] Không cài package không cần thiết.
- [ ] Ưu tiên giao diện gọn, phù hợp màn hình Small Phone 720 × 1280.
- [ ] Nếu phù hợp với giao diện của bài, hiển thị tên **Hồ Văn Sơn** ở vị trí tự nhiên như tiêu đề phụ, profile, footer, author hoặc thông tin sinh viên.
- [ ] Không chèn tên Hồ Văn Sơn vào vị trí làm sai yêu cầu chức năng chính của bài.
- [ ] Sau khi hoàn thành mỗi Lab, chụp ảnh màn hình kết quả trên Android Emulator.
- [ ] Kiểm tra lại project có thể chạy lại bằng `npx expo start`.

---

# LAB 1 — I Am Rich

## Mục tiêu
Làm quen cấu trúc project React Native Expo và các component giao diện cơ bản.

## Checklist
- [ ] Tạo project `Lab1`.
- [ ] Xóa giao diện mẫu không cần thiết.
- [ ] Tạo màn hình chính đơn giản.
- [ ] Có tiêu đề `I Am Rich`.
- [ ] Hiển thị hình ảnh viên kim cương hoặc hình minh họa phù hợp.
- [ ] Dùng các component cơ bản như `View`, `Text`, `Image`.
- [ ] Căn giữa và bố trí giao diện hợp lý.
- [ ] Có màu nền phù hợp.
- [ ] Nếu phù hợp, hiển thị `Hồ Văn Sơn` ở cuối màn hình hoặc dưới tiêu đề.
- [ ] Chạy thành công trên Android Emulator.
- [ ] Chụp ảnh kết quả.

---

# LAB 2 — MiCard

## Mục tiêu
Luyện xây dựng giao diện cá nhân bằng các component và style của React Native.

## Checklist
- [ ] Tạo project `Lab2`.
- [ ] Tạo giao diện thẻ thông tin cá nhân.
- [ ] Hiển thị avatar.
- [ ] Hiển thị tên **Hồ Văn Sơn** làm tên chính trên giao diện.
- [ ] Có thông tin nghề nghiệp hoặc vai trò sinh viên.
- [ ] Có số điện thoại mẫu hoặc thông tin liên hệ phù hợp.
- [ ] Có email mẫu hoặc email cá nhân nếu muốn.
- [ ] Sử dụng `View`, `Text`, `Image`, `StyleSheet`.
- [ ] Có card/khối thông tin rõ ràng.
- [ ] Căn chỉnh khoảng cách, font, kích thước hợp lý.
- [ ] Chạy thành công trên Android Emulator.
- [ ] Chụp ảnh kết quả.

---

# TEAM PROJECT 1

- [ ] Xác định đề tài nhóm.
- [ ] Xác định chức năng chính.
- [ ] Chia nhiệm vụ cho thành viên.
- [ ] Chọn cấu trúc thư mục chung.
- [ ] Dùng Git/GitHub nếu nhóm yêu cầu.
- [ ] Thống nhất UI cơ bản.
- [ ] Kiểm tra project chạy được trên Android Emulator.

---

# LAB 3 — Dice

## Mục tiêu
Làm quen state, sự kiện nhấn và sinh dữ liệu ngẫu nhiên.

## Checklist
- [ ] Tạo project `Lab3`.
- [ ] Hiển thị ít nhất 1 hoặc 2 viên xúc xắc.
- [ ] Có nút hoặc cho phép nhấn vào xúc xắc.
- [ ] Khi nhấn, giá trị xúc xắc thay đổi ngẫu nhiên từ 1 đến 6.
- [ ] Dùng `useState`.
- [ ] Dùng hàm xử lý sự kiện.
- [ ] Có hình xúc xắc tương ứng với từng giá trị.
- [ ] Có thể thêm dòng nhỏ `Hồ Văn Sơn` nếu không ảnh hưởng giao diện.
- [ ] Chạy thành công.
- [ ] Chụp ảnh kết quả.

---

# LAB 4 — Magic 8 Ball

## Mục tiêu
Củng cố state, random và xử lý tương tác.

## Checklist
- [ ] Tạo project `Lab4`.
- [ ] Hiển thị Magic 8 Ball hoặc hình minh họa tương ứng.
- [ ] Có tập hợp nhiều câu trả lời.
- [ ] Khi người dùng nhấn, câu trả lời thay đổi ngẫu nhiên.
- [ ] Dùng `useState`.
- [ ] Logic random hoạt động đúng.
- [ ] Giao diện rõ ràng, dễ thao tác.
- [ ] Có thể hiển thị tên `Hồ Văn Sơn` ở footer.
- [ ] Chạy thành công.
- [ ] Chụp ảnh kết quả.

---

# TEAM PROJECT 2

- [ ] Cập nhật tiến độ nhóm.
- [ ] Hoàn thiện các màn hình chính.
- [ ] Kiểm tra navigation.
- [ ] Kiểm tra dữ liệu/state.
- [ ] Merge code và xử lý conflict nếu có.
- [ ] Chạy toàn bộ project trên emulator.
- [ ] Chuẩn bị demo giữa kỳ nếu được yêu cầu.

---

# LAB 5 — Xylophone

## Mục tiêu
Sử dụng package ngoài và xử lý âm thanh.

## Checklist
- [ ] Tạo project `Lab5`.
- [ ] Cài package âm thanh phù hợp với Expo, ưu tiên package chính thức/tương thích Expo.
- [ ] Tạo các phím âm thanh dạng xylophone.
- [ ] Mỗi phím phát một âm khác nhau.
- [ ] Mỗi phím có màu hoặc phân biệt trực quan.
- [ ] Không phát sinh lỗi khi nhấn liên tục.
- [ ] Tổ chức file âm thanh hợp lý trong `assets`.
- [ ] Có thể thêm `Hồ Văn Sơn` nhỏ ở cuối giao diện.
- [ ] Chạy thành công.
- [ ] Chụp ảnh kết quả.

---

# LAB 6 — Quizzler

## Mục tiêu
Tổ chức code, dữ liệu câu hỏi và logic quiz.

## Checklist
- [ ] Tạo project `Lab6`.
- [ ] Tạo danh sách câu hỏi.
- [ ] Có lựa chọn True/False hoặc dạng câu trả lời phù hợp.
- [ ] Hiển thị từng câu hỏi theo thứ tự.
- [ ] Kiểm tra đáp án đúng/sai.
- [ ] Có điểm số hoặc phản hồi kết quả.
- [ ] Tách dữ liệu/logic sang file riêng nếu hợp lý.
- [ ] Hạn chế viết toàn bộ code trong một file.
- [ ] Có màn hình kết thúc hoặc reset quiz.
- [ ] Có thể hiển thị `Hồ Văn Sơn` trong header/footer.
- [ ] Chạy thành công.
- [ ] Chụp ảnh kết quả.

---

# LAB 7 — Destini

## Mục tiêu
Xây dựng ứng dụng truyện tương tác với logic rẽ nhánh.

## Checklist
- [ ] Tạo project `Lab7`.
- [ ] Có nội dung câu chuyện.
- [ ] Có ít nhất 2 lựa chọn cho người dùng.
- [ ] Mỗi lựa chọn dẫn đến nhánh câu chuyện phù hợp.
- [ ] Quản lý trạng thái câu chuyện rõ ràng.
- [ ] Không để xuất hiện lựa chọn sai ở đoạn kết.
- [ ] Có thể chơi lại từ đầu.
- [ ] Tách dữ liệu story khỏi UI nếu hợp lý.
- [ ] Có thể ghi `Hồ Văn Sơn` ở phần giới thiệu hoặc footer.
- [ ] Chạy thành công.
- [ ] Chụp ảnh kết quả.

---

# LAB 8 — BMI Calculator

## Mục tiêu
Xây dựng UI trung cấp, nhập dữ liệu và tính toán.

## Checklist
- [ ] Tạo project `Lab8`.
- [ ] Có nhập/chọn chiều cao.
- [ ] Có nhập/chọn cân nặng.
- [ ] Có nút tính BMI.
- [ ] Công thức BMI chính xác.
- [ ] Hiển thị kết quả BMI.
- [ ] Hiển thị phân loại kết quả phù hợp.
- [ ] Xử lý dữ liệu nhập không hợp lệ.
- [ ] UI rõ ràng, dễ thao tác.
- [ ] Nếu dùng nhiều màn hình, navigation hoạt động đúng.
- [ ] Có thể ghi `Hồ Văn Sơn` nhỏ ở màn hình giới thiệu/kết quả.
- [ ] Chạy thành công.
- [ ] Chụp ảnh kết quả.

---

# LAB 9 — Clima

## Mục tiêu
Làm việc với API, dữ liệu web và bất đồng bộ.

## Checklist
- [ ] Tạo project `Lab9`.
- [ ] Chọn API thời tiết phù hợp.
- [ ] Lưu API key an toàn, không hard-code vào repo công khai nếu có thể.
- [ ] Gọi API bằng `fetch` hoặc thư viện phù hợp.
- [ ] Có trạng thái loading.
- [ ] Có xử lý lỗi khi mất mạng/API lỗi.
- [ ] Hiển thị tên thành phố.
- [ ] Hiển thị nhiệt độ.
- [ ] Hiển thị trạng thái thời tiết.
- [ ] Có thể tìm kiếm thành phố nếu yêu cầu.
- [ ] Có thể sử dụng vị trí thiết bị nếu bài yêu cầu và quyền được cấp.
- [ ] Có thể hiển thị `Hồ Văn Sơn` trong phần About/footer.
- [ ] Chạy thành công.
- [ ] Chụp ảnh kết quả.

---

# CHECKLIST TRƯỚC KHI NỘP MỖI LAB

- [ ] `npm install` không báo lỗi.
- [ ] `npx expo start` chạy bình thường.
- [ ] Android Emulator nhận project.
- [ ] Không có màn hình lỗi đỏ.
- [ ] Không có import/package thừa nghiêm trọng.
- [ ] Không để code test/debug không cần thiết.
- [ ] UI không bị tràn màn hình.
- [ ] Các nút chính hoạt động.
- [ ] Tên Lab/project đúng.
- [ ] Có ảnh chụp màn hình kết quả.
- [ ] Nếu phù hợp, giao diện có tên **Hồ Văn Sơn**.
- [ ] Source code được lưu đầy đủ trước khi nộp.

---

# GHI CHÚ CHO AI/AGENT THỰC HIỆN

Khi thực hiện từng Lab:
1. Đọc checklist của Lab trước khi code.
2. Dùng **React Native + Expo + TypeScript**, không chuyển sang Flutter.
3. Ưu tiên giải pháp đơn giản, đúng yêu cầu bài học và dễ giải thích khi giáo viên hỏi.
4. Không over-engineering.
5. Không tự ý thay đổi cấu trúc hoặc cài nhiều thư viện nếu chưa cần.
6. Giao diện cần sạch, dễ nhìn và chạy tốt trên Android Emulator 720 × 1280.
7. Nếu phù hợp với ngữ cảnh giao diện, hiển thị tên **Hồ Văn Sơn**.
8. Sau khi hoàn thành phải kiểm tra toàn bộ checklist tương ứng và báo rõ mục nào đã hoàn thành.
