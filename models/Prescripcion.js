const mongoose = require('mongoose');
const prescripcionSchema = new mongoose.Schema(
    {
        fecha_emision: String, //DateTime
        paciente: String,
        medico: String,
        medicamentos: [{ nombre: String, dosis: String }]
    }
);

module.exports = mongoose.model('prescripcion',prescripcionSchema);