require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users.routes');
const foodsRoutes = require('./routes/foods.routes');
const foodLogsRoutes = require('./routes/foodLogs.routes');
const activitiesRoutes = require('./routes/activities.routes');
const activityLogsRoutes = require('./routes/activityLogs.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // servir front-end

// Rutas
app.use('/api/users', usersRoutes);
app.use('/api/foods', foodsRoutes);
app.use('/api/food-logs', foodLogsRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/activity-logs', activityLogsRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
