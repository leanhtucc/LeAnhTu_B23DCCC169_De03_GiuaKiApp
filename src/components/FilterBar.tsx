import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FilterStatus } from '../types/task';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../theme';

interface FilterBarProps {
  currentFilter: FilterStatus;
  onSelectFilter: (filter: FilterStatus) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
    overdue: number;
  };
}

export const FilterBar: React.FC<FilterBarProps> = React.memo(
  ({ currentFilter, onSelectFilter, counts }) => {
    const filters: { key: FilterStatus; label: string; count: number }[] = [
      { key: 'ALL', label: 'Tất cả', count: counts.all },
      { key: 'ACTIVE', label: 'Chưa xong', count: counts.active },
      { key: 'COMPLETED', label: 'Đã xong', count: counts.completed },
      { key: 'OVERDUE', label: 'Quá hạn', count: counts.overdue },
    ];

    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filters.map((item) => {
            const isActive = currentFilter === item.key;
            const isOverdueTab = item.key === 'OVERDUE' && item.count > 0;

            return (
              <Pressable
                key={item.key}
                onPress={() => onSelectFilter(item.key)}
                style={({ pressed }) => [
                  styles.tab,
                  isActive && styles.tabActive,
                  isOverdueTab && !isActive && styles.tabOverdueInactive,
                  pressed && styles.tabPressed,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    isActive && styles.tabTextActive,
                    isOverdueTab && !isActive && styles.tabTextOverdue,
                  ]}
                >
                  {item.label}
                </Text>
                <View
                  style={[
                    styles.badge,
                    isActive && styles.badgeActive,
                    isOverdueTab && !isActive && styles.badgeOverdue,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      isActive && styles.badgeTextActive,
                      isOverdueTab && !isActive && styles.badgeTextOverdue,
                    ]}
                  >
                    {item.count}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 40,
  },
  tabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabOverdueInactive: {
    borderColor: Colors.dangerBorder,
    backgroundColor: Colors.dangerLight,
  },
  tabPressed: {
    opacity: 0.8,
  },
  tabText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    marginRight: 6,
  },
  tabTextActive: {
    color: Colors.white,
  },
  tabTextOverdue: {
    color: Colors.dangerDark,
  },
  badge: {
    backgroundColor: Colors.surfaceSubtle,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: Radius.full,
  },
  badgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  badgeOverdue: {
    backgroundColor: Colors.dangerDark,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
  },
  badgeTextActive: {
    color: Colors.white,
  },
  badgeTextOverdue: {
    color: Colors.white,
  },
});
