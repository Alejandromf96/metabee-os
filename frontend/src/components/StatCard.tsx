import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../theme/colors';
import type { IconName } from '../types/icons';
import { Card } from './Card';

type Props = {
  icon: IconName;
  label: string;
  value: string;
  hint?: string;
  accent?: string;
};

export function StatCard({ icon, label, value, hint, accent = colors.cyan }: Props) {
  return (
    <Card style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: `${accent}22` }]}>
        <Ionicons name={icon} size={20} color={accent} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexGrow: 1, flexBasis: 150, minWidth: 140, gap: spacing.xs },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  label: { color: colors.textMuted, fontSize: 13 },
  value: { color: colors.text, fontSize: 26, fontWeight: '700' },
  hint: { color: colors.textMuted, fontSize: 12 },
});