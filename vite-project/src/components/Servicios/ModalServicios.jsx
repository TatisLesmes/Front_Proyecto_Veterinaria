import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ModalServicios = ({ setFlag }) => {
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState();
    const [name, setName] = useState("");
    const [selectServicio, setSelectServicio] = useState("");
    const [servicios, setServicios] = useState([]);

    const addServicios = () => {
        const MySwal = withReactContent(Swal);

        const newServicio = {
            id: id,
            nombre: name,

        };

        fetch(
            `https://back-proyecto-segundo-cicnuenta.vercel.app/servicio/${selectServicio}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newServicio),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setVisible(false);
                if (data.state) {
                    MySwal.fire({
                        title: <p>Agregado</p>,
                        icon: "success",
                    });
                    setFlag(true);
                } else {
                    MySwal.fire({
                        title: <p>{data.error}</p>,
                        icon: "error",
                    });
                }
            })
            .catch((error) => {
                setVisible(false);
                MySwal.fire({
                    title: <p>{error.message}</p>,
                    icon: "error",
                });
            });
    };
    const fetchServicio = async () => {
        try {
            const response = await fetch(
                "https://back-proyecto-segundo-cicnuenta.vercel.app/servicio"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch servicio");
            }
            const data = await response.json();
            setServicios(data.data);
        } catch (error) {
            console.error("Error fetchin servicio:", error);
        }
    };

    const openDialog = () => {
        setVisible(true);
        fetchServicio();
    };

    const closeDialog = () => {
        setVisible(false);
    };
    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Agregar Servicio</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button label="limpiar" icon="pi pi-eraser" severity="warning" />
            <Button
                label="Guardar"
                icon="pi pi-user-edit"
                severity="success"
                onClick={() => addServicios()}
            />
        </div>
    );
    return (
        <div className="card flex justify-content-center">
            <Button icon="pi pi-save" onClick={() => openDialog()} />
            <Dialog
                visible={visible}
                modal
                header={headerElement}
                footer={footerContent}
                style={{ width: "50rem" }}
                onHide={() => closeDialog()}
            >
                {/**Form */}

                <div className="card flex flex-column md:flex-row gap-3">
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText
                            placeholder="Id"
                            value={id}
                            onChange={(e) => setId(parseInt(e.target.value) || "")}
                        />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-ticket"></i>
                        </span>
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">Servicio</span>
                        <Dropdown
                            value={selectServicio}
                            onChange={(e) => setSelectServicio(e.value)}
                            options={servicios}
                            optionLabel="nombre"
                            optionValue="_id"
                            placeholder="Selecciona una mascota"
                            className="w-full md:w-14rem"
                        />
                    </div>
                </div>
                {/**End Form */}
            </Dialog>
        </div>

    );
};

export default ModalServicios;
