import { Ionicons } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card } from '../components/Card';
import { Loading } from '../components/Loading';
import { ModuleCard } from '../components/ModuleCard';
import { StatCard } from '../components/StatCard';
import { WeekBars } from '../components/WeekBars';
import { useAuth } from '../context/AuthContext';
import { modules } from '../features/dashboard/modules';
import { colors, radius, spacing } from '../theme/colors';
import { displayName, formatLongDate, greeting } from '../utils/dates';

const WEEK_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const SAMPLE_WEEK = [3, 5, 2, 6, 4, 1, 0];

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Redirect href="/login" />;
  }

  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.date}>{formatLongDate()}</Text>
          <Text style={styles.greeting}>
            {greeting()}, {displayName(user.email)}
          </Text>
          <Text style={styles.subtitle}>Un paso a la vez. Hoy basta con avanzar.</Text>
        </View>
        <Pressable
          onPress={signOut}
          accessibilityLabel="Cerrar sesión"
          style={({ pressed }) => [styles.logout, pressed && styles.pressed]}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.textMuted} />
        </Pressable>
      </View>

      <View style={styles.row}>
        <StatCard
          icon="checkbox-outline"
          label="Tareas de hoy"
          value="—"
          hint="Disponible en Fase 2"
        />
        <StatCard
          icon="flame-outline"
          label="Racha de hábitos"
          value="—"
          hint="Disponible en Fase 2"
          accent={colors.violet}
        />
        <StatCard
          icon="wallet-outline"
          label="Balance del mes"
          value="—"
          hint="Disponible en Fase 3"
        />
      </View>

      <Card style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.sectionTitle}>Actividad de la semana</Text>
          <View style={styles.sampleBadge}>
            <Text style={styles.sampleText}>Datos de ejemplo</Text>
          </View>
        </View>
        <WeekBars
          values={SAMPLE_WEEK}
          labels={WEEK_LABELS}
          highlightIndex={todayIndex}
        />
      </Card>

      <Text style={styles.sectionTitle}>Módulos</Text>
      <View style={styles.row}>
        {modules.map((module) => (
          <ModuleCard key={module.title} {...module} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
  },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  headerText: { flex: 1, gap: spacing.xs },
  date: { color: colors.violet, fontSize: 13, textTransform: 'capitalize' },
  greeting: { color: colors.text, fontSize: 28, fontWeight: '700' },
  subtitle: { color: colors.textMuted, fontSize: 14 },
  logout: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.6 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  chartCard: { gap: spacing.md },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '600' },
  sampleBadge: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  sampleText: { color: colors.textMuted, fontSize: 11 },
});