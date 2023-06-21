const Otros=`
type Query {
    getUsuarios(): [Usuario]
    getUsuario(id: ID!): Usuario
    
}
type Alert{ 
    code: String
    message: String
}`
export default {Otros}