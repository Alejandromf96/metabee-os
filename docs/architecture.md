# Arquitectura de Metabee OS

**Última actualización:** 18 de noviembre de 2026
**Alcance:** estado al cierre del Sprint 1 (autenticación y Dashboard inicial).

---

## 1. Visión general

Metabee OS es un sistema de gestión personal modular. Usa una arquitectura **cliente-servidor** con un **monolito modular** en el backend: un único servicio organizado en módulos independientes, en lugar de microservicios.

```
Android / Web
      |
      v
Frontend (Expo + React Native)
      |   HTTP + JSON (JWT en el encabezado Authorization)
      v
Backend (FastAPI)
      |
 --------------------
 |        |         |
Auth    (Habits)  (Tasks) ...   módulos; hoy solo Auth existe
 |
 --------------------
      |
      v
PostgreSQL
```

El frontend nunca habla con la base de datos: toda operación pasa por la API. Esto permite que la misma API sirva a la app web, a Android y, más adelante, al asistente Metabee.

---

## 2. Tecnologías

| Capa | Tecnología | Responsabilidad |
|---|---|---|
| Backend | Python 3.11, FastAPI | API REST |
| Validación | Pydantic | Forma y reglas de los datos de entrada y salida |
| Acceso a datos | SQLAlchemy 2 | Traduce clases de Python a SQL |
| Migraciones | Alembic | Historial versionado de la estructura de la base |
| Base de datos | PostgreSQL 18 | Persistencia |
| Autenticación | JWT (PyJWT), Argon2id (argon2-cffi) | Sesión sin estado y hash de contraseñas |
| Pruebas | Pytest, httpx | Pruebas automáticas del backend (preparadas, pendientes de ejecutar) |
| Frontend | Expo (SDK 58), React Native, TypeScript | App web y Android |
| Navegación | Expo Router | Rutas basadas en archivos |
| Almacenamiento del token | expo-secure-store (Android), localStorage (web) | Persistir la sesión |

---

## 3. Backend

### 3.1 Organización

```
backend/
├── app/
│   ├── main.py              Aplicación FastAPI, CORS, routers y /health
│   ├── core/
│   │   ├── config.py        Configuración leída desde .env
│   │   └── security.py      Hash de contraseñas y tokens JWT
│   ├── database/
│   │   └── session.py       Motor, sesiones y Base de los modelos
│   └── modules/
│       └── auth/
│           ├── models.py        Tabla users
│           ├── schemas.py       Datos de entrada y salida
│           ├── dependencies.py  get_current_user (protege endpoints)
│           └── router.py        /auth/register, /auth/login, /auth/me
├── migrations/              Alembic
└── tests/                   Pytest (pendiente)
```

### 3.2 Reglas de la estructura

- **Un módulo por área** (`auth`, y a futuro `habits`, `tasks`, `projects`, `activities`, `notes`, `finance`, `goals`, `automation`). Cada uno repite la misma forma: `models`, `schemas`, `router` y, si hace falta, `dependencies`.
- **`core/`** contiene lo transversal (configuración y seguridad). **`database/`** contiene la conexión.
- Los módulos pueden depender de `core/` y `database/`, pero no al revés.
- Los módulos se comunican a través de la base de datos y de funciones explícitas, no importando los routers entre sí.

### 3.3 Cómo agregar un módulo nuevo

1. Crear `app/modules/<nombre>/` con `__init__.py`, `models.py`, `schemas.py` y `router.py`.
2. Hacer que el modelo herede de `Base` e incluir una columna `user_id` que apunte a `users.id`.
3. Importar el modelo en `migrations/env.py`, para que Alembic lo detecte.
4. Generar y aplicar la migración (`alembic revision --autogenerate` y `alembic upgrade head`).
5. Proteger los endpoints con `Depends(get_current_user)` y filtrar siempre por el usuario actual.
6. Registrar el router en `main.py` con `app.include_router(...)`.
7. Escribir las pruebas del módulo en `tests/`.

### 3.4 Ciclo de una petición

1. Llega la petición HTTP.
2. FastAPI enruta y Pydantic valida el cuerpo; si es inválido responde `422`.
3. `get_db` abre una sesión de base de datos para esa petición.
4. Si el endpoint es protegido, `get_current_user` lee el token, comprueba firma y expiración y carga el usuario.
5. El endpoint ejecuta su lógica con SQLAlchemy.
6. Se responde con un esquema de salida (que nunca incluye datos sensibles como el hash).
7. `get_db` cierra la sesión, incluso si hubo un error.

---

## 4. Autenticación

### 4.1 Registro

1. El cliente envía correo y contraseña a `POST /auth/register`.
2. Se valida el formato del correo y el largo de la contraseña (8 a 128 caracteres).
3. El correo se normaliza a minúsculas y se comprueba que no exista; si existe, responde `409`.
4. La contraseña se transforma con **Argon2id** y solo se guarda el hash.
5. Se responde con los datos públicos del usuario.

### 4.2 Inicio de sesión

