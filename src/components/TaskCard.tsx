import React, { useCallback } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Task } from '../types/task';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '../theme';
import { isTaskOverdue } from '../utils/date';

interface TaskCardProps {
  task: Task;
  onPress: (task: Task) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string, title: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = React.memo(
  ({ task, onPress, onToggle, onDelete }) => {
    const overdue = isTaskOverdue(task.dueDate, task.done);
    const categoryTheme = Colors.categories[task.category] || Colors.categories['Cá nhân'];
    const priorityTheme = Colors.priorities[task.priority] || Colors.priorities['Thấp'];

    // Xử lý sự kiện nhấn giữ để xoá (Câu 3)
    const handleLongPress = useCallback(() => {
      Alert.alert(
        'Xác nhận xoá công việc',
        `Bạn có chắc chắn muốn xoá công việc:\n"${task.title}"?`,
        [
          { text: 'Huỷ', style: 'cancel' },
          {
            text: 'Xoá',
            style: 'destructive',
            onPress: () => onDelete(task.id, task.title),
          },
        ]
      );
    }, [task.id, task.title, onDelete]);

    return (
      <Pressable
        onPress={() => onPress(task)}
        onLongPress={handleLongPress}
        delayLongPress={500}
        style={({ pressed }) => [
          styles.card,
          task.done && styles.cardDone,
          pressed && styles.cardPressed,
        ]}
      >
        <View style={styles.cardContent}>
          {/* Ô đánh dấu Checkbox tự làm bằng Pressable (Câu 1) */}
          <Pressable
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            onPress={() => onToggle(task.id)}
            style={({ pressed }) => [
              styles.checkboxContainer,
              task.done ? styles.checkboxChecked : styles.checkboxUnchecked,
              pressed && styles.checkboxPressed,
            ]}
          >
            {task.done ? <Text style={styles.checkmark}>✓</Text> : null}
          </Pressable>

          {/* Phần nội dung công việc */}
          <View style={styles.infoCol}>
            {/* Hàng nhãn: Danh mục + Mức ưu tiên + Quá hạn */}
            <View style={styles.badgesRow}>
              {/* Nhãn danh mục */}
              <View
                style={[
                  styles.categoryBadge,
                  { backgroundColor: categoryTheme.bg, borderColor: categoryTheme.border },
                ]}
              >
                <Text style={[styles.categoryText, { color: categoryTheme.text }]}>
                  {task.category}
                </Text>
              </View>

              {/* Nhãn mức ưu tiên: Đỏ (Cao), Vàng (Trung bình), Xanh (Thấp) */}
              <View
                style={[
                  styles.priorityBadge,
                  { backgroundColor: priorityTheme.bg, borderColor: priorityTheme.border },
                ]}
              >
                <View style={[styles.priorityDot, { backgroundColor: priorityTheme.dot }]} />
                <Text style={[styles.priorityText, { color: priorityTheme.text }]}>
                  {task.priority}
                </Text>
              </View>

              {/* Nhãn Quá hạn màu đỏ ở danh sách (Câu 4) */}
              {overdue ? (
                <View style={styles.overdueBadge}>
                  <Text style={styles.overdueText}>Quá hạn</Text>
                </View>
              ) : null}
            </View>

            {/* Tên công việc (gạch ngang & mờ đi khi hoàn thành) */}
            <Text
              numberOfLines={2}
              style={[
                styles.title,
                task.done && styles.titleDone,
              ]}
            >
              {task.title}
            </Text>

            {/* Ghi chú phụ nếu có */}
            {task.note ? (
              <Text
                numberOfLines={1}
                style={[styles.note, task.done && styles.noteDone]}
              >
                {task.note}
              </Text>
            ) : null}

            {/* Hạn hoàn thành */}
            <View style={styles.footerRow}>
              <Text style={styles.dateLabel}>Hạn chót:</Text>
              <Text style={[styles.dateValue, overdue && styles.dateValueOverdue]}>
                {task.dueDate}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md + 2,
    ...Shadow.card,
  },
  cardDone: {
    backgroundColor: '#fafbfc',
    borderColor: Colors.borderLight,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: Radius.sm,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    marginTop: 2,
  },
  checkboxUnchecked: {
    borderColor: Colors.borderDark,
    backgroundColor: Colors.white,
  },
  checkboxChecked: {
    borderColor: Colors.success,
    backgroundColor: Colors.success,
  },
  checkboxPressed: {
    opacity: 0.6,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: FontWeight.bold,
    lineHeight: 16,
  },
  infoCol: {
    flex: 1,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: Spacing.xs + 2,
    marginBottom: Spacing.xs + 2,
  },
  categoryBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: Radius.full,
    marginRight: 4,
  },
  priorityText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  overdueBadge: {
    backgroundColor: Colors.dangerLight,
    borderColor: Colors.dangerBorder,
    borderWidth: 1,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  overdueText: {
    color: Colors.dangerDark,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  title: {
    fontSize: FontSize.md + 1,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    lineHeight: 22,
    marginBottom: 4,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
    opacity: 0.6,
  },
  note: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  noteDone: {
    color: Colors.textDisabled,
    opacity: 0.5,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  dateLabel: {
    fontSize: FontSize.xs + 1,
    color: Colors.textMuted,
    marginRight: 4,
  },
  dateValue: {
    fontSize: FontSize.xs + 1,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  dateValueOverdue: {
    color: Colors.dangerDark,
    fontWeight: FontWeight.bold,
  },
});
