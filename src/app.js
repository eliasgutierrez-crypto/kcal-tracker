require('dotenv').config();
app.use(express.static('public'));
const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users.routes');
const foodsRoutes = require('./routes/foods.routes');
const foodLogsRoutes = require('./routes/foodLogs.routes');
const activitiesRoutes = require('./routes/activities.routes');
const activityLogsRoutes = require('./routes/activityLogs.routes');



const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRoutes);
app.use('/api/foods', foodsRoutes);
app.use('/api/food-logs', foodLogsRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/activity-logs', activityLogsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API kcal-tracker funcionando correctamente' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
