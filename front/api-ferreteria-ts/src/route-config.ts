import ComponenteActualizarCategoria from "./categoria/ComponenteActualizarCategoria";
import ComponenteListarCategoria from "./categoria/ComponenteListarCategoria";
import ComponenteRegistrarCategoria from "./categoria/ComponenteRegistrarCategoria";
import ComponenteActualizarCliente from "./Clientes/ComponenteActualizarCliente";
import ComponenteListarCliente from "./Clientes/ComponenteListarCliente";
import ComponenteRegistrarCliente from "./Clientes/ComponenteRegistrarCliente";
import ComponenteActualizarEmpleado from "./empleado/ComponenteActualizarEmpleado";
import ComponenteListarempleado from "./empleado/ComponenteListarEmpleado";
import ComponenteRegistrarEmpleado from "./empleado/ComponenteRegistrarEmpleado";
import ComponenteLogin from "./principal/ComponenteLogin";
import ComponentePrincipal from "./principal/ComponentePrincipal";
import ComponenteRedireccionar from "./principal/ComponenteRedireccionado";
import ComponenteActualizarProducto from "./producto/ComponenteActualizarProducto";
import ComponenteListarProducto from "./producto/ComponenteListarProducto";
import ComponenteRegistrarProducto from "./producto/ComponenteRegistrarProducto";
import ComponenteActualizarUsuario from "./usuario/ComponenteActualizarUsuario";
import ComponenteListarUsuario from "./usuario/ComponenteListarUsuario";
import ComponenteRegistrarUsuario from "./usuario/ComponenteRegistrarUsuario";
import ComponenteReporteVenta from "./venta/ComponenteReporteVenta";
import ComponenteVenta from "./venta/ComponenteVenta";
import ComponenteVenta2 from "./venta/ComponenteVenta2";

const rutas = [
    //RUTAS PARA LISTAR,ACTUALIZAR Y REGISTRAR CLIENTES
     //RUTAS PARA LISTAR,ACTUALIZAR Y REGISTRAR EMPLEADOS
    
    { path: "/empleados/actualizar/:id", componente: ComponenteActualizarEmpleado },
    { path: "/empleados/registrar", componente: ComponenteRegistrarEmpleado },
    { path: "/empleados", componente: ComponenteListarempleado },
    { path: "/", componente: ComponenteVenta},
    //RUTAS PARA LISTAR, ACTUALIZAR Y REGISTRAR PRODUCTOS
    { path: "/productos/actualizar/:id", componente: ComponenteActualizarProducto},
    { path: "/productos/registrar", componente: ComponenteRegistrarProducto},
    { path: "/productos", componente: ComponenteListarProducto},
    { path: "/", componente: ComponentePrincipal },

    { path: "/categorias/actualizar/:id", componente: ComponenteActualizarCategoria},
    { path: "/categorias/registrar", componente: ComponenteRegistrarCategoria},
    { path: "/categorias", componente: ComponenteListarCategoria},

    { path: "/clientes/actualizar/:id", componente: ComponenteActualizarCliente },
    { path: "/clientes/registrar", componente: ComponenteRegistrarCliente },
    { path: "/clientes", componente: ComponenteListarCliente },

    { path: "/usuarios/actualizar/:id", componente: ComponenteActualizarUsuario },
    { path: "/usuarios/registrar", componente: ComponenteRegistrarUsuario },
    { path: "/usuarios", componente: ComponenteListarUsuario },

    { path: "/ventas" , componente: ComponenteVenta},
    { path: "/reporteventas" , componente: ComponenteReporteVenta},
    // { path: "/", componente: ComponentePrincipal },
    { path: "/login", componente: ComponenteLogin },

    //creando un path para rutas no encontradas, esto siempre va al finalizar
    { path: "*", componente: ComponenteRedireccionar },
    { path: "/vntas" , componente: ComponenteVenta2},
];
export default rutas;
