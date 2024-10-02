const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    fecha: { type: Date, required: true },
    usuario: { type: String, required: true },
    espacio: { type: mongoose.Schema.Types.ObjectId, ref: 'Espacio', required: true }
});

module.exports = mongoose.model('Reserva', reservaSchema);
