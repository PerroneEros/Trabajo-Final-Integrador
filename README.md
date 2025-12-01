# 🌱 AgroInsumos E-Commerce API
**Backend para plataforma de comercio digital de insumos agrícolas**  
``Node.js`` · ``TypeScript`` · ``Express`` · ``Sequelize`` · ``MySQL`` · ``Docker``

---

## 📌 Descripción General
``AgroInsumos E-Commerce API`` es un **backend robusto y escalable** para un sistema de venta de insumos agrícolas: semillas, fertilizantes, agroquímicos, herramientas rurales, etc.  
- Incluye autenticación JWT, gestión de productos, usuarios, pedidos, consultas, reportes y un entorno completamente dockerizado.

Este proyecto **busca servir como base sólida** para un e-commerce moderno, modular y mantenible.

---

## 🚀 Características Principales
- ✔️ Autenticación mediante JWT  
- ✔️ Gestión completa de productos  
- ✔️ Carrito y pedidos  
- ✔️ Sistema de usuarios y roles  
- ✔️ Consultas de clientes  
- ✔️ Reportes (ventas, actividad, productos destacados)
- ✔️ Persistencia simulada (Mocks)
- ✔️ Testing con Vitest + Supertest  
- ✔️ Docker + docker-compose  
- ✔️ Arquitectura profesional en capas  

---

## 🏗️ Arquitectura del Proyecto
```plaintext
src/
├─ controllers/ # Manejo de requests/responses
├─ services/ # Lógica de negocio
├─ routes/ # Definición de endpoints
├─ models/ # Modelos
├─ middleware/ # Middlewares (auth, manejo de errores, etc.)
├─ utils/ # Funciones reutilizables
├─ mock/ # Datos temporales/mock
├─ app.ts # Inicialización de la App Express
└─ server.ts # Servidor principal
```
## Patron de diseño
El proyecto sigue una Arquitectura en Capas para asegurar la separación de responsabilidades:

- ✔️Rutas (Routes): Definen los endpoints y delegan al controlador.

- ✔️Controladores (Controllers): Manejan la petición HTTP (request/response) y validaciones básicas.

- ✔️Servicios (Services): Contienen la lógica de negocio pura.

- ✔️Modelos (Data Access): Interactúan directamente con la base de datos MySQL a través de Sequelize.
---

## 🛠️ Tecnologías Utilizadas
- **Node.js 18+**  
- **TypeScript**  
- **Express.js**   
- **JWT + Bcrypt**  
- **Docker / Docker Compose**  
- **Vitest / Supertest**  
- **ESLint + Prettier + Husky**

---

## 📦 Instalación Local (sin Docker)

```ruby
# Clonar Repo
1. git clone https://github.com/brunofernandez87/prueba-trabajo-final.git
cd prueba-trabajo-final

# Instalar dependencias
2. npm install

# Ejecutar en modo desarrollo
3. npm run dev
```
## 🐳 Instalacion con Docker (recomendado)
```ruby
1. Clonar el proyecto

2. Crear archivo .env (mismo contenido que arriba)

# Construir los contenedores
3. docker-compose build

# Levantar el stack
4. docker-compose up -d

# Servicios incluidos
Backend API → http://localhost:3001
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
```ruby
Comando	Descripción
#Modo desarrollo
npm run dev

#Compilar TypeScript
npm run build	

#versión de producción
npm start	

#Ejecutar tests
npm test

#Revisar estilo
npm run lint	

#Corregir estilo automáticamente
npm run lint:fix	
```

#### 🤝 Contribuir
- Hacer un fork
- Crear una rama feature/mi-cambio
- Realizar cambios y commit
- Crear un Pull Request
- El proyecto utiliza Husky, por lo que antes de cada commit se ejecutan validaciones automáticas.


### Limitaciones
- ``Pasarela de Pagos``: El sistema simula el proceso de compra; no está integrado con una pasarela real  en esta versión.

- ``Envío de Emails``: Las notificaciones por correo están configuradas pero no se realizan por el momento en los test se realiza un mock para verificar que funcionan.

- ``Almacenamiento de Imágenes``: Actualmente, las imágenes se gestionan mediante mocks.
  
- ``Base de datos``: Actualmente no hay una conexion real con una base de datos se hace todo mediante mocks

#### 👨‍💻 Autores
- Bruno Fernandez - Ivo Depari - Eros Perrone - Franco Devaux
- Proyecto Final —> Tecnicatura Universitaria en Programación

📄 Licencia MIT License

