const mongoose = require('mongoose');
const prescripcionSchema = new mongoose.Schema(
    {
        fecha_emision: String, //DateTime
        paciente: String,
        nombre: String,
        medico: String
    }
);

module.exports = mongoose.model('prescripcion',prescripcionSchema);