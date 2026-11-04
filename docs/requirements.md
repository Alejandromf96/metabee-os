# METABEE OS
## Documento maestro del proyecto
**Versión:** 1.0  
**Fecha:** 3 de noviembre de 2026  
**Estado:** Planificación y preparación del entorno  
**Desarrollador:** Alejandro Monasterios

---

# 1. ¿Qué es Metabee OS?

Metabee OS es un sistema de gestión personal (*Personal Operating System*) diseñado para centralizar diferentes aspectos de la vida cotidiana en una sola plataforma.

La idea es construir una aplicación que permita administrar productividad, hábitos, tareas, proyectos, finanzas, objetivos, notas y actividades, incorporando progresivamente un asistente inteligente llamado Metabee.

No queremos crear simplemente otra aplicación de tareas. Queremos desarrollar un ecosistema que permita organizar información, conectar diferentes áreas y automatizar acciones.

### Visión del proyecto

Construir un sistema personal inteligente, modular y multiplataforma que permita gestionar información y actividades desde un único lugar, visualizar el progreso y facilitar la toma de decisiones.

### Objetivos principales

- Centralizar información personal.
- Mejorar la organización y productividad.
- Registrar hábitos y visualizar avances.
- Administrar tareas, proyectos y objetivos.
- Controlar ingresos, gastos y presupuestos.
- Registrar actividades y tiempo dedicado.
- Automatizar procesos repetitivos.
- Incorporar un asistente de texto y voz.
- Aprender y aplicar buenas prácticas de desarrollo de software.

### Filosofía

Metabee OS debe ayudar, no convertirse en una fuente adicional de presión.

No buscamos una aplicación que castigue los días improductivos, sino una herramienta que permita comprender nuestros hábitos, organizar prioridades y avanzar progresivamente.

---

# 2. Módulos principales

El sistema estará dividido en módulos independientes que se comunicarán entre sí.

## 2.1 Dashboard

Será la pantalla principal de Metabee OS.

Permitirá visualizar:

- Resumen del día.
- Tareas pendientes.
- Hábitos y progreso.
- Objetivos activos.
- Resumen financiero.
- Actividades recientes.
- Indicadores y estadísticas.

El Dashboard será personalizable mediante widgets.

## 2.2 Habit Tracker

Sistema para administrar hábitos.

Funcionalidades:

- Crear, editar y eliminar hábitos.
- Configurar frecuencia.
- Registrar cumplimiento.
- Consultar rachas.
- Visualizar estadísticas.
- Consultar historial.

Ejemplos: estudiar Python, entrenar, leer o dormir a una hora determinada.

## 2.3 Task Manager

Sistema de administración de tareas.

Funcionalidades:

- Crear y organizar tareas.
- Definir prioridades.
- Establecer fechas límite.
- Administrar estados.
- Crear subtareas.
- Asociar tareas a proyectos.
- Visualizar tareas en listas o Kanban.

## 2.4 Projects

Permite agrupar tareas relacionadas con proyectos específicos.

Ejemplos:

- Metabee OS.
- Desarrollo profesional.
- Proyectos personales.
- Estudios.

Cada proyecto tendrá información, estado, fechas y tareas asociadas.

## 2.5 Activity Tracker

Registro cronológico de actividades.

Permitirá:

- Registrar actividades manualmente.
- Registrar duración.
- Consultar historial.
- Asociar actividades con proyectos.
- Visualizar cómo se distribuye el tiempo.

También podrá recibir eventos generados por otros módulos.

## 2.6 Notes

Sistema de notas y conocimiento personal.

Funcionalidades:

- Crear notas rápidas.
- Editar contenido.
- Utilizar Markdown.
- Organizar mediante etiquetas.
- Fijar notas importantes.
- Buscar información.

## 2.7 Finance Manager

Módulo de administración financiera.

Funcionalidades:

