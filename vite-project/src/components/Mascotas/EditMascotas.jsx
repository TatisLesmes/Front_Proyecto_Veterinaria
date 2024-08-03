import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditMascotas = ({ rowData, setFlag }) => {
  const [visible, setVisible] = useState(false);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [selectPropietario, setSelectPropietario] = useState("");
  const [propietarios, setPropietarios] = useState([]);
  
  const type=[
    {name:"perro", code:"perro"},
    {name:"gato", code:"gato"},
    {name:"otro",code:"otro"}
]

  useEffect(()=>{
    setID(rowData._id)
    setName(rowData.nombre)
    setSelectedType(rowData.type)
  },[rowData])


  const updateMascota = () => {
    const MySwal = withReactContent(Swal);
    const updateMascota = {
      nombre: name,
      tipo: selectedType.name,
      idpropietario: selectPropietario,
      
    };

    fetch(`https://back-proyecto-segundo-cicnuenta.vercel.app/mascota/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateMascota),
    })
      .then((response) => response.json())
      .then((data) => {
        setVisible(false);

        if (data.state) {
          MySwal.fire({
            title: <p>Editado</p>,
            icon: "success",
          });
        } else {
          MySwal.fire({
            title: <p>{data.error}</p>,
            icon: "error",
          });
        }

        setFlag(true);
      })
      .catch((error) => {
        console.log(error)
        setVisible(false);
        MySwal.fire({
          title: <p>{error.message}</p>,
          icon: "error",
        });
      });
  };

  const cleanFields = () => {
    
    setName("");
    setSelectedType(null)
    
  };
  const fetchPropietarios = async () => {
    try {
      const response = await fetch(
        "https://back-proyecto-segundo-cicnuenta.vercel.app/propietario"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch propietarios");
      }
      const data = await response.json();
      setPropietarios(data.data);
    } catch (error) {
      console.error("Error fetchin propietarios:", error);
    }
  };
  fetchPropietarios();
 

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Agregar Mascotas</span>
    </div>
  );

  const footerContent = (
    <div>
      <Button
        label="limpiar"
        icon="pi pi-eraser"
        severity="warning"
        onClick={() => cleanFields()}
      />
      <Button
        label="aceptar"
        icon="pi pi-user-edit"
        severity="success"
        onClick={() => updateMascota()}
      />
    </div>
  );
  return (
    
    <div className="card flex justify-content-center">
        
      <Button
        label="Editar"
        icon="pi pi-pencil"
        severity="warning"
        onClick={() => setVisible(true)}
      />
      <Dialog
        visible={visible}
        modal
        header={headerElement}
        footer={footerContent}
        style={{ width: "50rem" }}
        onHide={() => setVisible(false)}
      >
        {/**Form */}
        <div className="card flex flex-column md:flex-row gap-3">
        <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">_ID</span>
            <InputText placeholder="ID" value={id} disabled
            />
          </div>
          
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon"><i className="pi pi-user"></i></span>
            <InputText placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-ticket"></i>
            </span>
            <Dropdown
              value={selectedType}
              onChange={(e) => setSelectedType(e.value)}
              options={type}
              optionLabel="name"
              placeholder="Select Mode"
              className="w-full md:w-14rem"
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">Propietario</span>
            <Dropdown
              value={selectPropietario}
              onChange={(e) => setSelectPropietario(e.value)}
              options={propietarios}
              optionLabel="nombre"
              optionValue="_id"
              placeholder="Selecciona una Propietario"
              className="w-full md:w-14rem"
            />
          </div>

        </div>
        {/**End Form */}
      </Dialog>
    </div>
  );
};

export default EditMascotas;