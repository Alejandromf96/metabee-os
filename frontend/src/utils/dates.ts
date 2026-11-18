const DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

export function greeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour >= 6 && hour < 12) return 'Buenos días';
  if (hour >= 12 && hour < 20) return 'Buenas tardes';
  return 'Buenas noches';
}

export function formatLongDate(date: Date = new Date()): string {
  return `${DAYS[date.getDay()]} ${date.getDate()} de ${MONTHS[date.getMonth()]}`;
}

export function displayName(email: string): string {
  const name = email.split('@')[0].replace(/[._-]+/g, ' ').trim();
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : 'de nuevo';
}