- Registrar ingresos.
- Registrar gastos.
- Crear categorías.
- Configurar presupuestos.
- Registrar movimientos recurrentes.
- Consultar balances.
- Visualizar reportes.

La moneda inicial será CLP, aunque el diseño permitirá incorporar otras monedas.

## 2.8 Goals

Sistema de objetivos personales.

Permitirá:

- Crear objetivos.
- Establecer fechas.
- Definir hitos.
- Asociar tareas.
- Asociar hábitos.
- Consultar progreso.

Ejemplo:

**Objetivo:** Conseguir un trabajo como desarrollador Python.

Este objetivo puede relacionarse con:
- Un hábito de estudio diario.
- Tareas para aprender FastAPI.
- Un proyecto de portafolio.
- Notas de aprendizaje.
- Actividades que registren las horas de estudio.

## 2.9 Metabee Assistant

Será el asistente inteligente del sistema.

Inicialmente será una interfaz de texto y posteriormente incorporará voz.

Ejemplos:

- "Metabee, ¿qué tareas tengo pendientes?"
- "Registra que estudié Python durante una hora".
- "Agrega un gasto de 8.000 pesos en alimentación".
- "¿Cómo voy con mis objetivos?"

Metabee no será solamente un chatbot: interactuará con las funcionalidades del sistema mediante APIs controladas.

El asistente de voz desarrollado anteriormente en Python podrá evolucionar e integrarse con este módulo.

## 2.10 Automation Engine

Motor de automatizaciones.

Ejemplos:

- Completar una tarea puede generar una actividad.
- Completar un hábito actualiza las estadísticas.
- Superar un presupuesto puede generar una notificación.
- Generar un resumen semanal automáticamente.

Este módulo se desarrollará cuando los módulos principales estén funcionando.

---

# 3. Diseño y experiencia de usuario

La interfaz tendrá una estética futurista inspirada en asistentes como JARVIS.

### Dirección visual

- Tema oscuro.
- Acentos cyan y violeta.
- Paneles tecnológicos.
- Gráficos y estadísticas.
- Animaciones moderadas.
- Tipografía legible.
- Diseño adaptable a escritorio y dispositivos móviles.

La prioridad será conseguir una interfaz moderna y funcional, no sacrificar usabilidad por efectos visuales.

### Plataformas

Metabee OS estará disponible inicialmente en:

- Web: acceso desde navegador.
- Android: aplicación ejecutada durante el desarrollo mediante Expo Go.

Se compartirá buena parte del código, aunque algunos componentes y diseños tendrán adaptaciones específicas para escritorio y móvil.

---

# 4. Tecnologías seleccionadas

## Backend

| Tecnología | Uso |
|---|---|
| Python | Lenguaje principal |
| FastAPI | API REST |
| PostgreSQL | Base de datos |
| SQLAlchemy 2 | ORM |
| Alembic | Migraciones |
| Pydantic | Validación de datos |
| Pytest | Pruebas |
| JWT | Autenticación |
| Argon2id | Hash de contraseñas |

## Frontend

| Tecnología | Uso |
|---|---|
| React Native | Interfaz |
| Expo | Desarrollo multiplataforma |
| TypeScript | Tipado |
| Expo Router | Navegación |
| StyleSheet | Estilos iniciales |

Se evaluará NativeWind si resulta conveniente para mantener un sistema visual consistente.

## Herramientas de desarrollo

- Visual Studio Code.
- Git y GitHub.
- Node.js y npm.
- Python y entornos virtuales.
- Expo Go.
- Docker, cuando sea conveniente.
- Terminal de Windows o Git Bash.

---

# 5. Arquitectura del sistema

Utilizaremos una arquitectura cliente-servidor con un **monolito modular**.

Esto significa que tendremos un único backend organizado en módulos independientes, en lugar de comenzar con microservicios.

### Funcionamiento general

