import logo from './logo.svg';
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
import LoginForm from './Pages/Login/LoginForm'; 
import RecetaMedica from './Pages/Receta/RecetaMedica'; 

function App() {
  return (
    <div style={{ display: 'flex', height: '100%'}}>
      <Sidebar style={{color: 'black', backgroundColor: '#FEFBF6', height: '100%'}} breakPoint='sm'>        
        <Menu>
          <MenuItem onClick={() => collapseSidebar()} icon={<BsList/>}></MenuItem>
          <MenuItem component={<Link to="/Home" />} icon={<BsFillHouseFill/>}> Home</MenuItem>
          <SubMenu label="Inventario" icon={<MdInventory/>}>
            <MenuItem component={<Link to="/Inventario" />}> Listado Medicamentos </MenuItem>
            <MenuItem> Agregar Inventario </MenuItem>
            <MenuItem component={<Link to="/Inventario/Reportes" />}> Generar Reporte Stock</MenuItem>
          </SubMenu>
          <SubMenu label="Prescripciones" icon={<FaNotesMedical/>}>
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <SubMenu label="Reservar Medicamentos" icon={<VscChecklist/>}>            
            <MenuItem component={<Link to="/ReservaMedicamentos/List" />}> Reserva de Medicamentos </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <SubMenu label="Entrega Medicamentos" icon={<CgLoadbarDoc/>}>
            <MenuItem component={<Link to="/RecetaMedica" />}> Reserva de Medicamentos </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <main>
      </main>
      <Routes>
        <Route path='/'>
          <Route path='' element={<Home/>} />
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
        <Route path='/login'>          
          <Route path='' element={<LoginForm/>} />
        </Route> 
        <Route path='/RecetaMedica'>          
          <Route path='' element={<RecetaMedica/>} />
        </Route> 
      </Routes>
    </div>
  );
}

export default App;
