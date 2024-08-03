import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mascota from "../pages/Mascota"
import Home from "../pages/Home";


const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/mascota" Component={Mascota}/>
      </Routes>
    </BrowserRouter>
  );
};

export default routes;