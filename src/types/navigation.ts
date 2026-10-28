import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Task } from './task';

export type RootStackParamList = {
  TaskList: undefined;
  TaskDetail: { taskId: string };
  TaskForm: { task?: Task };
};

export type TaskListScreenProps = NativeStackScreenProps<RootStackParamList, 'TaskList'>;
export type TaskDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;
export type TaskFormScreenProps = NativeStackScreenProps<RootStackParamList, 'TaskForm'>;
