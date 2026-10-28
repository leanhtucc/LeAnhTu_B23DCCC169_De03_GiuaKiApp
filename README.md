# ỨNG DỤNG QUẢN LÝ KẾ HOẠCH CÁ NHÂN (PlannerApp)

> **BÀI THI THỰC HÀNH GIỮA KỲ — HỌC PHẦN: PHÁT TRIỂN ỨNG DỤNG ĐA NỀN TẢNG**  
> **Học viện Công nghệ Bưu chính Viễn thông (PTIT)**  
> **Đề thi:** Đề số 03  
> **Sinh viên:** Lê Anh Tú  
> **Mã sinh viên:** B23DCCC169  

---

## 📱 Giới thiệu dự án

**PlannerApp** là ứng dụng di động quản lý công việc và kế hoạch cá nhân được xây dựng trên nền tảng **React Native CLI (TypeScript)** thuần, tuân thủ nghiêm ngặt các quy định của đề thi:
- **100% Custom Components:** Tuyệt đối không sử dụng thư viện UI dựng sẵn (NativeBase, React Native Paper, UI Kitten,...).
- **Hệ thống Icon đồng bộ:** Sử dụng vector icons chuẩn mực từ `lucide-react-native` và `react-native-svg`.
- **An toàn giao diện:** Xử lý `react-native-safe-area-context` tương thích hoàn hảo trên thiết bị có tai thỏ / notch / dynamic island và các tỷ lệ màn hình Android hiện đại.
- **Lưu trữ bền vững:** Đồng bộ dữ liệu cục bộ với `@react-native-async-storage/async-storage`.

---

## 📋 Bảng đối chiếu yêu cầu đề thi (10 / 10 Điểm)

| Câu hỏi | Yêu cầu nghiệp vụ | Tình trạng | Mô tả chi tiết thực hiện |
| :--- | :--- | :---: | :--- |
| **Câu 1** *(2.0 đ)* | **Danh sách công việc & Tiến độ** | ✅ Hoàn thành | • Dùng `FlatList` tối ưu hiệu năng render.<br>• Thanh tiến độ công việc tự tạo bằng `View`, tỷ lệ hoàn thành kèm nhãn *“Đã hoàn thành X/Y công việc”* và huy hiệu %.<br>• Checkbox tự dựng bằng `Pressable` hỗ trợ chạm mượt mà.<br>• Khi hoàn thành: tiêu đề gạch ngang (`line-through`) và mờ đi.<br>• Thẻ ưu tiên 3 cấp độ: Đỏ (Cao), Vàng (Trung bình), Xanh (Thấp).<br>• Hiển thị danh mục công việc dạng chip bo tròn. |
| **Câu 2** *(1.5 đ)* | **Thêm & Sửa công việc (Form)** | ✅ Hoàn thành | • Gộp chung màn hình `TaskFormScreen` (tự động nhận biết mode qua navigation params).<br>• Chọn danh mục & mức ưu tiên bằng nhóm nút bấm chips trực quan có icon minh hoạ.<br>• Validate tên: 1–50 ký tự, đếm số ký tự realtime (`35/50`).<br>• Validate hạn chót: `dd/mm/yyyy`, kiểm tra ngày hợp lệ theo lịch (xử lý năm nhuận, tháng 30/31 ngày).<br>• Ngăn chặn chọn ngày quá khứ khi tạo mới.<br>• Hiển thị lỗi text đỏ + icon cảnh báo ngay dưới ô nhập. |
| **Câu 3** *(1.0 đ)* | **Xoá công việc & Dọn dẹp** | ✅ Hoàn thành | • Nhấn giữ (`onLongPress` 500ms) vào công việc để hiển thị hộp thoại `Alert.alert` xác nhận xoá.<br>• Nút *“Dọn xong (X)”* trên header hiển thị số việc đã xong.<br>• Bấm nút mở `Alert.alert` xác nhận trước khi xoá toàn bộ việc đã xong.<br>• Tự động `disable` và làm mờ nút khi chưa có việc nào hoàn thành (`count = 0`). |
| **Câu 4** *(1.5 đ)* | **Xem chi tiết công việc** | ✅ Hoàn thành | • Màn hình `TaskDetailScreen` hiển thị toàn bộ: tên, ghi chú, danh mục, mức ưu tiên, hạn chót, mã việc.<br>• Banner tính toán hạn chót thông minh: *“Quá hạn X ngày”*, *“Hạn hôm nay”*, *“Còn X ngày”*.<br>• Huy hiệu màu đỏ nổi bật *“Quá hạn”* xuất hiện cả ở danh sách và màn hình chi tiết.<br>• Nút chuyển đổi trạng thái *Đã xong / Chưa xong* và nút *Sửa*, nút *Xoá*. |
| **Câu 5** *(1.5 đ)* | **Bộ lọc, Tìm kiếm & Sắp xếp** | ✅ Hoàn thành | • 4 tab lọc cuộn ngang: *Tất cả*, *Chưa xong*, *Đã xong*, *Quá hạn* kèm số lượng đếm.<br>• Ô tìm kiếm theo tên (không phân biệt chữ hoa/thường) kèm nút xoá nhanh (X).<br>• Nút chuyển đổi sắp xếp: *Theo hạn hoàn thành* (gần nhất) hoặc *Theo mức ưu tiên* (Cao → Trung bình → Thấp).<br>• **Bộ ba Lọc – Tìm kiếm – Sắp xếp hoạt động đồng thời** chính xác. |
| **Câu 6** *(0.5 đ)* | **Lưu trữ & Khởi tạo dữ liệu** | ✅ Hoàn thành | • Tích hợp `@react-native-async-storage/async-storage` với storage key `@planner_tasks_v1`.<br>• Dữ liệu mẫu khởi tạo lần đầu gồm **6 công việc phong phú** (có sẵn công việc Quá hạn, Đã xong, Hôm nay, Tương lai). |
| **Câu 7** *(2.0 đ)* | **Giao diện & Trải nghiệm (UI/UX)** | ✅ Hoàn thành | • Màu sắc phân cấp rõ ràng, đồng bộ theo Design Tokens (`src/theme`).<br>• Thẻ bo tròn (`Radius.lg`), đổ bóng nhẹ (`elevation: 2`, `shadowOffset`).<br>• Hiệu ứng chạm phản hồi xúc giác (`Pressable` opacity, active state).<br>• Trạng thái rỗng (`EmptyState`) sinh động khi danh sách trống hoặc không tìm thấy kết quả tìm kiếm.<br>• Hỗ trợ `KeyboardAvoidingView` và Safe Area insets chống tràn tai thỏ. |

