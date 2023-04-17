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

import Prescripciones from './Pages/Prescripciones/Prescripciones';

function App() {
  const { collapseSidebar } = useProSidebar();
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar style={{color: 'black', backgroundColor: '#FEFBF6'}} breakPoint='sm'>        
        <Menu>
          <MenuItem onClick={() => collapseSidebar()} icon={<BsList/>}></MenuItem>
          <MenuItem component={<Link to="/Home" />} icon={<BsFillHouseFill/>}> Home</MenuItem>
          <SubMenu label="Inventario" icon={<MdInventory/>}>
            <MenuItem component={<Link to="/Inventario" />}> Listado Medicamentos </MenuItem>
            <MenuItem> Agregar Inventario </MenuItem>
            <MenuItem> Generar Reporte </MenuItem>
          </SubMenu>
          <SubMenu label="Prescripciones" icon={<FaNotesMedical/>}>
            <MenuItem component={<Link to="/prescripciones"/>}>Prescripciones</MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <SubMenu label="Reservar Medicamentos" icon={<VscChecklist/>}>
            <MenuItem> Pie charts </MenuItem>
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
        </Route> 
        <Route path='/prescripciones'>
          <Route path='' element={<Prescripciones/>} />
        </Route>
      </Routes>
    </div>
   

  );
}

export default App;
