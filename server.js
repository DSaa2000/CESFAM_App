//import {typeDefs} from "./models/typedefs"}
const {ObjectId} = require('mongodb');

const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const Usuario = require('./models/Usuario');
const Medicamento = require('./models/Medicamento');
const Detalle = require('./models/Detalle');
const Prescripcion = require('./models/Prescripcion');
const cors = require('cors');

let connectionString = 'mongodb+srv://admin:1234@cluster0.uebacdc.mongodb.net/Cesfam';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
let apolloServer = null;

const typeDefs=gql`
type Medicamento {
    id: ID!
    codigo: String!
    nombre: String!
    laboratorio: String!
    stock: Int!
    fecha: String!
    dosis: String!
    unidadMedida: String!
    condiciones: String!
}
input Medicamento_Input {
    codigo: String!
    nombre: String!
    laboratorio: String!
    stock: Int!
    fecha: String!
    dosis: String!
    unidadMedida: String!
    condiciones: String!
}
type Usuario {
    id: ID!
    rol: String!
    nombre: String!
    rut: String!
    fechaNacimiento: String!
    edad:String!
    correo: String!
    contrasena: String!
    telefono: String!
    especialidad: String
}
type Detalle {
    id: ID!
    prescripcion: String!
    medicamento: String!
    cantidad: Int!
    estado: String!
}
input Detalle_Input {
    medicamento: String!
    prescripcion: String!
    cantidad: Int!
    estado: String!
}
type Query {
    getMedicamentos: [Medicamento]
    getMedicamento(id: ID!): Medicamento

    getUsuarios: [Usuario]
    getUsuario(rut: String): Usuario

    getDetalles(prescripcion: String): [Detalle]
}
type Mutation {
    addMedicamento(input: Medicamento_Input): Medicamento
    updateMedicamento(id: ID!, input: Medicamento_Input): Medicamento
    deleteMedicamento(id: ID!): Alert

    addDetalle(input: Detalle_Input): Detalle
    updateDetalle(id: ID!, input: Detalle_Input): Detalle
}
type Alert{ 
    code: String
    message: String
}
`
const resolvers = {
    Query: {
        async getMedicamentos() {
            const medicamentos = await Medicamento.find();
            return medicamentos;
        },
        async getMedicamento(obj, {id} ) {
            const medicamento = await Medicamento.findById(id);
            return medicamento;
        },
        async getUsuarios() {
            const usuarios = await Usuario.find();
            return usuarios;
        },
        async getUsuario(obj, {rut} ) {
            const usuario = await Usuario.findOne({rut}).exec();
            return usuario;
        },
        async getDetalles(obj, {prescripcion}) {
            const detalles = await Detalle.find({prescripcion});
            return detalles;
        }
    },
    Mutation: {
        async addMedicamento(obj, { input }) {
            const medicamento = new Medicamento(input);
            await medicamento.save();
            return medicamento;
        },
        async updateMedicamento(obj, {id, input}) {
            const medicamento = Medicamento.findByIdAndUpdate(id, input);
            return medicamento;
        },
        async deleteMedicamento(obj, {id}){
            await Medicamento.deleteOne({_id: id});
            return {
                message: 'Usuario Eliminado'
            }    
        },
        async addDetalle(obj, { input }) {
            const detalle = new Detalle(input);
            await detalle.save();
            return detalle;
        },
        async updateDetalle(obj, {id, input}) {
            const detalle = Detalle.findByIdAndUpdate(id, input);
            return detalle;
        }

    },
    Alert: {
    }
}


const corsOptions = {
    origin: "http://localhost:8090",
    credentials: false
}

async function startServer(){
    apolloServer = new ApolloServer({typeDefs, resolvers, corsOptions});
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
}

startServer();

const app = express();
app.use(cors());
app.listen(8090, function () {
    console.log("Servidor Iniciado");
});