const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// --- Crear usuario ---
router.post('/', async (req, res) => {
  try {
    const { name, email, password, weight, height, age } = req.body;

    const result = await pool.query(
      `INSERT INTO users (name, email, password, weight, height, age)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, email, password, weight, height, age]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// --- Obtener todos los usuarios ---
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// --- Resumen diario ---
router.get('/:id/summary', async (req, res) => {
  const userId = req.params.id;
  const date = req.query.date; // Formato YYYY-MM-DD

  try {
    // Calorías y macros de los alimentos
    const foodRes = await pool.query(
      `SELECT 
         SUM(f.calories_per_100g * fl.quantity_grams / 100) AS total_calories,
         SUM(f.protein_per_100g * fl.quantity_grams / 100) AS total_protein,
         SUM(f.carbs_per_100g * fl.quantity_grams / 100) AS total_carbs,
         SUM(f.fat_per_100g * fl.quantity_grams / 100) AS total_fat,
         SUM(f.fiber_per_100g * fl.quantity_grams / 100) AS total_fiber
       FROM food_logs fl
       JOIN foods f ON fl.food_id = f.id
       WHERE fl.user_id = $1 AND fl.log_date = $2`,
      [userId, date]
    );

    // Calorías quemadas en actividades
    const activityRes = await pool.query(
      `SELECT 
         SUM(a.met_value * al.duration_minutes) AS total_calories_burned
       FROM activity_logs al
       JOIN activities a ON al.activity_id = a.id
       WHERE al.user_id = $1 AND al.log_date = $2`,
      [userId, date]
    );

    const summary = {
      total_calories_consumed: Number(foodRes.rows[0].total_calories) || 0,
      total_protein: Number(foodRes.rows[0].total_protein) || 0,
      total_carbs: Number(foodRes.rows[0].total_carbs) || 0,
      total_fat: Number(foodRes.rows[0].total_fat) || 0,
      total_fiber: Number(foodRes.rows[0].total_fiber) || 0,
      total_calories_burned: Number(activityRes.rows[0].total_calories_burned) || 0,
      net_balance: (Number(foodRes.rows[0].total_calories) || 0) - (Number(activityRes.rows[0].total_calories_burned) || 0)
    };

    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al generar resumen' });
  }
});

module.exports = router;
