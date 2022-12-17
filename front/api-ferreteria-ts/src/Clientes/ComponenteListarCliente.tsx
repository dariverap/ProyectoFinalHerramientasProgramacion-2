import axios from "axios";
import { useEffect, useState } from "react";
import { ClienteDTO, ClienteRegistrarDTO } from "./cliente.model";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";

export default function ComponenteListarCliente(){
  const {id}=useParams();
const cookies = new Cookies();
const history = useNavigate();

const url = "https://localhost:44318/api-ferreteria/cliente";
const [clientes, setClientes] = useState<ClienteDTO[]>();

const peticionesGet = async () => {
  await axios
    .get(url)
    .then((response) => {
      setClientes(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};


async function Eliminar(id:number){
  try{
    await axios.delete("https://localhost:44318/api-ferreteria/cliente/"+id);
    window.location.reload()
    history("/clientes")

  }catch(error){
    console.log(error)
  }
}

//se llama a la peticion
useEffect(() => {
  if(!cookies.get('id')){
    history("/login");
}

  peticionesGet();
}, []);
////////////////////////////////////
  return(
    <div id="content" style={{overflow:"hidden", width:"70%",margin:"auto 20%",paddingTop:"20px", height:"200vh"}}>
      <h1>Lista de Clientes</h1>
      <a href="clientes/registrar" className="btn btn-primary" style={{marginBottom:"15px"}}>
        Registrar Cliente
      </a>
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Num° Documento</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-dark">
            {/* se muestra los datos de la tabla */}
            {clientes?.map((cliente) => (
              <tr key={cliente.id}>
                <th scope="row">{cliente.id}</th>               
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.numdocumento}</td>
                {cliente.estado ? <td>Habilitado</td> : <td>Deshabilitado</td>}
                <td>
                  <Link
                    to={`/clientes/actualizar/${cliente.id}`}
                    className="btn btn-success"
                  >
                    Actualizar
                  </Link>
                </td>
                <td>
                  <button onClick={() => {Eliminar(cliente.id)}} className="btn btn-danger">
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