import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors } from '../theme/colors';

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.cyan} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});