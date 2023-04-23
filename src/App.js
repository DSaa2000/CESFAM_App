import './App.css';
import { Routes, Route, Link} from 'react-router-dom';
// Pages
import Home from './Pages/Home';
// Menu
import { Sidebar, Menu, MenuItem,SubMenu,useProSidebar } from 'react-pro-sidebar';
// Icons
import { BsFillHouseFill, BsList } from "react-icons/bs";
import { MdInventory } from "react-icons/md";
import { VscChecklist } from "react-icons/vsc";
import { CgLoadbarDoc } from "react-icons/cg";
import { FaNotesMedical } from "react-icons/fa";

import ListadoInventario from './Pages/Inventario/ListadoInventario';
import StockMedicamentos from './Pages/Inventario/StockMedicamentos';
import MedicamentosReservados from './Pages/ReservaMedicamentos/MedicamentosReservados'; 

import Prescripciones from './Pages/Prescripciones/Prescripciones';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Medicamentos from './Pages/Medicamentos/Medicamentos';

function App() {
  const { collapseSidebar, toggleSidebar } = useProSidebar();
  const [showNav, setShowNav] = useState(true);
  const _sm = 600; // Default sm size

  const changeNavState = (sm) => {
    const _show = window.innerWidth > sm ? true : false;
    setShowNav(_show);
    if (_show === false) collapseSidebar(false);
  }

  window.onload = () => {
    changeNavState(_sm);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      changeNavState(_sm);
    });
  });

  return (    
    
    <div style={{ display: 'flex', height: '100%' }}>
      <Button onClick={() => toggleSidebar()} style={{display: showNav ? 'none' : 'block'}}><BsList/></Button>
           
      <Sidebar style={{color: 'black', backgroundColor: '#FEFBF6', height: '100%'}} breakPoint='sm'>        
        <Menu>
          <MenuItem onClick={() => collapseSidebar()} icon={<BsList/>} style={{display: !showNav ? 'none' : 'block'}}></MenuItem>
          <MenuItem component={<Link to="/Home" />} icon={<BsFillHouseFill/>}> Home</MenuItem>
          <SubMenu label="Inventario" icon={<MdInventory/>}>
            <MenuItem component={<Link to="/Inventario" />}> Listado Medicamentos </MenuItem>
            <MenuItem component={<Link to="/medicamentos" />}>Medicamentos </MenuItem>
            <MenuItem> Agregar Inventario </MenuItem>
            <MenuItem component={<Link to="/Inventario/Reportes" />}> Generar Reporte Stock</MenuItem>
          </SubMenu>
          <SubMenu label="Prescripciones" icon={<FaNotesMedical/>}>
            <MenuItem component={<Link to="/prescripciones"/>}>Prescripciones</MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <SubMenu label="Reservar Medicamentos" icon={<VscChecklist/>}>            
            <MenuItem component={<Link to="/ReservaMedicamentos/List" />}> Reserva de Medicamentos </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <SubMenu label="Entrega Medicamentos" icon={<CgLoadbarDoc/>}>
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <main>
      </main>
      <Routes>
        <Route path='/'>
          <Route path='Home' element={<Home/>} />
        </Route> 
        <Route path='/Inventario'>
          <Route path='' element={<ListadoInventario/>} />
          <Route path='Reportes' element={<StockMedicamentos/>} />
        </Route> 
        <Route path='/Prescripciones'>
        </Route> 
        <Route path='/ReservaMedicamentos'>          
          <Route path='List' element={<MedicamentosReservados/>} />
        </Route> 
        <Route path='/prescripciones'>
          <Route path='' element={<Prescripciones/>} />
        </Route>
        <Route path='/medicamentos'>
          <Route path='' element={<Medicamentos/>} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
