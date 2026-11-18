import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../theme/colors';

type Props = {
  values: number[];
  labels: string[];
  highlightIndex?: number;
};

const CHART_HEIGHT = 110;

export function WeekBars({ values, labels, highlightIndex }: Props) {
  const max = Math.max(...values, 1);

  return (
    <View style={styles.row}>
      {values.map((value, index) => {
        const height = Math.max((value / max) * CHART_HEIGHT, 6);
        const active = index === highlightIndex;
        return (
          <View key={labels[index]} style={styles.column}>
            <View style={styles.track}>
              <View
                style={[
                  styles.bar,
                  { height },
                  { backgroundColor: active ? colors.cyan : colors.violet },
                  !active && styles.inactive,
                ]}
              />
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>
              {labels[index]}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm },
  column: { flex: 1, alignItems: 'center', gap: spacing.sm },
  track: { height: CHART_HEIGHT, justifyContent: 'flex-end', width: '100%' },
  bar: { width: '100%', borderRadius: 8 },
  inactive: { opacity: 0.55 },
  label: { color: colors.textMuted, fontSize: 12 },
  labelActive: { color: colors.cyan, fontWeight: '700' },
});