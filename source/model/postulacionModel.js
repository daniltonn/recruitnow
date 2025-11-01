const postulacionSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  vacante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vacante",
    required: true
  },
  fechaPostulacion: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ["Pendiente", "Aceptada", "Rechazada"],
    default: "Pendiente"
  }
});
