const express = require("express");
const router = express.Router();
const Vacante = require("../model/vacanteModel");
const verifyToken = require("../middleware/verifyToken");

router.post("/",verifyToken, (req, res) => {
  const { titulo, descripcion, ubicacion, salario, experienciaRequerida, requisitosEstudio, NBC } = req.body;
  const vacante = new Vacante({ titulo, descripcion, ubicacion, salario, experienciaRequerida, requisitosEstudio, NBC });
  vacante.save()
    .then(() => res.status(201).send({ message: "Vacante creada correctamente" }))
    .catch((error) => res.status(400).json({ message: error.message }));
});
//consolta sss
router.get("/",verifyToken, (req, res) => {
  Vacante.find()
    .then((vacantes) => res.json(vacantes))
    .catch((error) => res.status(400).json({ message: error.message }));
});

router.get('/:id',verifyToken, async (req, res) => {
  try {
    const vacante = await Vacante.findById(req.params.id);

    if (!vacante) {
      return res.status(404).json({ message: 'Vacante no encontrada' });
    }

    res.json(vacante);

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la vacante', error });
  }
});


router.put("/:id",verifyToken, (req, res) => {
  const { titulo, descripcion, ubicacion, salario, experienciaRequerida, requisitosEstudio, NBC } = req.body;
  Vacante.findByIdAndUpdate(req.params.id, { titulo, descripcion, ubicacion, salario, experienciaRequerida, requisitosEstudio, NBC }, { new: true })
    .then((vacante) => res.json(vacante))
    .catch((error) => res.status(400).json({ message: error.message }));
});

router.delete("/:id",verifyToken, (req, res) => {
  Vacante.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: "Vacante eliminada correctamente" }))
    .catch((error) => res.status(400).json({ message: error.message }));
});
module.exports = router;