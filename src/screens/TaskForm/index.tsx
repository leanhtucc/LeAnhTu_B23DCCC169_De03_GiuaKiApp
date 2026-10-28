import React, { useCallback, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '../../context/TaskContext';
import { Category, Priority } from '../../types/task';
import { TaskFormScreenProps } from '../../types/navigation';
import { Colors } from '../../theme';
import { formatDate, getTodayStart, validateDueDate } from '../../utils/date';
import { styles } from './styles';

const CATEGORIES: Category[] = ['Học tập', 'Công việc', 'Sức khoẻ', 'Cá nhân'];
const PRIORITIES: Priority[] = ['Cao', 'Trung bình', 'Thấp'];

const TaskFormScreen: React.FC<TaskFormScreenProps> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const existingTask = route.params?.task;
  const isEditMode = !!existingTask;

  const { addTask, updateTask } = useTasks();

  // Form states
  const [title, setTitle] = useState(existingTask?.title || '');
  const [note, setNote] = useState(existingTask?.note || '');
  const [category, setCategory] = useState<Category>(existingTask?.category || 'Học tập');
  const [priority, setPriority] = useState<Priority>(existingTask?.priority || 'Trung bình');
  const [dueDate, setDueDate] = useState(
    existingTask?.dueDate || formatDate(getTodayStart())
  );

  // Error states
  const [titleError, setTitleError] = useState<string | null>(null);
  const [dueDateError, setDueDateError] = useState<string | null>(null);

  // Validate realtime khi người dùng nhập tiêu đề
  const handleTitleChange = useCallback((text: string) => {
    setTitle(text);
    if (text.trim().length === 0) {
      setTitleError('Tên công việc không được để trống');
    } else if (text.trim().length > 50) {
      setTitleError('Tên công việc không được vượt quá 50 ký tự');
    } else {
      setTitleError(null);
    }
  }, []);

  // Validate realtime khi người dùng nhập ngày
  const handleDueDateChange = useCallback((text: string) => {
    setDueDate(text);
    if (dueDateError) {
      setDueDateError(null);
    }
  }, [dueDateError]);

  // Xử lý gửi form
  const handleSubmit = useCallback(async () => {
    // 1. Kiểm tra tiêu đề
    let hasError = false;
    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      setTitleError('Tên công việc không được để trống');
      hasError = true;
    } else if (trimmedTitle.length > 50) {
      setTitleError('Tên công việc không được vượt quá 50 ký tự');
      hasError = true;
    } else {
      setTitleError(null);
    }

    // 2. Kiểm tra hạn hoàn thành (Câu 2)
    const dateValidation = validateDueDate(dueDate, isEditMode);
    if (!dateValidation.valid) {
      setDueDateError(dateValidation.error || 'Ngày hết hạn không hợp lệ');
      hasError = true;
    } else {
      setDueDateError(null);
    }

    if (hasError) {
      return;
    }

    try {
      if (isEditMode && existingTask) {
        // Cập nhật công việc cũ
        await updateTask({
          ...existingTask,
          title: trimmedTitle,
          note: note.trim() || undefined,
          category,
          priority,
          dueDate: dueDate.trim(),
        });
        Alert.alert('Thành công', 'Đã cập nhật công việc thành công!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        // Thêm công việc mới
        await addTask({
          title: trimmedTitle,
          note: note.trim() || undefined,
          category,
          priority,
          dueDate: dueDate.trim(),
        });
        Alert.alert('Thành công', 'Đã thêm công việc mới thành công!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (err) {
      Alert.alert('Lỗi', 'Không thể lưu công việc. Vui lòng thử lại.');
    }
  }, [
    title,
    note,
    category,
    priority,
    dueDate,
    isEditMode,
    existingTask,
    addTask,
    updateTask,
    navigation,
  ]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header thanh điều hướng với padding an toàn */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={10}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Huỷ</Text>
        </Pressable>
        <Text style={styles.headerTitle}>
          {isEditMode ? 'Sửa công việc' : 'Thêm công việc'}
        </Text>
        <View style={styles.backButton} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, 16) + 40 },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Ô nhập tên công việc (Bắt buộc, tối đa 50 ký tự) */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>
                Tên công việc <Text style={styles.requiredStar}>*</Text>
              </Text>
              <Text
                style={[
                  styles.charCount,
                  title.length > 50 && styles.charCountLimit,
                ]}
              >
                {title.length}/50
              </Text>
            </View>

            <TextInput
              style={[styles.input, !!titleError && styles.inputError]}
              placeholder="Nhập tên công việc (ví dụ: Nộp bài tập...)"
              placeholderTextColor={Colors.textMuted}
              value={title}
              onChangeText={handleTitleChange}
              maxLength={60}
            />

            {/* Thông báo lỗi hiển thị ngay dưới ô nhập (Câu 2) */}
            {titleError ? (
              <Text style={styles.errorText}>⚠️ {titleError}</Text>
            ) : null}
          </View>

          {/* Chọn danh mục bằng nút bấm (chips) (Câu 2) */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Danh mục</Text>
            </View>

            <View style={styles.chipsRow}>
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat;
                const catTheme = Colors.categories[cat];

                return (
                  <Pressable
                    key={cat}
                    onPress={() => setCategory(cat)}
                    style={[
                      styles.chip,
                      isSelected && styles.chipActive,
                      isSelected && {
                        borderColor: catTheme.text,
                        backgroundColor: catTheme.bg,
                      },
                    ]}
                  >
                    <View
                      style={[styles.chipDot, { backgroundColor: catTheme.text }]}
                    />
                    <Text
                      style={[
                        styles.chipText,
                        isSelected && styles.chipTextActive,
                        isSelected && { color: catTheme.text },
                      ]}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Chọn mức ưu tiên bằng nút bấm (chips) (Câu 2) */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Mức ưu tiên</Text>
            </View>

            <View style={styles.chipsRow}>
              {PRIORITIES.map((pri) => {
                const isSelected = priority === pri;
                const priTheme = Colors.priorities[pri];

                return (
                  <Pressable
                    key={pri}
                    onPress={() => setPriority(pri)}
                    style={[
                      styles.chip,
                      isSelected && styles.chipActive,
                      isSelected && {
                        borderColor: priTheme.border,
                        backgroundColor: priTheme.bg,
                      },
                    ]}
                  >
                    <View
                      style={[styles.chipDot, { backgroundColor: priTheme.dot }]}
                    />
                    <Text
                      style={[
                        styles.chipText,
                        isSelected && styles.chipTextActive,
                        isSelected && { color: priTheme.text },
                      ]}
                    >
                      {pri}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Ô nhập hạn hoàn thành (dd/mm/yyyy) */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>
                Hạn hoàn thành (dd/mm/yyyy) <Text style={styles.requiredStar}>*</Text>
              </Text>
            </View>

            <TextInput
              style={[styles.input, !!dueDateError && styles.inputError]}
              placeholder="dd/mm/yyyy (ví dụ: 30/10/2026)"
              placeholderTextColor={Colors.textMuted}
              value={dueDate}
              onChangeText={handleDueDateChange}
              keyboardType="numbers-and-punctuation"
              autoCapitalize="none"
              maxLength={10}
            />

            {/* Thông báo lỗi hiển thị ngay dưới ô nhập (Câu 2) */}
            {dueDateError ? (
              <Text style={styles.errorText}>⚠️ {dueDateError}</Text>
            ) : (
              <Text style={styles.hintText}>
                Định dạng ngày/tháng/năm 4 chữ số (ví dụ: 30/10/2026)
              </Text>
            )}
          </View>

          {/* Ô nhập ghi chú (không bắt buộc) */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Ghi chú thêm</Text>
            </View>

            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Chi tiết công việc, địa điểm hoặc link tài liệu..."
              placeholderTextColor={Colors.textMuted}
              value={note}
              onChangeText={setNote}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Nút lưu công việc */}
          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.submitBtn,
              pressed && styles.submitBtnPressed,
            ]}
          >
            <Text style={styles.submitBtnText}>
              {isEditMode ? 'Lưu thay đổi' : 'Tạo công việc'}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TaskFormScreen;
