import axios from "axios";
import React from "react";
import { lazy, useEffect, useState } from "react";
import { ListaUsuarioDTO, UsuarioDTO } from "./usuario.model";
import Cookies from 'universal-cookie';
import { Link, useNavigate } from "react-router-dom";



export default function ComponenteListarUsuario() {
    const url = "https://localhost:44318/api-ferreteria/usuario";
    const [usuarios, setUsuarios] = useState<ListaUsuarioDTO[]>();
    const cookies = new Cookies();
    const history = useNavigate();


    const peticionesGet = async () => {
        await axios
            .get(url)
            .then((response) => {
              setUsuarios(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    async function Eliminar(id:number){
        try{
          await axios.delete("https://localhost:44318/api-ferreteria/usuario/"+id);
          window.location.reload()
          history("/usuarios")
      
        }catch(error){
          console.log(error)
        }
      }
    useEffect(() => {
        if(!cookies.get('id')){
            history("/login");
        }
        peticionesGet();
    }, []);

    return (
        <div  id="content" style={{overflow:"hidden",width:"70%",margin:"auto 20%",marginTop:"20px",height:"200vh"}}>
            <h1>Lista de Usuarios</h1>
            <a href="usuarios/registrar" className="btn btn-primary" style={{marginBottom:"15px"}}>
                Registrar Usuarios
            </a>
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre de usuario</th>
                            <th scope="col">Nombre de Empleado</th>
                            <th scope="col">Estado</th>                       
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="table-dark">
                        {/* se muestra los datos de la tabla */}
                        {usuarios?.map((usuario) => (
                            <tr key={usuario.id}>
                                <th scope="row">{usuario.id}</th>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.nombreEmpleado+" "+usuario.apellidoEmpleado}</td>
                                {usuario.estado ? <td>Habilitado</td> : <td>Deshabilitado</td>}
                                <td>
                                <Link
                    to={`/usuarios/actualizar/${usuario.id}`}
                    className="btn btn-success"
                  >
                    Actualizar
                  </Link>
                                </td>
                                <td>
                                <button onClick={() => {Eliminar(usuario.id)}} className="btn btn-danger">
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