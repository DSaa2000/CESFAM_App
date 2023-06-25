import React from "react";
import './Medicamentos.css';
import { Box,Divider,Grid,InputBase,List,ListItem,ListItemText,ListSubheader,Paper,Button, Stack, Modal } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";

const _spacing = 2;

const getItems = () => {
    const items = [];
    fetch("http://localhost:8090/graphql?query=query GetMedicamentos{getMedicamentos{ _id codigo condiciones dosis fecha laboratorio nombre stock unidadMedida}}").then(response=>response.json().then(data=>{
        console.log(data.data.getMedicamentos);

        for(let i=0; i < data.data.getMedicamentos.length; i++){
            items.push(
                {
                    id: data.data.getMedicamentos[i]._id,
                    number: data.data.getMedicamentos[i].codigo,
                    text: data.data.getMedicamentos[i].nombre,
                    laboratorio:data.data.getMedicamentos[i].laboratorio,
                    stock:data.data.getMedicamentos[i].stock,
                    dosis:data.data.getMedicamentos[i].dosis,
                    unidad:data.data.getMedicamentos[i].unidadMedida,
                    condiciones:data.data.getMedicamentos[i].condiciones,
                    indice: i,
                    key: i
                }
            );
        }
    }));
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

const SearchBar = (props) => {
    
    return (
        <div 
            style={{
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

const Medicamentos = () => {
    const s = (e) => {
        if (hide === true) handleOpen();
        let x = document.getElementsByClassName('itemSelected');
        for (let i = 0; i< x.length; i++) {
            x[i].classList.remove('itemSelected');
        }
        if (e.target.classList.contains('test')) e.target.className = 'test itemSelected';
        else if (e.target.parentNode.classList.contains('test')) e.target.parentNode.className = 'test itemSelected';
        else if (e.target.parentNode.parentNode.classList.contains('test')) e.target.parentNode.parentNode.className = 'test itemSelected';
        else if (e.target.parentNode.parentNode.parentNode.classList.contains('test')) e.target.parentNode.parentNode.parentNode.className = 'test itemSelected';
        else if (e.target.parentNode.parentNode.parentNode.parentNode.classList.contains('test')) e.target.parentNode.parentNode.parentNode.parentNode.className = 'test itemSelected';

    };
    const Item = (props) => {
    return(
        <div onClick={s} className="test">
        <ListItem key={props.indice} onClick={(e)=>{
            setIndice(props.indice);
            }} >
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
    const [hide, setHide] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        console.log(indice);
    },[indice])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [indice,setIndice] = useState(-1);
    const [medicamentoObj,setMedicamentoObj] = useState({});

    const _md = 900; // Default md size

    useEffect(() => {
        setMedicamentoObj({...itemsList[indice]});
        console.log(indice, medicamentoObj);
    },[indice]);

    const changeNavState = (sm) => {
        const _show = window.innerWidth > sm ? false : true;
        setHide(_show);
        if (_show === false) handleClose();
    }

    window.onload = () => {
        changeNavState(_md);
    };
    
    useEffect(() => {
        window.addEventListener('resize', () => {
            changeNavState(_md);
        });
        if(window.innerWidth < _md) {
            setHide(true);
        }
    },[]);

    const handleQuery = (e) => {
        setQuery(e.target.value);
    }
    const Field = (props) => {
        return (
            <Grid item xs={props.xs} sm={props.sm}>
                <Title>{props.header}</Title>
                <CustomBox>
                    <InputBase sx={{width: "100%"}} value={medicamentoObj} onChange={((event) => setMedicamentoObj(event.target.value))} inputProps={{placeholder: props.defaultValue}}/>
                </CustomBox>
            </Grid>
        )
    }

    return (
        <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={_spacing}>
                {/* Listado de items */}
                <Grid item xs={12} md={4} lg={6}>
                    <List sx={{
                        maxHeight: "100vh",
                        overflowY: "scroll",
                        padding: 0
                    }}>
                        <ListSubheader sx={{color: "black", padding: 0}}>
                            <h3 style={{margin: 0, textAlign: "center"}}>Lista de inventario</h3>
                            <SearchBar placeholder={"Buscar"} handleQuery={handleQuery}/>
                        </ListSubheader>
                        {itemsList.filter(item => item.text.toLowerCase().startsWith(query.toLocaleLowerCase()) || item.number.toLowerCase().startsWith(query.toLocaleLowerCase())).map(item => <Item number={item.number} indice={item.indice} text={item.text}/>)}
                    </List>
                </Grid>
                {/* Medicamentos */}
                <Grid item xs={12} md={8} lg={6} p={_spacing} style={{display: hide ? 'none' : 'block'}}>
                    <Grid container spacing={_spacing}>
                        <Grid item xs={12}><h1>Medicamento</h1></Grid>
                        <Grid item xs={8}>
                            <Title>Nombre Medicamento</Title>
                            <CustomBox>
                                <InputBase sx={{width: "100%"}} value={medicamentoObj?.text} onChange={(e) => setMedicamentoObj({...medicamentoObj, text: e.target.value})}/>
                            </CustomBox>
                        </Grid>
                        <Grid item xs={4}>
                            <Title>Codigo</Title>
                            <CustomBox>
                                <InputBase sx={{width: "100%"}} value={medicamentoObj?.codigo} onChange={(e) => setMedicamentoObj({...medicamentoObj, codigo: e.target.value})}/>
                            </CustomBox>
                        </Grid>
                        <Field xs={12} header={"Laboratorio"}/>
                        <Field xs={4} header={"Cantidad en Stock"}/>
                        <Field xs={4} header={"Dosis"}/>
                        <Field xs={4} header={"Unidad Medida"}/>
                        <Field xs={12} header={"Condiciones de Conservación"}/>
                        <Grid item xs={12} spacing={_spacing}>
                            <Stack direction={"row"} justifyContent={"flex-end"} spacing={_spacing}>
                                <Button onClick={()=>{

                                }} variant="contained" sx={{backgroundColor: "#A6D1E6", color: "#2C2C2F"}}>Editar</Button>
                                <Button variant="contained" sx={{backgroundColor: "#A6D1E6", color: "#2C2C2F"}}>Registrar baja</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Medicamentos modal */}
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Paper sx={{width: '100%', height: '100%', backgroundColor: "#FEFBF6", display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                        <Grid item xs={12} md={8} lg={6} p={_spacing} style={{display: hide ? 'block' : 'none', overflowY: 'scroll', height: '100vh'}}>
                            <Button variant='contained' sx={{backgroundColor: "#A6D1E6", color: "#2C2C2F"}} onClick={handleClose}>X</Button>
                            <Grid container spacing={_spacing}>
                                <Grid item xs={12}><h1>Medicamento</h1></Grid>
                                <Field xs={12} sm={6} header={"Nombre Medicamento"}/>
                                <Field xs={12} sm={6} header={"Codigo"}/>
                                <Field xs={12} sm={6} header={"Laboratorio"}/>
                                <Field xs={12} sm={6} header={"Cantidad en Stock"}/>
                                <Field xs={12} sm={6} header={"Dosis"}/>
                                <Field xs={12} sm={6} header={"Unidad Medida"}/>
                                <Field xs={12} sm={12} header={"Condiciones de Conservación"}/>
                                <Grid item xs={12} spacing={_spacing}>
                                    <Stack direction={"row"} justifyContent={"flex-end"} spacing={_spacing}>
                                        <Button variant="contained" sx={{backgroundColor: "#A6D1E6", color: "#2C2C2F"}}>Editar</Button>
                                        <Button variant="contained" sx={{backgroundColor: "#A6D1E6", color: "#2C2C2F"}}>Registrar baja</Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Modal>
                
            </Grid>
        </Box>
    )
}

export default Medicamentos;