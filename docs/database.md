# Base de datos de Metabee OS

**Última actualización:** 18 de noviembre de 2026
**Motor:** PostgreSQL 18
**Acceso desde Python:** SQLAlchemy 2 (driver `psycopg`)
**Migraciones:** Alembic

---

## 1. Entornos

| Entorno | Base | Uso |
|---|---|---|
| Desarrollo | `metabee_db` | Datos reales de desarrollo, usados por la app |
| Pruebas | `metabee_test` | Solo para Pytest; se crea y se vacía en cada prueba (pendiente de configurar) |

Usuario de la aplicación: `metabee`, dueño de ambas bases y sin permiso para crear otras. El superusuario `postgres` se usa únicamente para administración.

La conexión se define en `backend/.env` con la variable `DATABASE_URL`, con este formato:

```
postgresql+psycopg://usuario:clave@localhost:5432/nombre_db
```

---

## 2. Convenciones

- **Identificadores:** UUID en todas las tablas.
- **Fechas:** se guardan con zona horaria y en UTC. Cada usuario tiene una zona horaria configurable (`timezone`) que se aplica solo al mostrar.
- **Propiedad:** toda entidad personal lleva una columna `user_id` que apunta a `users.id`, y todas las consultas se filtran por el usuario autenticado. Aunque hoy el uso sea personal, el diseño admite varios usuarios.
- **Moneda inicial:** CLP, con diseño que admite otras.
- **Estructura:** ningún cambio se hace a mano; se genera una migración con Alembic y se versiona en Git.
- **Nombres:** tablas en plural y minúsculas (`users`, `habits`), columnas en minúsculas con guion bajo.

---

## 3. Tablas actuales

### `users`

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | UUID | Clave primaria, generado por la aplicación | Identificador del usuario |
| `email` | VARCHAR(255) | Único, indexado, siempre en minúsculas | Correo de acceso |
| `hashed_password` | VARCHAR(255) | Obligatorio | Hash Argon2id de la contraseña (nunca la contraseña) |
| `is_active` | BOOLEAN | Por defecto verdadero | Permite desactivar una cuenta sin borrarla |
| `timezone` | VARCHAR(64) | Por defecto `America/Santiago` | Zona horaria del usuario |
| `created_at` | TIMESTAMP con zona horaria | Por defecto la hora del servidor | Fecha de creación |

### `alembic_version`

Tabla interna de Alembic que guarda la versión de migración aplicada. No se modifica a mano.

---

## 4. Modelo previsto

Entidades del plan original, con la fase en que se prevé crearlas. Solo `users` existe hoy; el modelo crece según las funcionalidades.

| Entidad | Responsabilidad | Fase |
|---|---|---|
| `users` | Usuarios | 1 (hecha) |
| `user_settings` | Preferencias | 2 |
| `habits` | Hábitos | 2 |
| `habit_schedules` | Frecuencias | 2 |
| `habit_logs` | Registros de hábitos | 2 |
| `tasks` | Tareas | 2 |
| `projects` | Proyectos | 2 |
| `activities` | Actividades | 2 |
| `notes` | Notas | 2 |
| `tags` | Etiquetas | 2 |
| `note_tags` | Relación entre notas y etiquetas | 2 |
| `financial_categories` | Categorías financieras | 3 |
| `financial_transactions` | Movimientos financieros | 3 |
| `budgets` | Presupuestos | 3 |
| `goals` | Objetivos | 4 |
| `goal_milestones` | Hitos | 4 |
| `goal_tasks` | Relación objetivos y tareas | 4 |
| `goal_habits` | Relación objetivos y hábitos | 4 |
| `automation_rules` | Reglas de automatización | 6 |
| `automation_executions` | Historial de ejecuciones | 6 |

---

## 5. Migraciones con Alembic

Se ejecutan desde `backend`, con el entorno virtual activo.

**Generar una migración** después de cambiar o crear un modelo:

```bash
alembic revision --autogenerate -m "descripcion del cambio"
```

Revisar siempre el archivo generado en `migrations/versions/`: debe contener las operaciones esperadas (por ejemplo `create_table`) y no solo `pass`.

**Aplicar migraciones:**

```bash
alembic upgrade head
```

**Ver el estado:**

```bash
alembic current
alembic heads
```

**Revertir una versión:**

```bash
alembic downgrade -1
```

### Requisitos para que Alembic detecte un modelo

- El modelo hereda de `Base` (`app/database/session.py`).
- El módulo del modelo se importa en `migrations/env.py`.
- El archivo del modelo está guardado y no vacío.

### Reiniciar el historial (solo en desarrollo y sin datos reales)

Si el historial queda desalineado con la base (`Target database is not up to date`):

```bash
del migrations\versions\*.py
psql -U metabee -d metabee_db -c "DELETE FROM alembic_version;"
alembic revision --autogenerate -m "estructura inicial"
alembic upgrade head
```

Esto no debe hacerse cuando existan datos que importen.

---

## 6. Comandos útiles de psql

```bash
psql -U metabee -d metabee_db
```

| Comando | Qué hace |
|---|---|
| `\dt` | Lista las tablas |
| `\d users` | Muestra la estructura de la tabla `users` |
| `\q` | Sale de psql |
| `SELECT email, created_at FROM users;` | Lista los usuarios (el hash no es la contraseña) |

Los comandos SQL terminan con `;`. Si el prompt cambia a `-#`, falta el `;`.

---

## 7. Respaldo

Para guardar una copia de la base de desarrollo:

```bash
pg_dump -U metabee -d metabee_db -f respaldo_metabee.sql
```

Para restaurarla en una base vacía:

```bash
psql -U metabee -d metabee_db -f respaldo_metabee.sql
```

Los respaldos contienen datos personales y hashes: no se suben a Git.
