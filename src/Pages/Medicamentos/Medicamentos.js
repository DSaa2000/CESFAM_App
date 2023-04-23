import React from "react";
import { Box,Divider,Grid,InputBase,List,ListItem,ListItemText,ListSubheader,Paper,Button, Stack, Modal } from "@mui/material";

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
        <Paper sx={{padding: "0 1em", boxSizing: "content-box", background: "grey", ...style}} elevation={0}>
            {children}
        </Paper>
    );
}

const Field = (props) => {
    return (
        <Grid item xs={props.xs} sm={props.sm}>
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
            background: "cyan",
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
    const Item = (props) => {
    return(
        <>
        <ListItem key={props.key} onClick={() => {
            if (hide === true) handleOpen();
        } }>
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
        </>
    );
    }
    const [query, setQuery] = useState('');
    const [hide, setHide] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const _md = 900; // Default md size

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
    });

    const handleQuery = (e) => {
        setQuery(e.target.value);
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
                        {itemsList.filter(item => item.number.toLowerCase().startsWith(query.toLocaleLowerCase())).map(item => <Item number={item.number} key={item.number} text={item.text}/>)}
                    </List>
                </Grid>
                {/* Medicamentos */}
                <Grid item xs={12} md={8} lg={6} p={_spacing} style={{display: hide ? 'none' : 'block'}}>
                    <Grid container spacing={_spacing}>
                        <Grid item xs={12}><h1>Medicamento</h1></Grid>
                        <Field xs={8} header={"Nombre Medicamento"}/>
                        <Field xs={4} header={"Codigo"}/>
                        <Field xs={12} header={"Laboratorio"}/>
                        <Field xs={4} header={"Cantidad en Stock"}/>
                        <Field xs={4} header={"Dosis"}/>
                        <Field xs={4} header={"Unidad Medida"}/>
                        <Field xs={12} header={"Condiciones de Conservación"}/>
                        <Grid item xs={12} spacing={_spacing}>
                            <Stack direction={"row"} justifyContent={"flex-end"} spacing={_spacing}>
                                <Button variant="contained">Editar</Button>
                                <Button variant="contained">Registrar baja</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Medicamentos modal */}
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Paper sx={{width: '100%', height: '100%', backgroundColor: "#FEFBF6", display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                        <Grid item xs={12} md={8} lg={6} p={_spacing} style={{display: hide ? 'block' : 'none', overflowY: 'scroll', height: '100vh'}}>
                            <Button variant='contained' onClick={handleClose}>X</Button>
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
                                        <Button variant="contained">Editar</Button>
                                        <Button variant="contained">Registrar baja</Button>
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