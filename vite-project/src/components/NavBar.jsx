import React from "react";
import { Menubar } from "primereact/menubar";

const NavBar = () => {
  const items = [
    {
      key: "home",
      label: "Inicio",
      icon: "pi pi-home",
      url: "/",
    },
    {
      key: "mascota",
      label: "Mascota",
      icon: "pi-id-card",
      url: "/mascota",
    },
    {
      key: "propietario",
      label: "Propietario",
      icon: "pi-users",
      url: "/propietario",
    },
    {
      key: "registro",
      label: "Registros",
      icon: "pi-calendar-plus",
      url: "/registro",
    },
    {
      key: "servicio",
      label: "servicio",
      icon: "pi-money-bill",
      url: "/servicio",
    },
  ];

  return (
    <div className="card">
      <Menubar model={items.map((item) => ({ ...item, id: item.key }))} />
    </div>
  );
};

export default NavBar;