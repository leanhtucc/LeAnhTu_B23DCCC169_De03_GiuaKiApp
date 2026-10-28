export type Category = 'Học tập' | 'Công việc' | 'Sức khoẻ' | 'Cá nhân';
export type Priority = 'Cao' | 'Trung bình' | 'Thấp';

export interface Task {
  id: string;
  title: string;          // Tên công việc, bắt buộc, tối đa 50 ký tự
  note?: string;         // Ghi chú, không bắt buộc
  category: Category;    // Học tập | Công việc | Sức khoẻ | Cá nhân
  priority: Priority;    // Cao | Trung bình | Thấp
  dueDate: string;       // Hạn hoàn thành, định dạng dd/mm/yyyy
  done: boolean;         // Đã hoàn thành hay chưa, mặc định false
  createdAt?: number;
}

export type FilterStatus = 'ALL' | 'ACTIVE' | 'COMPLETED' | 'OVERDUE';
export type SortOption = 'DUE_DATE' | 'PRIORITY';
