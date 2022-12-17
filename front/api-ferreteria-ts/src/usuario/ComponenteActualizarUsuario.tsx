import axios from "axios";
import { Field, Formik, Form } from "formik";
import { ClientRequest } from "http";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompononenteCajaTexto from "../utilidad/ComponenteCajaTexto";
import { UsuarioDTO, UsuarioRegistrarDTO } from "./usuario.model";
import * as Yup from 'yup';
import { EmpleadoDTO } from "../empleado/empleado.model";
import Swal from "sweetalert2";

export default function ComponenteActualizarCliente(){
  // creamos una variable para capturar el codigo que se va a actualizar
  const history = useNavigate();
  const { id }: any = useParams();
  const url = "https://localhost:44318/api-ferreteria/usuario/";
  const [usuarios, setUsuarios] = useState<UsuarioDTO>();

  const urlcategorias = "https://localhost:44318/api-ferreteria/empleado/custom";
  const [empleado, setEmpleado] = useState<EmpleadoDTO[]>();
  const [selectEmpleado,setSelectEmpleado] = useState("");
  const [isChecked, setIsChecked] = useState(true);

  const handleOnChange = () => {
    setIsChecked(!isChecked);

  };

  const obtenerEmpleado = async () => {
      await axios
          .get(urlcategorias)
          .then((response) => {
            setEmpleado(response.data);
          })
          .catch((error) => {
          console.log(error);
          });
  };

  const peticionesGet = async () => {
    await axios
      .get(url+id)
      .then((response) => {
        setUsuarios(response.data);
        setIsChecked((response.data).estado);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function ActualizarUsuario(usuario:UsuarioDTO){
    try{
      await axios.put(url+id,usuario);
      
      Swal.fire(
        'Usuario!',
        'Actualizado Con Exito',
        'success'
      )
      history("/usuarios")
    }catch(error){
        Swal.fire(
            'Ups',
            'Selecciona un trabajo sin usuario',
            'error'
          )
      console.log(error)
    }
  }
  useEffect(() => {
    obtenerEmpleado();
    peticionesGet();
  }, []);
  
  return (
    <div id="content" className="w-50"  style={{overflow:"hidden",marginTop:"20px",height:"100vh"}}>
        <h1>Actualizacion de Usuarios</h1>
        <Formik
        enableReinitialize
            initialValues={{
                id:usuarios?.id,
                nombre: usuarios?.nombre,
                contraseña: usuarios?.contraseña,
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

                await ActualizarUsuario({
                    id:usuarios?.id,
                    nombre: valores.nombre,
                    contraseña: valores.contraseña,
                    estado: isChecked,
                    empleadoId: selectEmpleado,


                });
            }}
            validationSchema={Yup.object({
                nombre: Yup.string().required("Este campo es requerido..."),
                contraseña: Yup.string().required("Este campo es requerido..."),
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
              <label className="form-label">Nombre de Usuario:</label>
              <Field name="nombre" type="text" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label className="form-label">Contraseña:</label>
              <Field name="contraseña" type="text" className="form-control" />
            </div>
          </div>

         

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
            <div className="row">
            <div className="col-6">
              <label className="form-label">Estado:</label>
              <div className="col-6 form-check">
                {usuarios?.estado ? (
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
                    <div className="col-6 mt-4">
                        <button type="submit" className="btn btn-primary">
                            Actualizar
                        </button>
                        <a href="/usuarios" className="btn btn-danger" style={{marginLeft:"15px"}}>Cancelar</a>
                    </div>
                </div>
            </Form>
        </Formik>
    </div>
);
}
