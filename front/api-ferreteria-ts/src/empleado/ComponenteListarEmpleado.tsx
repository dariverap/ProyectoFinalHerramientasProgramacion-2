import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import Cookies from 'universal-cookie';
import { Link, useNavigate } from "react-router-dom";
import { EmpleadoDTO, ListaEmpleadoDTO, RolDTO } from "./empleado.model";


export default function ComponenteListarempleado() {
    const cookies = new Cookies();
    const history = useNavigate();
    const url = "https://localhost:44318/api-ferreteria/empleado";
    const urlrol = "https://localhost:44318/api-ferreteria/rol";
    const [rol, setRol] =useState([]);
    const [empleados, setEmpleados] = useState<ListaEmpleadoDTO[]>();
    
    const peticionesGet = async () => {
        await axios
            .get(url)
            .then((response) => {
                setEmpleados(response.data);
               
            })
            .catch((error) => {
                console.log(error);
            });
            
    };
    const obtenerRol = async () => {
        await axios
            .get(urlrol)
            .then((response) => {
                setRol(response.data);
                console.log(rol);
            })
            .catch((error) => {
            console.log(error);
            });
    };
    async function Eliminar(id:number){
        try{
          await axios.delete("https://localhost:44318/api-ferreteria/empleado/"+id);
          window.location.reload()
          history("/empleados")
      
        }catch(error){
          console.log(error)
        }
      }
    useEffect(() => {
        obtenerRol();
        if(!cookies.get('id')){
            history("/login");
        }
        
        peticionesGet();
        
    }, []);
    return (
      <div
        id="content"
        style={{
          overflow: "hidden",
          width: "70%",
          margin: "auto 20%",
          marginTop: "20px",
          height: "200vh",
        }}
      >
        <h1>Lista de empleados</h1>
        <a
          href="empleados/registrar"
          className="btn btn-primary"
          style={{ marginBottom: "15px" }}
        >
          {" "}
          Registrar empleado
        </a>
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Cargo</th>
                <th scope="col 2">Estado</th>
                <th scope="col 2">Acciones</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="table-dark">
              {/* se muestra los datos de la tabla */}
              {empleados?.map((empleado) => (
                <tr key={empleado.id}>
                  <th scope="row">{empleado.id}</th>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.apellido}</td>
                  <td>{empleado.nombreRol}</td>
                  
                  {empleado.estado ? <td>Habilitado</td> : <td>Deshabilitado</td>}
                  <td>
                    <Link
                      to={`/empleados/actualizar/${empleado.id}`}
                      className="btn btn-success"
                    >
                      Actualizar
                    </Link>
                  </td>
                  <td>
                  <button onClick={() => {Eliminar(empleado.id)}} className="btn btn-danger">
                  Deshabilitar
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}