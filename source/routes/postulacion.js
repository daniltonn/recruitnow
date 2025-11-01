const express = require("express");
const router = express.Router();
const Postulacion = require("../models/Postulacion");

router.post("/applications", async (req, res) => {
  try {
    const { usuario, vacante } = req.body;
    const existe = await Postulacion.findOne({ usuario, vacante });
    if (existe) return res.status(400).json({ message: "El usuario ya postuló a esta vacante" });

    const postulacion = new Postulacion(req.body);
    const guardada = await postulacion.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
