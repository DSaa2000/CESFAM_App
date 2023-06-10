const typedefs=`
type Medicamento {
    id: ID!
    codigo: String!
    nombre: String!
    laboratorio: String!
    stock: Int!
    fecha: String!
    dosis: Int!
    unidadMedida: String!
    condiciones: String!
}
type Query {
    getMedicamento(id): Medicamento
    getMedicamentos(): [Medicamento]
}
input Medicamento_Input {
    codigo: String!
    nombre: String!
    laboratorio: String!
    stock: Int!
    fecha: String!
    dosis: Int!
    unidad_Medida: String!
    condiciones_Conservacion: String!
}
type Mutation_Medicamento {
    addMedicamento(Medicamento_Input): Medicamento
    updateMedicamento(id: ID!, input: Medicamento): Medicamento
    delMedicamento(id: ID!): Alert
}
type Query {
    getUsuarios(): [Usuario]
    getUsuario(id: ID!): Usuario
    
}
type Alert{ 
    code: String
    message: String
}
type Prescripcion {
    id: ID!
    fecha_emision: DateTime!
    paciente: Usuario!
    nombre: String!
    lista: [Detalle]
    medico: Usuario!
}
type Detalle {
    id: ID!
    medicamento: String!
    cantidad: Int!
    estado: Estado
}
type Estado {
    id: ID!
    correo: String!
}
type Query_Prescripciones {
    getPrescripciones(): [Prescripcion]
    getPrescripcion(id: ID!): Prescripcion
}
input Prescripcion_Input {
    fecha_emision: DateTime!
    paciente: Usuario!
    nombre: String!
    lista: [Detalle]
    medico: Usuario!
}
type Mutation_Prescripcion {
    addPrescripcion(Prescripcion_Input): Prescripcion
    updatePrescripcion(id: ID!, input: Prescripcion_Input): Prescripcion
    delPrescripcion(id: ID!): Alert
}

type Usuario {
    id: ID!
    correo: String!
    nombre: String!
    rol: Rol!
    contrasena: String!
    rut: String!
    telefono: String!
}
type Rol {
    id: ID
    nombre: String!
}
input UsuarioInput {
    correo: String!
    nombre: String!
    rol: Rol!
    contrasena: String!
    rut: String!
    telefono: String!
}
type Mutation_Usuario {
    addUsuario(UsuarioInput): Usuario
    update(id: ID!, input: UsuarioInput): Usuario
    del Usuario(id: ID!): Alert
}
`