import axios from "axios";
import { Field, Formik, Form } from "formik";
import { ClientRequest } from "http";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompononenteCajaTexto from "../utilidad/ComponenteCajaTexto";
import { ClienteDTO, ClienteRegistrarDTO } from "./cliente.model";
import * as Yup from 'yup';
import Swal from "sweetalert2";

export default function ComponenteActualizarCliente(){
  // creamos una variable para capturar el codigo que se va a actualizar
  const history = useNavigate();
  const { id }: any = useParams();
  const url = "https://localhost:44318/api-ferreteria/cliente/";
  const [clientes, setClientes] = useState<ClienteDTO>();

  const [isChecked, setIsChecked] = useState(true);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
  };
  const peticionesGet = async () => {
    await axios
      .get(url+id)
      .then((response) => {
        setClientes(response.data);
        setIsChecked((response.data).estado);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function ActualizarCliente(cliente:ClienteDTO){
    try{
      await axios.put(url+id,cliente);
      Swal.fire(
        'Cliente!',
        'Actualizado Con Exito',
        'success'
      )

      history("/clientes")
    }catch(error){
      Swal.fire(
        'Ups',
        'Ingrese todos los datos',
        'error'
      )
      console.log(error)
    }
  }
  useEffect(() => {
    peticionesGet();
  }, []);
  
  return (
    <div
      id="content"
      className="w-50"
      style={{ overflow: "hidden", marginTop: "20px", height: "100vh" }}
    >
      <h1>Actualizacion de Clientes</h1>
      <Formik
      enableReinitialize
        initialValues={{
          id: clientes?.id,
          nombre: clientes?.nombre,
          apellido: clientes?.apellido,
          numdocumento: clientes?.numdocumento,
          estado: true,
        }}
        onSubmit={async (valores) => {
          await new Promise((r) => setTimeout(r, 1));
          var est = false;
          if (valores.estado == true) {
            est = true;
          } else {
            est = false;
          }
          await ActualizarCliente({
            id: clientes?.id,
            nombre: valores.nombre,
            apellido: valores.apellido,
            numdocumento: valores.numdocumento,
            estado: isChecked,
          });
        }}
        validationSchema={Yup.object({
          nombre: Yup.string().required("Este campo es requerido..."),
          apellido: Yup.string().required("Este campo es requerido..."),
          numdocumento: Yup.string().required("Este campo es requerido..."),
        })}
      >
        <Form
          className="form-control text-white"
          style={{
            paddingBottom: "30px",
            paddingTop: "30px",
            background: "#242526",
            border: "3px solid #695CFE",
            paddingLeft: "40px",
          }}
        >
          <div className="row">
            <div className="col-6">
              <label className="form-label">Nombre:</label>
              <Field name="nombre" pattern="[a-zA-Z ]{1,254}" type="text" className="form-control" required/>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label className="form-label" >Apellido:</label>
              <Field name="apellido" type="text" pattern="[a-zA-Z ]{1,254}" className="form-control" required/>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Numero de Documento:</label>
              <Field name="numdocumento" type="number" className="form-control" required/>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Estado:</label>
              <div className="col-6 form-check">
                {clientes?.estado ? (
                  <div>
                    <Field
                      className="form-check-input"
                      name="estado"
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleOnChange}
                    />
                    <label className="form-check-label">Habilitado</label>
                  </div>
                ) : (
                  <div>
                    <Field
                      className="form-check-input"
                      name="estado"
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleOnChange}
                    />
                    <label className="form-check-label">Habilitado</label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 mt-4" style={{ marginTop: "10px" }}>
              <button type="submit" className="btn btn-primary">
                Actualizar
              </button>
              <a
                href="/clientes"
                type="submit"
                className="btn btn-danger"
                style={{ marginLeft: "15px" }}
              >
                Cancelar
              </a>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}