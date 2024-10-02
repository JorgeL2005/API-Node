const express = require('express');
const router = express.Router();
const Espacio = require('../models/espacio');

// Obtener todos los espacios
router.get('/', async (req, res) => {
    try {
        const espacios = await Espacio.find().populate('reservas');
        res.json(espacios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear un nuevo espacio
router.post('/', async (req, res) => {
    const { nombre, ubicacion, capacidad } = req.body;
    try {
        const nuevoEspacio = new Espacio({ nombre, ubicacion, capacidad });
        const espacioGuardado = await nuevoEspacio.save();
        res.status(201).json(espacioGuardado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Actualizar un espacio
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const espacioActualizado = await Espacio.findByIdAndUpdate(id, req.body, { new: true });
        res.json(espacioActualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Eliminar un espacio
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Espacio.findByIdAndDelete(id);
        res.json({ message: 'Espacio eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
