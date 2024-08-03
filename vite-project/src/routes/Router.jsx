import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mascota from "../pages/Mascota"
import Registro from "../pages/Registros";
import Home from "../pages/Home";


const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/mascota" Component={Mascota}/>
        <Route path="/registro" Component={Registro}/>
      </Routes>
    </BrowserRouter>
  );
};

export default routes;