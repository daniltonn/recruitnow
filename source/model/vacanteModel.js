const mongoose = require("mongoose");

const vacanteSchema = new mongoose.Schema({
  titulo: {
    type: String,
    
  },
  descripcion: {
    type: String,
    
  },
  ubicacion: {
    type: String,
    
  },
  salario: {
    type: String,
   
  },
  fechaPublicacion: {
    type: Date,
    default: Date.now
  },
  experienciaRequerida: {
    type: String,
    
  },
  requisitosEstudio: {
    type: String,
    
  },
  NBC: {
    type: String, // Esto se puede definir libremente por el reclutador
    
  }
});

module.exports = mongoose.model("Vacante", vacanteSchema);