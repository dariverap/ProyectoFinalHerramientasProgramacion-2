import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { on } from "events";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CompononenteCajaTexto from "../utilidad/ComponenteCajaTexto";
import { createBrowserHistory } from "@remix-run/router";
import { UsuarioDTO, UsuarioRegistrarDTO } from "./usuario.model";
import axios from "axios";
import { url } from "inspector";
import { useNavigate } from "react-router-dom";
import { EmpleadoDTO } from "../empleado/empleado.model";
import Swal from "sweetalert2";

export default function ComponenteRegistrarUsuario() {
    const history = useNavigate();

    const url = "https://localhost:44318/api-ferreteria/usuario";
    const urlempleado = "https://localhost:44318/api-ferreteria/empleado/custom";
    const [empleado, setEmpleado] = useState<EmpleadoDTO[]>();
    const [selectEmpleado,setSelectEmpleado] = useState("");

    const peticionesGet = async () => {
        await axios
            .get(urlempleado)
            .then((response) => {
                setEmpleado(response.data);
            })
            .catch((error) => {
            console.log(error);
            });
    };

    async function RegistrarUsuario(usuario: UsuarioRegistrarDTO) {
        console.log(selectEmpleado);
        try {
            await axios.post(url, usuario);
            
            history("/usuarios");
        } catch (error) {
            Swal.fire(
                'No ha escogido un empleado o',
                'Ya existe un usuario con ese empleado',
                'error'
              )
              return
            console.log(error);
            
        }
    }

    useEffect(() => {
        peticionesGet();
    }, []);


    return (
        <div id="content" className="w-50"  style={{overflow:"hidden",marginTop:"20px",height:"100vh"}}>
            <h1>Registro de Usuarios</h1>
            <Formik
                initialValues={{
                    nombre: "",
                    contraseña: "",
                    estado: true,
                    empleadoId: selectEmpleado,

                }}
                onSubmit={async (valores) => {
                    await new Promise((r) => setTimeout(r, 1));
                    var est = false;
                    if (valores.estado == true) {
                        est = true;
                    } else {
                        est = false;
                    }

                    await RegistrarUsuario({
                        nombre: valores.nombre,
                        contraseña: valores.contraseña,
                        estado: est,
                        empleadoId: selectEmpleado,


                    });
                }}
                validationSchema={Yup.object({
                    nombre: Yup.string().required("Este campo es requerido..."),
                    contraseña: Yup.string().required("Este campo es requerido..."),
                })}
            >
                <Form className="form-control text-white" style={{paddingBottom:"30px",paddingTop:"30px",background:"#242526", border:"3px solid #695CFE", paddingLeft:"40px"}}>
                    <CompononenteCajaTexto pattern="[A-Za-z0-9 ]{1,254}" type="text" campo="nombre" label="Nombre:" />
                    <CompononenteCajaTexto pattern="[A-Za-z0-9 /]{1,254}" type="text"  campo="contraseña" label="Contraseña:" />

                    <div className="col-2 mt-3">

                <div className="row">
                    <div className="col-6" style={{fontSize:"18px"}}>
                        <label className="form-label" style={{fontWeight:500}}>Empleado:</label>
                        <select onChange={c => setSelectEmpleado(c.target.value)} value={selectEmpleado} className="form-select"  id="floatingSelectGrid" style={{width:"700px"}}>
                        <option >--Seleccionar Empleado--</option>
                        {empleado?.map((d) => (
                            <option key={d.id} value={d.id} >{d.nombre +" "+ d.apellido}</option>
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
                            <a href="/productos" className="btn btn-danger" style={{marginLeft:"15px"}}>Cancelar</a>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
