const mongoose = require('mongoose');

const espacioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    ubicacion: { type: String, required: true },
    capacidad: { type: Number, required: true },
    reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reserva' }]
});

module.exports = mongoose.model('Espacio', espacioSchema);
