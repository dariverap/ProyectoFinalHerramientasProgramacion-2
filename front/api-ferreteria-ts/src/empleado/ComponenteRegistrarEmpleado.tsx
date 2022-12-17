import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { on } from "events";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CompononenteCajaTexto from "../utilidad/ComponenteCajaTexto";
import { createBrowserHistory } from "@remix-run/router";
import { EmpleadoDTO, EmpleadoRegistrarDTO, RolDTO } from "./empleado.model";
import axios from "axios";
import { url } from "inspector";
import { useNavigate } from "react-router-dom";
import { CategoriaDTO } from "../categoria/categoria.model";
import Swal from "sweetalert2";

export default function ComponenteRegistrarCliente() {
    const history = useNavigate();

    const url = "https://localhost:44318/api-ferreteria/empleado";
    const urlrol = "https://localhost:44318/api-ferreteria/rol";
    const [rol, setRol] = useState<RolDTO[]>();
    const [selectRol,setSelectRol] = useState("");

    const peticionesGet = async () => {
        await axios
            .get(urlrol)
            .then((response) => {
                setRol(response.data);
            })
            .catch((error) => {
            console.log(error);
            });
    };

    async function RegistrarEmpleado(empleados:EmpleadoRegistrarDTO) {
        try {
            await axios.post(url, empleados);
            Swal.fire(
                'Empleado!',
                'Registrado Con Exito',
                'success'
              )
            history("/empleados");
        } catch (error) {
            Swal.fire(
                'Ups',
                'No has escogido un cargo/rol',
                'error'
              )
            console.log(error);
        }
    }

    useEffect(() => {
        peticionesGet();
    }, []);


    return (
        <div id="content" className="w-50"  style={{overflow:"hidden",marginTop:"20px",height:"100vh"}}>
            <h1>Registro de Empleado</h1>
            <Formik
                initialValues={{
                    nombre: "",
                    apellido: "",
                    estado: true,
                    rolId: 1,



                }}
                onSubmit={async (valores) => {
                    await new Promise((r) => setTimeout(r, 1));
                    var est = false;
                    if (valores.estado == true) {
                        est = true;
                    } else {
                        est = false;
                    }

                    await RegistrarEmpleado({
                        nombre: valores.nombre,
                        apellido: valores.apellido,
                        estado: est,
                        rolId: selectRol,

                    });
                }}
                validationSchema={Yup.object({
                    nombre: Yup.string().required("Este campo es requerido..."),
                    apellido: Yup.string().required("Este campo es requerido..."),
                })}
            >
                <Form className="form-control text-white" style={{paddingBottom:"30px",paddingTop:"30px",background:"#242526", border:"3px solid #695CFE", paddingLeft:"40px"}}>
                    <CompononenteCajaTexto  pattern="[a-zA-Z ]{1,254}" type="text" campo="nombre" label="Nombre:" />
                    <CompononenteCajaTexto  pattern="[a-zA-Z ]{1,254}" type="text" campo="apellido" label="Apellido:" />
                    <div className="col-2 mt-3">

                <div className="row">
                    <div className="col-6" style={{fontSize:"18px"}}>
                        <label className="form-label" style={{fontWeight:500}}>Cargo:</label>
                        <select onChange={c => setSelectRol(c.target.value)} value={selectRol} className="form-select"  id="floatingSelectGrid" style={{width:"700px"}}>
                        <option>--Selecionar Cargo--</option>
                        {rol?.map((d) => (
                            <option key={d.id} value={d.id} >{d.nombre}</option>
                        ))}
                        </select>
                    </div>
                </div>
                </div>
                    <div className="row">
                        <div className="col-6" style={{marginTop:"15px"}}>
                            <label className="form-label">Estado:</label>
                            <div className="col-6 form-check">
                                <Field
                                    className="form-check-input"
                                    name="estado"
                                    type="checkbox"
                                />
                                <label className="form-check-label">Habilitado</label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6 mt-4">
                            <button type="submit" className="btn btn-primary">
                                Registrar
                            </button>
                            <a href="/empleados" className="btn btn-danger" style={{marginLeft:"15px"}}>Cancelar</a>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
