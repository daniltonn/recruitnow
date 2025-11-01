const express = require("express");
const router = express.Router();
const HojaVida = require("../model/hojaVidaModel");
const Usuario = require("../model/usuarioModel");

// RF5 - Crear Hoja de Vida
router.post("/", async (req, res) => {
    try {
        const { usuarioId } = req.body;

        // Verificar que el usuario existe
        const usuarioExiste = await Usuario.findById(usuarioId);
        if (!usuarioExiste) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar si el usuario ya tiene una hoja de vida
        const hojaVidaExistente = await HojaVida.findOne({ usuarioId });
        if (hojaVidaExistente) {
            return res.status(400).json({ message: "El usuario ya tiene una hoja de vida creada" });
        }

        const hojaVida = new HojaVida(req.body);
        const guardada = await hojaVida.save();

        // Poblar la información del usuario
        const hojaVidaCompleta = await HojaVida.findById(guardada._id).populate('usuarioId', 'nombre email');

        res.status(201).json({
            message: "Hoja de vida creada exitosamente",
            data: hojaVidaCompleta
        });
    } catch (error) {
        res.status(400).json({
            message: "Error al crear la hoja de vida",
            error: error.message
        });
    }
});

// RF6 - Consultar Hojas de Vida (todas)
router.get("/", async (req, res) => {
    try {
        const { usuarioId, esPublica, page = 1, limit = 10 } = req.query;

        // Construir filtros
        const filtros = {};
        if (usuarioId) filtros.usuarioId = usuarioId;
        if (esPublica !== undefined) filtros.esPublica = esPublica === 'true';

        // Paginación
        const skip = (page - 1) * limit;

        const hojasVida = await HojaVida.find(filtros)
            .populate('usuarioId', 'nombre email rol')
            .sort({ fechaActualizacion: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await HojaVida.countDocuments(filtros);

        res.json({
            message: "Hojas de vida obtenidas exitosamente",
            data: hojasVida,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las hojas de vida",
            error: error.message
        });
    }
});

// RF6 - Consultar Hoja de Vida específica por ID
router.get("/:id", async (req, res) => {
    try {
        const hojaVida = await HojaVida.findById(req.params.id)
            .populate('usuarioId', 'nombre email rol fechaRegistro');

        if (!hojaVida) {
            return res.status(404).json({ message: "Hoja de vida no encontrada" });
        }

        res.json({
            message: "Hoja de vida obtenida exitosamente",
            data: hojaVida
        });
    } catch (error) {
        res.status(400).json({
            message: "Error al obtener la hoja de vida",
            error: "ID no válido"
        });
    }
});

// RF6 - Consultar Hoja de Vida por Usuario
router.get("/usuario/:usuarioId", async (req, res) => {
    try {
        const hojaVida = await HojaVida.findOne({ usuarioId: req.params.usuarioId })
            .populate('usuarioId', 'nombre email rol fechaRegistro');

        if (!hojaVida) {
            return res.status(404).json({ message: "El usuario no tiene hoja de vida" });
        }

        res.json({
            message: "Hoja de vida del usuario obtenida exitosamente",
            data: hojaVida
        });
    } catch (error) {
        res.status(400).json({
            message: "Error al obtener la hoja de vida del usuario",
            error: error.message
        });
    }
});

// RF7 - Editar Hoja de Vida
router.put("/:id", async (req, res) => {
    try {
        const hojaVidaExiste = await HojaVida.findById(req.params.id);
        if (!hojaVidaExiste) {
            return res.status(404).json({ message: "Hoja de vida no encontrada" });
        }

        // Si se está cambiando el usuarioId, verificar que el nuevo usuario existe
        if (req.body.usuarioId && req.body.usuarioId !== hojaVidaExiste.usuarioId.toString()) {
            const usuarioExiste = await Usuario.findById(req.body.usuarioId);
            if (!usuarioExiste) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            // Verificar que el nuevo usuario no tenga ya una hoja de vida
            const otraHojaVida = await HojaVida.findOne({
                usuarioId: req.body.usuarioId,
                _id: { $ne: req.params.id }
            });
            if (otraHojaVida) {
                return res.status(400).json({ message: "El usuario ya tiene otra hoja de vida" });
            }
        }

        const hojaVidaActualizada = await HojaVida.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('usuarioId', 'nombre email rol');

        res.json({
            message: "Hoja de vida actualizada exitosamente",
            data: hojaVidaActualizada
        });
    } catch (error) {
        res.status(400).json({
            message: "Error al actualizar la hoja de vida",
            error: error.message
        });
    }
});

// RF8 - Eliminar Hoja de Vida
router.delete("/:id", async (req, res) => {
    try {
        const hojaVidaEliminada = await HojaVida.findByIdAndDelete(req.params.id);

        if (!hojaVidaEliminada) {
            return res.status(404).json({ message: "Hoja de vida no encontrada" });
        }

        res.json({
            message: "Hoja de vida eliminada exitosamente",
            data: {
                id: hojaVidaEliminada._id,
                usuarioId: hojaVidaEliminada.usuarioId
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la hoja de vida",
            error: error.message
        });
    }
});

module.exports = router;