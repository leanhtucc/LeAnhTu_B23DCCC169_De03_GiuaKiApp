import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';
import { INITIAL_TASKS } from '../data/initialTasks';

const STORAGE_KEY = '@planner_tasks_v1';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (data: Omit<Task, 'id' | 'done'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  deleteCompletedTasks: () => Promise<number>;
  toggleTaskDone: (id: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Load danh sách công việc từ AsyncStorage khi mở app
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json !== null) {
          const parsed: Task[] = JSON.parse(json);
          setTasks(parsed);
        } else {
          // Lần đầu mở app: khởi tạo sẵn 6 công việc mẫu
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
          setTasks(INITIAL_TASKS);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu từ AsyncStorage:', error);
        setTasks(INITIAL_TASKS);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Hàm phụ trợ lưu dữ liệu vào Storage
  const persistTasks = useCallback(async (newTasks: Task[]) => {
    try {
      setTasks(newTasks);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu vào AsyncStorage:', error);
    }
  }, []);

  // Thêm công việc mới
  const addTask = useCallback(
    async (data: Omit<Task, 'id' | 'done'>) => {
      const newTask: Task = {
        ...data,
        id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        done: false,
        createdAt: Date.now(),
      };
      const updated = [newTask, ...tasks];
      await persistTasks(updated);
    },
    [tasks, persistTasks]
  );

  // Sửa công việc
  const updateTask = useCallback(
    async (updatedTask: Task) => {
      const updated = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
      await persistTasks(updated);
    },
    [tasks, persistTasks]
  );

  // Xoá 1 công việc
  const deleteTask = useCallback(
    async (id: string) => {
      const updated = tasks.filter((t) => t.id !== id);
      await persistTasks(updated);
    },
    [tasks, persistTasks]
  );

  // Xoá tất cả việc đã hoàn thành
  const deleteCompletedTasks = useCallback(async () => {
    const completedCount = tasks.filter((t) => t.done).length;
    if (completedCount === 0) return 0;

    const remaining = tasks.filter((t) => !t.done);
    await persistTasks(remaining);
    return completedCount;
  }, [tasks, persistTasks]);

  // Đánh dấu hoàn thành / Chưa hoàn thành
  const toggleTaskDone = useCallback(
    async (id: string) => {
      const updated = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
      await persistTasks(updated);
    },
    [tasks, persistTasks]
  );

  // Lấy chi tiết công việc theo ID
  const getTaskById = useCallback(
    (id: string) => {
      return tasks.find((t) => t.id === id);
    },
    [tasks]
  );

  const value = useMemo(
    () => ({
      tasks,
      loading,
      addTask,
      updateTask,
      deleteTask,
      deleteCompletedTasks,
      toggleTaskDone,
      getTaskById,
    }),
    [
      tasks,
      loading,
      addTask,
      updateTask,
      deleteTask,
      deleteCompletedTasks,
      toggleTaskDone,
      getTaskById,
    ]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks phải được sử dụng bên trong TaskProvider');
  }
  return context;
};
