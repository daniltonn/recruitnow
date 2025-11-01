const express = require("express");
const router = express.Router();
const Usuario = require("../model/usuarioModel");

router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Filtrar usuarios por rol
router.get("/", async (req, res) => {
  try {
    const { rol } = req.query;
    const filtro = rol ? { rol } : {};
    const usuarios = await Usuario.find(filtro);
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const existe = await Usuario.findById(req.params.id);
    if (!existe) return res.status(404).json({ message: "Usuario no encontrado" });

    const actualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ message: "ID no válido" });
  }
});

module.exports = router;