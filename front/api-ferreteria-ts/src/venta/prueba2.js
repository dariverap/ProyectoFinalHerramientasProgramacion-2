import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default function ComponenteVenta() {

  const [productos, setProductos] = useState([]);
  const [tablaProductos, setTablaProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalBuscarProductos, setBuscarProductos] = useState(false);
  const [gestorSeleccionado, setGestorSeleccionado]=useState({
    id: '',
    nombre: '',

  })

  //función para traer los datos de la API
  const URL = "https://localhost:44318/api-ferreteria/producto/custom";

  const peticionGet = async () => {
    await axios.get(URL)
      .then(response => {
        setProductos(response.data);
        setTablaProductos(response.data);
      }).catch(error => {
        console.log(error);
      })
  }
  const handleChange = e => {
    const {nombre, value}=e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [nombre]: value
    });
    console.log(gestorSeleccionado);

    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const abrirCerrarmodalBuscarProductos = () => {
    setBuscarProductos(!modalBuscarProductos);
  }
  

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaProductos.filter((elemento) => {
      if (elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      }
    });
    setProductos(resultadosBusqueda);
  }

  useEffect(() => {
    peticionGet();
  }, [])

  return (

    <div>
      <div>
        <br /><br />
        <a onClick={() => abrirCerrarmodalBuscarProductos()} className="btn btn-success">Buscar Producto</a>
        <br /><br />
      </div>
      <Modal isOpen={modalBuscarProductos}>
        <ModalHeader>Agregar Producto</ModalHeader>
        <ModalBody>
          <div className="w-50 mt-3" style={{ overflow: "hidden" }}>
            <input
              className="form-control inputBuscar"
              value={busqueda}
              placeholder="Búsqueda por Nombre"
              onChange={handleChange}
            />
          </div>
          <div className="table">
            <table className="table table-sm table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Stock</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {productos && productos.map((producto,index) => (
                    <tr key={producto.id}>
                      <td >{producto.id}</td>
                      <td >{producto.nombre}</td>
                      <td >{producto.stock}</td>
                      <td>
                      <button className="btn btn-success detail-button" onClick={ () => handleChange(producto) }>Add Producto</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => abrirCerrarmodalBuscarProductos()}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
    
  );
}
