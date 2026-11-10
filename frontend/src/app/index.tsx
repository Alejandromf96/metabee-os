import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { apiFetch } from '../services/api';
import { colors, spacing } from '../theme/colors';

export default function Index() {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    apiFetch<{ database: string }>('/health/db')
      .then(() => setStatus('ok'))
      .catch((error: Error) => {
        setMessage(error.message);
        setStatus('error');
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metabee OS</Text>
      {status === 'loading' && <ActivityIndicator color={colors.cyan} />}
      {status === 'ok' && (
        <Text style={styles.ok}>API y base de datos conectadas</Text>
      )}
      {status === 'error' && (
        <Text style={styles.error}>Sin conexión: {message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  title: { color: colors.text, fontSize: 32, fontWeight: '700' },
  ok: { color: colors.success, fontSize: 16 },
  error: {
    color: colors.danger,
    fontSize: 16,
    textAlign: 'center',
    padding: spacing.md,
  },
});