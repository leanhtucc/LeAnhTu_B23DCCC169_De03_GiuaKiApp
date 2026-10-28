import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { TaskProvider } from '../context/TaskContext';
import { Colors } from '../theme';

import TaskListScreen from '../screens/TaskList';
import TaskDetailScreen from '../screens/TaskDetail';
import TaskFormScreen from '../screens/TaskForm';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.white,
    text: Colors.textPrimary,
    border: Colors.border,
  },
};

export const AppNavigator: React.FC = () => {
  return (
    <TaskProvider>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator
          initialRouteName="TaskList"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="TaskList" component={TaskListScreen} />
          <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
          <Stack.Screen
            name="TaskForm"
            component={TaskFormScreen}
            options={{
              presentation: 'card',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

export default AppNavigator;
