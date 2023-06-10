const mongoose = require('mongoose');
const medicamentoSchema = new mongoose.Schema(
    {
    id: String,
    codigo: String,
    nombre: String,
    laboratorio: String,
    stock: String,
    fecha: String,
    dosis: String,
    unidadMedida: String,
    condiciones: String
    }
);

module.exports = mongoose.model('medicamento',medicamentoSchema);