const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  contraseña: String
});

module.exports = mongoose.model("Usuario", usuarioSchema);