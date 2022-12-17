import axios from "axios";
import React from "react";
import { lazy, useEffect, useState } from "react";
import { MostrarProductosDTO, ProductoDTO } from "./producto.model";
import Cookies from 'universal-cookie';
import { Link, useNavigate } from "react-router-dom";



export default function ComponenteListarProducto() {
    const url = "https://localhost:44318/api-ferreteria/producto";
    const [productos, setProductos] = useState<MostrarProductosDTO[]>();
    const cookies = new Cookies();
    const history = useNavigate();


    const peticionesGet = async () => {
        await axios
            .get(url)
            .then((response) => {
                setProductos(response.data);
                console.log(productos);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    async function Eliminar(id:number){
        try{
          await axios.delete("https://localhost:44318/api-ferreteria/producto/"+id)
          window.location.reload()
          history("/productos")
      
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
            <h1>Lista de Productos</h1>
            <a href="productos/registrar" className="btn btn-primary" style={{marginBottom:"15px"}}>
                Registrar Producto
            </a>
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Descripción</th> 
                            <th scope="col">Categoria</th> 
                            <th scope="col">Estado</th>                          
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="table-dark">
                        {/* se muestra los datos de la tabla */}
                        {productos?.map((productos) => (
                            <tr key={productos.id}>
                                <th scope="row">{productos.id}</th>
                                <td>{productos.nombre}</td>
                                <td>{productos.precio}</td>
                                <td>{productos.stock}</td>
                                <td>{productos.descripcion}</td>
                                <td>{productos.nombreCategoria}</td>
                                {productos.estado ? <td>Habilitado</td> : <td>Deshabilitado</td>}
                                <td>
                                <Link
                    to={`/productos/actualizar/${productos.id}`}
                    className="btn btn-success"
                  >
                    Actualizar
                  </Link>
                                </td>
                                <td>
                                <button onClick={() => {Eliminar(productos.id)}} className="btn btn-danger">
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