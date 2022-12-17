import ReactDOM from "react-dom";
import React, { useState } from "react";
import { on } from "events";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import CompononenteCajaTexto from "../utilidad/ComponenteCajaTexto";
import { createBrowserHistory } from "@remix-run/router";
import { CategoriaDTO, CategoriaRegistrarDTO } from "./categoria.model";
import axios from "axios";
import { url } from "inspector";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ComponenteRegistrarCliente() {
  const history = useNavigate();
  const url = "https://localhost:44318/api-ferreteria/categoria";

  async function RegistrarCategoria(categorias:CategoriaRegistrarDTO){
    try{
      await axios.post(url,categorias);
      Swal.fire(
        'Categoria!',
        'Registrada Con Exito',
        'success'
      )
      history("/categorias")
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div id="content" className="w-50"  style={{overflow:"hidden",marginTop:"20px",height:"100vh"}}>
      <h1>Registro de Categorias</h1>
      <Formik initialValues={{
        nombre: '',
        descripcion: '',
        estado: true,
      }}
        onSubmit={async valores => {
          await new Promise(r => setTimeout(r, 1));
          var est=false;
          if(valores.estado == true){
            est = true;
          } else{
            est = false;
          }
          
          await RegistrarCategoria({
            nombre: valores.nombre,
            descripcion: valores.descripcion,
            estado: est,
          });
        }
        }

        validationSchema={
          Yup.object({
            nombre: Yup.string().required("Este campo es requerido..."),
            descripcion: Yup.string().required("Este campo es requerido..."),

          })}
      >
        <Form className="form-control text-white" style={{paddingBottom:"30px",paddingTop:"30px",background:"#242526", border:"3px solid #695CFE", paddingLeft:"40px"}}>
          <CompononenteCajaTexto pattern="[a-zA-Z ]{1,254}" type="text" campo="nombre" label="Nombre:" />
          <CompononenteCajaTexto pattern="[a-zA-Z ]{1,254}" type="text" campo="descripcion" label="Descripcion:" />


          <div className="row">
            <div className="col-6">
              <label className="form-label">Estado:</label>
              <div className="col-6 form-check">
                <Field className="form-check-input" name="estado" type="checkbox" />
                <label className="form-check-label">Habilitado</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 mt-4">
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
              <a href="/categorias" className="btn btn-danger" style={{marginLeft:"15px"}}>Cancelar</a>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
};
