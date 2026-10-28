import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SortOption } from '../types/task';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../theme';

interface SearchAndSortBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  sortBy: SortOption;
  onToggleSort: () => void;
}

export const SearchAndSortBar: React.FC<SearchAndSortBarProps> = React.memo(
  ({ searchQuery, onSearchChange, sortBy, onToggleSort }) => {
    return (
      <View style={styles.container}>
        {/* Ô tìm kiếm theo tên công việc */}
        <View style={styles.searchWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm công việc..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={onSearchChange}
            clearButtonMode="while-editing"
            autoCorrect={false}
          />
          {searchQuery.length > 0 ? (
            <Pressable
              onPress={() => onSearchChange('')}
              hitSlop={8}
              style={styles.clearBtn}
            >
              <Text style={styles.clearText}>✕</Text>
            </Pressable>
          ) : null}
        </View>

        {/* Nút chuyển đổi sắp xếp */}
        <Pressable
          onPress={onToggleSort}
          style={({ pressed }) => [
            styles.sortBtn,
            pressed && styles.sortBtnPressed,
          ]}
        >
          <Text style={styles.sortIcon}>⇅</Text>
          <Text style={styles.sortLabel}>
            {sortBy === 'DUE_DATE' ? 'Hạn chót' : 'Ưu tiên'}
          </Text>
        </Pressable>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    height: 44,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 6,
    color: Colors.textMuted,
  },
  input: {
    flex: 1,
    fontSize: FontSize.sm + 1,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  clearBtn: {
    padding: 4,
  },
  clearText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: FontWeight.bold,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    height: 44,
  },
  sortBtnPressed: {
    backgroundColor: Colors.surfaceSubtle,
  },
  sortIcon: {
    fontSize: 16,
    color: Colors.primary,
    marginRight: 4,
    fontWeight: FontWeight.bold,
  },
  sortLabel: {
    fontSize: FontSize.xs + 1,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
});
