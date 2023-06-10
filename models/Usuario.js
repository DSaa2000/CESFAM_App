const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema(
    {
        correo: String,
        nombre: String,
        rol: String,//Rol
        contrasena: String,
        rut: String,
        telefono: String
    }
);

module.exports = mongoose.model('usuario',usuarioSchema);