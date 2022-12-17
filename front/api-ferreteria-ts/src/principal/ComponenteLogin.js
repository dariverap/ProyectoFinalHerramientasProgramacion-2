import React, {useState, useEffect} from 'react';
import md5 from 'md5';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Login.css';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function ComponenteLogin(props){
  const baseUrl="https://localhost:44318/api-ferreteria/usuario";
  const cookies = new Cookies();
  const history = useNavigate();
  const [form, setForm]=useState({
    id:90,
    nombre:'',
    contraseña: ''
  });
    const handleChange=e=>{
   const {name, value} = e.target;
   setForm({
     ...form,
     [name]: value
   });
   console.log(form);
    }
  
    const iniciarSesion=async()=>{
      await axios.get(baseUrl+`/${form.nombre}/${(form.contraseña)}`)
      .then(response=>{
        return response.data;
      }).then(response=>{
        if(response.length>0){
          var respuesta=response[0];
          cookies.set('id', respuesta.id, {path: '/'});
          cookies.set('nombre', respuesta.nombre, {path: '/'});
          Swal.fire(
            'Bievenido!',
            'Ingreso Con Exito',
            'success'
          )
          //history('/venta');
          window.location.reload();
        }else{
          Swal.fire(
            'Ups',
            'Contraseña/Usuario Incorrectos',
            'error'
          )
        }
      })
      
      .catch(error=>{
        console.log(error);
      })
    }
  


  useEffect(() => {
    if(cookies.get('id')){
      history("/venta");
  }



    },[]);
  
      return (
          <div className="containerPrincipal">
          <div className="containerLogin">
            <div className="form-group">
              <label>Usuario: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="nombre"
                onChange={handleChange}
              />
              <br />
              <label>Contraseña: </label>
              <br />
              <input
                type="password"
                className="form-control"
                name="contraseña"
                onChange={handleChange}
              />
              <br />
              <button className="btn btn-primary" onClick={()=>iniciarSesion()}>Iniciar Sesión</button>
            </div>
          </div>
        </div>
      );
}