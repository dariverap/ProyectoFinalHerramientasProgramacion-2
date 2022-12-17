import usuario from '../assets/img/user-1.png'
import logo from '../assets/img/logo2.png'
import Cookies from 'universal-cookie';
export default function ComponenteMenuNavbar(){
    const cookies = new Cookies();
    const cerrarSesion=()=>{
        cookies.remove('id', {path: '/'});
        cookies.remove('nombre', {path: '/'});
        window.location.reload();
    }

    return(
<div>
            <nav className="navbar navbar-expand-lg navbar-light bg-azul" style={{border:"0px solid"}}>
                <div className="container-fluid">
                    {/* <img src={logo} alt="Logo" width="150" height="95" className="d-inline-block align-text-top logo-barra" style={{marginLeft:"50px"}}/> */}
                    <a className="navbar-brand" href="#" style={{color: "white", paddingTop:"10px", cursor:"default",fontSize:"25px",marginLeft:"500px",fontWeight:600}}>
                    FERRETERIA YERIAS S.A.C - SISTEMA DE VENTAS
                    </a>
                {/* <!--Dropdown list--> */}
                    <div className="dropdown p-3">
                        <button className="btn btn-primary dropdown-toggle bt-hover" style={{marginLeft:"20px", background:"#242526",border:"4px solid black",borderRadius:"20px",color:"white",paddingLeft:"10px",paddingRight:"40px"}} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={usuario} width="35" style={{marginRight:"10px"}}/>
                            {cookies.get('nombre')}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{marginLeft:""}}>
                            <li style={{width:"130px",display:"flex",justifyContent:"center"}}><a className="btn dropdown-item" onClick={()=>cerrarSesion()}  style={{paddingLeft:"25px"}}>Cerrar sesión</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}