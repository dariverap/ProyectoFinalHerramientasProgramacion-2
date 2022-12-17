import axios from "axios";
import { useEffect, useState, } from "react";
import { CategoriaDTO } from "./categoria.model";
import Cookies from 'universal-cookie';

import { Link, useNavigate } from "react-router-dom";
export default function ComponenteListarCategoria(){


const url = "https://localhost:44318/api-ferreteria/categoria";
const history = useNavigate();
const [categoria, setCategoria] = useState<CategoriaDTO[]>();
const cookies = new Cookies();
const peticionesGet = async () => {
    await axios
        .get(url)
        .then((response) => {
        setCategoria(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
};
//funcion para eliminar(pasar estado a disable)

async function Eliminar(id:number){
    try{
      await axios.delete("https://localhost:44318/api-ferreteria/categoria/"+id);
      window.location.reload()
      history("/categorias")
  
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
////////////////////////////////////////////
    return(
        <div id="content" style={{overflow:"hidden",width:"70%",margin:"auto 20%",marginTop:"20px",height:"200vh"}}>
        <h1>Lista de categorías</h1>
        <a href="categorias/registrar" className="btn btn-primary" style={{marginBottom:"15px"}}>
            Registrar categoria
        </a>
        <div className="container table-responsive" style={{paddingLeft:"0px",paddingRight:"0px"}}>
            <table className="table table-bordered  table-hover">
                <thead className="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre de la Categoría</th>
                    <th scope="col" className="col-sm-4">Descripción</th>
                    <th scope="col" className="col-sm-4">Estado</th>
                    <th scope="col" className="col"></th>
                    <th scope="col" className="col"></th>
                </tr>
                </thead>
                <tbody className="table-dark">
                {/* se muestra los datos de la tabla */}
                {categoria?.map((categoria)=> (
                <tr key={categoria.id}>
                    <th scope="row">{categoria.id}</th>
                    <td>{categoria.nombre}</td>
                    <td>{categoria.descripcion}</td>
                    {categoria.estado ? <td>Habilitado</td> : <td>Deshabilitado</td>}
                    <td>
                    <Link
                    to={`/categorias/actualizar/${categoria.id}`}
                    className="btn btn-success"
                  >
                    Actualizar
                  </Link>
                    </td>
                    <td>
                        <button onClick={() => {Eliminar(categoria.id)}} className="btn btn-danger">Deshabilitar</button>
                    </td>
                </tr>
                ))}                            
                </tbody>
            </table>
        </div>
        
    </div>
    )
}