const mongoose = require("mongoose");

const vacanteSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  ubicacion: {
    type: String,
    required: true
  },
  salario: {
    type: String,
    required: true
  },
  fechaPublicacion: {
    type: Date,
    default: Date.now
  },
  experienciaRequerida: {
    type: String,
    required: true
  },
  requisitosEstudio: {
    type: String,
    required: true
  },
  NBC: {
    type: String, // Esto se puede definir libremente por el reclutador
    required: true
  }
});

module.exports = mongoose.model("Vacante", vacanteSchema);