1. El usuario interactúa con la aplicación web o móvil.
2. El frontend envía solicitudes al backend.
3. FastAPI procesa las solicitudes.
4. El backend consulta o modifica PostgreSQL.
5. La respuesta vuelve al frontend.
6. La interfaz actualiza la información.

### Arquitectura conceptual

    Android / Web
          |
          v
    Frontend Expo
          |
          v
       FastAPI
          |
     -------------
     |     |     |
    Auth Tasks Habits
     |     |     |
     -------------
          |
          v
      PostgreSQL

Metabee Assistant se integrará posteriormente mediante las APIs del backend.

### Consideraciones de seguridad

- Identificadores UUID.
- Contraseñas almacenadas mediante hash seguro.
- Tokens de acceso de duración limitada.
- Control de acceso por usuario.
- Validación de datos.
- Variables sensibles mediante archivos de entorno.
- HTTPS en producción.
- Fechas almacenadas en UTC y zona horaria configurable por usuario.

---

# 6. Estructura inicial del repositorio

Utilizaremos un monorepositorio para mantener frontend, backend y documentación dentro del mismo proyecto.

### Estructura objetivo

    metabee-os/
    │
    ├── backend/
    │   ├── app/
    │   │   ├── api/
    │   │   ├── core/
    │   │   ├── database/
    │   │   ├── modules/
    │   │   │   ├── auth/
    │   │   │   ├── habits/
    │   │   │   ├── tasks/
    │   │   │   ├── projects/
    │   │   │   ├── activities/
    │   │   │   ├── notes/
    │   │   │   ├── finance/
    │   │   │   ├── goals/
    │   │   │   └── automation/
    │   │   └── main.py
    │   ├── migrations/
    │   ├── tests/
    │   └── requirements.txt
    │
    ├── frontend/
    │   ├── app/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── features/
    │   │   ├── services/
    │   │   ├── hooks/
    │   │   ├── theme/
    │   │   ├── types/
    │   │   └── utils/
    │   ├── assets/
    │   └── package.json
    │
    ├── docs/
    │   ├── requirements.md
    │   ├── architecture.md
    │   ├── database.md
    │   └── api.md
    │
    ├── .gitignore
    ├── README.md
    └── docker-compose.yml

**Importante:** esta es la estructura objetivo, no significa que debamos crear todas las carpetas desde el primer día. Iremos incorporándolas cuando las necesitemos.

### Estructura de inicio

Para comenzar solamente necesitamos:

    metabee-os/
    ├── assets/
    ├── docs/
    ├── .gitignore
    └── README.md

Después agregaremos `backend/` y `frontend/`.

---

# 7. Modelo de datos inicial

La base de datos tendrá como entidades principales:

| Entidad | Responsabilidad |
|---|---|
| users | Usuarios |
| user_settings | Preferencias |
| habits | Hábitos |
| habit_schedules | Frecuencias |
| habit_logs | Registros de hábitos |
| tasks | Tareas |
| projects | Proyectos |
| activities | Actividades |
| notes | Notas |
| tags | Etiquetas |
| note_tags | Relación entre notas y etiquetas |
| goals | Objetivos |
| goal_milestones | Hitos |
| goal_tasks | Relación objetivos y tareas |
| goal_habits | Relación objetivos y hábitos |
| financial_transactions | Movimientos financieros |
| financial_categories | Categorías financieras |
| budgets | Presupuestos |
| automation_rules | Reglas de automatización |
| automation_executions | Historial de ejecuciones |

Las entidades personales estarán asociadas a un usuario.

Aunque inicialmente Metabee OS será de uso personal, diseñaremos la base de datos para permitir múltiples usuarios en el futuro.

No implementaremos todas estas tablas en el primer sprint. El modelo crecerá según las funcionalidades que desarrollemos.

---

# 8. Plan de desarrollo

El desarrollo se dividirá en etapas para evitar intentar construir todo al mismo tiempo.

