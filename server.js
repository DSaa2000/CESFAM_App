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
let connectionString2 = 'mongodb+srv://admin:1234@cluster0.bshluul.mongodb.net/';
mongoose.connect(connectionString2, { useNewUrlParser: true, useUnifiedTopology: true });
let apolloServer = null;

const typeDefs = gql`
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

    getPrescripcion: Prescripcion
    getPrescripciones: [Prescripcion]
    getDetalles(prescripcion: String): [Detalle]
}
type Mutation {
    addMedicamento(input: Medicamento_Input): Medicamento
    updateMedicamento(id: ID!, input: Medicamento_Input): Medicamento
    deleteMedicamento(id: ID!): Alert

    addPrescripcion(input: Prescripcion_Input): Prescripcion
    updatePrescripcion(id: ID!, input: Prescripcion_Input): Prescripcion
    addDetalle(input: Detalle_Input): Detalle
    updateDetalle(id: ID!, input: Detalle_Input): Detalle
}
type Prescripcion {
    id: ID!
    fecha_emision: String!
    paciente: String!
    nombre: String!
    medico: String!
}

input Prescripcion_Input {
    fecha_emision: String!
    paciente: String!
    nombre: String!
    medico: String!
}
type Alert{ 
    code: String
    message: String
}
`
const resolvers = {
    Query: {
        // Medicamentos
        async getMedicamentos() {
            try {                
                const medicamentos = await Medicamento.find();
                return medicamentos;
            } catch (error) {
                Error.log(error);
            }
        },
        async getMedicamento(obj, {id} ) {
            try {
                const medicamento = await Medicamento.findById(id);
                return medicamento;   
            } catch (error) {
                Error.log(error);
            }
        },
        // Usuarios
        async getUsuarios() {
            try {
                const usuarios = await Usuario.find();
                return usuarios;
            } catch (error) {
                Error.log(error);
            }
        },
        async getUsuario(obj, {rut} ) {
            try {
                const usuario = await Usuario.findOne({rut}).exec();
                return usuario;
            } catch (error) {
                Error.log(error);
            }            
        },
        // Prescripciones
        async getPrescripcion(obj, {id}) {
            try {
                const prescripcion = await Prescripcion.findById(id);
                return prescripcion;
            }catch (error) {
                Error.log(error);
            }
        },
        async getPrescripciones() {
            try {
                const lista = await Prescripcion.find();
                return lista;
            }catch (error) {
                Error.log(error);
            }
        },
        async getDetalles(obj, {prescripcion}) {
            try {
                const detalles = await Detalle.find({prescripcion});
                return detalles;
            } catch (error) {
                Error.log(error);
            }
        }
    },
    Mutation: {
        // Medicamentos
        async addMedicamento(obj, { input }) {
            try {
                const medicamento = new Medicamento(input);
                await medicamento.save();
                return medicamento;                
            } catch (error) {
                Error.log(error);
            }
        },
        async updateMedicamento(obj, {id, input}) {
            try {
                const medicamento = Medicamento.findByIdAndUpdate(id, input);
                return medicamento;                
            } catch (error) {
                Error.log(error);
            }
        },
        async deleteMedicamento(obj, {id}){
            try {
                await Medicamento.deleteOne({_id: id});
                return {
                    message: 'Usuario Eliminado'
                }   
            } catch (error) {
                Error.log(error);
            }             
        },
        // Prescripciones
        async addPrescripcion(obj, {input}) {
            try {
                const prescripcion = new Prescripcion(input);
                await prescripcion.save();
                return prescripcion;
            } catch (error) {
                Error.log(error);
            }
        },
        async updatePrescripcion(obj, {id,input}) {
            try {
                const prescripcion = Prescripcion.findByIdAndUpdate(id,input);
                return prescripcion;
            } catch (error) {
                Error.log(error);
            }
        },
        async addDetalle(obj, { input }) {
            try {
                const detalle = new Detalle(input);
                await detalle.save();
                return detalle;
            } catch (error) {
                Error.log(error);
            }            
        },
        async updateDetalle(obj, {id, input}) {
            try {
                const detalle = Detalle.findByIdAndUpdate(id, input);
                return detalle;
            } catch (error) {
                Error.log(error);
            }            
        }
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

const app = new express();
app.use(cors());
app.listen(8090, function () {
    console.log("Servidor Iniciado");
});