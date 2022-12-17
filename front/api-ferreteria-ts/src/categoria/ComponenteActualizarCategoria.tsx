import axios from "axios";
import { useFormik,Field, Formik, Form } from "formik";
import { ClientRequest } from "http";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompononenteCajaTexto from "../utilidad/ComponenteCajaTexto";
import { CategoriaDTO, CategoriaRegistrarDTO } from "./categoria.model";
import * as Yup from 'yup';
import Swal from "sweetalert2";

export default function ComponenteActualizarCategoria(){
  // creamos una variable para capturar el codigo que se va a actualizar
  const history = useNavigate();
  const { id }: any = useParams();
  const url = "https://localhost:44318/api-ferreteria/categoria/";
  const [categorias, setCategorias] = useState<CategoriaDTO>();

  const [isChecked, setIsChecked] = useState(true);

  const handleOnChange = () => {
    setIsChecked(!isChecked);

  };

  const peticionesGet = async () => {
    await axios
      .get(url+id)
      .then((response) => {
        setCategorias(response.data);
        setIsChecked((response.data).estado);


      })
      .catch((error) => {
        console.log(error);
      });
  };


  async function ActualizarCategoria(categoria:CategoriaDTO){
    try{
      await axios.put(url+id,categoria);
      Swal.fire(
        'Categoria!',
        'Actualizada Con Exito',
        'success'
      )
      history("/categorias")
    }catch(error){
      Swal.fire(
        'Ups',
        'Ingresa todos los datos',
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
      <h1>Actualizacion de Categoria</h1>
      <Formik
        enableReinitialize
        initialValues={{
          id: categorias?.id,
          nombre: categorias?.nombre,
          descripcion: categorias?.descripcion,
          estado: false,
        }}
        onSubmit={async (valores) => {
          await new Promise((r) => setTimeout(r, 1));
          var est = false;
          if (valores.estado == true) {
            est = true;
          } else {
            est = false;
          }
          await ActualizarCategoria({
            id: categorias?.id,
            nombre: valores.nombre,
            descripcion: valores.descripcion,
            estado: isChecked,
          });
        }}
        validationSchema={Yup.object({
          nombre: Yup.string().required("Este campo es requerido..."),
          descripcion: Yup.string().required("Este campo es requerido..."),
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
              <Field pattern="[a-zA-Z ]{1,254}" name="nombre" type="text" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label className="form-label">Descripcion:</label>
              <Field pattern="[a-zA-Z ]{1,254}" name="descripcion" type="text" className="form-control" />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Estado:</label>
              <div className="col-6 form-check">
                {categorias?.estado ? (
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
                href="/categorias"
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