## Fase 1 — Fundamentos y autenticación

**Objetivo:** tener una aplicación funcional en la que podamos registrarnos, iniciar sesión y acceder a un Dashboard inicial.

Actividades:

- Preparar repositorio.
- Configurar Python.
- Configurar Node.js.
- Preparar FastAPI.
- Configurar PostgreSQL.
- Integrar SQLAlchemy y Alembic.
- Crear modelo de usuario.
- Implementar registro e inicio de sesión.
- Crear proyecto Expo.
- Diseñar sistema visual inicial.
- Crear pantallas de autenticación.
- Conectar frontend y backend.
- Probar en navegador y Android.

## Fase 2 — Productividad

**Objetivo:** comenzar a utilizar Metabee OS para organizar actividades reales.

Módulos:

- Dashboard.
- Habit Tracker.
- Task Manager.
- Projects.
- Activity Tracker.
- Notes.
- Captura rápida de información.

## Fase 3 — Finanzas

**Objetivo:** administrar ingresos, gastos y presupuestos.

Módulos:

- Registro de transacciones.
- Categorías.
- Presupuestos.
- Reportes.
- Estadísticas.

## Fase 4 — Objetivos y análisis

**Objetivo:** conectar diferentes áreas y visualizar el progreso.

Módulos:

- Goals.
- Hitos.
- Relaciones entre objetivos, tareas y hábitos.
- Estadísticas generales.
- Indicadores de productividad.

## Fase 5 — Metabee Assistant

**Objetivo:** integrar el asistente inteligente.

Módulos:

- Interfaz de conversación.
- Consultas al backend.
- Creación de tareas y notas.
- Registro de actividades.
- Integración de voz.
- Contexto y permisos del usuario.

## Fase 6 — Automatizaciones

**Objetivo:** reducir tareas manuales.

Módulos:

- Motor de eventos.
- Condiciones.
- Acciones.
- Notificaciones.
- Historial de ejecuciones.

---

# 9. Sprint 1 — Plan de trabajo

El primer sprint estará dedicado a construir los fundamentos.

Duración estimada: 10 sesiones de trabajo, ajustables según dificultades y disponibilidad.

Disponibilidad diaria estimada: 30–60 minutos.

| Sesión | Actividad |
|---|---|
| 1 | Crear repositorio y estructura inicial |
| 2 | Preparar Python y entorno virtual |
| 3 | Preparar PostgreSQL |
| 4 | Crear proyecto FastAPI |
| 5 | Integrar SQLAlchemy y Alembic |
| 6 | Crear modelo de usuario |
| 7 | Registro, login y JWT |
| 8 | Crear proyecto Expo |
| 9 | Pantallas de autenticación y conexión |
| 10 | Dashboard inicial, pruebas y documentación |

El orden podrá ajustarse si alguna tarea requiere más tiempo.

### Criterios para considerar terminado el Sprint 1

- Repositorio en GitHub.
- Backend ejecutándose localmente.
- Base de datos conectada.
- Registro de usuario funcional.
- Inicio de sesión funcional.
- Aplicación Expo ejecutándose.
- Aplicación visible en Android.
- Frontend conectado al backend.
- Dashboard inicial accesible.

---

# 10. Configuración del entorno personal

El equipo disponible es una laptop Windows con recursos limitados:

- 8 GB de RAM.
- Procesador Intel Core i7 de octava generación.
- Disco duro HDD de 1 TB.
- Sin SSD.

Por este motivo, priorizaremos herramientas livianas.

### Decisiones técnicas

- VS Code como editor.
- Android físico como dispositivo de pruebas.
- Expo Go para ejecutar la aplicación.
- Sin Android Studio.
- Sin emuladores.
- Docker no se instalará hasta evaluar su conveniencia.
- Desarrollo mediante terminal y herramientas locales.

### Flujo de pruebas

