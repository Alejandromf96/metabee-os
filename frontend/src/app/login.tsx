import { Link, Redirect } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { TextField } from '../components/TextField';
import { useAuth } from '../context/AuthContext';
import { colors, spacing } from '../theme/colors';

export default function Login() {
  const { user, loading, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return <Loading />;
  }
  if (user) {
    return <Redirect href="/" />;
  }

  async function handleSubmit() {
    if (!email.trim() || !password) {
      setError('Ingresa tu correo y tu contraseña');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
    } catch (e) {
      setError((e as Error).message);
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Metabee OS</Text>
          <Text style={styles.subtitle}>Your Personal Operating System</Text>
        </View>

        <View style={styles.form}>
          <TextField
            label="Correo"
            value={email}
            onChangeText={setEmail}
            placeholder="tu@correo.com"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <TextField
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            placeholder="Tu contraseña"
            secureTextEntry
            autoCapitalize="none"
          />

          {error !== '' && <Text style={styles.error}>{error}</Text>}

          <Button title="Iniciar sesión" onPress={handleSubmit} loading={submitting} />
        </View>

        <Text style={styles.footer}>
          ¿No tienes cuenta?{' '}
          <Link href="register" style={styles.link}>
            Crear cuenta
          </Link>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.xl,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  header: { alignItems: 'center', gap: spacing.sm },
  title: { color: colors.text, fontSize: 34, fontWeight: '700' },
  subtitle: { color: colors.violet, fontSize: 14 },
  form: { gap: spacing.md },
  error: { color: colors.danger, fontSize: 14 },
  footer: { color: colors.textMuted, textAlign: 'center' },
  link: { color: colors.cyan, fontWeight: '600' },
});