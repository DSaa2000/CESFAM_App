import '../Medicamentos/Medicamentos.css'
import React from "react";
import { Box,Divider,Grid,InputBase,List,ListItem,ListItemText,ListSubheader,Paper,Button, Modal } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";

const _spacing = 2;

const getItems = (number) => {
    const items = [];
    for(let i=0; i < number; i++){
        items.push(
            {
                number: "P"+i,
                text: "Lorem ipsum is simply dummy text",
                key: i
            }
        );
    }
    return items;
}

const itemsList = getItems(15);

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

const Field = (props) => {
    return (
        <Grid item xs={props.xs} sm={props.sm} md={props.md}>
            <Title>{props.header}</Title>
            <CustomBox>
                <InputBase sx={{width: "100%"}} placeholder={props.placeholder}/>
            </CustomBox>
        </Grid>
    )
}

const medicamentos = [
    {name: 'Paracetamol 500mg', amount: 1, stock: true, state: 'Entregado'},
    {name: 'Ibuproféno 600mg', amount: 1, stock: false, state: 'C. Paciente'},
    {name: 'Tapsin', amount: 1, stock: false, state: 'Pendiente'},
];

const Prescripciones = () => {

    return (
        <Box sx={{ flexGrow: 1}}>
                <Grid item xs={12} lg={8} p={_spacing} >
                    <Grid container spacing={_spacing}>
                        <Grid item xs={12}><h1>Receta Médica Electrónica</h1></Grid>
                        <Field xs={12} sm={6} header={"Identificador"}/>
                        <Field xs={12} sm={6} header={"Fecha de Emisión"}/>
                        <Field xs={12} header={"Nombre Completo del Paciente"}/>
                        <Field xs={12} sm={6} header={"RUN"}/>
                        <Field xs={12} sm={6} header={"Fecha de Nacimiento"}/>
                        <Field xs={12} header={"Edad"}/>
                        <Grid item xs={12}>
                            <Title>Prescripción</Title>
                            <Grid container spacing={_spacing}>
                                <Grid item xs={12}>
                                    <CustomBox style={{height: "2em", display: "flex", alignItems: "center"}}>
                                        <p><b>Medicamento</b></p>
                                    </CustomBox>
                                    <Grid container spacing={2}>
                                        {medicamentos.map(medicamento => {
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
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <p>
                                <b>Dr. Federico Santa María</b><br></br>
                                RUN 11.111.111-1<br></br>
                                Especialidad: Médico Cirujano
                            </p>
                        </Grid>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" disableElevation fullWidth style={{marginTop: "1em", backgroundColor: "#A6D1E6", color: "#2C2C2F"}}>Emitir</Button>
                        </Grid>
                    </Grid>
                </Grid>
        </Box>
    )
}

export default Prescripciones;