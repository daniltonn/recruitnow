const express = require("express");
const router = express.Router();
const Usuario = require("../model/usuarioModel");
const verifyToken = require("../middleware/verifyToken");


router.post("/", verifyToken, async (req, res) => {
  try {
    const { nombre, email, contrasena, rol } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contrasena,
      rol
    });

    // Encriptar contraseña
    nuevoUsuario.contrasena = await nuevoUsuario.encryptClave(contrasena);

    const guardado = await nuevoUsuario.save();

    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todos los usuarios
router.get("/", verifyToken,async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Filtrar usuarios por rol
router.get("/", verifyToken,async (req, res) => {
  try {
    const { rol } = req.query;
    const filtro = rol ? { rol } : {};
    const usuarios = await Usuario.find(filtro);
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/:id", verifyToken,async (req, res) => {
  try {
    const existe = await Usuario.findById(req.params.id);
    if (!existe) return res.status(404).json({ message: "Usuario no encontrado" });

    const actualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/:id", verifyToken ,async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", verifyToken,async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ message: "ID no válido" });
  }
});

module.exports = router;