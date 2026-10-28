import { Task } from '../types/task';

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Nộp báo cáo bài tập lớn Đa nền tảng',
    note: 'Nộp file PDF báo cáo và link GitHub trước 23:59',
    category: 'Học tập',
    priority: 'Cao',
    dueDate: '20/10/2026', // Đã quá hạn so với 28/10/2026
    done: false,
    createdAt: 1729400000000,
  },
  {
    id: 'task-2',
    title: 'Ôn tập kiến thức thi giữa kỳ React Native',
    note: 'Xem lại phần State, Context API và Navigation Stack/Tabs',
    category: 'Học tập',
    priority: 'Cao',
    dueDate: '28/10/2026', // Hạn hôm nay
    done: false,
    createdAt: 1729500000000,
  },
  {
    id: 'task-3',
    title: 'Đọc tài liệu React Navigation và Hooks',
    note: 'Đã hoàn thành ghi chú các hook: useMemo, useCallback, useContext',
    category: 'Học tập',
    priority: 'Trung bình',
    dueDate: '25/10/2026',
    done: true, // Đã hoàn thành
    createdAt: 1729600000000,
  },
  {
    id: 'task-4',
    title: 'Họp giao ban sprint và phân công công việc',
    note: 'Tham gia họp qua Google Meet với trưởng nhóm lúc 14:00',
    category: 'Công việc',
    priority: 'Cao',
    dueDate: '30/10/2026',
    done: false,
    createdAt: 1729700000000,
  },
  {
    id: 'task-5',
    title: 'Chạy bộ 5km rèn luyện sức khoẻ',
    note: 'Duy trì tập luyện đều đặn tại công viên vào buổi sáng',
    category: 'Sức khoẻ',
    priority: 'Thấp',
    dueDate: '02/11/2026',
    done: false,
    createdAt: 1729800000000,
  },
  {
    id: 'task-6',
    title: 'Mua quà sinh nhật cho bạn thân',
    note: 'Ghé nhà sách chọn cuốn sách lập trình hoặc phụ kiện',
    category: 'Cá nhân',
    priority: 'Trung bình',
    dueDate: '05/11/2026',
    done: false,
    createdAt: 1729900000000,
  },
];
