import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditServicios = ({ rowData, setFlag }) => {
    const [visible, setVisible] = useState(false);
    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [costo, setCosto] = useState("");


    const [selectServicio, setSelectServicio] = useState("");
    const [servicios, setServicios] = useState([]);



    useEffect(() => {
        setID(rowData._id)
        setName(rowData.nombre)
        setDescripcion(rowData.descripcion)
        setCosto(rowData.costo)



    }, [rowData])


    const updateServicio = () => {
        const MySwal = withReactContent(Swal);
        const updateServicio = {
            nombre: name,
            descripcion: descripcion,
            costo: costo,

        };

        fetch(`https://back-proyecto-segundo-cicnuenta.vercel.app/servicio/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateServicio),
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
        setDescripcion("");
        setCosto("");


    };
    const fetchServicio = async () => {
        try {
            const response = await fetch(
                "https://back-proyecto-segundo-cicnuenta.vercel.app/servicio"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch servicios");
            }
            const data = await response.json();
            setServicios(data.data);
        } catch (error) {
            console.error("Error fetchin servicios:", error);
        }
    };
    fetchServicio();


    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Agregar Propietario</span>
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
                onClick={() => updateServicio()}
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
                        <span className="p-inputgroup-addon"><i className="pi pi-user"></i></span>
                        <InputText placeholder="Apellido" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </div>

                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon"><i className="pi pi-user"></i></span>
                        <InputText placeholder="Telefono" value={costo} onChange={(e) => setCosto(e.target.value)} />
                    </div>




                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">Mascota</span>
                        <Dropdown
                            value={selectServicio}
                            onChange={(e) => setSelectServicio(e.value)}
                            options={servicios}
                            optionLabel="nombre"
                            optionValue="_id"
                            placeholder="Selecciona un servicio"
                            className="w-full md:w-14rem"
                        />
                    </div>

                </div>
                {/**End Form */}
            </Dialog>
        </div>
    );
};

export default EditServicios;