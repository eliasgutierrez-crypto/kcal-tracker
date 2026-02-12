const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Crear una actividad
router.post('/', async (req, res) => {
  try {
    const { name, met_value } = req.body;

    const result = await pool.query(
      `INSERT INTO activities (name, met_value)
       VALUES ($1, $2)
       RETURNING *`,
      [name, met_value]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear actividad' });
  }
});

// Listar todas las actividades
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM activities');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
});

module.exports = router;
