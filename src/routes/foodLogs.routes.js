const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Registrar consumo de un alimento
router.post('/', async (req, res) => {
  try {
    const { user_id, food_id, quantity_grams, log_date } = req.body;

    const result = await pool.query(
      `INSERT INTO food_logs (user_id, food_id, quantity_grams, log_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user_id, food_id, quantity_grams, log_date || new Date()]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar consumo' });
  }
});

// Obtener consumos de un usuario por fecha
router.get('/:user_id/:date', async (req, res) => {
  try {
    const { user_id, date } = req.params;

    const result = await pool.query(
      `SELECT fl.id, f.name, f.calories_per_100g, f.protein_per_100g, f.carbs_per_100g,
              f.fat_per_100g, f.fiber_per_100g, fl.quantity_grams, fl.log_date
       FROM food_logs fl
       JOIN foods f ON fl.food_id = f.id
       WHERE fl.user_id = $1 AND fl.log_date = $2`,
      [user_id, date]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener consumos' });
  }
});

// Obtener resumen calórico diario de un usuario
router.get('/summary/:user_id/:date', async (req, res) => {
  try {
    const { user_id, date } = req.params;

    const result = await pool.query(
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

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al calcular resumen calórico' });
  }
});

module.exports = router;
