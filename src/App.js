import './App.css';
import { Routes, Route, Link, useLocation} from 'react-router-dom';
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
import LoginForm from './Pages/Login/LoginForm'; 
import RecetaMedica from './Pages/Receta/RecetaMedica'; 



function App() {
  const { collapseSidebar, toggleSidebar } = useProSidebar();
  const [showNav, setShowNav] = useState(true);
  const [home, setHome] = useState(true);

  window.onload = () => {
    changeNavState(_sm);
  };
  
  const _sm = 600; // Default sm size
  
  const changeNavState = (sm) => {
    const _show = window.innerWidth > sm ? true : false;
    setShowNav(_show);
    if (_show === false) collapseSidebar(false);
    console.log(showNav);
  }
  
  const getLocation = useLocation();

  useEffect(() => {
    window.addEventListener('resize', () => {
      changeNavState(_sm);
    });

    if(window.innerWidth < _sm) {
      setShowNav(false);
    }

    setHome(getLocation.pathname === '/');
  });

  return (    
    <>
    <Button onClick={() => toggleSidebar()} style={{display: (showNav || home) ? 'none' : 'block'}}><BsList/></Button>
    <div style={{ display: 'flex', height: '100%' }}>
           
      <Sidebar style={{color: 'black', backgroundColor: '#FEFBF6', height: '100%', display: home ? 'none' : 'block'}} breakPoint='sm'>        
        <Menu>
          <MenuItem onClick={() => collapseSidebar()} icon={<BsList/>} style={{display: !showNav ? 'none' : 'block'}}></MenuItem>
          <MenuItem component={<Link to="/" />} icon={<BsFillHouseFill/>}>Login</MenuItem>
          <SubMenu label="Inventario" icon={<MdInventory/>}>
            <MenuItem component={<Link to="/medicamentos" />}>Listado Medicamentos </MenuItem>
            <MenuItem> Agregar Inventario </MenuItem>
            <MenuItem component={<Link to="/Inventario/Reportes" />}> Generar Reporte Stock</MenuItem>
          </SubMenu>
          <SubMenu label="Prescripciones" icon={<FaNotesMedical/>}>
            <MenuItem component={<Link to="/prescripciones"/>}>Prescripciones</MenuItem>
          </SubMenu>
          <SubMenu label="Reservar Medicamentos" icon={<VscChecklist/>}>            
            <MenuItem component={<Link to="/ReservaMedicamentos/List" />}> Reserva de Medicamentos </MenuItem>
          </SubMenu>
          <SubMenu label="Entrega Medicamentos" icon={<CgLoadbarDoc/>}>
          </SubMenu>
        </Menu>
      </Sidebar>
      <main>
      </main>
      <Routes>
        <Route path='/'>
          <Route path='' element={<LoginForm/>} />
        </Route> 
        <Route path='/Inventario'>
          <Route path='' element={<ListadoInventario/>} />
          <Route path='Reportes' element={<StockMedicamentos/>} />
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
        <Route path='/RecetaMedica'>          
          <Route path='' element={<RecetaMedica/>} />
        </Route> 
      </Routes>
    </div>
    </>
  );
}
export default App;
