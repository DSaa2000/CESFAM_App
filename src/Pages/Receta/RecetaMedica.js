import '../Medicamentos/Medicamentos.css'
import React from "react";
import { Box,Divider,Grid,InputBase,List,ListItem,ListItemText,ListSubheader,Paper,Button, Modal } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({

  uri: 'http://localhost:8090/graphql',
  cache: new InMemoryCache(),

});

const ADD_PRESCRIPCION = gql`
  mutation addPrescripcion($input: Prescripcion_Input!) {
    addPrescripcion(input: $input) {
      medico
      paciente
      fecha_emision
      medicamentos {
        id
        nombre
        dosis
    }
    }
  }
`;
const _spacing = 2;






const Title = ({ children }) => {
    return (
        <p style={{fontWeight: "bold", margin: 0}}>{children}</p>
    );
}

const CustomBox = ({ children, style }) => {
    return (
        <Paper sx={{padding: "0 1em", boxSizing: "content-box", background: "#F4EEE5", ...style}} elevation={0}>
            {children}
        </Paper>
    );
}



const Prescripciones = () => {

    const [fecha_emision, setFecha_emision] = useState('');
    const [medicamentos, setMedicamentos] = useState([{ nombre: '', dosis: '' }]);
    const [medico, setMedico] = useState('');
    const [paciente, setPaciente] = useState('');
    const handleMedicamentosChange = (index, field, value) => {
        const updatedMedicamentos = [...medicamentos];
        updatedMedicamentos[index][field] = value;
        setMedicamentos(updatedMedicamentos);
    };
    const handleAddMedicamentos = () => {
        setMedicamentos([...medicamentos, { nombre: '', dosis: '' }]);
    };
    
    const handleRemoveMedicamentos = (index) => {
        const updatedMedicamentos = [...medicamentos];
        updatedMedicamentos.splice(index, 1);
        setMedicamentos(updatedMedicamentos);
    };
    
    const handleSubmit = (addPrescripcion) => (event) => {
        event.preventDefault();
    
        addPrescripcion({
          variables: {
            input: {
              paciente,
              medico,
              fecha_emision,
              medicamentos
            }
          }
        })
          .then((response) => {
            console.log(response.data); 
          })
          .catch((error) => {
            console.error(error);
          });
      };

    

    return (
        <ApolloProvider client={client}>
        <Mutation mutation={ADD_PRESCRIPCION}>

            {(addPrescripcion, { data }) => (

        <div>
          <form onSubmit={handleSubmit(addPrescripcion)}>

            {/* <input ref={node => {medico = node;}}/>
            <input ref={node => {paciente = node;}}/>
            <input ref={node => {fecha_emision = node;}}/> 

            <button type="submit">Add Todo</button> */}

          
        <Box sx={{ flexGrow: 1}}>
                <Grid item xs={12} lg={8} p={_spacing} >
                    <Grid container spacing={_spacing}>
                        <Grid item xs={12}><h1>Receta Médica Electrónica</h1></Grid>
                            <Grid item xs={12} sm={6}>
                                <Title>{"Medico"}</Title>
                                <CustomBox>
                                    <InputBase sx={{width: "100%"}} value = {medico} onChange={(e) => setMedico(e.target.value)} />
                                </CustomBox>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Title>{"Fecha de Emisión"}</Title>
                                <CustomBox>
                                    <InputBase sx={{width: "100%"}}  value = {fecha_emision} onChange={(e) => setFecha_emision(e.target.value)} />
                                </CustomBox>
                            </Grid>
                            <Grid item xs={12}>
                                <Title>{"Nombre del Paciente"}</Title>
                                <CustomBox>
                                    <InputBase sx={{width: "100%"}}  value = {paciente} onChange={(e) => setPaciente(e.target.value)} />
                                </CustomBox>
                            </Grid>
                            
                            <div>
                <label>Medicamentos:</label>
                {medicamentos.map((medicamento, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder="Nombre del Medicamento"
                      value={medicamento.nombre}
                      onChange={(event) =>
                        handleMedicamentosChange(index, 'nombre', event.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Dosis"
                      value={medicamento.dosis}
                      onChange={(event) =>
                        handleMedicamentosChange(index, 'dosis', event.target.value)
                      }
                    />
                    <button type="button" onClick={() => handleRemoveMedicamentos(index)}>
                      Eliminar
                    </button>
                  </div>
                ))}
                <button type="button" onClick={handleAddMedicamentos}>
                  Agregar Medicamento
                </button>
                 </div>
                        {/* <Grid item xs={12}>
                            <Title>Prescripción</Title>
                            <Grid container spacing={_spacing}>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        {medicamentos.map(medicamento,index) => {
                                            return (
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <CustomBox style={{height: "2em", marginTop: ".2em", display: "flex", alignItems: "center"}}>
                                                        <Field placeholder="medicamento"/>
                                                    </CustomBox>
                                                    <CustomBox style={{height: "2em", margin: ".2em 0 0 0", display: "flex", alignItems: "center"}}>
                                                        <Field  placeholder="cantidad"/>
                                                    </CustomBox>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid> */}
                        <Grid item xs={12} md={5}>
                            <p>
                                <b>Dr. Federico Santa María</b><br></br>
                                RUN 11.111.111-1<br></br>
                                Especialidad: Médico Cirujano
                            </p>
                        </Grid>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" type="submit" disableElevation fullWidth style={{marginTop: "1em", backgroundColor: "#A6D1E6", color: "#2C2C2F"}}>Emitir</Button>
                        </Grid>
                    </Grid>
                </Grid>
        </Box>
        </form>
        </div>

      )}
        </Mutation>
        </ApolloProvider>
    )
}

export default Prescripciones;