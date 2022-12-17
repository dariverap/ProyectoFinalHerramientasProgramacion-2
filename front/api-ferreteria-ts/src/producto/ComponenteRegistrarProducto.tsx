import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { on } from "events";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CompononenteCajaTexto from "../utilidad/ComponenteCajaTexto";
import { createBrowserHistory } from "@remix-run/router";
import { ProductoDTO, ProductoRegistrarDTO } from "./producto.model";
import axios from "axios";
import { url } from "inspector";
import { useNavigate } from "react-router-dom";
import { CategoriaDTO } from "../categoria/categoria.model";
import Swal from "sweetalert2";

export default function ComponenteRegistrarCliente() {
    const history = useNavigate();

    const url = "https://localhost:44318/api-ferreteria/producto";
    const urlcategorias = "https://localhost:44318/api-ferreteria/categoria/custom";
    const [categoria, setCategoria] = useState<CategoriaDTO[]>();
    const [selectCategoria,setSelectCategoria] = useState("");

    const peticionesGet = async () => {
        await axios
            .get(urlcategorias)
            .then((response) => {
            setCategoria(response.data);
            })
            .catch((error) => {
            console.log(error);
            });
    };

    async function RegistrarProducto(productos: ProductoRegistrarDTO) {
        console.log(selectCategoria);
        try {
            await axios.post(url, productos);
            Swal.fire(
                'Producto!',
                'Registrado Con Exito',
                'success'
              )
            history("/productos");
        } catch (error) {
            Swal.fire(
                'Opps!',
                'No escogio una categoria',
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
            <h1>Registro de Productos</h1>
            <Formik
                initialValues={{
                    nombre: "",
                    descripcion: "",
                    estado: true,
                    categoria: 1,
                    precio: 1,
                    stock: 1,

                }}
                onSubmit={async (valores) => {
                    await new Promise((r) => setTimeout(r, 1));
                    var est = false;
                    if (valores.estado == true) {
                        est = true;
                    } else {
                        est = false;
                    }

                    await RegistrarProducto({
                        nombre: valores.nombre,
                        descripcion: valores.descripcion,
                        estado: est,
                        precio: valores.precio,
                        stock: valores.stock,
                        categoriaId: selectCategoria,

                    });
                }}
                validationSchema={Yup.object({
                    nombre: Yup.string().required("Este campo es requerido..."),
                    descripcion: Yup.string().required("Este campo es requerido..."),
                    precio: Yup.number().required("Este campo es requerido..."),
                    stock: Yup.number().required("Este campo es requerido..."),
                })}
            >
                <Form className="form-control text-white" style={{paddingBottom:"30px",paddingTop:"30px",background:"#242526", border:"3px solid #695CFE", paddingLeft:"40px"}}>
                    <CompononenteCajaTexto  pattern="[A-Za-z0-9]+{1,254}" type="text" campo="nombre" label="Nombre:" />
                    <CompononenteCajaTexto  pattern="[A-Za-z0-9 /-]{1,254}" type="text" campo="descripcion" label="Descripcion:" />
                    <CompononenteCajaTexto  pattern="[0-9]{1,254}" type="number" campo="precio" label="Precio:" />
                    <CompononenteCajaTexto  pattern="[0-9]{1,254}" type="number" campo="stock" label="Stock:" />
                    <div className="col-2 mt-3">

                <div className="row">
                    <div className="col-6" style={{fontSize:"18px"}}>
                        <label className="form-label" style={{fontWeight:500}}>Categoria:</label>
                        <select onChange={c => setSelectCategoria(c.target.value)} value={selectCategoria} className="form-select"  id="floatingSelectGrid" style={{width:"700px"}}>
                        <option >--Seleccionar Categoria--</option>
                        {categoria?.map((d) => (
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
                            <a href="/productos" className="btn btn-danger" style={{marginLeft:"15px"}}>Cancelar</a>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
