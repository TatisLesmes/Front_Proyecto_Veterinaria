import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ModalPropietario = ({ setFlag }) => {
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState();
    const [name, setName] = useState("");
    const [selectMascota, setSelectMascota] = useState("");
    const [mascotas, setMascotas] = useState([]);

    const addPropietario = () => {
        const MySwal = withReactContent(Swal);

        const newPropietario = {
            id: id,
            nombre: name,

        };

        fetch(
            `https://back-proyecto-segundo-cicnuenta.vercel.app/propietario/${selectMascota}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPropietario),
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
    const fetchMascotas = async () => {
        try {
            const response = await fetch(
                "https://back-proyecto-segundo-cicnuenta.vercel.app/mascota"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch mascotas");
            }
            const data = await response.json();
            setMascotas(data.data);
        } catch (error) {
            console.error("Error fetchin mascotas:", error);
        }
    };

    const openDialog = () => {
        setVisible(true);
        fetchMascotas();
    };

    const closeDialog = () => {
        setVisible(false);
    };
    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Agregar Propietario</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button label="limpiar" icon="pi pi-eraser" severity="warning" />
            <Button
                label="Guardar"
                icon="pi pi-user-edit"
                severity="success"
                onClick={() => addPropietario()}
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
                        <span className="p-inputgroup-addon">Mascota</span>
                        <Dropdown
                            value={selectMascota}
                            onChange={(e) => setSelectMascota(e.value)}
                            options={mascotas}
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

export default ModalPropietario;
