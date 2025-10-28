const express = require("express");
const router = express.Router();
const Vacante = require("../models/Vacante");

router.post("/vacancies", (req, res) => {
  const { titulo, descripcion, ubicacion, salario, experienciaRequerida, requisitosEstudio, NBC } = req.body;
  const vacante = new Vacante({ titulo, descripcion, ubicacion, salario, experienciaRequerida, requisitosEstudio, NBC });
  vacante.save()
    .then(() => res.status(201).send({ message: "Vacante creada correctamente" }))
    .catch((error) => res.status(400).json({ message: error.message }));
});

module.exports = router;