---

## 📂 Cấu trúc thư mục dự án

```text
Bai-giua-ki/
├── android/                        # Cấu hình Native Android
├── src/
│   ├── app/
│   │   └── index.tsx               # Root Navigation Stack & Provider setup
│   ├── components/                 # Các UI Components tự dựng (No library)
│   │   ├── EmptyState.tsx          # Giao diện khi danh sách trống / không có kết quả
│   │   ├── FilterBar.tsx           # Thanh chuyển tab lọc trạng thái
│   │   ├── ProgressBar.tsx         # Thanh tiến độ công việc dạng View tùy biến
│   │   ├── SearchAndSortBar.tsx    # Ô tìm kiếm + nút chuyển đổi sắp xếp
│   │   └── TaskCard.tsx            # Thẻ công việc (Custom Checkbox, Badges, Long-press)
│   ├── context/
│   │   └── TaskContext.tsx         # Quản lý State toàn cục & AsyncStorage persistence
│   ├── data/
│   │   └── initialTasks.ts         # Dữ liệu 6 công việc mẫu khởi tạo
│   ├── screens/
│   │   ├── TaskList/               # Màn hình danh sách công việc chính
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── TaskDetail/             # Màn hình xem chi tiết công việc
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   └── TaskForm/               # Màn hình Thêm & Sửa công việc
│   │       ├── index.tsx
│   │       └── styles.ts
│   ├── theme/
│   │   └── index.ts                # Design System tokens (Colors, Spacing, Radius, Shadow)
│   ├── types/
│   │   ├── navigation.ts           # Định nghĩa Navigation Param List
│   │   └── task.ts                 # Interfaces cho Task, Category, Priority, Filter, Sort
│   └── utils/
│       └── date.ts                 # Logic xử lý ngày tháng, leap year, hạn chót, quá hạn
├── App.tsx                         # Entry point ứng dụng
├── package.json                    # Cấu hình dependencies
└── README.md                       # Tài liệu hướng dẫn và báo cáo bài tập
```

---

## 🛠 Hướng dẫn cài đặt và chạy ứng dụng

### 1. Yêu cầu môi trường
- **Node.js**: v18+ hoặc v20+
- **JDK**: Java 17
- **Android SDK**: Build-Tools 35.0.0, API Level 34+
- **Android Emulator / Thiết bị thật** đã bật USB Debugging

### 2. Cài đặt thư viện
```bash
npm install
```

### 3. Khởi động Metro Bundler
```bash
npm start
# hoặc: npx react-native start
```

### 4. Build và khởi chạy trên Android
Mở một cửa sổ dòng lệnh khác tại thư mục dự án và chạy:
```bash
npm run android
# hoặc: npx react-native run-android
```

---

## 📦 Hướng dẫn đóng gói nộp bài

Khi nộp bài theo quy định của đề thi:
1. Xoá các thư mục tạm và dependencies:
   - `node_modules/`
   - `android/build/`
   - `android/app/build/`
   - `android/.gradle/`
   - `ios/Pods/` (nếu có)
2. Đặt tên file nén theo cú pháp:
   ```text
   LeAnhTu_B23DCCC169_De03.zip
   ```
