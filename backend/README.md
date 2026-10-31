# BA Protege+ — Backend

API REST del proyecto **Control Parental (E13)**, developed in **Express + TypeScript**.

- **Base URL local:** `http://localhost:3000`
- **Variables de entorno:** copiá `.env.example` a `.env` (ver [Configuración](#configuración)).
- **Health check:** `GET /health`

---

## Configuración

```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev            # desarrollo con recarga
npm run build && npm start   # producción
npm test               # pruebas de integración (jest + supertest)
```

| Variable | Descripción | Default |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | `development` \| `production` \| `test` | — |
| `JWT_SECRET` | Clave de firma de los JWT | clave por defecto (**cambiar en despliegue**) |

> Si `JWT_SECRET` no está definido, el servidor emite un warning al arrancar y usa la clave por defecto. **Nunca despliegues así.**

---

## Hito 1 — Onboarding, Autenticación y Selección de Rol

### Modelo de datos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `string` (uuid) | Identificador del usuario |
| `email` | `string` | Normalizado a minúsculas |
| `passwordHash` | `string` | Hash bcrypt — **nunca se devuelve en la API** |
| `name` | `string` | Nombre completo |
| `telefono` | `string?` | Teléfono de contacto |
| `rol` | `'responsable' \| 'tutor'` | Perfil del usuario, derivado de `esResponsable` |
| `mode` | `'adulto' \| 'dispositivo_protegido'` | Modo de uso, actualizado vía `PATCH /api/auth/me/mode` |
| `createdAt` | `string` (ISO 8601) | Fecha de alta |

### `POST /api/auth/register`

Registra un responsable/tutor, hashea la contraseña con **bcryptjs** y emite un JWT con el **rol**.

**Request**

```json
{
  "nombre": "Ana Pérez",
  "email": "ana@mail.com",
  "password": "Str0ng!Pass",
  "telefono": "+5491122334455",
  "esResponsable": true
}
```

- `nombre`: obligatorio. También se acepta `name` como alias (compatibilidad).
- `email`: obligatorio, formato válido y único.
- `password`: obligatorio, mínimo 6 caracteres.
- `telefono`: opcional; si se envía, se valida el formato.
- `esResponsable`: opcional (default `true`). `true` → `rol: "responsable"`, `false` → `rol: "tutor"`.

**Response `201 Created`**

```json
{
  "message": "Responsible registered successfully",
  "token": "<JWT>",
  "responsible": {
    "id": "uuid",
    "email": "ana@mail.com",
    "name": "Ana Pérez",
    "rol": "responsable",
    "mode": "adulto",
    "telefono": "+5491122334455",
    "createdAt": "2026-..."
  }
}
```

**Errores:** `400` email repetido / datos incompletos / formato inválido · `500` error del servidor.

---

### `POST /api/auth/login`

Valida las credenciales comparando el hash con **bcrypt** y emite un JWT con el rol.

**Request**

```json
{ "email": "ana@mail.com", "password": "Str0ng!Pass" }
```

**Response `200 OK`**

```json
{
  "message": "Login successful",
  "token": "<JWT>",
  "responsible": {
    "id": "uuid",
    "email": "ana@mail.com",
    "name": "Ana Pérez",
    "rol": "responsable",
    "mode": "adulto",
    "telefono": "+5491122334455",
    "createdAt": "2026-..."
  }
}
```

**Errores:** `400` datos incompletos · `401` credenciales inválidas.

---

### `GET /api/auth/me` 🔒

Devuelve el perfil vigente del usuario autenticado.

**Headers:** `Authorization: Bearer <JWT>`

**Response `200 OK`**

```json
{
  "id": "uuid",
  "email": "ana@mail.com",
  "name": "Ana Pérez",
  "rol": "responsable",
  "mode": "adulto",
  "telefono": "+5491122334455",
  "createdAt": "2026-..."
}
```

**Errores:** `401` sin token · `403` token inválido o vencido · `404` usuario inexistente.

---

### `PATCH /api/auth/me/mode` 🔒

Actualiza el modo de uso elegido en la pantalla **"Selección de Modo"**.

**Headers:** `Authorization: Bearer <JWT>`

**Request**

```json
{ "mode": "dispositivo_protegido" }
```

**Response `200 OK`** → mismo cuerpo que `GET /api/auth/me`.

**Errores:** `400` mode ausente o fuera del catálogo · `401` sin token · `403` token inválido.

---

### Claims del JWT

```json
{
  "id": "uuid",
  "email": "ana@mail.com",
  "rol": "responsable",
  "iat": 1767225600,
  "exp": 1767830400
}
```

La vigencia es de **7 días**. El claim `rol` es el que usa el cliente para decidir el direccionamiento post-login (Dashboard del responsable vs. flujo de dispositivo protegido).

---

## Middlewares

| Middleware | Comportamiento |
|------------|----------------|
| `authenticateToken` | Exige `Authorization: Bearer <token>`. Inyecta `responsibleId`, `userEmail` y `rol` en `req`. Token ausente → `401`; token inválido/vencido → `403`. |
| `authorizeRoles(['responsable'])` | Restringe el acceso a los perfiles indicados. Se ejecuta siempre **después** de `authenticateToken`. Rol no autorizado → `403`. |

---

## Pruebas

```bash
npm test
```

| Suite | Cubre |
|-------|--------|
| `src/__tests__/auth.test.ts` | BK-1.1 registro · BK-1.2 login · BK-1.3 modo de usuario · BK-1.4 middleware y roles |
| `src/__tests__/app.test.ts` | Integración de health, auth, dispositivos, blocklist y eventos |

---

## Endpoints de los hitos 2 y 3

Ya implementados en el backend (aún sin pantallas conectadas en el cliente):

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/devices/link` | Registra un dispositivo protegido |
| `GET` | `/api/devices` | Lista los dispositivos del responsable |
| `PATCH` | `/api/devices/:id/status` | Activa/desactiva un dispositivo |
| `POST` | `/api/blocklist/check` | Verifica si un dominio está bloqueado (público) |
| `GET` | `/api/blocklist` | Lista de bloqueo oficial + personalizada 🔒 |
| `POST` | `/api/blocklist/custom` | Agrega un dominio personalizado 🔒 |
| `DELETE` | `/api/blocklist/custom/:id` | Elimina un dominio personalizado 🔒 |
| `POST` | `/api/events` | Registra un evento de seguridad |
| `GET` | `/api/events` | Eventos del responsable (filtro por `deviceId`) 🔒 |
| `GET` | `/api/events/alerts` | Alertas del responsable 🔒 |
| `PATCH` | `/api/events/alerts/:id/read` | Marca una alerta como leída 🔒 |

🔒 = requiere `Authorization: Bearer <JWT>`.
