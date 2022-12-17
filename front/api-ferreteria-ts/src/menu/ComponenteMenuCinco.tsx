// import '../assets/css/style.css'
// import '../assets/js/script'
import styles from './style.module.css'
import logo from '../assets/img/logo1.png'
import './style.css'

export default function ComponenteMenuCinco() {
    return(
        <div>
        <nav className={"sidebar close"}>
            <header>
                <div className="image-text">
                    <span className="image">
                        <img src={logo}/>
                    </span>
                    <div className="text logo-text">
                        <span className="name">Yerias S.A.C</span>
                    </div>
                </div>
                <i className='bx bx-chevron-right toggle'></i>
            </header>
    
            <div className="menu-bar">
                <div className="menu">
                    <ul className="menu-links">
                        <li className="nav-link">
                            <a href="/ventas">
                                <i className='bx bx-home-alt icon' ></i>
                                <span className="text nav-text">Ventas</span>
                            </a>
                        </li>
                        <li className="nav-link">
                            <a href="/reporteventas">
                                <i className='bx bx-home-alt icon' ></i>
                                <span className="text nav-text">Reporte Ventas</span>
                            </a>
                        </li>
    
                        <li className="nav-link">
                            <a href="/clientes">
                                <i className='bx bx-user icon' ></i>
                                <span className="text nav-text">Clientes</span>
                            </a>
                        </li>
    
                        <li className="nav-link">
                            <a href="/productos">
                                <i className='bx bx-paint-roll icon'></i>
                                <span className="text nav-text">Productos</span>
                            </a>
                        </li>
    
                        <li className="nav-link">
                            <a href="/empleados">
                                <i className='bx bxs-user-badge icon'></i>
                                <span className="text nav-text">Empleados</span>
                            </a>
                        </li>
    
                        <li className="nav-link">
                            <a href="/categorias">
                                <i className='bx bx-category icon'></i>
                                <span className="text nav-text">Categorias</span>
                            </a>
                        </li>
                        <li className="nav-link">
                            <a href="/usuarios">
                                <i className='bx bx-category icon'></i>
                                <span className="text nav-text">Usuarios</span>
                            </a>
                        </li>
                    </ul>   
                </div>
            </div>
        </nav>
        </div>
    )
}