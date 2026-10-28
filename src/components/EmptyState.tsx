import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../theme';

interface EmptyStateProps {
  isFiltered: boolean;
  onClearFilter?: () => void;
  onAddTask?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = React.memo(
  ({ isFiltered, onClearFilter, onAddTask }) => {
    return (
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>{isFiltered ? '🔍' : '📝'}</Text>
        </View>

        <Text style={styles.title}>
          {isFiltered ? 'Không tìm thấy công việc phù hợp' : 'Chưa có công việc nào'}
        </Text>

        <Text style={styles.subtitle}>
          {isFiltered
            ? 'Hãy thử thay đổi từ khoá tìm kiếm hoặc chuyển sang bộ lọc khác nhé.'
            : 'Hãy bắt đầu một ngày hiệu quả bằng cách thêm các kế hoạch đầu tiên.'}
        </Text>

        {isFiltered && onClearFilter ? (
          <Pressable
            onPress={onClearFilter}
            style={({ pressed }) => [styles.actionBtn, pressed && styles.actionBtnPressed]}
          >
            <Text style={styles.actionBtnText}>Xoá bộ lọc & tìm kiếm</Text>
          </Pressable>
        ) : onAddTask ? (
          <Pressable
            onPress={onAddTask}
            style={({ pressed }) => [styles.actionBtn, pressed && styles.actionBtnPressed]}
          >
            <Text style={styles.actionBtnText}>+ Thêm công việc đầu tiên</Text>
          </Pressable>
        ) : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.xxxl,
    marginTop: Spacing.xl,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  actionBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.full,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnPressed: {
    backgroundColor: Colors.primaryDark,
  },
  actionBtnText: {
    color: Colors.white,
    fontSize: FontSize.sm + 1,
    fontWeight: FontWeight.bold,
  },
});
