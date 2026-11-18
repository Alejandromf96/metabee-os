import type { IconName } from '../../types/icons';

export type ModuleInfo = {
  title: string;
  description: string;
  phase: string;
  icon: IconName;
};

export const modules: ModuleInfo[] = [
  {
    title: 'Habit Tracker',
    description: 'Hábitos, rachas y estadísticas',
    phase: 'Fase 2',
    icon: 'repeat-outline',
  },
  {
    title: 'Task Manager',
    description: 'Tareas, prioridades y Kanban',
    phase: 'Fase 2',
    icon: 'checkbox-outline',
  },
  {
    title: 'Projects',
    description: 'Agrupa tareas por proyecto',
    phase: 'Fase 2',
    icon: 'folder-outline',
  },
  {
    title: 'Activity Tracker',
    description: 'Registro de actividades y tiempo',
    phase: 'Fase 2',
    icon: 'time-outline',
  },
  {
    title: 'Notes',
    description: 'Notas en Markdown con etiquetas',
    phase: 'Fase 2',
    icon: 'document-text-outline',
  },
  {
    title: 'Finance Manager',
    description: 'Ingresos, gastos y presupuestos',
    phase: 'Fase 3',
    icon: 'wallet-outline',
  },
  {
    title: 'Goals',
    description: 'Objetivos, hitos y progreso',
    phase: 'Fase 4',
    icon: 'trophy-outline',
  },
  {
    title: 'Metabee Assistant',
    description: 'Asistente de texto y voz',
    phase: 'Fase 5',
    icon: 'sparkles-outline',
  },
];