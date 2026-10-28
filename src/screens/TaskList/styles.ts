import { StyleSheet } from 'react-native';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Shadow.subtle,
  },
  headerLeft: {
    flex: 1,
  },
  headerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerLogo: {
    fontSize: 22,
  },
  headerTitle: {
    fontSize: FontSize.xl + 1,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: FontSize.xs + 1,
    color: Colors.textMuted,
    marginTop: 2,
    fontWeight: FontWeight.medium,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearCompletedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 3,
    borderRadius: Radius.full,
    backgroundColor: Colors.dangerLight,
    borderWidth: 1,
    borderColor: Colors.dangerBorder,
    minHeight: 36,
  },
  clearCompletedBtnDisabled: {
    backgroundColor: Colors.surfaceSubtle,
    borderColor: Colors.border,
    opacity: 0.5,
  },
  clearCompletedIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  clearCompletedText: {
    fontSize: FontSize.xs + 1,
    fontWeight: FontWeight.bold,
    color: Colors.dangerDark,
  },
  clearCompletedTextDisabled: {
    color: Colors.textDisabled,
  },
  listContent: {
    paddingTop: Spacing.xs,
    paddingBottom: 110, // Đảm bảo danh sách cuộn mượt và không bị FAB che
  },
  fab: {
    position: 'absolute',
    bottom: Spacing.xxl + 4,
    right: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.full,
    minHeight: 52,
    ...Shadow.floating,
  },
  fabPressed: {
    backgroundColor: Colors.primaryDark,
    transform: [{ scale: 0.96 }],
  },
  fabIcon: {
    fontSize: 22,
    color: Colors.white,
    fontWeight: FontWeight.bold,
    marginRight: 6,
    lineHeight: 24,
  },
  fabText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
});
