export default function ComponenteErrorCampo(props: MostrarErrorCampo) {
    return (
        <div className="alert alert-warning" role="alert" style={{width:"700px"}}>
            {props.mensaje}
        </div>
    );
}

interface MostrarErrorCampo{
    mensaje:string;
}