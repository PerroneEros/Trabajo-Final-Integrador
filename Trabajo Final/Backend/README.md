Perfecto, aquí está la documentación técnica completa en español para tu README.md:<cite/>

---

# API Backend Agro-Insumos

API RESTful para una plataforma de e-commerce de insumos agrícolas, construida con Node.js, Express, TypeScript y MySQL. [1](#3-0) 

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Arquitectura](#arquitectura)
- [Dominios de Negocio](#dominios-de-negocio)
- [Testing](#testing)
- [Scripts Disponibles](#scripts-disponibles)

## 🎯 Descripción General

Sistema backend que proporciona funcionalidades completas de e-commerce para productos agrícolas, incluyendo:<cite/>

- Registro y autenticación de usuarios con control de acceso basado en roles
- Gestión de catálogo de productos agrícolas
- Procesamiento de pedidos y líneas de pedido
- Sistema de consultas de clientes sobre productos
- Generación de reportes para análisis de negocio

## 🛠 Stack Tecnológico

### Tecnologías Principales

| Categoría | Tecnología | Versión | Propósito |
|-----------|-----------|---------|-----------|
| **Runtime** | Node.js | >= 18.0.0 | Entorno de ejecución JavaScript |
| **Lenguaje** | TypeScript | ^5.9.3 | JavaScript con tipado estático |
| **Framework Web** | Express.js | ^5.1.0 | Servidor HTTP y enrutamiento |
| **ORM** | Sequelize | ^6.37.7 | Abstracción de base de datos |
| **Base de Datos** | MySQL | - | Almacenamiento relacional |
| **Autenticación** | jsonwebtoken | ^9.0.2 | Generación y validación de JWT |
| **Seguridad** | bcryptjs | ^3.0.2 | Hash de contraseñas |
| **Testing** | Vitest | ^4.0.3 | Framework de pruebas |
| **Servidor Dev** | ts-node-dev | ^2.0.0 | Servidor con hot-reload | [2](#3-1) 

### Herramientas de Calidad

- **ESLint** (^8.57.1) - Análisis estático de código [3](#3-2) 
- **Prettier** (^3.6.2) - Formateo de código [4](#3-3) 
- **Husky** (^9.1.7) - Git hooks para automatización [5](#3-4) 
- **Supertest** (^7.1.4) - Testing de endpoints HTTP [6](#3-5) 

## 📦 Requisitos Previos

- Node.js >= 18.0.0
- MySQL Server
- npm o yarn

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/brunofernandez87/prueba-trabajo-final.git

# Navegar al directorio
cd prueba-trabajo-final

# Instalar dependencias
npm install
```

## ⚙️ Configuración

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:<cite/>

```env
# Base de datos
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_base_datos
DB_PORT=3306

# JWT
JWT_SECRET=tu_clave_secreta_jwt

# Servidor
PORT=3001

# Email (opcional, para recuperación de contraseñas)
SMTP_HOST=smtp.ejemplo.com
SMTP_PORT=587
SMTP_USER=tu_email
SMTP_PASS=tu_contraseña_email
```

## 🏃 Ejecución

### Modo Desarrollo

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3001` con hot-reload activado. [7](#3-6) 

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Generar reporte de cobertura
npm run coverage
``` [8](#3-7) 

### Linting

```bash
# Verificar código
npm run lint

# Corregir automáticamente
npm run lint:fix
``` [9](#3-8) 

## 🏗 Arquitectura

El sistema implementa una **arquitectura en capas de 4 niveles** que separa responsabilidades:<cite/>

```
┌─────────────────────────────────────┐
│   Capa 1: Rutas API                 │
│   src/routes/*.Routes.ts            │
│   - Definición de endpoints         │
│   - Aplicación de middleware        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Capa 2: Controladores             │
│   src/controllers/*.Controller.ts   │
│   - Manejo de req/res               │
│   - Validación de entrada           │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Capa 3: Servicios                 │
│   src/services/*.Service.ts         │
│   - Lógica de negocio               │
│   - Gestión de transacciones        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Capa 4: Modelos de Datos          │
│   src/models/*.ts                   │
│   - Definición de esquemas          │
│   - Mapeo ORM                       │
└─────────────────────────────────────┘
```

### Organización de Archivos

```
src/
├── app.ts                 # Configuración de Express
├── server.ts             # Punto de entrada
├── routes/               # Definición de rutas
├── controllers/          # Controladores HTTP
├── services/            # Lógica de negocio
├── models/              # Modelos Sequelize
│   └── index.ts         # Agregador de modelos
└── mock/                # Datos de prueba
``` [10](#3-9) 

## 🎯 Dominios de Negocio

La API está organizada en seis dominios principales:<cite/>

### 1. Gestión de Usuarios (`/api/users`)
- Registro de usuarios
- Login/Logout
- Recuperación de contraseñas
- Gestión de roles

### 2. Catálogo de Productos (`/api/products`)
- Navegación de catálogo
- Operaciones CRUD
- Seguimiento de inventario
- Categorías

### 3. Procesamiento de Pedidos (`/api/order`)
- Creación de pedidos
- Gestión de estados
- Historial de pedidos
- Cálculo de totales

### 4. Detalles de Pedido (`/api/detail`)
- Gestión de líneas de pedido
- Cantidad y precios
- Referencias a productos

### 5. Consultas (`/api/consultation`)
- Consultas sobre productos
- Soporte al cliente
- Asesoramiento experto

### 6. Reportes (`/api/report`)
- Generación de reportes
- Análisis
- Inteligencia de negocio

## 🧪 Testing

El proyecto implementa una estrategia de testing en tres niveles:<cite/>

### Tests Unitarios
Validan funciones individuales de la capa de servicios.

```bash
test/services/*.service.test.ts
``` [11](#3-10) 

### Tests de Integración
Validan flujos completos de API usando datos mock.

```bash
test/prueba de integracion mock/*.integration.test.ts
``` [12](#3-11) 

### Tests de Rutas
Validan comportamiento de endpoints HTTP y autenticación.

```bash
test/routes/**/*.routes.test.ts
```

### Cobertura de Tests

```bash
npm run coverage
```

Genera reportes de cobertura usando `@vitest/coverage-v8`.<cite/>

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **Desarrollo** | `npm run dev` | Inicia servidor con hot-reload |
| **Tests** | `npm test` | Ejecuta suite de tests |
| **Cobertura** | `npm run coverage` | Genera reporte de cobertura |
| **Lint** | `npm run lint` | Verifica calidad de código |
| **Lint Fix** | `npm run lint:fix` | Corrige problemas automáticamente |
| **Prepare** | `npm run prepare` | Configura Husky hooks | [13](#3-12) 

## 🔒 Seguridad

- **Autenticación JWT**: Endpoints protegidos requieren token Bearer
- **Hash de Contraseñas**: Todas las contraseñas se hashean con bcryptjs
- **CORS**: Configurado para solicitudes cross-origin
- **Validación**: Validación de entrada en capa de controladores

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

**Nota**: Los hooks de Husky ejecutarán automáticamente linting y tests antes de permitir commits y pushes.

## 📝 Licencia

ISC

## 👤 Autor

Bruno Fernández

---

**Nota**: Este proyecto fue desarrollado como trabajo final para demostrar conocimientos en desarrollo backend con Node.js, TypeScript y arquitectura en capas.

---

Puedes copiar todo este contenido y reemplazar el contenido actual de tu `README.md`. [14](#3-13)  La documentación está completamente en español y cubre todos los aspectos técnicos de tu proyecto basándome en la información de las páginas wiki y el código base.<cite/>

## Notas

Esta documentación incluye toda la información técnica relevante de tu proyecto, organizada de manera clara y profesional.<cite/> He mantenido la estructura típica de un README técnico con secciones para instalación, configuración, arquitectura y testing.<cite/> Los emojis ayudan a la navegación visual del documento.<cite/>

Wiki pages you might want to explore:
- [Overview (brunofernandez87/prueba-trabajo-final)](/wiki/brunofernandez87/prueba-trabajo-final#1)
- [Architecture (brunofernandez87/prueba-trabajo-final)](/wiki/brunofernandez87/prueba-trabajo-final#3)
- [Testing Strategy (brunofernandez87/prueba-trabajo-final)](/wiki/brunofernandez87/prueba-trabajo-final#5.2)

### Citations

**File:** package.json (L1-5)
```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "type": "commonjs",
```

**File:** package.json (L6-12)
```json
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage",
    "dev": "ts-node-dev --respawn src/server.ts",
    "lint": "npx eslint .",
    "lint:fix": "npx eslint . --fix",
    "prepare": "husky"
```

**File:** package.json (L18-26)
```json
  "dependencies": {
    "bcryptjs": "^3.0.2",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.15.2",
    "sequelize": "^6.37.7",
    "vitest": "^4.0.3"
```

**File:** package.json (L40-40)
```json
    "eslint": "^8.57.1",
```

**File:** package.json (L44-44)
```json
    "husky": "^9.1.7",
```

**File:** package.json (L46-46)
```json
    "prettier": "^3.6.2",
```

**File:** package.json (L47-47)
```json
    "supertest": "^7.1.4",
```

**File:** src/models/index.ts (L1-20)
```typescript
// En un archivo como src/models/index.ts
// 1. Importar todos los modelos
import Usuario from './user'
import Rol from './Rol'
import Pedido from './order'
import Producto from './product'
import DetallePedido from './orderDetail'
import Consulta from './Consultation'
import ReporteGenerado from './report'

// 4. Exportar todo para que el resto de la app lo use
export {
  Usuario,
  Rol,
  Pedido,
  Producto,
  DetallePedido,
  Consulta,
  ReporteGenerado,
}
```

**File:** test/prueba de integracion mock/consulta.integration.test.ts (L1-7)
```typescript
import {describe, it, expect} from 'vitest'
import request from 'supertest'
import app from './../../src/app'

describe('Pruebas de integración para Consultas (Mock)', () => {
  describe('POST /api/consulta', () => {
    it('Debería crear una nueva consulta con éxito', async () => {
```

**File:** test/prueba de integracion mock/product.integration.test.ts (L6-12)
```typescript
describe('Pruebas de integración para productos (Mock)', () => {
  describe('GET /api/products', () => {
    it('Debería retornar todos los productos del mock', async () => {
      const response = await request(app).get('/api/products')
      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockProduct)
    })
```

**File:** README.md (L1-104)
```markdown
