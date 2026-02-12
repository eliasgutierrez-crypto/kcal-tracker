# Kcal Tracker

**Kcal Tracker** es una aplicación web desarrollada con **Node.js**, **Express** y **PostgreSQL** que permite registrar y calcular calorías consumidas y gastadas, así como macro y micronutrientes de alimentos. La app incluye un front-end minimalista usando **Tailwind CSS** y un back-end con rutas REST para usuarios, alimentos, actividades y registros diarios.

---

## Funcionalidades

- Crear usuarios con información personal: nombre, email, contraseña, peso, altura y edad.  
- Crear alimentos con macros: calorías, proteína, carbohidratos, grasa y fibra por 100 g.  
- Registrar el consumo de alimentos por usuario.  
- Crear actividades físicas con gasto calórico por minuto.  
- Registrar actividades realizadas por usuario y duración en minutos.  
- Consultar un **resumen diario** que calcula:  
  - Total de calorías consumidas y gastadas  
  - Macros consumidos (proteína, carbohidratos, grasa, fibra)  
  - Balance neto de calorías  

---

## Tecnologías utilizadas

- **Back-end:** Node.js, Express, PostgreSQL  
- **Front-end:** HTML, JavaScript, Tailwind CSS  
- **Despliegue:** Render  
- **Dependencias:** dotenv, nodemon, cors, pg  

---

## Instalación

1. Clonar el repositorio:  

```bash

git clone https://github.com/eliasgutierrez-crypto/kcal-tracker.git

cd kcal-tracker

Instalar dependencias:

npm install


Configurar variables de entorno en un archivo .env:

PORT=3000
DATABASE_URL=postgresql://<usuario>:<contraseña>@<host>:<puerto>/<basedatos>


Ejecutar la aplicación en modo desarrollo:

npm run dev


Abrir http://localhost:3000 en el navegador.

kcal-tracker/
├─ src/
│  ├─ config/db.js          # Configuración de conexión a PostgreSQL
│  ├─ routes/               # Rutas para usuarios, alimentos, actividades y logs
│  │  ├─ users.routes.js
│  │  ├─ foods.routes.js
│  │  ├─ foodLogs.routes.js
│  │  ├─ activities.routes.js
│  │  └─ activityLogs.routes.js
│  └─ app.js                # Archivo principal del servidor
├─ public/                  # Front-end
│  ├─ index.html
│  └─ app.js
├─ package.json
├─ package-lock.json
└─ README.md

Uso

Crear un usuario ingresando su información en la sección Crear Usuario.

Crear alimentos y registrar el consumo diario en Crear Alimento y Registrar Consumo.

Crear actividades físicas y registrar la duración en Crear Actividad y Registrar Actividad.

Consultar el Resumen Diario indicando usuario y fecha, para ver calorías consumidas, quemadas y macros.

API Endpoints
Método	Ruta	Descripción
POST	/api/users	Crear usuario
GET	/api/users	Obtener todos los usuarios
GET	/api/users/:id/summary?date=YYYY-MM-DD	Resumen diario de un usuario
POST	/api/foods	Crear alimento
POST	/api/food-logs	Registrar consumo de alimento
POST	/api/activities	Crear actividad
POST	/api/activity-logs	Registrar actividad
Ejemplo de uso

Crear usuario:

POST /api/users
{
  "name": "Juan",
  "email": "juan@test.com",
  "password": "123",
  "weight": 90,
  "height": 181,
  "age": 28
}


Respuesta:

{
  "id": 1,
  "name": "Juan",
  "email": "juan@test.com",
  "password": "123",
  "weight": "90.00",
  "height": "181.00",
  "age": 28,
  "created_at": "2026-02-12T22:16:44.110Z"
}


Resumen diario:

GET /api/users/1/summary?date=2026-02-12
{
  "total_calories_consumed": 195,
  "total_protein": 3.75,
  "total_carbs": 42,
  "total_fat": 0.45,
  "total_fiber": 0.6,
  "total_calories_burned": 294,
  "net_balance": -99
}

Notas

La aplicación requiere que la base de datos PostgreSQL esté correctamente configurada y accesible.

Las cantidades de alimentos y la duración de actividades deben registrarse en unidades realistas para que el resumen diario tenga sentido.

Puedes desplegar la app en Render usando la URL del servicio web y la base de datos.

Autor

Elías Gutiérrez
