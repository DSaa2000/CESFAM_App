const mongoose = require('mongoose');
const reservaSchema = new mongoose.Schema(
    {
        id: String,
        codigo: String,
        nombreMedicamento: String,
        laboratorio: String,
        cantidadReservada: String,
        fechaLlegada: String,
    }
);

module.exports = mongoose.model('reserva',reservaSchema);