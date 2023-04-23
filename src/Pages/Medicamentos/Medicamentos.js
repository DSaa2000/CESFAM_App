import React from "react";
import './Medicamentos.css';
import { Box,Divider,Grid,InputBase,List,ListItem,ListItemText,ListSubheader,Paper,Button, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
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
        let x = document.getElementsByClassName('itemSelected');
        for (let i = 0; i< x.length; i++) {
            console.log(x[i])
            x[i].classList.remove('itemSelected');
        }
        console.log('Class', );
        if (e.target.classList.contains('test')) e.target.className = 'test itemSelected';
        else if (e.target.parentNode.classList.contains('test')) e.target.parentNode.className = 'test itemSelected';
        else if (e.target.parentNode.parentNode.classList.contains('test')) e.target.parentNode.parentNode.className = 'test itemSelected';
        else if (e.target.parentNode.parentNode.parentNode.classList.contains('test')) e.target.parentNode.parentNode.parentNode.className = 'test itemSelected';
        else if (e.target.parentNode.parentNode.parentNode.parentNode.classList.contains('test')) e.target.parentNode.parentNode.parentNode.parentNode.className = 'test itemSelected';

    };
    const Item = (props) => {
    return(
        <div onClick={s} className="test">
        <ListItem key={props.key}  >
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
                            <h3 style={{margin: 0, textAlign: "center"}}>Lista de inventario</h3>
                            <SearchBar placeholder={"Buscar"} handleQuery={handleQuery}/>
                        </ListSubheader>
                        {itemsList.filter(item => item.number.toLowerCase().startsWith(query.toLocaleLowerCase())).map(item => <Item number={item.number} text={item.text}/>)}
                    </List>
                </Grid>
                {/* Medicamentos */}
                <Grid item xs={9} p={_spacing}>
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
            </Grid>
        </Box>
    )
}

export default Medicamentos;