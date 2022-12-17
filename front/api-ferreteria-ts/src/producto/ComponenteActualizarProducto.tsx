import axios from "axios";
import { Field, Formik, Form } from "formik";
import { ClientRequest } from "http";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompononenteCajaTexto from "../utilidad/ComponenteCajaTexto";
import { ProductoDTO, ProductoRegistrarDTO } from "./producto.model";
import * as Yup from 'yup';
import { CategoriaDTO } from "../categoria/categoria.model";
import Swal from "sweetalert2";

export default function ComponenteActualizarCliente(){
  // creamos una variable para capturar el codigo que se va a actualizar
  const history = useNavigate();
  const { id }: any = useParams();
  const url = "https://localhost:44318/api-ferreteria/producto/";
  const [productos, setProductos] = useState<ProductoDTO>();
  const urlcategorias = "https://localhost:44318/api-ferreteria/categoria";
  const [categoria, setCategoria] = useState<CategoriaDTO[]>();
  const [selectCategoria,setSelectCategoria] = useState("");
  const [isChecked, setIsChecked] = useState(true);

  const handleOnChange = () => {
    setIsChecked(!isChecked);

  };

  const obtenerCategoria = async () => {
      await axios
          .get(urlcategorias)
          .then((response) => {
          setCategoria(response.data);

          })
          .catch((error) => {
          console.log(error);
          });
  };

  const peticionesGet = async () => {
    await axios
      .get(url+id)
      .then((response) => {
        setProductos(response.data);
        setIsChecked((response.data).estado);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function ActualizarProducto(producto:ProductoDTO){
    try{
      await axios.put(url+id,producto);
      Swal.fire(
        'Producto!',
        'Actualizado Con Exito',
        'success'
      )
      history("/productos")
    }catch(error){
      
Swal.fire(
  'Ups',
  'Selecciona una categoria',
  'error'
)
      console.log(error)
    }
  }
  useEffect(() => {
    obtenerCategoria();
    peticionesGet();
  }, []);
  
  return (
    <div id="content" className="w-50"  style={{overflow:"hidden",marginTop:"20px",height:"100vh"}}>
      <h1>Actualizacion de Productos</h1>
      <Formik 
        enableReinitialize
        initialValues={{
            id: productos?.id,
            nombre: productos?.nombre,
            descripcion: productos?.descripcion,
            estado: true,
            categoriaId: productos?.categoriaId,
            precio: productos?.precio,
            stock: productos?.stock,
      }}
      
        onSubmit={async valores => {
          await new Promise(r => setTimeout(r, 1));
          var est=false;
          if(valores.estado == true){
            est = true;
          } else{
            est = false;
          }
          await ActualizarProducto({
            id: productos?.id,
            nombre: valores.nombre,
            descripcion: valores.descripcion,
            estado: isChecked,
            precio: valores.precio,
            stock: valores.stock,
            categoriaId: selectCategoria,
          });
        }
        }
        

        validationSchema={
          Yup.object({
            nombre: Yup.string().required("Este campo es requerido..."),
            descripcion: Yup.string().required("Este campo es requerido..."),
            precio: Yup.string().required("Este campo es requerido..."),
            stock: Yup.string().required("Este campo es requerido...")
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
              <Field name="nombre" type="text" className="form-control" required/>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label className="form-label">Descripcion:</label>
              <Field name="descripcion" type="text" className="form-control" required/>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label className="form-label">Precio:</label>
              <Field name="precio" type="number" className="form-control" required/>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label className="form-label">Stock:</label>
              <Field name="stock" type="number" className="form-control" required/>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Estado:</label>
              <div className="col-6 form-check">
                {productos?.estado ? (
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
                        <label className="form-label" style={{fontWeight:500}}>Categoria:</label>
                        <select onChange={c => setSelectCategoria(c.target.value)} value={selectCategoria} className="form-select"  id="floatingSelectGrid" style={{width:"700px"}}>
                        <option >--Seleccionar Categoria--</option>
                        {categoria?.map((d) => (
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
                            <a href="/productos" className="btn btn-danger" style={{marginLeft:"15px"}}>Cancelar</a>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
