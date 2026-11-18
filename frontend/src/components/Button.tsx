import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, spacing } from '../theme/colors';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export function Button({ title, onPress, loading = false, disabled = false }: Props) {
  const inactive = loading || disabled;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      style={({ pressed }) => [styles.button, (pressed || inactive) && styles.dimmed]}
    >
      {loading ? (
        <ActivityIndicator color={colors.background} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.cyan,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: spacing.lg,
  },
  dimmed: { opacity: 0.6 },
  text: { color: colors.background, fontSize: 16, fontWeight: '700' },
});