const mongoose = require("mongoose");

const postulacionSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
  vacante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vacante"
  }
});

module.exports = mongoose.model("Postulacion", postulacionSchema);
