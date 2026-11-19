# API de Metabee OS

**Última actualización:** 18 de noviembre de 2026
**Versión de la API:** 0.1.0
**Framework:** FastAPI

---

## 1. Información general

| Elemento | Valor |
|---|---|
| URL base (desarrollo) | `http://localhost:8000` (o la IP local de la laptop desde el teléfono) |
| Formato | JSON, con la cabecera `Content-Type: application/json` |
| Documentación interactiva | `/docs` (Swagger) y `/redoc` |
| Autenticación | JWT en la cabecera `Authorization: Bearer <token>` |
| Duración del token | 30 minutos |

La documentación interactiva se genera automáticamente desde el código, y permite probar cada endpoint. Para autenticarse en ella, usa el botón **Authorize** y pega el token obtenido en el login.

---

## 2. Resumen de endpoints

| Método | Ruta | Autenticación | Descripción |
|---|---|---|---|
| GET | `/health` | No | Comprueba que la API responde |
| GET | `/health/db` | No | Comprueba que la API llega a la base de datos |
| POST | `/auth/register` | No | Crea un usuario |
| POST | `/auth/login` | No | Devuelve un token de acceso |
| GET | `/auth/me` | Sí | Devuelve el usuario autenticado |

---

## 3. Estado de la API

### `GET /health`

Respuesta `200`:

```json
{ "status": "ok" }
```

### `GET /health/db`

Ejecuta una consulta mínima contra PostgreSQL.

Respuesta `200`:

```json
{ "database": "ok" }
```

Si la base no responde, la API devuelve un error de servidor (`500`).

---

## 4. Autenticación

### `POST /auth/register`

Crea una cuenta. No inicia sesión: para obtener un token hay que llamar a `/auth/login`.

**Cuerpo:**

```json
{
  "email": "usuario@example.com",
  "password": "una_clave_segura"
}
```

| Campo | Reglas |
|---|---|
| `email` | Formato de correo válido; se guarda en minúsculas |
| `password` | Entre 8 y 128 caracteres |

**Respuesta `201`:**

```json
{
  "id": "0b1f3c64-8c5a-4a52-9b8f-3a9a0f4d2a11",
  "email": "usuario@example.com",
  "timezone": "America/Santiago"
}
```

La respuesta nunca incluye la contraseña ni su hash.

**Errores:**

| Código | Causa |
|---|---|
| `409` | El correo ya está registrado (la comparación no distingue mayúsculas) |
| `422` | Correo con formato inválido o contraseña fuera de rango |

### `POST /auth/login`

**Cuerpo:**

```json
{
  "email": "usuario@example.com",
  "password": "una_clave_segura"
}
```

**Respuesta `200`:**

```json
{
  "access_token": "eyJhbGciOi...",
  "token_type": "bearer"
}
```

**Errores:**

| Código | Causa |
|---|---|
| `401` | Correo o contraseña incorrectos. El mensaje es el mismo si el correo no existe, la clave es incorrecta o la cuenta está inactiva |
| `422` | Cuerpo con formato inválido |

### `GET /auth/me`

Devuelve el usuario dueño del token.

**Cabecera:**

```
Authorization: Bearer eyJhbGciOi...
```

**Respuesta `200`:**

```json
{
  "id": "0b1f3c64-8c5a-4a52-9b8f-3a9a0f4d2a11",
  "email": "usuario@example.com",
  "timezone": "America/Santiago"
}
```

**Errores:**

| Código | Causa |
|---|---|
| `401` | Token inválido, alterado, vencido, o usuario inexistente o inactivo |
| `401` o `403` | Falta la cabecera `Authorization` (el código depende de la versión de FastAPI) |

---

## 5. Formato de los errores

Los errores de la API devuelven un cuerpo con la clave `detail`:

```json
{ "detail": "El correo ya está registrado" }
```

En los errores de validación (`422`), `detail` es una lista con la ubicación y el motivo de cada campo inválido. El frontend los muestra con un mensaje genérico ("Revisa los datos ingresados").

| Código | Significado |
|---|---|
| `200` | Correcto |
| `201` | Recurso creado |
| `401` | No autenticado o credenciales inválidas |
| `403` | Sin permiso |
| `409` | Conflicto (recurso ya existente) |
| `422` | Datos de entrada inválidos |
| `500` | Error interno del servidor |

---

## 6. CORS

La API acepta peticiones de navegador solo desde orígenes locales de desarrollo, por ejemplo `http://localhost:8081` (la versión web de Expo). Las apps móviles no usan CORS.

Para abrir la versión web desde otra dirección (por ejemplo la IP local), hay que autorizarla en `app/main.py`.

---

## 7. Ejemplos con curl

Desde `cmd` de Windows, cuyas comillas se escapan distinto, es más cómodo usar `/docs`. En Git Bash o en otros sistemas:

```bash
# Registrar
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@example.com", "password": "una_clave_segura"}'

# Iniciar sesión
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@example.com", "password": "una_clave_segura"}'

# Consultar el usuario (reemplazar TOKEN por el access_token recibido)
curl http://localhost:8000/auth/me -H "Authorization: Bearer TOKEN"
```

---

## 8. Convenciones para endpoints futuros

- Un prefijo por módulo (`/habits`, `/tasks`, `/projects`, y así sucesivamente).
- Todo endpoint de datos personales exige autenticación con `get_current_user` y filtra por el usuario autenticado.
- Los esquemas de salida declaran explícitamente qué campos se devuelven.
- Los errores usan los códigos de la sección 5 y el formato `detail`.
- Cada endpoint nuevo se documenta en este archivo y se cubre con pruebas.
