const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Registrar actividad realizada por un usuario
router.post('/', async (req, res) => {
  try {
    const { user_id, activity_id, duration_minutes, log_date } = req.body;

    const result = await pool.query(
      `INSERT INTO activity_logs (user_id, activity_id, duration_minutes, log_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user_id, activity_id, duration_minutes, log_date || new Date()]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar actividad' });
  }
});

// Obtener actividades de un usuario por fecha
router.get('/:user_id/:date', async (req, res) => {
  try {
    const { user_id, date } = req.params;

    const result = await pool.query(
      `SELECT al.id, a.name, a.met_value, al.duration_minutes, al.log_date
       FROM activity_logs al
       JOIN activities a ON al.activity_id = a.id
       WHERE al.user_id = $1 AND al.log_date = $2`,
      [user_id, date]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
});
// Resumen diario con balance energético
router.get('/summary-with-balance/:user_id/:date', async (req, res) => {
  try {
    const { user_id, date } = req.params;

    // Calorías consumidas y macros
    const foodResult = await pool.query(
      `SELECT 
          SUM(f.calories_per_100g * fl.quantity_grams / 100) AS total_calories,
          SUM(f.protein_per_100g * fl.quantity_grams / 100) AS total_protein,
          SUM(f.carbs_per_100g * fl.quantity_grams / 100) AS total_carbs,
          SUM(f.fat_per_100g * fl.quantity_grams / 100) AS total_fat,
          SUM(f.fiber_per_100g * fl.quantity_grams / 100) AS total_fiber
       FROM food_logs fl
       JOIN foods f ON fl.food_id = f.id
       WHERE fl.user_id = $1 AND fl.log_date = $2`,
      [user_id, date]
    );

    const foods = foodResult.rows[0];

    // Calorías gastadas
    const activityResult = await pool.query(
      `SELECT SUM(a.met_value * al.duration_minutes * 3.5 / 200 * u.weight) AS calories_burned
       FROM activity_logs al
       JOIN activities a ON al.activity_id = a.id
       JOIN users u ON u.id = al.user_id
       WHERE al.user_id = $1 AND al.log_date = $2`,
      [user_id, date]
    );

    const activities = activityResult.rows[0];

    const balance = {
      total_calories_consumed: parseFloat(foods.total_calories) || 0,
      total_protein: parseFloat(foods.total_protein) || 0,
      total_carbs: parseFloat(foods.total_carbs) || 0,
      total_fat: parseFloat(foods.total_fat) || 0,
      total_fiber: parseFloat(foods.total_fiber) || 0,
      total_calories_burned: parseFloat(activities.calories_burned) || 0,
      net_balance: (parseFloat(foods.total_calories) || 0) - (parseFloat(activities.calories_burned) || 0)
    };

    res.json(balance);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al calcular balance energético' });
  }
});

module.exports = router;
