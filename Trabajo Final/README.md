# 🌱 AgroInsumos E-Commerce API
**Backend para plataforma de comercio digital de insumos agrícolas**  
Node.js · TypeScript · Express · Sequelize · MySQL · Docker

---

## 📌 Descripción General
AgroInsumos E-Commerce API es un backend robusto y escalable para un sistema de venta de insumos agrícolas: semillas, fertilizantes, agroquímicos, herramientas rurales, etc.  
Incluye autenticación JWT, gestión de productos, usuarios, pedidos, consultas, reportes y un entorno completamente dockerizado.

Este proyecto busca servir como base sólida para un e-commerce moderno, modular y mantenible.

---

## 🚀 Características Principales
- ✔️ Autenticación mediante JWT  
- ✔️ Gestión completa de productos  
- ✔️ Carrito y pedidos  
- ✔️ Sistema de usuarios y roles  
- ✔️ Consultas de clientes  
- ✔️ Reportes (ventas, actividad, productos destacados)  
- ✔️ ORM Sequelize + MySQL  
- ✔️ Testing con Vitest + Supertest  
- ✔️ Docker + docker-compose  
- ✔️ Arquitectura profesional en capas  

---

## 🏗️ Arquitectura del Proyecto
```plaintext
src/
├─ config/ # Configuración de DB, JWT, variables de entorno
├─ controllers/ # Manejo de requests/responses
├─ services/ # Lógica de negocio
├─ routes/ # Definición de endpoints
├─ models/ # Modelos de Sequelize
├─ middleware/ # Middlewares (auth, manejo de errores, etc.)
├─ utils/ # Funciones reutilizables
├─ mock/ # Datos temporales/mock
├─ app.ts # Inicialización de la App Express
└─ server.ts # Servidor principal
```
---

## 🛠️ Tecnologías Utilizadas
- **Node.js 18+**  
- **TypeScript**  
- **Express.js**  
- **Sequelize ORM**  
- **MySQL**  
- **JWT + Bcrypt**  
- **Docker / Docker Compose**  
- **Vitest / Supertest**  
- **ESLint + Prettier + Husky**

---

## 📦 Instalación Local (sin Docker)

### 1. Clonar repositorio
```bash
git clone https://github.com/brunofernandez87/prueba-trabajo-final.git
cd prueba-trabajo-final

2. Instalar dependencias
npm install

3. Crear archivo .env

PORT=3001

DB_HOST=localhost
DB_PORT=3306
DB_NAME=agroinsumos
DB_USER=root
DB_PASSWORD=tu_password

JWT_SECRET=clave_ultra_secreta
4. Crear base de datos MySQL

CREATE DATABASE agroinsumos;
5. Ejecutar en modo desarrollo
npm run dev
```
## 🐳 Instalacion con Docker (recomendado)
```bash
1. Clonar el proyecto

2. Crear archivo .env (mismo contenido que arriba)

3. Construir los contenedores
docker-compose build

4. Levantar el stack
docker-compose up -d

Servicios incluidos
Backend API → http://localhost:3001

Base de datos MySQL → puerto 3306
```
### 📡 Endpoints Principales (resumen)
```plaintext
Ruta	Método	Descripción
/api/auth/register	POST	Registro de usuario
/api/auth/login	POST	Login con JWT
/api/products	GET / POST	Listar / Crear productos
/api/products/:id	PUT / DELETE	Editar / Eliminar producto
/api/orders	POST	Crear pedido
/api/orders/:id	GET	Ver pedido
/api/consultation	POST	Crear consulta
/api/report/sales	GET	Reporte de ventas
```

### 📘 Scripts Disponibles
```bash
Comando	Descripción
npm run dev	Modo desarrollo
npm run build	Compilar TypeScript
npm start	Ejecutar versión de producción
npm test	Ejecutar tests
npm run lint	Revisar estilo
npm run lint:fix	Corregir estilo automáticamente
```
🤝 Contribuir
Hacer un fork

Crear una rama feature/mi-cambio

Realizar cambios y commit

Crear un Pull Request

El proyecto utiliza Husky, por lo que antes de cada commit se ejecutan validaciones automáticas.

👨‍💻 Autores
Bruno Fernandez - Ivo Depari - Eros Perrone - Franco Devaux
Proyecto Final — Tecnicatura Universitaria en Programación

📄 Licencia
MIT License
