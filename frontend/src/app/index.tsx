import { Redirect } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { useAuth } from '../context/AuthContext';
import { colors, spacing } from '../theme/colors';

export default function Home() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Redirect href="login" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metabee OS</Text>
      <Text style={styles.text}>Sesión iniciada como {user.email}</Text>
      <View style={styles.action}>
        <Button title="Cerrar sesión" onPress={signOut} />
      </View>
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
    padding: spacing.lg,
  },
  title: { color: colors.text, fontSize: 32, fontWeight: '700' },
  text: { color: colors.cyan, fontSize: 16, textAlign: 'center' },
  action: { marginTop: spacing.md, alignSelf: 'stretch' },
});