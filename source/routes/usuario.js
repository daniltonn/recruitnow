const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");

// Crear usuario
router.post("/users", async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    const guardado = await usuario.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;