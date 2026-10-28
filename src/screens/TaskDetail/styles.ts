import { StyleSheet } from 'react-native';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Shadow.subtle,
  },
  headerBtn: {
    minWidth: 44,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xs,
  },
  headerBackText: {
    fontSize: FontSize.md + 1,
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  headerEditText: {
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl * 2,
  },
  mainCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
    ...Shadow.card,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  categoryBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: FontSize.xs + 1,
    fontWeight: FontWeight.bold,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  priorityDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.full,
    marginRight: 5,
  },
  priorityText: {
    fontSize: FontSize.xs + 1,
    fontWeight: FontWeight.bold,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    lineHeight: 30,
    marginBottom: Spacing.md,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
    opacity: 0.7,
  },
  // Khối trạng thái thời gian / quá hạn (Câu 4)
  timeStatusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
  },
  timeStatusBannerOverdue: {
    backgroundColor: Colors.dangerLight,
    borderColor: Colors.dangerBorder,
  },
  timeStatusBannerToday: {
    backgroundColor: Colors.warningLight,
    borderColor: Colors.warningBorder,
  },
  timeStatusBannerFuture: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primaryMuted,
  },
  timeStatusBannerCompleted: {
    backgroundColor: Colors.successLight,
    borderColor: Colors.successBorder,
  },
  timeStatusIconWrapper: {
    marginRight: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeStatusTextContainer: {
    flex: 1,
  },
  timeStatusTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  timeStatusSubtitle: {
    fontSize: FontSize.xs + 1,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  textOverdue: {
    color: Colors.dangerDark,
  },
  textToday: {
    color: Colors.warningDark,
  },
  textFuture: {
    color: Colors.primaryDark,
  },
  textCompleted: {
    color: Colors.successDark,
  },
  sectionTitle: {
    fontSize: FontSize.sm + 1,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs + 2,
  },
  noteBox: {
    backgroundColor: Colors.surfaceSubtle,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  noteText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  emptyNoteText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  metaGrid: {
    marginTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs + 2,
  },
  metaLabel: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  metaValue: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  // Nút hành động
  actionsContainer: {
    gap: Spacing.md,
  },
  toggleBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    ...Shadow.subtle,
  },
  toggleBtnDone: {
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  toggleBtnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  toggleBtnText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  toggleBtnTextDone: {
    color: Colors.textSecondary,
  },
  deleteBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.dangerBorder,
    paddingVertical: Spacing.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  deleteBtnPressed: {
    backgroundColor: Colors.dangerLight,
  },
  deleteBtnText: {
    color: Colors.dangerDark,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
});
