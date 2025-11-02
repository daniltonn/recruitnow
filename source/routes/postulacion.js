const express = require("express");
const router = express.Router();
const Postulacion = require("../model/postulacionModel");

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const postulaciones = await Postulacion.find().populate("usuario").populate("vacante");
    res.json(postulaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const { usuario, vacante } = req.query;
    const filtro = {};
    if (usuario) filtro.usuario = usuario;
    if (vacante) filtro.vacante = vacante;

    const postulaciones = await Postulacion.find(filtro).populate("usuario").populate("vacante");
    res.json(postulaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.put("/:id", async (req, res) => {
  try {
    const { estado } = req.body;
    const permitidos = ["Pendiente", "Aceptada", "Rechazada"];
    if (!permitidos.includes(estado)) return res.status(400).json({ message: "Estado no válido" });

    const actualizado = await Postulacion.findByIdAndUpdate(req.params.id, { estado }, { new: true });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



router.delete("/:id", async (req, res) => {
  try {
    const existe = await Postulacion.findById(req.params.id);
    if (!existe) return res.status(404).json({ message: "Postulación no encontrada" });

    await Postulacion.findByIdAndDelete(req.params.id);
    res.json({ message: "Postulación eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: "ID inválido o no encontrado" });
  }
});

module.exports = router;
