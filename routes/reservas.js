const express = require('express');
const router = express.Router();
const Reserva = require('../models/reserva');
const Espacio = require('../models/espacio');

// Obtener todas las reservas
router.get('/', async (req, res) => {
    try {
        const reservas = await Reserva.find().populate('espacio');
        res.json(reservas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear una nueva reserva
router.post('/', async (req, res) => {
    const { fecha, usuario, espacioId } = req.body;
    try {
        const espacio = await Espacio.findById(espacioId);
        if (!espacio) {
            return res.status(404).json({ error: 'Espacio no encontrado' });
        }

        const nuevaReserva = new Reserva({ fecha, usuario, espacio: espacioId });
        const reservaGuardada = await nuevaReserva.save();

        // Añadir la reserva al espacio
        espacio.reservas.push(reservaGuardada._id);
        await espacio.save();

        res.status(201).json(reservaGuardada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Actualizar una reserva
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const reservaActualizada = await Reserva.findByIdAndUpdate(id, req.body, { new: true });
        res.json(reservaActualizada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Eliminar una reserva
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const reserva = await Reserva.findById(id);
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        // Eliminar la reserva del espacio
        const espacio = await Espacio.findById(reserva.espacio);
        if (espacio) {
            espacio.reservas.pull(reserva._id);
            await espacio.save();
        }

        await reserva.remove();
        res.json({ message: 'Reserva eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
