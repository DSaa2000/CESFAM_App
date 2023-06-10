const mongoose = require('mongoose');
const medicamentoSchema = new mongoose.Schema(
    {
    codigo: String,
    nombre: String,
    laboratorio: String,
    stock: Number,
    fecha: String,
    dosis: Number,
    unidadMedida: String,
    condiciones: String
    }
);

module.exports = mongoose.model('medicamento',medicamentoSchema);