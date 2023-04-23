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
        <Grid item xs={props.xs} md={props.md}>
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
    const [hide, setHide] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const _lg = 1200; // Default lg size

    const changeNavState = (sm) => {
        const _show = window.innerWidth > sm ? false : true;
        setHide(_show);
        if (_show === false) handleClose();
        console.log(hide);
    }

    window.onload = () => {
        changeNavState(_lg);
    };
    
    useEffect(() => {
        window.addEventListener('resize', () => {
            changeNavState(_lg);
        });

        if(window.innerWidth < _lg) {
            setHide(true);
        }
    });

    const handleQuery = (e) => {
        setQuery(e.target.value);
    }

    return (
        <Box sx={{ flexGrow: 1}}>
                <Grid item xs={12} lg={8} p={_spacing} >
                    <Grid container spacing={_spacing} sx={{display: hide ? 'none' : 'inherith'}}>
                        <Grid item xs={12}><h1>Receta Médica Electrónica</h1></Grid>
                        <Field xs={6} header={"Identificador"}/>
                        <Field xs={6} header={"Fecha de Emisión"}/>
                        <Field xs={12} header={"Nombre Completo del Paciente"}/>
                        <Field xs={6} header={"RUN"}/>
                        <Field xs={6} header={"Fecha de Nacimiento"}/>
                        <Field xs={12} header={"Edad"}/>
                        <Grid item xs={12}>
                            <Title>Prescripción</Title>
                            <Grid container spacing={_spacing}>
                                <Grid item xs={10}>
                                    <CustomBox style={{height: "2em", display: "flex", alignItems: "center"}}>
                                        <p><b>Medicamento</b></p>
                                    </CustomBox>
                                    {medicamentos.map(medicamento => {
                                        return (
                                            <CustomBox style={{height: "2em", marginTop: ".2em", display: "flex", alignItems: "center"}}>
                                                <Field  />
                                            </CustomBox>
                                        )
                                    })}
                                </Grid>
                                <Grid item xs={2}>
                                    <CustomBox style={{height: "2em", display: "flex", alignItems: "center"}}>
                                        <p><b>Cantidad</b></p>
                                    </CustomBox>
                                    {medicamentos.map(medicamento => {
                                        return (
                                            <CustomBox style={{height: "2em", marginTop: ".2em", display: "flex", alignItems: "center"}}>
                                                <Field  />
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
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" disableElevation fullWidth style={{marginTop: "1em"}}>Emitir</Button>
                        </Grid>
                    </Grid>
                </Grid>
        </Box>
    )
}

export default Prescripciones;