import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes,useNavigate } from 'react-router-dom';
import rutas from './route-config';
import '../node_modules/bootstrap/dist/js/bootstrap'

import ComponenteMenuNavbar from './menu/ComponenteMenuNavbar';
import ComponenteMenuCinco from './menu/ComponenteMenuCinco';

function App() {

  return (
    <div className="bg-dark text-white" style={{width:"100%", background:"#242526"}}>
      {/* <ComponenteMenuVertical/> */}
      <ComponenteMenuNavbar/>
      <ComponenteMenuCinco/>
        <div>
        <BrowserRouter>
          <Routes>
              {rutas.map(ruta =>
                  <Route
                  key={ruta.path} path={ruta.path} element={<ruta.componente/>}>
                  </Route>)}
          </Routes>
        </BrowserRouter>
        </div>
    </div>
  );
}
export default App;