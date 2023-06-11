const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema(
    {
        id: String,
        rol: String,
        nombre: String,
        fechaNacimiento: String,
        correo: String,
        contrasena: String,
        rut: String,
        edad:String,
        telefono: String,
        especialidad: String
    }
);

module.exports = mongoose.model('usuario',usuarioSchema);