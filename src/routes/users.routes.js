const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Crear usuario
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

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});


module.exports = router;
