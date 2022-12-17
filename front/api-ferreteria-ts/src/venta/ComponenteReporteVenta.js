import { Card, CardBody, CardHeader, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2'
import DataTable from 'react-data-table-component';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import { Link, useNavigate } from "react-router-dom";

export default function ComponenteReporteVenta() {
    const cookies = new Cookies();
    const history = useNavigate();

    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    const [mostrarVentas, setMostrarVentas] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [tTotal, settTotal] = useState(0);
    const [tSubtotal, setSubtotal] = useState(0);
    const [tIGV, setIGV] = useState(0);


    const peticionesGet = async () => {
        await axios
            .get("https://localhost:44318/api-ferreteria/comprobante")
            .then((response) => {
                setVentas(response.data);

                setMostrarVentas(response.data);
                let arrayMostrarVentas = [];
                
                mostrarVentas.forEach((v) => {
                    const fventa = new Date(v.fecha);
                    let venta = {
                        numero: v.numero,
                        igv: v.igv,
                        subtotal: v.subtotal,
                        total: v.total,
                        fecha: fventa.toLocaleDateString()  
                    };

                    arrayMostrarVentas.push(venta);
                    setMostrarVentas(arrayMostrarVentas);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const buscar = () => {
        var toTotal=0;
        var toSubtotal=0;
        var toIGV=0;
        let arrayVentas = [];
        ventas.forEach((v) => {
                const feventa = new Date(v.fecha);
            if ( feventa <= fechaFin  && feventa >= fechaInicio) {
                console.log((feventa));

                let venta = {
                    numero: v.numero,
                    igv: v.igv,
                    subtotal: v.subtotal,
                    total: v.total,
                    fecha: feventa.toLocaleDateString() 
                };
                toTotal=toTotal+v.total;
                
                toSubtotal=toSubtotal+v.subtotal;
                toIGV=toIGV+v.igv;
                //arrayVentas.push(...productos);
                arrayVentas.push(venta);
            }

        });
        toSubtotal = Number(toSubtotal.toFixed(2));
        toIGV = Number(toIGV.toFixed(2));
        settTotal(toTotal);
        setSubtotal(toSubtotal);
        setIGV(toIGV);
        setMostrarVentas(arrayVentas);
        console.log(arrayVentas);




    }

    useEffect(() => {
        if (!cookies.get('id')) {
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
        <div className="table-responsive">
          <div className="row">
            <div className="col-md-2 mb-3">
              <Label>Fecha Inicio:</Label>
              <DatePicker
                className="form-control form-control-sm"
                selected={fechaInicio}
                onSelect={(date) => setFechaInicio(date)}
                dateFormat="dd/MM/yyyy"
              />
            </div>

            <div className="col-md-2">
              <Label>Fecha Fin:</Label>
              <DatePicker
                className="form-control form-control-sm"
                selected={fechaFin}
                onSelect={(date) => setFechaFin(date)}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="col-md-2">
              <Label> . </Label>
              <Button color="primary" size="sm" block onClick={buscar}>
                <i className="fa fa-search" aria-hidden="true"></i> Buscar
              </Button>
            </div>
            <div className="col-md-2">
            <Label> Igv </Label>
            <input className="form-control" value={tIGV} readonly>
              </input>
            </div>
            <div className="col-md-2">
            <Label> Subtotal </Label>
            <input className="form-control" value={tSubtotal} readonly>
              </input>
            </div>
            <div className="col-md-2">
            <Label> Total </Label>
            <input className="form-control" value={tTotal} readonly>
              </input>
            </div>

          </div>
          <Card
            style={{ border: "3px solid #695cfe", marginTop: "50px" }}
            className="bg-dark"
          >
            <CardHeader
              style={{
                background: "#695CFE",
                fontWeight: 500,
                fontSize: "18px",
              }}
            >
              Reporte de Ventas
            </CardHeader>
            <CardBody>
              <table className="table table-hover table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Numero</th>
                    <th scope="col">IGV</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col">Total</th>
                    <th scope="col">Fecha</th>
                  </tr>
                </thead>
                <tbody className="table-dark">
                  {/* se muestra los datos de la tabla */}
                  {mostrarVentas?.map((items) => (
                    <tr key={items.numero}>
                      <td>{items.numero}</td>
                      <th scope="row">{items.igv}</th>
                      <td>{items.subtotal}</td>
                      <td>{items.total}</td>
                      <td type="date" dateFormat="dd/MM/yyyy">
                        {items.fecha}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </div>
    );
}
