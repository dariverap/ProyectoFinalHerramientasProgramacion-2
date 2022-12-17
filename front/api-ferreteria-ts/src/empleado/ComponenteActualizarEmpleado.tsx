import axios from "axios";
import { Field, Formik, Form } from "formik";
import { ClientRequest } from "http";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompononenteCajaTexto from "../utilidad/ComponenteCajaTexto";
import { EmpleadoDTO,  EmpleadoRegistrarDTO } from "./empleado.model";
import * as Yup from 'yup';
import { RolDTO } from "../empleado/empleado.model";
import Swal from "sweetalert2";

export default function ComponenteActualizarEmpleado(){
  // creamos una variable para capturar el codigo que se va a actualizar
  const history = useNavigate();
  const { id }: any = useParams();
  const url = "https://localhost:44318/api-ferreteria/empleado/";
  const [empleados, setEmpleados] = useState<EmpleadoDTO>();
  const urlrol = "https://localhost:44318/api-ferreteria/rol";
  const [rol, setRol] = useState<RolDTO[]>();
  const [selectRol,setSelectRol] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  
  const handleOnChange = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
  };
  const obtenerRol = async () => {
      await axios
          .get(urlrol)
          .then((response) => {
            setRol(response.data);
          })
          .catch((error) => {
          console.log(error);
          });
  };

  const peticionesGet = async () => {
    await axios
      .get(url+id)
      .then((response) => {
        setEmpleados(response.data);
        setIsChecked((response.data).estado);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function ActualizarEmpleado(empleado:EmpleadoDTO){
    try{
      await axios.put(url+id,empleado);
      Swal.fire(
        'Empleado!',
        'Actualizado Con Exito',
        'success'
      )
      history("/empleados")
    }catch(error){
        
Swal.fire(
    'Ups',
    'Seleccione el cargo',
    'error'
  )
      console.log(error)
    }
  }
  useEffect(() => {
    obtenerRol();
    peticionesGet();
  }, []);
  
  return (
    <div id="content" className="w-50"  style={{overflow:"hidden",marginTop:"20px",height:"100vh"}}>
        <h1>Actualizacion de Empleado</h1>
        <Formik
        enableReinitialize
            initialValues={{
                id:empleados?.id,
                nombre: empleados?.nombre,
                apellido: empleados?.apellido,
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

                await ActualizarEmpleado({
                    id: empleados?.id,
                    nombre: valores.nombre,
                    apellido: valores.apellido,
                    estado: isChecked,
                    rolId: selectRol,

                });
            }}
            validationSchema={Yup.object({
                nombre: Yup.string().required("Este campo es requerido..."),
                apellido: Yup.string().required("Este campo es requerido..."),
            })}
        >
            <Form className="form-control text-white"
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
              <Field name="nombre" type="text" pattern="[a-zA-Z ]{1,254}" className="form-control" required/>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label className="form-label">Apellido:</label>
              <Field name="apellido" type="text" pattern="[a-zA-Z ]{1,254}" className="form-control" required/>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Estado:</label>
              <div className="col-6 form-check">
                {empleados?.estado ? (
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
                <div className="col-6" style={{fontSize:"18px"}}>
                    <label className="form-label" style={{fontWeight:500}}>Cargo:</label>
                    <select onChange={c => setSelectRol(c.target.value)} value={selectRol} className="form-select"  id="floatingSelectGrid" style={{width:"700px"}}>
                    <option >--Seleccionar Cargo--</option>
                    {rol?.map((d) => (
                        <option key={d.id} value={d.id} >{d.nombre}</option>
                    ))}
                    </select>
                </div>
            </div>

                <div className="row">
                    <div className="col-6 mt-4">
                        <button type="submit" className="btn btn-primary">
                            Actualizar
                        </button>
                        <a href="/empleados" className="btn btn-danger" style={{marginLeft:"15px"}}>Cancelar</a>
                    </div>
                </div>
            </Form>
        </Formik>
    </div>
);
}
