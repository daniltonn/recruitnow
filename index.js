
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
require('dotenv').config();

// ✅ Middleware para leer datos del body
app.use(express.urlencoded({ extended: false })); // permite leer los datos que vienen en la petición
app.use(express.json()); // transforma los datos a formato JSON

// ✅ Rutas
app.use("/api", "vacante");


// ✅ Conexión a la base de datos
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log(error));

// ✅ Conexión al puerto
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});