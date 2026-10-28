/**
 * Helper xử lý ngày tháng định dạng dd/mm/yyyy cho PlannerApp
 */

export const parseDate = (dateStr: string): Date | null => {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const parts = dateStr.trim().split('/');
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  if (month < 1 || month > 12) return null;

  // Kiểm tra số ngày tối đa trong tháng
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInMonths = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day < 1 || day > daysInMonths[month - 1]) {
    return null;
  }

  // Tạo đối tượng Date tại 00:00:00
  const date = new Date(year, month - 1, day, 0, 0, 0, 0);
  return date;
};

export const getTodayStart = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
};

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Kiểm tra hợp lệ cho form nhập
 */
export const validateDueDate = (
  dateStr: string,
  isEditMode: boolean = false
): { valid: boolean; error?: string } => {
  if (!dateStr || dateStr.trim() === '') {
    return { valid: false, error: 'Hạn hoàn thành không được để trống' };
  }

  const trimmed = dateStr.trim();
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(trimmed)) {
    return { valid: false, error: 'Hạn hoàn thành phải đúng định dạng dd/mm/yyyy (vd: 30/10/2026)' };
  }

  const parsed = parseDate(trimmed);
  if (!parsed) {
    return { valid: false, error: 'Ngày này không có thật trên lịch (kiểm tra lại ngày/tháng)' };
  }

  // Khi thêm mới, hạn không được trước ngày hôm nay
  if (!isEditMode) {
    const today = getTodayStart();
    if (parsed.getTime() < today.getTime()) {
      return { valid: false, error: 'Hạn hoàn thành không được trước ngày hôm nay' };
    }
  }

  return { valid: true };
};

/**
 * Kiểm tra công việc có bị quá hạn hay không
 * Điều kiện: chưa hoàn thành VÀ ngày hết hạn nhỏ hơn ngày hôm nay
 */
export const isTaskOverdue = (dueDateStr: string, done: boolean): boolean => {
  if (done) return false;
  const parsed = parseDate(dueDateStr);
  if (!parsed) return false;

  const today = getTodayStart();
  return parsed.getTime() < today.getTime();
};

/**
 * Trả về thông tin số ngày còn lại hoặc quá hạn cho màn hình Chi tiết
 */
export const getDueDateDetail = (
  dueDateStr: string,
  done: boolean
): { text: string; status: 'overdue' | 'today' | 'future' | 'completed'; daysDiff: number } => {
  if (done) {
    return { text: 'Đã hoàn thành', status: 'completed', daysDiff: 0 };
  }

  const parsed = parseDate(dueDateStr);
  if (!parsed) {
    return { text: 'Ngày không hợp lệ', status: 'future', daysDiff: 0 };
  }

  const today = getTodayStart();
  const diffMs = parsed.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const overdueDays = Math.abs(diffDays);
    return {
      text: `Quá hạn ${overdueDays} ngày`,
      status: 'overdue',
      daysDiff: diffDays,
    };
  }

  if (diffDays === 0) {
    return {
      text: 'Hạn hôm nay',
      status: 'today',
      daysDiff: 0,
    };
  }

  return {
    text: `Còn ${diffDays} ngày`,
    status: 'future',
    daysDiff: diffDays,
  };
};

/**
 * So sánh 2 ngày cho mục đích sắp xếp
 */
export const compareDates = (dateA: string, dateB: string): number => {
  const d1 = parseDate(dateA)?.getTime() ?? 0;
  const d2 = parseDate(dateB)?.getTime() ?? 0;
  return d1 - d2;
};