1. Programar desde VS Code.
2. Ejecutar Expo en la laptop.
3. Escanear el código QR desde Expo Go.
4. Visualizar la aplicación en Android.
5. Realizar cambios y probarlos.
6. Ejecutar el backend localmente.
7. Conectar el teléfono a la API mediante la IP local de la laptop.

Cuando conectemos Android con FastAPI, el backend deberá escuchar en `0.0.0.0` y el teléfono utilizará la IP local de la laptop, no `localhost`.

Ambos dispositivos deberán estar conectados a la misma red Wi-Fi y Windows Firewall deberá permitir la conexión.

### Dependencias iniciales pendientes de verificar

- Node.js LTS.
- npm.
- Python.
- Git.
- Expo Go en Android.

La primera comprobación pendiente es ejecutar:

    node -v
    npm -v

Si Node.js no está instalado, instalaremos la versión LTS desde https://nodejs.org/.

---

# 11. Metodología de trabajo

El proyecto se desarrollará de manera incremental.

No queremos copiar grandes cantidades de código sin entender qué estamos haciendo.

### Reglas de desarrollo

1. Trabajar una tarea pequeña a la vez.
2. Entender el propósito de cada tecnología.
3. Crear código progresivamente.
4. Probar cada funcionalidad antes de continuar.
5. Utilizar Git para registrar avances.
6. Documentar decisiones importantes.
7. Mantener una arquitectura organizada.
8. Evitar instalar herramientas innecesarias.
9. No implementar módulos antes de necesitarlos.
10. Priorizar funcionalidades terminadas sobre funcionalidades incompletas.

### Flujo de cada sesión

- Revisar el objetivo de la sesión.
- Identificar qué necesitamos aprender.
- Implementar una parte pequeña.
- Probar que funciona.
- Revisar errores.
- Guardar los cambios en Git.
- Documentar el avance.

---

# 12. Objetivo personal del proyecto

Metabee OS también representa una oportunidad para profundizar conocimientos y fortalecer el perfil profesional.

Durante su desarrollo se buscará aprender y practicar:

- Diseño de arquitecturas.
- Desarrollo backend con Python.
- Diseño y administración de bases de datos.
- APIs REST.
- Autenticación y seguridad.
- Desarrollo multiplataforma.
- TypeScript y React Native.
- Git y trabajo con repositorios.
- Pruebas automatizadas.
- Integración de inteligencia artificial.
- Automatización de procesos.

El proyecto deberá evolucionar hasta convertirse en una pieza importante del portafolio profesional, mostrando no solamente una interfaz, sino también decisiones técnicas, arquitectura, documentación y funcionalidades reales.

---

# 13. Estado actual y próximos pasos

**Estado:** preparación del entorno y comienzo del Sprint 1.

Decisiones confirmadas:

- [x] Nombre: Metabee OS.
- [x] Enfoque: Personal Operating System.
- [x] Arquitectura: monolito modular.
- [x] Backend: Python + FastAPI.
- [x] Base de datos: PostgreSQL.
- [x] Frontend: Expo + React Native + TypeScript.
- [x] Plataformas: Web y Android.
- [x] Pruebas móviles: Expo Go.
- [x] Sin emulador Android.
- [x] Desarrollo paso a paso.
- [x] Disponibilidad: 30–60 minutos diarios.

Pendiente:

- [ ] Verificar Node.js y npm.
- [ ] Confirmar Python y Git.
- [ ] Completar repositorio inicial en GitHub.
- [ ] Instalar Expo Go en Android.
- [ ] Crear el proyecto frontend.
- [ ] Preparar el backend.

### Próxima actividad

Comprobar la instalación de Node.js desde la terminal de VS Code:

    node -v
    npm -v

A partir de ese resultado continuaremos con la preparación de Expo y la primera ejecución de Metabee OS en Android.

---

**METABEE OS**  
*Your Personal Operating System.*

Un proyecto para construir, aprender, organizar y evolucionar.