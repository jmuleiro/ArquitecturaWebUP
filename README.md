# Arquitectura Web - TP Integrador
Trabajo práctico integrador de Arquitectura Web, Universidad de Palermo.

## Frontend
- **Next.js**: Framework de React
- **TypeScript**: Tipado estático
- **MUI**: Librería de componentes

## Backend
- **Nest.js**: Framework de Node.js
- **TypeScript**: Tipado estático
- **TypeORM**: ORM para Node.js
- **MariaDB**: Base de datos

## Build

### Proyecto entero
Utilizando Docker Compose desde el root del proyecto ([Instalar Docker Engine](https://docs.docker.com/engine/install/)):
```bash
docker compose up --build
```

Docker Compose levantará la base de datos en el puerto 3306 por default, el backend en el puerto 3000 y el frontend en el puerto 3001.

### Frontend
1. Buildear el proyecto:
```bash
cd frontend
npm run build
```
2. Iniciar el servidor de producción (expondrá el frontend en el puerto 3001 local):
```bash
npm run start

# Alternativamente, iniciar el servidor en modo desarrollo:
npm run dev
```

### Backend
1. El backend requiere una base de datos corriendo en el puerto 3306 por default. Para levantar la base de datos rápidamente, se puede utilizar el Docker Compose del root del proyecto:
```bash
# Levantar solamente la DB
docker compose up database

# O con la DB y el backend (que iniciará en modo producción)
docker compose up
```

2. Para levantar el backend en modo producción:
```bash
cd backend

# Buildear el backend
npm run build

# Iniciar el backend en modo producción
npm run start:prod

# Alternativamente, iniciar el backend en modo desarrollo
npm run start:dev
```
