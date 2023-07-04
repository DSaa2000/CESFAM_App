/* eslint-disable react-hooks/exhaustive-deps */
import '../Medicamentos/Medicamentos.css'
import React from "react";
import { Box,Divider,Grid,InputBase,List,ListItem,ListItemText,ListSubheader,Paper,Button, Modal } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";

const _spacing = 2;

/* const getItems = (number) => {
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
} */



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
                <InputBase value={props.value} sx={{width: "100%"}}/>
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
    const [indice] = useState(-1);
    const [, setPrescripcion] = useState();
    const [prescripciones, setPrescripciones] = useState([]);
    const [identificador, setIdentificador] = useState("0");
    const [paciente, setPaciente] = useState("");
    const [fecha,setFecha] = useState("");
    const [medicamentosPresc,setMedicamentosPresc] = useState([]);
    useEffect(() => {
        getItems()
    },[])

    useEffect(() => {
        setPrescripcion({...prescripciones[indice]});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[indice]);

    const getItems = async() => {
        const items = [];
        await fetch("http://localhost:8090/graphql?query=query GetPrescripciones { getPrescripciones {fecha_emision id medico paciente medicamentos { nombre dosis } } }").then(response=>response.json().then(data=>{
            //console.log(data.data.getPrescripciones);
            for(let i=0; i < data.data.getPrescripciones.length; i++){
                console.log(data.data.getPrescripciones[i])
                if (data.data.getPrescripciones[i] != null) {
                    items.push(
                        {
                            id: i,
                            fecha: data.data.getPrescripciones[i].fecha_emision,
                            medico: data.data.getPrescripciones[i].medico,
                            paciente: data.data.getPrescripciones[i].paciente,
                            medicamentos: data.data.getPrescripciones[i].medicamentos == null ? [] : data.data.getPrescripciones[i].medicamentos,
                            key: i
                        }
                    );
                }
                
            }
        }));
        setPrescripciones(items);
    }
    const cargarPrescripcion =(id)=>{
        let lista = prescripciones.filter(i=>i.id===id);
        
        if(lista.length>0){

            let p = lista[0];
            console.log(p);
            setIdentificador(p.id)
            setFecha(p.fecha);
            //setFechaNacimiento(p.fechaNacimiento);
            //setRUN(p.RUN);
            setPaciente(p.paciente);
            setMedicamentosPresc((p.medicamentos !== undefined) ? p.medicamentos : []);
        }
    }
    const Item = (props) => {
        return(
        <div  onClick={() => cargarPrescripcion(props.number)} className="test">
        <ListItem key={props.key}>
            <ListItemText
                primary={props.id}
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
    const [title] = useState('P0');
    const [hide, setHide] = useState(false);
    const [open, setOpen] = useState(false);
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
    },[changeNavState]);
    useEffect(() => {
        getItems()
    },[])
    useEffect(() => {
        //setMedicamentosPresc()
    },[])
    const handleQuery = (e) => {
        setQuery(e.target.value);
    }
    return (
        <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={_spacing}>
                {/* Listado de items */}
                <Grid item xs={12} lg={4}>
                    <List sx={{
                        maxHeight: "100vh",
                        overflowY: "scroll",
                        padding: 0
                    }}>
                        <ListSubheader sx={{color: "black", padding: 0}}>
                            <h3 style={{margin: 0, textAlign: "center"}}>Prescripciones Médicas</h3>
                            <SearchBar placeholder={"Buscar"} handleQuery={handleQuery}/>
                        </ListSubheader>
                        {prescripciones.filter(item => item.paciente.toLowerCase().startsWith(query.toLocaleLowerCase())).map(item => <Item number={item.id} text={item.paciente}/>)}
                    </List>
                </Grid>
                {/* Medicamentos */}
                <Grid item xs={12} lg={8} p={_spacing} >
                    <Grid container spacing={_spacing} sx={{display: hide ? 'none' : 'inherith'}}>
                        <Grid item xs={12}><h1>Prescripción #{title}</h1></Grid>
                        <Field xs={6} value={identificador} header={"Identificador"}/>
                        <Field xs={6} value={fecha} header={"Fecha de Emisión"}/>
                        <Field xs={12} value={paciente} header={"Nombre Completo del Paciente"}/>
                        {/* <Field xs={6} value={run} header={"RUN"}/>
                        <Field xs={6} value={fechaNacimiento} header={"Fecha de Nacimiento"}/>
                        <Field xs={12} value={edad} header={"Edad"}/> */}
                        <Grid item xs={12}>
                            <Title>Prescripción</Title>
                            <Grid container spacing={_spacing}>
                                <Grid item xs={3}>
                                    <CustomBox style={{height: "2em", display: "flex", alignItems: "center"}}>
                                        <p><b>Medicamento</b></p>
                                    </CustomBox>
                                    {medicamentosPresc.map(m => {
                                        return (
                                            <CustomBox style={{height: "2em", marginTop: ".2em", display: "flex", alignItems: "center"}}>
                                                <p>{m.nombre}</p>
                                            </CustomBox>
                                        )
                                    })}
                                </Grid>
                                <Grid item xs={3}>
                                    <CustomBox style={{height: "2em", display: "flex", alignItems: "center"}}>
                                        <p><b>Dosis</b></p>
                                    </CustomBox>
                                    {medicamentosPresc.map(m => {
                                        return (
                                            <CustomBox style={{height: "2em", marginTop: ".2em", display: "flex", alignItems: "center"}}>
                                                <p>{m.dosis}</p>
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
                        <Grid item xs={4}>
                            <Title>Estado</Title>
                            <CustomBox style={{height: "2em", display: "flex", alignItems: "center"}}>Parcial</CustomBox>
                            
                            <Button variant="contained" disableElevation fullWidth style={{marginTop: "1em", backgroundColor: "#A6D1E6", color: "#2C2C2F"}}>Finalizar entrega</Button>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Medicamentos modal */}
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Paper sx={{width: '100%', height: '100%', backgroundColor: "#FEFBF6", display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                        <Grid item xs={12} md={8} p={_spacing} style={{display: hide ? 'inherith' : 'none', overflowY: 'scroll', height: '100vh'}}>
                            <Button variant='contained' sx={{backgroundColor: "#A6D1E6", color: "#2C2C2F"}} onClick={handleClose}>X</Button>
                            <Grid item xs={12} p={_spacing}>
                                <Grid container spacing={_spacing}>
                                    <Grid item xs={12}><h1>Prescripción #{title}</h1></Grid>
                                    <Field xs={12} md={6} header={"Identificador"}/>
                                    <Field xs={12} md={6} header={"Fecha de Emisión"}/>
                                    <Field xs={12} header={"Nombre Completo del Paciente"}/>
                                    <Field xs={12} md={6} header={"RUN"}/>
                                    <Field xs={12} md={6} header={"Fecha de Nacimiento"}/>
                                    <Field xs={12} header={"Edad"}/>
                                    <Grid item xs={12}>
                                        <Title>Prescripción</Title>
                                        <Grid container spacing={_spacing}>
                                                {medicamentos.map(medicamento => {
                                                    return (
                                                        <Grid item xs={12} sm={6}>
                                                            <CustomBox style={{height: "2em", display: "flex", alignItems: "center", marginTop: '.5em'}}>
                                                                <p><b>Medicamento</b></p>
                                                            </CustomBox>
                                                            <CustomBox style={{height: "2em", marginTop: ".2em", display: "flex", alignItems: "center"}}>
                                                                <p>{medicamento.name}</p>
                                                            </CustomBox>
                                                            <CustomBox style={{height: "2em", marginTop: ".2em", display: "flex", alignItems: "center"}}>
                                                                <p>Cantidad: {medicamento.amount}</p>
                                                            </CustomBox>
                                                            <CustomBox style={{height: "2em", marginTop: ".2em", display: "flex", alignItems: "center"}}>
                                                                Stock: {medicamento.stock ? <CheckIcon/> : <CloseIcon/>}
                                                            </CustomBox>
                                                            <CustomBox style={{height: "2em", marginTop: ".2em", display: "flex", alignItems: "center"}}>
                                                                <p>Estado: {medicamento.state}</p>
                                                            </CustomBox>
                                                        </Grid>
                                                    )
                                                })}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <p>
                                            <b>Dr. Federico Santa María</b><br></br>
                                            RUN 11.111.111-1<br></br>
                                            Especialidad: Médico Cirujano
                                        </p>
                                    </Grid>
                                    <Grid item xs={12} sm={1}></Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Title>Estado</Title>
                                        <CustomBox style={{height: "2em", display: "flex", alignItems: "center"}}>Parcial</CustomBox>
                                        <Button variant="contained" disableElevation fullWidth style={{marginTop: "1em", backgroundColor: "#A6D1E6", color: "#2C2C2F"}}>Finalizar entrega</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Modal>
            </Grid>
        </Box>
    )
}

export default Prescripciones;