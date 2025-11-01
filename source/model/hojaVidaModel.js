const mongoose = require("mongoose");

const hojaVidaSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  informacionPersonal: {
    nombre: {
      type: String,
      required: true
    },
    apellido: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    telefono: {
      type: String,
      required: true
    },
    direccion: {
      type: String
    },
    fechaNacimiento: {
      type: Date
    },
    nacionalidad: {
      type: String
    }
  },
  resumenProfesional: {
    type: String,
    maxlength: 500
  },
  experienciaLaboral: [{
    empresa: {
      type: String,
      required: true
    },
    cargo: {
      type: String,
      required: true
    },
    fechaInicio: {
      type: Date,
      required: true
    },
    fechaFin: {
      type: Date
    },
    descripcion: {
      type: String
    },
    esTrabajoActual: {
      type: Boolean,
      default: false
    }
  }],
  educacion: [{
    institucion: {
      type: String,
      required: true
    },
    titulo: {
      type: String,
      required: true
    },
    fechaInicio: {
      type: Date,
      required: true
    },
    fechaFin: {
      type: Date
    },
    descripcion: {
      type: String
    },
    esEstudioActual: {
      type: Boolean,
      default: false
    }
  }],
  habilidades: [{
    nombre: {
      type: String,
      required: true
    },
    nivel: {
      type: String,
      enum: ["Básico", "Intermedio", "Avanzado", "Experto"],
      default: "Básico"
    }
  }],
  idiomas: [{
    idioma: {
      type: String,
      required: true
    },
    nivel: {
      type: String,
      enum: ["Básico", "Intermedio", "Avanzado", "Nativo"],
      default: "Básico"
    }
  }],
  certificaciones: [{
    nombre: {
      type: String,
      required: true
    },
    institucion: {
      type: String,
      required: true
    },
    fechaObtencion: {
      type: Date,
      required: true
    },
    fechaVencimiento: {
      type: Date
    },
    credencial: {
      type: String
    }
  }],
  proyectos: [{
    nombre: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    },
    tecnologias: [String],
    fechaInicio: {
      type: Date
    },
    fechaFin: {
      type: Date
    },
    url: {
      type: String
    }
  }],
  referencias: [{
    nombre: {
      type: String,
      required: true
    },
    cargo: {
      type: String
    },
    empresa: {
      type: String
    },
    telefono: {
      type: String
    },
    email: {
      type: String
    }
  }],
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  },
  esPublica: {
    type: Boolean,
    default: false
  }
});

// Middleware para actualizar fechaActualizacion antes de guardar
hojaVidaSchema.pre('save', function(next) {
  this.fechaActualizacion = Date.now();
  next();
});

hojaVidaSchema.pre('findOneAndUpdate', function(next) {
  this.set({ fechaActualizacion: Date.now() });
  next();
});

module.exports = mongoose.model("HojaVida", hojaVidaSchema);