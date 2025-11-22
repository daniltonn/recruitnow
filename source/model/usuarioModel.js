const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contrasena: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ["Candidato", "Reclutador", "Administrador"],
    default: "Candidato"
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

// Método para encriptar contraseña
usuarioSchema.methods.encryptClave = async function (clave) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(clave, salt);
};

// Método para validar contraseña
usuarioSchema.methods.validarClave = async function (clavePlano) {
  return bcrypt.compare(clavePlano, this.contrasena);
};

module.exports = mongoose.model("Usuario", usuarioSchema);