1. El cliente envía correo y contraseña a `POST /auth/login`.
2. Se busca el usuario y se verifica la contraseña contra el hash.
3. Si algo falla (correo inexistente, clave incorrecta o cuenta inactiva), la respuesta es **la misma** (`401`, mismo mensaje), para no revelar qué correos están registrados.
4. Si es correcto, se emite un **JWT** firmado con `SECRET_KEY`, con el id del usuario (`sub`) y una expiración de 30 minutos.

### 4.3 Acceso a recursos protegidos

El cliente envía `Authorization: Bearer <token>`. La dependencia `get_current_user` valida el token, comprueba que el usuario exista y esté activo, y lo entrega al endpoint. Cualquier fallo responde `401`.

La API no guarda sesiones: la validez del acceso vive en el token. Cerrar sesión consiste en borrar el token del dispositivo.

---

## 5. Frontend

### 5.1 Organización

```
frontend/src/
├── app/            Pantallas (Expo Router)
│   ├── _layout.tsx     Marco global: proveedor de sesión y tema
│   ├── index.tsx       Dashboard
│   ├── login.tsx
│   └── register.tsx
├── components/     Componentes reutilizables (Button, TextField, Card, StatCard, ModuleCard, WeekBars, Loading)
├── context/        AuthContext: estado global de sesión
├── features/       Datos y lógica por área (hoy: dashboard/modules.ts)
├── services/       Comunicación con la API y almacenamiento del token
├── theme/          Colores, espaciados y radios
├── types/          Tipos compartidos
└── utils/          Funciones auxiliares
```

### 5.2 Gestión de sesión

- `AuthProvider` envuelve toda la app y expone `user`, `loading`, `signIn`, `signUp` y `signOut`.
- Al arrancar, comprueba si hay un token guardado y lo valida con `GET /auth/me`. Mientras tanto `loading` es verdadero, para no mostrar login por error.
- Cada pantalla decide su redirección: sin sesión, el Dashboard lleva a `/login`; con sesión, `/login` y `/register` llevan al Dashboard.
- Si el token está vencido o es inválido (`401`), se borra. Si el fallo es de red, **no** se cierra la sesión.

### 5.3 Comunicación con la API

Todas las llamadas pasan por `apiFetch`, que añade la URL base (`EXPO_PUBLIC_API_URL`), las cabeceras comunes y convierte los errores en `ApiError` con el código de estado y un mensaje legible.

### 5.4 Interfaz

Tema oscuro con acentos cyan y violeta, definido en `theme/colors.ts`. Los componentes se adaptan a teléfono y escritorio con `flexWrap` y un ancho máximo, sin lógica de tamaños. Principio de diseño: la interfaz ayuda y no presiona; no se castigan los días improductivos ni se inventan cifras (los datos de ejemplo se marcan como tales).

---

## 6. Seguridad

- Contraseñas con **Argon2id**; nunca se guardan ni se devuelven.
- Tokens de duración limitada (30 minutos), firmados con una clave que vive solo en el `.env`.
- **UUID** como identificadores, no adivinables.
- Los esquemas de salida excluyen datos sensibles.
- Respuestas de login indistinguibles entre correo inexistente y clave incorrecta.
- **CORS** limitado a orígenes locales de desarrollo.
- Secretos fuera de Git (`.env` ignorado, `.env.example` como plantilla).
- En Android el token se guarda cifrado (`expo-secure-store`). En web queda en `localStorage`, legible por scripts de la página: aceptable en desarrollo, a revisar antes de un despliegue real.
- Pendiente para producción: HTTPS, límites de intentos de login y revisión de la política de CORS.

---

## 7. Entorno de desarrollo

- Laptop Windows con recursos limitados, por lo que se priorizan herramientas livianas: VS Code, Expo Go en un Android físico, sin emulador y sin Docker por ahora.
- El teléfono se conecta a la API por la IP local de la laptop; uvicorn debe arrancar con `--host 0.0.0.0`.
- Puertos: API `8000`, Expo web `8081`, PostgreSQL `5432`.
- Detalle de comandos en `docs/progreso-sprint-1.md` y en el `README.md`.

---

## 8. Decisiones de diseño

| Decisión | Motivo |
|---|---|
| Monolito modular | Menos complejidad operativa que microservicios, con módulos que pueden separarse más adelante |
| PostgreSQL desde el inicio | Es la base que se usará en producción; SQLite queda como plan B local |
| Alembic para todo cambio de estructura | Cambios reproducibles y versionados |
| JWT sin estado | La API no guarda sesiones; simple de escalar |
| Contexto de React para la sesión | Un único lugar que sabe quién está conectado |
| Gráficos con componentes propios | Evitar dependencias innecesarias mientras no haya datos reales |
| Pruebas con una base aparte (`metabee_test`) | Las pruebas nunca tocan los datos reales |

---

## 9. Evolución prevista

| Fase | Contenido |
|---|---|
| 2 | Dashboard con datos reales, Habit Tracker, Task Manager, Projects, Activity Tracker, Notes |
| 3 | Finanzas: transacciones, categorías, presupuestos y reportes |
| 4 | Objetivos y análisis: Goals, hitos y relaciones con tareas y hábitos |
| 5 | Metabee Assistant: texto y voz, usando las mismas APIs con permisos del usuario |
| 6 | Motor de automatizaciones: eventos, condiciones, acciones y notificaciones |
