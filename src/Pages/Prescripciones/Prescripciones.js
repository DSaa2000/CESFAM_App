import '../Medicamentos/Medicamentos.css'
import React from "react";
import { Box,Divider,Grid,InputBase,List,ListItem,ListItemText,ListSubheader,Paper,Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

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
        <Grid item xs={props.xs}>
            <Title>{props.header}</Title>
            <CustomBox>
                <InputBase sx={{width: "100%"}}/>
            </CustomBox>
        </Grid>
    )
}

const SearchBar = (props) => {
    return (
        <div style={{
            background: "#A6D1E6",
            color: "black",
            display: "flex",
            alignItems: "center",
            gap: ".5em",
            paddingLeft: "1em",
        }}>
            <SearchIcon />
            <InputBase
                placeholder={props.placeholder}
                onChange={props.handleQuery}
            />
        </div>
    );
}

const medicamentos = [
    {name: 'Paracetamol 500mg', amount: 1, stock: true, state: 'Entregado'},
    {name: 'Ibuproféno 600mg', amount: 1, stock: false, state: 'C. Paciente'},
    {name: 'Tapsin', amount: 1, stock: false, state: 'Pendiente'},
];

const Prescripciones = () => {
    const s = (e,number) => {
        let x = document.getElementsByClassName('itemSelected');
        for (let i = 0; i< x.length; i++) {
            x[i].classList.remove('itemSelected');
        }
        if (e.target.classList.contains('test')) e.target.className = 'test itemSelected';
        else if (e.target.parentNode.classList.contains('test')) e.target.parentNode.className = 'test itemSelected';
        else if (e.target.parentNode.parentNode.classList.contains('test')) e.target.parentNode.parentNode.className = 'test itemSelected';
        else if (e.target.parentNode.parentNode.parentNode.classList.contains('test')) e.target.parentNode.parentNode.parentNode.className = 'test itemSelected';
        else if (e.target.parentNode.parentNode.parentNode.parentNode.classList.contains('test')) e.target.parentNode.parentNode.parentNode.parentNode.className = 'test itemSelected';

        //setTitle(number); 
    };
    const Item = (props) => {
    return(
        <div  onClick={(e) => s(e,props.number)} className="test">
        <ListItem key={props.key}>
            <ListItemText
                primary={props.number}
                primaryTypographyProps={{
                    color: "grey",
                }}
                secondary={props.text}
                secondaryTypographyProps={{
                    color: "black",
                    fontWeight: "bold"
                }}
            />
        </ListItem>
        <Divider/>
        </div>
    );
}
    const [query, setQuery] = useState('');
    const [title, setTitle] = useState('');

    const handleQuery = (e) => {
        setQuery(e.target.value);
    }

    return (
        <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={_spacing}>
                {/* Listado de items */}
                <Grid item xs={3}>
                    <List sx={{
                        maxHeight: "100vh",
                        overflowY: "scroll",
                        padding: 0
                    }}>
                        <ListSubheader sx={{color: "black", padding: 0}}>
                            <h3 style={{margin: 0, textAlign: "center"}}>Prescripciones Médicas</h3>
                            <SearchBar placeholder={"Buscar"} handleQuery={handleQuery}/>
                        </ListSubheader>
                        {itemsList.filter(item => item.number.toLowerCase().startsWith(query.toLocaleLowerCase())).map(item => <Item number={item.number} text={item.text}/>)}
                    </List>
                </Grid>
                {/* Medicamentos */}
                <Grid item xs={9} p={_spacing}>
                    <Grid container spacing={_spacing}>
                        <Grid item xs={12}><h1>Prescripción #{title}</h1></Grid>
                        <Field xs={8} header={"Identificador"}/>
                        <Field xs={4} header={"Fecha de Emisión"}/>
                        <Field xs={12} header={"Nombre Completo del Paciente"}/>
                        <Field xs={4} header={"RUN"}/>
                        <Field xs={4} header={"Fecha de Nacimiento"}/>
                        <Field xs={4} header={"Edad"}/>
                        <Grid item xs={12}>
                            <Title>Prescripción</Title>
                            <Grid container spacing={_spacing}>
                                <Grid item xs={3}>
                                    <CustomBox style={{height: "2em", display: "flex", alignItems: "center"}}>
                                        <p><b>Medicamento</b></p>
                                    </CustomBox>
                                    {medicamentos.map(medicamento => {
                                        return (
                                            <CustomBox style={{height: "2em", marginTop: ".2em", display: "flex", alignItems: "center"}}>
                                                <p>{medicamento.name}</p>
                                            </CustomBox>
                                        )
                                    })}
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomBox style={{height: "2em", display: "flex", alignItems: "center"}}>
                                        <p><b>Cantidad</b></p>
                                    </CustomBox>
                                    {medicamentos.map(medicamento => {
                                        return (
                                            <CustomBox style={{height: "2em", marginTop: ".2em", display: "flex", alignItems: "center"}}>
                                                <p>{medicamento.amount}</p>
                                            </CustomBox>
                                        )
                                    })}
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomBox style={{height: "2em", display: "flex", alignItems: "center"}}>
                                        <p><b>Stock</b></p>
                                    </CustomBox>
                                    {medicamentos.map(medicamento => {
                                        return (
                                            <CustomBox style={{height: "2em", marginTop: ".2em", display: "flex", alignItems: "center"}}>
                                                {medicamento.stock ? <CheckIcon/> : <CloseIcon/>}
                                            </CustomBox>
                                        )
                                    })}
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomBox style={{height: "2em", display: "flex", alignItems: "center"}}>
                                        <p><b>Estado</b></p>
                                    </CustomBox>
                                    {medicamentos.map(medicamento => {
                                        return (
                                            <CustomBox style={{height: "2em", marginTop: ".2em", display: "flex", alignItems: "center"}}>
                                                <p>{medicamento.state}</p>
                                            </CustomBox>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <p>
                                <b>Dr. Federico Santa María</b><br></br>
                                RUN 11.111.111-1<br></br>
                                Especialidad: Médico Cirujano
                            </p>
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}>
                            <Title>Estado</Title>
                            <CustomBox style={{height: "2em", display: "flex", alignItems: "center"}}>Parcial</CustomBox>
                            <Button variant="contained" disableElevation fullWidth style={{marginTop: "1em"}}>Finalizar entrega</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Prescripciones;