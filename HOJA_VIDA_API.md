# API CRUD Hoja de Vida - RecruitNow

## Endpoints Implementados

### RF5 - Crear Hoja de Vida
**POST** `/api/hoja-vida`

Crea una nueva hoja de vida para un usuario.

**Body ejemplo:**
```json
{
  "usuarioId": "673abc123def456789012345",
  "informacionPersonal": {
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan.perez@email.com",
    "telefono": "+57 300 123 4567",
    "direccion": "Calle 123 #45-67, Bogotá",
    "fechaNacimiento": "1990-05-15",
    "nacionalidad": "Colombiana"
  },
  "resumenProfesional": "Desarrollador Full Stack con 5 años de experiencia en tecnologías web modernas.",
  "experienciaLaboral": [
    {
      "empresa": "Tech Solutions",
      "cargo": "Desarrollador Senior",
      "fechaInicio": "2020-01-15",
      "fechaFin": "2023-12-31",
      "descripcion": "Desarrollo de aplicaciones web con React y Node.js",
      "esTrabajoActual": false
    }
  ],
  "educacion": [
    {
      "institucion": "Universidad Nacional",
      "titulo": "Ingeniería de Sistemas",
      "fechaInicio": "2015-02-01",
      "fechaFin": "2019-12-15",
      "descripcion": "Pregrado en Ingeniería de Sistemas"
    }
  ],
  "habilidades": [
    {
      "nombre": "JavaScript",
      "nivel": "Avanzado"
    },
    {
      "nombre": "React",
      "nivel": "Intermedio"
    }
  ],
  "idiomas": [
    {
      "idioma": "Español",
      "nivel": "Nativo"
    },
    {
      "idioma": "Inglés",
      "nivel": "Intermedio"
    }
  ],
  "esPublica": true
}
```

### RF6 - Consultar Hojas de Vida

#### Obtener todas las hojas de vida
**GET** `/api/hoja-vida`

**Query Parameters:**
- `usuarioId`: Filtrar por ID de usuario
- `esPublica`: Filtrar por visibilidad (true/false)
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)

**Ejemplo:** `/api/hoja-vida?esPublica=true&page=1&limit=5`

#### Obtener hoja de vida específica
**GET** `/api/hoja-vida/:id`

**Ejemplo:** `/api/hoja-vida/673abc123def456789012345`

#### Obtener hoja de vida por usuario
**GET** `/api/hoja-vida/usuario/:usuarioId`

**Ejemplo:** `/api/hoja-vida/usuario/673abc123def456789012345`

### RF7 - Editar Hoja de Vida
**PUT** `/api/hoja-vida/:id`

Actualiza una hoja de vida existente. Puede enviar solo los campos que desea actualizar.

**Body ejemplo (actualización parcial):**
```json
{
  "resumenProfesional": "Desarrollador Full Stack con 6 años de experiencia especializado en MERN Stack.",
  "habilidades": [
    {
      "nombre": "JavaScript",
      "nivel": "Experto"
    },
    {
      "nombre": "React",
      "nivel": "Avanzado"
    },
    {
      "nombre": "Node.js",
      "nivel": "Avanzado"
    }
  ],
  "esPublica": false
}
```

### RF8 - Eliminar Hoja de Vida
**DELETE** `/api/hoja-vida/:id`

Elimina permanentemente una hoja de vida.

**Ejemplo:** `DELETE /api/hoja-vida/673abc123def456789012345`

## Respuestas de la API

### Respuesta Exitosa (Crear/Actualizar)
```json
{
  "message": "Hoja de vida creada exitosamente",
  "data": {
    "_id": "673abc123def456789012345",
    "usuarioId": {
      "_id": "673abc123def456789012344",
      "nombre": "Juan Pérez",
      "email": "juan.perez@email.com"
    },
    "informacionPersonal": { ... },
    "fechaCreacion": "2024-11-01T10:30:00.000Z",
    "fechaActualizacion": "2024-11-01T10:30:00.000Z"
  }
}
```

### Respuesta con Paginación (Consultar todas)
```json
{
  "message": "Hojas de vida obtenidas exitosamente",
  "data": [ ... ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 25,
    "itemsPerPage": 10
  }
}
```

### Respuesta de Error
```json
{
  "message": "Error al crear la hoja de vida",
  "error": "El usuario ya tiene una hoja de vida creada"
}
```

## Validaciones Implementadas

1. **Crear Hoja de Vida:**
   - Usuario debe existir
   - Usuario no puede tener más de una hoja de vida

2. **Actualizar Hoja de Vida:**
   - Hoja de vida debe existir
   - Si se cambia usuarioId, el nuevo usuario debe existir y no tener otra hoja de vida

3. **Campos Requeridos:**
   - usuarioId
   - informacionPersonal.nombre
   - informacionPersonal.apellido
   - informacionPersonal.email
   - informacionPersonal.telefono

## Características Adicionales

- **Poblado automático:** Las consultas incluyen información básica del usuario
- **Paginación:** Para consultas masivas
- **Filtros:** Por usuario y visibilidad
- **Timestamps:** Fechas de creación y actualización automáticas
- **Validación de esquemas:** Mongoose valida tipos y campos requeridos