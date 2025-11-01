const express = require("express");
const router = express.Router();
const Vacante = require("../model/vacanteModel");

router.post("/", (req, res) => {
  const { titulo, descripcion, ubicacion, salario, experienciaRequerida, requisitosEstudio, NBC } = req.body;
  const vacante = new Vacante({ titulo, descripcion, ubicacion, salario, experienciaRequerida, requisitosEstudio, NBC });
  vacante.save()
    .then(() => res.status(201).send({ message: "Vacante creada correctamente" }))
    .catch((error) => res.status(400).json({ message: error.message }));
});
//consolta sss
router.get("/", (req, res) => {
  Vacante.find()
    .then((vacantes) => res.json(vacantes))
    .catch((error) => res.status(400).json({ message: error.message }));
});

router.put("/:id", (req, res) => {
  const { titulo, descripcion, ubicacion, salario, experienciaRequerida, requisitosEstudio, NBC } = req.body;
  Vacante.findByIdAndUpdate(req.params.id, { titulo, descripcion, ubicacion, salario, experienciaRequerida, requisitosEstudio, NBC }, { new: true })
    .then((vacante) => res.json(vacante))
    .catch((error) => res.status(400).json({ message: error.message }));
});

router.delete("/:id", (req, res) => {
  Vacante.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: "Vacante eliminada correctamente" }))
    .catch((error) => res.status(400).json({ message: error.message }));
});
module.exports = router;