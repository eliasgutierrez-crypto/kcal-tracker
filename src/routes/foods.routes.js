const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Crear un alimento
router.post('/', async (req, res) => {
  try {
    const {
      name,
      calories_per_100g,
      protein_per_100g,
      carbs_per_100g,
      fat_per_100g,
      fiber_per_100g
    } = req.body;

    const result = await pool.query(
      `INSERT INTO foods (name, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, fiber_per_100g)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, fiber_per_100g]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear alimento' });
  }
});

// Obtener todos los alimentos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM foods');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener alimentos' });
  }
});

module.exports = router;
