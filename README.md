# React Courses App
## Se usó

- React
- JavaScript
- Vite
- Material UI
- Axios
- API REST con Spring Boot
- JWT para autenticación

## Requisitos previos

Antes de ejecutar, se debe tener:

- Node.js instalado
- npm instalado
- Backend Spring Boot ejecutándose

## Ejecutar el backend

El archivo del backend se encuentra en el computador
```bash
swarch@206m17 
```

con ip:

```bash
10.147.19.37
```

Nos conectamos al computador por ssh usando zeroTier, o directamente en el computador, y nos movemos a la carpeta:

```bash
cd /opt/swarch
```

Y ejecutamos el back con:

```bash
java -jar auth-0.0.1-SNAPSHOT.jar
```

El backend debe quedar disponible en una dirección parecida a:

```txt
http://localhost:8080/auth
```

## Usuarios de prueba

Para iniciar sesión puedes se pueden los usuarios creados por defecto en el backend:

| Rol | Usuario | Contraseña |
|---|---|---|
| Administrador | `admin` | `admin123` |
| Profesor | `profesor` | `profesor123` |
| Estudiante | `student` | `student123` |

Para crear cursos se recomienda usar:

```txt
Usuario: admin
Contraseña: admin123
```

El usuario administrador tiene permisos para crear cursos.

## Instalar dependencias del frontend

Desde la carpeta del proyecto:

```bash
cd react-courses-911
npm install
```

Si falta alguna dependencia, hay que instalar las necesarias con:

```bash
npm install axios react-router-dom @mui/material @emotion/react @emotion/styled @mui/icons-material
```

## Rutas principales de la aplicación

| Ruta frontend | Descripción |
|---|---|
| `/login` | Pantalla de inicio de sesión |
| `/courses` | Lista de cursos disponibles |
| `/courses/new` | Formulario para crear un curso |

Las rutas de cursos están protegidas. Para entrar a ellas es necesario iniciar sesión primero.

## 10. Endpoints consumidos del backend

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/auth/login` | Iniciar sesión |
| `GET` | `/api/courses` | Listar cursos |
| `POST` | `/api/courses` | Crear curso |

Después del login, las peticiones protegidas deben enviar este encabezado:

```txt
Authorization: Bearer TOKEN
```

El token se guarda en `localStorage` y Axios lo agrega automáticamente en cada petición.

## Ejecutar el frontend

Desde la carpeta del frontend:

```bash
npm run dev
```

Vite mostrará una URL como:

```txt
http://localhost:5173
```

Y solo es abrir la URL en el navegador.
