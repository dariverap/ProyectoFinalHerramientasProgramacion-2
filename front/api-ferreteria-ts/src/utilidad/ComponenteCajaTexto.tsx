import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import ComponenteErrorCampo from "./ComponenteErrorCajaTexto";

export default function CompononenteCajaTexto(props: CajaTexto) {
    return (
        <div className="row">
            <div className="col-6" style={{marginTop:"10px"}}>
                {props.label ? (
                    <label style={{fontWeight:500 , fontSize:"18px"}} className="form-label"
                        htmlFor={props.campo}>
                        {props.label}
                    </label >
                ) : null}
                
                {/* campo del input */}
                <Field name={props.campo} 
                className="form-control" value={props.value} pattern={props.pattern} placeholder={props.placeholder} type={props.type} style={{width:"700px"}}/>
                <ErrorMessage name={props.campo}>
                    {(mensaje) => <ComponenteErrorCampo
                    mensaje={mensaje} />}
                </ErrorMessage>
            </div>
        </div>
    );
}

interface CajaTexto {
    pattern: any;
    type: any;
    campo: string;
    label?: string;
    value?: string;
    placeholder?: string;
    number?: number;
}