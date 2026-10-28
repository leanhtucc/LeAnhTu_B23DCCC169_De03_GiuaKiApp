import React, { useCallback } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '../../context/TaskContext';
import { TaskDetailScreenProps } from '../../types/navigation';
import { Colors } from '../../theme';
import { getDueDateDetail, isTaskOverdue } from '../../utils/date';
import { styles } from './styles';

const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { taskId } = route.params;
  const { getTaskById, toggleTaskDone, deleteTask } = useTasks();

  const task = getTaskById(taskId);

  // Xử lý khi công việc không còn tồn tại (ví dụ vừa bị xoá)
  if (!task) {
    return (
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
          <Pressable onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <Text style={styles.headerBackText}>← Quay lại</Text>
          </Pressable>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: Colors.textMuted }}>Công việc không tồn tại hoặc đã bị xoá.</Text>
        </View>
      </View>
    );
  }

  const overdue = isTaskOverdue(task.dueDate, task.done);
  const dateDetail = getDueDateDetail(task.dueDate, task.done);
  const categoryTheme = Colors.categories[task.category] || Colors.categories['Cá nhân'];
  const priorityTheme = Colors.priorities[task.priority] || Colors.priorities['Thấp'];

  // Nút Sửa công việc
  const handleEdit = useCallback(() => {
    navigation.navigate('TaskForm', { task });
  }, [navigation, task]);

  // Nút Đánh dấu hoàn thành / Chưa hoàn thành
  const handleToggle = useCallback(async () => {
    await toggleTaskDone(task.id);
  }, [task.id, toggleTaskDone]);

  // Nút Xoá công việc
  const handleDelete = useCallback(() => {
    Alert.alert(
      'Xoá công việc',
      `Bạn có chắc chắn muốn xoá vĩnh viễn công việc:\n"${task.title}"?`,
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: async () => {
            await deleteTask(task.id);
            navigation.goBack();
          },
        },
      ]
    );
  }, [task.id, task.title, deleteTask, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header thanh điều hướng với padding an toàn */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={10}
          style={styles.headerBtn}
        >
          <Text style={styles.headerBackText}>← Quay lại</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Chi tiết công việc</Text>
        <Pressable
          onPress={handleEdit}
          hitSlop={10}
          style={styles.headerBtn}
        >
          <Text style={styles.headerEditText}>✏️ Sửa</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Math.max(insets.bottom, 16) + 32 },
        ]}
      >
        {/* Thẻ chính hiển thị thông tin */}
        <View style={styles.mainCard}>
          {/* Hàng nhãn: Danh mục + Mức ưu tiên */}
          <View style={styles.badgesRow}>
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

            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: priorityTheme.bg, borderColor: priorityTheme.border },
              ]}
            >
              <View style={[styles.priorityDot, { backgroundColor: priorityTheme.dot }]} />
              <Text style={[styles.priorityText, { color: priorityTheme.text }]}>
                Ưu tiên {task.priority}
              </Text>
            </View>
          </View>

          {/* Tiêu đề công việc */}
          <Text style={[styles.title, task.done && styles.titleDone]}>
            {task.title}
          </Text>

          {/* Banner trạng thái thời gian / Quá hạn (Câu 4) */}
          <View
            style={[
              styles.timeStatusBanner,
              dateDetail.status === 'overdue' && styles.timeStatusBannerOverdue,
              dateDetail.status === 'today' && styles.timeStatusBannerToday,
              dateDetail.status === 'future' && styles.timeStatusBannerFuture,
              dateDetail.status === 'completed' && styles.timeStatusBannerCompleted,
            ]}
          >
            <Text style={styles.timeStatusIcon}>
              {dateDetail.status === 'completed'
                ? '✅'
                : dateDetail.status === 'overdue'
                ? '🚨'
                : dateDetail.status === 'today'
                ? '⏰'
                : '📅'}
            </Text>
            <View style={styles.timeStatusTextContainer}>
              <Text
                style={[
                  styles.timeStatusTitle,
                  dateDetail.status === 'overdue' && styles.textOverdue,
                  dateDetail.status === 'today' && styles.textToday,
                  dateDetail.status === 'future' && styles.textFuture,
                  dateDetail.status === 'completed' && styles.textCompleted,
                ]}
              >
                {dateDetail.text}
              </Text>
              <Text style={styles.timeStatusSubtitle}>
                Hạn chót: {task.dueDate} {overdue ? '(Đã quá hạn hoàn thành)' : ''}
              </Text>
            </View>
          </View>

          {/* Ghi chú chi tiết */}
          <Text style={styles.sectionTitle}>Ghi chú</Text>
          <View style={styles.noteBox}>
            {task.note ? (
              <Text style={styles.noteText}>{task.note}</Text>
            ) : (
              <Text style={styles.emptyNoteText}>Không có ghi chú nào cho công việc này.</Text>
            )}
          </View>

          {/* Thông tin metadata phụ */}
          <View style={styles.metaGrid}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Trạng thái hiện tại:</Text>
              <Text
                style={[
                  styles.metaValue,
                  { color: task.done ? Colors.successDark : Colors.textPrimary },
                ]}
              >
                {task.done ? '✓ Đã hoàn thành' : '⏳ Chưa hoàn thành'}
              </Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Mã công việc:</Text>
              <Text style={styles.metaValue}>{task.id}</Text>
            </View>
          </View>
        </View>

        {/* Các nút hành động chính (Câu 4) */}
        <View style={styles.actionsContainer}>
          {/* Nút Đánh dấu hoàn thành / Chưa hoàn thành */}
          <Pressable
            onPress={handleToggle}
            style={({ pressed }) => [
              styles.toggleBtn,
              task.done && styles.toggleBtnDone,
              pressed && styles.toggleBtnPressed,
            ]}
          >
            <Text style={[styles.toggleBtnText, task.done && styles.toggleBtnTextDone]}>
              {task.done ? '↩ Đánh dấu chưa hoàn thành' : '✓ Đánh dấu đã hoàn thành'}
            </Text>
          </Pressable>

          {/* Nút Xoá công việc */}
          <Pressable
            onPress={handleDelete}
            style={({ pressed }) => [styles.deleteBtn, pressed && styles.deleteBtnPressed]}
          >
            <Text style={styles.deleteBtnText}>🗑 Xoá công việc này</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default TaskDetailScreen;
