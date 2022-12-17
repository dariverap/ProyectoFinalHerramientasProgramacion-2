import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row, Table, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie';
export default function ComponenteVenta() {

  const history = useNavigate();
  const [fecha, setFecha] = useState(new Date());
  //función para traer los datos de la API 
  const URLC = 'https://localhost:44318/api-ferreteria/cliente/custom'
  const URLComprobantes= "https://localhost:44318/api-ferreteria/comprobante"
  const URL = "https://localhost:44318/api-ferreteria/producto/custom";
  const URLDocumento = "https://localhost:44318/api-ferreteria/documento/custom";
  const URLFormaPago = "https://localhost:44318/api-ferreteria/formapago/custom";
  const URLventa = "https://localhost:44318/api-ferreteria/comprobante";
  const [comprobantes,setComprobantes]= useState();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [numComprobante, setNumComprobante] = useState([]);

  const [modalBuscarProductos, setBuscarProductos] = useState(false);
  const [modalBuscarClientes, setBuscarClientes] = useState(false);
  const [productos, setProductos] = useState([]);
  const [cantidad, setCantidad] = useState("");
  //
  const [usersClientes, setUsersClientes] = useState([])
  const [searchClientes, setSearchClientes] = useState("")
  const [clienteSeleccionado, setClienteSeleccionado] = useState({})
  //
  const [total, setTotal] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const [igv, setIgv] = useState(0)
  //
  const [formaPago, setFormaPago] = useState([]);
  const [documento, setDocumento] = useState([]);

  const [seleccionarFormaPago, setSeleccionarFormaPago] = useState([]);
  const [seleccionarDocumento, setSeleccionarDocumento] = useState([]);
  const cookies = new Cookies();
//cargar numero de setComprobantes
const comprobantesGet = async () => {
  await axios
  .get(URLComprobantes)
  .then((response) => {
    setComprobantes(response.data);
  })
  .catch((error) => {
      console.log();
  });

};
//METODO PARA MOSTRAR FORMAS DE PAGO Y TIPO DE COMPROBANTE
const showDocumento = async () => {
  await axios
      .get(URLDocumento)
      .then((response) => {
        setDocumento(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
};

const showFormaPago = async () => {
  await axios
      .get(URLFormaPago)
      .then((response) => {
        setFormaPago(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
};
//obtener forma de pago y tipo de comproabnte

const obtenerFormapago = ( e ) => {
  const {value} = e.target;
        setSeleccionarFormaPago({ value});

};
const obtenerDocumento = (e) => {
  const {value} = e.target;
  setSeleccionarDocumento({ value});

};

  //obtener numcomprobante
  const obtenerNum = ({ target }) => {
    setNumComprobante(target.value);
  };


  //METODOS PARA BUSCAR CLIENTES 

  const showDataClientes = async () => {
    const response = await fetch(URLC)
    const data = await response.json()
    //console.log(data)
    setUsersClientes(data)
  }
  //función de búsqueda
  const searcherClientes = (e) => {
    setSearchClientes(e.target.value)
  }

  //metodo de filtrado 2   
  const resultsClientes = !searchClientes ? usersClientes : usersClientes.filter((dato) => dato.nombre.toLowerCase().includes(searchClientes.toLocaleLowerCase()))


  //METODO PARA SELECIONAR AL CLIENTES
  const seleccionarCliente = (gestor) => {
    setClienteSeleccionado(gestor);
/*     console.log(gestor);
    console.log(seleccionarFormaPago);
    console.log(seleccionarDocumento); */
    abrirCerrarmodalBuscarClientes();

  }


  // METODOS PARA BUSCAR PRODUCTOS

/*   const handleSubmit = (e) => {
    e.preventDefault();
   // console.log(cantidad);
  }; */

  const seleccionarProducto = (productoSeleccionado) => {
    if (productoSeleccionado.stock < cantidad || cantidad<=0) {
      Swal.fire(
        'Opps!',
        'No existe stock suficiente O no registro una cantidad correcta',
        '',
        'error'
      )
      return
    }
    var f=0;
    productos.forEach((p) => {
      
      if (productoSeleccionado.id ==p.id){
        f=0+1;
      }
    })

    if (f>0){
      Swal.fire(
        'Opps!',
        'Ya existe este producto',
        'O no registro una cantidad',
        'error'
      )
      f=0;
      return
    }


    let producto = {
      cantidad: parseInt(cantidad),
      precio: productoSeleccionado.precio,
      importe: productoSeleccionado.precio * parseFloat(cantidad),
      estado:true,
      id: productoSeleccionado.id,
      nombre: productoSeleccionado.nombre,
      descripcion: productoSeleccionado.descripcion,
      stock: productoSeleccionado.stock,
      imagen: productoSeleccionado.imagen,
      categoriaId: productoSeleccionado.categoriaId
    };
    let arrayProductos = [];
    arrayProductos.push(...productos);
    arrayProductos.push(producto);

    setProductos((anterior) => [...anterior, producto]);
    calcularTotal(arrayProductos)
    //console.log(total);
    abrirCerrarmodalBuscarProductos();
  };
  //funcion para eliminar producto del detalle de venta
  const eliminarProducto = (id) => {
    let listaproductos = productos.filter((p) => p.id !== id);
    setProductos(listaproductos);
    calcularTotal(listaproductos)
  };
  const calcularTotal = (arrayProductos) => {
    let t = 0;
    let st = 0;
    let imp = 0;

    if (arrayProductos.length > 0) {

      arrayProductos.forEach((p) => {
        t = p.importe + t
      })

      st = t / (1.18)
      imp = t - st
    }

    //Monto Base = (Monto con IGV) / (1.18)

    //IGV = (Monto con IGV) – (Monto Base)

    setSubTotal(st.toFixed(2))
    setIgv(imp.toFixed(2))
    setTotal(t.toFixed(2))
  }
  //función para traer los datos de la API
  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    //console.log(data)
    setUsers(data);
  };
  //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };
  //  metodos para cerrar y abrir los formularios modales
  const abrirCerrarmodalBuscarProductos = () => {
    setBuscarProductos(!modalBuscarProductos);
  };
  const abrirCerrarmodalBuscarClientes = () => {
    setBuscarClientes(!modalBuscarClientes);
  };

  //metodo de busqueda de productos
  const results = !search
    ? users : users.filter((dato) => dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
    );

//METODO PARA GUARDAR LA VENTA
async function registrarVenta() {

//metodo para verificar numero de comprobante

if(clienteSeleccionado.id==null){
  Swal.fire(
    'Opps!',
    'Selecciona un cliente',
    'error'
  )
  return
}

if (productos.length < 1) {
  Swal.fire(
    'Opps!',
    'No existen productos',
    'error'
  )
  return
}

    var cont = Math.max.apply(Math, comprobantes.map(function(o) { return o.numero; }));
    console.log(cont);
    let comprobante = {
      numero: parseInt(cont+1),
      fecha: fecha,
      igv: igv,
      subtotal: subTotal,
      total: total,
      estado: true,
      clienteId: clienteSeleccionado.id,
      usuarioId: cookies.get('id'),
      formaPagoId: seleccionarFormaPago.value,
      documentoId: seleccionarDocumento.value
    }
      try {
        await axios.post(URLventa, comprobante);
        Swal.fire(
          'Venta Creada!',
          'Numero de venta : ' + parseInt(cont+1),
          'success'
        )
        
      } catch (error) {
        Swal.fire(
          'Opps!',
          'No se pudo crear la venta',
          'error'
        )
        console.log("No se pudo enviar la venta ", error)
        return
      }

      
    

   /*  const generarVenta = fetch("https://localhost:44318/api-ferreteria/comprobante", {
      method: 'POST',
      headers: { "content-type": "application/json" },
      body: JSON.stringify(comprobante)
    })
      .then((response) => {

      })
      .then((dataJson) => {

        var data = dataJson;
        Swal.fire(
          'Venta Creada!',
          'Numero de venta : ' + numComprobante,
          'success'
        )

      }).catch((error) => {
        Swal.fire(
          'Opps!',
          'No se pudo crear la venta',
          'error'
        )
        console.log("No se pudo enviar la venta ", error)
      }); */
    // creando los detalles de venta

    productos.forEach((p) => {
      let detalle = {
        cantidad: p.cantidad,
        precio: p.precio,
        importe: p.importe,
        estado: true,
        comprobanteNumero: cont+1,
        productoId: p.id

      }
      console.log("detalle")
      fetch("https://localhost:44318/api-ferreteria/detalle", {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(detalle)
      })
        .then((response) => {

        })
        .then((dataJson) => {
          var data = dataJson;
        }).catch((error) => {

          console.log("No se pudo enviar el detalle ", error)
        })
    }
    
    );

    productos.forEach((pro) => {
      var valor=pro.stock-pro.cantidad;
      let productoActualizado = {
        id:pro.id,
        nombre: pro.nombre,
        descripcion: pro.descripcion,
        stock: valor,
        estado: true,
        precio: pro.precio,
        categoriaId: pro.categoriaId
        

      }
      console.log(pro.stock);
      console.log(pro.cantidad);
      try {
        axios.put("https://localhost:44318/api-ferreteria/producto/"+pro.id, productoActualizado);
      } catch (error) {
        console.log(error)
        return
      }
      
      console.log("productoActualizado")
     });

     history("/ventas");

  }


  useEffect(() => {
    if(!cookies.get('id')){
      history("/login");
  }
    comprobantesGet();
    showDataClientes();
    showFormaPago();
    showDocumento();
    showData();
  }, [])


  //FORMULARIOS
  return (

    <div id="content" className="w-50" style={{ overflow: "hidden" ,background:"#242526"}}>

      <div>

        <br /><br />
        <a onClick={() => abrirCerrarmodalBuscarClientes()} className="btn btn-success" style={{marginBottom:"15px"}}>Buscar Cliente</a>

      </div>

      <div className="card mb-2 " style={{border:"3px solid #695cfe"}}>
        <div className="card-header " style={{background:"#695CFE",fontWeight:500,fontSize:"18px"}}>Cliente</div>
        <div className="card-body bg-dark text-white">
          <table className="table table-bordered table-striped">
            <thead className="text-white">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">N° Documento</th>
              </tr>
            </thead>
            <tbody className="table-dark" style={{border:"1px solid white"}}>

              <tr key={clienteSeleccionado.id}>
                <td>{clienteSeleccionado.nombre}</td>
                <td>{clienteSeleccionado.apellido}</td>
                <td>{clienteSeleccionado.numdocumento}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>


      <div>
        <br /><br />
        <a
          onClick={() => abrirCerrarmodalBuscarProductos()} className="btn btn-success" style={{marginBottom:"15px"}}>Buscar Producto</a>
      </div>
      <div className="card mb-2" style={{border:"3px solid #695cfe"}}>
        <div className="card-header" style={{background:"#695CFE",fontWeight:500,fontSize:"18px"}}>Productos</div>
        <div className="card-body bg-dark">
          <table className="table table-bordered table-striped">
            <thead className="text-white">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Importe</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody className="table-dark" style={{border:"1px solid white"}}>
              {productos.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.precio}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.importe}</td>
                  <td>
                    <button className="btn btn-danger detail-button" onClick={() => eliminarProducto(item.id)}>Retirar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <Card style={{border:"3px solid #695cfe", marginTop:"50px"}} className="bg-dark">
        <CardHeader style={{background:"#695CFE",fontWeight:500,fontSize:"18px"}}>
          Detalle de Venta
        </CardHeader>
        <CardBody>
          <div className="row">
            
            <div className="mt-3 mb-3 col-sm-6">
            <label>Fecha</label>
              <DatePicker className="form-control" selected={fecha} onChange={(date) => setFecha(date)} />
            </div>

          </div>
          <div className="input-group flex-nowrap mb-3">
            <span className="input-group-text" id="addon-wrapping">Subtotal:</span>
            <input type="text" className="form-control" placeholder="S/. 0.00" aria-describedby="addon-wrapping" disabled value={subTotal} />
            <span className="input-group-text" id="addon-wrapping">IGV (18%):</span>
            <input type="text" className="form-control" placeholder="S/. 0.00" aria-describedby="addon-wrapping" disabled value={igv} />
            <span className="input-group-text" id="addon-wrapping">Total:</span>
            <input type="text" className="form-control" placeholder="S/. 0.00" aria-describedby="addon-wrapping" disabled value={total} />

          </div>

          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating">

                <select onChange={obtenerFormapago}  className="form-select" id="floatingSelectGrid">
                <option default > Seleccionar Forma de Pago</option>
                {formaPago?.map((fp) => (
                  <option key={fp.id}   value={fp.id} >{fp.nombre}</option>
                ))}
                </select>

              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">

                <select onChange={obtenerDocumento}  className="form-select" id="floatingSelectGrid">
                <option default> Seleccionar Tipo de Comprobante </option>
                {documento?.map((d) => (
                  <option key={d.id}   value={d.id}  >{d.nombre}</option>
                ))}
                </select>

              </div>
            </div>
          </div>
          <div className="mt-3">
          <a onClick={registrarVenta } className="btn btn-success">Terminar Venta</a>
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={modalBuscarProductos}>
        <ModalHeader style={{background:"#695CFE",color:"white",borderBottom:"0px"}}>Buscar Producto</ModalHeader>
        <ModalBody className="bg-dark">
          <div className="w-250 mt-3" style={{ overflow: "hidden" }}>
            <input style={{border:"3px solid #695CFE"}}
              value={search}
              onChange={searcher}
              type="text"
              placeholder="Buscar..."
              className="form-control"
            />
          </div>
          <div className="table-responsive">
            <table className='table table-sm table-bordered text-white' style={{marginTop:"20px"}}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nombre}</td>
                    <td>{item.descripcion}</td>
                    <td>{item.precio}</td>
                    <td>{item.stock}</td>
                    <td>
                      <button
                        className="btn btn-success detail-button"
                        onClick={() => seleccionarProducto(item)}>
                        Elegir
                      </button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </ModalBody>
        <ModalFooter className="bg-dark justify-content-center" style={{borderTop:"0px"}}>
          <div>
        <input className="form-control" min="0" type="number" onChange={event => setCantidad(event.target.value)} value={cantidad} style={{border:"3px solid #695CFE"}}></input>
        </div>      
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarmodalBuscarProductos()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalBuscarClientes}>
        <ModalHeader style={{background:"#695CFE",color:"white",borderBottom:"0px"}}>Lista de Clientes</ModalHeader>
        <ModalBody className="bg-dark">
          <div className="w-250 mt-3" style={{ overflow: "hidden" }}>
            <input value={searchClientes} onChange={searcherClientes} type="text" placeholder='Buscar...' className='form-control' style={{border:"3px solid #695CFE"}}/>
            <table className='table table-sm table-bordered text-white' style={{marginTop:"20px"}}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>N° Documento</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {resultsClientes.map((user) => (
                  <tr key={user.id}>
                    <td>{user.nombre}</td>
                    <td>{user.apellido}</td>
                    <td>{user.numdocumento}</td>
                    <td>
                      <button
                        className="btn btn-success detail-button" onClick={() => seleccionarCliente(user)}
                      >
                        Elegir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ModalBody>
        <ModalFooter className="bg-dark justify-content-center" style={{borderTop:"0px"}}>
          <button className="btn btn-danger" onClick={() => abrirCerrarmodalBuscarClientes()} style={{width:"250px"}}>Cancelar</button>
        </ModalFooter>
      </Modal>

    </div>
  );
}
