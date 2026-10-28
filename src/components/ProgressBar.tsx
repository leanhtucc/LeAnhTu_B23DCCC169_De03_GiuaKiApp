import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '../theme';

interface ProgressBarProps {
  completed: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = React.memo(({ completed, total }) => {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tiến độ công việc</Text>
          <Text style={styles.subtitle}>
            Đã hoàn thành <Text style={styles.highlight}>{completed}</Text>/{total} công việc
          </Text>
        </View>
        <View style={[styles.percentBadge, percent === 100 && styles.percentBadgeComplete]}>
          <Text style={[styles.percentText, percent === 100 && styles.percentTextComplete]}>
            {percent}%
          </Text>
        </View>
      </View>

      {/* Thanh tiến độ tự vẽ bằng View */}
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${percent}%` },
            percent === 100 && styles.fillComplete,
          ]}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.card,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  highlight: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  percentBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.primaryMuted,
  },
  percentBadgeComplete: {
    backgroundColor: Colors.successLight,
    borderColor: Colors.successBorder,
  },
  percentText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  percentTextComplete: {
    color: Colors.successDark,
  },
  track: {
    height: 10,
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: Radius.full,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
  },
  fillComplete: {
    backgroundColor: Colors.success,
  },
});
