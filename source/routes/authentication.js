const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../model/usuarioModel');
require('dotenv').config();

// ----------------------
// REGISTRO (SIGNUP)
// ----------------------
router.post('/signup', async (req, res) => {
    console.log("BODY QUE LLEGA:", req.body); 
  try {
    const { nombre, email, contrasena, rol } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const usuario = new Usuario({
      nombre,
      email,
      contrasena,
      rol
    });

    // Encriptar contraseña
    usuario.contrasena = await usuario.encryptClave(contrasena);

    await usuario.save();

    // Crear payload JWT
    const payload = {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 // 1 día
    });

    res.json({
      datosUsuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        token,
        expiresIn: "86400"
      }
    });

  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario", detalle: error });
  }
});

// ----------------------
// LOGIN
// ----------------------
router.post('/login', async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const contrasenaValida = await usuario.validarClave(contrasena);
    if (!contrasenaValida) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    const payload = {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: 60 * 60 * 24
    });

    res.json({
      datosUsuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        token,
        expiresIn: "86400"
      }
    });

  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión", detalle: error });
  }
});

module.exports = router;
