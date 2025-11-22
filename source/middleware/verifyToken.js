const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  // Leer header Authorization: "Bearer token"
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Acceso denegado. Se requiere token." });
  }

  // Dividir "Bearer token"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Formato de token inválido" });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.usuario = verified;
    next();

  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

module.exports = verifyToken;
