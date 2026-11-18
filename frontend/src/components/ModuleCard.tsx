import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme/colors';
import type { IconName } from '../types/icons';
import { Card } from './Card';

type Props = {
  icon: IconName;
  title: string;
  description: string;
  phase: string;
};

export function ModuleCard({ icon, title, description, phase }: Props) {
  return (
    <Card style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={20} color={colors.violet} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{phase}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: 260,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${colors.violet}22`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, gap: 2 },
  title: { color: colors.text, fontSize: 15, fontWeight: '600' },
  description: { color: colors.textMuted, fontSize: 12 },
  badge: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: { color: colors.textMuted, fontSize: 11 },
});