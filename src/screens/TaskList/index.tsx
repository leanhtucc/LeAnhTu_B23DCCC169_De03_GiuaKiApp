import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '../../context/TaskContext';
import { FilterStatus, SortOption, Task } from '../../types/task';
import { TaskListScreenProps } from '../../types/navigation';
import { ProgressBar } from '../../components/ProgressBar';
import { FilterBar } from '../../components/FilterBar';
import { SearchAndSortBar } from '../../components/SearchAndSortBar';
import { TaskCard } from '../../components/TaskCard';
import { EmptyState } from '../../components/EmptyState';
import { compareDates, isTaskOverdue } from '../../utils/date';
import { styles } from './styles';

const PRIORITY_WEIGHT = {
  Cao: 3,
  'Trung bình': 2,
  Thấp: 1,
};

const TaskListScreen: React.FC<TaskListScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { tasks, toggleTaskDone, deleteTask, deleteCompletedTasks } = useTasks();

  const [filter, setFilter] = useState<FilterStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('DUE_DATE');

  // Tính toán số lượng cho từng bộ lọc và tiến độ
  const counts = useMemo(() => {
    let completed = 0;
    let overdue = 0;
    let active = 0;

    tasks.forEach((t) => {
      if (t.done) {
        completed += 1;
      } else {
        active += 1;
        if (isTaskOverdue(t.dueDate, t.done)) {
          overdue += 1;
        }
      }
    });

    return {
      all: tasks.length,
      active,
      completed,
      overdue,
    };
  }, [tasks]);

  // Bộ lọc, tìm kiếm và sắp xếp hoạt động đồng thời (Câu 5)
  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // 1. Lọc theo trạng thái
        if (filter === 'ACTIVE' && task.done) return false;
        if (filter === 'COMPLETED' && !task.done) return false;
        if (filter === 'OVERDUE' && !isTaskOverdue(task.dueDate, task.done)) return false;

        // 2. Tìm kiếm theo tên (không phân biệt chữ hoa/thường)
        if (searchQuery.trim().length > 0) {
          const q = searchQuery.trim().toLowerCase();
          const matchTitle = task.title.toLowerCase().includes(q);
          const matchNote = task.note ? task.note.toLowerCase().includes(q) : false;
          if (!matchTitle && !matchNote) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // 3. Sắp xếp theo hạn hoàn thành hoặc mức ưu tiên
        if (sortBy === 'DUE_DATE') {
          return compareDates(a.dueDate, b.dueDate);
        } else {
          const weightA = PRIORITY_WEIGHT[a.priority] || 0;
          const weightB = PRIORITY_WEIGHT[b.priority] || 0;
          if (weightB !== weightA) {
            return weightB - weightA; // Cao -> Trung bình -> Thấp
          }
          return compareDates(a.dueDate, b.dueDate);
        }
      });
  }, [tasks, filter, searchQuery, sortBy]);

  // Xoá 1 công việc
  const handleDeleteTask = useCallback(
    async (id: string, title: string) => {
      await deleteTask(id);
    },
    [deleteTask]
  );

  // Xoá toàn bộ việc đã hoàn thành (Câu 3)
  const handleClearCompleted = useCallback(() => {
    if (counts.completed === 0) return;

    Alert.alert(
      'Xoá việc đã hoàn thành',
      `Bạn có chắc chắn muốn xoá ${counts.completed} công việc đã hoàn thành không?`,
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá tất cả',
          style: 'destructive',
          onPress: async () => {
            const deleted = await deleteCompletedTasks();
            Alert.alert('Thành công', `Đã xoá ${deleted} công việc đã hoàn thành.`);
          },
        },
      ]
    );
  }, [counts.completed, deleteCompletedTasks]);

  // Điều hướng
  const handleOpenDetail = useCallback(
    (task: Task) => {
      navigation.navigate('TaskDetail', { taskId: task.id });
    },
    [navigation]
  );

  const handleOpenAddForm = useCallback(() => {
    navigation.navigate('TaskForm', {});
  }, [navigation]);

  const handleToggleSort = useCallback(() => {
    setSortBy((prev) => (prev === 'DUE_DATE' ? 'PRIORITY' : 'DUE_DATE'));
  }, []);

  const handleClearFilterAndSearch = useCallback(() => {
    setFilter('ALL');
    setSearchQuery('');
  }, []);

  // Render row memoized
  const renderItem = useCallback(
    ({ item }: { item: Task }) => (
      <TaskCard
        task={item}
        onPress={handleOpenDetail}
        onToggle={toggleTaskDone}
        onDelete={handleDeleteTask}
      />
    ),
    [handleOpenDetail, toggleTaskDone, handleDeleteTask]
  );

  const keyExtractor = useCallback((item: Task) => item.id, []);

  const isFiltering = filter !== 'ALL' || searchQuery.trim().length > 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header chính có padding an toàn với status bar */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <View style={styles.headerLeft}>
          <View style={styles.headerBrandRow}>
            <Text style={styles.headerLogo}>📋</Text>
            <Text style={styles.headerTitle}>PlannerApp</Text>
          </View>
          <Text style={styles.headerSubtitle}>Kế hoạch & Công việc cá nhân</Text>
        </View>

        {/* Nút Xoá việc đã hoàn thành (Câu 3) */}
        <Pressable
          disabled={counts.completed === 0}
          onPress={handleClearCompleted}
          style={({ pressed }) => [
            styles.clearCompletedBtn,
            counts.completed === 0 && styles.clearCompletedBtnDisabled,
            pressed && counts.completed > 0 && { opacity: 0.75 },
          ]}
        >
          <Text style={styles.clearCompletedIcon}>🗑</Text>
          <Text
            style={[
              styles.clearCompletedText,
              counts.completed === 0 && styles.clearCompletedTextDisabled,
            ]}
          >
            Dọn xong ({counts.completed})
          </Text>
        </Pressable>
      </View>

      {/* Danh sách FlatList (Câu 1) */}
      <FlatList
        data={filteredAndSortedTasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <>
            {/* Tiến độ công việc (Câu 1) */}
            <ProgressBar completed={counts.completed} total={counts.all} />

            {/* Ô tìm kiếm & Sắp xếp (Câu 5) */}
            <SearchAndSortBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onToggleSort={handleToggleSort}
            />

            {/* Hàng nút lọc theo trạng thái (Câu 5) */}
            <FilterBar
              currentFilter={filter}
              onSelectFilter={setFilter}
              counts={counts}
            />
          </>
        }
        ListEmptyComponent={
          <EmptyState
            isFiltered={isFiltering}
            onClearFilter={handleClearFilterAndSearch}
            onAddTask={handleOpenAddForm}
          />
        }
      />

      {/* Nút "+ Thêm việc" mở màn hình form (Câu 2) */}
      <Pressable
        onPress={handleOpenAddForm}
        style={({ pressed }) => [
          styles.fab,
          { bottom: Math.max(insets.bottom, 16) + 16 },
          pressed && styles.fabPressed,
        ]}
      >
        <Text style={styles.fabIcon}>+</Text>
        <Text style={styles.fabText}>Thêm việc</Text>
      </Pressable>
    </View>
  );
};

export default TaskListScreen;
