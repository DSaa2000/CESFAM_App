const mongoose = require('mongoose');
const detalleSchema = new mongoose.Schema(
    {
        id: String,
        prescripcion: String,
        medicamento: String,
        cantidad: Number,
        estado: String
    }
);

module.exports = mongoose.model('detalle',detalleSchema);