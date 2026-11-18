import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { colors, radius, spacing } from '../theme/colors';

type Props = TextInputProps & { label: string };

export function TextField({ label, style, ...props }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing.sm },
  label: { color: colors.textMuted, fontSize: 14 },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
});