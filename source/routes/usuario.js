const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarioModel");

router.post("/users", async (req, res) => {
  try {
    const { email } = req.body;
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ message: "El correo ya está registrado" });

    const usuario = new Usuario(req.body);
    const guardado = await usuario.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todos los usuarios
router.get("/users", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Filtrar usuarios por rol
router.get("/users", async (req, res) => {
  try {
    const { rol } = req.query;
    const filtro = rol ? { rol } : {};
    const usuarios = await Usuario.find(filtro);
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;